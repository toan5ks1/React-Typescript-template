import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { AssignmentModifierServicePromiseClient } from "manabuf/eureka/v1/assignment_writer_grpc_web_pb";

import { uploadReaderServiceBob } from "../../bob/upload-reader-service-bob";
import {
    createDeleteAssignmentsRequest,
    validateDeleteAssignments,
    validateUpsertAssignment,
    createUpsertAssignmentRequest,
    createUpsertAssignmentRequestV2,
} from "./assignment-eureka.request";
import { NsAssignmentEureka } from "./types";

class AssignmentEureka extends InheritedGrpcServiceClient<AssignmentModifierServicePromiseClient> {
    async upsertAssignment(data: NsAssignmentEureka.UpsertAssignment) {
        validateUpsertAssignment(data);

        const { mediaIds } = await uploadReaderServiceBob.filterAndUploadFiles(data.files || []);

        const req = createUpsertAssignmentRequest({ ...data, attachmentIds: mediaIds });

        const resp = await this._call("upsertAssignment", req);

        return resp.toObject();
    }

    async upsertAssignmentV2(data: NsAssignmentEureka.UpsertAssignment) {
        validateUpsertAssignment(data);

        const { mediaIds } = await uploadReaderServiceBob.filterAndUploadFiles(data.files || []);

        const req = createUpsertAssignmentRequestV2({ ...data, attachmentIds: mediaIds });

        const resp = await this._call("upsertAssignments", req);

        return resp.toObject();
    }

    async deleteAssignments(payload: NsAssignmentEureka.DeleteAssignments) {
        validateDeleteAssignments(payload);

        const request = createDeleteAssignmentsRequest(payload);

        const response = await this._call("deleteAssignments", request);

        return response.toObject();
    }
}

const assignmentModifierServiceEureka = new AssignmentEureka(
    AssignmentModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default assignmentModifierServiceEureka;
