import {
    RetrieveLowestLevelLocationsRequest,
    RetrieveLowestLevelLocationsResponse,
} from "manabuf/bob/v1/masterdata_pb";

export declare namespace NsLesson_Master_LocationsService {
    export interface RetrieveLocationsRequest
        extends RetrieveLowestLevelLocationsRequest.AsObject {}
    export interface RetrieveLocationsResponseLocation
        extends RetrieveLowestLevelLocationsResponse.Location.AsObject {}
}
