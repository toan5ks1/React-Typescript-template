import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";

import { Grid } from "@mui/material";
import StyledLink from "src/components/StyledLink";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import useConvertGrade from "src/squads/syllabus/hooks/useConvertGrade";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface StudyPlanInfoProps {
    bookId: string;
    bookName: string;
    grades: Array<number>;
    trackSchoolProgress: boolean;
}

// TODO: This page grid is adjusted with a different grid default
// to match with v4 material-ui grid. We can propose to change to v5 standard
const StudyPlanInfo = (props: StudyPlanInfoProps) => {
    const { bookId, bookName, grades, trackSchoolProgress } = props;
    const tCourses = useResourceTranslate(Entities.COURSES);
    const { convertGradeToString } = useConvertGrade();
    const safeGradeString = arrayHasItem(grades) ? convertGradeToString(grades) : "";

    return (
        <Grid container sx={{ width: "calc(100% + 40px)", margin: "-20px" }}>
            <Grid container item xs={6} p={2.5} sx={{ width: "calc(100% + 16px)", margin: "-8px" }}>
                <Grid item xs={4} p={1}>
                    <TypographyBase variant="body2" color="textSecondary">
                        {tCourses("book")}
                    </TypographyBase>
                </Grid>
                <Grid item xs={8} p={1}>
                    <StyledLink
                        to={`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`}
                        data-testid="StudyPlanInfo__bookLink"
                    >
                        <TypographyBase variant="body2" color="primary">
                            {bookName}
                        </TypographyBase>
                    </StyledLink>
                </Grid>
                <Grid item xs={4} p={1}>
                    <TypographyBase variant="body2" color="textSecondary">
                        {tCourses("studyPlan.trackSchoolProgress.title")}
                    </TypographyBase>
                </Grid>
                <Grid item xs={8} p={1}>
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="StudyPlanInfo__trackSchoolProgress"
                    >
                        {tCourses(`studyPlan.trackSchoolProgress.${trackSchoolProgress}`)}
                    </TypographyMaxLines>
                </Grid>
            </Grid>
            <Grid container item xs={6} p={2.5} sx={{ width: "calc(100% + 16px)", margin: "-8px" }}>
                <Grid item xs={4} p={1}>
                    <TypographyBase variant="body2" color="textSecondary">
                        {tCourses("grade")}
                    </TypographyBase>
                </Grid>
                <Grid item xs={8} p={1}>
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="StudyPlanInfo__grades"
                    >
                        {safeGradeString}
                    </TypographyMaxLines>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StudyPlanInfo;
