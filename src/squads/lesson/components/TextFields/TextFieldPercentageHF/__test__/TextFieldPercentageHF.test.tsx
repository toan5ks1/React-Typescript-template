import TextFieldPercentageHF, {
    TextFieldPercentageHFProps,
} from "src/squads/lesson/components/TextFields/TextFieldPercentageHF";

import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

const renderTextFieldPercentageHFWrapper = (props: TextFieldPercentageHFProps) => {
    return render(
        <TestHookFormProvider>
            <TextFieldPercentageHF {...props} />
        </TestHookFormProvider>
    );
};

describe("<TextFieldPercentageHF /> testing", () => {
    it("should allow input value between 0-100", () => {
        const wrapper: RenderResult = renderTextFieldPercentageHFWrapper({
            name: "Sample name",
        });

        const input = wrapper.container.querySelector("input");

        userEvent.type(input as HTMLInputElement, "50");
        expect(wrapper.container.querySelector("input")).toHaveValue(50);

        userEvent.type(input as HTMLInputElement, "999");
        expect(wrapper.container.querySelector("input")).toHaveValue(100);

        userEvent.type(input as HTMLInputElement, "-999");
        expect(wrapper.container.querySelector("input")).toHaveValue(null);

        userEvent.paste(input as HTMLInputElement, "-999");
        expect(wrapper.container.querySelector("input")).toHaveValue(0);
    });
});
