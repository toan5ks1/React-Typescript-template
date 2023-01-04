import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/architecture/service/service-types";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";
import {
    RetrieveLocationsRequest,
    RetrieveLocationTypesRequest,
} from "manabuf/bob/v1/masterdata_pb";

export const retrieveLocationsRequest = () => {
    return new RetrieveLocationsRequest();
};

export const retrieveLocationTypesRequest = () => {
    return new RetrieveLocationTypesRequest();
};

class MasterReaderServiceBob extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
    async retrieveLocations() {
        const req = retrieveLocationsRequest();
        const resp = await this._call("retrieveLocations", req);

        return {
            data: resp ? resp.toObject().locationsList : [],
        };
    }

    async retrieveLocationTypes() {
        const req = retrieveLocationTypesRequest();
        const resp = await this._call("retrieveLocationTypes", req);
        return {
            data: resp ? resp.toObject().locationTypesList : [],
        };
    }
}

const masterReaderServiceBob = new MasterReaderServiceBob(
    MasterDataReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default masterReaderServiceBob;
