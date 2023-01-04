import { ArrayElement } from "src/common/constants/types";
import { pick1stElement } from "src/common/utils/other";
import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { coursesService } from "src/squads/communication/service/bob/courses-service/courses-service";
import { createMockCoursesMany } from "src/squads/communication/test-utils/query-data";

import coursesQueriesBob from "src/squads/communication/service/bob/courses-service/courses-bob.query";

jest.mock("src/squads/communication/service/bob/courses-service/courses-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    };
});

const mockCourseMany = createMockCoursesMany();

describe("courses-service communicationGetManyCourses", () => {
    it("should return course list", async () => {
        const course: ArrayElement<CoursesManyQuery["courses"]> = pick1stElement(mockCourseMany)!;
        const queryVariable: CoursesManyQueryVariables = { course_id: course?.course_id };

        (coursesQueriesBob.getMany as jest.Mock).mockResolvedValue(mockCourseMany);

        const response = await coursesService.query.communicationGetManyCourses(queryVariable);

        expect(coursesQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCourseMany);
    });

    it("should throw invalidParamError with course_id is undefined", async () => {
        const queryVariable: CoursesManyQueryVariables = { course_id: undefined };

        const response = await coursesService.query.communicationGetManyCourses(queryVariable);

        expect(coursesQueriesBob.getMany).not.toBeCalled();
        expect(response).toEqual([]);
    });

    it("should throw invalidParamError with course_id is null", async () => {
        const queryVariable: CoursesManyQueryVariables = { course_id: null };

        const response = await coursesService.query.communicationGetManyCourses(queryVariable);

        expect(coursesQueriesBob.getMany).not.toBeCalled();
        expect(response).toEqual([]);
    });

    it("should throw invalidParamError with course_id is empty", async () => {
        const queryVariable: CoursesManyQueryVariables = { course_id: "" };

        const response = await coursesService.query.communicationGetManyCourses(queryVariable);

        expect(coursesQueriesBob.getMany).not.toBeCalled();
        expect(response).toEqual([]);
    });
});
