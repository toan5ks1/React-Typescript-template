import { cloneElement, isValidElement, PropsWithChildren } from "react";

import { useForm, UseFormProps, FormProvider } from "react-hook-form";

export interface TestFormProps {
    defaultValues?: UseFormProps["defaultValues"];
    onSubmit?: (data: any) => void;
    wrappedWithForm?: boolean;
    cloneWithProps?: boolean;
}

const noopSubmit = () => {};

const TestHookForm = (props: PropsWithChildren<TestFormProps>) => {
    const {
        children,
        defaultValues,
        wrappedWithForm = true,
        cloneWithProps = false,
        onSubmit,
    } = props;
    const { handleSubmit, ...rest } = useForm({
        defaultValues,
    });

    const render = () => {
        if (wrappedWithForm) {
            return <form onSubmit={handleSubmit(onSubmit || noopSubmit)}>{children}</form>;
        }

        if (cloneWithProps && isValidElement(children)) {
            return cloneElement(children, {
                ...rest,
            });
        }

        return children;
    };

    return (
        <FormProvider {...rest} handleSubmit={handleSubmit}>
            {render()}
        </FormProvider>
    );
};

export default TestHookForm;
