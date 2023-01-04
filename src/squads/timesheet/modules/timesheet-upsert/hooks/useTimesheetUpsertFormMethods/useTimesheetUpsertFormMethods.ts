import { useForm, UseFormReturn } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import {
    TimesheetKeys,
    WORKING_TYPES_CONFIG_KEY,
} from "src/squads/timesheet/common/constants/timesheet";
import { TimesheetInformation, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { formatDate } from "src/squads/timesheet/common/utils/time";

import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";

const useTimesheetUpsertFormMethods = (
    timesheet?: TimesheetInformation,
    mode?: ModeOpenDialog
): UseFormReturn<UpsertTimesheetFormProps> => {
    const { data: timesheetConfigs } = useTimesheetConfigs(WORKING_TYPES_CONFIG_KEY);
    const methods = useForm<UpsertTimesheetFormProps>({
        defaultValues:
            mode === ModeOpenDialog.EDIT
                ? {
                      timesheetId: timesheet?.timesheet_id,
                      timesheetDate: timesheet?.timesheet_date,
                      staff: {
                          id: timesheet?.staff_id,
                          name: timesheet?.staff_name,
                          email: timesheet?.staff_email,
                      },
                      location: {
                          id: timesheet?.location_id,
                          value: timesheet?.location_name,
                      },
                      remark: timesheet?.remark,
                      [TimesheetKeys.OTHER_WORKING_HOURS]: timesheet?.other_working_hours?.map(
                          (item) => ({
                              ...item,
                              startTimeAutocomplete: {
                                  label: formatDate(item.start_time, "HH:mm"),
                                  value: new Date(item.start_time),
                              },
                              endTimeAutocomplete: {
                                  label: formatDate(item.end_time, "HH:mm"),
                                  value: new Date(item.end_time),
                              },
                              workingTypeAutocomplete: timesheetConfigs?.find(
                                  (config) =>
                                      config.timesheet_config_id === item.timesheet_config_id
                              ),
                          })
                      ),
                  }
                : {
                      timesheetDate: null,
                      [TimesheetKeys.OTHER_WORKING_HOURS]: [],
                  },
    });
    return methods;
};

export default useTimesheetUpsertFormMethods;
