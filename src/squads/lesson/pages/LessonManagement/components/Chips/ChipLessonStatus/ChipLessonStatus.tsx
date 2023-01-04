import { ERPModules } from "src/common/constants/enum";

import Skeleton from "@mui/material/Skeleton";
import ChipStatus, {
    ChipStatusProps,
    ChipStatusStyles,
} from "src/components/Chips/ChipStatus/ChipStatus";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    LessonStatusKeys,
    LessonStatusType,
} from "src/squads/lesson/pages/LessonManagement/common/types";

const ChipLessonStatusStyles: Record<
    LessonStatusType,
    Extract<ChipStatusStyles, "success" | "default" | "error" | "others">
> = {
    LESSON_SCHEDULING_STATUS_PUBLISHED: "others",
    LESSON_SCHEDULING_STATUS_DRAFT: "default",
    LESSON_SCHEDULING_STATUS_COMPLETED: "success",
    LESSON_SCHEDULING_STATUS_CANCELED: "error",
};

const isLessonStatusType = (statusKey: string): statusKey is LessonStatusType => {
    if (!statusKey) return false;
    return Object.keys(LessonStatusKeys).includes(statusKey);
};

export interface ChipLessonStatusProps extends Omit<ChipStatusProps, "status"> {
    status: string;
    isLoading: boolean;
}

export const ChipLessonStatus = (props: ChipLessonStatusProps) => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const { status: statusKey, isLoading, ...rest } = props;

    if (!isLessonStatusType(statusKey)) return null;

    const statusStyle = ChipLessonStatusStyles[statusKey];

    if (isLoading) return <Skeleton data-testid="ChipLessonStatus__loading" />;

    return (
        <ChipStatus
            {...rest}
            label={tLessonManagement(`lessonStatus.${statusKey}`)}
            status={statusStyle}
            size="small"
        />
    );
};

export default ChipLessonStatus;
