import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "./locations-service-bob.request";

class LocationServiceBob extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
    async retrieveLocations() {
        const req = retrieveLocationsRequest();
        const resp = await this._call("retrieveLocations", req);

        return resp ? resp.toObject().locationsList : [];
    }
    async retrieveLocationTypes() {
        const req = retrieveLocationTypesRequest();
        const resp = await this._call("retrieveLocationTypes", req);

        return resp ? resp.toObject().locationTypesList : [];
    }
}

const locationServiceBob = new LocationServiceBob(
    MasterDataReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default locationServiceBob;
