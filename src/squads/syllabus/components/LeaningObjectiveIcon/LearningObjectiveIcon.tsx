import { KeyAssignmentTypes, KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import EntityIcon from "src/squads/syllabus/components/EntityIcon";
import AssignmentIcon from "src/squads/syllabus/components/SvgIcons/AssignmentIcon";
import AssignmentIconOutlined from "src/squads/syllabus/components/SvgIcons/AssignmentIconOutlined";
import ExamLOIcon from "src/squads/syllabus/components/SvgIcons/ExamLOIcon";
import FlashCardIcon from "src/squads/syllabus/components/SvgIcons/FlashCardIcon";
import FlashCardIconOutlined from "src/squads/syllabus/components/SvgIcons/FlashCardIconOutlined";
import LOIcon from "src/squads/syllabus/components/SvgIcons/LOIcon";
import LOIconOutlined from "src/squads/syllabus/components/SvgIcons/LOIconOutlined";
import OfflineStudyIcon from "src/squads/syllabus/components/SvgIcons/OfflineStudyIcon";
import OfflineStudyIconOutlined from "src/squads/syllabus/components/SvgIcons/OfflineStudyIconOutlined";
import TaskAssignmentIcon from "src/squads/syllabus/components/SvgIcons/TaskAssignmentIcon";

const getOutlinedIconByType = (type: LearningObjectiveIconProps["type"]) => {
    switch (type) {
        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD:
            return <FlashCardIconOutlined />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING:
            return <OfflineStudyIconOutlined />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING:
            return <LOIconOutlined />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO:
            return <ExamLOIcon />;

        case KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK:
            return <TaskAssignmentIcon />;

        default:
            return <AssignmentIconOutlined />;
    }
};

const getIconByType = (type: LearningObjectiveIconProps["type"]) => {
    switch (type) {
        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD:
            return <FlashCardIcon />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING:
            return <OfflineStudyIcon />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING:
            return <LOIcon />;

        case KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO:
            return <ExamLOIcon />;

        case KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK:
            return <TaskAssignmentIcon />;

        default:
            return <AssignmentIcon />;
    }
};

export interface LearningObjectiveIconProps {
    variant?: "outlined" | "contained";
    type?: string | null;
    disabled?: boolean;
}

const LearningObjectiveIcon = (props: LearningObjectiveIconProps) => {
    const { variant = "contained", type, disabled } = props;

    const icon = variant === "contained" ? getIconByType(type) : getOutlinedIconByType(type);

    return <EntityIcon disabled={disabled}>{icon}</EntityIcon>;
};

export default LearningObjectiveIcon;
