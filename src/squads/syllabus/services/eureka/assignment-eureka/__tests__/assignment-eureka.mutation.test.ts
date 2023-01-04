import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { AssignmentModifierServicePromiseClient } from "manabuf/eureka/v1/assignment_writer_grpc_web_pb";

import assignmentModifierServiceEureka from "../assignment-eureka.mutation";
import {
    createDeleteAssignmentsRequest,
    createUpsertAssignmentRequest,
    createUpsertAssignmentRequestV2,
} from "../assignment-eureka.request";
import { createMockDataUpsertAssignment } from "./data";

jest.mock("src/internals/feature-controller");

describe(assignmentModifierServiceEureka.upsertAssignment.name, () => {
    it("should return correct data after success", async () => {
        const response = genId();
        const payload = createMockDataUpsertAssignment();
        createMockClass<AssignmentModifierServicePromiseClient>(
            AssignmentModifierServicePromiseClient,
            { upsertAssignment: () => createFakeProtoResponse(response) }
        );

        const request = createUpsertAssignmentRequest(payload);

        const result = await assignmentModifierServiceEureka.upsertAssignment(payload);

        expect(result).toEqual(response);
        expect(AssignmentModifierServicePromiseClient.prototype.upsertAssignment).toBeCalledWith(
            request
        );
    });
});

describe(assignmentModifierServiceEureka.upsertAssignmentV2.name, () => {
    it("should return correct data after success", async () => {
        const response = "respone_upsertAssignments";
        const payload = createMockDataUpsertAssignment();
        createMockClass<AssignmentModifierServicePromiseClient>(
            AssignmentModifierServicePromiseClient,
            { upsertAssignments: () => createFakeProtoResponse(response) }
        );

        const request = createUpsertAssignmentRequestV2(payload);

        const result = await assignmentModifierServiceEureka.upsertAssignmentV2(payload);

        expect(result).toEqual(response);
        expect(AssignmentModifierServicePromiseClient.prototype.upsertAssignments).toBeCalledWith(
            request
        );
    });
});

describe(assignmentModifierServiceEureka.deleteAssignments.name, () => {
    it("should return correct request and response after success", async () => {
        const response = genId();

        createMockClass<AssignmentModifierServicePromiseClient>(
            AssignmentModifierServicePromiseClient,
            {
                deleteAssignments: () => createFakeProtoResponse(response),
            }
        );

        const request = createDeleteAssignmentsRequest({ assignmentIdsList: ["assignment_id"] });

        const result = await assignmentModifierServiceEureka.deleteAssignments({
            assignmentIdsList: ["assignment_id"],
        });

        expect(result).toEqual(response);
        expect(AssignmentModifierServicePromiseClient.prototype.deleteAssignments).toBeCalledWith(
            request
        );
    });
});
