import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsLesson_Master_LocationsService } from "src/squads/lesson/service/master/locations-master-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";
import { RetrieveLowestLevelLocationsRequest } from "manabuf/bob/v1/masterdata_pb";

export function newRetrieveLowestLevelLocationsReq(
    params: NsLesson_Master_LocationsService.RetrieveLocationsRequest
): RetrieveLowestLevelLocationsRequest {
    const req = new RetrieveLowestLevelLocationsRequest();

    req.setName(params.name);
    req.setLimit(params.limit);
    req.setOffset(params.offset);

    return req;
}

class LocationReaderServiceMaster extends InheritedGrpcServiceClient<MasterDataReaderServicePromiseClient> {
    async retrieveLowestLevelLocations(
        params: NsLesson_Master_LocationsService.RetrieveLocationsRequest
    ) {
        const req = newRetrieveLowestLevelLocationsReq(params);
        const resp = await this._call("retrieveLowestLevelLocations", req);
        return { data: resp.toObject().locationsList };
    }
}

const locationsReaderServiceMaster = new LocationReaderServiceMaster(
    MasterDataReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default locationsReaderServiceMaster;
