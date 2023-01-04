import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { ArrayElement } from "src/common/constants/types";
import {
    LessonReportDetailOfStudentWithPreviousReport,
    DynamicSection,
} from "src/squads/lesson/common/types";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { Box, Grid } from "@mui/material";
import AlertBase from "src/components/Alerts/AlertBase";
import DividerDashed from "src/components/Divider/DividerDashed";
import DetailSectionReportGeneralInfoInd from "src/squads/lesson/components/DetailSections/DetailSectionReportGeneralInfoInd";
import DetailSectionReportInfoInd from "src/squads/lesson/components/DetailSections/DetailSectionReportInfoInd";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";

export interface DetailSectionReportContentIndProps {
    lessonReportDetailOfStudent: LessonReportDetailOfStudentWithPreviousReport;
    dataConfig: { sections: DynamicSection[] };
    hasGeneralInfo: boolean;
    reportId: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_report_id"];
    lessonId: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_id"];
}

const DetailSectionReportContentInd = (props: DetailSectionReportContentIndProps) => {
    const { dataConfig, lessonReportDetailOfStudent, hasGeneralInfo, reportId, lessonId } = props;
    const { dynamicLessonReportData, course, previousLessonReport, user } =
        lessonReportDetailOfStudent;
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const CourseSection = () => {
        if (!hasGeneralInfo) return <></>;

        if (!course)
            return (
                <Box mb={1}>
                    <AlertBase color="error" elevation={0} severity="error">
                        {tLessonManagement("errors.studentDoesNotBelongToAnyCourse")}
                    </AlertBase>
                </Box>
            );

        return <DetailSectionReportGeneralInfoInd courseInfo={course} />;
    };

    return (
        <>
            <CourseSection />

            {dataConfig.sections.map((section: DynamicSection, itemIndex: number) => {
                return (
                    <Grid container spacing={2} key={section.section_id}>
                        <Grid item xs={12}>
                            <DetailSectionReportInfoInd
                                fields={section.fields}
                                dynamicLessonReportData={dynamicLessonReportData}
                                previousLessonReport={previousLessonReport}
                                courseId={convertString(course?.course_id)}
                                studentId={user.user_id}
                                reportId={reportId}
                                lessonId={lessonId}
                            />
                        </Grid>
                        {!isLastItemInArray(itemIndex, dataConfig.sections.length) && (
                            <Grid item xs={12}>
                                <WrapperDividerSection>
                                    <DividerDashed />
                                </WrapperDividerSection>
                            </Grid>
                        )}
                    </Grid>
                );
            })}
        </>
    );
};

export default DetailSectionReportContentInd;
