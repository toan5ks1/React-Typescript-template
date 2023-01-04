import { paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import { DeleteAssignmentsRequest } from "manabuf/eureka/v1/assignment_writer_pb";

import {
    createDeleteAssignmentsRequest,
    validateDeleteAssignments,
    createUpsertAssignmentRequest,
    createUpsertAssignmentRequestV2,
} from "../assignment-eureka.request";
import { NsAssignmentEureka } from "../types";
import { createMockDataUpsertAssignment } from "./data";

describe(createUpsertAssignmentRequest.name, () => {
    it("should return request with EMPTY ID when creates", async () => {
        const assignmentWithoutId = createMockDataUpsertAssignment({ assignmentId: undefined });
        const request = createUpsertAssignmentRequest(assignmentWithoutId);

        expect(request.toObject().assignmentsList).toEqual([
            {
                ...assignmentWithoutId,
                assignmentId: "",
                assignmentStatus: 1,
                assignmentType: 2,
                attachmentsList: [],
                checkList: undefined,
                setting: undefined,
            },
        ]);
    });

    it("should return correct request WITH ID when edit", async () => {
        const assignmentId = "assignmentId";
        const assignmentWithId = createMockDataUpsertAssignment({
            assignmentId,
        });
        const request = createUpsertAssignmentRequest(assignmentWithId);

        expect(request.toObject().assignmentsList).toEqual([
            {
                ...assignmentWithId,
                assignmentId,
                assignmentStatus: 1,
                assignmentType: 2,
                attachmentsList: [],
                checkList: undefined,
                setting: undefined,
            },
        ]);
    });
});

describe(createUpsertAssignmentRequestV2.name, () => {
    it("should return request with EMPTY ID when creates", async () => {
        const assignmentWithoutId = createMockDataUpsertAssignment({ assignmentId: undefined });
        const request = createUpsertAssignmentRequestV2(assignmentWithoutId);

        expect(request.toObject().assignmentsList).toEqual([
            {
                ...assignmentWithoutId,
                assignmentId: "",
                assignmentStatus: 1,
                assignmentType: 2,
                attachmentsList: [],
                checkList: undefined,
                setting: undefined,
            },
        ]);
    });

    it("should return correct request WITH ID when edit", async () => {
        const assignmentId = "assignmentId";
        const assignmentWithId = createMockDataUpsertAssignment({
            assignmentId,
        });
        const request = createUpsertAssignmentRequestV2(assignmentWithId);

        expect(request.toObject().assignmentsList).toEqual([
            {
                ...assignmentWithId,
                assignmentId,
                assignmentStatus: 1,
                assignmentType: 2,
                attachmentsList: [],
                checkList: undefined,
                setting: undefined,
            },
        ]);
    });
});

describe(`${validateDeleteAssignments.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<NsAssignmentEureka.DeleteAssignments>[] = [
        {
            title: "id list is undefined",
            input: {} as NsAssignmentEureka.DeleteAssignments,
        },
        {
            title: "id list is empty",
            input: { assignmentIdsList: [] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() => validateDeleteAssignments(input)).toThrowError(paramsInvalidError);
        });
    });
});

describe(`${validateDeleteAssignments.name} with valid data`, () => {
    const testCases: TestCaseValidateRequest<NsAssignmentEureka.DeleteAssignments>[] = [
        {
            title: "id list has only an element",
            input: { assignmentIdsList: ["assignment_id"] },
        },
        {
            title: "id list has multiple element",
            input: { assignmentIdsList: ["assignment_id_01", "assignment_id_02"] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should not throw err when ${title}`, () => {
            expect(() => validateDeleteAssignments(input)).not.toThrowError();
        });
    });
});

describe(`${createDeleteAssignmentsRequest.name}`, () => {
    it("should create correct request", () => {
        const payload: DeleteAssignmentsRequest.AsObject = {
            assignmentIdsList: ["assignment_id_01", "assignment_id_02"],
        };

        const requestAsObject = createDeleteAssignmentsRequest(payload).toObject();

        expect(requestAsObject).toEqual<DeleteAssignmentsRequest.AsObject>(payload);
    });
});
