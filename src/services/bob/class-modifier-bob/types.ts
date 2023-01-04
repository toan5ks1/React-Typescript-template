import { MediaType as MediaTypeV1 } from "manabuf/bob/v1/enums_pb";

export declare namespace NsBobModifierClassService {
    export interface ConvertMedia {
        mediaList: Array<{
            media_id?: string;
            name?: string;
            resource: string;
            type: keyof typeof MediaTypeV1;
        }>;
    }
}
