import { ERPModules } from "src/common/constants/enum";

import { HistoryOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

const ButtonPreviousReportGroup = () => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <Box title={tLessonManagement("previousReport")}>
            <ButtonPrimaryOutlined
                startIcon={<HistoryOutlined />}
                fullWidth
                id="ButtonPreviousReportGroup__button"
                data-testid="ButtonPreviousReportGroup__button"
            >
                {tLessonManagement("previousReport")}
            </ButtonPrimaryOutlined>
        </Box>
    );
};

export default ButtonPreviousReportGroup;
