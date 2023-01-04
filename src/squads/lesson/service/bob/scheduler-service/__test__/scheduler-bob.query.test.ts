import { Lesson_SchedulerBySchedulerIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { mockWeeklyRecurringScheduler } from "src/squads/lesson/test-utils/lesson-management";

import schedulerQueriesBob from "src/squads/lesson/service/bob/scheduler-service/scheduler-bob.query";

describe("scheduler-bob.query", () => {
    it("getOne method", async () => {
        const variables: Lesson_SchedulerBySchedulerIdQueryVariables = {
            scheduler_id: "Scheduler ID 1",
        };

        const _callSpy = jest.spyOn(schedulerQueriesBob, "_call");
        _callSpy.mockResolvedValue({
            data: {
                scheduler: mockWeeklyRecurringScheduler,
            },
        });
        const result = await schedulerQueriesBob.schedulerGetOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockWeeklyRecurringScheduler[0]);
    });
});
