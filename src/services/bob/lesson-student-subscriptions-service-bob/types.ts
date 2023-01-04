import {
    RetrieveStudentSubscriptionRequest,
    RetrieveStudentSubscriptionResponse,
    GetStudentCourseSubscriptionsResponse,
    GetStudentCourseSubscriptionsRequest,
} from "manabuf/bob/v1/lessons_pb";

export declare namespace NsBobLessonStudentSubscriptionsService {
    export interface RetrieveStudentSubscriptionRequest
        extends RetrieveStudentSubscriptionRequest.AsObject {}

    export interface RetrieveStudentSubscriptionResponse
        extends RetrieveStudentSubscriptionResponse.AsObject {}

    export interface GetStudentCourseSubscriptionsResponse
        extends GetStudentCourseSubscriptionsResponse.AsObject {}
}

export type GetStudentCourseSubscriptionsRequestQuery =
    Array<GetStudentCourseSubscriptionsRequest.StudentCourseSubscription.AsObject>;
