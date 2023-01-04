import { ERPModules } from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";

import RadioGroupHF from "../RadioGroupHF";

import { cleanup, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

export const ScheduleKeys = {
    OPENING_STATUS: "openingStatus",
    REPEAT_TYPE: "repeatType",
    SCHEDULE_SEARCH_TYPE: "scheduleSearchType",
    DAY_CONDITION_TYPE: "dayConditionType",
};

export enum DayConditionType {
    ALL_DAY = 0,
    SPECIFIC_TIME = 1,
}

export const choiceDayConditionType = convertToChoices(
    DayConditionType,
    ScheduleKeys.DAY_CONDITION_TYPE,
    ERPModules.SCHEDULE
);

const defaultProps = {
    name: "name",
    label: "Name",
    options: choiceDayConditionType,
    "data-testid": "RadioGroupHF__container",
    onChange: jest.fn(),
    rules: {
        required: { value: true, message: "Name is required" },
    },
};
const HookFormComponent = (restProps: any) => {
    return (
        <TestHookFormProvider>
            <RadioGroupHF {...defaultProps} {...restProps} />
        </TestHookFormProvider>
    );
};

describe("<RadioGroupHF />", () => {
    let wrapper: RenderResult;

    afterEach(cleanup);

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should exist label", () => {
        expect(
            screen.getByText(
                `resources.schedule.choices.dayConditionType.${DayConditionType.ALL_DAY}`
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `resources.schedule.choices.dayConditionType.${DayConditionType.SPECIFIC_TIME}`
            )
        ).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should exist error", async () => {
        expect(wrapper.queryByTestId("RadioGroupHF__container")).toBeInTheDocument();
        expect(wrapper.queryByTestId("TextFieldHF__submit")).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("TextFieldHF__submit"));

        expect(await wrapper.findByText("Name is required")).toBeInTheDocument();
    });

    it("should show RadioGroupHF__container with type Specific Time", () => {
        const specificRadioButton = wrapper.getByTestId(`Radio__${DayConditionType.SPECIFIC_TIME}`);
        fireEvent.click(specificRadioButton as HTMLInputElement);

        expect(
            wrapper.queryByTestId(`Radio__${DayConditionType.SPECIFIC_TIME}`)
        ).toBeInTheDocument();
    });
});
