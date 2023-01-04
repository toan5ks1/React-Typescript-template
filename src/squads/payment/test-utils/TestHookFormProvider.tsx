import { PropsWithChildren } from "react";

import { useForm, UseFormProps } from "react-hook-form";

import HookForm from "src/components/Forms/HookForm";

export interface TestHookFormProviderProps<TFieldValues> {
    methodsOverride?: object;
    formProps?: object;
    useFormOptions?: UseFormProps<TFieldValues>;
}
const TestHookFormProvider = <TFieldValues extends object>({
    children,
    methodsOverride = {},
    formProps = {},
    useFormOptions,
}: PropsWithChildren<TestHookFormProviderProps<TFieldValues>>) => {
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
