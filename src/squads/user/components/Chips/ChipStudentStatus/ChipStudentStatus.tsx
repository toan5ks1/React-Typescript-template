import { ERPModules } from "src/common/constants/enum";
import { StatusStudentTypes } from "src/squads/user/common/types/student";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus from "src/squads/user/components/Chips/ChipStatus/ChipStatus";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export enum StudentEnrollmentChipStatus {
    STUDENT_ENROLLMENT_STATUS_POTENTIAL = "warning",
    STUDENT_ENROLLMENT_STATUS_ENROLLED = "success",
    STUDENT_ENROLLMENT_STATUS_WITHDRAWN = "others",
    STUDENT_ENROLLMENT_STATUS_GRADUATED = "success",
    STUDENT_ENROLLMENT_STATUS_LOA = "others",
}

export interface ChipStudentStatusProps extends ChipBaseProps {
    status: StatusStudentTypes | string;
}

const ChipStudentStatus = (props: ChipStudentStatusProps) => {
    const t = useResourceTranslate(ERPModules.STUDENTS);
    const { status, ...rest } = props;

    return (
        <ChipStatus
            {...rest}
            label={t(`status.${status}`)}
            status={StudentEnrollmentChipStatus[status]}
            size="small"
        />
    );
};

export default ChipStudentStatus;
