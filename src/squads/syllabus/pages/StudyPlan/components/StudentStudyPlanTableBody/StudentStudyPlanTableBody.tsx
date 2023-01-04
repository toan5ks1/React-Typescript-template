import { Fragment } from "react";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DoubleDash from "src/components/DoubleDash";
import { TableBorderStyle, TableColumn } from "src/components/Table";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableBaseRow from "src/components/Table/TableBaseRow";
import { calcBorderRightBottomTable, getBorder } from "src/components/Table/utils";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import { StudentStudyPlanInfo, StudyPlanListByStudent } from "../../common/types";

export interface StudentStudyPlanTableBodyProps {
    columns: TableColumn<StudentStudyPlanInfo>[];
    data: StudyPlanListByStudent[];
    rowKey: string;
}

const renderCells = ({
    studyPlan,
    columns,
    border,
    dataIndex,
}: {
    studyPlan: StudentStudyPlanInfo;
    columns: TableColumn[];
    border: Parameters<typeof calcBorderRightBottomTable>[0];
    dataIndex: number;
}) =>
    columns.map((column, columnIndex) => (
        <TableBaseCell
            key={column.key}
            {...column.cellProps}
            border={border}
            maxColumnIndex={columns.length - 1}
            columnIndex={columnIndex}
        >
            {studyPlan ? column.render?.(studyPlan, dataIndex) : <DoubleDash />}
        </TableBaseCell>
    ));

const StudentStudyPlanTableBody = (props: StudentStudyPlanTableBodyProps) => {
    const { columns, data, rowKey } = props;
    const theme = useTheme();
    const baseProps = { columns, rowKey, border: getBorder(theme, TableBorderStyle.all) };

    return (
        <>
            {data.map(({ studentId, studentName, studyPlanList }) => (
                <Fragment key={studentId}>
                    <TableBaseRow
                        {...baseProps}
                        dataIndex={0}
                        record={studyPlanList[0]}
                        render={(columns) => (
                            <>
                                <TableBaseCell
                                    border={baseProps.border}
                                    rowSpan={studyPlanList.length || 1}
                                    style={{ verticalAlign: "top" }}
                                    {...columns[0].cellProps}
                                >
                                    <Box data-testid="StudentStudyPlanTableBody__studentName">
                                        <TypographyMaxLines maxLines={1} variant="body2">
                                            {studentName}
                                        </TypographyMaxLines>
                                    </Box>
                                </TableBaseCell>

                                {renderCells({
                                    studyPlan: studyPlanList[0],
                                    border: baseProps.border,
                                    columns: columns.slice(1),
                                    dataIndex: 0,
                                })}
                            </>
                        )}
                    />

                    {studyPlanList.slice(1).map((studyPlan, dataIndex) => (
                        <TableBaseRow
                            {...baseProps}
                            key={studyPlan.studyplanId}
                            dataIndex={dataIndex}
                            record={studyPlan}
                            render={(columns) =>
                                renderCells({
                                    studyPlan,
                                    border: baseProps.border,
                                    columns: columns.slice(1),
                                    dataIndex,
                                })
                            }
                        />
                    ))}
                </Fragment>
            ))}
        </>
    );
};

export default StudentStudyPlanTableBody;
