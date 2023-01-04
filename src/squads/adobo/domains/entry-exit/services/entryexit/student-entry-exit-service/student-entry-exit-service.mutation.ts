import { toTimestampNewProto } from "src/common/utils/timezone";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { validateDeleteEntryExitReq } from "src/squads/adobo/domains/entry-exit/services/entryexit/utils/validation";
import { InheritedGrpcServiceClient } from "src/squads/adobo/domains/entry-exit/services/service-types";

import { EntryExitServicePromiseClient } from "manabuf/entryexitmgmt/v1/entry_exit_grpc_web_pb";
import {
    CreateEntryExitRequest,
    DeleteEntryExitRequest,
    EntryExitPayload,
    ScanRequest,
    GenerateBatchQRCodesRequest,
    UpdateEntryExitRequest,
} from "manabuf/entryexitmgmt/v1/entry_exit_pb";
import { Timestamp as NewTimestamp } from "manabuf/google/protobuf/timestamp_pb";

import { NsStudentEntryExitService } from "./types";

export function scanStudentEntryExit(record: NsStudentEntryExitService.ScanRequest) {
    const req = new ScanRequest();

    const timeMS = Date.now();
    const timestamp = new NewTimestamp();
    timestamp.setSeconds(Math.floor(timeMS / 1000));
    timestamp.setNanos((timeMS % 1000) * 1e6);

    req.setQrcodeContent(record.qrcodeContent);
    req.setTouchTime(timestamp);

    return req;
}

export function createEntryExitReq(
    entryExitRecord: NsStudentEntryExitService.CreateEntryExitRequest
) {
    const req = new CreateEntryExitRequest();
    const payload = new EntryExitPayload();

    payload.setStudentId(entryExitRecord.entryExitPayload!.studentId);
    payload.setEntryDateTime(
        toTimestampNewProto({
            originDate: entryExitRecord.entryExitPayload?.entryDateTime,
            origin: false,
            start: true,
            type: null,
        })
    );

    if (entryExitRecord.entryExitPayload?.exitDateTime) {
        payload.setExitDateTime(
            toTimestampNewProto({
                originDate: entryExitRecord.entryExitPayload?.exitDateTime,
                origin: false,
                start: false,
                type: null,
            })
        );
    }

    if (entryExitRecord.entryExitPayload?.notifyParents) {
        payload.setNotifyParents(true);
    } else {
        payload.setNotifyParents(false);
    }

    req.setEntryExitPayload(payload);

    return req;
}

export function updateEntryExitReq(
    entryExitRecord: NsStudentEntryExitService.UpdateEntryExitRequest
) {
    const req = new UpdateEntryExitRequest();
    const payload = new EntryExitPayload();

    payload.setStudentId(entryExitRecord.entryExitPayload!.studentId);
    req.setEntryexitId(entryExitRecord.entryexitId);

    payload.setEntryDateTime(
        toTimestampNewProto({
            originDate: entryExitRecord.entryExitPayload?.entryDateTime,
            origin: false,
            start: true,
            type: null,
        })
    );

    if (entryExitRecord.entryExitPayload?.exitDateTime) {
        payload.setExitDateTime(
            toTimestampNewProto({
                originDate: entryExitRecord.entryExitPayload?.exitDateTime,
                origin: false,
                start: false,
                type: null,
            })
        );
    }

    payload.setNotifyParents(!!entryExitRecord.entryExitPayload?.notifyParents);

    req.setEntryExitPayload(payload);

    return req;
}

export function deleteEntryExitReq(
    entryExitRecord: NsStudentEntryExitService.DeleteEntryExitRequest
) {
    validateDeleteEntryExitReq(entryExitRecord);
    let req = new DeleteEntryExitRequest();

    req.setEntryexitId(entryExitRecord.entryexitId);
    req.setStudentId(entryExitRecord.studentId);

    return req;
}

export function newGeneratedStudentQrCodes(
    record: NsStudentEntryExitService.GenerateStudentQrCodesRequest
) {
    const req = new GenerateBatchQRCodesRequest();

    req.setStudentIdsList(record.studentIdsList);

    return req;
}

class StudentEntryExitService extends InheritedGrpcServiceClient<EntryExitServicePromiseClient> {
    async scanStudentEntryExit(data: NsStudentEntryExitService.ScanRequest) {
        const req = scanStudentEntryExit(data);

        const resp = await this._call("scan", req);

        return resp.toObject();
    }

    async createStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.CreateEntryExitRequest
    ) {
        const req = createEntryExitReq(entryExitRecord);

        const resp = await this._call("createEntryExit", req);

        return resp.toObject();
    }

    async updateStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.UpdateEntryExitRequest
    ) {
        const req = updateEntryExitReq(entryExitRecord);

        const resp = await this._call("updateEntryExit", req);

        return resp.toObject();
    }

    async deleteStudentEntryExit(
        entryExitRecord: NsStudentEntryExitService.DeleteEntryExitRequest
    ) {
        const req = deleteEntryExitReq(entryExitRecord);

        const resp = await this._call("deleteEntryExit", req);

        return resp.toObject();
    }

    async generateStudentsQrCodes(data: NsStudentEntryExitService.GenerateStudentQrCodesRequest) {
        const req = newGeneratedStudentQrCodes(data);

        const resp = await this._call("generateBatchQRCodes", req);

        return resp.toObject();
    }
}

const studentEntryExitService = new StudentEntryExitService(
    EntryExitServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default studentEntryExitService;
