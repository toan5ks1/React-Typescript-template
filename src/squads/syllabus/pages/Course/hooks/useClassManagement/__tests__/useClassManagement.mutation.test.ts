import {
    Lesson_ClassListByCourseIdV3Query,
    Lesson_ClassListByCourseIdV3QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Master_ClassService } from "src/squads/syllabus/services/master/class-master-service/types";
import {
    DataWithTotal,
    UseQueryPaginationOptions,
} from "src/squads/syllabus/services/service-creator";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";
import { MockInferMutationFn } from "src/squads/syllabus/test-utils/types";

import TranslationProvider from "src/squads/syllabus/providers/TranslationProvider";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";
import useClassManagement, {
    UseClassManagementMutateProps,
} from "src/squads/syllabus/pages/Course/hooks/useClassManagement";

const mockPagination = createFakePagination();

jest.mock("src/squads/syllabus/services/infer-query", () => {
    let ranSelector = false;

    return {
        __esModule: true,
        inferQueryPagination:
            (inferBase: { entity: "class"; action: "classGetListByCourseId" }) =>
            (
                _params: Lesson_ClassListByCourseIdV3QueryVariables,
                options: UseQueryPaginationOptions<
                    DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"] | undefined>,
                    DataWithTotal<ClassData[]>
                >
            ) => {
                const { entity, action } = inferBase;

                switch (true) {
                    case entity === "class" && action === "classGetListByCourseId": {
                        if (!ranSelector) {
                            options.selector?.({ data: [], total: 0 });
                            ranSelector = true;
                        }

                        return {
                            data: { data: [], total: 0 },
                            result: { isLoading: false, refetch: jest.fn() },
                            pagination: mockPagination,
                        };
                    }
                }
            },
    };
});

jest.mock("src/squads/syllabus/services/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/internals/logger/logger");

const mockInferMutation = (params?: {
    classUpdateMockFn?: MockInferMutationFn<NsSyllabus_Master_ClassService.UpdateClassRequest>;
    classDeleteMockFn?: MockInferMutationFn<NsSyllabus_Master_ClassService.DeleteClassRequest>;
}) => {
    const { classUpdateMockFn, classDeleteMockFn } = params || {};

    (inferMutation as jest.Mock).mockImplementation(
        ({ action }: { entity: "classMaster"; action: "classUpdate" | "classDelete" }) => {
            switch (true) {
                case action === "classUpdate": {
                    if (classUpdateMockFn) return classUpdateMockFn;
                    return () => ({ mutate: jest.fn(), isLoading: false });
                }

                case action === "classDelete": {
                    if (classDeleteMockFn) return classDeleteMockFn;
                    return () => ({ mutate: jest.fn(), isLoading: false });
                }
            }
        }
    );
};

describe("useClassManagement", () => {
    const showSnackbar = jest.fn();
    const mockMutateFn = jest.fn();

    const mutateProps: UseClassManagementMutateProps = {
        classData: {
            class_id: "class_id",
            name: "class_name",
            location: { location_id: "location_id", name: "location_name" },
        },
        onSuccess: jest.fn(),
        onError: jest.fn(),
    };

    it("should edit class success", async () => {
        let ranOnSuccess = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        mockInferMutation({
            classUpdateMockFn: (mutateOptions) => {
                return {
                    mutate: mockMutateFn.mockImplementation(
                        async (_, { onSuccess }: { onSuccess: () => void }) => {
                            if (!ranOnSuccess) {
                                await mutateOptions.onSuccess?.(
                                    { classId: "class_id", name: "class_name" },
                                    { data: { classId: "class_id", name: "class_name" } },
                                    {}
                                );

                                onSuccess();
                                ranOnSuccess = true;
                            }
                        }
                    ),
                };
            },
        });

        const {
            result: { current },
            waitFor,
        } = renderHook(() => useClassManagement({ courseId: "course_id" }), {
            wrapper: TranslationProvider,
        });

        current.handleEditClass(mutateProps);

        const [payload] = getCallParamsAt(mockMutateFn, 0);

        expect(payload).toEqual({ classId: "class_id", name: "class_name" });
        expect(showSnackbar).toBeCalledWith("You have updated the class successfully");
        await waitFor(() => expect(mutateProps.onSuccess).toBeCalled());
    });

    it("should NOT edit class", async () => {
        let ranOnError = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        mockInferMutation({
            classUpdateMockFn: (mutateOptions) => {
                return {
                    mutate: mockMutateFn.mockImplementation(
                        async (_, { onError }: { onError: () => void }) => {
                            if (!ranOnError) {
                                await mutateOptions.onError?.(
                                    Error("FAKE ERROR"),
                                    { data: { classId: "class_id", name: "class_name" } },
                                    {}
                                );

                                onError();
                                ranOnError = true;
                            }
                        }
                    ),
                };
            },
        });

        const {
            result: { current },
            waitFor,
        } = renderHook(() => useClassManagement({ courseId: "course_id" }), {
            wrapper: TranslationProvider,
        });

        current.handleEditClass(mutateProps);

        const [payload] = getCallParamsAt(mockMutateFn, 0);

        expect(payload).toEqual({ classId: "class_id", name: "class_name" });
        expect(showSnackbar).toBeCalledWith(
            "We meet an unknown error. Please try again or contact with Staff.",
            "error"
        );
        await waitFor(() => expect(mutateProps.onError).toBeCalled());
    });
});

describe("useClassManagement", () => {
    const showSnackbar = jest.fn();
    const mockMutateFn = jest.fn();

    const mutateProps: UseClassManagementMutateProps = {
        classData: {
            class_id: "class_id",
            name: "class_name",
            location: { location_id: "location_id", name: "location_name" },
        },
        onSuccess: jest.fn(),
        onError: jest.fn(),
    };

    it("should delete class success", async () => {
        let ranOnSuccess = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        mockInferMutation({
            classDeleteMockFn: (mutateOptions) => {
                return {
                    mutate: mockMutateFn.mockImplementation(
                        async (_, { onSuccess }: { onSuccess: () => void }) => {
                            if (!ranOnSuccess) {
                                await mutateOptions.onSuccess?.(
                                    { classId: "class_id" },
                                    { data: { classId: "class_id" } },
                                    {}
                                );

                                onSuccess();
                                ranOnSuccess = true;
                            }
                        }
                    ),
                };
            },
        });

        const {
            result: { current },
            waitFor,
        } = renderHook(() => useClassManagement({ courseId: "course_id" }), {
            wrapper: TranslationProvider,
        });

        current.handleDeleteClass(mutateProps);

        const [payload] = getCallParamsAt(mockMutateFn, 0);

        expect(payload).toEqual({ classId: "class_id" });
        expect(showSnackbar).toBeCalledWith("You have deleted the class successfully");
        await waitFor(() => expect(mutateProps.onSuccess).toBeCalled());
    });

    it("should NOT delete class", async () => {
        let ranOnError = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        mockInferMutation({
            classDeleteMockFn: (mutateOptions) => {
                return {
                    mutate: mockMutateFn.mockImplementation(
                        async (_, { onError }: { onError: () => void }) => {
                            if (!ranOnError) {
                                await mutateOptions.onError?.(
                                    Error("FAKE ERROR"),
                                    { data: { classId: "class_id" } },
                                    {}
                                );

                                onError();
                                ranOnError = true;
                            }
                        }
                    ),
                };
            },
        });

        const {
            result: { current },
            waitFor,
        } = renderHook(() => useClassManagement({ courseId: "course_id" }), {
            wrapper: TranslationProvider,
        });

        current.handleDeleteClass(mutateProps);

        const [payload] = getCallParamsAt(mockMutateFn, 0);

        expect(payload).toEqual({ classId: "class_id" });
        expect(showSnackbar).toBeCalledWith(
            "We meet an unknown error. Please try again or contact with Staff.",
            "error"
        );
        await waitFor(() => expect(mutateProps.onError).toBeCalled());
    });
});
