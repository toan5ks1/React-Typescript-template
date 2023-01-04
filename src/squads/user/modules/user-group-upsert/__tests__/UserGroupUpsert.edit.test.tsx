import { ModeOpenDialog } from "src/common/constants/enum";
import { UserGroupInfo } from "src/squads/user/common/types/user-group";
import { inferQuery } from "src/squads/user/service/infer-service";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";
import { changeTextInput } from "src/squads/user/test-utils/utils";

import { UserGroupUpsert, UserGroupUpsertProps } from "../UserGroupUpsert";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpsertUserGroup, {
    UseUpsertUserGroupReturn,
} from "src/squads/user/modules/user-group-upsert/hooks/useUpsertUserGroup";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

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
describe("<UserGroupUpsert /> edit new user group", () => {
    const onClose = jest.fn();
    const onSuccess = jest.fn();
    const upsertUserGroup = jest.fn();
    const roles = mockGrantedPermissionPackage.map((p) => p.role);
    const userGroup: UserGroupInfo = {
        id: "user-group-id",
        name: "user-group-name",
        grantedPermissionPackage: mockGrantedPermissionPackage,
    };
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
            mode: ModeOpenDialog.EDIT,
            open: true,
            onClose,
            onSuccess,
            userGroup,
        };

        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <UserGroupUpsert {...props} />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        renderComponent();
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        renderComponent();
        expect(screen.getByText("Edit User Group")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByText("Granted Permissions")).toBeInTheDocument();
        expect(screen.getByTestId("FormUserGroupInfo__generalInfo")).toBeInTheDocument();
        expect(screen.getByTestId("GrantedPermissionUpsertTable")).toBeInTheDocument();
    });

    it("should open confirm dialog when close edit dialog", () => {
        renderComponent();

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);
        const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(dialogConfirm).toBeInTheDocument();

        const buttonConfirm = within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonConfirm);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should render default value correctly", () => {
        renderComponent();
        const inputUserGroupName = screen.getByTestId("FormUserGroupInfo__inputUserGroupName");

        expect(inputUserGroupName).toHaveValue("user-group-name");

        const grantedPermissions = screen.getAllByTestId("TableBase__row");

        expect(grantedPermissions).toHaveLength(mockGrantedPermissionPackage.length);

        grantedPermissions.forEach((grantedPermission, index) => {
            const roleField = within(grantedPermission).getByTestId(
                "UserGroupUpsertTable__grantedRole"
            );

            const roleInput = roleField.querySelector("input");
            expect(roleInput).toHaveValue(roles[index].role_name);

            const locationField = within(grantedPermission).getByTestId("LocationSelectInputHF");

            const tagBoxes = within(locationField).getAllByTestId("LocationSelectInputHF__tagBox");

            const locations = [...mockGrantedPermissionPackage[index].locations];

            expect(tagBoxes).toHaveLength(locations.length);

            tagBoxes.forEach((tag, index) => {
                const chip = within(tag).getByTestId("LocationSelectInputHF__ChipTag");
                expect(chip).toBeInTheDocument();
                expect(chip).toHaveTextContent(locations[index].name);
            });
        });
    });

    it(`should show error "Required fields cannot be blank!"`, async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageBlank = await screen.findByText("Required fields cannot be blank!");

        expect(errorMessageBlank).toBeInTheDocument();
    });

    it("should call upsert user group api correctly", async () => {
        renderComponent();

        changeTextInput("FormUserGroupInfo__inputUserGroupName", " edited");

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(saveButton).toBeDisabled();
        });

        const expectedPayload = {
            ...userGroup,
            name: "user-group-name edited",
        };

        expect(upsertUserGroup).toBeCalledTimes(1);
        expect(upsertUserGroup).toBeCalledWith(expectedPayload, {
            onSuccess: expect.any(Function),
        });
    });
});
