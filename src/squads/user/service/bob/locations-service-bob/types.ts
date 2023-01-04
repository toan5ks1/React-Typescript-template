import {
    RetrieveLocationsResponse,
    RetrieveLocationTypesResponse,
} from "manabuf/bob/v1/masterdata_pb";

export declare namespace NsBobLocationService {
    export interface LocationObjectResponse extends RetrieveLocationsResponse.Location.AsObject {}

    export interface LocationTypeObjectResponse
        extends RetrieveLocationTypesResponse.LocationType.AsObject {}
}
