import {
    ScanResponse,
    ScanRequest,
    DeleteEntryExitRequest,
    DeleteEntryExitResponse,
    CreateEntryExitRequest,
    CreateEntryExitResponse,
    UpdateEntryExitRequest,
    UpdateEntryExitResponse,
    EntryExitPayload,
    GenerateBatchQRCodesRequest,
    GenerateBatchQRCodesResponse,
} from "manabuf/entryexitmgmt/v1/entry_exit_pb";

export declare namespace NsStudentEntryExitService {
    export interface ScanRequest extends ScanRequest.AsObject {}
    export interface ScanResponse extends ScanResponse.AsObject {}

    export interface CreateEntryExitRequest extends CreateEntryExitRequest.AsObject {}
    export interface CreateEntryExitResponse extends CreateEntryExitResponse.AsObject {}

    export interface UpdateEntryExitRequest extends UpdateEntryExitRequest.AsObject {}
    export interface UpdateEntryExitResponse extends UpdateEntryExitResponse.AsObject {}

    export interface EntryExitPayload extends EntryExitPayload.AsObject {}

    export interface DeleteEntryExitRequest extends DeleteEntryExitRequest.AsObject {}
    export interface DeleteEntryExitResponse extends DeleteEntryExitResponse.AsObject {}

    export interface GenerateStudentQrCodesRequest extends GenerateBatchQRCodesRequest.AsObject {}
    export interface GenerateStudentQrCodesResponse extends GenerateBatchQRCodesResponse.AsObject {}
}
