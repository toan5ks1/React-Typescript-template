import { useCallback, useEffect } from "react";

import { useForm, UseFormProps } from "react-hook-form";
import {
    Entities,
    EurekaEntities,
    ModeOpenDialog,
    ProviderTypes,
    SearchEngine,
} from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";

import StudyPlanForm from "../StudyPlanForm";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useStudyPlanMutation from "src/squads/syllabus/hooks/useStudyPlanMutation";
import { defaultStudyPlanFormValues } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import { StudyPlanFormData } from "src/squads/syllabus/pages/StudyPlan/common/types";

export interface DialogUpsertStudyplanProps
    extends Pick<UseFormProps<StudyPlanFormData>, "defaultValues"> {
    mode: ModeOpenDialog;
    open: boolean;
    onClose: () => void;
    courseId: string;
    studyPlanId?: string;
    refetchStudyPlanInfo?: () => void;
}

const DialogUpsertStudyplan = (props: DialogUpsertStudyplanProps) => {
    const {
        open,
        onClose,
        defaultValues = defaultStudyPlanFormValues,
        courseId,
        studyPlanId,
        mode,
        refetchStudyPlanInfo,
    } = props;
    const tCourse = useResourceTranslate(Entities.COURSES);
    const navigation = useNavigation();
    const isAddMode = mode === ModeOpenDialog.ADD;
    const searchUrl = `?${SearchEngine.COURSE_ID}=${courseId}`;
    const dialogTitle = tCourse(isAddMode ? "studyPlan.addStudyplan" : "studyPlan.editStudyplan");

    const { createStudyPlan, updateStudyPlan, isLoadingBookMutation, isLoadingStudyPlanMutation } =
        useStudyPlanMutation({
            action: isAddMode ? ProviderTypes.CREATE : ProviderTypes.UPDATE,
            courseId,
            studyPlanId,
        });

    const methods = useForm<StudyPlanFormData>({
        defaultValues,
    });

    const {
        handleSubmit,
        reset: resetForm,
        formState: { isDirty },
    } = methods;

    const handleCloseUpsertDialog = useCallback(() => {
        onClose();
    }, [onClose]);

    const onSubmit = useCallback(
        (data: StudyPlanFormData) => {
            if (isAddMode) {
                return createStudyPlan(data, {
                    onSuccess: async (response) => {
                        const { studyPlanId: createdStudyPlanId } = await response;

                        navigation.push(
                            `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${createdStudyPlanId}/show${searchUrl}`
                        );
                    },
                });
            }
            return updateStudyPlan(data, {
                onSuccess: () => {
                    refetchStudyPlanInfo && refetchStudyPlanInfo();
                    handleCloseUpsertDialog();
                },
            });
        },
        [
            createStudyPlan,
            handleCloseUpsertDialog,
            isAddMode,
            navigation,
            refetchStudyPlanInfo,
            searchUrl,
            updateStudyPlan,
        ]
    );

    useEffect(() => {
        if (open) resetForm(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, JSON.stringify(defaultValues), resetForm]);

    return (
        <DialogFullScreenHF<StudyPlanFormData>
            title={dialogTitle}
            open={open}
            onClose={handleCloseUpsertDialog}
            onSave={handleSubmit(onSubmit)}
            methods={methods}
            footerConfirmButtonProps={{
                disabled: isLoadingBookMutation || isLoadingStudyPlanMutation || !isDirty,
            }}
            data-testid="DialogUpsertStudyplan__root"
            contentSize="medium"
        >
            <StudyPlanForm isAddMode={isAddMode} />
        </DialogFullScreenHF>
    );
};

export default DialogUpsertStudyplan;
