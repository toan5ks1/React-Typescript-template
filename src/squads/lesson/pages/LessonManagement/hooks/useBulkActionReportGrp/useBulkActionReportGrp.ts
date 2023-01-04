import { useCallback, useState } from "react";

import get from "lodash/get";
import { FieldValues, useFormContext, Path } from "react-hook-form";
import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import {
    BulkActionForTable,
    DynamicFieldInTable,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export interface UseBulkActionReportGrpProps<T> {
    dynamicFieldsPath: Path<T>;
    studentsList: LessonForLessonReportQueried["lesson_members"];
}

interface BulkActionRef {
    ref: HTMLButtonElement;
    dynamicField: DynamicFieldInTable;
}

export interface UseBulkActionReportGrpReturn {
    bulkActionRef: BulkActionRef | null;
    setBulkActionRef: (ref: BulkActionRef) => void;
    onApplyBulkAction: (props: BulkActionForTable) => void;
    onCloseBulkAction: () => void;
}

const useBulkActionReportGrp = <T extends FieldValues>(
    props: UseBulkActionReportGrpProps<T>
): UseBulkActionReportGrpReturn => {
    const { studentsList, dynamicFieldsPath } = props;

    const [bulkActionRef, setBulkActionRef] = useState<BulkActionRef | null>(null);

    const { getValues, setValue } = useFormContext<T>();

    const handleApplyBulkAction = useCallback(
        (props: BulkActionForTable) => {
            const { isApplyToBlankFieldOnly, dynamicField, value } = props;

            const currentValues = getValues(dynamicFieldsPath);
            const currentDynamicFieldValue = get(currentValues, dynamicField.field_id);

            studentsList.forEach((student) => {
                const valueOfStudent = get(currentDynamicFieldValue, student.user.user_id);

                if (!isApplyToBlankFieldOnly || !valueOfStudent) {
                    currentDynamicFieldValue[student.user.user_id] = value;
                }
            });

            const dynamicFieldPath = `${dynamicFieldsPath}.${dynamicField.field_id}` as Path<T>;
            setValue(dynamicFieldPath, currentDynamicFieldValue);
        },
        [dynamicFieldsPath, getValues, setValue, studentsList]
    );

    const onApplyBulkAction = (props: BulkActionForTable) => {
        handleApplyBulkAction(props);
        setBulkActionRef(null);
    };

    const onCloseBulkAction = () => {
        setBulkActionRef(null);
    };

    return {
        bulkActionRef,
        setBulkActionRef,
        onApplyBulkAction,
        onCloseBulkAction,
    };
};

export default useBulkActionReportGrp;
