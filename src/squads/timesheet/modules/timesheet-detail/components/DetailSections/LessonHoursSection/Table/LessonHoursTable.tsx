import { useMemo } from "react";

import { Entities, ERPModules } from "src/common/constants/enum";
import { getPrimaryKey } from "src/common/helpers/helpers";
import { MicroFrontendTypes } from "src/routing/type";
import { LessonHour } from "src/squads/timesheet/common/types";
import {
    formatTimeLength,
    formatTimeRange,
    getDurationInMinute,
} from "src/squads/timesheet/common/utils/time";

import Paper from "@mui/material/Paper";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import ChipLessonStatus from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections/LessonHoursSection/ChipLessonStatus";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface LessonHoursTableProps {
    dataSource: LessonHour[];
    loading: boolean;
}

const PREFIX = "LessonHoursTable";

type LessonHoursColumnTypes = TableColumn<LessonHour>;

const LessonHoursTable = ({ dataSource, loading }: LessonHoursTableProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const rowKey = getPrimaryKey(Entities.TIMESHEET_MANAGEMENT);
    const columns = useMemo<LessonHoursColumnTypes[]>(() => {
        return [
            {
                key: "timeRange",
                title: tTimesheetManagement("labels.timeRange"),
                render: (record) => (
                    <StyledLink
                        data-testid={`${PREFIX}__timeRange`}
                        to={`/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}/${record.lesson_id}/show`}
                    >
                        {formatTimeRange(record.start_time, record.end_time, "HH:mm")}
                    </StyledLink>
                ),
                cellProps: {
                    style: {
                        width: "25%",
                    },
                },
            },
            {
                key: "status",
                title: tTimesheetManagement("labels.status"),
                render: (record) =>
                    record.scheduling_status ? (
                        <ChipLessonStatus
                            data-testid={`${PREFIX}__status`}
                            status={record.scheduling_status}
                        />
                    ) : (
                        <DoubleDash />
                    ),
                cellProps: {
                    style: {
                        width: "25%",
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
                        {formatTimeLength(getDurationInMinute(record.start_time, record.end_time))}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "25%",
                    },
                },
            },
            {
                key: "type",
                title: tTimesheetManagement("labels.type"),
                render: (record) =>
                    record.teaching_method ? (
                        <TypographyMaxLines
                            maxLines={2}
                            variant="body2"
                            data-testid={`${PREFIX}__type`}
                        >
                            {tTimesheetManagement(`lessonType.${record.teaching_method}`)}
                        </TypographyMaxLines>
                    ) : (
                        <DoubleDash />
                    ),
                cellProps: {
                    style: {
                        width: "25%",
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

export default LessonHoursTable;
