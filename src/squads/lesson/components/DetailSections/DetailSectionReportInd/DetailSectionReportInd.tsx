import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { LessonReportDetailOfStudentWithPreviousReport } from "src/squads/lesson/common/types";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { Box } from "@mui/material";
import DividerBase from "src/components/Divider/DividerBase";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyBase from "src/components/Typographys/TypographyBase";
import DetailSectionReportContentInd from "src/squads/lesson/components/DetailSections/DetailSectionReportContentInd";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface DetailSectionReportIndProps {
    studentLessonReportData: LessonReportDetailOfStudentWithPreviousReport;
    isInLessonManagement: boolean;
    lessonReports: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>;
}

const DetailSectionReportInd = (props: DetailSectionReportIndProps) => {
    const { studentLessonReportData, isInLessonManagement, lessonReports } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <PaperRoundedBorders>
            <Box p={3}>
                <TypographyBase variant="subtitle1">
                    {studentLessonReportData.user.name}
                </TypographyBase>
            </Box>
            <DividerBase />
            <Box p={3}>
                {lessonReports.partner_form_config ? (
                    <DetailSectionReportContentInd
                        lessonReportDetailOfStudent={studentLessonReportData}
                        dataConfig={lessonReports.partner_form_config.form_config_data}
                        hasGeneralInfo={!isInLessonManagement}
                        reportId={lessonReports.lesson_report_id}
                        lessonId={lessonReports.lesson_id}
                    />
                ) : (
                    <TypographyBase>
                        {tLessonManagement("errors.errorWhileFetchingFormConfig", {
                            message: tLessonManagement("errors.canNotGetPartnerFormConfig"),
                        })}
                    </TypographyBase>
                )}
            </Box>
        </PaperRoundedBorders>
    );
};

export default DetailSectionReportInd;
