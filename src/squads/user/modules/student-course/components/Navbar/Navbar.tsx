import { ERPModules } from "src/common/constants/enum";

import EditOutlined from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import ButtonEdit from "src/components/Buttons/ButtonEdit";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import { UseDialogReturn } from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

interface StudentCourseNavbarProps extends Pick<UseDialogReturn, "onOpen"> {}

export const StudentCourseNavbar = ({ onOpen }: StudentCourseNavbarProps) => {
    const t = useTranslate();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            data-testid="StudentCourseNavbar"
        >
            <Box mb={2}>
                <TypographyHeader data-testid="StudentCourseNavbar__title">
                    {tStudents("titles.courseDetail")}
                </TypographyHeader>
            </Box>
            <ButtonEdit
                variant="outlined"
                startIcon={<EditOutlined data-testid="StudentCourseNavbar__btnEdit__icon" />}
                onClick={onOpen}
                data-testid="StudentCourseNavbar__btnEdit"
            >
                {t("ra.common.action.edit")}
            </ButtonEdit>
        </Box>
    );
};

export default StudentCourseNavbar;
