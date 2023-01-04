import { useMemo } from "react";

import { TimesheetListDataV2 } from "src/squads/timesheet/common/types";
import { arrayHasItem } from "src/squads/timesheet/common/utils/other";
import { getDurationInMinute } from "src/squads/timesheet/common/utils/time";
import { inferQuery, inferQueryPagination } from "src/squads/timesheet/service/infer-service";
import { TimesheetListQueryV2Return } from "src/squads/timesheet/service/timesheet/timesheet-service";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetLessonHours from "src/squads/timesheet/hooks/useTimesheetLessonHours";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export type UseQueryTimesheetListReturn = {
    data: TimesheetListDataV2;
    isFetching: boolean;
    pagination: PaginationWithTotal;
    refetchTimesheetList: () => void;
    resetPaginationOffset: () => void;
};

function useQueryTimesheetList(staffId?: string): UseQueryTimesheetListReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        result: { refetch, isFetching: isTimesheetListFetching },
        data: timesheetListWithFilter,
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "timesheet",
        action: "timesheetGetListWithFilterV2",
    })<TimesheetListQueryV2Return>(
        {
            staff_id: staffId,
        },
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn(`fetch timesheet list error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const locationIdsList = useMemo(() => {
        return timesheetListWithFilter?.data?.map((itemsheetItem) => itemsheetItem.location_id);
    }, [timesheetListWithFilter]);

    const { data: timesheetLocationList, isFetching: isTimesheetLocationListFetching } = inferQuery(
        {
            entity: "location",
            action: "timesheetGetManyLocations",
        }
    )(
        {
            filter: {
                location_ids: locationIdsList,
            },
        },
        {
            enabled: arrayHasItem(locationIdsList),
            onError(error: Error) {
                window.warner?.warn(`fetch timesheet location list error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const timesheetIdsList = useMemo(() => {
        return timesheetListWithFilter?.data?.map((item) => item.timesheet_id) || [];
    }, [timesheetListWithFilter]);

    const { data: timesheetTotalHourList, isFetching: isTimesheetTotalHourListFetching } =
        inferQuery({
            entity: "otherWorkingHours",
            action: "timesheetOtherWorkingHoursTotalHourGetManyReference",
        })(
            {
                filter: {
                    timesheet_ids: timesheetIdsList,
                },
            },
            {
                enabled: arrayHasItem(timesheetIdsList),
                onError(error: Error) {
                    window.warner?.warn(`fetch timesheet total hours list error: `, error);
                    showSnackbar(
                        `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                        "error"
                    );
                },
            }
        );

    const { data: lessonHours, isLoading: isLessonHoursLoading } = useTimesheetLessonHours({
        timesheetIds: timesheetIdsList,
    });

    const staffIdsList = useMemo(() => {
        return timesheetListWithFilter?.data?.map((timesheetItem) => timesheetItem.staff_id);
    }, [timesheetListWithFilter]);

    const { data: staffList, isFetching: isStaffFetching } = inferQuery({
        entity: "staff",
        action: "timesheetGetManyStaff",
    })(
        {
            filter: {
                staff_ids: staffIdsList,
            },
        },
        {
            enabled: !staffId && arrayHasItem(staffIdsList),
            onError(error: Error) {
                window.warner?.warn(`fetch staff list error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const timesheetListData = useMemo<TimesheetListDataV2>(
        () =>
            timesheetListWithFilter?.data?.map((timesheetItem) => {
                const location_name = timesheetLocationList?.find(
                    (location) => location.location_id === timesheetItem.location_id
                )?.name;
                const staffData = staffId
                    ? undefined
                    : staffList?.find((staff) => staff.user_id === timesheetItem.staff_id);
                const staff_name = staffId ? undefined : staffData?.name || "";
                const staff_email = staffId ? undefined : staffData?.email || "";
                const total_hour = timesheetTotalHourList
                    ?.filter((item) => item.timesheet_id === timesheetItem.timesheet_id)
                    .map((item) => item.total_hour)
                    // sum total hours of each timesheet
                    .reduce((prev, current) => prev + current, 0);
                const lessons = lessonHours.filter(
                    ({ timesheet_id }) => timesheetItem.timesheet_id == timesheet_id
                );
                const number_of_lessons = lessons.length;
                const total_lesson_hours = lessons
                    .map(({ start_time, end_time }) => getDurationInMinute(start_time, end_time))
                    .reduce((prev, current) => prev + current, 0);
                return {
                    ...timesheetItem,
                    location_name,
                    staff_name,
                    staff_email,
                    total_hour,
                    number_of_lessons,
                    total_lesson_hours,
                };
            }) || [],
        [
            timesheetListWithFilter?.data,
            timesheetLocationList,
            staffId,
            staffList,
            timesheetTotalHourList,
            lessonHours,
        ]
    );

    return {
        data: timesheetListData || [],
        isFetching:
            isTimesheetListFetching ||
            isTimesheetLocationListFetching ||
            (!staffId && isStaffFetching) ||
            isLessonHoursLoading ||
            isTimesheetTotalHourListFetching,
        pagination,
        refetchTimesheetList: refetch,
        resetPaginationOffset,
    };
}

export default useQueryTimesheetList;
