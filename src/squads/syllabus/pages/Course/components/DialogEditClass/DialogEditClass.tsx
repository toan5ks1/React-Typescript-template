import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import WrapperHF from "src/squads/syllabus/pages/Course/components/Wrappers/WrapperHF";

import isEqual from "lodash/isEqual";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { ClassData, EditClassForm } from "src/squads/syllabus/pages/Course/common/types";

export interface DialogEditClassProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onClose"> {
    classData: ClassData;
    onEditClass: (classData: ClassData) => void;
    isEditing: boolean;
}

const DialogEditClass = (props: DialogEditClassProps) => {
    const { open, onClose, classData, onEditClass, isEditing } = props;

    const t = useTranslate();
    const tClass = useResourceTranslate(Entities.CLASS);

    const onSaveEditClass = (data: EditClassForm) => {
        if (isEqual(data.name, classData.name)) {
            onClose();
            return;
        }

        onEditClass({ ...classData, ...data });
    };

    return (
        <WrapperHF<EditClassForm>
            defaultValues={{ name: classData.name }}
            render={({ handleSubmit }) => (
                <DialogWithHeaderFooter
                    open={open}
                    onClose={onClose}
                    title={tClass("titles.edit")}
                    onSave={handleSubmit(onSaveEditClass)}
                    data-testid="DialogEditClass__dialog"
                    footerConfirmButtonProps={{ disabled: isEditing }}
                >
                    <TextFieldHF
                        required
                        name="name"
                        label={tClass("columns.className")}
                        rules={{ required: t("resources.input.error.required") }}
                        inputProps={{
                            "data-testid": "DialogEditClass__textFieldClassName",
                        }}
                    />
                </DialogWithHeaderFooter>
            )}
        />
    );
};

export default DialogEditClass;
