import { all, fork } from "redux-saga/effects";

import { watchLessonConvert } from "./lesson-convert";
import { watchQuiz } from "./quiz";
import { ConfigureStoreOptions } from "./store-types";

export function getRootSaga(dataProvider: ConfigureStoreOptions["dataProvider"]) {
    return function* () {
        yield all([watchQuiz, watchLessonConvert(dataProvider)].map(fork));
    };
}
