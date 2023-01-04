import { paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import { DeleteLosRequest, DeleteTopicsRequest } from "manabie-yasuo/course_pb";

import {
    createDeleteLosRequest,
    createDeleteTopicsRequest,
    validateDeleteCourses,
    validateDeleteLos,
} from "../courses-yasuo.mutation";

jest.mock("src/internals/feature-controller");

describe(`${validateDeleteLos.name} with invalid data`, () => {
    const invalidData: TestCaseValidateRequest<NsSyllabus_Yasuo_CoursesService.DeleteLos>[] = [
        {
            title: "id list is undefined",
            input: {} as NsSyllabus_Yasuo_CoursesService.DeleteLos,
        },
        {
            title: "id list is empty",
            input: { loIdsList: [] },
        },
    ];

    invalidData.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() => validateDeleteLos(input)).toThrowError(paramsInvalidError);
        });
    });
});

describe(`${validateDeleteLos.name} with valid data`, () => {
    const validData: TestCaseValidateRequest<NsSyllabus_Yasuo_CoursesService.DeleteLos>[] = [
        {
            title: "id list has only an element",
            input: { loIdsList: ["lo_id"] },
        },
        {
            title: "id list has multiple element",
            input: { loIdsList: ["lo_id_01", "lo_id_02"] },
        },
    ];

    validData.forEach(({ title, input }) => {
        it(`should not throw err when ${title}`, () => {
            expect(() => validateDeleteLos(input)).not.toThrowError();
        });
    });
});

describe(`test for ${validateDeleteCourses.name} when data is valid`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_Yasuo_CoursesService.DeleteCourses>[] = [
        {
            title: "ids have only a element",
            input: { courseIdsList: ["12"] },
        },
        {
            title: "ids have multiple element",
            input: { courseIdsList: ["13", "15"] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`shouldn't throw err when ${title}`, () => {
            expect(() => validateDeleteCourses(input)).not.toThrowError();
        });
    });
});

describe(`test for ${validateDeleteCourses.name} when data is invalid`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_Yasuo_CoursesService.DeleteCourses>[] = [
        {
            title: "ids is undefined",
            input: {} as NsSyllabus_Yasuo_CoursesService.DeleteCourses,
        },
        {
            title: "ids is empty list",
            input: { courseIdsList: [] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw invalid params err when ${title}`, () => {
            expect(() => validateDeleteCourses(input)).toThrowError(paramsInvalidError);
        });
    });
});

describe(`${createDeleteTopicsRequest.name}`, () => {
    it("should create correct request", () => {
        const payload: DeleteTopicsRequest.AsObject = {
            topicIdsList: ["topic_id_01", "topic_id_02"],
        };

        const requestAsObject = createDeleteTopicsRequest(payload).toObject();

        expect(requestAsObject).toEqual<DeleteTopicsRequest.AsObject>(payload);
    });
});

describe(`${createDeleteLosRequest.name}`, () => {
    it("should create correct request", () => {
        const payload: DeleteLosRequest.AsObject = {
            loIdsList: ["lo_id_01", "lo_id_02"],
        };

        const requestAsObject = createDeleteLosRequest(payload).toObject();

        expect(requestAsObject).toEqual<DeleteLosRequest.AsObject>(payload);
    });
});
