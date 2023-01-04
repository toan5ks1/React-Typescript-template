import { LessonHour } from "src/squads/timesheet/common/types";
import {
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonListByLessonIdsQuery,
} from "src/squads/timesheet/service/timesheet/timesheet-types";

export const mockTimesheetLessonHours: Required<
    Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"]
> = [
    {
        timesheet_id: "timesheet_0",
        lesson_id: "lesson_0",
    },
];

export const mockLessons: Required<Timesheet_LessonListByLessonIdsQuery["lessons"]> = [
    {
        lesson_id: "lesson_0",
        start_time: "2215-04-09T10:00:00+00:00",
        end_time: "2215-04-09T12:00:00+00:00",
        scheduling_status: "LESSON_SCHEDULING_STATUS_PUBLISHED",
        teaching_method: "LESSON_TEACHING_METHOD_GROUP",
    },
];

export const mockLessonHours: Required<LessonHour[]> = [
    {
        timesheet_id: "timesheet_0",
        lesson_id: "lesson_0",
        start_time: "2215-04-09T10:00:00+00:00",
        end_time: "2215-04-09T12:00:00+00:00",
        scheduling_status: "LESSON_SCHEDULING_STATUS_PUBLISHED",
        teaching_method: "LESSON_TEACHING_METHOD_GROUP",
    },
];
