import { Lesson_SchedulerBySchedulerIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import schedulerQueriesBob from "src/squads/lesson/service/bob/scheduler-service/scheduler-bob.query";

export const schedulerService = defineService({
    query: {
        schedulerGetOne: ({
            scheduler_id,
        }: Partial<Lesson_SchedulerBySchedulerIdQueryVariables>) => {
            if (!scheduler_id) {
                throw new InvalidParamError({
                    action: "schedulerGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "scheduler_id" }],
                });
            }

            return schedulerQueriesBob.schedulerGetOne({ scheduler_id });
        },
    },
});
