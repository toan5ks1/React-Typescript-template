import { UseFormProps } from "react-hook-form";

import SwitchLabelHF, { SwitchLabelHFProps } from "../SwitchLabelHF";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const defaultSwitchLabelHFProps = {
    name: "switchLabel",
    label: "Switch Label",
    defaultChecked: false,
};

const defaultUseFormOptions = {
    defaultValues: {},
};

const renderSwitchLabelHF = (
    props: SwitchLabelHFProps = defaultSwitchLabelHFProps,
    useFormOptions: UseFormProps = defaultUseFormOptions
) => {
    return render(
        <TestHookFormProvider useFormOptions={useFormOptions}>
            <SwitchLabelHF {...props} />
        </TestHookFormProvider>
    );
};

describe("<SwitchLabelHF />", () => {
    it("should exist SwitchBase and label's text component in SwitchLabelHF", () => {
        const wrapper = renderSwitchLabelHF();

        expect(wrapper.getByTestId("SwitchLabelHF__label")).toBeInTheDocument();
        expect(wrapper.getByText(defaultSwitchLabelHFProps.label)).toBeInTheDocument();
        expect(wrapper.getByTestId("SwitchLabelHF__switchBase")).toBeInTheDocument();
    });

    it("should render switch with label and default unchecked", () => {
        const wrapper = renderSwitchLabelHF();

        expect(wrapper.getByRole("checkbox")).not.toBeChecked();
    });

    it("should render switch with label and default checked", () => {
        const wrapper = renderSwitchLabelHF(
            {
                ...defaultSwitchLabelHFProps,
            },
            {
                defaultValues: {
                    switchLabel: true,
                },
            }
        );

        expect(wrapper.getByRole("checkbox")).toBeChecked();
    });

    it("Should trigger switch by onchange event", () => {
        const wrapper = renderSwitchLabelHF(
            {
                ...defaultSwitchLabelHFProps,
            },
            {
                defaultValues: {
                    switchLabel: true,
                },
            }
        );

        const switchTest = wrapper.getByTestId("SwitchLabelHF__switchBase");

        expect(switchTest).toBeInTheDocument();
        expect(wrapper.getByRole("checkbox")).toBeChecked();
        userEvent.click(switchTest);
        expect(wrapper.getByRole("checkbox")).not.toBeChecked();
    });
});
