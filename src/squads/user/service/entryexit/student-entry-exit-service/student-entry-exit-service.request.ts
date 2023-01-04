import { toTimestampNewProto } from "src/common/utils/timezone";
import { validateDeleteEntryExitReq } from "src/squads/user/service/entryexit/utils/validation";

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

export function newStudentEntryExit(record: NsStudentEntryExitService.ScanRequest) {
    const req = new ScanRequest();

    // TODO: update based on user timezone
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
