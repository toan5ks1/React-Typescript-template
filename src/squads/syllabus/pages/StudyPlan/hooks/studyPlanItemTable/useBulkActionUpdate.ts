import { useCallback, useState } from "react";

import { DateTime } from "luxon";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
    getDateAfterByDuration,
    getDateBeforeByDuration,
} from "src/squads/syllabus/common/utils/time";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import {
    StudyPlanItemDateField,
    StudyPlanItemFormValues,
    StudyPlanItemWithLoInfo,
} from "../../common/types";

import { StudyPlanItemStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";

export type PostponeAdvanceDateType = "postpone" | "advance";

export type VisibilityType = "showAll" | "hideAll";

export type DialogContext = {
    label: string;
    fieldName: StudyPlanItemDateField;
};

type FullFieldNameType = `studyPlanItem.${string}.${StudyPlanItemDateField}`;

const useBulkActionUpdate = ({
    selectedItems,
    setValue,
    getValues,
}: {
    selectedItems: StudyPlanItemWithLoInfo[];
    setValue: UseFormSetValue<StudyPlanItemFormValues>;
    getValues: UseFormGetValues<StudyPlanItemFormValues>;
}) => {
    const [dialogContext, setDialogContext] = useState<DialogContext>();

    const handleUpdateDateTime = useCallback(
        (value: string | null) => {
            if (dialogContext) {
                selectedItems.forEach((item) => {
                    const name: FullFieldNameType = `studyPlanItem.${item.study_plan_item_id}.${dialogContext.fieldName}`;
                    setValue(name, value ?? "", { shouldDirty: true });
                });
            }
        },
        [dialogContext, selectedItems, setValue]
    );

    const handlePostponeAdvanceDate = useCallback(
        (type: PostponeAdvanceDateType, value: number) => {
            if (!dialogContext) return;

            selectedItems.forEach((item) => {
                const name: FullFieldNameType = `studyPlanItem.${item.study_plan_item_id}.${dialogContext.fieldName}`;
                const currentDateTime = getValues(name);

                const isValidValue = currentDateTime && value > 0;
                if (!isValidValue) return;

                const dateString = currentDateTime.split(",")[0];
                const timeString = currentDateTime.split(",")[1];

                const currentDate = new Date(dateString);

                const duration = { days: value };
                let changedDate: DateTime;

                switch (type) {
                    case "postpone":
                        changedDate = getDateAfterByDuration(currentDate, duration);
                        break;
                    case "advance":
                        changedDate = getDateBeforeByDuration(currentDate, duration);
                        break;
                }

                setValue(name, `${changedDate.toFormat("yyyy/LL/dd")},${timeString}`, {
                    shouldDirty: true,
                });
            });
        },
        [dialogContext, selectedItems, getValues, setValue]
    );

    const handleUpdateShowHide = useCallback(
        (type: VisibilityType) => {
            let value: keyof typeof StudyPlanItemStatus;

            switch (type) {
                case "showAll":
                    value = StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE;
                    break;
                case "hideAll":
                    value = StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED;
                    break;
            }

            selectedItems.forEach((item) => {
                const name: FullFieldNameType = `studyPlanItem.${item.study_plan_item_id}.status`;

                setValue(name, value, { shouldDirty: true });
            });
        },
        [selectedItems, setValue]
    );

    return {
        dialogContext,
        setDialogContext,
        handleUpdateDateTime,
        handlePostponeAdvanceDate,
        handleUpdateShowHide,
    };
};

export default useBulkActionUpdate;
