import { coursesMasterService } from "../courses-master-service";
import { NsSyllabus_Master_CoursesService } from "../types";

import coursesServiceMaster from "src/squads/syllabus/services/master/courses-master-service/courses-master.mutation";

jest.mock("src/squads/syllabus/services/master/courses-master-service/courses-master.mutation");

jest.mock("src/internals/feature-controller");

describe(`test for courses get one ${coursesMasterService.mutation.courseCreate.name}`, () => {
    it("should call upsertCourses correctly", async () => {
        const courseParam: NsSyllabus_Master_CoursesService.UpsertCourses = {
            school_id: 1,
            chapter_ids: [],
            display_order: 1,
            icon: undefined,
            name: "course name",
        };
        const mockResponseUpsertCourses = { data: { id: "course_id" } };
        (coursesServiceMaster.upsertCourses as jest.Mock).mockResolvedValue(
            mockResponseUpsertCourses
        );

        const resp = await coursesMasterService.mutation.courseCreate(courseParam);

        expect(coursesServiceMaster.upsertCourses).toBeCalledWith(courseParam);
        expect(resp).toEqual(mockResponseUpsertCourses);
    });
});
