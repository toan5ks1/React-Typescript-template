import NsLesson_Yasuo_CourseService from "src/squads/lesson/service/yasuo/courses-yasuo-service/types";

import { CourseModifierServicePromiseClient } from "manabuf/yasuo/v1/courses_grpc_web_pb";

import coursesModifierServiceYasuo, {
    attachMaterialsToCourseReq,
} from "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-modifier-yasuo.mutation";

jest.mock("manabuf/yasuo/v1/courses_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/yasuo/v1/courses_grpc_web_pb");

    actual.CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse = jest.fn();
    return actual;
});

const mockUploadFilesReturn = { data: { mediaIds: ["Media_Id_1"] } };

jest.mock("src/squads/lesson/service/bob/upload-service/upload.mutation", () => {
    return {
        __esModule: true,
        default: {
            filterAndUploadFiles: () => {
                return mockUploadFilesReturn;
            },
        },
    };
});

describe("course-service-yasuo.mutation", () => {
    it("should attachMaterialsToCourse with correct payload", async () => {
        (
            CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse as jest.Mock
        ).mockReturnValue({});

        const payload: NsLesson_Yasuo_CourseService.AttachMaterialsToCourse = {
            courseId: "Course_Id",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            lessonGroupId: "Lesson_Group_Id",
            mediaIds: ["Media_Id_1"],
        };
        await coursesModifierServiceYasuo.attachMaterialsToCourse(payload);

        expect(CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse).toBeCalledWith(
            attachMaterialsToCourseReq({
                ...payload,
                newMediaIds: mockUploadFilesReturn.data.mediaIds,
            })
        );
    });
});
