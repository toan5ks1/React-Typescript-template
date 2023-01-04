import {
    RetrieveLocationsRequest,
    RetrieveLocationTypesRequest,
} from "manabuf/bob/v1/masterdata_pb";

export const retrieveLocationsRequest = () => {
    return new RetrieveLocationsRequest();
};

export const retrieveLocationTypesRequest = () => {
    return new RetrieveLocationTypesRequest();
};
