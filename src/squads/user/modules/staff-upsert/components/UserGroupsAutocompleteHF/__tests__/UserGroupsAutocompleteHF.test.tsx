import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import UserGroupsAutocompleteHF from "../UserGroupsAutocompleteHF";

import { render, screen } from "@testing-library/react";
import useUserGroupsList, {
    IUserGroup,
} from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";

const mockOptions: IUserGroup[] = [
    {
        user_group_id: "user-group-id-01",
        user_group_name: "Parent",
    },
];

const mockDuplicatedOptions: IUserGroup[] = [
    ...mockOptions,
    {
        user_group_id: "user-group-id-02",
        user_group_name: "Parent",
    },
];

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUserGroupsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultProps: Omit<AutocompleteHFProps<IUserGroup>, "options"> = {
    name: "userGroupsList",
    disableCloseOnSelect: true,
    filterSelectedOptions: true,
    getOptionSelectedField: "user_group_id",
    optionLabelKey: "user_group_name",
    value: [],
};

const renderUserGroupsAutocomplete = (
    overrideProps?: Partial<AutocompleteHFProps<IUserGroup>>,
    options: IUserGroup[] = mockOptions
) => {
    (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
        options: options,
        loading: false,
        setInputVal: jest.fn(),
    });

    return render(
        <TestCommonAppProvider>
            <TestHookFormProvider>
                <UserGroupsAutocompleteHF {...defaultProps} {...overrideProps} />
            </TestHookFormProvider>
        </TestCommonAppProvider>
    );
};

describe("<CourseClassAutocompleteHF />", () => {
    it("should render correct UI", () => {
        renderUserGroupsAutocomplete();
        expect(screen.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument();
        expect(screen.getByTestId("UserGroupsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should render correct options with data", () => {
        renderUserGroupsAutocomplete({ open: true });

        expect(screen.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(screen.getAllByTestId("AutocompleteBase__option")).toHaveLength(mockOptions.length);
        screen.getAllByTestId("AutocompleteBase__option").forEach((option, index) => {
            expect(option).toHaveTextContent(mockOptions[index].user_group_name);
        });
    });

    it("should render correct options without data", () => {
        renderUserGroupsAutocomplete({ open: true }, []);

        expect(screen.getByText("No options"));
    });

    it("should render options with duplicated label", () => {
        renderUserGroupsAutocomplete({ value: mockDuplicatedOptions }, mockDuplicatedOptions);
        expect(screen.getAllByTestId("UserGroupsSelectInputHF__tagBox")).toHaveLength(
            mockDuplicatedOptions.length
        );
    });
});
