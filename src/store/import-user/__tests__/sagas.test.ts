import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import parentImportService from "src/squads/user/service/define-service/parent-import-service";
import studentImportService from "src/squads/user/service/define-service/student-import-service";

import { watchImportUsers, handleImportStudents, handleImportParents } from "../sagas";
import { ActionImportUsers } from "../types";

jest.mock("src/squads/user/service/define-service/student-import-service", () => {
    return {
        mutation: {
            userImport: jest.fn(),
        },
    };
});

jest.mock("src/squads/user/service/define-service/parent-import-service", () => {
    return {
        mutation: {
            userImport: jest.fn(),
        },
    };
});

describe("watchImportUsers", () => {
    const gen = watchImportUsers();
    it("should wait for latest IMPORT_STUDENTS action and call handleImportStudents' ", () => {
        const generator = gen.next();

        expect(generator.value).toEqual(
            takeLatest(ActionImportUsers.IMPORT_STUDENTS, handleImportStudents)
        );
    });

    it("should wait for latest IMPORT_PARENTS action and call handleImportParents' ", () => {
        const generator = gen.next();

        expect(generator.value).toEqual(
            takeLatest(ActionImportUsers.IMPORT_PARENTS, handleImportParents)
        );
    });

    it("should be done on next iteration", () => {
        expect(gen.next().done).toBeTruthy();
    });
});

describe("handleImportStudents", () => {
    handleImportStudents({ payload: "", type: "IMPORT_STUDENTS" });
    it("should return success resp", async () => {
        (studentImportService.mutation.userImport as jest.Mock).mockResolvedValue({});

        const dispatched: any[] = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportStudents as any,
            { payload: "", type: "IMPORT_STUDENTS" }
        ).toPromise();
    });

    it("should catch error when importing fail", async () => {
        (studentImportService.mutation.userImport as jest.Mock).mockRejectedValue(
            new Error("error")
        );
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportStudents as any,
            { payload: "", type: "IMPORT_STUDENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Student list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                type: "SHOW_SNACKBAR",
                payload: {
                    message: "error",
                    severity: "error",
                },
            },
            { payload: "", type: "IMPORT_STUDENTS_FINISH" },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });

    it("should put message successfully", async () => {
        (studentImportService.mutation.userImport as jest.Mock).mockResolvedValue({
            errorsList: [],
        });
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportStudents as any,
            { payload: "", type: "IMPORT_STUDENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Student list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: {
                    message: "You have imported the student list successfully",
                    severity: "success",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: "",
                type: "IMPORT_STUDENTS_FINISH",
            },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });

    it("should put message error when resp have error", async () => {
        (studentImportService.mutation.userImport as jest.Mock).mockResolvedValue({
            errorsList: [
                {
                    error: "error resp",
                },
            ],
        });
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportStudents as any,
            { payload: "", type: "IMPORT_STUDENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Student list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: {
                    message: "ra.message.error resp",
                    severity: "error",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: "",
                type: "IMPORT_STUDENTS_FINISH",
            },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });
});

describe("handleImportParents", () => {
    handleImportParents({ payload: "", type: "IMPORT_PARENTS" });
    it("should return success resp", async () => {
        (parentImportService.mutation.userImport as jest.Mock).mockReturnValue({});

        const dispatched: any[] = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportParents as any,
            { payload: "", type: "IMPORT_PARENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();
    });

    it("should catch error when importing fail", async () => {
        (parentImportService.mutation.userImport as jest.Mock).mockRejectedValue(
            new Error("error")
        );
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportParents as any,
            { payload: "", type: "IMPORT_PARENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Parent list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                type: "SHOW_SNACKBAR",
                payload: {
                    message: "error",
                    severity: "error",
                },
            },
            { payload: "", type: "IMPORT_PARENTS_FINISH" },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });

    it("should put message successfully", async () => {
        (parentImportService.mutation.userImport as jest.Mock).mockResolvedValue({
            errorsList: [],
        });
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportParents as any,
            { payload: "", type: "IMPORT_PARENTS" }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Parent list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: {
                    message: "You have imported the parent list successfully",
                    severity: "success",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: "",
                type: "IMPORT_PARENTS_FINISH",
            },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });

    it("should put message error when resp have error", async () => {
        (parentImportService.mutation.userImport as jest.Mock).mockResolvedValue({
            errorsList: [
                {
                    error: "error resp",
                },
            ],
        });
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleImportParents as any,
            { payload: "", type: "IMPORT_PARENTS", options: { displayImproveErrorMessage: true } }
        ).toPromise();

        expect(dispatched).toMatchObject([
            {
                payload: {
                    message: "Parent list import has been in progress",
                    options: {
                        persist: true,
                    },
                    severity: "info",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: {
                    message: "ra.message.error resp",
                    severity: "error",
                },
                type: "SHOW_SNACKBAR",
            },
            {
                payload: "",
                type: "IMPORT_PARENTS_FINISH",
            },
            {
                type: "CLOSE_ALL_SNACKBAR_PERSIST",
            },
        ]);
    });
});
