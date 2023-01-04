import {
    RetrieveLocationsResponse,
    RetrieveLocationTypesResponse,
} from "manabuf/bob/v1/masterdata_pb";

export enum MasterDataTypes {
    AccountingCategory = "accountingCategory",
    Location = "location",
    LocationType = "locationType",
    School = "school",
}

export declare namespace NsLesson_Bob_MasterDataReaderService {
    export interface ReaderDataMasterRequest {
        filter: {
            type: MasterDataTypes;
        };
    }
    export interface LocationObjectResponse extends RetrieveLocationsResponse.Location.AsObject {}

    export interface LocationTypeObjectResponse
        extends RetrieveLocationTypesResponse.LocationType.AsObject {}
}
