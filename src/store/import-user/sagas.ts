//TODO: @user use sagas to implement api import student and parent temporarily. That will be move in the micro FE.
import { takeLatest, put, call } from "redux-saga/effects";
import { handleUnknownError } from "src/common/utils/error";
import { arrayHasItem } from "src/common/utils/other";
import parentImportService from "src/squads/user/service/define-service/parent-import-service";
import studentImportService from "src/squads/user/service/define-service/student-import-service";

import { SnackbarActions } from "../snackbar/actions";
import { ImportUserActions } from "./actions";
import {
    ActionImportUsers,
    ImportStudentAction,
    ImportStudentResp,
    ImportParentAction,
    ImportParentResp,
} from "./types";

import i18nProvider from "src/i18n";

export function* watchImportUsers() {
    yield takeLatest(ActionImportUsers.IMPORT_STUDENTS, handleImportStudents);
    yield takeLatest(ActionImportUsers.IMPORT_PARENTS, handleImportParents);
}

export function* handleImportStudents(actions: ImportStudentAction) {
    const displayImproveErrorMessage = actions.options?.displayImproveErrorMessage;
    const translationErrorMessage = displayImproveErrorMessage
        ? "message"
        : "tempMessageFeatureToggle";

    yield put(
        SnackbarActions.showSnackbar({
            message: i18nProvider.translate("ra.message.importStudentInProgress"),
            severity: "info",
            options: { persist: true },
        })
    );
    try {
        const resp: ImportStudentResp = yield call(studentImportService.mutation.userImport, {
            payload: actions.payload,
        });

        if (arrayHasItem(resp.errorsList)) {
            const error = resp.errorsList[0];
            yield put(
                SnackbarActions.showSnackbar({
                    message: i18nProvider.translate(
                        `ra.${translationErrorMessage}.${error.error}`,
                        {
                            number: error.rowNumber,
                            headerName: error?.fieldName,
                        }
                    ),
                    severity: "error",
                })
            );
            return;
        }

        yield put(
            SnackbarActions.showSnackbar({
                message: i18nProvider.translate("ra.message.importedStudentsSuccessfully"),
                severity: "success",
            })
        );
    } catch (error) {
        const err = handleUnknownError(error);
        const originMessage = err.originMessage?.split(" ")[0];
        yield put(
            SnackbarActions.showSnackbar({
                message: i18nProvider.translate(
                    originMessage ? `ra.message.${originMessage}` : err.message
                ),
                severity: "error",
            })
        );
    } finally {
        yield put(ImportUserActions.importStudentFinish());
        yield put(SnackbarActions.closeAllPersistSnackbar());
    }
}

export function* handleImportParents(actions: ImportParentAction) {
    const displayImproveErrorMessage = actions.options?.displayImproveErrorMessage;
    const translationErrorMessage = displayImproveErrorMessage
        ? "message"
        : "tempMessageFeatureToggle";
    yield put(
        SnackbarActions.showSnackbar({
            message: i18nProvider.translate("ra.message.importParentInProgress"),
            severity: "info",
            options: { persist: true },
        })
    );
    try {
        const resp: ImportParentResp = yield call(parentImportService.mutation.userImport, {
            payload: actions.payload,
        });

        if (arrayHasItem(resp.errorsList)) {
            const error = resp.errorsList[0];
            yield put(
                SnackbarActions.showSnackbar({
                    message: i18nProvider.translate(
                        `ra.${translationErrorMessage}.${error.error}`,
                        {
                            number: error.rowNumber,
                            headerName: error?.fieldName,
                        }
                    ),
                    severity: "error",
                })
            );
            return;
        }

        yield put(
            SnackbarActions.showSnackbar({
                message: i18nProvider.translate("ra.message.importedParentsSuccessfully"),
                severity: "success",
            })
        );
    } catch (error) {
        const err = handleUnknownError(error);
        const originMessage = err.originMessage?.split(" ")[0];
        yield put(
            SnackbarActions.showSnackbar({
                message: i18nProvider.translate(
                    originMessage ? `ra.message.${originMessage}` : err.message
                ),
                severity: "error",
            })
        );
    } finally {
        yield put(ImportUserActions.importParentFinish());
        yield put(SnackbarActions.closeAllPersistSnackbar());
    }
}
