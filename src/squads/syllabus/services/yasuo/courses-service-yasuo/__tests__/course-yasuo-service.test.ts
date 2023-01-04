import { coursesYasuoService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo-service";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import coursesYasuoMutation from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation";

jest.mock("src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation", () => {
    return {
        __esModule: true,
        default: {
            deleteCourses: jest.fn(),
            upsertCourses: jest.fn(),
        },
    };
});

jest.mock("src/internals/feature-controller");

describe(`test for courses-yasuo-service`, () => {
    it("should call courseDelete correctly", async () => {
        const deleteParam: NsSyllabus_Yasuo_CoursesService.DeleteCourses = {
            courseIdsList: ["course_id"],
        };

        await coursesYasuoService.mutation.courseDelete(deleteParam);
        expect(coursesYasuoMutation.deleteCourses).toBeCalledWith(deleteParam);
    });

    it("should call courseCreate correctly", async () => {
        const createParam: NsSyllabus_Yasuo_CoursesService.UpsertCourses = {
            name: "course name",
            icon: undefined,
            chapter_ids: [],
            school_id: 1,
            display_order: 1,
        };

        await coursesYasuoService.mutation.courseCreate(createParam);
        expect(coursesYasuoMutation.upsertCourses).toBeCalledWith(createParam);
    });
});
