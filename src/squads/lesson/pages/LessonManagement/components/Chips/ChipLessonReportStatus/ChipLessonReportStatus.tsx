import { ERPModules } from "src/common/constants/enum";

import Skeleton from "@mui/material/Skeleton";
import ChipStatus, {
    ChipStatusProps,
    ChipStatusStyles,
} from "src/components/Chips/ChipStatus/ChipStatus";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    LessonReportSubmittingStatusType,
    LessonReportSubmittingStatusKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";

const ChipLessonStatusStyles: Record<
    LessonReportSubmittingStatusType,
    Extract<ChipStatusStyles, "success" | "default">
> = {
    LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED: "success",
    LESSON_REPORT_SUBMITTING_STATUS_SAVED: "default",
};

const isLessonReportStatusType = (
    statusKey: string
): statusKey is LessonReportSubmittingStatusType => {
    if (!statusKey) return false;
    return Object.keys(LessonReportSubmittingStatusKeys).includes(statusKey);
};

export interface ChipLessonReportStatusProps extends Omit<ChipStatusProps, "status"> {
    status: string;
    isLoading: boolean;
}

export const ChipLessonReportStatus = (props: ChipLessonReportStatusProps) => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const { status: statusKey, isLoading, ...rest } = props;

    if (!isLessonReportStatusType(statusKey)) return null;

    const statusStyle = ChipLessonStatusStyles[statusKey];

    if (isLoading) return <Skeleton data-testid="ChipLessonReportStatus__loading" />;

    return (
        <ChipStatus
            {...rest}
            label={tLessonManagement(`status.${statusKey}`)}
            status={statusStyle}
            size="small"
        />
    );
};

export default ChipLessonReportStatus;
