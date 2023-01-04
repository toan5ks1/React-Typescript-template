import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { CourseReaderServicePromiseClient } from "manabuf/eureka/v1/course_reader_grpc_web_pb";
import { ListTopicsByStudyPlanRequest } from "manabuf/eureka/v1/course_reader_pb";

import { createListTopicsByStudyPlanRequest } from "./course-reader-eureka.request";

class CourseReaderEureka extends InheritedGrpcServiceClient<CourseReaderServicePromiseClient> {
    async listTopicsByStudyPlan(data: Required<ListTopicsByStudyPlanRequest.AsObject>) {
        const req = createListTopicsByStudyPlanRequest(data);
        const resp = await this._call("listTopicsByStudyPlan", req);

        return { data: resp.toObject() };
    }
}

const courseReaderServiceEureka = new CourseReaderEureka(
    CourseReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default courseReaderServiceEureka;
