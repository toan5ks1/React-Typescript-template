import { take, call, all, put, fork, select } from "redux-saga/effects";
import { Entities, ProviderTypes } from "src/common/constants/enum";
import { delay } from "src/common/utils/other";
import { KeyConversionTaskStatusTypes } from "src/squads/syllabus/common/constants/const";
import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";
import { MediaConversionHasura, MediaHasura } from "src/squads/syllabus/models/media";
import { IDataProvider } from "src/squads/syllabus/services/service-types";

import { getDefaultLanguage } from "src/squads/syllabus/providers/TranslationProvider";

import logger from "../../internals/logger";
import { getStatusConversionTask } from "../../models/conversion-task";
import { SnackbarActions } from "../snackbar/actions";
import { RootState } from "../store-types";
import { LessonConvertActionTypes, NsLessonConvert, LessonConvertActions } from "./actions";
import { Material } from "./lesson-convert-types";
import {
    getMaterialIds,
    isAllConvertSuccessfully,
    isLessonConvertFailed as checkIsFailed,
} from "./selectors";

import polyglot from "src/squads/syllabus/i18n";

export function watchLessonConvert(dataProvider: IDataProvider) {
    return function* () {
        yield all([call(trackingLessonConvert(dataProvider))]);
    };
}

interface IPollingTracking {
    courseId: string;
    lessonGroupId: string;
    clearPolling: (key: string, shouldClearStore?: boolean) => void;
}

const fetchData = (dataProvider: IDataProvider): ((ids: string[]) => Promise<MediaHasura[]>) => {
    return async function (ids: string[]) {
        const { data = [] } = await dataProvider(ProviderTypes.MANY, Entities.MEDIA, {
            ids,
        });
        return data;
    };
};

function pollingTracking(dataProvider: IDataProvider) {
    return function* ({ courseId, lessonGroupId, clearPolling }: IPollingTracking) {
        const i18nProvider = polyglot(reactiveStorage.get("LANG") || getDefaultLanguage());

        try {
            while (true) {
                yield delay(30000);
                const cache = yield* getMaterialIdsByLessonGroupId(courseId, lessonGroupId);
                const data: MediaConversionHasura[] = yield fetchData(dataProvider)(cache);
                const cacheLatest = yield* getMaterialIdsByLessonGroupId(courseId, lessonGroupId);
                const { changes, isLessonConvertFailed } = yield* checkDataResp(data, cacheLatest);

                if (isLessonConvertFailed) {
                    yield put(
                        SnackbarActions.showSnackbar({
                            message: i18nProvider("resources.courses.lessonConvert.failedUnknown"),
                            severity: "error",
                        })
                    );
                }

                yield* updateStatus(courseId, lessonGroupId, changes);

                if (yield* isSuccess(courseId, lessonGroupId)) {
                    yield put(
                        SnackbarActions.showSnackbar({
                            message: i18nProvider("ra.common.convertingAllFilesSuccessfully"),
                        })
                    );
                    clearPolling(`${courseId}.${lessonGroupId}`, true);
                    return;
                }
            }
        } catch (e: any) {
            logger.warn("[Lesson convert saga]", e.message);

            yield put(
                SnackbarActions.showSnackbar({
                    message: i18nProvider("resources.courses.lessonConvert.failedUnknown"),
                    severity: "error",
                })
            );
            clearPolling(`${courseId}.${lessonGroupId}`);
            yield put(LessonConvertActions.clearLessonConvert({ courseId, lessonGroupId }));
            return;
        }
    };
}

export function trackingLessonConvert(dataProvider: IDataProvider) {
    return function* () {
        const collection: Map<string, boolean> = new Map();

        const clearPolling = (key: string, shouldClearStore?: boolean) => {
            const [courseId, lessonGroupId] = key.split(".");
            collection.delete(key);
            if (shouldClearStore) {
                put(LessonConvertActions.clearLessonConvert({ courseId, lessonGroupId }));
            }
        };

        while (true) {
            const { payload }: NsLessonConvert.AddLessonConvert = yield take(
                LessonConvertActionTypes.ADD_LESSON_CONVERT
            );
            const { courseId, lessonGroupId } = payload;
            const key = `${courseId}.${lessonGroupId}`;
            if (!collection.has(key)) {
                collection.set(key, true);
                yield fork(pollingTracking(dataProvider), {
                    courseId,
                    lessonGroupId,
                    clearPolling,
                });
            }
        }
    };
}

function* updateStatus(courseId: string, lessonGroupId: string, materials: Material[]) {
    yield put(
        LessonConvertActions.updateLessonConvertStatus({
            courseId,
            lessonGroupId,
            materials,
        })
    );
}

function* checkDataResp(dataResp: MediaConversionHasura[], ids: string[]) {
    const fails: Set<string> = new Set();
    let isLessonConvertFailed = false;

    const data: MediaConversionHasura[] = dataResp.filter(({ media_id }) => ids.includes(media_id));
    const size = data.length;
    const changes: Material[] = [];

    for (let i = 0; i < size; i++) {
        const current = data[i];
        const status = getStatusConversionTask(current);
        if (checkIsFailed(status)) {
            isLessonConvertFailed = true;
            fails.add(current.media_id);
            changes.push({
                id: current.media_id,
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                name: current.name,
            });
            continue;
        }
        if (status === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED) {
            changes.push({
                id: current.media_id,
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                name: current.name,
            });
        }
    }
    return { isLessonConvertFailed, changes, fails };
}

function* getMaterialIdsByLessonGroupId(courseId: string, lessonGroupId: string) {
    const materials: Material[] = yield select(({ lessonConvert }: RootState) =>
        getMaterialIds(lessonConvert, courseId, lessonGroupId)
    );

    if (materials.length) {
        return materials.filter(({ status }) => !checkIsFailed(status)).map(({ id }) => id);
    }
    return [];
}

function* isSuccess(courseId: string, lessonGroupId: string) {
    const materials: Material[] = yield select(({ lessonConvert }: RootState) =>
        getMaterialIds(lessonConvert, courseId, lessonGroupId)
    );
    return isAllConvertSuccessfully(materials);
}
