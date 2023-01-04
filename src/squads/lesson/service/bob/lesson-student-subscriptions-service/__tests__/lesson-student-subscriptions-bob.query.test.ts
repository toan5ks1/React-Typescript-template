import { GetStudentCourseSubscriptionsRequestQuery } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import {
    queryGetStudentCourseSubscriptionsVariable,
    queryRetrieveStudentSubscriptionVariable,
    retrieveStudentSubscriptionReturn,
} from "src/squads/lesson/test-utils/lesson-management";

import { StudentSubscriptionServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";

import lessonStudentSubscriptionsServiceBob, {
    newGetStudentCourseSubscriptionsRequest,
    newRetrieveStudentSubscriptionRequest,
} from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-bob.query";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.StudentSubscriptionServicePromiseClient.prototype.retrieveStudentSubscription =
        jest.fn();

    actual.StudentSubscriptionServicePromiseClient.prototype.getStudentCourseSubscriptions =
        jest.fn();
    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => retrieveStudentSubscriptionReturn,
};

describe("lesson-student-subscriptions-bob.query", () => {
    it("should get students list by calling retrieveStudentSubscription", async () => {
        const params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest =
            queryRetrieveStudentSubscriptionVariable;
        (
            StudentSubscriptionServicePromiseClient.prototype
                .retrieveStudentSubscription as jest.Mock
        ).mockReturnValue(fakeReturn);

        const _callSpy = jest.spyOn(lessonStudentSubscriptionsServiceBob, "_call");
        await lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            StudentSubscriptionServicePromiseClient.prototype.retrieveStudentSubscription
        ).toBeCalledWith(newRetrieveStudentSubscriptionRequest(params));
    });

    it("should call getStudentCourseSubscriptions correctly", async () => {
        const params: GetStudentCourseSubscriptionsRequestQuery =
            queryGetStudentCourseSubscriptionsVariable;
        (
            StudentSubscriptionServicePromiseClient.prototype
                .getStudentCourseSubscriptions as jest.Mock
        ).mockReturnValue(fakeReturn);

        const _callSpy = jest.spyOn(lessonStudentSubscriptionsServiceBob, "_call");
        await lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            StudentSubscriptionServicePromiseClient.prototype.getStudentCourseSubscriptions
        ).toBeCalledWith(newGetStudentCourseSubscriptionsRequest(params));
    });
});
