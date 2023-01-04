import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { MasterDataCourseServicePromiseClient } from "manabuf/mastermgmt/v1/course_grpc_web_pb";
import { UpsertCoursesRequest } from "manabuf/mastermgmt/v1/course_pb";

import { NsSyllabus_Master_CoursesService } from "./types";

export const newUpsertCourseRequest = (course: NsSyllabus_Master_CoursesService.UpsertCourses) => {
    const request = new UpsertCoursesRequest();
    const courseRequest = new UpsertCoursesRequest.Course();

    const { school_id, display_order, locationIdsList, icon, name, teachingMethod } = course;

    const id = course.course_id || genId();

    courseRequest.setId(id);
    courseRequest.setName(name);
    if (icon) courseRequest.setIcon(icon);
    courseRequest.setSchoolId(school_id);
    courseRequest.setDisplayOrder(display_order || 1);
    courseRequest.setLocationIdsList(locationIdsList || []);

    if (teachingMethod === undefined) courseRequest.setTeachingMethod(2);
    else courseRequest.setTeachingMethod(teachingMethod);

    request.addCourses(courseRequest);

    return request;
};

class CoursesServiceMaster extends InheritedGrpcServiceClient<MasterDataCourseServicePromiseClient> {
    async upsertCourses(course: NsSyllabus_Master_CoursesService.UpsertCourses) {
        const { course_id } = course;

        const request = newUpsertCourseRequest(course);
        await this._call("upsertCourses", request);

        return { data: { id: course_id } };
    }
}

const coursesServiceMaster = new CoursesServiceMaster(
    MasterDataCourseServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default coursesServiceMaster;
