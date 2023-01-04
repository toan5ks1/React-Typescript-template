import { memo, useEffect, useMemo } from "react";

import { EurekaEntities, SearchEngine } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";

import { useTheme } from "@mui/material/styles";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import { TableBase, TableColumn } from "src/components/Table";
import { withCellStyles } from "src/components/Table/utils";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import useGetCourseStudyplan, { CourseStudyplanTable } from "../../hooks/useGetCourseStudyplan";

import useConvertGrade from "src/squads/syllabus/hooks/useConvertGrade";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { StudyPlanStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import { StudyPlanFilter } from "src/squads/syllabus/pages/StudyPlan/common/types";

const sx = {
    colName: {
        width: "40%",
    },
    colBook: {
        width: "40%",
    },
};

export interface CourseStudyPlanTableProps {
    courseId: string;
    filter: StudyPlanFilter;
    keyword: string;
}

const CourseStudyPlanTable = (props: CourseStudyPlanTableProps) => {
    const { courseId, filter, keyword } = props;
    const tStudyPlan = useResourceTranslate(EurekaEntities.STUDY_PLANS);
    const { convertGradeToString } = useConvertGrade();

    const theme = useTheme();
    const searchUrl = `?${SearchEngine.COURSE_ID}=${courseId}`;

    const { isLoading, isFetching, data, pagination, resetPaginationOffset } =
        useGetCourseStudyplan({
            courseId,
            filter,
            searchText: keyword,
        });

    const dataWithCellStyles = useMemo(() => {
        return data.map((item) => {
            return withCellStyles(
                item,
                item.status !== StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE
                    ? {
                          backgroundColor: theme.palette.grey[100],
                          position: "unset",
                      }
                    : {}
            );
        });
    }, [data, theme.palette.grey]);

    const columns: TableColumn<CourseStudyplanTable>[] = [
        {
            key: "colName",
            title: tStudyPlan("studyPlanName"),
            cellProps: { sx: sx.colName },
            render: ({ studyplanId, name }) => (
                <StyledLink
                    to={`/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${studyplanId}/show${searchUrl}`}
                >
                    <TypographyShortenStr maxLength={60} variant="body2">
                        {convertString(name)}
                    </TypographyShortenStr>
                </StyledLink>
            ),
        },
        {
            key: "colBook",
            title: tStudyPlan("bookAssociation"),
            cellProps: {
                sx: sx.colBook,
            },
            dataIndex: "bookName",
            render: ({ bookName }) => {
                return (
                    <TypographyBase variant="body2" data-testid="CourseStudyPlanTable__bookCol">
                        {bookName ? bookName : <DoubleDash />}
                    </TypographyBase>
                );
            },
        },
        {
            key: "colGrade",
            title: tStudyPlan("grade"),
            render: ({ grades }) => {
                return (
                    <TypographyBase variant="body2" data-testid="CourseStudyPlanTable__gradeCol">
                        {arrayHasItem(grades) ? convertGradeToString(grades) : <DoubleDash />}
                    </TypographyBase>
                );
            },
        },
    ];

    useEffect(() => {
        resetPaginationOffset();
        // Only reset page when filter payload changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, JSON.stringify(filter)]);

    return (
        <TableBase
            data={dataWithCellStyles}
            columns={columns}
            body={{ loading: isLoading || isFetching, rowKey: "studyplanId" }}
            footer={{ pagination }}
            tableProps={{ "data-testid": "CourseStudyPlanTable" }}
        />
    );
};

export default memo(CourseStudyPlanTable);
