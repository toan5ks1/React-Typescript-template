import { useCallback, useState } from "react";

import { ERPModules, Features, MutationMenus } from "src/common/constants/enum";

import { Box } from "@mui/material";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import ActionPanel from "src/components/Menus/ActionPanel";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import ChipLessonStatus from "src/squads/lesson/pages/LessonManagement/components/Chips/ChipLessonStatus";
import DialogDeleteLesson from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogDeleteLesson";
import DialogDeleteRecurringLesson from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogDeleteRecurringLesson";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonSavingMethodType } from "src/squads/lesson/pages/LessonManagement/common/types";
import useDeleteLessonOfLessonManagement from "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement";

export interface HeaderLessonDetailWithActionProps {
    lessonTitle: string;
    lessonId: string;
    isLoadingLesson: boolean;
    lessonStatus: string;
    onDeleteSuccess: () => void;
    freq: "weekly" | "once";
}

const HeaderLessonDetailWithAction = (props: HeaderLessonDetailWithActionProps) => {
    const { lessonTitle, lessonId, isLoadingLesson, lessonStatus, onDeleteSuccess, freq } = props;

    const [openDeleteLessonDialog, setOpenDeleteLessonDialog] = useState<boolean>(false);

    const { isEnabled: isShowLessonGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_GROUP
    );
    const { isEnabled: isShowRecurringLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_RECURRING_LESSON
    );

    const { isEnabled: isEnabledStatusLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON
    );

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { deleteLesson, isDeleting } = useDeleteLessonOfLessonManagement();

    const onMutation = useCallback((action: MutationMenus) => {
        if (action === MutationMenus.DELETE) return setOpenDeleteLessonDialog(true);
    }, []);

    const handleDeleteLesson = async () => {
        await deleteLesson({
            lessonId,
            onSuccess: onDeleteSuccess,
        });
    };

    const handleDeleteRecurringLesson = async (value: LessonSavingMethodType) => {
        await deleteLesson({
            lessonId,
            savingOption: {
                method: CreateLessonSavingMethod[value],
            },
            onSuccess: onDeleteSuccess,
        });
    };

    const actions = [
        {
            action: MutationMenus.DELETE,
            label: "ra.action.delete",
            withConfirm: false,
        },
    ];

    const renderMethodConfirmDeleteLesson = () => {
        if (freq === "weekly" && isShowRecurringLesson) {
            return (
                <DialogDeleteRecurringLesson
                    open={openDeleteLessonDialog}
                    onSave={handleDeleteRecurringLesson}
                    onClose={() => setOpenDeleteLessonDialog(false)}
                />
            );
        }
        if (isShowLessonGroup) {
            return (
                <DialogDeleteLesson
                    open={openDeleteLessonDialog}
                    isDeleting={isDeleting}
                    onSave={handleDeleteLesson}
                    onClose={() => setOpenDeleteLessonDialog(false)}
                />
            );
        }

        return (
            <DialogCancelConfirm
                open={openDeleteLessonDialog}
                onSave={handleDeleteLesson}
                onClose={() => setOpenDeleteLessonDialog(false)}
                textSave={t("ra.action.delete")}
                title={tLessonManagement("deleteLesson")}
                textCancelDialog={
                    <>
                        {tLessonManagement("areYouSureDeleteTheLesson")}
                        <br />
                        {tLessonManagement("ifYouDeleteThisLesson")}
                    </>
                }
            />
        );
    };

    return (
        <>
            <Box display="flex" alignItems="center">
                {isEnabledStatusLesson && (
                    <Box mb={3} mr={2}>
                        <ChipLessonStatus
                            data-testid="HeaderLessonDetailWithAction__chipLessonStatus"
                            isLoading={isLoadingLesson}
                            status={lessonStatus}
                            label={lessonStatus}
                        />
                    </Box>
                )}
                <WrapperPageHeader
                    sx={{
                        width: "100%",
                    }}
                    title={lessonTitle}
                    action={
                        <ActionPanel
                            actions={actions}
                            onAction={onMutation}
                            recordName=""
                            buttonStyle="square"
                        />
                    }
                />
            </Box>
            {renderMethodConfirmDeleteLesson()}
        </>
    );
};

export default HeaderLessonDetailWithAction;
