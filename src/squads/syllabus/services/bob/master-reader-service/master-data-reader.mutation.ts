import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "src/squads/syllabus/services/bob/master-reader-service/master-data-reader.request";

class MasterReaderServiceBob extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
    async retrieveLocations() {
        const req = retrieveLocationsRequest();
        const resp = await this._call("retrieveLocations", req);

        return resp ? resp.toObject().locationsList : [];
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
