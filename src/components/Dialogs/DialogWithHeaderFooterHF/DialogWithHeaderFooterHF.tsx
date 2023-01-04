import { FieldValues } from "react-hook-form";

import HookForm from "src/components/Forms/HookForm";

import DialogWithHeaderFooter from "../DialogWithHeaderFooter";
import { DialogHFProps } from "../types";

const DialogWithHeaderFooterHF = <T extends FieldValues>({
    children,
    methods,
    shouldPressKey,
    ...props
}: DialogHFProps<T>) => {
    return (
        <DialogWithHeaderFooter {...props}>
            <HookForm
                formProps={{ onSubmit: props.onSave }}
                methods={methods}
                shouldPressKey={shouldPressKey}
            >
                {children}
            </HookForm>
        </DialogWithHeaderFooter>
    );
};

export default DialogWithHeaderFooterHF;
