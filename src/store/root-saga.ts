import { all, fork } from "redux-saga/effects";
import { watchQuiz } from "src/squads/syllabus/store/quiz";

import { watchImportUsers } from "./import-user/sagas";
import { watchLessonConvert } from "./lesson-convert";
import { ConfigureStoreOptions } from "./store-types";

export function getRootSaga(dataProvider: ConfigureStoreOptions["dataProvider"]) {
    return function* () {
        yield all([watchQuiz, watchLessonConvert(dataProvider), watchImportUsers].map(fork));
    };
}
