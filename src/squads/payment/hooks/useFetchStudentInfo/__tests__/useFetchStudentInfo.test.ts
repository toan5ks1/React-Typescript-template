import {
    Payment_GetStudentsManyV3Query,
    Payment_GetStudentsManyV3QueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { studentsService } from "src/squads/payment/service/bob/students-service/students-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";

const mockStudentInfo = createMockStudentInfo();

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

describe("useFetchStudentInfo", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "students"; action: keyof typeof studentsService.query }) =>
                (
                    _params: Payment_GetStudentsManyV3QueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetOneStudent") {
                            callbackRan = true;

                            options.onSuccess?.(mockStudentInfo);

                            return {
                                data: mockStudentInfo,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: undefined, isFetching: false };
                }
        );

        const { result } = renderHook(() => useFetchStudentInfo({ studentIds: ["student_id_1"] }));

        expect(result.current.data).toEqual(mockStudentInfo);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = Error("Student service error");

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "students"; action: keyof typeof studentsService.query }) =>
                (
                    _params: Payment_GetStudentsManyV3QueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetOneStudent") {
                        options.onError?.(queryError);

                        return { data: undefined, isFetching: false };
                    }
                }
        );

        renderHook(() => useFetchStudentInfo({ studentIds: ["student_id_1"] }));

        expect(std.warn).toBeCalledWith("useFetchStudentInfo", queryError);

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData students - paymentGetOneStudent",
            "error"
        );
    });
});
