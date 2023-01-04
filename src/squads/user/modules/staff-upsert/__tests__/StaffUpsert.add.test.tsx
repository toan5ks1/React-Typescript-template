import { ModeOpenDialog } from "src/common/constants/enum";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import {
    mockUseStaffInfoRulesReturn,
    createStaffResp,
    MOCK_STAFF_USERS_DATA,
} from "src/squads/user/test-utils/mocks/staff";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/user/test-utils/providers";
import {
    changeAutocompleteInput,
    changeTextInput,
    checkErrorMessage,
} from "src/squads/user/test-utils/utils";

import { screen, render, RenderResult, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useRedirect from "src/squads/user/hooks/useRedirect";
import useUserToggleFeature from "src/squads/user/hooks/useUserFeatureFlag";
import StaffUpsert, { StaffUpsertProps } from "src/squads/user/modules/staff-upsert/StaffUpsert";
import useUpsertStaff, {
    UseUpsertStaffReturn,
} from "src/squads/user/modules/staff-upsert/hooks/useUpsertStaff";
import useUserGroupsList from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";
import { mockUserGroupListWithDuplicatedLabel } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUpsertStaff", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useRedirect", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-upsert/hooks/useStaffInfoRules", () => {
    return {
        __esModule: true,
        default: () => mockUseStaffInfoRulesReturn,
    };
});

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUserGroupsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StaffUpsert /> add new staff", () => {
    const mockMutateFn = jest.fn();
    const renderStaffUpsert = (props: StaffUpsertProps): RenderResult => {
        (useUpsertStaff as jest.Mock).mockImplementation(
            (): UseUpsertStaffReturn => ({
                createStaff: async (data, options) => {
                    await options?.onSuccess?.(
                        createStaffResp,
                        {} as NsUsermgmtStaffService.CreateStaffReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
                updateStaff: jest.fn(),
            })
        );

        (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
            options: mockUserGroupListWithDuplicatedLabel,
            loading: false,
            setInputVal: jest.fn(),
        });

        (useUserToggleFeature as jest.Mock).mockReturnValue(true);

        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider>
                        <StaffUpsert {...props} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    const staffUpsertProps: StaffUpsertProps = {
        open: true,
        onClose: jest.fn(),
        onSave: jest.fn(),
        mode: ModeOpenDialog.ADD,
    };
    it("should match snapshot", () => {
        renderStaffUpsert(staffUpsertProps);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });
    it("should match proper form title", () => {
        renderStaffUpsert(staffUpsertProps);
        const title = screen.getByTestId("DialogFullScreen__dialogTitle");
        expect(title).toHaveTextContent("Add Staff");
    });

    it("should initial input value is empty", () => {
        renderStaffUpsert(staffUpsertProps);
        const nameInput = screen.getByTestId("StaffForm__name") as HTMLInputElement;
        const emailInput = screen.getByTestId("StaffForm__email") as HTMLInputElement;
        const userGroupsList = screen.getByTestId("UserGroupsAutocompleteHF__autocomplete");
        const userGroupChip = within(userGroupsList).queryByTestId("AutocompleteBase__tagBox");

        expect(nameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(userGroupChip).not.toBeInTheDocument();
    });

    it("should open dialog cancel confirm and function onClose have been called", () => {
        renderStaffUpsert(staffUpsertProps);

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);
        const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(dialogConfirm).toBeInTheDocument();

        const buttonConfirm = within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonConfirm);
        expect(staffUpsertProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("should validate when required fields are not met", async () => {
        renderStaffUpsert(staffUpsertProps);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);

        await checkErrorMessage(2, "This field is required");
    });

    it("should validate invalid email input", async () => {
        renderStaffUpsert(staffUpsertProps);

        changeTextInput("StaffForm__email", "invalid email");
        changeTextInput("StaffForm__name", "valid name");

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);

        await checkErrorMessage(1, "Email address is not valid");
    });

    it("should call upsert mutation when inputs are valid", async () => {
        const mockPush = jest.fn();
        (useRedirect as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        renderStaffUpsert(staffUpsertProps);
        changeTextInput("StaffForm__name", MOCK_STAFF_USERS_DATA.name);
        changeTextInput("StaffForm__email", MOCK_STAFF_USERS_DATA.email);
        changeAutocompleteInput("UserGroupsAutocompleteHF__autocomplete", "User Group 00");

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);

        expect(useUserGroupsList).toBeCalled();
        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    formDataUpsert: {
                        staffId: undefined,
                        name: MOCK_STAFF_USERS_DATA.name,
                        email: MOCK_STAFF_USERS_DATA.email,
                        userGroupsList: [mockUserGroupListWithDuplicatedLabel[0]],
                    },
                },
                { onSuccess: expect.any(Function) }
            );
        });
        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(`/user/staff/${createStaffResp.staff?.staffId}/show`);
    });

    it("should prevent user from clicking save when saving", async () => {
        renderStaffUpsert(staffUpsertProps);
        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);
        await waitFor(() => {
            expect(saveBtn).toBeDisabled();
        });
    });

    it("should allow to select two user groups with the same name", async () => {
        const numberOfUserGroupsToAssign = 2;

        renderStaffUpsert(staffUpsertProps);

        for (let i = 0; i < numberOfUserGroupsToAssign; i++) {
            changeAutocompleteInput("UserGroupsAutocompleteHF__autocomplete", "User Group 00");
        }

        expect(screen.getAllByTestId("UserGroupsSelectInputHF__tagBox")).toHaveLength(
            numberOfUserGroupsToAssign
        );
    });
});
