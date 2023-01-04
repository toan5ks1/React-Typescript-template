import { MutationMenus } from "src/common/constants/enum";

import HeaderLessonReportWithAction, {
    HeaderLessonReportWithActionProps,
} from "src/squads/lesson/pages/LessonManagement/components/Headers/HeaderLessonReportWithAction";

import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

const renderHeaderLessonReportWithActionWrapper = (props: HeaderLessonReportWithActionProps) => {
    return render(
        <TestThemeProvider>
            <HeaderLessonReportWithAction {...props} />
        </TestThemeProvider>
    );
};

describe("<HeaderLessonReportWithAction />", () => {
    it("should be trigger action of actions list", () => {
        const editActionNonConfirm = {
            action: {
                action: MutationMenus.EDIT,
                label: "Edit",
                withConfirm: false,
            },
            mutation: jest.fn(),
        };

        const deleteActionWithConfirm = {
            action: {
                action: MutationMenus.DELETE,
                label: "Delete",
                withConfirm: true,
            },
            mutation: jest.fn(),
        };

        const props: HeaderLessonReportWithActionProps = {
            title: "Title sample",
            actionsList: [editActionNonConfirm, deleteActionWithConfirm],
        };

        const wrapper: RenderResult = renderHeaderLessonReportWithActionWrapper(props);

        expect(wrapper.getByTestId("HeaderLessonReportWithAction__title")).toBeVisible();

        const actionPanelBtn = wrapper.getByTestId("ActionPanel__trigger");
        userEvent.click(actionPanelBtn);

        userEvent.click(screen.getByText("Edit"));
        expect(editActionNonConfirm.mutation).toBeCalled();

        userEvent.click(actionPanelBtn);
        userEvent.click(screen.getByText("Delete"));

        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeVisible();
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(deleteActionWithConfirm.mutation).toBeCalled();
    });
});
