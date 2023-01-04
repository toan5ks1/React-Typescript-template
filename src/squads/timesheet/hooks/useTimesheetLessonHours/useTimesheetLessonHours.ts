import { useMemo } from "react";

import { handleUnknownError } from "src/common/utils/error";
import { LessonHour } from "src/squads/timesheet/common/types";
import { arrayHasItem } from "src/squads/timesheet/common/utils/other";
import { inferQuery } from "src/squads/timesheet/service/infer-service";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface useTimesheetLessonHoursReturn {
    data: LessonHour[];
    isLoading: boolean;
    refetch: () => void;
}

export interface useTimesheetLessonHoursProps {
    timesheetIds: string[];
}

export default function useTimesheetLessonHours({
    timesheetIds,
}: useTimesheetLessonHoursProps): useTimesheetLessonHoursReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const {
        data: timesheetLessonHours,
        isFetching: isTimesheetLessonHoursLoading,
        refetch,
    } = inferQuery({
        entity: "lessonHours",
        action: "timesheetLessonHoursGetManyReference",
    })(
        {
            filter: {
                timesheet_ids: timesheetIds,
            },
        },
        {
            enabled: arrayHasItem(timesheetIds),
            onError(err) {
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const lessonIds = useMemo(
        () => timesheetLessonHours?.map((item) => item.lesson_id) || [],
        [timesheetLessonHours]
    );

    const { data: lessons, isFetching: isLessonsLoading } = inferQuery({
        entity: "lessonHours",
        action: "timesheetLessonsGetManyReference",
    })(
        {
            filter: {
                lesson_ids: lessonIds,
            },
        },
        {
            enabled: arrayHasItem(lessonIds),
            onError(err) {
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    const result = useMemo(
        () =>
            timesheetLessonHours?.map<LessonHour>((timesheetLessonHour) => {
                const lesson = lessons?.find(
                    ({ lesson_id }) => lesson_id === timesheetLessonHour.lesson_id
                );
                return {
                    ...lesson,
                    timesheet_id: timesheetLessonHour.timesheet_id,
                    lesson_id: timesheetLessonHour.lesson_id,
                };
            }) || [],
        [lessons, timesheetLessonHours]
    );

    return {
        data: result,
        isLoading: isTimesheetLessonHoursLoading || isLessonsLoading,
        refetch,
    };
}
