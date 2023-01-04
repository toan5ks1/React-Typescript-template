import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { StudentSubscriptionServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";

import {
    newGetStudentCourseSubscriptionsRequest,
    newRetrieveStudentSubscriptionRequest,
} from "./lesson-student-subscriptions-bob.request";
import {
    GetStudentCourseSubscriptionsRequestQuery,
    NsBobLessonStudentSubscriptionsService,
} from "./types";

class LessonStudentSubscriptionsBob extends InheritedGrpcServiceClient<StudentSubscriptionServicePromiseClient> {
    async retrieveStudentSubscription(
        params: NsBobLessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest
    ) {
        const request = newRetrieveStudentSubscriptionRequest(params);

        const response = await this._call("retrieveStudentSubscription", request);
        return {
            data: response.toObject(),
        };
    }
    // TODO: refactor for this ticket https://manabie.atlassian.net/browse/LT-9621.
    async getStudentCourseSubscriptions(params: GetStudentCourseSubscriptionsRequestQuery) {
        const request = newGetStudentCourseSubscriptionsRequest(params);

        const response = await this._call("getStudentCourseSubscriptions", request);

        return {
            data: response.toObject(),
        };
    }
}

const lessonStudentSubscriptionsServiceBob = new LessonStudentSubscriptionsBob(
    StudentSubscriptionServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonStudentSubscriptionsServiceBob;
