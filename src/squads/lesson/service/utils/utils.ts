import { ArrayElement } from "src/common/constants/types";
import { Media } from "src/squads/lesson/common/types";
import { ArrayOrSetValue } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { NsLesson_Bob_UploadService } from "src/squads/lesson/service/bob/upload-service/types";

import { Paging } from "manabuf/common/v1/requests_pb";

export function createEmptyResponse<T = any>(resp: T): Promise<T> {
    return Promise.resolve(resp);
}

export function getEmptyResponse() {
    return createEmptyResponse({
        data: {
            id: null,
        },
    });
}

export function getSearchString(text: string | null | undefined) {
    if (!text) return undefined;
    return `%${text}%`;
}

/**
 * Convert to "Paging" proto with only limit and offset
 *
 * @param paging paging object {limit: number; offsetInteger: number; offsetString: string; ...}
 * @returns proto class "Paging"
 */
export const toBasicPagingProto = (paging: Paging.AsObject) => {
    const result = new Paging();

    result.setLimit(paging.limit);

    // We only set the offset by one of 2 things, string or integer
    if (Boolean(paging.offsetString)) result.setOffsetString(paging.offsetString);
    else result.setOffsetInteger(paging.offsetInteger);

    return result;
};

export const toNonUndefinedArrayValueList = <T extends ArrayElement<ArrayOrSetValue>>(
    valuesList: T[] | undefined
): T[] => {
    if (valuesList && Array.isArray(valuesList)) return valuesList.map((value) => value);

    return [];
};

export const getFileExtension = (filename: string) => {
    return filename.split(".").pop() || "";
};

export const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(`.${getFileExtension(filename)}`, "");
};

export const isMedia = (media: NsLesson_Bob_UploadService.FilterUploadFiles): media is Media => {
    return (media as Media).media_id !== undefined;
};

export const filterUploadFiles = (files: NsLesson_Bob_UploadService.FilterUploadFiles[]) => {
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
