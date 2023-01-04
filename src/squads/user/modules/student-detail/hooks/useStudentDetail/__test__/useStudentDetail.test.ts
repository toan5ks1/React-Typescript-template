import type { ArrayElement } from "src/common/constants/types";
import type {
    StudentsOneV3Query,
    StudentsOneV3QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentService from "src/squads/user/service/define-service/student-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useStudentDetail from "src/squads/user/modules/student-detail/hooks/useStudentDetail";

const mockStudentData = createMockStudent({ id: "student_id_01", current_grade: 10 });

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

describe("useStudentDetail", () => {
    it("should return students list", () => {
        const selector = jest.fn();
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "student"; action: keyof typeof studentService.query }) =>
                (
                    _params: StudentsOneV3QueryVariables,
                    options?: UseQueryBaseOptions<
                        ArrayElement<StudentsOneV3Query["students"]> | undefined
                    >
                ) => {
                    if (resource.action === "userGetOneStudentV4") {
                        options?.onSuccess?.(mockStudentData);
                        options?.selector?.(mockStudentData);

                        return { data: mockStudentData, isLoading: false, refetch: jest.fn() };
                    }
                }
        );

        const { result } = renderHook(() =>
            useStudentDetail({ studentId: "student_id", selector })
        );

        expect(result.current.student).toEqual(mockStudentData);
        expect(result.current.isLoading).toEqual(false);
        expect(typeof result.current.refetch).toEqual("function");
        expect(selector).toBeCalledWith(mockStudentData);
    });
    it("should show error snackbar when fetch data fail", () => {
        const mockShowSnackBar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackBar);
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "student"; action: keyof typeof studentService.query }) =>
                (
                    _params: StudentsOneV3QueryVariables,
                    options?: UseQueryBaseOptions<
                        ArrayElement<StudentsOneV3Query["students"]> | undefined
                    >
                ) => {
                    if (resource.action === "userGetOneStudentV4") {
                        options?.onError?.(Error("fetch data failed"));
                        return { data: null, isLoading: false, refetch: jest.fn() };
                    }
                }
        );
        renderHook(() => useStudentDetail({ studentId: "student_id" }), {
            wrapper: TestCommonAppProvider,
        });
        expect(mockShowSnackBar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackBar).toHaveBeenCalledWith(
            "Unable to load data, please try again!",
            "error"
        );
    });
});
