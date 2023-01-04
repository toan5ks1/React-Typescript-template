import { fileToPayload } from "src/common/utils/file";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { ArchitectureCategory } from "src/squads/architecture/common/constants/master";
import { NsArchitecture_Mastermgmt_LocationsService } from "src/squads/architecture/service/mastermgmt/locations-service/types";
import {
    InvalidParamError,
    InheritedGrpcServiceClient,
} from "src/squads/architecture/service/service-types";

import { LocationManagementGRPCServicePromiseClient } from "manabuf/mastermgmt/v1/masterdata_grpc_web_pb";
import {
    ImportLocationRequest,
    ImportLocationTypeRequest,
} from "manabuf/mastermgmt/v1/masterdata_pb";

export const newImportLocationRequest = async (
    data?: NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest
) => {
    if (!data || !data.payload || !data.payload.file || !data.payload.category) {
        throw new InvalidParamError({
            action: "LocationsManagementServiceMaster",
            serviceName: "mastermgmtGRPC",
            errors: [{ field: "payload" }],
        });
    }
    let request = null;
    if (data.payload.category === ArchitectureCategory.Location) {
        request = new ImportLocationRequest();
    } else if (data.payload.category === ArchitectureCategory.LocationType) {
        request = new ImportLocationTypeRequest();
    } else {
        throw new InvalidParamError({
            action: "LocationsManagementServiceMaster",
            serviceName: "mastermgmtGRPC",
            errors: [{ field: "category" }],
        });
    }
    const filePayload = await fileToPayload(data.payload.file);

    request?.setPayload(filePayload);

    return request;
};

class LocationsManagementServiceMaster extends InheritedGrpcServiceClient<LocationManagementGRPCServicePromiseClient> {
    async ImportMaster(params: NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest) {
        const request = await newImportLocationRequest(params);
        let resp = null;
        switch (params.payload.category) {
            case ArchitectureCategory.Location:
                resp = await this._call("importLocation", request);
                break;
            case ArchitectureCategory.LocationType:
                resp = await this._call("importLocationType", request);
                break;
        }
        return {
            data: resp ? resp.toObject() : null,
        };
    }
}

const locationsManagementServiceMaster = new LocationsManagementServiceMaster(
    LocationManagementGRPCServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default locationsManagementServiceMaster;
