import { ERPModules } from "src/common/constants/enum";

import Skeleton from "@mui/material/Skeleton";
import ChipStatus, {
    ChipStatusProps,
    ChipStatusStyles,
} from "src/components/Chips/ChipStatus/ChipStatus";

import { AssignedStudentStatusTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

const StudentAssignedChipStatus: Record<
    AssignedStudentStatusTypes,
    Extract<ChipStatusStyles, "success" | "default" | "error">
> = {
    STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED: "success",
    STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED: "default",
    STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED: "error",
};

export interface ChipAssignedStudentStatusProps extends Omit<ChipStatusProps, "status"> {
    status: AssignedStudentStatusTypes;
    isLoading: boolean;
}

export const ChipAssignedStudentStatus = (props: ChipAssignedStudentStatusProps) => {
    const tAssignedStudent = useResourceTranslate(ERPModules.ASSIGNED_STUDENT_LIST);
    const { status: statusKey, isLoading, ...rest } = props;
    const statusStyle = StudentAssignedChipStatus[statusKey];

    if (isLoading) return <Skeleton data-testid="TableColumnStatus__loading" />;
    return (
        <ChipStatus
            {...rest}
            label={tAssignedStudent(`studentAssignedStatus.${statusKey}`)}
            status={statusStyle}
            size="small"
        />
    );
};

export default ChipAssignedStudentStatus;
