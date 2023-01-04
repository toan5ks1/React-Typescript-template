import { KeyMediaTypes } from "src/common/constants/const";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import {
    InheritedGrpcServiceClient,
    MutationParams,
} from "src/squads/lesson/service/service-types";

import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";
import { ConvertMediaRequest } from "manabuf/bob/v1/classes_pb";
import { MediaType } from "manabuf/bob/v1/enums_pb";
import { Media as MediaV1 } from "manabuf/bob/v1/media_pb";

import { NsLesson_Bob_ClassesService } from "./types";

export function newConvertMediaReq(data: Required<NsLesson_Bob_ClassesService.ConvertMedia>) {
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

class ClassModifierServiceBob extends InheritedGrpcServiceClient<ClassModifierServicePromiseClient> {
    async convertMedia({ data }: MutationParams<NsLesson_Bob_ClassesService.ConvertMedia>) {
        const request = newConvertMediaReq(
            data as Required<NsLesson_Bob_ClassesService.ConvertMedia>
        );

        await this._call("convertMedia", request);

        return { data: { id: null } };
    }
}

const classModifierServiceBob = new ClassModifierServiceBob(
    ClassModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default classModifierServiceBob;
