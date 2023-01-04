import { assignmentService } from "../assignment-service";
import {
    assignmentModifierServiceEureka,
    assignmentQueriesEureka,
    NsAssignmentEureka,
} from "../eureka/assignment-eureka";
import { createMockDataUpsertAssignment } from "../eureka/assignment-eureka/__tests__/data";
import { AssignmentOneQueryVariables, AssignmentsManyQueryVariables } from "../eureka/eureka-types";

jest.mock("src/squads/syllabus/services/eureka/assignment-eureka/assignment-eureka.query");
jest.mock("src/squads/syllabus/services/eureka/assignment-eureka/assignment-eureka.mutation");

describe(`test for upsert assignment ${assignmentService.mutation.syllabusAssignmentUpsert.name}`, () => {
    it("should return correct data after success", async () => {
        const payload = createMockDataUpsertAssignment();
        const resp = "response_upsertAssignment";

        (assignmentModifierServiceEureka.upsertAssignmentV2 as jest.Mock).mockResolvedValue(resp);

        const result = await assignmentService.mutation.syllabusAssignmentUpsert(payload);

        expect(assignmentModifierServiceEureka.upsertAssignmentV2).toBeCalledWith(payload);
        expect(result).toEqual(resp);
    });
});

describe(`test for query get one assignment ${assignmentService.query.syllabusAssignmentGetOne.name}`, () => {
    it("shouldn't call query and return undefined when missing identity", async () => {
        const result = await assignmentService.query.syllabusAssignmentGetOne({});

        expect(assignmentQueriesEureka.getOne).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after successfully query", async () => {
        const fakeQueryResponse = "fakeQueryResponse";
        (assignmentQueriesEureka.getOne as jest.Mock).mockResolvedValue(fakeQueryResponse);

        const params: AssignmentOneQueryVariables = { assignment_id: "assignment_id_01" };

        const result = await assignmentService.query.syllabusAssignmentGetOne(params);

        expect(assignmentQueriesEureka.getOne).toBeCalledWith(params);
        expect(result).toEqual(fakeQueryResponse);
    });
});

describe(`test for query get many assignment ${assignmentService.query.syllabusAssignmentGetMany.name}`, () => {
    it("shouldn't call query and return undefined when assignmentId is empty array", async () => {
        const result = await assignmentService.query.syllabusAssignmentGetMany({
            assignment_id: [],
        });

        expect(assignmentQueriesEureka.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });
    it("shouldn't call query and return undefined when missing assignmentId", async () => {
        const data = await assignmentService.query.syllabusAssignmentGetMany({});

        expect(assignmentQueriesEureka.getMany).not.toBeCalled();
        expect(data).toBeUndefined();
    });

    it("should return correct after successfully query", async () => {
        const fakeQueryResponse = "fakeQueryResponse";
        (assignmentQueriesEureka.getMany as jest.Mock).mockResolvedValue(fakeQueryResponse);

        const params: AssignmentsManyQueryVariables = { assignment_id: ["assignment_id_01"] };

        const result = await assignmentService.query.syllabusAssignmentGetMany(params);

        expect(assignmentQueriesEureka.getMany).toBeCalledWith(params);
        expect(result).toEqual(fakeQueryResponse);
    });
});

describe(`test for delete assignment ${assignmentService.mutation.syllabusDeleteAssignments.name}`, () => {
    const payload: NsAssignmentEureka.DeleteAssignments = {
        assignmentIdsList: ["assignment_id"],
    };

    it("should return correct response after success", async () => {
        const deleteAssignmentsResponse = "DeleteAssignmentsResponse";
        (assignmentModifierServiceEureka.deleteAssignments as jest.Mock).mockResolvedValue(
            deleteAssignmentsResponse
        );

        const result = await assignmentService.mutation.syllabusDeleteAssignments(payload);

        expect(assignmentModifierServiceEureka.deleteAssignments).toBeCalledWith(payload);
        expect(result).toEqual(deleteAssignmentsResponse);
    });
});
