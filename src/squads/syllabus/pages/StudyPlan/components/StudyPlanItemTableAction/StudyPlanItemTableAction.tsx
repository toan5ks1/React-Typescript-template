import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { StudyPlanOneV2Query } from "src/squads/syllabus/services/eureka/eureka-types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import Box from "@mui/material/Box";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";

import { StudyPlanStatus } from "manabuf/eureka/v1/enums_pb";

import { StudyPlanItemStatusKey } from "../../common/constants";
import { StudyPlanItemsByTopic, StudyPlanTopicPagination } from "../../common/types";
import useStudyPlanQuery from "../../hooks/useStudyPlanQuery";
import StudyPlanItemTable, { StudyPlanItemTableEdit } from "../StudyPlanItemTable";
import Action from "./Action";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface StudyPlanItemTableActionProps {
    studyPlan: ArrayElement<StudyPlanOneV2Query["study_plans"]>;
    studyPlanItems: StudyPlanItemsByTopic[];
    isFetchingStudyPlanItems: boolean;
    pagination: StudyPlanTopicPagination;
    refetchStudyPlanItems: ReturnType<typeof useStudyPlanQuery>["refetch"];
    isMasterStudyPlan: boolean;
}

const StudyPlanItemTableAction = (props: StudyPlanItemTableActionProps) => {
    const {
        isFetchingStudyPlanItems,
        studyPlan,
        studyPlanItems,
        pagination,
        refetchStudyPlanItems,
        isMasterStudyPlan,
    } = props;

    const [shouldShowArchived, setShouldShowArchived] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const tCourse = useResourceTranslate(Entities.COURSES);
    const [submitCount, setSubmitCount] = useState(0);
    const {
        onClose: onCancelDialogClose,
        onOpen: onCancelDialogOpen,
        open: cancelDialogOpen,
    } = useDialog();

    const onDisplayChange = useCallback(
        ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
            setShouldShowArchived(checked);
        },
        []
    );

    const onEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const onSave = useCallback(() => {
        setSubmitCount((current) => current + 1);
    }, []);
    const t = useTranslate();

    const studyPlanItemsFiltered = useMemo(
        () =>
            shouldShowArchived
                ? studyPlanItems
                : studyPlanItems.map(({ studyPlanItems, ...rest }) => ({
                      studyPlanItems: studyPlanItems.filter(
                          ({ status }) =>
                              status !== StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED
                      ),
                      ...rest,
                  })),
        [shouldShowArchived, studyPlanItems]
    );

    return (
        <Box data-testid="StudyPlanItemTableAction__root">
            <WrapperPageHeader
                mb={2}
                title={tCourse("studyPlan.studyPlanContent")}
                action={
                    <Action
                        isEditing={isEditing}
                        studyPlanStatus={studyPlan.status as keyof typeof StudyPlanStatus}
                        shouldShowArchived={shouldShowArchived}
                        onCancel={onCancelDialogOpen}
                        onDisplayChange={onDisplayChange}
                        onEdit={onEdit}
                        onSave={onSave}
                    />
                }
            />
            {isFetchingStudyPlanItems || !isEditing ? (
                <Box data-testid="StudyPlanItemTableAction__tableView">
                    <StudyPlanItemTable
                        isEditing={isEditing}
                        isFetchingStudyPlanItems={isFetchingStudyPlanItems}
                        studyPlanItems={studyPlanItemsFiltered}
                        pagination={pagination}
                    />
                </Box>
            ) : (
                <Box data-testid="StudyPlanItemTableAction__tableEdit">
                    <StudyPlanItemTableEdit
                        isEditing={isEditing}
                        isFetchingStudyPlanItems={isFetchingStudyPlanItems}
                        pagination={pagination}
                        studyPlanItems={studyPlanItemsFiltered}
                        studyPlanId={studyPlan.study_plan_id}
                        isMasterStudyPlan={isMasterStudyPlan}
                        refetchStudyPlanItems={refetchStudyPlanItems}
                        onChangeIsEdit={setIsEditing}
                        submitCount={submitCount}
                        onChangeSubmitCount={setSubmitCount}
                    />
                </Box>
            )}

            <DialogWithHeaderFooter
                footerConfirmButtonProps={{ color: "error" }}
                onClose={onCancelDialogClose}
                open={cancelDialogOpen}
                onSave={() => {
                    setIsEditing(false);
                    onCancelDialogClose();
                }}
                textSave={t("ra.action.leave")}
                title={t("ra.common.cancelDialogTitle")}
            >
                <TypographyTextSecondary variant="body1">
                    {t("ra.common.cancelDialogMessage")}
                </TypographyTextSecondary>
            </DialogWithHeaderFooter>
        </Box>
    );
};

export default StudyPlanItemTableAction;
