import { memo } from "react";

import Skeleton from "@mui/material/Skeleton";
import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStudentStatus from "src/squads/user/components/Chips/ChipStudentStatus";

import isEqual from "lodash/isEqual";
import type { UseNormalizedGradesReturn } from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";

export interface StatusColumnProps
    extends ChipBaseProps,
        Pick<UseNormalizedGradesReturn, "mapGrades" | "loading"> {
    studentId: string;
}

const StatusColumn = ({ loading, mapGrades, studentId, ...rest }: StatusColumnProps) => {
    const status = mapGrades.get(studentId)?.enrollment_status;

    if (loading) return <Skeleton data-testid="TableColumnStatus__loading" />;
    if (!status) return null;

    return <ChipStudentStatus {...rest} status={status} />;
};

export default memo(StatusColumn, (prevProps, currentProps) => isEqual(prevProps, currentProps));
