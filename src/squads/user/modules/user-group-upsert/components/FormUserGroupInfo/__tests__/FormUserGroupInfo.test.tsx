import { UserGroupInfo } from "src/squads/user/common/types/user-group";
import { inferQuery } from "src/squads/user/service/infer-service";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { FormUserGroupInfo } from "../FormUserGroupInfo";

import { render, screen, within } from "@testing-library/react";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";
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

const renderComponent = (defaultValues?: UserGroupInfo) => {
    const FormUserGroupInfoHookForm = withReactHookForm(
        FormUserGroupInfo,
        {},
        {
            defaultValues,
        }
    );
    return render(
        <TestQueryWrapper>
            <TestCommonAppProvider>
                <FormUserGroupInfoHookForm />
            </TestCommonAppProvider>
        </TestQueryWrapper>
    );
};

describe("<FormUserGroupInfo />", () => {
    const roles = mockGrantedPermissionPackage.map((p) => p.role);

    beforeEach(() => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: roles,
            isLoading: false,
        }));
    });

    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render form components correctly", () => {
        renderComponent();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByTestId("FormUserGroupInfo__inputUserGroupName")).toBeInTheDocument();
        expect(
            screen.getByTestId("FormUserGroupGrantedPermissionInfo__grantedPermission")
        ).toBeInTheDocument();
    });

    it("Should initialize empty values on when default values have no data", () => {
        renderComponent();
        const inputUserGroupName = screen.getByTestId("FormUserGroupInfo__inputUserGroupName");
        expect(inputUserGroupName).toHaveValue("");

        const grantedPermissionTable = screen.getByTestId("GrantedPermissionUpsertTable");
        const grantedPermissionTableRows =
            within(grantedPermissionTable).queryAllByTestId("TableBase__row");
        expect(grantedPermissionTableRows).toHaveLength(0);
    });
    it("Should initialize values when default values have data", () => {
        const defaultValues = {
            id: "user_group_id",
            name: "user_group_name",
            grantedPermissionPackage: [], // temporarily empty
        };
        renderComponent(defaultValues);
        const inputUserGroupName = screen.getByTestId("FormUserGroupInfo__inputUserGroupName");
        expect(inputUserGroupName).toHaveValue(defaultValues.name);
        //TODO: Add test case for checking grantedPermissionPackage
    });
});
