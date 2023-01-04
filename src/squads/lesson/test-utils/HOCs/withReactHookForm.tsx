import { ComponentType } from "react";

import { FormProvider, useForm, UseFormProps } from "react-hook-form";

export function withReactHookForm<T>(
    WrappedComponent: ComponentType<T>,
    restProps?: any,
    useFormOptions?: UseFormProps
) {
    const HOC = () => {
        const methods = useForm(useFormOptions);

        return (
            <FormProvider {...methods}>
                <WrappedComponent {...restProps} />
            </FormProvider>
        );
    };

    return HOC;
}
