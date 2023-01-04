import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import { AppError } from "src/squads/syllabus/internals/errors";
import { NsBobModifierClassService } from "src/squads/syllabus/services/bob/lesson-groups-bob/types";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";
import { ConvertMediaRequest } from "manabuf/bob/v1/classes_pb";
import { MediaType } from "manabuf/bob/v1/enums_pb";
import { Media as MediaV1 } from "manabuf/bob/v1/media_pb";

export function validateConvertMedia({ data }: { data?: NsBobModifierClassService.ConvertMedia }) {
    if (!data || !data.mediaList || !data.mediaList.length) {
        throw new AppError("ra.message.invalid_form");
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

class ClassModifierBob extends InheritedGrpcServiceClient<ClassModifierServicePromiseClient> {
    async convertMedia(data: NsBobModifierClassService.ConvertMedia) {
        validateConvertMedia({ data });

        const req = newConvertMediaReq(data);

        await this._call("convertMedia", req);

        return {
            data: {
                id: null,
            },
        };
    }
}

const lessonGroupsServiceBob = new ClassModifierBob(
    ClassModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonGroupsServiceBob;
