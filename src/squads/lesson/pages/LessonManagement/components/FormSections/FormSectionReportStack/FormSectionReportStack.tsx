import { useMemo } from "react";

import { ArrayElement } from "src/common/constants/types";
import { PartnerFormConfigLatestQueried } from "src/squads/lesson/common/types";

import { Box } from "@mui/material";
import FormReportDetailInd from "src/squads/lesson/pages/LessonManagement/components/Forms/FormReportDetailInd";

import { LessonManagementReportsIndividualData } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormSectionReportStackProps {
    lessonId: LessonManagementReportsIndividualData["lessonId"];
    lessonReportId: LessonManagementReportsIndividualData["lessonReportId"];
    students: LessonManagementReportsIndividualData["students"];
    selectedStudent: ArrayElement<LessonManagementReportsIndividualData["students"]>;
    partnerFormConfig: PartnerFormConfigLatestQueried;
}

const FormSectionReportStack = (props: FormSectionReportStackProps) => {
    const { students, selectedStudent, partnerFormConfig, lessonId, lessonReportId } = props;

    const sectionsConfig = partnerFormConfig?.form_config_data?.sections;

    const lessonReportDetailPages = useMemo(() => {
        const pages = students.map((student, index) => {
            const isPageVisible = selectedStudent.user.user_id === student.user.user_id;

            return (
                <FormReportDetailInd
                    student={student}
                    reportIndex={index}
                    lessonId={lessonId}
                    isVisible={isPageVisible}
                    key={student.user.user_id}
                    lessonReportId={lessonReportId}
                    configSections={sectionsConfig}
                />
            );
        });

        return pages;
    }, [lessonId, lessonReportId, sectionsConfig, selectedStudent, students]);

    return <Box>{lessonReportDetailPages}</Box>;
};

export default FormSectionReportStack;
