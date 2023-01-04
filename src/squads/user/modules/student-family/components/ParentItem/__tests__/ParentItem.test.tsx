import { ProviderTypes } from "src/common/constants/enum";
import { phoneNumberFormat } from "src/squads/user/common/utils/display";
import { createMockListParent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import ParentItem, { ParentItemProps } from "../ParentItem";

import { screen, cleanup, render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useReissueUserPassword from "src/squads/user/hooks/useReissueUserPassword";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useRemoveParent from "src/squads/user/modules/student-family/hooks/useRemoveParent";

const mockDataParents = createMockListParent({ length: 2, student_id: "student_id" });
const mockParent = mockDataParents[0];

jest.mock("src/squads/user/hooks/useReissueUserPassword", () => jest.fn());
jest.mock("src/squads/user/modules/student-family/hooks/useRemoveParent", () => jest.fn());
jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/user/hooks/useTranslate");

const handleOpenDialogConfirm = (type: ProviderTypes): HTMLElement => {
    const buttonAction = screen.getByTestId("ActionPanel__trigger");

    userEvent.click(buttonAction);

    let buttonKey;

    switch (type) {
        case ProviderTypes.RESET_PASSWORD:
            buttonKey = "reIssuePassword";
            break;
        case ProviderTypes.UPDATE:
            buttonKey = "edit";
            break;
        case ProviderTypes.REMOVE:
            buttonKey = "remove";
            break;
        default:
            break;
    }

    const selectedButton = screen.getByText(`ra.common.action.${buttonKey}`);

    userEvent.click(selectedButton);

    let dialog;

    if (type == ProviderTypes.UPDATE) {
        dialog = screen.getByTestId(`DialogWithHeaderFooter_wrapper`);
    } else {
        dialog = screen.getByTestId(`DialogCancelConfirm__dialog`);
    }

    return dialog;
};

const renderComponent = (override?: Partial<ParentItemProps>) => {
    const props: ParentItemProps = {
        studentId: "student_1",
        parents: [],
        parent: mockParent,
        index: 0,
        refetchParents,
    };

    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <ParentItem {...props} {...override} />
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

afterAll(() => {
    cleanup();
});

const refetchParents = jest.fn();

describe("<ParentItem />", () => {
    let reissueUserPassword = jest.fn();
    const removeParent = jest.fn();

    beforeEach(() => {
        (useReissueUserPassword as jest.Mock).mockReturnValue({ reissueUserPassword });
        (useRemoveParent as jest.Mock).mockReturnValue({ removeParent });
    });

    it("should match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct parent info", () => {
        renderComponent();

        const { name, email, phone_number, country } = mockParent.parent_user || {};
        const parentPhone = phone_number || "";
        const parentEmail = email || "";
        const parentName = name || "";

        const phoneNumberText = phoneNumberFormat(country, parentPhone);
        expect(screen.getByText(phoneNumberText)).toBeInTheDocument();
        expect(screen.getByText(parentName)).toBeInTheDocument();
        expect(screen.getByText(parentEmail)).toBeInTheDocument();
    });

    it("should render correct actions", () => {
        renderComponent();

        const moreActionBtn = within(screen.getByTestId("ParentItem__root")).getByTestId(
            "ActionPanel__trigger"
        );

        expect(moreActionBtn).toBeInTheDocument();
        userEvent.click(moreActionBtn);
        expect(screen.getAllByRole("menuitem")).toHaveLength(3);
        const editBtn = screen.getAllByRole("menuitem")[0];
        expect(editBtn).toHaveTextContent("ra.common.action.edit");
        const reIssuePasswordBtn = screen.getAllByRole("menuitem")[1];
        expect(reIssuePasswordBtn).toHaveTextContent("ra.common.action.reIssuePassword");
        const removeBtn = screen.getAllByRole("menuitem")[2];
        expect(removeBtn).toHaveTextContent("ra.common.action.remove");
    });

    it("should render correct dialog confirm re-issue password", () => {
        renderComponent();

        const moreActionBtn = within(screen.getByTestId("ParentItem__root")).getByTestId(
            "ActionPanel__trigger"
        );
        expect(moreActionBtn).toBeInTheDocument();
        userEvent.click(moreActionBtn);

        const buttonReIssuePassword = screen.getByText("ra.common.action.reIssuePassword");

        userEvent.click(buttonReIssuePassword);

        const confirmDialog = screen.getByTestId(`DialogCancelConfirm__dialog`);

        expect(confirmDialog).toBeInTheDocument();
    });

    it("should close dialog confirm re issue password", async () => {
        renderComponent();

        const renderConfirmDialog = handleOpenDialogConfirm(ProviderTypes.RESET_PASSWORD);

        const buttonCancel = within(renderConfirmDialog).getByText(`ra.common.action.cancel`);

        expect(buttonCancel).toBeInTheDocument();
        userEvent.click(buttonCancel);

        await waitFor(() => {
            expect(screen.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument();
        });
    });

    it("should render correctly when use re-issue password successfully", async () => {
        reissueUserPassword.mockReturnValue({
            successful: true,
            userId: "01F4V8P0M4TSYP4DQK0WEFB53R",
            newPassword: "EFB53R",
        });

        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        renderComponent();

        const renderConfirmDialog = handleOpenDialogConfirm(ProviderTypes.RESET_PASSWORD);

        const buttonConfirm = within(renderConfirmDialog).getByText(`ra.common.action.confirm`);
        expect(buttonConfirm).toBeInTheDocument();
        userEvent.click(buttonConfirm);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith(
                "resources.students_erp.messages.success.reIssuePassword"
            );
        });
    });

    it("should render correctly when use re-issue password failed", async () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        renderComponent();

        const renderConfirmDialog = handleOpenDialogConfirm(ProviderTypes.RESET_PASSWORD);

        const buttonConfirm = within(renderConfirmDialog).getByText(`ra.common.action.confirm`);
        expect(buttonConfirm).toBeInTheDocument();
        userEvent.click(buttonConfirm);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith(
                "resources.students_erp.messages.error.overrideUserPassword",
                "error"
            );
        });
    });

    it("should render correct dialog confirm remove parent", () => {
        renderComponent();

        const moreActionBtn = within(screen.getByTestId("ParentItem__root")).getByTestId(
            "ActionPanel__trigger"
        );

        expect(moreActionBtn).toBeInTheDocument();
        userEvent.click(moreActionBtn);

        const buttonRemoveParent = screen.getByText("ra.common.action.remove");

        userEvent.click(buttonRemoveParent);

        const confirmDialog = screen.getByTestId(`DialogCancelConfirm__dialog`);

        expect(confirmDialog).toBeInTheDocument();
    });

    it("should call removeParent function on successful removal of parent item", async () => {
        removeParent.mockImplementation((_, args) => {
            args.onSuccess();
        });

        renderComponent();

        const moreActionBtn = within(screen.getByTestId("ParentItem__root")).getByTestId(
            "ActionPanel__trigger"
        );

        userEvent.click(moreActionBtn);

        const buttonRemoveParent = screen.getByText("ra.common.action.remove");
        userEvent.click(buttonRemoveParent);

        const renderConfirmDialog = handleOpenDialogConfirm(ProviderTypes.REMOVE);
        const confirmRemoveBtn = within(renderConfirmDialog).getByTestId(
            `FooterDialogConfirm__buttonSave`
        );

        expect(confirmRemoveBtn).toBeInTheDocument();

        userEvent.click(confirmRemoveBtn);

        await waitFor(() => {
            expect(removeParent).toBeCalledTimes(1);
        });

        expect(refetchParents).toBeCalledTimes(1);
    });

    it("should render update parent info required fields", () => {
        renderComponent();

        const moreActionBtn = within(screen.getByTestId("ParentItem__root")).getByTestId(
            "ActionPanel__trigger"
        );

        userEvent.click(moreActionBtn);

        const renderConfirmDialog = handleOpenDialogConfirm(ProviderTypes.UPDATE);
        const buttonConfirm = within(renderConfirmDialog).getByTestId(
            `FooterDialogConfirm__buttonSave`
        );

        expect(buttonConfirm).toBeInTheDocument();

        const editParentNameField = screen.getByTestId(`FormUpsertParent__inputName`);
        const selectParentRelationshipField = screen.getByTestId(
            `FormUpsertParent__selectRelationship`
        );
        const editParentEmailField = screen.getByTestId(`FormUpsertParent__inputEmail`);

        expect(editParentNameField).toBeInTheDocument();
        expect(selectParentRelationshipField).toBeInTheDocument();
        expect(editParentEmailField).toBeInTheDocument();
    });
});
