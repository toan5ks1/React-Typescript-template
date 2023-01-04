import {
    GradesOfStudentsListQuery,
    GradesOfStudentsListQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentService from "src/squads/user/service/define-service/course-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import {
    createMockMapGradeOfStudents,
    creatMockStudentWithGrade,
} from "src/squads/user/test-utils/mocks/student";
import { TestQueryWrapper } from "src/squads/user/test-utils/providers";

import useGetGradeOfStudents, {
    UseGetGradeAndStatusOfStudentsReturn,
} from "../useGetGradeAndStatusOfStudents";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});
describe("useGetGradeOfStudents", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return map grade of student", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "student"; action: keyof typeof studentService.query }) =>
                (
                    _params: GradesOfStudentsListQueryVariables,
                    options?: UseQueryBaseOptions<GradesOfStudentsListQuery["students"] | undefined>
                ) => {
                    if (resource.entity === "student") {
                        const dataMock = options?.selector?.([creatMockStudentWithGrade("01", 1)]);
                        return { data: dataMock };
                    }
                }
        );

        const { result }: RenderHookResult<string[], UseGetGradeAndStatusOfStudentsReturn> =
            renderHook(() => useGetGradeOfStudents(["student_id"]), { wrapper: TestQueryWrapper });

        expect(result.current.mapGradeOfStudents).toEqual(createMockMapGradeOfStudents());
    });

    it("should show snackbar when fetching students fail", async () => {
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "student"; action: keyof typeof studentService.query }) =>
                (
                    _params: GradesOfStudentsListQueryVariables,
                    options?: UseQueryBaseOptions<GradesOfStudentsListQuery["students"] | undefined>
                ) => {
                    if (resource.entity === "student") {
                        const dataMock = options?.selector?.([]);
                        options?.onError?.(new Error("$$__ERROR_STUDENT"));

                        return { data: dataMock };
                    }
                }
        );

        const { waitFor } = renderHook(() => useGetGradeOfStudents(["student_id"]), {
            wrapper: TestQueryWrapper,
        });

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
        });
    });
});
