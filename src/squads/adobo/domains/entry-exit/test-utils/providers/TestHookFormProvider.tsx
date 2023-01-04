import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import HookForm from "src/components/Forms/HookForm";

export interface TestHookFormProviderProps {
    methodsOverride?: object;
    formProps?: object;
    useFormOptions?: Parameters<typeof useForm>[0];
}
const TestHookFormProvider = ({
    children,
    methodsOverride = {},
    formProps = {},
    useFormOptions,
}: PropsWithChildren<TestHookFormProviderProps>) => {
    const methods = useForm(useFormOptions);
    const { handleSubmit } = methods;
    return (
        <HookForm
            methods={{
                ...methods,
                ...methodsOverride,
            }}
            formProps={{
                onSubmit: handleSubmit((...args: any) => jest.fn(...args)),
                ...formProps,
            }}
        >
            {children}
            <input data-testid="TextFieldHF__submit" type="submit" />
        </HookForm>
    );
};

export default TestHookFormProvider;
