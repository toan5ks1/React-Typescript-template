import { AttachmentInfo } from "src/common/utils/file";

export declare namespace NsBobUploadReaderService {
    export interface ResumableUploadURLRequest {
        files: File[];
    }
    export interface UpsertMedia extends AttachmentInfo {}
}
