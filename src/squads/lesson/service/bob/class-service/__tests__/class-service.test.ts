import { ArrayElement } from "src/common/constants/types";
import {
    Lesson_ClassByClassIdForLessonManagementQuery,
    Lesson_ClassByClassIdForLessonManagementQueryVariables,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_ClassManyForLessonManagementQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { classService } from "src/squads/lesson/service/bob/class-service/class-service";
import { generateMockCourseMany } from "src/squads/lesson/test-utils/class-course";

import classQueriesBob from "src/squads/lesson/service/bob/class-service/class-bob.query";

jest.mock("src/squads/lesson/service/bob/class-service/class-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getMany: jest.fn(),
            lessonGetManyByLocationIdAndCourseIdAndNameQuery: jest.fn(),
            lessonGetManyByNullableCourseIdAndNameQuery: jest.fn(),
        },
    };
});

describe("class-service", () => {
    const fakeGetOneClassReturn: ArrayElement<
        Lesson_ClassByClassIdForLessonManagementQuery["class"]
    > = {
        class_id: "Sample Class ID",
        name: "Sample Class Name",
    };

    const fakeGetManyClassReturn: Lesson_ClassManyForLessonManagementQuery["class"] = [
        {
            class_id: "Class ID 1",
            name: "Class Name 1",
        },
        {
            class_id: "Class ID 2",
            name: "Class Name 2",
        },
    ];

    it("should call getOne by calling classGetOne method", async () => {
        const queryVariable: Lesson_ClassByClassIdForLessonManagementQueryVariables = {
            class_id: "Sample Class ID",
        };

        (classQueriesBob.getOne as jest.Mock).mockResolvedValue(fakeGetOneClassReturn);

        const response = await classService.query.classGetOne(queryVariable);

        expect(classQueriesBob.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(fakeGetOneClassReturn);
    });

    it("should not call getOne with invalid parameter", async () => {
        const invalidQueryVariable: Lesson_ClassByClassIdForLessonManagementQueryVariables = {
            class_id: "",
        };

        (classQueriesBob.getOne as jest.Mock).mockResolvedValue(fakeGetOneClassReturn);

        await expect(async () => {
            await classService.query.classGetOne(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "classGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "class_id" }],
            name: "InvalidParamError",
        });

        expect(classQueriesBob.getOne).not.toBeCalled();
    });

    it("should call getMany by calling classGetMany method", async () => {
        const queryVariable: Lesson_ClassManyForLessonManagementQueryVariables = {
            class_ids: ["Class ID 1", "Class ID 2"],
        };

        (classQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeGetManyClassReturn);

        const response = await classService.query.classGetMany(queryVariable);

        expect(classQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(fakeGetManyClassReturn);
    });

    it("should not call getMany with invalid params", async () => {
        const invalidQueryVariable: Lesson_ClassManyForLessonManagementQueryVariables = {
            class_ids: [],
        };

        (classQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeGetManyClassReturn);

        await expect(async () => {
            await classService.query.classGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "classGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "class_ids" }],
            name: "InvalidParamError",
        });

        expect(classQueriesBob.getMany).not.toBeCalled();
    });

    it("should call lessonGetManyByLocationIdAndCourseIdAndNameQuery by calling classGetManyByLocationIdAndCourseIdAndName", async () => {
        const mockClassMany = { data: generateMockCourseMany() };

        (
            classQueriesBob.lessonGetManyByLocationIdAndCourseIdAndNameQuery as jest.Mock
        ).mockResolvedValue(mockClassMany);

        const response = await classService.query.classGetManyByLocationIdAndCourseIdAndName({
            location_id: "Location_Id",
            course_id: "Course_Id",
            name: "Class Name",
            limit: 10,
        });

        expect(classQueriesBob.lessonGetManyByLocationIdAndCourseIdAndNameQuery).toBeCalled();
        expect(response).toEqual(mockClassMany);
    });

    describe("should get error by calling classGetManyByLocationIdAndCourseIdAndName", () => {
        const mockClassMany = { data: generateMockCourseMany() };

        (
            classQueriesBob.lessonGetManyByLocationIdAndCourseIdAndNameQuery as jest.Mock
        ).mockResolvedValue(mockClassMany);

        it("with invalid location id", async () => {
            const queryVariable: Partial<Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables> =
                {
                    location_id: undefined,
                    course_id: "Course_Id",
                    name: "Class Name",
                    limit: 10,
                };

            await expect(async () => {
                await classService.query.classGetManyByLocationIdAndCourseIdAndName(queryVariable);
            }).rejects.toMatchObject({
                action: "classGetManyByLocationIdAndCourseIdAndName",
                serviceName: "bobGraphQL",
                errors: [{ field: "location_id" }],
                name: "InvalidParamError",
            });
        });

        it("with invalid course id", async () => {
            const queryVariable: Partial<Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables> =
                {
                    location_id: "Location_Id",
                    course_id: undefined,
                    name: "Class Name",
                    limit: 10,
                };

            await expect(async () => {
                await classService.query.classGetManyByLocationIdAndCourseIdAndName(queryVariable);
            }).rejects.toMatchObject({
                action: "classGetManyByLocationIdAndCourseIdAndName",
                serviceName: "bobGraphQL",
                errors: [{ field: "course_id" }],
                name: "InvalidParamError",
            });
        });
    });

    it("should call lessonGetManyByNullableCourseIdAndNameQuery by calling classGetManyByNullableCourseAndName", async () => {
        const mockClassMany = { data: generateMockCourseMany() };

        (
            classQueriesBob.lessonGetManyByNullableCourseIdAndNameQuery as jest.Mock
        ).mockResolvedValue(mockClassMany);

        const response = await classService.query.classGetManyByNullableCourseAndName({
            course_ids: ["Course_Id_1", "Course_Id_2"],
            name: "Class Name",
            limit: 10,
        });

        expect(classQueriesBob.lessonGetManyByNullableCourseIdAndNameQuery).toBeCalled();
        expect(response).toEqual(mockClassMany);
    });
});
