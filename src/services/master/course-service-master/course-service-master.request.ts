import { genId } from "src/common/utils/id-generator";
import { NsMasterCourseService } from "src/services/master/course-service-master/types";

import { UpsertCoursesRequest } from "manabuf/mastermgmt/v1/course_pb";

export const newUpsertCourseRequest = (course: NsMasterCourseService.UpsertCourses) => {
    const request = new UpsertCoursesRequest();
    const courseRequest = new UpsertCoursesRequest.Course();

    const { school_id, display_order, locationIdsList, icon, name } = course;

    const id = course.course_id || genId();

    courseRequest.setId(id);
    courseRequest.setName(name);
    if (icon) courseRequest.setIcon(icon);
    courseRequest.setSchoolId(school_id);
    courseRequest.setDisplayOrder(display_order || 1);
    courseRequest.setLocationIdsList(locationIdsList || []);

    request.addCourses(courseRequest);

    return request;
};
