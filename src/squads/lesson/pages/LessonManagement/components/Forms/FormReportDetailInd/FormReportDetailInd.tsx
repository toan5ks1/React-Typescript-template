import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { DynamicSection, PartnerFormConfigLatestQueried } from "src/squads/lesson/common/types";

import { Box, Grid } from "@mui/material";
import DividerBase from "src/components/Divider/DividerBase";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import DynamicFieldLessonReport from "src/squads/lesson/components/DynamicFields/DynamicFieldLessonReport";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";
import HeaderLessonReportWithAction from "src/squads/lesson/pages/LessonManagement/components/Headers/HeaderLessonReportWithAction";

import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";
import { LessonManagementReportsIndividualData } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormReportDetailIndProps {
    lessonId: LessonManagementReportsIndividualData["lessonId"];
    lessonReportId: LessonManagementReportsIndividualData["lessonReportId"];
    student: ArrayElement<LessonManagementReportsIndividualData["students"]>;
    reportIndex: number;
    configSections?: PartnerFormConfigLatestQueried["form_config_data"];
    isVisible?: boolean;
}

const FormReportDetailInd = (props: FormReportDetailIndProps) => {
    const { student, lessonId, reportIndex, configSections, isVisible, lessonReportId } = props;

    const displayMode = isVisible ? "block" : "none";

    return (
        <Box
            key={student.user.user_id}
            display={displayMode}
            data-testid={`FormReportDetailInd__formDetail.${reportIndex}`}
        >
            <PaperRoundedBorders>
                <Box px={3} py={2}>
                    <HeaderLessonReportWithAction title={student.user.name} actionsList={[]} />
                </Box>

                <DividerBase />

                <Box p={3}>
                    {arrayHasItem(configSections) &&
                        configSections.map((section: DynamicSection, index: number) => {
                            if (arrayHasItem(section.fields)) {
                                return (
                                    <Grid container item spacing={2} key={section.section_id}>
                                        <Grid item xs={12}>
                                            <DynamicFieldLessonReport
                                                student={student}
                                                lessonId={lessonId}
                                                fields={section.fields}
                                                reportIndex={reportIndex}
                                                lessonReportId={lessonReportId}
                                            />
                                        </Grid>

                                        {!isLastItemInArray(index, configSections.length) && (
                                            <Grid item xs={12}>
                                                <WrapperDividerSection>
                                                    <DividerDashed />
                                                </WrapperDividerSection>
                                            </Grid>
                                        )}
                                    </Grid>
                                );
                            }

                            return null;
                        })}
                </Box>
            </PaperRoundedBorders>
        </Box>
    );
};

export default FormReportDetailInd;
