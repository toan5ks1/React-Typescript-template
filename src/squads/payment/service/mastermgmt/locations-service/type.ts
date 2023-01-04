import { MasterCategoryType } from "src/squads/payment/constants/master";

import { ImportLocationResponse } from "manabuf/mastermgmt/v1/masterdata_pb";

export declare namespace NsPaymentLocationsService {
    export interface ImportMasterDataRequest {
        payload: {
            file: File;
            category: MasterCategoryType;
        };
    }
    export interface ImportMasterResponse extends ImportLocationResponse.AsObject {}
}
