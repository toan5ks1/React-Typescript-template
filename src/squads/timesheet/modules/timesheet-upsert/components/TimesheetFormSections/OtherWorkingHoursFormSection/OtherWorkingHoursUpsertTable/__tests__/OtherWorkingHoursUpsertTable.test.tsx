import { useWatch } from "react-hook-form";
import {
    createMockTimesheetConfigListData,
    mockOtherWorkingHours,
    mockTimesheetUpsertInfoForm,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";

import OtherWorkingHoursUpsertTable from "../OtherWorkingHoursUpsertTable";

import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useOtherWorkingHourFormValidation from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

jest.mock("src/squads/timesheet/hooks/useTimesheetConfigs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");
    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});

describe("<OtherWorkingHoursUpsertTable />", () => {
    const onSelect = jest.fn();
    const updateRow = jest.fn();
    const refetch = jest.fn();
    const mockWorkingTypes = createMockTimesheetConfigListData("OTHER_WORKING_HOUR");
    beforeEach(() => {
        (useTimesheetConfigs as jest.Mock).mockImplementation(() => {
            return {
                data: mockWorkingTypes,
                isFetching: false,
                refetch,
            };
        });
        (useOtherWorkingHourFormValidation as jest.Mock).mockImplementation(() => {
            return {
                validate: {
                    workingTypeAutocomplete: {},
                    useStartTimeAutocompleteRules: () => ({}),
                    useEndTimeAutocompleteRules: () => ({}),
                },
            };
        });
        (useWatch as jest.Mock).mockReturnValue(mockOtherWorkingHours);
    });
    const renderComponent = () => {
        const OtherWorkingHoursUpsertTableHookForm = withReactHookForm(
            OtherWorkingHoursUpsertTable,
            { onSelect, updateRow, otherWorkingHours: mockOtherWorkingHours },
            { defaultValues: mockTimesheetUpsertInfoForm }
        );
        return render(
            <TranslationProvider>
                <TestQueryWrapper>
                    <TestCommonAppProvider>
                        <OtherWorkingHoursUpsertTableHookForm />
                    </TestCommonAppProvider>
                </TestQueryWrapper>
            </TranslationProvider>
        );
    };

    it("should render UI correctly", () => {
        renderComponent();

        expect(screen.getByTestId("OtherWorkingHoursUpsertTable")).toBeInTheDocument();

        const header = screen.getByTestId("TableBase__header");

        const columns = within(header).getAllByTestId("TableHeaderWithCheckbox__cellHeader");

        expect(columns.length).toEqual(4);

        expect(screen.getAllByTestId("TableBase__row").length).toEqual(1);
    });

    it("should match snap shot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be call onSelect when user selected owh", () => {
        renderComponent();

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox.length).toEqual(1);

        userEvent.click(checkBox[0]);

        expect(onSelect).toBeCalledWith([mockOtherWorkingHours[0]]);
    });

    it("should be fill on type form", async () => {
        renderComponent();

        // Working Type
        const workingTypeInputs = screen.getAllByTestId(
            "OtherWorkingHoursUpsertTable__workingType"
        );
        const workingTypeInput = within(workingTypeInputs[0]).getByTestId(
            "AutocompleteBase__input"
        );
        expect(workingTypeInput).toHaveValue(mockWorkingTypes[0].config_value);
        userEvent.type(workingTypeInput, mockWorkingTypes[1].config_value);
        expect(await screen.findAllByTestId("AutocompleteBase__option")).toHaveLength(1);
        userEvent.click(screen.getByText(mockWorkingTypes[1].config_value));
        expect(workingTypeInput).toHaveValue(mockWorkingTypes[1].config_value);

        // Start time
        const startTimeInputs = screen.getAllByTestId("OtherWorkingHoursUpsertTable__startTime");
        const startTimeInput = within(startTimeInputs[0]).getByTestId("AutocompleteBase__input");
        expect(startTimeInput).toHaveValue("10:00");
        userEvent.click(startTimeInput);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");
        await waitFor(() => {
            expect(startTimeInput).toHaveValue("10:15");
        });

        // End time
        const endTimeInputs = screen.getAllByTestId("OtherWorkingHoursUpsertTable__endTime");
        const endTimeInput = within(endTimeInputs[0]).getByTestId("AutocompleteBase__input");
        expect(endTimeInput).toHaveValue("12:00");
        userEvent.click(endTimeInput);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");
        await waitFor(() => {
            expect(endTimeInput).toHaveValue("12:15");
        });

        // Remarks
        const remarkInputs = screen.getAllByTestId("OtherWorkingHoursUpsertTable__remarkInput");
        expect(remarkInputs[0]).toHaveValue(mockOtherWorkingHours[0].remarks);
    });
});
