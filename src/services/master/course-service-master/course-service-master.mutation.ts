import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsMasterCourseService } from "src/services/master/course-service-master/types";
import { InheritedGrpcServiceClient, MutationParams } from "src/services/service-types";

import { MasterDataCourseServicePromiseClient } from "manabuf/mastermgmt/v1/course_grpc_web_pb";

import { newUpsertCourseRequest } from "./course-service-master.request";

class CourseServiceMaster extends InheritedGrpcServiceClient<MasterDataCourseServicePromiseClient> {
    async upsertCourses({
        data: course,
    }: Required<MutationParams<NsMasterCourseService.UpsertCourses>>) {
        const { course_id } = course;

        const request = newUpsertCourseRequest(course);

        await this._call("upsertCourses", request);

        return { data: { id: course_id } };
    }
}

const courseServiceMaster = new CourseServiceMaster(
    MasterDataCourseServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default courseServiceMaster;
