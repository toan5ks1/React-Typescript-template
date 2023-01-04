import { getFileNameWithoutExtension, getFileExtension } from "src/common/utils/file";
import { toArr } from "src/common/utils/other";

import { Media, UpsertMediaRequest } from "manabie-bob/class_pb";
import { ResumableUploadURLRequest } from "manabuf/bob/v1/uploads_pb";
import { Duration } from "manabuf/google/protobuf/duration_pb";

import { NsBobUploadReaderService } from "./types";

export const createUpsertMediaRequest = (
    data: Required<NsBobUploadReaderService.UpsertMedia[]>
) => {
    const request = new UpsertMediaRequest();
    const arrData = toArr(data);

    arrData.forEach((mediaItem: NsBobUploadReaderService.UpsertMedia) => {
        const { name, resource, type } = mediaItem;
        const mediaIns = new Media();

        mediaIns.setName(name);
        mediaIns.setResource(resource);
        mediaIns.setType(type);

        request.addMedia(mediaIns);
    });

    return request;
};

export function newGenerateResumableUploadURLReq(file: File): ResumableUploadURLRequest {
    const { name, type } = file;
    const req = new ResumableUploadURLRequest();
    const duration = new Duration();

    duration.setSeconds(30 * 60);
    req.setExpiry(duration);
    req.setPrefixName(getFileNameWithoutExtension(name).replace(/\s/g, ""));
    req.setFileExtension(getFileExtension(name));
    req.setAllowOrigin(window.location.origin);

    req.setContentType(type);

    return req;
}
