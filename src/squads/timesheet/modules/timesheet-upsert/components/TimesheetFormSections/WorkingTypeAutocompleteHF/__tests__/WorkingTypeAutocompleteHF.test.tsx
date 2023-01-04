import {
    createMockTimesheetConfigListData,
    mockTimesheetUpsertInfoForm,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import WorkingTypeAutocompleteHF from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/WorkingTypeAutocompleteHF/WorkingTypeAutocompleteHF";

import { render, screen, within } from "@testing-library/react";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs/withReactHookForm";

jest.mock("src/squads/timesheet/hooks/useTimesheetConfigs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<WorkingTypeAutocompleteHF />", () => {
    const mockWorkingTypes = createMockTimesheetConfigListData("OTHER_WORKING_HOUR");
    beforeEach(() => {
        (useTimesheetConfigs as jest.Mock).mockImplementation(() => {
            return {
                data: mockWorkingTypes,
                isFetching: false,
                refetch: jest.fn(),
            };
        });
    });

    const renderComponent = () => {
        const WorkingTypeAutocompleteHFHookForm = withReactHookForm(
            WorkingTypeAutocompleteHF,
            { name: "otherWorkingHours[0].workingTypeAutocomplete" },
            { defaultValues: mockTimesheetUpsertInfoForm }
        );
        return render(
            <TranslationProvider>
                <TestQueryWrapper>
                    <TestCommonAppProvider>
                        <WorkingTypeAutocompleteHFHookForm />
                    </TestCommonAppProvider>
                </TestQueryWrapper>
            </TranslationProvider>
        );
    };

    it("should match snap shot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        renderComponent();

        const workingTypeInputs = screen.getAllByTestId(
            "OtherWorkingHoursUpsertTable__workingType"
        );
        const workingTypeInput = within(workingTypeInputs[0]).getByTestId(
            "AutocompleteBase__input"
        );
        expect(workingTypeInput).toHaveValue(mockWorkingTypes[0].config_value);
    });
});
