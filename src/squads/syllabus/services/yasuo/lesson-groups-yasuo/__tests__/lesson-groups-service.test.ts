import { lessonGroupYasuoService } from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/lesson-groups-service";
import NsYasuoCourseService from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/types";

import lessonGroupsServiceYasuo from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/lesson-groups-yasuo.mutation";

jest.mock(
    "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/lesson-groups-yasuo.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                attachMaterialsToCourse: jest.fn(),
            },
        };
    }
);

describe("lesson-groups-yasuo-service", () => {
    it("should call attachMaterialsToCourse with correct parameters", async () => {
        const mutationVariable: NsYasuoCourseService.AttachMaterialsToCourse = {
            courseId: "Course_Id",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            lessonGroupId: "Lesson_Group_Id",
            mediaIds: ["Media_Id_1"],
        };

        (lessonGroupsServiceYasuo.attachMaterialsToCourse as jest.Mock).mockResolvedValue({
            mediaIds: ["Media_Id_1"],
            newMediaIds: ["Media_Id_1"],
        });

        const response = await lessonGroupYasuoService.mutation.lessonGroupAttachMaterialsToCourse(
            mutationVariable
        );

        expect(lessonGroupsServiceYasuo.attachMaterialsToCourse).toBeCalledWith(mutationVariable);
        expect(response).toEqual({ mediaIds: ["Media_Id_1"], newMediaIds: ["Media_Id_1"] });
    });

    it("should not call attachMaterialsToCourseReq with invalid parameters", async () => {
        const invalidVariable: NsYasuoCourseService.AttachMaterialsToCourse = {
            courseId: "",
            lessonGroupId: "",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            mediaIds: ["Media_Id_1"],
        };

        await expect(async () => {
            await lessonGroupYasuoService.mutation.lessonGroupAttachMaterialsToCourse(
                invalidVariable
            );
        }).rejects.toMatchObject({
            action: "coursesAttachMaterialsToCourse",
            serviceName: "yasuoGraphQL",
            errors: [
                { field: "courseId", fieldValueIfNotSensitive: "" },
                { field: "lessonGroupId", fieldValueIfNotSensitive: "" },
            ],
            name: "InvalidParamError",
        });

        expect(lessonGroupsServiceYasuo.attachMaterialsToCourse).not.toBeCalled();
    });
});
