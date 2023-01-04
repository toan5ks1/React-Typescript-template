import { useState } from "react";

import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    StudentAndDynamicLessonReportDetail,
    DynamicLabelValuesListWithStudentId,
    LessonReportBusinessRuleFieldIds,
    LessonForLessonReportQueried,
} from "src/squads/lesson/common/types";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { Box, Grid } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";
import DetailSectionReportHeaderInd from "src/squads/lesson/components/DetailSections/DetailSectionReportHeaderInd";
import DetailSectionReportInd from "src/squads/lesson/components/DetailSections/DetailSectionReportInd";
import ListStudent from "src/squads/lesson/components/Lists/ListStudent";

import { transformIntoDynamicLabelValueList } from "src/squads/lesson/common/helpers/mapData";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface TabLessonReportProps {
    isInLessonManagement?: boolean;
    lessonData: LessonForLessonReportQueried;
    isLoading: boolean;
    lessonReports: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>;
    onEditLessonReport: () => void;
    onDeleteSuccess?: () => void;
}

const TabLessonReport = (props: TabLessonReportProps) => {
    const {
        // TODO: remove this variable and the deprecated modules
        isInLessonManagement = false,
        lessonData,
        lessonReports,
        isLoading,
        onEditLessonReport,
        onDeleteSuccess,
    } = props;

    const [selectedStudent, setSelectedStudent] = useState<
        ArrayElement<LessonForLessonReportQueried["lesson_members"]>
    >(lessonData.lesson_members[0]);

    const t = useTranslate();

    const studentsList: StudentAndDynamicLessonReportDetail[] = lessonData.lesson_members.map(
        (member) => {
            const { attendance_status, attendance_remark, user, course } = member;

            const dynamicLessonReportData = [
                {
                    field_id: LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS,
                    value: attendance_status || "",
                },
                {
                    field_id: LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK,
                    value: attendance_remark || "",
                },
            ];
            return { user, course, dynamicLessonReportData };
        }
    );

    const dynamicLabelValuesList: DynamicLabelValuesListWithStudentId[] =
        transformIntoDynamicLabelValueList(
            lessonReports.lesson_report_details,
            lessonReports.partner_form_config?.form_config_data
        );

    // merge dynamicField to Students List
    const studentsListWithDynamicLabelValue: StudentAndDynamicLessonReportDetail[] =
        studentsList.map((student) => {
            const currentStudentLessonReportDetail = dynamicLabelValuesList.find(
                (studentLessonReportDetail) =>
                    studentLessonReportDetail.studentId === student.user.user_id
            );
            student.dynamicLessonReportData = student.dynamicLessonReportData.concat(
                currentStudentLessonReportDetail?.dynamicLabelValues || []
            );

            return student;
        });

    const currentStudentLessonReport = studentsListWithDynamicLabelValue.find(
        (student) => student.user.user_id === selectedStudent.user.user_id
    );

    if (isLoading) return <CircularProgressBase />;

    return (
        <Box data-testid="TabLessonReport__container">
            {arrayHasItem(lessonData.lesson_members) && (
                <>
                    <Box pb={3}>
                        <DetailSectionReportHeaderInd
                            lessonReports={lessonReports}
                            onEdit={onEditLessonReport}
                            onDelete={() => onDeleteSuccess?.()}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <ListStudent
                                onSelect={setSelectedStudent}
                                students={lessonData.lesson_members}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            {currentStudentLessonReport ? (
                                <DetailSectionReportInd
                                    studentLessonReportData={currentStudentLessonReport}
                                    isInLessonManagement={isInLessonManagement}
                                    lessonReports={lessonReports}
                                />
                            ) : (
                                <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />
                            )}
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default TabLessonReport;
