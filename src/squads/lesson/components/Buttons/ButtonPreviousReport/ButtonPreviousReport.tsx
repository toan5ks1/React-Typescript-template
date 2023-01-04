import { useMemo, useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { DynamicLabelValue } from "src/squads/lesson/common/types";

import { HistoryOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonPrimaryText, {
    ButtonPrimaryTextProps,
} from "src/components/Buttons/ButtonPrimaryText";
import DialogPreviousReportInd from "src/squads/lesson/components/Dialogs/DialogPreviousReportInd";

import { mapDataForPreviousReport } from "src/squads/lesson/common/helpers/mapData";
import useGetPartnerFormConfigById from "src/squads/lesson/hooks/useGetPartnerFormConfigById";
import usePreviousLessonReport from "src/squads/lesson/hooks/usePreviousLessonReport";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface ButtonPreviousReportProps extends ButtonPrimaryTextProps {
    studentId: string;
    courseId: string;
    reportId: string | null;
    lessonId: string;
}

const ButtonPreviousReport = (props: ButtonPreviousReportProps) => {
    const { studentId, courseId, reportId, lessonId } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { dynamicValues, attendanceValues, formConfigId } = usePreviousLessonReport({
        studentId,
        courseId,
        reportId,
        lessonId,
    });

    const { dataConfig } = useGetPartnerFormConfigById({ formConfigId });

    const previousLessonReportData = useMemo((): DynamicLabelValue[] => {
        if (!arrayHasItem(dataConfig) || !arrayHasItem(dynamicValues) || !attendanceValues)
            return [];

        return mapDataForPreviousReport(dataConfig, dynamicValues, attendanceValues);
    }, [attendanceValues, dataConfig, dynamicValues]);

    const handleCloseModal = () => {
        setOpenDialog(false);
    };

    const title = arrayHasItem(previousLessonReportData)
        ? "previousReport"
        : "studentDoesNotHavePreviousLessonReportForThisCourse";
    return (
        <Box title={tLessonManagement(title)}>
            <ButtonPrimaryText
                onClick={() => setOpenDialog(true)}
                startIcon={<HistoryOutlined />}
                fullWidth
                disabled={!arrayHasItem(previousLessonReportData)}
                id="ButtonPreviousReport__button"
                data-testid="ButtonPreviousReport__button"
            >
                {tLessonManagement("previousReport")}
            </ButtonPrimaryText>

            <DialogPreviousReportInd
                open={openDialog}
                onClose={handleCloseModal}
                onSave={handleCloseModal}
                previousLessonReportData={previousLessonReportData}
                previousLessonReportDataConfig={dataConfig}
            />
        </Box>
    );
};

export default ButtonPreviousReport;
