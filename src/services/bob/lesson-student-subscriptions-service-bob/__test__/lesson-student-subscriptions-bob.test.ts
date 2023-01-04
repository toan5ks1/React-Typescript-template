import { StudentSubscriptionServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";

import lessonStudentSubscriptionsServiceBob from "../lesson-student-subscriptions-bob";
import { newRetrieveStudentSubscriptionRequest } from "../lesson-student-subscriptions-bob.request";
import { NsBobLessonStudentSubscriptionsService } from "../types";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.StudentSubscriptionServicePromiseClient.prototype.retrieveStudentSubscription =
        jest.fn();

    return actual;
});

const fakeModifierReturn = {
    toObject: jest.fn(),
};

const params: NsBobLessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest = {
    keyword: "Test key word",
    filter: {
        courseIdList: ["Course 1", "Course 2", "Course 3"],
        gradeList: ["Grade 1", "Grade 2", "Grade 3"],
        classIdList: [],
        locationIdList: [],
    },
    paging: {
        limit: 5,
        offsetInteger: 0,
        offsetString: "",
    },
};

const expectedParams = newRetrieveStudentSubscriptionRequest(params);

describe("lesson-student-subscriptions-bob unit test", () => {
    it("should submit lesson report", async () => {
        (
            StudentSubscriptionServicePromiseClient.prototype
                .retrieveStudentSubscription as jest.Mock
        ).mockImplementation((request) => {
            expect(request).toMatchObject(expectedParams);
            return fakeModifierReturn;
        });

        await lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription(params);

        expect(
            StudentSubscriptionServicePromiseClient.prototype.retrieveStudentSubscription
        ).toBeCalledWith(expectedParams);
    });
});
