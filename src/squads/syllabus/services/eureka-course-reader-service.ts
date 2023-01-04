import { ListTopicsByStudyPlanRequest } from "manabuf/eureka/v1/course_reader_pb";

import { courseReaderEureka } from "./eureka/course-reader-eureka";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const eurekaCourseReaderService = defineService({
    query: {
        TOPIC_GET_LIST_BY_STUDY_PLAN: (params: Required<ListTopicsByStudyPlanRequest.AsObject>) => {
            const { studyPlanId, paging } = params;

            if (studyPlanId && paging) return courseReaderEureka.listTopicsByStudyPlan(params);
            return createEmptyResponse(undefined);
        },
    },
});
