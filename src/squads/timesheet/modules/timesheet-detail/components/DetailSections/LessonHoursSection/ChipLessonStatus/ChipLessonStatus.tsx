import { ERPModules } from "src/common/constants/enum";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus from "src/components/Chips/ChipStatus/ChipStatus";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export enum LessonChipStatus {
    LESSON_SCHEDULING_STATUS_CANCELED = "error",
    LESSON_SCHEDULING_STATUS_COMPLETED = "success",
    LESSON_SCHEDULING_STATUS_PUBLISHED = "default",
}

export interface ChipLessonStatusProps extends ChipBaseProps {
    status: string;
}

const ChipLessonStatus = (props: ChipLessonStatusProps) => {
    const t = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const { status, ...rest } = props;

    return (
        <ChipStatus
            {...rest}
            label={t(`lessonStatus.${status}`)}
            status={LessonChipStatus[status]}
            size="small"
        />
    );
};

export default ChipLessonStatus;
