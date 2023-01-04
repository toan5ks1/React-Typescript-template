import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    GradesOfStudentsListQuery,
    GradesOfStudentsListQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import {
    createMockMapGradeOfStudents,
    creatMockStudentWithGrade,
} from "src/squads/lesson/test-utils/student";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useGetGradeOfStudents, {
    UseGetGradeAndStatusOfStudentsReturn,
} from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return jest.fn();
});

jest.mock("src/hooks/useDataProvider", () => {
    return jest.fn();
});

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

describe("useGetGradeOfStudents", () => {
    let showSnackbar: jest.Mock;

    const std = mockWarner();

    beforeEach(() => {
        showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return map grade of student", async () => {
        const mockMapStudents = createMockMapGradeOfStudents();

        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "students"; action: "studentsGetGradesOfStudent" }) =>
                (
                    _params: GradesOfStudentsListQueryVariables,
                    options: UseQueryBaseOptions<GradesOfStudentsListQuery["students"] | undefined>
                ) => {
                    const mapStudents = options?.selector?.([creatMockStudentWithGrade("01", 1)]);
                    expect(mapStudents).toEqual(mockMapStudents);

                    return {
                        data: mockMapStudents,
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        const { result }: RenderHookResult<string[], UseGetGradeAndStatusOfStudentsReturn> =
            renderHook(() => useGetGradeOfStudents(["student_id"]), { wrapper: TestQueryWrapper });

        expect(result.current.mapGradeOfStudents).toEqual(mockMapStudents);
    });

    it("should show snackbar when fetching students fail", async () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "students"; action: "studentsGetGradesOfStudent" }) =>
                (
                    _params: GradesOfStudentsListQueryVariables,
                    options: UseQueryBaseOptions<GradesOfStudentsListQuery["students"] | undefined>
                ) => {
                    options.onError?.(Error("$$__ERROR_STUDENT"));

                    return {
                        data: [],
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        const { waitFor } = renderHook(() => useGetGradeOfStudents(["student_id"]), {
            wrapper: TestQueryWrapper,
        });

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
        });

        expect(std.warn).toBeCalledWith(
            `useGetGradeOfStudents get student`,
            Error("$$__ERROR_STUDENT")
        );
    });
});
