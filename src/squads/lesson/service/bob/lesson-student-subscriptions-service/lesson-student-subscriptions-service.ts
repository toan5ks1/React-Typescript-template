import { GetStudentCourseSubscriptionsRequestQuery } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import lessonStudentSubscriptionsServiceBob from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-bob.query";

export const lessonStudentSubscriptionsService = defineService({
    query: {
        lessonStudentSubscriptionsRetrieveStudentSubscription: (
            data: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest
        ) => {
            if (!data?.paging) {
                throw new InvalidParamError({
                    action: "lessonStudentSubscriptionsRetrieveStudentSubscription",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "paging" }],
                });
            }

            return lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription(data);
        },
        lessonStudentSubscriptionsGetStudentCourseSubscription: (
            variable: GetStudentCourseSubscriptionsRequestQuery
        ) => {
            return lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions(variable);
        },
    },
});
