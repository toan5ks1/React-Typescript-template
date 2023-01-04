import { Entities, EurekaEntities, SearchEngine } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";

import { Box } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import { TableColumn } from "src/components/Table";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import { StudentStudyPlanInfo } from "../../common/types";

import useConvertGrade from "src/squads/syllabus/hooks/useConvertGrade";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    colStudentName: {
        width: "26.5%",
    },
    colStudyPlanName: {
        width: "26.5%",
    },
    colBookName: {
        width: "26.5%",
    },
    colGrade: {
        width: "20.5%",
    },
};

const useStudentStudyPlanTableColumns = (courseId: string) => {
    const tCourses = useResourceTranslate(Entities.COURSES);

    const searchUrl = `?${SearchEngine.COURSE_ID}=${courseId}`;

    const { convertGradeToString } = useConvertGrade();

    const columns: TableColumn<StudentStudyPlanInfo>[] = [
        {
            key: "colStudentName",
            title: tCourses("studyPlan.studentName"),
            cellProps: {
                sx: sx.colStudentName,
                "data-testid": "StudentStudyPlanTableColumns__studentName",
            },
        },
        {
            key: "colStudyPlanName",
            title: tCourses("studyPlan.studyPlanName"),
            cellProps: {
                sx: sx.colStudyPlanName,
                "data-testid": "StudentStudyPlanTableColumns__studyPlanName",
            },
            render: ({ studyplanId, name }) => (
                <StyledLink
                    to={`/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${studyplanId}/show${searchUrl}`}
                    data-testid="StudentStudyPlanTableBodyColumns__studyPlanName"
                >
                    <TypographyMaxLines maxLines={1} variant="body2">
                        {convertString(name)}
                    </TypographyMaxLines>
                </StyledLink>
            ),
        },
        {
            key: "colBookName",
            title: tCourses("studyPlan.bookAssociation"),
            cellProps: {
                sx: sx.colBookName,
                "data-testid": "StudentStudyPlanTableColumns__bookAssociation",
            },
            render: ({ bookName }) => (
                <Box data-testid="StudentStudyPlanTableBodyColumns__bookName">
                    {bookName ? (
                        <TypographyMaxLines maxLines={1} variant="body2">
                            {bookName}
                        </TypographyMaxLines>
                    ) : (
                        <DoubleDash />
                    )}
                </Box>
            ),
        },
        {
            key: "colGrade",
            title: tCourses("grade"),
            cellProps: {
                sx: sx.colGrade,
                "data-testid": "StudentStudyPlanTableColumns__grade",
            },
            render: ({ grades }) => (
                <Box data-testid="StudentStudyPlanTableBodyColumns__grades">
                    {arrayHasItem(grades) ? (
                        <TypographyMaxLines maxLines={1} variant="body2">
                            {convertGradeToString(grades)}
                        </TypographyMaxLines>
                    ) : (
                        <DoubleDash />
                    )}
                </Box>
            ),
        },
    ];

    return { columns };
};

export default useStudentStudyPlanTableColumns;
