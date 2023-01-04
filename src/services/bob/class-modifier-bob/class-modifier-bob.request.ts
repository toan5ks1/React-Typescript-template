import { KeyMediaTypes } from "src/common/constants/const";

import { ConvertMediaRequest } from "manabuf/bob/v1/classes_pb";
import { MediaType } from "manabuf/bob/v1/enums_pb";
import { Media as MediaV1 } from "manabuf/bob/v1/media_pb";

import { formInvalidErr } from "../../../internals/errors";
import { NsBobModifierClassService } from "./types";

export function validateConvertMedia({ data }: { data?: NsBobModifierClassService.ConvertMedia }) {
    if (!data || !data.mediaList || !data.mediaList.length) {
        throw formInvalidErr;
    }
}

export function newConvertMediaReq(data: Required<NsBobModifierClassService.ConvertMedia>) {
    const req = new ConvertMediaRequest();

    data.mediaList = data.mediaList.filter((e) => e.type === KeyMediaTypes.MEDIA_TYPE_PDF);

    data.mediaList.forEach((media) => {
        const reqMedia = new MediaV1();
        reqMedia.setType(MediaType[media.type]);
        reqMedia.setResource(media.resource);

        if (media.name) reqMedia.setName(media.name);
        if (media.media_id) reqMedia.setMediaId(media.media_id);

        req.addMedia(reqMedia);
    });

    return req;
}
