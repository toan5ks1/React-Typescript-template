import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { OtherWorkingHour } from "src/squads/timesheet/common/types";

import { TableColumn } from "src/components/Table/TableBase";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";
import RemarksColumn from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/OtherWorkingHoursFormSection/OtherWorkingHoursUpsertTable/RemarksColumn";
import TimeRangeColumn from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/OtherWorkingHoursFormSection/OtherWorkingHoursUpsertTable/TimeRangeColumn";
import TotalHourColumn from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/OtherWorkingHoursFormSection/OtherWorkingHoursUpsertTable/TotalHourColumn";
import WorkingTypeColumn from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/OtherWorkingHoursFormSection/OtherWorkingHoursUpsertTable/WorkingTypeColumn";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useOtherWorkingHourFormValidation from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation";

interface OtherWorkingHoursUpsertTableProps {
    otherWorkingHours: OtherWorkingHour[];
    onSelect: (v: OtherWorkingHour[]) => void;
    listSelectedItems?: OtherWorkingHour[];
}

const PREFIX = "OtherWorkingHoursUpsertTable";

type OtherWorkingHoursFormColumnTypes = TableColumn<OtherWorkingHour>;

const OtherWorkingHoursUpsertTable = (props: OtherWorkingHoursUpsertTableProps) => {
    const { otherWorkingHours, onSelect, listSelectedItems } = props;
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const { validate } = useOtherWorkingHourFormValidation();

    const columns = useMemo<OtherWorkingHoursFormColumnTypes[]>(() => {
        return [
            {
                key: "workingType",
                title: tTimesheetManagement("labels.workingType"),
                render: (record, index) => (
                    <WorkingTypeColumn record={record} index={index} validate={validate} />
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
                render: (record, index) => (
                    <TimeRangeColumn record={record} index={index} validate={validate} />
                ),
                cellProps: {
                    style: {
                        width: "30%",
                    },
                },
            },
            {
                key: "totalHours",
                title: tTimesheetManagement("labels.totalHours"),
                render: (_record, index) => <TotalHourColumn index={index} />,
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
            {
                key: "remarks",
                title: tTimesheetManagement("labels.remarks"),
                render: (_record, index) => <RemarksColumn index={index} />,
                cellProps: {
                    style: {
                        width: "40%",
                    },
                },
            },
        ];
    }, [tTimesheetManagement, validate]);

    return (
        <TableWithCheckbox
            tableProps={{
                "data-testid": PREFIX,
            }}
            data={otherWorkingHours}
            columns={columns}
            withIndex={{ width: "5%" }}
            body={{
                loading: false,
                rowKey: "id",
            }}
            onSelect={onSelect}
            listSelectedItems={listSelectedItems || []}
        />
    );
};

export default OtherWorkingHoursUpsertTable;
