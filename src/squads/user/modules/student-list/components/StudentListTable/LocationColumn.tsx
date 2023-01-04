import { memo } from "react";

import TooltipColumn from "src/squads/user/components/Tables/ColumnTables/TooltipColumn";

import isEqual from "lodash/isEqual";
import type { UseStudentListLocationReturn } from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

export interface LocationColumnProps extends Omit<UseStudentListLocationReturn, "refetch"> {
    studentId: string;
}

function LocationColumn({ isLoading, studentId, mapLocations }: LocationColumnProps) {
    const locations = mapLocations?.get(studentId);
    const locationsName = locations?.map((item) => item.name).join(", ");

    return (
        <TooltipColumn
            isLoading={isLoading}
            content={locationsName}
            dataTestIdContent="TableColumnLocation__content"
            dataTestIdLoading="TableColumnLocation__loading"
            maxLines={2}
        />
    );
}
export default memo(LocationColumn, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});
