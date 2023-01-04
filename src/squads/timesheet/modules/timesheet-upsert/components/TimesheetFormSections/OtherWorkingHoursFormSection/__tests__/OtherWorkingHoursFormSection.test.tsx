import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { mockTimesheetUpsertInfoForm } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";

import OtherWorkingHoursFormSection from "../OtherWorkingHoursFormSection";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useOtherWorkingHoursFieldArray from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHoursFieldArray";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHoursFieldArray",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/timesheet/hooks/useTimesheetConfigs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderOtherWorkingHoursFormSectionHookForm = (defaultValues: UpsertTimesheetFormProps) => {
    const OtherWorkingHoursFormSectionHookForm = withReactHookForm(
        OtherWorkingHoursFormSection,
        {},
        { defaultValues }
    );
    return render(
        <TranslationProvider>
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <OtherWorkingHoursFormSectionHookForm />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        </TranslationProvider>
    );
};

describe("<OtherWorkingHoursFormSection />", () => {
    const onAdd = jest.fn();
    const onDelete = jest.fn();
    const refetch = jest.fn();
    beforeEach(() => {
        (useOtherWorkingHoursFieldArray as jest.Mock).mockImplementation(() => {
            return {
                onAdd,
                onDelete,
                otherWorkingHours: mockTimesheetUpsertInfoForm.otherWorkingHours,
            };
        });

        (useTimesheetConfigs as jest.Mock).mockImplementation(() => {
            return {
                data: [],
                isFetching: false,
                refetch,
            };
        });
    });

    it("should render correct UI", () => {
        renderOtherWorkingHoursFormSectionHookForm(mockTimesheetUpsertInfoForm);

        const rows = screen.getAllByTestId("TableBase__row");
        const buttonDel = screen.getByTestId("OtherWorkingHoursFormSection__deleteAction");

        expect(screen.getByTestId("OtherWorkingHoursFormSection__title")).toBeInTheDocument();
        expect(buttonDel).toBeInTheDocument();
        expect(screen.getByTestId("OtherWorkingHoursFormSection__addButton")).toBeInTheDocument();
        expect(buttonDel).toBeDisabled();
        expect(rows.length).toEqual(1);
    });

    it("should match snap shot", () => {
        const wrapper = renderOtherWorkingHoursFormSectionHookForm(mockTimesheetUpsertInfoForm);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call fn onAdd", () => {
        renderOtherWorkingHoursFormSectionHookForm(mockTimesheetUpsertInfoForm);

        const buttonAdd = screen.getByTestId("OtherWorkingHoursFormSection__addButton");

        userEvent.click(buttonAdd);

        expect(onAdd).toBeCalledTimes(1);
    });

    it("should call fn onDelete", () => {
        renderOtherWorkingHoursFormSectionHookForm(mockTimesheetUpsertInfoForm);

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        const buttonDel = screen.getByTestId("OtherWorkingHoursFormSection__deleteAction");

        userEvent.click(checkBox[0]);

        userEvent.click(buttonDel);

        expect(onDelete).toBeCalledWith([mockTimesheetUpsertInfoForm.otherWorkingHours[0]]);
    });
});
