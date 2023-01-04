import { NsSyllabus_Master_CoursesService } from "src/squads/syllabus/services/master/courses-master-service/types";

import { MasterDataCourseServicePromiseClient } from "manabuf/mastermgmt/v1/course_grpc_web_pb";

import coursesServiceMaster, {
    newUpsertCourseRequest,
} from "src/squads/syllabus/services/master/courses-master-service/courses-master.mutation";

jest.mock("manabuf/mastermgmt/v1/course_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/course_grpc_web_pb");
    actual.MasterDataCourseServicePromiseClient.prototype.upsertCourses = jest.fn();

    return actual;
});

jest.mock("src/internals/feature-controller");

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => ({ data: "FAKE_DATA" }),
};

describe("course service master mutation", () => {
    it("upsert courses", async () => {
        (
            MasterDataCourseServicePromiseClient.prototype.upsertCourses as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });

        const payload: NsSyllabus_Master_CoursesService.UpsertCourses = {
            course_id: "courseId",
            chapter_ids: [],
            display_order: 1,
            icon: "courseIcon",
            name: "courseName",
            school_id: 1,
            locationIdsList: [],
            teachingMethod: 1,
        };

        // First call
        await coursesServiceMaster.upsertCourses(payload);

        expect(MasterDataCourseServicePromiseClient.prototype.upsertCourses).toBeCalledWith(
            newUpsertCourseRequest(payload)
        );

        // Last call
        await coursesServiceMaster.upsertCourses(payload);

        expect(MasterDataCourseServicePromiseClient.prototype.upsertCourses).toBeCalledWith(
            newUpsertCourseRequest(payload)
        );
    });
});
