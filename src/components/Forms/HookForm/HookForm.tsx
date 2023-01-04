import { FormHTMLAttributes, PropsWithChildren } from "react";

import { FieldValues, FormProvider, useForm, useFormContext, UseFormReturn } from "react-hook-form";

import { Box } from "@mui/material";

interface HookFormProps<T extends FieldValues> {
    formProps?: FormHTMLAttributes<HTMLFormElement>;
    methods?: UseFormReturn<T>;
    shouldPressKey?: boolean;
}

const HookForm = <T extends FieldValues>({
    children,
    methods,
    formProps = {},
    shouldPressKey = false,
}: PropsWithChildren<HookFormProps<T>>) => {
    const anotherMethods = useForm<T>();
    const finalMethods = methods ? methods : anotherMethods;

    return (
        <FormProvider {...finalMethods}>
            <form noValidate {...formProps}>
                {children}

                {/* Allow enter to submit */}
                {shouldPressKey && (
                    <Box display="none">
                        <input type="submit" />
                    </Box>
                )}
            </form>
        </FormProvider>
    );
};

export default HookForm;
export { useFormContext };
