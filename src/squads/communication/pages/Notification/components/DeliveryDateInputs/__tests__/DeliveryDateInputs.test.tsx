import { useForm } from "react-hook-form";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import DeliveryDateInputs, { DeliveryDateFieldProps } from "../DeliveryDateInputs";

import { render, RenderResult, within } from "@testing-library/react";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const Component = () => {
    const deliveryDateInputsProps: DeliveryDateFieldProps = {
        dateFieldProps: {
            name: "scheduleDate",
            InputProps: {
                "data-testid": "DeliveryDate__scheduledDate",
            },
        },
        timeFieldProps: {
            name: "scheduleTime",
            placeholder: "Time",
            getOptionSelectedField: "value",
        },
    };

    const methods = useForm({
        defaultValues: {
            scheduleDate: "1999/06/06",
        },
    });

    return (
        <MuiPickersUtilsProvider>
            <TestHookFormProvider methodsOverride={methods}>
                <DeliveryDateInputs {...deliveryDateInputsProps} />
            </TestHookFormProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<DeliveryDateInputs /> component", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Component />);
    });

    it("should match correct snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct component", () => {
        expect(wrapper.getByTestId("DeliveryDate__scheduledDate")).toBeInTheDocument();
        expect(wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")).toBeInTheDocument();
    });

    it("should have correct placeholder text on time select input", () => {
        const timeInput = within(
            wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")
        ).getByTestId("AutocompleteBase__input") as HTMLInputElement;

        expect(timeInput.placeholder).toEqual("Time");
    });
});
