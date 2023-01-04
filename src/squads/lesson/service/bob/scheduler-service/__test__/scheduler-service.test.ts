import { Lesson_SchedulerBySchedulerIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { schedulerService } from "src/squads/lesson/service/bob/scheduler-service/scheduler-service";
import { mockWeeklyRecurringScheduler } from "src/squads/lesson/test-utils/lesson-management";

import schedulerQueriesBob from "src/squads/lesson/service/bob/scheduler-service/scheduler-bob.query";

jest.mock("src/squads/lesson/service/bob/scheduler-service/scheduler-bob.query", () => {
    return {
        __esModule: true,
        default: {
            schedulerGetOne: jest.fn(),
        },
    };
});

describe("schedulerService", () => {
    it("should get one scheduler", async () => {
        const variables: Lesson_SchedulerBySchedulerIdQueryVariables = {
            scheduler_id: "scheduler ID 1",
        };

        (schedulerQueriesBob.schedulerGetOne as jest.Mock).mockResolvedValue(
            mockWeeklyRecurringScheduler
        );
        const response = await schedulerService.query.schedulerGetOne(variables);

        expect(schedulerQueriesBob.schedulerGetOne).toBeCalledWith(variables);
        expect(response).toEqual(mockWeeklyRecurringScheduler);
    });

    it("should not get one scheduler with invalid parameter", async () => {
        const variables = {
            scheduler_id: undefined,
        };

        (schedulerQueriesBob.schedulerGetOne as jest.Mock).mockResolvedValue(
            mockWeeklyRecurringScheduler
        );

        await expect(async () => {
            await schedulerService.query.schedulerGetOne(variables);
        }).rejects.toMatchObject({
            action: "schedulerGetOne",
            name: "InvalidParamError",
            errors: [{ field: "scheduler_id" }],
            serviceName: "bobGraphQL",
        });

        expect(schedulerQueriesBob.schedulerGetOne).not.toBeCalled();
    });
});
