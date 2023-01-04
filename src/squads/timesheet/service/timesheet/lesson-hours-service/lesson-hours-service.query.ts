import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";
import {
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonHoursByTimesheetIdsQueryVariables,
    Timesheet_LessonListByLessonIdsQuery,
    Timesheet_LessonListByLessonIdsQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";

const getLessonHoursListByTimesheetIds = gql`
    query Timesheet_LessonHoursByTimesheetIds($timesheet_ids: [String!] = []) {
        timesheet_lesson_hours(where: { timesheet_id: { _in: $timesheet_ids } }) {
            timesheet_id
            lesson_id
        }
    }
`;

const getLessonListByLessonIds = gql`
    query Timesheet_LessonListByLessonIds($lesson_ids: [String!] = []) {
        lessons(where: { lesson_id: { _in: $lesson_ids } }) {
            lesson_id
            start_time
            end_time
            scheduling_status
            teaching_method
        }
    }
`;

class LessonHoursQuery extends InheritedHasuraServiceClient {
    async getLessonHoursList(
        variables: Timesheet_LessonHoursByTimesheetIdsQueryVariables
    ): Promise<Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"] | undefined> {
        const response = await this._call<Timesheet_LessonHoursByTimesheetIdsQuery>({
            query: getLessonHoursListByTimesheetIds,
            variables,
        });
        return response.data?.timesheet_lesson_hours;
    }

    async getLessonListByLessonIds(
        variables: Timesheet_LessonListByLessonIdsQueryVariables
    ): Promise<Timesheet_LessonListByLessonIdsQuery["lessons"] | undefined> {
        const response = await this._call<Timesheet_LessonListByLessonIdsQuery>({
            query: getLessonListByLessonIds,
            variables,
        });
        return response.data?.lessons;
    }
}

const lessonHoursQueries = new LessonHoursQuery(appConfigs, "timesheetGraphQL", doQuery);

export default lessonHoursQueries;
