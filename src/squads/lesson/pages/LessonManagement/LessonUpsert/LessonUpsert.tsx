import { useMemo, useState } from "react";

import { ERPModules, Features } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { handleUnknownError } from "src/common/utils/error";
import { arrayHasItem } from "src/common/utils/other";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import DialogConfirmSavingMethod from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogConfirmSavingMethod";
import FormLessonUpsert from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonUpsert";
import FormLessonUpsertV2 from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonUpsertV2";
import WrapperHF from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperHF";

import { LessonStatus } from "manabuf/bob/v1/lessons_pb";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useSafeSetState from "src/squads/lesson/hooks/useSafeState";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import LessonUpsertFooter from "src/squads/lesson/pages/LessonManagement/LessonUpsert/LessonUpsertFooter";
import { mapLessonDetailsTypeToFormType } from "src/squads/lesson/pages/LessonManagement/common/service-to-ui-mappers";
import {
    LessonManagementUpsertFormType,
    LessonUpsertProps,
    LessonSavingMethodKeys,
    LessonTeachingMediumKeys,
    LessonTeachingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { isAllowSaveDraftLesson } from "src/squads/lesson/pages/LessonManagement/common/utils";
import useUpsertLessonOfLessonManagement, {
    UpsertLessonMiddlewareFunction,
} from "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement";

const LessonUpsert = (props: LessonUpsertProps) => {
    const {
        isOpen,
        mode,
        isEnabledLessonGroup,
        lesson,
        centerName,
        className,
        mediasList,
        scheduler,
        onUpsertSuccessfully,
        onCloseUpsertDialog,
    } = props;

    const lessonDefaultValues =
        lesson &&
        mapLessonDetailsTypeToFormType(lesson, centerName, className, mediasList, scheduler);

    const tCommon = useTranslate();
    const showSnackbar = useShowSnackbar();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const [isSubmittingData, setIsSubmittingData] = useSafeSetState(false);
    const [openAlertDialog, setOpenAlertDialog] = useSafeSetState(false);
    const [openDialogCancelUpsertLesson, setOpenDialogCancelUpsertLesson] =
        useState<boolean>(false);
    const [isSavingDraftLesson, setIsSavingDraftLesson] = useState<boolean>(false);

    const { isEnabled: isEnabledRecurringLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_RECURRING_LESSON
    );

    const defaultValuesLessonUpsertForm: Partial<LessonManagementUpsertFormType> = useMemo(() => {
        return {
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            teachingMethod: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
            teachingMedium: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_OFFLINE,
            method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            teachers: [],
            learners: [],
            materialsList: [],
            endDate: null,
        };
    }, []);

    const { upsertLessonWithMiddleWares } = useUpsertLessonOfLessonManagement({
        lessonId: lesson?.lesson_id,
        onError: (error) => {
            setIsSubmittingData(false);
            showSnackbar(tCommon("ra.manabie-error.unknown"), "error");
            window.warner?.error(`Error LessonUpsert: ${error.message}`);
        },
        onSuccess: async (data) => {
            await onUpsertSuccessfully(data);

            showSnackbar(
                tLessonManagement(`messages.success.${lesson ? "editLesson" : "addLesson"}`)
            );
            setIsSubmittingData(false);
        },
        isEnabledLessonGroup,
    });

    const locationMiddleware: UpsertLessonMiddlewareFunction = {
        middleWareFunction: (data) => {
            const learnerLocationIds = data.learners.map((learner) => learner?.locationId);

            const hasInvalidLocation = learnerLocationIds.find((learnerLocation) => {
                if (isEnabledLessonGroup) {
                    if (!data.location?.locationId) return false;

                    return (
                        typeof learnerLocation === "string" &&
                        learnerLocation !== data.location.locationId
                    );
                }

                return (
                    typeof learnerLocation === "string" &&
                    learnerLocation !== data.center.locationId
                );
            });

            if (hasInvalidLocation) return false;
            return true;
        },
        onFalse: () => {
            setIsSubmittingData(false);
            setOpenAlertDialog(true);
        },
    };

    const studentsMiddleware: UpsertLessonMiddlewareFunction = {
        middleWareFunction: (data) => {
            const learnerIds = data.learners.map((learner) => learner.student.studentId);
            const uniqueLearnerIds = new Set(learnerIds);

            if (learnerIds.length !== uniqueLearnerIds.size) return false;
            return true;
        },
        onFalse: () => {
            setIsSubmittingData(false);
            showSnackbar(tLessonManagement("messages.pleaseAddOnlyOneStudentCourse"), "error");
        },
    };

    const [isOpenConfirmSavingMethodDialog, setIsOpenConfirmSavingMethodDialog] =
        useState<boolean>(false);

    // Need to compare end date after editing to show confirm saving method dialog
    const isEndDateUpdated = (endDate: LessonManagementUpsertFormType["endDate"]) => {
        if (!endDate || !lessonDefaultValues?.endDate) return false;

        const previousEndDate = lessonDefaultValues.endDate;
        const formattedPreviousEndDate = new Date(
            previousEndDate.getFullYear(),
            previousEndDate.getMonth(),
            previousEndDate.getDate()
        );
        const newlyUpdatedEndDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
        );

        return formattedPreviousEndDate.getTime() !== newlyUpdatedEndDate.getTime();
    };

    const isShowConfirmSavingMethodDialog = (
        endDate: LessonManagementUpsertFormType["endDate"]
    ) => {
        // Show dialog when lesson is weekly recurring and not updated end date
        const isRecurringLesson =
            lessonDefaultValues?.method ===
            LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;

        const isEditMode = mode === "EDIT";

        return (
            isEnabledRecurringLesson &&
            isEditMode &&
            isRecurringLesson &&
            !isEndDateUpdated(endDate)
        );
    };

    const submitData = async (data: LessonManagementUpsertFormType) => {
        try {
            setIsOpenConfirmSavingMethodDialog(false);

            if (!isEndDateUpdated(data.endDate) && data.methodSaving)
                data.method = data.methodSaving;

            setIsSubmittingData(true);

            await upsertLessonWithMiddleWares({
                data,
                middleWares: [locationMiddleware, studentsMiddleware],
                schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
            });
        } catch (err) {
            setIsSubmittingData(false);
            const error = handleUnknownError(err);
            showSnackbar(tCommon("ra.manabie-error.unknown"), "error");
            window.warner?.error(`Error LessonUpsert: ${error?.message}`);
        }
    };

    const onSubmit = async (data: LessonManagementUpsertFormType) => {
        if (isShowConfirmSavingMethodDialog(data.endDate)) {
            setIsOpenConfirmSavingMethodDialog(true);
        } else {
            await submitData(data);
        }
    };

    const submitDataForDraftLesson = async (data: LessonManagementUpsertFormType) => {
        try {
            setIsOpenConfirmSavingMethodDialog(false);

            if (!isEndDateUpdated(data.endDate) && data.methodSaving)
                data.method = data.methodSaving;

            setIsSubmittingData(true);

            const middleWaresForDraftLesson = arrayHasItem(data.learners)
                ? [locationMiddleware, studentsMiddleware]
                : [];

            await upsertLessonWithMiddleWares({
                data,
                middleWares: middleWaresForDraftLesson,
                schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_DRAFT,
            });
        } catch (err) {
            setIsSubmittingData(false);
            const error = handleUnknownError(err);
            showSnackbar(tCommon("ra.manabie-error.unknown"), "error");
            window.warner?.error(
                `Error LessonManagementUpsert submit Draft Lesson: ${error?.message}`
            );
        }
    };

    const onSubmitDraftLesson = async (data: LessonManagementUpsertFormType) => {
        if (isShowConfirmSavingMethodDialog(data.endDate)) {
            setIsOpenConfirmSavingMethodDialog(true);
        } else {
            await submitDataForDraftLesson(data);
        }
    };

    const renderFormLessonUpsert = () => {
        return isEnabledLessonGroup ? (
            <FormLessonUpsertV2
                lessonData={lessonDefaultValues}
                mode={mode}
                isEnabledRecurringLesson={isEnabledRecurringLesson}
                isSavingDraftLesson={isSavingDraftLesson}
            />
        ) : (
            <FormLessonUpsert
                lessonData={lessonDefaultValues}
                isEnabledRecurringLesson={isEnabledRecurringLesson}
                mode={mode}
                isSavingDraftLesson={isSavingDraftLesson}
            />
        );
    };

    return (
        <WrapperHF<LessonManagementUpsertFormType>
            defaultValues={lessonDefaultValues || defaultValuesLessonUpsertForm}
            render={({ handleSubmit }) => {
                return (
                    <>
                        <DialogFullScreen
                            title={tLessonManagement(lesson ? "editTitle" : "createTitle")}
                            open={isOpen}
                            onClose={onCloseUpsertDialog}
                            onSave={() => {}} // For rendering footer
                            isShowingBackdrop={isSubmittingData}
                            dialogCancelConfirmProps={{ textSave: tCommon("ra.action.leave") }}
                            data-testid="LessonUpsert__dialog"
                            footer={
                                <LessonUpsertFooter
                                    onCancel={() => setOpenDialogCancelUpsertLesson(true)}
                                    onSaveDraft={handleSubmit(onSubmitDraftLesson)}
                                    onPublish={handleSubmit(onSubmit)}
                                    actionButtonBehavior={{
                                        disableSaveDraft: isSubmittingData,
                                        disablePublish: isSubmittingData,
                                        displaySaveDraftButton: isAllowSaveDraftLesson(
                                            convertString(lesson?.scheduling_status)
                                        ),
                                    }}
                                    setIsSavingDraftLesson={() => setIsSavingDraftLesson(true)}
                                />
                            }
                        >
                            {renderFormLessonUpsert()}

                            <DialogCancelConfirm
                                open={openDialogCancelUpsertLesson}
                                onClose={() => setOpenDialogCancelUpsertLesson(false)}
                                onSave={() => {
                                    setOpenDialogCancelUpsertLesson(false);
                                    onCloseUpsertDialog();
                                }}
                                textSave={tCommon("ra.action.leave")}
                            />
                        </DialogFullScreen>

                        <DialogWithHeaderFooter
                            open={openAlertDialog}
                            textSave={tCommon("ra.action.close")}
                            shouldShowCancelButton={false}
                            onSave={() => setOpenAlertDialog(false)}
                            onClose={() => setOpenAlertDialog(false)}
                            title={tLessonManagement("actions.alert")}
                        >
                            <TypographyTextSecondary>
                                {tLessonManagement(
                                    "cannotSaveLessonPleaseAddStudentFromSameCenter"
                                )}
                            </TypographyTextSecondary>
                        </DialogWithHeaderFooter>

                        <DialogConfirmSavingMethod
                            open={isOpenConfirmSavingMethodDialog}
                            onSave={handleSubmit(
                                isSavingDraftLesson ? submitDataForDraftLesson : submitData
                            )}
                            onClose={() => setIsOpenConfirmSavingMethodDialog(false)}
                        />
                    </>
                );
            }}
        />
    );
};

export default LessonUpsert;
