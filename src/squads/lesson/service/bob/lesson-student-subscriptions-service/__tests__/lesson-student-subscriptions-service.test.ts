import { lessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-service";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import {
    queryRetrieveStudentSubscriptionVariable,
    retrieveStudentSubscriptionReturn,
    getStudentCourseSubscriptionsReturn,
    queryGetStudentCourseSubscriptionsVariable,
} from "src/squads/lesson/test-utils/lesson-management";

import lessonStudentSubscriptionsServiceBob from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-bob.query";

jest.mock(
    "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                retrieveStudentSubscription: jest.fn(),
                getStudentCourseSubscriptions: jest.fn(),
            },
        };
    }
);

describe("lesson-student-subscription-service test lessonStudentSubscriptionsRetrieveStudentSubscription", () => {
    beforeEach(() => {
        (
            lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription as jest.Mock
        ).mockResolvedValue(retrieveStudentSubscriptionReturn);
    });

    it("should return students list when calling lessonRetrieveLessonStudentSubscription function", async () => {
        const queryVariable: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest =
            queryRetrieveStudentSubscriptionVariable;

        const response =
            await lessonStudentSubscriptionsService.query.lessonStudentSubscriptionsRetrieveStudentSubscription(
                queryVariable
            );

        expect(lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(retrieveStudentSubscriptionReturn);
    });

    it("should not return students list when calling lessonRetrieveLessonStudentSubscription function with invalid param", async () => {
        const invalidQueryVariable: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest =
            {
                ...queryRetrieveStudentSubscriptionVariable,
                paging: undefined,
            };

        await expect(async () => {
            await lessonStudentSubscriptionsService.query.lessonStudentSubscriptionsRetrieveStudentSubscription(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            action: "lessonStudentSubscriptionsRetrieveStudentSubscription",
            serviceName: "bobGraphQL",
            errors: [{ field: "paging" }],
            name: "InvalidParamError",
        });
        expect(lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription).not.toBeCalled();
    });
});

describe("lesson-student-subscription-service test lessonStudentSubscriptionsGetStudentCourseSubscription", () => {
    beforeEach(() => {
        (
            lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions as jest.Mock
        ).mockResolvedValue(getStudentCourseSubscriptionsReturn);
    });

    it("should return correctly when calling lessonStudentSubscriptionsGetStudentCourseSubscription", async () => {
        const response =
            await lessonStudentSubscriptionsService.query.lessonStudentSubscriptionsGetStudentCourseSubscription(
                queryGetStudentCourseSubscriptionsVariable
            );

        expect(lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions).toBeCalledWith(
            queryGetStudentCourseSubscriptionsVariable
        );
        expect(response).toEqual(getStudentCourseSubscriptionsReturn);
    });
});
