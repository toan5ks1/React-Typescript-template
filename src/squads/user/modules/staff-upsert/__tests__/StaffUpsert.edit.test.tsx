import { ModeOpenDialog } from "src/common/constants/enum";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import {
    createMockStaff,
    staffOneMockData,
    mockUseStaffInfoRulesReturn,
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
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useUserToggleFeature from "src/squads/user/hooks/useUserFeatureFlag";
import StaffUpsert, { StaffUpsertProps } from "src/squads/user/modules/staff-upsert/StaffUpsert";
import useUpsertStaff, {
    UseUpsertStaffReturn,
} from "src/squads/user/modules/staff-upsert/hooks/useUpsertStaff";
import useUserGroupsList from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUpsertStaff", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useRedirect", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
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

describe("<StaffUpsert /> edit staff", () => {
    const mockDefaultValue = createMockStaff();
    const mockMutateFn = jest.fn();

    const renderStaffUpsert = (
        props: StaffUpsertProps,
        isSuccessful: boolean = true
    ): RenderResult => {
        (useUpsertStaff as jest.Mock).mockImplementation(
            (): UseUpsertStaffReturn => ({
                updateStaff: async (data, options) => {
                    await options?.onSuccess?.(
                        { successful: isSuccessful },
                        {} as NsUsermgmtStaffService.UpdateStaffReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
                createStaff: jest.fn(),
            })
        );

        (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
            options: staffOneMockData.user.user_group_members.map(
                (userGroup) => userGroup.user_group
            ),
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
        mode: ModeOpenDialog.EDIT,
        defaultValues: staffOneMockData,
    };

    it("should match snapshot", () => {
        renderStaffUpsert(staffUpsertProps);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });
    it("should match proper form title", () => {
        renderStaffUpsert(staffUpsertProps);
        const title = screen.getByTestId("DialogFullScreen__dialogTitle");
        expect(title).toHaveTextContent("Edit Staff");
    });
    it("should initial input value correspond to the defaultValue prop", () => {
        renderStaffUpsert(staffUpsertProps);
        const nameInput = screen.getByTestId("StaffForm__name") as HTMLInputElement;
        const emailInput = screen.getByTestId("StaffForm__email") as HTMLInputElement;
        const userGroupChips = screen.getAllByTestId("UserGroupsSelectInputHF__tagBox");

        expect(nameInput).toHaveValue(mockDefaultValue.user?.name);
        expect(emailInput).toHaveValue(mockDefaultValue.user?.email);
        expect(userGroupChips).toHaveLength(mockDefaultValue.user?.user_group_members?.length);

        mockDefaultValue?.user?.user_group_members?.forEach((userGroup, index) => {
            expect(userGroup?.user_group?.user_group_name).toBe(userGroupChips[index]?.textContent);
        });

        expect(userGroupChips[0]?.textContent).toBe(userGroupChips[1]?.textContent);
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
        const staffNameInput = screen.getByTestId("StaffForm__name") as HTMLInputElement;
        const staffEmailInput = screen.getByTestId("StaffForm__name") as HTMLInputElement;
        userEvent.clear(staffNameInput);
        userEvent.clear(staffEmailInput);
        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);

        await checkErrorMessage(1, "This field is required");
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
        renderStaffUpsert(staffUpsertProps);
        changeTextInput("StaffForm__name", " edited");
        changeAutocompleteInput("UserGroupsAutocompleteHF__autocomplete", "User Group 00");

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    formDataUpsert: {
                        staffId: mockDefaultValue.staff_id,
                        name: mockDefaultValue.user?.name + " edited",
                        email: mockDefaultValue.user?.email,
                        userGroupsList: mockDefaultValue.user?.user_group_members.map(
                            (item) => item.user_group
                        ),
                    },
                },
                { onSuccess: expect.any(Function) }
            );
        });
    });

    it("should prevent user from clicking save when saving", async () => {
        renderStaffUpsert(staffUpsertProps);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);
        await waitFor(() => {
            expect(saveBtn).toBeDisabled();
        });
    });

    it("should show error snackbar when response value is not success", async () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderStaffUpsert(staffUpsertProps, false);
        changeTextInput("StaffForm__name", " edited");

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveBtn);
        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("Updated failed", "error");
        });
    });

    it("should render options with duplicated label", () => {
        renderStaffUpsert(staffUpsertProps);
        expect(screen.getAllByTestId("UserGroupsSelectInputHF__tagBox")).toHaveLength(
            staffOneMockData?.user.user_group_members?.length
        );
    });
});
