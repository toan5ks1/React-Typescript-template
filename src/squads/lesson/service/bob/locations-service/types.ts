import {
    RetrieveLowestLevelLocationsRequest,
    RetrieveLowestLevelLocationsResponse,
} from "manabuf/bob/v1/masterdata_pb";

export declare namespace NsLesson_Bob_LocationService {
    export interface RetrieveLowestLocationsRequest
        extends RetrieveLowestLevelLocationsRequest.AsObject {}
    export interface RetrieveLocationsResponseLocation
        extends RetrieveLowestLevelLocationsResponse.Location.AsObject {}
}
