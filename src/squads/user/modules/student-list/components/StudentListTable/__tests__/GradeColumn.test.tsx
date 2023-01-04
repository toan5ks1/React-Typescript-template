import {
    createMockListStudentWithFilter,
    createMockMapGradeOfStudents,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import GradeColumn, { GradeColumnProps } from "../GradeColumn";

import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useNormalizeGrades from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/user/hooks/useGetGradeAndStatusOfStudents", () => ({
    __esModule: true,
    default: () => ({
        mapGradeOfStudents: new Map(),
        isLoading: false,
    }),
}));

describe("<GradeColumn/>", () => {
    const mockStudents = createMockListStudentWithFilter("id01");
    const mockMapGrades = createMockMapGradeOfStudents(mockStudents[0].user_id);
    const renderComponent = (props?: Partial<GradeColumnProps>) => {
        const { result } = renderHook(() => useNormalizeGrades(["id01"]), {
            wrapper: TestCommonAppProvider,
        });

        return render(
            <GradeColumn
                studentId={"id01"}
                loading={false}
                mapGrades={mockMapGrades}
                getGradeName={result.current.getGradeName}
                {...props}
            />
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content Grade 1", () => {
        renderComponent();

        const grade = mockMapGrades.get("id01")?.current_grade;

        expect(screen.getByText(`Grade ${grade}`)).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnGrade__content")).toBeInTheDocument();
    });

    it("should render loading", () => {
        renderComponent({ loading: true });

        expect(screen.getByTestId("TableColumnGrade__loading")).toBeInTheDocument();
    });
});
