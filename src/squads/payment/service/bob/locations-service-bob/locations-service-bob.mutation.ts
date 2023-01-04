import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { newRetrieveLowestLevelLocationsReq } from "./locations-service-bob.request";
import { NsBobLocationService } from "./types";

class LocationServiceBob extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
    async retrieveLowestLevelLocations(
        params: NsBobLocationService.RetrieveLowestLocationsRequest
    ) {
        const req = newRetrieveLowestLevelLocationsReq(params);
        const resp = await this._call("retrieveLowestLevelLocations", req);
        return { data: resp.toObject().locationsList };
    }
}

const locationServiceBob = new LocationServiceBob(
    MasterDataReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default locationServiceBob;
