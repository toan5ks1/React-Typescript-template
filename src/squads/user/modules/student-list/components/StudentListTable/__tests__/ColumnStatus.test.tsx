import {
    createMockListStudentWithFilter,
    createMockMapGradeOfStudents,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StatusColumn, { StatusColumnProps } from "../StatusColumn";

import { render, screen } from "@testing-library/react";

describe("<TableColumnStatus />", () => {
    const mockStudents = createMockListStudentWithFilter("id01");
    const mockMapGrades = createMockMapGradeOfStudents(mockStudents[0].user_id);

    const renderComponent = (props: StatusColumnProps) => {
        return render(
            <TestCommonAppProvider>
                <StatusColumn {...props} data-testid="TableColumnStatus__content" />
            </TestCommonAppProvider>
        );
    };

    it("should not render UI with status is empty", () => {
        renderComponent({
            loading: false,
            studentId: "",
            mapGrades: mockMapGrades,
        });

        expect(screen.queryByTestId("TableColumnStatus__content")).not.toBeInTheDocument();
        expect(screen.queryByTestId("TableColumnStatus__loading")).not.toBeInTheDocument();
    });

    it("should render loading UI", () => {
        renderComponent({ loading: true, studentId: "id01", mapGrades: mockMapGrades });

        expect(screen.getByTestId("TableColumnStatus__loading")).toBeInTheDocument();
    });

    it("should render table UI with status is valid", () => {
        renderComponent({ loading: false, studentId: "id01", mapGrades: mockMapGrades });

        expect(screen.getByTestId("TableColumnStatus__content")).toBeInTheDocument();
    });
});
