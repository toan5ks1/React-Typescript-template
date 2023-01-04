import { ListQuery } from "src/squads/timesheet/service/service-types";
import {
    Timesheet_LessonHoursByTimesheetIdsQueryVariables,
    Timesheet_LessonListByLessonIdsQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";

import lessonHoursQueries from "./lesson-hours-service.query";

import { defineService } from "@manabie-com/react-utils";

const lessonHoursService = defineService({
    query: {
        timesheetLessonHoursGetManyReference: (
            variables: ListQuery<Timesheet_LessonHoursByTimesheetIdsQueryVariables>
        ) => {
            const { filter = { timesheet_ids: [] } } = variables;
            return lessonHoursQueries.getLessonHoursList(filter);
        },
        timesheetLessonsGetManyReference: (
            variables: ListQuery<Timesheet_LessonListByLessonIdsQueryVariables>
        ) => {
            const { filter = { lesson_ids: [] } } = variables;
            return lessonHoursQueries.getLessonListByLessonIds(filter);
        },
    },
});

export default lessonHoursService;
