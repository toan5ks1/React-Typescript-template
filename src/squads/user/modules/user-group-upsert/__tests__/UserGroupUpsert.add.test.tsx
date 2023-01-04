import { ModeOpenDialog } from "src/common/constants/enum";
import { UserGroupInfo } from "src/squads/user/common/types/user-group";
import { inferQuery } from "src/squads/user/service/infer-service";
import { mockTreeLocations } from "src/squads/user/test-utils/mocks/locations";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";
import { checkErrorMessage } from "src/squads/user/test-utils/utils";

import { UserGroupUpsert, UserGroupUpsertProps } from "../UserGroupUpsert";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpsertUserGroup, {
    UseUpsertUserGroupReturn,
} from "src/squads/user/modules/user-group-upsert/hooks/useUpsertUserGroup";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useUpsertUserGroup", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

describe("<UserGroupUpsert /> add new user group", () => {
    const onClose = jest.fn();
    const onSuccess = jest.fn();
    const upsertUserGroup = jest.fn();
    const roles = mockGrantedPermissionPackage.map((p) => p.role);

    const renderComponent = (): RenderResult => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: roles,
            isLoading: false,
        }));
        (useUpsertUserGroup as jest.Mock).mockImplementation(
            (): UseUpsertUserGroupReturn => ({
                upsertUserGroup,
            })
        );
        const props: UserGroupUpsertProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onClose,
            onSuccess,
        };

        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <UserGroupUpsert {...props} />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot on mode ADD", () => {
        renderComponent();
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should render correct UI on mode ADD", () => {
        renderComponent();
        expect(screen.getByText("Add User Group")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByText("Granted Permissions")).toBeInTheDocument();
        expect(screen.getByTestId("FormUserGroupInfo__generalInfo")).toBeInTheDocument();
        expect(screen.getByTestId("GrantedPermissionUpsertTable")).toBeInTheDocument();
    });

    it("should open dialog cancel confirm and function onClose have been called", () => {
        renderComponent();

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);
        const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(dialogConfirm).toBeInTheDocument();

        const buttonConfirm = within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonConfirm);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should render empty form", () => {
        renderComponent();
        const inputUserGroupName = screen.getByTestId("FormUserGroupInfo__inputUserGroupName");

        expect(inputUserGroupName).toHaveValue("");

        expect(screen.getByText("ra.message.noDataInformation")).toBeInTheDocument();
    });

    it(`should show error "Required fields cannot be blank!"`, async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        await checkErrorMessage(1, "This field is required");

        const errorMessageBlank = await screen.findByText("Required fields cannot be blank!");

        expect(errorMessageBlank).toBeInTheDocument();
    });

    it(`should change locations when switching roles correctly`, () => {
        renderComponent();
        //add new granted permission
        userEvent.click(screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton"));

        // change locations
        const locationsField = screen.getByTestId("LocationSelectInputHF");
        userEvent.click(within(locationsField).getByTestId("AutocompleteBase__input"));
        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");

        expect(treeLocationDialog).toBeInTheDocument();

        userEvent.click(within(treeLocationDialog).getByText("Individual Brand"));
        userEvent.click(within(treeLocationDialog).getByTestId("FooterDialogConfirm__buttonSave"));

        expect(within(locationsField).getByText("Individual Brand")).toBeInTheDocument();

        //change role to role_name_1
        const roleField = screen.getByTestId("UserGroupUpsertTable__grantedRole");
        userEvent.click(within(roleField).getByTestId("AutocompleteBase__input"));
        const optionListBox = screen.getByTestId("AutocompleteBase__listBox");
        userEvent.click(within(optionListBox).getByText("role_name_1"));
        let updatedRoleField = screen.getByTestId("UserGroupUpsertTable__grantedRole");

        expect(updatedRoleField.querySelector("input")).toHaveValue("role_name_1");
        expect(within(locationsField).getByText("Individual Brand")).toBeInTheDocument();

        //change role to School Admin
        userEvent.click(within(updatedRoleField).getByTestId("AutocompleteBase__input"));
        const updatedOptionListBox = screen.getByTestId("AutocompleteBase__listBox");
        userEvent.click(within(updatedOptionListBox).getByText("School Admin"));
        updatedRoleField = screen.getByTestId("UserGroupUpsertTable__grantedRole");

        expect(updatedRoleField.querySelector("input")).toHaveValue("School Admin");
        expect(within(locationsField).queryByText("Individual Brand")).not.toBeInTheDocument();
    });

    it("should call upsert user group api correctly", async () => {
        renderComponent();
        //change user group name
        userEvent.type(
            screen.getByTestId("FormUserGroupInfo__inputUserGroupName"),
            "user-group-name"
        );
        //add new granted permission
        userEvent.click(screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton"));

        //change role to School Admin
        const roleField = screen.getByTestId("UserGroupUpsertTable__grantedRole");
        expect(roleField).toBeInTheDocument();
        userEvent.click(within(roleField).getByTestId("AutocompleteBase__input"));

        const optionListBox = screen.getByTestId("AutocompleteBase__listBox");
        expect(optionListBox).toBeInTheDocument();
        userEvent.click(within(optionListBox).getByText("School Admin"));
        const updatedRoleField = screen.getByTestId("UserGroupUpsertTable__grantedRole");

        expect(updatedRoleField.querySelector("input")).toHaveValue("School Admin");

        const locationField = screen.getByTestId("LocationSelectInputHF");
        expect(within(locationField).getByText("Organization")).toBeInTheDocument();

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(saveButton).toBeDisabled();
        });

        const expectedPayload: UserGroupInfo = {
            name: "user-group-name",
            grantedPermissionPackage: [
                {
                    granted_role_id: "",
                    role: roles.find((r) => r.role_name === "School Admin")!,
                    locations: [mockTreeLocations[0]],
                },
            ],
        };

        expect(upsertUserGroup).toBeCalledTimes(1);
        expect(upsertUserGroup).toBeCalledWith(expectedPayload, {
            onSuccess: expect.any(Function),
        });
    });
});
