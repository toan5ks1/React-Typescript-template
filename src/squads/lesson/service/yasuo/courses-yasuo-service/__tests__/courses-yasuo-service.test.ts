import { coursesServiceYasuo } from "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-yasuo-service";
import NsLesson_Yasuo_CourseService from "src/squads/lesson/service/yasuo/courses-yasuo-service/types";

import coursesModifierServiceYasuo from "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-modifier-yasuo.mutation";

jest.mock(
    "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-modifier-yasuo.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                attachMaterialsToCourse: jest.fn(),
            },
        };
    }
);

describe("course-yasuo-service", () => {
    it("should call attachMaterialsToCourse with correct parameters", async () => {
        const mutationVariable: NsLesson_Yasuo_CourseService.AttachMaterialsToCourse = {
            courseId: "Course_Id",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            lessonGroupId: "Lesson_Group_Id",
            mediaIds: ["Media_Id_1"],
        };

        (coursesModifierServiceYasuo.attachMaterialsToCourse as jest.Mock).mockResolvedValue({
            mediaIds: ["Media_Id_1"],
            newMediaIds: ["Media_Id_1"],
        });

        const response = await coursesServiceYasuo.mutation.coursesAttachMaterialsToCourse(
            mutationVariable
        );

        expect(coursesModifierServiceYasuo.attachMaterialsToCourse).toBeCalledWith(
            mutationVariable
        );
        expect(response).toEqual({ mediaIds: ["Media_Id_1"], newMediaIds: ["Media_Id_1"] });
    });

    it("should not call attachMaterialsToCourse with invalid parameters", async () => {
        const invalidVariable: NsLesson_Yasuo_CourseService.AttachMaterialsToCourse = {
            courseId: "",
            files: [
                new File([], "20211129A.pdf"),
                new File([], "20211129B.pdf"),
                new File([], "20211129C.pdf"),
            ],
            lessonGroupId: "",
            mediaIds: ["Media_Id_1"],
        };

        await expect(async () => {
            await coursesServiceYasuo.mutation.coursesAttachMaterialsToCourse(invalidVariable);
        }).rejects.toMatchObject({
            action: "coursesAttachMaterialsToCourse",
            serviceName: "yasuoGraphQL",
            errors: [
                { field: "courseId", fieldValueIfNotSensitive: "" },
                { field: "lessonGroupId", fieldValueIfNotSensitive: "" },
            ],
            name: "InvalidParamError",
        });

        expect(coursesModifierServiceYasuo.attachMaterialsToCourse).not.toBeCalled();
    });
});
