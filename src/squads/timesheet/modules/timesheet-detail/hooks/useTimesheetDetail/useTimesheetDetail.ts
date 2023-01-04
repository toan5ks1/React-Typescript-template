import { isEmpty } from "lodash";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { WORKING_TYPES_CONFIG_KEY } from "src/squads/timesheet/common/constants/timesheet";
import { OtherWorkingHourListData, TimesheetInformation } from "src/squads/timesheet/common/types";
import { formatLongDate } from "src/squads/timesheet/common/utils/time";
import { isTeacher } from "src/squads/timesheet/internals/permission";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useTimesheetLessonHours from "src/squads/timesheet/hooks/useTimesheetLessonHours";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface UseTimesheetDetailReturn {
    data?: TimesheetInformation;
    isLoading: boolean;
    refetch: () => void;
}

export interface useTimesheetDetailProps {
    timesheetId: string;
    userProfile: UserIdentity;
}

export default function useTimesheetDetail({
    timesheetId,
    userProfile,
}: useTimesheetDetailProps): UseTimesheetDetailReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const isTeacherLogging = isTeacher(userProfile.userGroup);

    const {
        data: timesheetData,
        isFetching: isTimesheetLoading,
        refetch,
    } = inferQuery({
        entity: "timesheet",
        action: "timesheetGetTimesheetById",
    })(
        {
            filter: {
                timesheet_id: timesheetId,
            },
        },
        {
            enabled: true,
            selector: (timesheet) => {
                if (!isEmpty(timesheet)) {
                    return {
                        ...timesheet,
                        timesheet_date: formatLongDate(timesheet?.timesheet_date),
                    };
                }
            },
            onError: (error) => {
                window.warner?.warn(`fetch timesheet detail error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const { data: timesheetLocation, isFetching: isLocationLoading } = inferQuery({
        entity: "location",
        action: "timesheetGetLocationById",
    })(
        {
            filter: {
                location_id: convertString(timesheetData?.location_id),
            },
        },
        {
            enabled: !!timesheetData?.location_id,
            onError(error: Error) {
                window.warner?.warn(`fetch timesheet location error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const { data: timesheetConfigs, isFetching: isFetchingTimesheetConfigs } =
        useTimesheetConfigs(WORKING_TYPES_CONFIG_KEY);

    const {
        data: otherWorkingHours,
        isFetching: isOtherWorkingHoursLoading,
        refetch: refetchOWH,
    } = inferQuery({
        entity: "otherWorkingHours",
        action: "timesheetOtherWorkingHoursGetManyReference",
    })(
        {
            filter: {
                timesheet_id: timesheetId,
            },
        },
        {
            enabled: true,
            onError(error: Error) {
                window.warner?.warn(`fetch timesheet other working hours error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const otherWorkingHoursWithWorkingType: OtherWorkingHourListData =
        otherWorkingHours?.map((owh) => {
            return {
                ...owh,
                working_type: convertString(
                    timesheetConfigs?.find(
                        (config) => config.timesheet_config_id === owh.timesheet_config_id
                    )?.config_value
                ),
            };
        }) || [];

    const { data: lesson_hours, isLoading: isLessonHoursLoading } = useTimesheetLessonHours({
        timesheetIds: [timesheetId],
    });

    let timesheetDetailInfo: TimesheetInformation = {
        ...timesheetData,
        location_name: timesheetLocation?.name || "",
        staff_email: userProfile.email,
        staff_name: userProfile.name,
        other_working_hours: otherWorkingHoursWithWorkingType,
        lesson_hours,
    };
    let isStaffFetching: boolean = false;

    if (!isTeacherLogging) {
        const { data: timesheetStaff, isFetching } = inferQuery({
            entity: "staff",
            action: "timesheetGetStaffById",
        })(
            {
                filter: {
                    staff_id: timesheetData?.staff_id || "",
                },
            },
            {
                enabled: !!timesheetData?.staff_id,
                onError(error: Error) {
                    window.warner?.warn(`fetch staff error: `, error);
                    showSnackbar(
                        `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                        "error"
                    );
                },
            }
        );

        timesheetDetailInfo = {
            ...timesheetDetailInfo,
            staff_name: convertString(timesheetStaff?.name),
            staff_email: convertString(timesheetStaff?.email),
        };
        isStaffFetching = isFetching;
    }

    const refetchEntireTimesheet = async () => {
        void refetch();
        void refetchOWH();
    };

    return {
        data: timesheetDetailInfo,
        isLoading:
            isTimesheetLoading ||
            isLocationLoading ||
            isStaffFetching ||
            isOtherWorkingHoursLoading ||
            isFetchingTimesheetConfigs ||
            isLessonHoursLoading,
        refetch: refetchEntireTimesheet,
    };
}
