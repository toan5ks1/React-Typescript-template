import { formInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import {
    createAddBooksToCourseRequest,
    createDuplicateBookRequest,
    createUpdateDisplayOrdersOfLOsAndAssignmentsRequest,
    validateAddBooksToCourse,
} from "../course-modifier-eureka.request";
import { NsEurekaCourseModifierService } from "../types";
import {
    createMockDataAddBooksToCourse,
    createMockDataDuplicateBook,
    createMockDataUpdateDisplayOrderLOAndAssignment,
} from "./data";

describe(createDuplicateBookRequest.name, () => {
    it("should create correct request", () => {
        const payload = createMockDataDuplicateBook();

        expect(createDuplicateBookRequest(payload).toObject()).toEqual(payload);
    });
});

describe(createUpdateDisplayOrdersOfLOsAndAssignmentsRequest.name, () => {
    it("should create correct request when swap 1 LO and 1 Assignment", () => {
        const payload = createMockDataUpdateDisplayOrderLOAndAssignment();

        expect(payload.assignmentsList).toHaveLength(1);
        expect(payload.learningObjectivesList).toHaveLength(1);

        expect(createUpdateDisplayOrdersOfLOsAndAssignmentsRequest(payload).toObject()).toEqual(
            payload
        );
    });

    it("should create correct request when swap Assignment", () => {
        const payload = createMockDataUpdateDisplayOrderLOAndAssignment({
            learningObjectivesList: [],
            assignmentsList: [
                { displayOrder: 1, assignmentId: "assignmentId01", topicId: "topicId" },
                { displayOrder: 3, assignmentId: "assignmentId03", topicId: "topicId" },
            ],
        });

        expect(payload.assignmentsList).toHaveLength(2);
        expect(payload.learningObjectivesList).toHaveLength(0);

        expect(createUpdateDisplayOrdersOfLOsAndAssignmentsRequest(payload).toObject()).toEqual(
            payload
        );
    });

    it("should create correct request when swap LearningObjective", () => {
        const payload = createMockDataUpdateDisplayOrderLOAndAssignment({
            assignmentsList: [],
            learningObjectivesList: [
                { displayOrder: 1, loId: "loId01", topicId: "topicId" },
                { displayOrder: 3, loId: "loId03", topicId: "topicId" },
            ],
        });

        expect(payload.assignmentsList).toHaveLength(0);
        expect(payload.learningObjectivesList).toHaveLength(2);

        expect(createUpdateDisplayOrdersOfLOsAndAssignmentsRequest(payload).toObject()).toEqual(
            payload
        );
    });
});

describe(createAddBooksToCourseRequest.name, () => {
    it("should return correct data after success", async () => {
        const payload = createMockDataAddBooksToCourse();

        expect(createAddBooksToCourseRequest(payload).toObject()).toEqual(payload);
    });
});

describe(`test for ${validateAddBooksToCourse.name} when data is invalid`, () => {
    const testCases: TestCaseValidateRequest<
        NsEurekaCourseModifierService.AddBooksToCourse,
        false
    >[] = [
        {
            title: "missing all required params",
            input: {},
        },
        {
            title: "missing book ids",
            input: {
                courseId: "courseId",
            },
        },
        {
            title: "missing course id",
            input: {
                bookIdsList: ["12"],
            },
        },
        {
            title: "book ids is an empty list",
            input: {
                courseId: "courseId",
                bookIdsList: [],
            },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw invalid params err when ${title}`, () => {
            expect(() =>
                validateAddBooksToCourse(input as NsEurekaCourseModifierService.AddBooksToCourse)
            ).toThrowError(formInvalidError);
        });
    });
});

describe(`test for ${validateAddBooksToCourse.name} when data is valid`, () => {
    const testCases: TestCaseValidateRequest<NsEurekaCourseModifierService.AddBooksToCourse>[] = [
        {
            title: "add a book to course",
            input: { courseId: "courseId", bookIdsList: ["Book1"] },
        },
        {
            title: "add multiple book to course",
            input: { courseId: "courseId", bookIdsList: ["Book1", "Book2"] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`shouldn't throw err when ${title}`, () => {
            expect(() => validateAddBooksToCourse(input)).not.toThrowError();
        });
    });
});
