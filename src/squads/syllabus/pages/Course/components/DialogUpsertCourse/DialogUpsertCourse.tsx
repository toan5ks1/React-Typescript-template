import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Entities, ModeOpenDialog } from "src/common/constants/enum";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import CourseForm, { CourseFormData } from "src/squads/syllabus/pages/Course/components/CourseForm";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface DialogUpsertCourseProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "title"> {
    defaultValues?: CourseFormData;
    onClose: () => void;
    onSave: (formData: CourseFormData) => void;
    mode?: ModeOpenDialog;
    errorMessage?: string;
    isSubmiting?: boolean;
}

const DialogUpsertCourse = (props: DialogUpsertCourseProps) => {
    const tCourse = useResourceTranslate(Entities.COURSES);
    const { defaultValues, mode, isSubmiting, onClose, onSave, errorMessage, ...rest } = props;
    const methods = useForm<CourseFormData>({ defaultValues });
    const { handleSubmit, setError, clearErrors } = methods;

    const isEditMode = mode === ModeOpenDialog.EDIT;
    const createTitle = tCourse("addCourse");
    const title = isEditMode ? tCourse("editTitle") : createTitle;

    useEffect(() => {
        if (errorMessage && errorMessage !== "") {
            setError("locations", { message: errorMessage });
        } else {
            clearErrors("locations");
        }
    }, [errorMessage, setError, clearErrors]);

    return (
        <DialogFullScreenHF<CourseFormData>
            title={title}
            onClose={onClose}
            onSave={handleSubmit(onSave)}
            methods={methods}
            footerConfirmButtonProps={{ disabled: isSubmiting }}
            contentSize="medium"
            {...rest}
        >
            <PaperSectionWrapper>
                <CourseForm
                    isEditMode={isEditMode}
                    defaultTeachingMethod={defaultValues?.teachingMethod}
                />
            </PaperSectionWrapper>
        </DialogFullScreenHF>
    );
};

export default DialogUpsertCourse;
