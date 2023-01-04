import NsYasuoCourseService from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/types";

import { CourseModifierServicePromiseClient } from "manabuf/yasuo/v1/courses_grpc_web_pb";

import lessonGroupsServiceYasuo, {
    attachMaterialsToCourseReq,
} from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/lesson-groups-yasuo.mutation";

jest.mock("manabuf/yasuo/v1/courses_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/yasuo/v1/courses_grpc_web_pb");

    actual.CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse = jest.fn();
    return actual;
});

const mockUploadFilesReturn = { mediaIds: ["Media_Id_1"] };

jest.mock("src/squads/syllabus/services/bob/upload-reader-service-bob", () => {
    return {
        __esModule: true,
        uploadReaderServiceBob: {
            filterAndUploadFiles: () => {
                return mockUploadFilesReturn;
            },
        },
    };
});

describe("lesson-groups-yasuo.mutation", () => {
    it("should attachMaterialsToCourse with correct payload", async () => {
        const payload: NsYasuoCourseService.AttachMaterialsToCourse = {
            courseId: "course_Id",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            lessonGroupId: "Lesson_Group_Id",
            mediaIds: ["Media_Id_1"],
        };
        (
            CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse as jest.Mock
        ).mockReturnValue({});

        const _callSpy = jest.spyOn(lessonGroupsServiceYasuo, "_call");

        await lessonGroupsServiceYasuo.attachMaterialsToCourse(payload);

        expect(_callSpy).toHaveBeenCalledTimes(1);

        expect(CourseModifierServicePromiseClient.prototype.attachMaterialsToCourse).toBeCalledWith(
            attachMaterialsToCourseReq({
                ...payload,
                newMediaIds: mockUploadFilesReturn.mediaIds,
            })
        );
    });
});
