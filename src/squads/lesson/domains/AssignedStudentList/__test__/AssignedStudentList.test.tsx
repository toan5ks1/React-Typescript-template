import { render, screen } from "@testing-library/react";
import AssignedStudentList from "src/squads/lesson/domains/AssignedStudentList/AssignedStudentList";
import TestApp from "src/squads/lesson/test-utils/TestApp";

describe("<AssignedStudentList /> testing", () => {
    beforeEach(() => {
        render(
            <TestApp>
                <AssignedStudentList />
            </TestApp>
        );
    });

    it("should display AssignedStudentList properly", () => {
        expect(screen.getByTestId("AssignedStudentList__root")).toBeInTheDocument();
        expect(screen.getByTestId("TabLayout")).toBeInTheDocument();
    });
});
