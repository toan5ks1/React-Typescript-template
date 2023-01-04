import { fileToPayload } from "src/common/utils/file";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsMastermgmtGradeImportService } from "src/squads/payment/service/mastermgmt/grade-service/types";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";

import { GradeServicePromiseClient } from "manabuf/mastermgmt/v1/grades_grpc_web_pb";
import { ImportGradesRequest } from "manabuf/mastermgmt/v1/grades_pb";

export const getGradeImportRequest = async (
    data: NsMastermgmtGradeImportService.ImportGradesRequest
) => {
    const filePayload = await fileToPayload(data.payload.file);

    const request = new ImportGradesRequest();

    request.setPayload(filePayload);

    return request;
};

class GradeImportBobService extends InheritedGrpcServiceClient<GradeServicePromiseClient> {
    async importData(data: NsMastermgmtGradeImportService.ImportGradesRequest) {
        const request = await getGradeImportRequest(data);

        return this._call("importGrades", request!);
    }

    async importFile(data: NsMastermgmtGradeImportService.ImportGradesRequest) {
        const response = await this.importData(data);

        return response.toObject();
    }
}

const gradeImportModifierMutationService = new GradeImportBobService(
    GradeServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default gradeImportModifierMutationService;
