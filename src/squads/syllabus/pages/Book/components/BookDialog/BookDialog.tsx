import { ReactNode } from "react";

import { useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { BookFormData } from "../../common/types";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface BookDialogProps extends Pick<DialogWithHeaderFooterProps, "open" | "title"> {
    children?: ReactNode;
    defaultValues?: {
        name?: string;
    };
    loading: boolean;
    onClose: () => void;
    onSave: (data: BookFormData) => void;
}

const BookDialog = (props: BookDialogProps) => {
    const { children, defaultValues, loading, onClose, onSave, ...rest } = props;
    const t = useTranslate();
    const methods = useForm<BookFormData>({ defaultValues });
    const { handleSubmit } = methods;
    const validationRules = {
        name: {
            required: {
                value: true,
                message: t("resources.input.error.fieldCannotBeBlank", {
                    field: t(`resources.${Entities.BOOKS}.bookName`),
                }),
            },
        },
    };

    return (
        <DialogWithHeaderFooterHF<BookFormData>
            footerConfirmButtonProps={{ disabled: loading }}
            onClose={onClose}
            onSave={handleSubmit(onSave)}
            methods={methods}
            {...rest}
        >
            <TextFieldHF
                autoFocus
                required
                id="name"
                label={t(`resources.${Entities.BOOKS}.bookName`)}
                name="name"
                rules={validationRules.name}
            />
        </DialogWithHeaderFooterHF>
    );
};

export default BookDialog;
