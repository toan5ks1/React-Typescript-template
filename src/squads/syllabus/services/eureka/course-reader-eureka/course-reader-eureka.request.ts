import { Paging } from "manabuf/common/v1/requests_pb";
import { ListTopicsByStudyPlanRequest } from "manabuf/eureka/v1/course_reader_pb";

export const createListTopicsByStudyPlanRequest = ({
    studyPlanId,
    paging: { limit, offsetInteger },
}: Required<ListTopicsByStudyPlanRequest.AsObject>) => {
    const request = new ListTopicsByStudyPlanRequest();
    const paging = new Paging();

    paging.setLimit(limit);
    paging.setOffsetInteger(offsetInteger);

    request.setStudyPlanId(studyPlanId);
    request.setPaging(paging);

    return request;
};
