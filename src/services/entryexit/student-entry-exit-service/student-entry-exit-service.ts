import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { EntryExitServicePromiseClient } from "manabuf/entryexitmgmt/v1/entry_exit_grpc_web_pb";

import {
    createEntryExitReq,
    newStudentEntryExit,
    newGeneratedStudentQrCodes,
    updateEntryExitReq,
    deleteEntryExitReq,
} from "./student-entry-exit-service.request";
import { NsStudentEntryExitService } from "./types";

class StudentEntryExitService extends InheritedGrpcServiceClient<EntryExitServicePromiseClient> {
    async scanStudentEntryExit(data: NsStudentEntryExitService.ScanRequest) {
        const req = newStudentEntryExit(data);

        const resp = await this._call("scan", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }

    async createStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.CreateEntryExitRequest
    ) {
        const req = createEntryExitReq(entryExitRecord);

        const resp = await this._call("createEntryExit", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }

    async updateStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.UpdateEntryExitRequest
    ) {
        const req = updateEntryExitReq(entryExitRecord);

        const resp = await this._call("updateEntryExit", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }

    async deleteStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.DeleteEntryExitRequest
    ) {
        const req = deleteEntryExitReq(entryExitRecord);

        const resp = await this._call("deleteEntryExit", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }

    async generateStudentsQrCodes(data: NsStudentEntryExitService.GenerateStudentQrCodesRequest) {
        const req = newGeneratedStudentQrCodes(data);

        const resp = await this._call("generateBatchQRCodes", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }
}

const studentEntryExitService = new StudentEntryExitService(
    EntryExitServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default studentEntryExitService;
