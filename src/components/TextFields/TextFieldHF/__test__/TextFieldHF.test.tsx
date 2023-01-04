import { useForm } from "react-hook-form";

import TextFieldHF from "../TextFieldHF";

import { render, RenderResult, fireEvent } from "@testing-library/react";
import TestHookFormProvider from "src/test-utils/TestHookFormProvider";

const defaultProps = {
    name: "name",
    label: "Name",
    onChange: jest.fn(),
};

const HookFormComponent = (restProps: any) => {
    const methods = useForm();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;
    return (
        <TestHookFormProvider
            methodsOverride={methods}
            formProps={{
                onSubmit: handleSubmit((...args: any) => jest.fn(...args)),
            }}
        >
            <TextFieldHF
                {...defaultProps}
                {...restProps}
                errors={errors}
                inputProps={register("name", {
                    required: { value: true, message: "Name is required" },
                })}
            />
        </TestHookFormProvider>
    );
};
describe("<TextFieldHF /> required error", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should exist error", async () => {
        expect(wrapper.queryByTestId("TextFieldHF__input")).toBeInTheDocument();
        expect(wrapper.queryByTestId("TextFieldHF__submit")).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("TextFieldHF__submit"));

        expect(await wrapper.findByText("Name is required")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<TextFieldHF /> default value", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent defaultValue="test data" />);
    });

    it("should exist value", () => {
        expect(wrapper.container.querySelector("input")?.value).toEqual("test data");
        expect(wrapper.queryByText("Name is required")).not.toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
