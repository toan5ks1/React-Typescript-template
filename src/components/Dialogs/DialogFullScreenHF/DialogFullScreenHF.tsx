import { FieldValues } from "react-hook-form";

import HookForm from "../../Forms/HookForm";
import DialogFullScreen from "../DialogFullScreen";
import { DialogFullScreenHFProps } from "../types";

const DialogFullScreenHF = <T extends FieldValues>({
    children,
    methods,
    ...props
}: DialogFullScreenHFProps<T>) => {
    return (
        <DialogFullScreen {...props}>
            <HookForm formProps={{ onSubmit: props.onSave }} methods={methods}>
                {children}
            </HookForm>
        </DialogFullScreen>
    );
};

export default DialogFullScreenHF;
