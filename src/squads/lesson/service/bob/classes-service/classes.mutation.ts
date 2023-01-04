import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsLesson_Bob_ClassesService } from "src/squads/lesson/service/bob/classes-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";

import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { Media, UpsertMediaRequest } from "manabie-bob/class_pb";

export function newUpsertMediaReq(data: Required<NsLesson_Bob_ClassesService.UpsertMedia[]>) {
    const req = new UpsertMediaRequest();
    const arrData = toArr(data);

    arrData.forEach((e: NsLesson_Bob_ClassesService.UpsertMedia) => {
        const media = new Media();

        media.setName(e.name);
        media.setResource(e.resource);
        media.setType(e.type);

        req.addMedia(media);
    });

    return req;
}

export class ClassMutationBob extends InheritedGrpcServiceClient<ClassPromiseClient> {
    async upsertMedia(data: NsLesson_Bob_ClassesService.UpsertMedia[]) {
        const req = newUpsertMediaReq(data!);

        const resp = await this._call("upsertMedia", req);

        const respObject = resp.toObject();

        return { data: { ...respObject, id: respObject.mediaIdsList[0] } };
    }
}

const classMutationServiceBob = new ClassMutationBob(
    ClassPromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default classMutationServiceBob;
