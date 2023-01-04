import { inferQuery } from "src/squads/user/service/infer-service";
import {
    TestCommonAppProvider,
    TestHookForm,
    TestQueryWrapper,
} from "src/squads/user/test-utils/providers";

import { GrantedPermissionUpsertTable } from "../GrantedPermissionUpsertTable";

import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

describe("<GrantedPermissionUpsertTable />", () => {
    const onSelect = jest.fn();
    const updateRow = jest.fn();
    const roles = mockGrantedPermissionPackage.map((p) => p.role);

    const renderComponent = () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: roles,
            isLoading: false,
        }));

        return render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <TestHookForm
                        defaultValues={{
                            id: "user-group-id",
                            name: "user-group-name",
                            grantedPermissionPackage: mockGrantedPermissionPackage,
                        }}
                    >
                        <GrantedPermissionUpsertTable
                            grantedPermissions={mockGrantedPermissionPackage}
                            onSelect={onSelect}
                            updateRow={updateRow}
                        />
                    </TestHookForm>
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
    };
    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        renderComponent();

        expect(screen.getByTestId("GrantedPermissionUpsertTable")).toBeInTheDocument();

        const header = screen.getByTestId("TableBase__header");

        const columns = within(header).getAllByTestId("TableHeaderWithCheckbox__cellHeader");

        expect(columns.length).toEqual(2);

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

    it("should be call onSelect when user selected granted permission", () => {
        renderComponent();

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(mockGrantedPermissionPackage.length);

        userEvent.click(checkBox[0]);

        expect(onSelect).toBeCalledTimes(1);
        expect(onSelect).toBeCalledWith([mockGrantedPermissionPackage[0]]);
    });

    it("should render role list correctly when clicking", () => {
        renderComponent();

        const roleFields = screen.getAllByTestId("UserGroupUpsertTable__grantedRole");

        expect(roleFields).toHaveLength(mockGrantedPermissionPackage.length);

        userEvent.click(within(roleFields[0]).getByTestId("AutocompleteBase__input"));

        const optionListBox = screen.getByTestId("AutocompleteBase__listBox");

        expect(optionListBox).toBeInTheDocument();

        const optionList = within(optionListBox).getAllByRole("option");

        expect(optionList).toHaveLength(roles.length);

        roles.forEach((role, index) => expect(optionList[index]).toHaveTextContent(role.role_name));
    });

    it("should render locations dialog correctly when clicking", () => {
        renderComponent();

        const locationsFields = screen.getAllByTestId("LocationSelectInputHF");

        expect(locationsFields).toHaveLength(mockGrantedPermissionPackage.length);

        locationsFields.forEach((field, index) => {
            userEvent.click(within(field).getByTestId("AutocompleteBase__input"));

            const treeLocationDialog = screen.getByTestId("DialogTreeLocations");
            expect(treeLocationDialog).toBeInTheDocument();

            const locations = [...mockGrantedPermissionPackage[index].locations];

            locations.forEach((location) => {
                const checkBoxTree = within(treeLocationDialog).getByTestId(
                    "DialogTreeLocations__tree"
                );
                const locationCheckBox = within(checkBoxTree)
                    .getByText(location.name)
                    .closest("div")
                    ?.querySelector("input");

                expect(locationCheckBox).toBeChecked();
            });

            const checkedListRender = locations.slice(0, 5).map((l) => l.name);
            const plusNumber = locations.length - 5;
            if (plusNumber > 0) checkedListRender.push(`+${plusNumber}`);

            const subNote = screen.getByTestId("DialogTreeLocations__subNote");

            expect(subNote).toHaveTextContent(checkedListRender.join(", "));

            userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
            expect(treeLocationDialog).not.toBeInTheDocument();
        });
    });
});
