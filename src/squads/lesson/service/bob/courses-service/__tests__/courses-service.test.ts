import {
    CoursesManyQueryVariables,
    CoursesManyReferenceQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { coursesService } from "src/squads/lesson/service/bob/courses-service/courses-service";
import { InvalidParamError, ToStringFormat } from "src/squads/lesson/service/service-types";
import { mockCoursesMany } from "src/squads/lesson/test-utils/lesson-management";
import { getInvalidParamErrorObject } from "src/squads/lesson/test-utils/service";

import coursesQueriesBob from "src/squads/lesson/service/bob/courses-service/courses-bob.query";

jest.mock("src/squads/lesson/service/bob/courses-service/courses-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
            getManyReference: jest.fn(),
        },
    };
});
describe("course-service getMany", () => {
    beforeEach(() => {
        (coursesQueriesBob.getMany as jest.Mock).mockResolvedValue(mockCoursesMany);
    });

    it("should call getMany with correct parameters", async () => {
        const queryVariable: CoursesManyQueryVariables = {
            course_id: "Course_Id",
        };

        const response = await coursesService.query.coursesGetMany(queryVariable);

        expect(coursesQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCoursesMany);
    });

    it("should not call getMany with invalid parameters", async () => {
        const invalidQueryVariables: CoursesManyQueryVariables[] = [{}, { course_id: [] }];

        for (const variable of invalidQueryVariables) {
            let error;

            try {
                await coursesService.query.coursesGetMany(variable);
            } catch (err) {
                error = err;
            }

            expect.extend({
                toBeInvalidParamError(received) {
                    return {
                        message: () => `Case payload is: ${JSON.stringify(variable)}`,
                        pass: received instanceof InvalidParamError,
                    };
                },
            });

            expect(error).toBeInvalidParamError();
            expect(getInvalidParamErrorObject(error)).toEqual<ToStringFormat>({
                errorName: "InvalidParamError",
                serviceName: "bobGraphQL",
                errors: [{ field: "course_id" }],
                action: "coursesGetMany",
            });
        }
    });
});

describe("course-service getManyReference", () => {
    beforeEach(() => {
        (coursesQueriesBob.getManyReference as jest.Mock).mockResolvedValue(mockCoursesMany);
    });

    it("should call getManyReference with correct parameters", async () => {
        const queryVariable: CoursesManyReferenceQueryVariables = {
            limit: 5,
            offset: 1,
            name: "Course_Name",
        };

        const response = await coursesService.query.coursesGetManyReference(queryVariable);

        expect(coursesQueriesBob.getManyReference).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCoursesMany);
    });

    it("should not call getManyReference with invalid parameters", async () => {
        const invalidQueryVariable: CoursesManyReferenceQueryVariables = {
            limit: undefined,
            offset: undefined,
            name: "Course_Name",
        };

        await expect(async () => {
            await coursesService.query.coursesGetManyReference(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "coursesGetManyReference",
            name: "InvalidParamError",
            errors: [{ field: "limit" }, { field: "offset" }],
            serviceName: "bobGraphQL",
        });

        expect(coursesQueriesBob.getManyReference).not.toBeCalled();
    });
});
