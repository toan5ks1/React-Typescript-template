import { useMemo } from "react";

import { Entities, ERPModules } from "src/common/constants/enum";
import { getPrimaryKey } from "src/common/helpers/helpers";
import { MicroFrontendTypes } from "src/routing/type";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { TimesheetListDataV2 } from "src/squads/timesheet/common/types";
import { formatLongDate, formatTimeLength } from "src/squads/timesheet/common/utils/time";

import Paper from "@mui/material/Paper";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import WrapperLookingFor from "src/components/Wrappers/WrapperLookingFor";
import ChipTimesheetStatus from "src/squads/timesheet/modules/timesheet-list/components/ChipTimesheetStatus";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface StaffTimesheetListTableProp {
    data: TimesheetListDataV2;
    pagination: PaginationWithTotal;
    isFetching: boolean;
}

type TimesheetListColumnTypes = TableColumn<ArrayElement<TimesheetListDataV2>>;

const StaffTimesheetListTable = ({ data, pagination, isFetching }: StaffTimesheetListTableProp) => {
    const t = useTranslate();
    const tTimesheetManagement = useResourceTranslate(Entities.TIMESHEET_MANAGEMENT);
    const rowKey = getPrimaryKey(Entities.TIMESHEET_MANAGEMENT);

    const columns: TimesheetListColumnTypes[] = useMemo(() => {
        return [
            {
                key: "date",
                title: tTimesheetManagement("labels.date"),
                render: (record) => (
                    <StyledLink
                        data-testid="StaffTimesheetListTable__timesheetDate"
                        to={`/${MicroFrontendTypes.TIMESHEET}/${ERPModules.TIMESHEET_MANAGEMENT}/${record.timesheet_id}/show`}
                    >
                        {formatLongDate(record.timesheet_date)}
                    </StyledLink>
                ),
            },
            {
                key: "timesheetStatus",
                title: tTimesheetManagement("labels.status"),
                render: (record) => (
                    <ChipTimesheetStatus
                        data-testid="StaffTimesheetListTable__timesheetStatus"
                        status={record.timesheet_status}
                    />
                ),
            },
            {
                key: "location",
                title: tTimesheetManagement("labels.location"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="StaffTimesheetListTable__timesheetLocation"
                    >
                        {convertString(record?.location_name)}
                    </TypographyMaxLines>
                ),
            },
            {
                key: "numberOfLessons",
                title: tTimesheetManagement("labels.numberOfLessons"),
                render: (record) =>
                    record?.number_of_lessons ? (
                        <TypographyMaxLines
                            maxLines={2}
                            variant="body2"
                            data-testid="StaffTimesheetListTable__numberOfLessons"
                        >
                            {convertString(`${record?.number_of_lessons}`)}
                        </TypographyMaxLines>
                    ) : (
                        <DoubleDash />
                    ),
            },
            {
                key: "lessonHours",
                title: tTimesheetManagement("labels.lessonHours"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="StaffTimesheetListTable__lessonHours"
                    >
                        {formatTimeLength(record.total_lesson_hours || 0)}
                    </TypographyMaxLines>
                ),
            },
            {
                key: "otherWorkingHours",
                title: tTimesheetManagement("labels.otherWorkingHours"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="StaffTimesheetListTable__otherWorkingHours"
                    >
                        {formatTimeLength(record.total_hour || 0)}
                    </TypographyMaxLines>
                ),
            },
        ];
    }, [tTimesheetManagement]);

    return (
        <WrapperLookingFor
            variant={!isFetching && data.length < 1 ? "empty-icon" : "result"}
            content={t("resources.common.noResult")}
            helperText={t("resources.common.noResultSearchAndFilter")}
            height="page"
        >
            <TableBase
                component={Paper}
                body={{
                    rowKey,
                    loading: isFetching,
                    pagination,
                }}
                footer={{
                    pagination,
                }}
                withIndex
                data={data}
                columns={columns}
                tableProps={{
                    "data-testid": "StaffTimesheetList__table",
                }}
            />
        </WrapperLookingFor>
    );
};

export default StaffTimesheetListTable;
