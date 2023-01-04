import { useCallback, useMemo } from "react";

import { useFormContext } from "react-hook-form";
import { Entities, EurekaEntities, Features } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";

import Box from "@mui/material/Box";
import ButtonDropdownMenu from "src/components/Menus/ButtonDropdownMenu";

import { StudyPlanItemFormValues, StudyPlanItemWithLoInfo } from "../../common/types";
import useBulkActionUpdate from "../../hooks/studyPlanItemTable/useBulkActionUpdate";
import BulkEditStudyPlanItemDialog from "../Dialogs/BulkEditDialog";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { StudyPlanItemStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";

enum Action {
    availableFrom = "availableFrom",
    availableUntil = "availableTo",
    start = "startDate",
    due = "endDate",
    showAll = "showAll",
    hideAll = "hideAll",
}

const actionKeys = Object.keys(Action);
const actionValues = Object.values(Action);

interface BulkActionsProps {
    selectedItems: StudyPlanItemWithLoInfo[];
}

export const BulkActions = ({ selectedItems }: BulkActionsProps) => {
    const { isEnabled: isStudyPlanBulkEditPhase2Enabled } = useFeatureToggle(
        Features.STUDY_PLAN_MANAGEMENT_BULK_EDIT_PHASE2
    );

    const { setValue, getValues } = useFormContext<StudyPlanItemFormValues>();

    const {
        dialogContext,
        setDialogContext,
        handleUpdateDateTime,
        handlePostponeAdvanceDate,
        handleUpdateShowHide,
    } = useBulkActionUpdate({
        selectedItems,
        setValue,
        getValues,
    });

    const tCourse = useResourceTranslate(Entities.COURSES);
    const tStudyPlan = useResourceTranslate(EurekaEntities.STUDY_PLANS);

    const { onClose, onOpen, open } = useDialog();

    const isHideAll = useMemo(() => {
        if (selectedItems.length === 0) return false;

        return selectedItems.every(
            (item) => item.status === StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE
        );
    }, [selectedItems]);

    const actionOptions = useMemo(() => {
        const actions = [
            tCourse(`studyPlan.bulkEdit.${actionValues[0]}`),
            tCourse(`studyPlan.bulkEdit.${actionValues[1]}`),
            tCourse(`studyPlan.bulkEdit.${actionValues[2]}`),
            tCourse(`studyPlan.bulkEdit.${actionValues[3]}`),
        ];

        if (isStudyPlanBulkEditPhase2Enabled) {
            actions.push(tCourse(`studyPlan.bulkEdit.${actionValues[isHideAll ? 5 : 4]}`));
        }

        return actions.map((actionName, idx) => ({
            id: idx,
            value: actionName,
            disabled: selectedItems.length === 0,
        }));
    }, [isHideAll, isStudyPlanBulkEditPhase2Enabled, selectedItems.length, tCourse]);

    const handleSelectAction = useCallback(
        ({ id }: OptionSelectType) => {
            const key = actionKeys[id];
            const fieldName = actionValues[id];
            const showAllOrHideAllOptionId = 4;

            switch (id) {
                case 0:
                case 1:
                    setDialogContext({
                        label: tCourse(`studyPlan.${key}`),
                        fieldName,
                    });

                    break;
                case 2:
                case 3:
                    setDialogContext({
                        label: tStudyPlan(`columns.${key}`),
                        fieldName,
                    });
                    break;
                case showAllOrHideAllOptionId:
                    handleUpdateShowHide(isHideAll ? "hideAll" : "showAll");
                    break;
            }

            if (id === showAllOrHideAllOptionId) return;

            onOpen();
        },
        [handleUpdateShowHide, isHideAll, onOpen, setDialogContext, tCourse, tStudyPlan]
    );

    return (
        <Box mb={2}>
            <ButtonDropdownMenu
                isTranslated
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                label={tCourse(`studyPlan.bulkEdit.button`)}
                options={actionOptions}
                onClick={handleSelectAction}
            />

            <BulkEditStudyPlanItemDialog
                open={open}
                onClose={onClose}
                dialogContext={dialogContext}
                onUpdateDateTime={handleUpdateDateTime}
                onPostponeAdvance={handlePostponeAdvanceDate}
            />
        </Box>
    );
};
