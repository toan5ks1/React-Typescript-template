import { StringKeyOf } from "ts-enum-util/src/types";

export enum MediaType {
    MEDIA_TYPE_NONE = 0,
    MEDIA_TYPE_VIDEO = 1,
    MEDIA_TYPE_IMAGE = 2,
    MEDIA_TYPE_PDF = 3,
    MEDIA_TYPE_AUDIO = 4,
}

export enum ConversionTaskStatus {
    CONVERSION_TASK_STATUS_INVALID = 0,
    CONVERSION_TASK_STATUS_WAITING = 1,
    CONVERSION_TASK_STATUS_CONVERTING = 2,
    CONVERSION_TASK_STATUS_FINISHED = 3,
    CONVERSION_TASK_STATUS_FAILED = 4,
}

export interface Media {
    comments?: string;
    conversion_tasks: any[];
    conversion_tasks_aggregate: any;
    converted_images?: string;
    created_at: Date;
    deleted_at?: Date;
    media_id: string;
    name?: string;
    resource?: string;
    resource_path?: string;
    type?: string;
    updated_at: Date;
}

export type UploadFilesType<T extends any = any> = File | Media | T;

export const isMedia = (media: UploadFilesType): media is Media => {
    return (media as Media).media_id !== undefined;
};

export function getKeyByValue<T extends Record<StringKeyOf<T>, number | string>>(
    enumObj: T,
    enumValue: string | number
): string | null {
    let keys = Object.keys(enumObj).filter((x) => enumObj[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}
