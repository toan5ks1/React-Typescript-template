import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { MasterDataReaderServicePromiseClient } from "manabuf/mastermgmt/v1/masterdata_grpc_web_pb";

import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "./master-reader-master.request";

class MasterReaderServiceMaster extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
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

const masterReaderServiceMaster = new MasterReaderServiceMaster(
    MasterDataReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default masterReaderServiceMaster;
