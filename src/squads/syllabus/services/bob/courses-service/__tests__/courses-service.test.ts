import {
    Lesson_CoursesListQuery,
    Lesson_CoursesListQueryVariables,
    Lesson_CoursesOneQuery,
    Lesson_CoursesOneQueryVariables,
    CoursesOneQueryVariables,
    CoursesListQuery,
    CoursesListQueryVariables,
    CourseTitleQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { coursesService } from "src/squads/syllabus/services/bob/courses-service/courses-service";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";
import { getInvalidParamErrorObject } from "src/squads/syllabus/test-utils/service/validate";

import coursesQueriesBob from "src/squads/syllabus/services/bob/courses-service/courses-bob.query";

jest.mock("src/squads/syllabus/services/bob/courses-service/courses-bob.query");

const mockCourseListDataWithTotal: DataWithTotal<CoursesListQuery["courses"]> = {
    data: [
        {
            course_id: "course1",
            name: "Course A",
            school_id: 1,
        },
    ],
    total: 1,
};

const mockCourseListV2DataWithTotal: DataWithTotal<Lesson_CoursesListQuery["courses"]> = {
    data: [
        {
            course_id: "course1",
            name: "Course A",
            school_id: 1,
            teaching_method: "COURSE_TEACHING_METHOD_INDIVIDUAL",
        },
    ],
    total: 1,
};

const mockCourse: Lesson_CoursesOneQuery["courses"] = [
    {
        course_id: "course_id",
        name: "course name",
        school_id: 1,
        course_books: [],
    },
];

describe(`test for courses get one ${coursesService.query.courseGetOne.name}`, () => {
    it("should return undefined when missing identity", async () => {
        const invalidParams = {
            course_id: undefined,
        } as unknown as CoursesOneQueryVariables;

        let error;
        try {
            await coursesService.query.courseGetOne(invalidParams);
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual({
            action: "courseGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "course_id" }],
            errorName: "InvalidParamError",
        });

        expect(coursesQueriesBob.getOne).not.toBeCalled();
    });

    it("should call courseGetOne correctly", async () => {
        const queryResponseData = {};
        (coursesQueriesBob.getOne as jest.Mock).mockResolvedValue({});

        const params: CoursesOneQueryVariables = {
            course_id: "courseId_01",
        };

        const resp = await coursesService.query.courseGetOne(params);

        expect(coursesQueriesBob.getOne).toBeCalledWith(params);
        expect(resp).toEqual(queryResponseData);
    });

    it("should call courseGetList correctly", async () => {
        (coursesQueriesBob.getList as jest.Mock).mockResolvedValue(mockCourseListDataWithTotal);

        const params: CoursesListQueryVariables = {
            course_id: "courseId_01",
        };

        const resp = await coursesService.query.courseGetList(params);

        expect(coursesQueriesBob.getList).toBeCalledWith(params);
        expect(resp).toEqual(mockCourseListDataWithTotal);
    });
});

describe(coursesService.query.syllabusCourseGetTitle.name, () => {
    it("should not call query and return undefined when missing identity", async () => {
        const result = await coursesService.query.syllabusCourseGetTitle(
            {} as CourseTitleQueryVariables
        );

        expect(result).toBeUndefined();
        expect(coursesQueriesBob.getTitle).not.toBeCalled();
    });

    it("should call getTitle and return correct data after query success", async () => {
        const response = "response_course_getTitle";
        const params: CourseTitleQueryVariables = {
            course_id: "courseId_1",
        };

        (coursesQueriesBob.getTitle as jest.Mock).mockResolvedValue(response);

        const result = await coursesService.query.syllabusCourseGetTitle(params);

        expect(result).toEqual(response);
        expect(coursesQueriesBob.getTitle).toBeCalledWith(params);
    });
});

describe(coursesService.query.lessonCourseGetListV2.name, () => {
    it("should call lessonCourseGetListV2 correctly", async () => {
        (coursesQueriesBob.getListV2 as jest.Mock).mockResolvedValue(mockCourseListV2DataWithTotal);

        const params: Lesson_CoursesListQueryVariables = {
            limit: 10,
            offset: 0,
        };

        const resp = await coursesService.query.lessonCourseGetListV2(params);

        expect(coursesQueriesBob.getListV2).toBeCalledWith(params);
        expect(resp).toEqual(mockCourseListV2DataWithTotal);
    });
});

describe(coursesService.query.lessonCourseGetOne.name, () => {
    it("should return undefined when missing identity lessonCourseGetOne", async () => {
        const invalidParams = {
            course_id: undefined,
        } as unknown as Lesson_CoursesOneQueryVariables;

        let error;
        try {
            await coursesService.query.lessonCourseGetOne(invalidParams);
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual({
            action: "lessonCourseGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "course_id" }],
            errorName: "InvalidParamError",
        });

        expect(coursesQueriesBob.getOneV2).not.toBeCalled();
    });

    it("should call lessonCourseGetOne correctly", async () => {
        (coursesQueriesBob.getOneV2 as jest.Mock).mockResolvedValue(mockCourse);

        const params: CoursesOneQueryVariables = {
            course_id: "courseId_01",
        };

        const resp = await coursesService.query.lessonCourseGetOne(params);

        expect(coursesQueriesBob.getOneV2).toBeCalledWith(params);
        expect(resp).toEqual(mockCourse);
    });
});
