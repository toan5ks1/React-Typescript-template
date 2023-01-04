import { call, put, select, takeLatest } from "redux-saga/effects";
import { getDetection } from "src/squads/syllabus/internals/detection";
import logger from "src/squads/syllabus/internals/logger";
import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";
import { RectTypes } from "src/squads/syllabus/models/canvas";
import { Quiz } from "src/squads/syllabus/models/quiz";

import { getDefaultLanguage } from "src/squads/syllabus/providers/TranslationProvider";

import { SnackbarActions } from "../snackbar/actions";
import { RootState } from "../store-types";
import { NsQuizAction, QuizActions, QuizActionTypes } from "./actions";

import polyglot from "src/squads/syllabus/i18n";

export function* watchQuiz() {
    yield takeLatest(QuizActionTypes.POST_OCR_REQUEST, handleOCRRequest);
    yield takeLatest(QuizActionTypes.REQUEST_ADD_NEW_ANSWER, handleAddNewAnswer);
}

function* handleOCRRequest(action: NsQuizAction.PostORCRequest) {
    const i18nProvider = polyglot(reactiveStorage.get("LANG") || getDefaultLanguage());

    try {
        const { rect } = action.payload;
        const detection = getDetection();
        let resultData = "";
        let rectType: RectTypes = rect.rectType;

        switch (rect.rectType) {
            case RectTypes.TEXT:
                resultData = yield call(detection.detectText, rect.image, action.payload.language);

                break;
            case RectTypes.IMAGE:
                rectType = RectTypes.INLINE_IMAGE;

                if (rect.width > 320) {
                    rectType = RectTypes.IMAGE;
                }
                resultData = rect.image;

                break;
            case RectTypes.TEX:
                rectType = RectTypes.INLINE_TEX;

                resultData = yield call(detection.detectTeX, rect.image);

                if (rect.width > 200) {
                    rectType = RectTypes.TEX;
                }

                break;
        }
        yield put(
            QuizActions.addRectToQuestion({
                rect: {
                    ...rect,
                    data: resultData,
                    rectType: rectType,
                },
                answerId: action.payload.answerId,
                fieldType: action.payload.fieldType,
            })
        );
    } catch (e) {
        logger.warn("[handleOCRRequest]", e);

        yield put(
            SnackbarActions.showSnackbar({
                severity: "error",
                message: i18nProvider("ra.manabie-error.canNotExtractFromPdf"),
            })
        );
    }
}

function* handleAddNewAnswer(action: NsQuizAction.RequestAddNewAnswer) {
    const currentQuiz = (yield select(
        (state: RootState) => state.quiz.quizzes[state.quiz.currentQuizIndex]
    )) as Quiz | undefined;

    if (!currentQuiz) return;

    yield put(QuizActions.addNewAnswer(action.payload));
}
