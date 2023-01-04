import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { GetStudentCourseSubscriptionsRequestQuery } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";
import { toBasicPagingProto } from "src/squads/lesson/service/utils";

import { StudentSubscriptionServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import {
    GetStudentCourseSubscriptionsRequest,
    RetrieveStudentSubscriptionFilter,
    RetrieveStudentSubscriptionRequest,
} from "manabuf/bob/v1/lessons_pb";

export function newRetrieveStudentSubscriptionRequest(
    params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest
) {
    const { keyword, paging, filter } = params;

    const req = new RetrieveStudentSubscriptionRequest();

    const pagingPayload = paging ? toBasicPagingProto(paging) : undefined;

    const filterPayload = new RetrieveStudentSubscriptionFilter();
    filterPayload.setCourseIdList(filter?.courseIdList || []);
    filterPayload.setGradeList(filter?.gradeList || []);
    filterPayload.setLocationIdList(filter?.locationIdList || []);
    filterPayload.setClassIdList(filter?.classIdList || []);

    req.setKeyword(keyword);
    req.setPaging(pagingPayload);
    req.setFilter(filterPayload);

    return req;
}

export function newGetStudentCourseSubscriptionsRequest(
    params: GetStudentCourseSubscriptionsRequestQuery
): GetStudentCourseSubscriptionsRequest {
    const req = new GetStudentCourseSubscriptionsRequest();

    const studentCourseSubscriptionsList: Array<GetStudentCourseSubscriptionsRequest.StudentCourseSubscription> =
        params.map((param) => {
            const studentCourseSubscription =
                new GetStudentCourseSubscriptionsRequest.StudentCourseSubscription();
            studentCourseSubscription.setCourseId(param.courseId);
            studentCourseSubscription.setStudentId(param.studentId);
            return studentCourseSubscription;
        });

    req.setSubscriptionsList(studentCourseSubscriptionsList);
    return req;
}

class LessonStudentSubscriptionsBob extends InheritedGrpcServiceClient<StudentSubscriptionServicePromiseClient> {
    async retrieveStudentSubscription(
        params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest
    ) {
        const request = newRetrieveStudentSubscriptionRequest(params);

        const response = await this._call("retrieveStudentSubscription", request);

        return response.toObject();
    }

    async getStudentCourseSubscriptions(params: GetStudentCourseSubscriptionsRequestQuery) {
        const request = newGetStudentCourseSubscriptionsRequest(params);

        const response = await this._call("getStudentCourseSubscriptions", request);

        return response.toObject();
    }
}

const lessonStudentSubscriptionsServiceBob = new LessonStudentSubscriptionsBob(
    StudentSubscriptionServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonStudentSubscriptionsServiceBob;
