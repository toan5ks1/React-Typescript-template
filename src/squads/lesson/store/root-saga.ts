import { all, fork } from "redux-saga/effects";
import { ConfigureStoreOptions } from "src/squads/lesson/store/store-types";

import { watchLessonConvert } from "./lesson-convert/sagas";

export function getRootSaga(dataProvider: ConfigureStoreOptions["dataProvider"]) {
    return function* () {
        yield all([watchLessonConvert(dataProvider)].map(fork));
    };
}
