import { Media } from "src/squads/lesson/common/types";

import {
    CreateBrightCoveUploadUrlRequest,
    FinishUploadBrightCoveRequest,
} from "manabie-yasuo/course_pb";
import { MediaType } from "manabuf/bob/v1/enums_pb";

export interface AttachmentInfo {
    type: MediaType;
    name: string;
    resource: string;
}

export declare namespace NsLesson_Bob_UploadService {
    export interface ResumableUploadURLRequest {
        files: File[];
    }
    export interface UpsertMedia extends AttachmentInfo {}

    export type FilterUploadFiles = File | Media;

    export interface FinishUploadBrightCoveRequest extends FinishUploadBrightCoveRequest.AsObject {}

    export interface CreateBrightCoveUploadUrlRequest
        extends CreateBrightCoveUploadUrlRequest.AsObject {}
}
