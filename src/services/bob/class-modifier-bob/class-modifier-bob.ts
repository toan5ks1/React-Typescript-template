import appConfigs from "src/internals/configuration";

import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";

import { commonGrpcOptions } from "../../../internals/grpc";
import { MutationParams, InheritedGrpcServiceClient } from "../../service-types";
import { newConvertMediaReq, validateConvertMedia } from "./class-modifier-bob.request";
import { NsBobModifierClassService } from "./types";

class ClassModifierBob extends InheritedGrpcServiceClient<ClassModifierServicePromiseClient> {
    async convertMedia({ data }: MutationParams<NsBobModifierClassService.ConvertMedia>) {
        validateConvertMedia({ data });

        const req = newConvertMediaReq(data as Required<NsBobModifierClassService.ConvertMedia>);

        await this._call("convertMedia", req);

        return {
            data: {
                id: null,
            },
        };
    }
}

const classModifierServiceBob = new ClassModifierBob(
    ClassModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default classModifierServiceBob;
