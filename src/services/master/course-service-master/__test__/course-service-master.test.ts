import courseServiceMaster, {
    newUpsertCourseRequest,
    NsMasterCourseService,
} from "src/services/master/course-service-master";

import { MasterDataCourseServicePromiseClient } from "manabuf/mastermgmt/v1/course_grpc_web_pb";

jest.mock("manabuf/mastermgmt/v1/course_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/course_grpc_web_pb");
    actual.MasterDataCourseServicePromiseClient.prototype.upsertCourses = jest.fn();

    return actual;
});

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

        const payload: NsMasterCourseService.UpsertCourses = {
            course_id: "courseId",
            chapter_ids: [],
            display_order: 1,
            icon: "courseIcon",
            name: "courseName",
            school_id: 1,
            locationIdsList: [],
        };

        // First call
        await courseServiceMaster.upsertCourses({
            id: "MutationParams_id",
            data: payload,
        });

        expect(MasterDataCourseServicePromiseClient.prototype.upsertCourses).toBeCalledWith(
            newUpsertCourseRequest(payload)
        );

        // Last call
        await courseServiceMaster.upsertCourses({
            id: "MutationParams_id",
            data: {
                ...payload,
            },
        });

        expect(MasterDataCourseServicePromiseClient.prototype.upsertCourses).toBeCalledWith(
            newUpsertCourseRequest({ ...payload })
        );
    });
});
