import { useCallback } from "react";

import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { UpsertStudentFormProps } from "src/squads/user/common/types";
import { StudentSchoolHistoryFormProps } from "src/squads/user/common/types/common";

import { initializeSchoolHistory } from "src/squads/user/common/helpers/initializeFieldArray";

export interface UseSchoolHistoryFieldArrayReturn {
    fields: FieldArrayWithId<UpsertStudentFormProps, "schoolHistories", "id">[];
    onAdd: () => void;
    onRemove: (selectedSchoolHistories: StudentSchoolHistoryFormProps[]) => void;
}

export default function useSchoolHistoryFieldArray(): UseSchoolHistoryFieldArrayReturn {
    const { control } = useFormContext<UpsertStudentFormProps>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "schoolHistories",
    });

    const onAdd = useCallback(() => {
        const schoolHistory = initializeSchoolHistory();
        append(schoolHistory);
    }, [append]);

    const onRemove = useCallback(
        (selectedSchoolHistories: StudentSchoolHistoryFormProps[]) => {
            const selectedIds = selectedSchoolHistories.map((schoolHistory) => schoolHistory.id);

            const SchoolHistoryPositions = fields?.reduce(
                (positions: number[], currentSchoolHistoryValue, index) => {
                    if (selectedIds.includes(currentSchoolHistoryValue.id)) {
                        positions.push(index);
                    }
                    return positions;
                },
                []
            );

            remove(SchoolHistoryPositions);
        },
        [fields, remove]
    );

    return {
        fields,
        onAdd,
        onRemove,
    };
}
