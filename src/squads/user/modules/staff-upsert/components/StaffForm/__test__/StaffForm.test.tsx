import { ModeOpenDialog } from "src/common/constants/enum";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/user/test-utils/providers";

import StaffUpsert, { StaffUpsertProps } from "../../../StaffUpsert";

import { RenderResult, render, screen } from "@testing-library/react";
import useUserToggleFeature from "src/squads/user/hooks/useUserFeatureFlag";
import useUserGroupsList from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";
import { mockUserGroupList } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUserGroupsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StaffForm />", () => {
    const renderStaffForm = (props: StaffUpsertProps): RenderResult => {
        (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
            options: mockUserGroupList,
            loading: false,
            setInputVal: jest.fn(),
        });

        (useUserToggleFeature as jest.Mock).mockReturnValue(true);
        const wrapper: RenderResult = render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider>
                        <StaffUpsert {...props} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
        return wrapper;
    };

    const staffUpsertProps: StaffUpsertProps = {
        open: true,
        onClose: jest.fn(),
        onSave: jest.fn(),
        mode: ModeOpenDialog.ADD,
    };

    it("should match snapshot", () => {
        const wrapper = renderStaffForm(staffUpsertProps);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly UI of staff form", () => {
        renderStaffForm(staffUpsertProps);
        const nameInput = screen.getByTestId("StaffForm__name");
        const emailInput = screen.getByTestId("StaffForm__email");
        const userGroupsList = screen.getByTestId("UserGroupsAutocompleteHF__autocomplete");

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(userGroupsList).toBeInTheDocument();
    });

    it("should enable email input when adding Staff", () => {
        renderStaffForm(staffUpsertProps);
        expect(screen.getByTestId("StaffForm__email")).toBeEnabled();
    });
});
