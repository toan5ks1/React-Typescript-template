import { MediaHasura } from "src/squads/syllabus/models/media";

import { toBase64, convertByte, getFileExtension } from "@manabie-com/mana-utils";
import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export { toBase64, convertByte, getFileExtension };

export type MediaType = Media | MediaHasura;

export type FilterUploadFiles = File | MediaType;

export const isMedia = (media: FilterUploadFiles): media is MediaType => {
    return (media as MediaType).media_id !== undefined;
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
