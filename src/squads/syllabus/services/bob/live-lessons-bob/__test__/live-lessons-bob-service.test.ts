import { LessonsByCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";
import { lessonsSyllabusService } from "src/squads/syllabus/services/bob/live-lessons-bob/live-lessons-bob-service";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";
import { getInvalidParamErrorObject } from "src/squads/syllabus/test-utils/service/validate";

import liveLessonsQueriesBob from "src/squads/syllabus/services/bob/live-lessons-bob/live-lessons-bob.query";

jest.mock("src/squads/syllabus/services/bob/live-lessons-bob/live-lessons-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    };
});

jest.mock("src/internals/feature-controller");

describe(`test for lesson groups ${lessonsSyllabusService.query.lessonSyllabusGetMany.name}`, () => {
    it("should return undefined when pass lesson groups empty", async () => {
        const invalidParams: LessonsByCourseIdQueryVariables = {
            course_id: "",
        };

        let error;
        try {
            await lessonsSyllabusService.query.lessonSyllabusGetMany(invalidParams);
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual({
            action: "lessonSyllabusGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "course_id" }],
            errorName: "InvalidParamError",
        });
    });

    it("should call lessonSyllabusGetMany correctly", async () => {
        const validParams: LessonsByCourseIdQueryVariables = {
            course_id: "course_id",
        };

        await lessonsSyllabusService.query.lessonSyllabusGetMany(validParams);
        expect(liveLessonsQueriesBob.getMany).toBeCalledWith(validParams);
    });
});
