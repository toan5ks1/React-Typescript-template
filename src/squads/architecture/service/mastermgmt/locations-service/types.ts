import { MasterCategoryType } from "src/squads/architecture/common/constants/master";

import { ImportLocationResponse } from "manabuf/mastermgmt/v1/masterdata_pb";

export declare namespace NsArchitecture_Mastermgmt_LocationsService {
    export interface ImportMasterDataRequest {
        payload: {
            file: File;
            category: MasterCategoryType;
        };
    }
    export interface ImportMasterResponse extends ImportLocationResponse.AsObject {}
}
