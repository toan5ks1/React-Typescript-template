import { inferQuery } from "src/squads/user/service/infer-service";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/user/test-utils/providers";

import { GrantedPermissionUpsert } from "../GrantedPermissionUpsert";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGrantedPermissionFieldArray, {
    UseGrantedPermissionFieldArrayReturn,
} from "src/squads/user/modules/user-group-upsert/hooks/useGrantedPermissionFieldArray";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useGrantedPermissionFieldArray", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

describe("<GrantedPermissionUpsert />", () => {
    const onAdd = jest.fn();
    const onDelete = jest.fn();
    const roles = mockGrantedPermissionPackage.map((p) => p.role);
    const mockUseGrantedPermissionFieldArrayReturn: UseGrantedPermissionFieldArrayReturn = {
        onAdd,
        onDelete,
        grantedPermissions: [],
        append: jest.fn(),
        remove: jest.fn(),
        update: jest.fn(),
    };

    const renderComponent = () => {
        return render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <TestHookFormProvider>
                        <GrantedPermissionUpsert />
                    </TestHookFormProvider>
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
    };

    beforeEach(() => {
        (useGrantedPermissionFieldArray as jest.Mock).mockReturnValue(
            mockUseGrantedPermissionFieldArrayReturn
        );
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: roles,
            isLoading: false,
        }));
    });

    it("should render correct UI with data", () => {
        renderComponent();

        const buttonDel = screen.getByTestId("UserGroupGrantedPermissionUpsert__deleteAction");

        expect(
            screen.getByTestId("UserGroupGrantedPermissionUpsert__deleteAction")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton")
        ).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__header")).toBeInTheDocument();
        expect(buttonDel).toBeDisabled();
    });

    it("should render correct UI without data", () => {
        renderComponent();

        expect(screen.getByText("ra.message.noDataInformation")).toBeInTheDocument();
        expect(
            screen.getByTestId("UserGroupGrantedPermissionUpsert__deleteAction")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton")
        ).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__header")).toBeInTheDocument();
        const buttonDel = screen.getByTestId("UserGroupGrantedPermissionUpsert__deleteAction");
        expect(buttonDel).toBeDisabled();
    });

    it("should be call fn onAdd", () => {
        renderComponent();

        const buttonAdd = screen.getByTestId("UserGroupGrantedPermissionUpsert__addButton");

        userEvent.click(buttonAdd);
        expect(onAdd).toBeCalledTimes(1);
    });

    it("should be call fn onDelete", () => {
        (useGrantedPermissionFieldArray as jest.Mock).mockReturnValue({
            ...mockUseGrantedPermissionFieldArrayReturn,
            grantedPermissions: mockGrantedPermissionPackage,
        });
        renderComponent();

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        const buttonDel = screen.getByTestId("UserGroupGrantedPermissionUpsert__deleteAction");

        userEvent.click(checkBox[0]);

        userEvent.click(buttonDel);

        expect(onDelete).toBeCalledWith([mockGrantedPermissionPackage[0]]);
    });
});
