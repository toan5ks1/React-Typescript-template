import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types";

import { useTheme } from "@mui/material/styles";
import DoubleDash from "src/components/DoubleDash";
import { TableBase } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface StudentCourseTableProps {
    dataSource: StudentPackageClientWithLocation[];
    loading: boolean;
}

const useColumns = () => {
    const theme = useTheme();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    return useMemo(() => {
        return [
            {
                key: "colCourseName",
                title: tStudents("labels.name"),
                render: (record: StudentPackageClientWithLocation) => {
                    return (
                        <TypographyShortenStr
                            variant="body2"
                            data-testid="StudentCourseTable__name"
                            maxLength={60}
                        >
                            {record?.course.name}
                        </TypographyShortenStr>
                    );
                },
                cellProps: {
                    style: {
                        width: "100%",
                    },
                },
            },
            {
                key: "location",
                title: tStudents("labels.location"),
                render: (record: StudentPackageClientWithLocation) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentCourseTable__location"
                            data-value={record?.location?.location_id}
                        >
                            {record?.location?.name}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        minWidth: theme.spacing(25),
                    },
                },
            },
            {
                key: "class",
                title: tStudents("labels.class"),
                render: (record: StudentPackageClientWithLocation) => {
                    const courseClass = record?.class?.name;
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentCourseTable__class"
                            data-value={record?.class?.class_id}
                        >
                            {courseClass || <DoubleDash />}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        minWidth: theme.spacing(25),
                    },
                },
            },
            {
                key: "startDate",
                title: tStudents("labels.startDate"),
                render: (record: StudentPackageClientWithLocation) => {
                    return (
                        <TypographyBase variant="body2" data-testid="StudentCourseTable__startDate">
                            {formatDate(record?.start, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        minWidth: theme.spacing(16.3),
                    },
                },
            },
            {
                key: "colCourseEndDate",
                title: tStudents("labels.endDate"),
                render: (record: StudentPackageClientWithLocation) => {
                    return (
                        <TypographyBase variant="body2" data-testid="StudentCourseTable__endDate">
                            {formatDate(record?.end, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        minWidth: theme.spacing(16.3),
                    },
                },
            },
        ];
    }, [tStudents, theme]);
};

export const StudentCourseTable = ({ dataSource, loading }: StudentCourseTableProps) => {
    const theme = useTheme();

    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "StudentCourseTable",
            }}
            data={dataSource}
            columns={columns}
            withIndex={true}
            body={{
                loading,
                rowKey: "course.course_id",
                skeCount: 3,
            }}
            styleIndexCol={{ minWidth: theme.spacing(7.5) }}
        />
    );
};

export default StudentCourseTable;
