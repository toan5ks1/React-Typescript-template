import { Entities, ProviderTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import {
    MasterDataTypes,
    NsMasterDataReaderService,
} from "src/services/master/master-reader-service-master/types";
import { GlobalLocationTypeWithLocations } from "src/typings/locations-provider";

import useQueryV2, { UseQueryOptions, UseQueryReturn } from "src/hooks/data/useQueryV2";
import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

export interface FetchGlobalLocationsTypesDataMappedType {
    locationTypesMap: Map<
        GlobalLocationTypeWithLocations["locationTypeId"],
        GlobalLocationTypeWithLocations
    >;
}

export type UseFetchGlobalLocationTypesReturns =
    UseQueryReturn<FetchGlobalLocationsTypesDataMappedType>;

export default function useFetchGlobalLocations(
    options?: UseQueryOptions<
        NsMasterDataReaderService.LocationTypeObjectResponse[],
        FetchGlobalLocationsTypesDataMappedType
    >,
    contextName?: string
) {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return useQueryV2<
        NsMasterDataReaderService.LocationTypeObjectResponse[],
        FetchGlobalLocationsTypesDataMappedType
    >(
        {
            entity: Entities.MASTERS_READER,
            action: ProviderTypes.MANY,
            params: {
                filter: {
                    type: MasterDataTypes.LocationType,
                    contextName,
                },
            },
        },
        {
            onError: (err) => {
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t(error.message)} ${Entities.MASTERS_READER} - ${ProviderTypes.MANY} - ${
                        MasterDataTypes.LocationType
                    }`,
                    "error"
                );
                window.warner?.warn("Fetch global locations unsuccessfully", error);
            },
            selector: (locationTypes) => {
                const locationTypesMap = new Map<
                    GlobalLocationTypeWithLocations["locationTypeId"],
                    GlobalLocationTypeWithLocations
                >();
                locationTypes.forEach((locationType) => {
                    locationTypesMap.set(locationType.locationTypeId, {
                        ...locationType,
                        locations: [],
                    });
                });
                return {
                    locationTypesMap,
                };
            },
            ...options,
        }
    );
}
