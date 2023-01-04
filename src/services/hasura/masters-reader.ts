import { ProviderTypes } from "src/common/constants/enum";

import masterReaderServiceMaster from "../master/master-reader-service-master";
import {
    MasterDataTypes,
    NsMasterDataReaderService,
} from "../master/master-reader-service-master/types";
import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.MANY;
    payload: NsMasterDataReaderService.ReaderDataMasterRequest;
};

const hasuraMastersReader = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY: {
            const {
                filter: { type },
            } = params.payload;

            switch (type) {
                case MasterDataTypes.Location:
                    return masterReaderServiceMaster.retrieveLocations();
                case MasterDataTypes.LocationType:
                    return masterReaderServiceMaster.retrieveLocationTypes();
                default:
                    return getEmptyResponse();
            }
        }
        default:
            return getEmptyResponse();
    }
};

export default hasuraMastersReader;
