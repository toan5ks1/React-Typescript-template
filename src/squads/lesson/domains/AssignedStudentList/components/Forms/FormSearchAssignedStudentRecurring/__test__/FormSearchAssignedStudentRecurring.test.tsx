import { TestApp } from "src/squads/lesson/test-utils";

import FormSearchAssignedStudentRecurring from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormSearchAssignedStudentRecurring";

import { screen, render } from "@testing-library/react";

describe("<FormSearchAssignedStudentRecurring />", () => {
    it("should render search form correct layout", () => {
        render(
            <TestApp>
                <FormSearchAssignedStudentRecurring />
            </TestApp>
        );
        const searchForm = screen.getByTestId("FormSearchAssignedStudent__root");
        expect(searchForm).toBeInTheDocument();
    });
});
