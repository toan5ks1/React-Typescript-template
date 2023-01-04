import { useMemo } from "react";

import { Entities, ERPModules } from "src/common/constants/enum";
import { getPrimaryKey } from "src/common/helpers/helpers";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { OtherWorkingHourListData } from "src/squads/timesheet/common/types";
import { formatTimeLength, formatTimeRange } from "src/squads/timesheet/common/utils/time";

import Paper from "@mui/material/Paper";
import DoubleDash from "src/components/DoubleDash";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface OtherWorkingHourTableProps {
    dataSource: OtherWorkingHourListData;
    loading: boolean;
}

const PREFIX = "OtherWorkingHourTable";

type OtherWorkingHoursColumnTypes = TableColumn<ArrayElement<OtherWorkingHourListData>>;

const OtherWorkingHourTable = ({ dataSource, loading }: OtherWorkingHourTableProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const rowKey = getPrimaryKey(Entities.TIMESHEET_MANAGEMENT);
    const columns = useMemo<OtherWorkingHoursColumnTypes[]>(() => {
        return [
            {
                key: "workingType",
                title: tTimesheetManagement("labels.workingType"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid={`${PREFIX}__workingType`}
                    >
                        {convertString(record.working_type)}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "20%",
                    },
                },
            },
            {
                key: "timeRange",
                title: tTimesheetManagement("labels.timeRange"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid={`${PREFIX}__timeRange`}
                    >
                        {formatTimeRange(record.start_time, record.end_time, "HH:mm")}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "20%",
                    },
                },
            },
            {
                key: "totalHours",
                title: tTimesheetManagement("labels.totalHours"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid={`${PREFIX}__totalHours`}
                    >
                        {formatTimeLength(record.total_hour)}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "20%",
                    },
                },
            },
            {
                key: "remarks",
                title: tTimesheetManagement("labels.remarks"),
                render: (record) =>
                    record.remarks ? (
                        <TypographyMaxLines
                            maxLines={2}
                            variant="body2"
                            data-testid={`${PREFIX}__remarks`}
                        >
                            {convertString(record.remarks)}
                        </TypographyMaxLines>
                    ) : (
                        <DoubleDash />
                    ),
                cellProps: {
                    style: {
                        width: "40%",
                    },
                },
            },
        ];
    }, [tTimesheetManagement]);

    return (
        <TableBase
            component={Paper}
            body={{
                rowKey,
                loading,
            }}
            withIndex
            data={dataSource}
            columns={columns}
            tableProps={{
                "data-testid": `${PREFIX}__table`,
            }}
        ></TableBase>
    );
};

export default OtherWorkingHourTable;
