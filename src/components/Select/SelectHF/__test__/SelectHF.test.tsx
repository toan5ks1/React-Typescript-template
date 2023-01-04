import { choiceOpeningStatus } from "src/common/constants/choices";
import { TestThemeProvider } from "src/test-utils";

import { OpeningStatus } from "manabuf/eureka/v1/scheduler_pb";

import SelectHF from "../SelectHF";

import { render, RenderResult, fireEvent, getByRole, within } from "@testing-library/react";
import TestHookFormProvider from "src/test-utils/TestHookFormProvider";

const defaultProps = {
    options: choiceOpeningStatus,
    name: "opening_status",
    label: "Opening Status",
    "data-testid": "FormSetTime__selectOpeningStatus",
    rules: {
        required: { value: true, message: "Opening Status is required" },
    },
    onChange: jest.fn(),
};

const HookFormComponent = (restProps: any) => {
    return (
        <TestThemeProvider>
            <TestHookFormProvider>
                <SelectHF {...defaultProps} {...restProps} />
            </TestHookFormProvider>
        </TestThemeProvider>
    );
};

describe("<SelectHF /> without defaultValue", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should exist error", async () => {
        expect(wrapper.queryByTestId("FormSetTime__selectOpeningStatus")).toBeInTheDocument();
        expect(wrapper.queryByTestId("TextFieldHF__submit")).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("TextFieldHF__submit"));

        expect(await wrapper.findByText("Opening Status is required")).toBeInTheDocument();

        expect(wrapper.getAllByText("Opening Status")[0].nodeName).toEqual("LABEL");
        expect(wrapper.getAllByText("Opening Status")[0]).toHaveStyle(`color: #F44336`);
    });

    it("should call onChange function", () => {
        const openingStatusSelect = wrapper.getByTestId("FormSetTime__selectOpeningStatus");
        expect(openingStatusSelect).toBeInTheDocument();

        fireEvent.mouseDown(getByRole(openingStatusSelect, "button"));

        const listbox = wrapper.queryByRole("listbox");
        expect(listbox).not.toBeNull();
        if (listbox) {
            fireEvent.click(
                within(listbox).getByText(
                    `resources.schedule.choices.openingStatus.${OpeningStatus.OPENING_STATUS_CLOSED}`
                )
            );
        }

        expect(defaultProps.onChange).toBeCalled();
    });
});
