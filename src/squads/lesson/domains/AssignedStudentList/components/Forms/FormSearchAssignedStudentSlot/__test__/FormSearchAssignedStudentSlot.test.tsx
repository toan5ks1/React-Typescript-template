import { TestApp } from "src/squads/lesson/test-utils";

import FormSearchAssignedStudentSlot from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormSearchAssignedStudentSlot";

import { screen, render } from "@testing-library/react";

describe("<FormSearchAssignedStudentSlot />", () => {
    it("should render search form correct layout", () => {
        render(
            <TestApp>
                <FormSearchAssignedStudentSlot />
            </TestApp>
        );
        const searchForm = screen.getByTestId("FormSearchAssignedStudent__root");
        expect(searchForm).toBeInTheDocument();
    });
});
