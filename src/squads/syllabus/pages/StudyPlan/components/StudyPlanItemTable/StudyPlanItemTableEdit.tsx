import { useCallback, useRef, ChangeEvent, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useUnmount } from "react-use";
import { Entities, Features } from "src/common/constants/enum";
import { useTimezoneCtx } from "src/squads/syllabus/contexts/timezone";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import HookForm from "src/components/Forms/HookForm";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import { convertDataToStudyPlanItemDefaultValues } from "../../common/helpers";
import { StudyPlanItemFormValues } from "../../common/types";
import useStudyPlanItemMutation from "../../hooks/useStudyPlanItemMutation";
import useStudyPlanQuery from "../../hooks/useStudyPlanQuery";
import DialogConfirmStudyPlanItem from "../Dialogs/DialogConfirmStudyPlanItem";
import { StudyPlanItemBulkEditTable } from "./StudyPlanItemBulkEditTable";
import { StudyPlanItemTable, StudyPlanItemTableProps } from "./StudyPlanItemTable";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface StudyPlanItemTableEditProps extends StudyPlanItemTableProps {
    studyPlanId: string;
    refetchStudyPlanItems: ReturnType<typeof useStudyPlanQuery>["refetch"];
    isMasterStudyPlan: boolean;
    onChangeIsEdit: (value: boolean) => void;
    submitCount: number;
    onChangeSubmitCount: (value: number) => void;
}

export const StudyPlanItemTableEdit = ({
    isFetchingStudyPlanItems,
    pagination,
    studyPlanItems,
    studyPlanId,
    isMasterStudyPlan,
    refetchStudyPlanItems,
    onChangeIsEdit,
    submitCount,
    onChangeSubmitCount,
}: StudyPlanItemTableEditProps) => {
    const { isEnabled: isStudyPlanBulkEditEnabled } = useFeatureToggle(
        Features.STUDY_PLAN_MANAGEMENT_BULK_EDIT
    );

    const { onPageChange, onRowsPerPageChange } = pagination;

    const { timezone } = useTimezoneCtx();
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);

    const formDataRef = useRef<StudyPlanItemFormValues>();
    const nextPageRef = useRef(0);
    const rowSettingRef = useRef({
        target: { value: "10" },
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);

    const methods = useForm<StudyPlanItemFormValues>({
        reValidateMode: "onBlur",
        shouldUnregister: true,
        defaultValues: convertDataToStudyPlanItemDefaultValues(studyPlanItems, timezone),
    });

    const {
        handleSubmit,
        formState: { isDirty, dirtyFields },
    } = methods;

    const { isUpdatingStudyPlanItems, updateStudyPlanItems } = useStudyPlanItemMutation();

    const {
        onClose: onSaveDialogClose,
        onOpen: onSaveDialogOpen,
        open: saveDialogOpen,
    } = useDialog();

    const {
        onClose: onPageChangeDialogClose,
        onOpen: onPageChangeDialogOpen,
        open: pageChangeDialogOpen,
    } = useDialog();
    const {
        onClose: onRowChangeDialogClose,
        onOpen: onRowChangeDialogOpen,
        open: rowChangeDialogOpen,
    } = useDialog();

    const onSave = useCallback(
        (data: StudyPlanItemFormValues) => {
            formDataRef.current = data;
            onSaveDialogOpen();
        },
        [onSaveDialogOpen]
    );

    const onSubmit = useCallback(
        (
            options: {
                shouldExitEditMode?: boolean;
                onSuccess?: () => void;
            } = {}
        ) => {
            if (!formDataRef.current?.studyPlanItem) return;

            let submittingData = Object.entries(formDataRef.current.studyPlanItem);

            const { shouldExitEditMode = true, onSuccess } = options;

            if (!isDirty) {
                submittingData = [];
            } else {
                submittingData = submittingData.filter(
                    ([studyPlanItemId]) => dirtyFields.studyPlanItem![studyPlanItemId]
                );
            }

            const updatingStudyPlanItems = submittingData.map(
                ([
                    studyPlanItemId,
                    {
                        contentStructure: {
                            book_id,
                            chapter_id,
                            topic_id,
                            assignment_id,
                            lo_id,
                            course_id,
                        },
                        status,
                        ...rest
                    },
                ]) => ({
                    studyPlanId,
                    studyPlanItemId,
                    contentStructure: {
                        bookId: book_id,
                        chapterId: chapter_id,
                        topicId: topic_id,
                        assignmentId: { value: assignment_id },
                        loId: { value: lo_id },
                        courseId: course_id,
                    },
                    status: StudyPlanItemStatus[status],
                    ...rest,
                })
            );

            updateStudyPlanItems(updatingStudyPlanItems, {
                onSuccess: () => {
                    onSuccess?.();
                    onSaveDialogClose();
                    void refetchStudyPlanItems();

                    if (shouldExitEditMode) {
                        onChangeIsEdit(false);
                    }
                },
            });
        },
        [
            isDirty,
            updateStudyPlanItems,
            dirtyFields.studyPlanItem,
            studyPlanId,
            onSaveDialogClose,
            refetchStudyPlanItems,
            onChangeIsEdit,
        ]
    );

    const _onPageChange = useCallback<typeof onPageChange>(
        (event, nextPage) => {
            if (isDirty) {
                nextPageRef.current = nextPage;
                onPageChangeDialogOpen();

                return;
            }

            onPageChange(event, nextPage);
        },
        [isDirty, onPageChangeDialogOpen, onPageChange]
    );

    const _onRowsPerPageChange = useCallback<typeof onRowsPerPageChange>(
        (event) => {
            if (isDirty) {
                rowSettingRef.current = event;
                onRowChangeDialogOpen();

                return;
            }

            onRowsPerPageChange(event);
        },
        [isDirty, onRowChangeDialogOpen, onRowsPerPageChange]
    );

    const onNextPageProceed = useCallback(() => {
        onPageChange(null, nextPageRef.current);
        onPageChangeDialogClose();
    }, [onPageChangeDialogClose, onPageChange]);

    const onRowSettingProceed = useCallback(() => {
        onRowsPerPageChange(rowSettingRef.current);
        onRowChangeDialogClose();
    }, [onRowChangeDialogClose, onRowsPerPageChange]);

    const onSaveAndMove = useCallback(
        (data: StudyPlanItemFormValues) => {
            formDataRef.current = data;
            onSubmit({ shouldExitEditMode: false, onSuccess: onNextPageProceed });
        },
        [onNextPageProceed, onSubmit]
    );

    const onSaveAndApply = useCallback(
        (data: StudyPlanItemFormValues) => {
            formDataRef.current = data;

            onSubmit({ shouldExitEditMode: false, onSuccess: onRowSettingProceed });
        },
        [onRowSettingProceed, onSubmit]
    );

    useEffect(() => {
        if (submitCount !== 0) {
            void handleSubmit(onSave)();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitCount]);

    useUnmount(() => onChangeSubmitCount(0));

    return (
        <>
            <HookForm methods={methods}>
                {isStudyPlanBulkEditEnabled ? (
                    <StudyPlanItemBulkEditTable
                        pagination={{
                            ...pagination,
                            onPageChange: _onPageChange,
                            onRowsPerPageChange: _onRowsPerPageChange,
                        }}
                        isFetchingStudyPlanItems={isFetchingStudyPlanItems}
                        studyPlanItems={studyPlanItems}
                    />
                ) : (
                    <StudyPlanItemTable
                        pagination={{
                            ...pagination,
                            onPageChange: _onPageChange,
                            onRowsPerPageChange: _onRowsPerPageChange,
                        }}
                        isFetchingStudyPlanItems={isFetchingStudyPlanItems}
                        isEditing={true}
                        studyPlanItems={studyPlanItems}
                    />
                )}
            </HookForm>
            <DialogWithHeaderFooter
                footerConfirmButtonProps={{
                    disabled: isUpdatingStudyPlanItems,
                }}
                onClose={onSaveDialogClose}
                open={saveDialogOpen}
                onSave={onSubmit}
                textSave={t("ra.common.action.update")}
                title={tCourse(
                    `studyPlan.dialog.${
                        isMasterStudyPlan
                            ? "updateStudyPlanTitle"
                            : "updateIndividualStudyPlanTitle"
                    }`
                )}
            >
                <TypographyTextSecondary variant="body1">
                    {tCourse(
                        `studyPlan.dialog.${
                            isMasterStudyPlan
                                ? "updateStudyPlanMessage"
                                : "updateIndividualStudyPlanMessage"
                        }`
                    )}
                </TypographyTextSecondary>
            </DialogWithHeaderFooter>
            <DialogConfirmStudyPlanItem
                footerConfirmButtonProps={{ disabled: isUpdatingStudyPlanItems }}
                open={pageChangeDialogOpen}
                textProceed={tCourse("studyPlan.button.moveWithoutSaving")}
                textSave={tCourse("studyPlan.button.saveAndMove")}
                onClose={onPageChangeDialogClose}
                onProceed={onNextPageProceed}
                onSave={handleSubmit(onSaveAndMove)}
            >
                {tCourse("studyPlan.dialog.confirmPageMoveMessage")}
            </DialogConfirmStudyPlanItem>
            <DialogConfirmStudyPlanItem
                footerConfirmButtonProps={{ disabled: isUpdatingStudyPlanItems }}
                open={rowChangeDialogOpen}
                textProceed={tCourse("studyPlan.button.applyWithoutSaving")}
                textSave={tCourse("studyPlan.button.saveAndApply")}
                onClose={onRowChangeDialogClose}
                onProceed={onRowSettingProceed}
                onSave={handleSubmit(onSaveAndApply)}
            >
                {tCourse("studyPlan.dialog.confirmRowSettingMessage")}
            </DialogConfirmStudyPlanItem>
        </>
    );
};

export default StudyPlanItemTableEdit;
