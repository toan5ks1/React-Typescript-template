import { choiceDayConditionType } from "src/common/constants/choices";
import { DayConditionType } from "src/common/constants/enum";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import RadioGroup from "../RadioGroup";

import { cleanup, fireEvent, render, RenderResult, screen } from "@testing-library/react";

const defaultProps = {
    options: choiceDayConditionType,
    "data-testid": "RadioGroup__container",
    onChange: jest.fn(),
};

describe("<RadioGroup />", () => {
    let wrapper: RenderResult;

    const HookFormComponent = (restProps: any) => {
        return (
            <TestCommonAppProvider>
                <RadioGroup {...defaultProps} {...restProps} />
            </TestCommonAppProvider>
        );
    };

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
        expect(wrapper.queryByTestId("RadioGroup__container")).toBeInTheDocument();
    });

    it("should show RadioGroup__container with type Specific Time", () => {
        const specificRadioButton = wrapper.getByTestId(`Radio__${DayConditionType.SPECIFIC_TIME}`);
        fireEvent.click(specificRadioButton as HTMLInputElement);

        expect(
            wrapper.queryByTestId(`Radio__${DayConditionType.SPECIFIC_TIME}`)
        ).toBeInTheDocument();
    });
});
