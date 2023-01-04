import { ERPModules } from "src/common/constants/enum";
import { handleOpenNewTab } from "src/common/utils/other";

import { AssignmentOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonPrimaryText, {
    ButtonPrimaryTextProps,
} from "src/components/Buttons/ButtonPrimaryText";

import { Users } from "src/squads/lesson/__generated__/bob/root-types";
import { Courses } from "src/squads/lesson/__generated__/fatima/root-types";
import useCreateViewStudyPlanLink from "src/squads/lesson/hooks/useCreateViewStudyPlanLink";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface ButtonViewStudyPlanProps extends ButtonPrimaryTextProps {
    studentId: Users["user_id"];
    courseId: Courses["course_id"];
}

const ButtonViewStudyPlan = (props: ButtonViewStudyPlanProps) => {
    const { studentId, courseId, ...rest } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const link = useCreateViewStudyPlanLink({ courseId, studentId });

    const title = link ? "viewStudyPlan" : "errors.unableToFetchTheLinkToThisStudentStudyPlan";

    return (
        <Box title={tLessonManagement(title)}>
            <ButtonPrimaryText
                id="ButtonViewStudyPlan__button"
                data-testid="ButtonViewStudyPlan__button"
                onClick={() => handleOpenNewTab(link)}
                startIcon={<AssignmentOutlined />}
                fullWidth
                disabled={!link}
                {...rest}
            >
                {tLessonManagement("viewStudyPlan")}
            </ButtonPrimaryText>
        </Box>
    );
};

export default ButtonViewStudyPlan;
