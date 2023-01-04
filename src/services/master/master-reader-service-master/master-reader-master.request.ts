import {
    RetrieveLocationsRequest,
    RetrieveLocationTypesRequest,
} from "manabuf/mastermgmt/v1/masterdata_pb";

export const retrieveLocationsRequest = () => {
    return new RetrieveLocationsRequest();
};

export const retrieveLocationTypesRequest = () => {
    return new RetrieveLocationTypesRequest();
};
