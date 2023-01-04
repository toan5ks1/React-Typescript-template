import accepts from "attr-accept";
import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";

import { MIMETypes } from "../../../common/constants/enum";

export const toBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
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
