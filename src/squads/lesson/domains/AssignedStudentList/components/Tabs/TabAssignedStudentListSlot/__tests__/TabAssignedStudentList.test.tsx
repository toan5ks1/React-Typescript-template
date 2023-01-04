import { TestApp } from "src/squads/lesson/test-utils";

import TabAssignedStudentList, {
    TabAssignedStudentListProps,
} from "src/squads/lesson/domains/AssignedStudentList/components/Tabs/TabAssignedStudentListSlot";

import { screen, render } from "@testing-library/react";
import { AssignedStudentListTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";

describe("<TabAssignedStudentList />", () => {
    const HookFormComponent = (props: TabAssignedStudentListProps) => {
        return (
            <TestApp>
                <TabAssignedStudentList {...props} />
            </TestApp>
        );
    };

    it("should render assigned student recurring list correct layout", () => {
        render(
            <HookFormComponent assignedStudentListTabType={AssignedStudentListTypes.RECURRING} />
        );
        const table = screen.getByTestId("TableAssignedStudentWithPaging__root");
        expect(table).toBeInTheDocument();
    });

    it("should render assigned student slot list correct layout", () => {
        render(<HookFormComponent assignedStudentListTabType={AssignedStudentListTypes.SLOT} />);
        const table = screen.getByTestId("TableAssignedStudentWithPaging__root");
        expect(table).toBeInTheDocument();
    });
});
