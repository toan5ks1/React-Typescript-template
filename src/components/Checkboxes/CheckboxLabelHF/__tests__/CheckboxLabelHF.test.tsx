import CheckboxLabelHF, { CheckboxLabelHFProps } from "../CheckboxLabelHF";

import { render, screen, fireEvent } from "@testing-library/react";
import TestHookFormProvider from "src/test-utils/TestHookFormProvider";

describe(CheckboxLabelHF.name, () => {
    it("should render label and default unchecked", () => {
        const label = "Custom label for CheckboxLabelHF";
        render(
            <TestHookFormProvider useFormOptions={{ defaultValues: { accept: false } }}>
                <CheckboxLabelHF name="accept" label={label} />
            </TestHookFormProvider>
        );

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("should render with default checked", () => {
        render(
            <TestHookFormProvider useFormOptions={{ defaultValues: { accept: true } }}>
                <CheckboxLabelHF name="accept" label="label" />
            </TestHookFormProvider>
        );
        expect(screen.getByRole("checkbox")).toBeChecked();
    });
    it("should trigger onchange event", async () => {
        const props: CheckboxLabelHFProps = { onChange: () => {}, name: "accept", label: "label" };
        const wrapper = render(
            <TestHookFormProvider useFormOptions={{ defaultValues: { accept: true } }}>
                <CheckboxLabelHF {...props} />
            </TestHookFormProvider>
        );
        expect(wrapper.getByTestId("CheckboxLabelHF__checkboxBase")).toBeInTheDocument();
        const inputText = wrapper.getByTestId("CheckboxLabelHF__checkboxBase");
        expect(screen.getByRole("checkbox")).toBeChecked();
        fireEvent.click(inputText);
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
});
