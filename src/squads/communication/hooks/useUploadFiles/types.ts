import { AttachmentInfo } from "src/common/utils/file";
import { Media } from "src/squads/communication/common/constants/types";

export type InputFile = Media | File;

export interface ResumableUploadURLRequest {
    files: File[];
}
export interface UpsertMedia extends AttachmentInfo {}

export interface UploadFilesReturn {
    mediaIds: string[];
    attachments: AttachmentInfo[];
}
