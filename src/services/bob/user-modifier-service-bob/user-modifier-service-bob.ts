import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { UserModifierServicePromiseClient } from "manabuf/bob/v1/users_grpc_web_pb";
import { ExchangeTokenRequest } from "manabuf/bob/v1/users_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { NsBobUserModifierService } from "./types";

class UserModifierServiceBob extends InheritedGrpcServiceClient<UserModifierServicePromiseClient> {
    async exchangeToken(data: NsBobUserModifierService.ExchangeToken) {
        const req = new ExchangeTokenRequest();

        req.setToken(data.token);

        const resp = await this._call("exchangeToken", req);

        return {
            data: resp.toObject(),
        };
    }
}

const userModifierServiceBob = new UserModifierServiceBob(
    UserModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default userModifierServiceBob;
