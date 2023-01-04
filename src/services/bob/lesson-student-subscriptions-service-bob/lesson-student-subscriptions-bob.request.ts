import { paramsInvalidErr } from "src/internals/errors";
import { toBasicPagingProto } from "src/services/utils";

import {
    GetStudentCourseSubscriptionsRequest,
    RetrieveStudentSubscriptionFilter,
    RetrieveStudentSubscriptionRequest,
} from "manabuf/bob/v1/lessons_pb";

import {
    GetStudentCourseSubscriptionsRequestQuery,
    NsBobLessonStudentSubscriptionsService,
} from "./types";

export function newRetrieveStudentSubscriptionRequest(
    params: NsBobLessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest
) {
    const { keyword, paging, filter } = params;

    if (!paging) throw paramsInvalidErr;

    const req = new RetrieveStudentSubscriptionRequest();

    const pagingPayload = toBasicPagingProto(paging);

    const filterPayload = new RetrieveStudentSubscriptionFilter();
    filterPayload.setCourseIdList(filter?.courseIdList || []);
    filterPayload.setGradeList(filter?.gradeList || []);

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
