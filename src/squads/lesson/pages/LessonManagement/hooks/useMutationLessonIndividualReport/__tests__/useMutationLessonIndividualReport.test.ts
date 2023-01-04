import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { ValueType } from "manabuf/bob/v1/lessons_pb";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useMutationLessonIndividualReport, {
    DeleteLessonReportProps,
    WriteLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockUseMutation = (
    params: {
        submitMockFn?: MockInferMutationFn<NsLesson_Bob_LessonReportsService.UpsertLessonReport>;
        saveDraftMockFn?: MockInferMutationFn<NsLesson_Bob_LessonReportsService.UpsertLessonReport>;
        deleteMockFn?: MockInferMutationFn<NsLesson_Bob_LessonReportsService.DeleteLessonReport>;
    } = {}
) => {
    const { submitMockFn, saveDraftMockFn, deleteMockFn } = params;

    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
            entity: "lessonReports";
            action: "lessonReportsSubmit" | "lessonReportsSaveDraft" | "lessonReportsDelete";
        }) => {
            switch (resource.action) {
                case "lessonReportsSubmit": {
                    if (submitMockFn) return submitMockFn;

                    return () => ({ mutate: jest.fn(), isLoading: false });
                }

                case "lessonReportsSaveDraft": {
                    if (saveDraftMockFn) return saveDraftMockFn;

                    return () => ({ mutate: jest.fn(), isLoading: false });
                }

                case "lessonReportsDelete": {
                    if (deleteMockFn) return deleteMockFn;

                    return () => ({ mutateAsync: jest.fn() });
                }
            }
        }
    );
};

describe("useMutationLessonIndividualReport", () => {
    const std = mockWarner();
    const showSnackbar = jest.fn();

    const fakeFormData: WriteLessonReportProps["data"] = {
        lessonId: "Sample Lesson ID",
        lessonReportId: "Sample Lesson Report ID",
        detailsList: [
            {
                attendanceRemark: "Sample Remark",
                attendanceStatus: 0,
                courseId: "Sample Course ID",
                studentId: "Sample Student ID",
                fieldValuesList: [
                    {
                        valueType: ValueType.VALUE_TYPE_STRING,
                        intValue: 0,
                        boolValue: false,
                        stringValue: "homework",
                        dynamicFieldId: "homework",
                        fieldRenderGuide: "",
                    },
                ],
            },
        ],
    };

    it("should submit lesson report success", async () => {
        let ranOnSuccess = false;

        mockUseMutation({
            submitMockFn: () => {
                return {
                    mutate: (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onSuccess: () => void }
                    ) => {
                        if (!ranOnSuccess) {
                            options.onSuccess();
                            ranOnSuccess = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onSuccessMockFunc = jest.fn();

        const fakeUpsertProps: WriteLessonReportProps = {
            data: fakeFormData,
            onSuccess: onSuccessMockFunc,
        };

        result.current.upsertLessonReport(fakeUpsertProps);
        expect(fakeUpsertProps.onSuccess).toBeCalled();
    });

    it("should get error when submitting lesson report", async () => {
        let ranOnError = false;
        const fakeError = new Error("SUBMIT LESSON REPORT ERROR");

        mockUseMutation({
            submitMockFn: () => {
                return {
                    mutate: (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onError: (error: Error) => void }
                    ) => {
                        if (!ranOnError) {
                            options.onError(fakeError);
                            ranOnError = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onErrorMockFunc = jest.fn();

        const fakeUpsertProps: WriteLessonReportProps = {
            data: fakeFormData,
            onError: onErrorMockFunc,
        };

        result.current.upsertLessonReport(fakeUpsertProps);
        expect(fakeUpsertProps.onError).toBeCalled();
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "[useMutationLessonIndividualReport] [upsertLessonReport]: ",
            fakeError
        );
    });

    it("should save draft lesson report success", async () => {
        let ranOnSuccess = false;

        mockUseMutation({
            saveDraftMockFn: () => {
                return {
                    mutate: (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onSuccess: () => void }
                    ) => {
                        if (!ranOnSuccess) {
                            options.onSuccess();
                            ranOnSuccess = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onSuccessMockFunc = jest.fn();

        const fakeUpsertProps: WriteLessonReportProps = {
            data: fakeFormData,
            onSuccess: onSuccessMockFunc,
        };

        result.current.saveDraftLessonReport(fakeUpsertProps);
        expect(fakeUpsertProps.onSuccess).toBeCalled();
    });

    it("should get error when saving draft lesson report", async () => {
        let ranOnError = false;
        const fakeError = new Error("SAVE DRAFT LESSON REPORT ERROR");

        mockUseMutation({
            saveDraftMockFn: () => {
                return {
                    mutate: (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onError: (error: Error) => void }
                    ) => {
                        if (!ranOnError) {
                            options.onError(fakeError);
                            ranOnError = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onErrorMockFunc = jest.fn();

        const fakeUpsertProps: WriteLessonReportProps = {
            data: fakeFormData,
            onError: onErrorMockFunc,
        };

        result.current.saveDraftLessonReport(fakeUpsertProps);

        expect(fakeUpsertProps.onError).toBeCalled();
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "[useMutationLessonIndividualReport] [saveDraftLessonReport]: ",
            fakeError
        );
    });

    it("should delete lesson report success", async () => {
        let ranOnSuccess = false;

        mockUseMutation({
            deleteMockFn: () => {
                return {
                    mutateAsync: async (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onSuccess: () => Promise<void> }
                    ) => {
                        if (!ranOnSuccess) {
                            await options.onSuccess();
                            ranOnSuccess = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onSuccessMockFunc = jest.fn();

        const fakeDeleteProps: DeleteLessonReportProps = {
            data: { lessonReportId: "Lesson_Report_Id" },
            onSuccess: onSuccessMockFunc,
        };

        await result.current.deleteLessonReport(fakeDeleteProps);
        expect(fakeDeleteProps.onSuccess).toBeCalled();
    });

    it("should get error when deleting lesson report", async () => {
        let ranOnError = false;
        const fakeError = new Error("DELETE LESSON REPORT ERROR");

        mockUseMutation({
            deleteMockFn: () => {
                return {
                    mutateAsync: async (
                        _props: { data: NsLesson_Bob_LessonReportsService.UpsertLessonReport },
                        options: { onError: (error: Error) => Promise<void> }
                    ) => {
                        if (!ranOnError) {
                            await options.onError(fakeError);
                            ranOnError = true;
                        }
                    },
                };
            },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useMutationLessonIndividualReport());

        const onErrorMockFunc = jest.fn();

        const fakeUpsertProps: DeleteLessonReportProps = {
            data: { lessonReportId: "Lesson_Report_Id" },
            onError: onErrorMockFunc,
        };

        await result.current.deleteLessonReport(fakeUpsertProps);

        expect(fakeUpsertProps.onError).toBeCalled();
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "[useMutationLessonIndividualReport] [deleteLessonReport]: ",
            fakeError
        );
    });
});
