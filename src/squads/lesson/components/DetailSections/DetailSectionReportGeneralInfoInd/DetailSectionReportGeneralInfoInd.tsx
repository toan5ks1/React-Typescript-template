import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { LessonMember } from "src/squads/lesson/common/types";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface DetailSectionReportGeneralInfoIndProps {
    courseInfo: NonNullable<LessonMember["course"]>;
}

const DetailSectionReportGeneralInfoInd = ({
    courseInfo,
}: DetailSectionReportGeneralInfoIndProps) => {
    const tLessonReport = useResourceTranslate(ERPModules.LESSON_REPORTS);
    return (
        <>
            <Box justifyContent="space-between">
                <Box mb={2}>
                    <TypographyBase variant="body2">{tLessonReport("generalInfo")}</TypographyBase>
                </Box>

                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <TypographyWithValue
                            variant="horizontal"
                            value={courseInfo.name}
                            label={tLessonReport("course")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TypographyWithValue
                            variant="horizontal"
                            value={convertString(courseInfo.subject)}
                            label={tLessonReport("subject")}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box my={3}>
                <DividerDashed />
            </Box>
        </>
    );
};

export default DetailSectionReportGeneralInfoInd;
