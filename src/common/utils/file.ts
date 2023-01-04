import accepts from "attr-accept";
import { KeyMediaTypes } from "src/common/constants/const";
import { MIMETypes } from "src/common/constants/enum";

import { MediaType } from "manabie-bob/enum_pb";

import { FILE_SIZE_UNITS, GIGABYTE, MEGABYTE } from "../constants/file-size";

import isNil from "lodash/isNil";
import type { Media } from "src/__generated__/root-types";

export interface ValidateTypeSchema {
    minSize?: number;
    maxSize: number;
    accept: string | string[];
}

export interface ConvertByteReturn {
    size: number;
    unit: string;
}

export const getFileExtension = (filename: string) => {
    return filename.split(".").pop() || "";
};

export const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(`.${getFileExtension(filename)}`, "");
};

export function getFileSize(e: File) {
    return e.size;
}

//convert byte to MB or GB
export function convertByte(byte?: number): ConvertByteReturn {
    if (!byte) return { size: 0, unit: "" };

    if (byte >= GIGABYTE) {
        return { size: Math.ceil(byte / GIGABYTE), unit: FILE_SIZE_UNITS.GB };
    } else {
        return { size: Math.ceil(byte / MEGABYTE), unit: FILE_SIZE_UNITS.MB };
    }
}

export const toBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
const base64ToPayload = (base64: string): string => {
    return base64.split(",")[1];
};

export const fileToPayload = async (file: File) => {
    const data = await toBase64(file);
    return base64ToPayload(String(data));
};

export const fileMatchSize = (file: File, minSize?: number, maxSize?: number): boolean => {
    if (!isNil(file.size)) {
        if (minSize && maxSize) return file.size >= minSize && file.size <= maxSize;
        if (minSize) return file.size >= minSize;
        if (maxSize) return file.size <= maxSize;
    }
    return true;
};

export const fileAccepted = (file: File, accept: string | string[]): boolean => {
    return file.type === "application/x-moz-file" || accepts(file, accept);
};

export const filterFiles = (files: File[], validateSchema: ValidateTypeSchema[]): File[] => {
    const schemaSize = validateSchema.length;
    let acceptedFiles: File[] = [];
    if (!files || !files.length) return acceptedFiles;

    files.forEach((file) => {
        for (let i = 0; i < schemaSize; i++) {
            const { minSize, maxSize, accept } = validateSchema[i];
            const isAccepted = fileMatchSize(file, minSize, maxSize) && fileAccepted(file, accept);
            if (isAccepted) acceptedFiles.push(file);
        }
    });
    return acceptedFiles;
};

export type FilterUploadFiles = File | Media;

export const isMedia = (media: FilterUploadFiles): media is Media => {
    return (media as Media).media_id !== undefined;
};

export const filterUploadFiles = (files: FilterUploadFiles[]) => {
    const alreadyUploadedMediaIds: string[] = [];
    const filesNeedToBeUploaded: File[] = [];
    for (let i = 0; i < files.length; i++) {
        const current = files[i];
        if (isMedia(current)) {
            alreadyUploadedMediaIds.push(current.media_id);
            continue;
        }
        if (current instanceof File) {
            filesNeedToBeUploaded.push(current);
        }
    }
    return { alreadyUploadedMediaIds, filesNeedToBeUploaded };
};

export const MapMediaMIMETypes = {
    [MIMETypes.PDF]: KeyMediaTypes?.MEDIA_TYPE_PDF,
    [MIMETypes.VIDEO]: KeyMediaTypes?.MEDIA_TYPE_VIDEO,
    [MIMETypes.AUDIO]: KeyMediaTypes?.MEDIA_TYPE_AUDIO,
    [MIMETypes.IMAGE]: KeyMediaTypes?.MEDIA_TYPE_IMAGE,
};

export function getCheckFileTypeFn(fileType: MIMETypes) {
    return ({ type }: { type?: string }) => {
        return accepts({ type }, fileType) || MapMediaMIMETypes[fileType] === type;
    };
}

export const isImage = getCheckFileTypeFn(MIMETypes.IMAGE);
export const isVideo = getCheckFileTypeFn(MIMETypes.VIDEO);
export const isPdf = getCheckFileTypeFn(MIMETypes.PDF);
export const isAudio = getCheckFileTypeFn(MIMETypes.AUDIO);

export const groupBy = ({ files }: { files: File[] }) => {
    let others: File[] = [];
    const videos = files.filter((file) => {
        if (isVideo({ type: file.type })) return file;
        others.push(file);
    });
    return { others, videos };
};
export const findMediaType = (type: string): MediaType => {
    if (isImage({ type })) return MediaType.MEDIA_TYPE_IMAGE;
    if (isPdf({ type })) return MediaType.MEDIA_TYPE_PDF;
    if (isAudio({ type })) return MediaType.MEDIA_TYPE_AUDIO;
    if (isVideo({ type })) return MediaType.MEDIA_TYPE_VIDEO;
    return MediaType.MEDIA_TYPE_NONE;
};

export interface AttachmentInfo {
    type: MediaType;
    name: string;
    resource: string;
}
export const matchingUpsertMedia = ({
    url,
    type,
    name,
}: {
    url: string;
    type: string;
    name: string;
}): AttachmentInfo => ({
    name,
    type: findMediaType(type),
    resource: url,
});
