import { getFileNameWithoutExtension, getFileExtension } from "src/common/utils/file";

import { Media, UpsertMediaRequest } from "manabie-bob/class_pb";
import { ResumableUploadURLRequest } from "manabuf/bob/v1/uploads_pb";
import { Duration } from "manabuf/google/protobuf/duration_pb";

import { toArr } from "../../../common/utils/other";
import { NsBobUploadReaderService } from "./types";

export function newUpsertMediaReq(data: Required<NsBobUploadReaderService.UpsertMedia[]>) {
    const req = new UpsertMediaRequest();
    const arrData = toArr(data);

    arrData.forEach((e: NsBobUploadReaderService.UpsertMedia) => {
        const media = new Media();

        media.setName(e.name);
        media.setResource(e.resource);
        media.setType(e.type);

        req.addMedia(media);
    });

    return req;
}

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
