import { memo } from "react";

import TextColumn, {
    TextColumnProps,
} from "src/squads/user/components/Tables/ColumnTables/TextColumn";

import isEqual from "lodash/isEqual";
import type { UseNormalizedGradesReturn } from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";

export interface GradeColumnProps
    extends Omit<TextColumnProps, "isLoading" | "dataTestIdContent" | "dataTestIdLoading">,
        UseNormalizedGradesReturn {
    studentId: string;
}

function GradeColumn({ getGradeName, loading, mapGrades, studentId, ...rest }: GradeColumnProps) {
    const grade = getGradeName(mapGrades.get(studentId)?.current_grade || 0);

    return (
        <TextColumn
            isLoading={loading}
            content={grade}
            dataTestIdContent="TableColumnGrade__content"
            dataTestIdLoading="TableColumnGrade__loading"
            {...rest}
        />
    );
}
export default memo(GradeColumn, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});
