import { Entities, ProviderTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import {
    MasterDataTypes,
    NsMasterDataReaderService,
} from "src/services/master/master-reader-service-master/types";
import { GlobalLocationItem } from "src/typings/locations-provider";

import useQueryV2, { UseQueryOptions, UseQueryReturn } from "src/hooks/data/useQueryV2";
import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

export const convertLocationRootToLocationArray = (
    locations: NsMasterDataReaderService.LocationObjectResponse[],
    rootId = "",
    populatedLocationsArrayRef: GlobalLocationItem[]
): GlobalLocationItem[] => {
    if (locations.length === 0) return [];

    const locationsRoots: NsMasterDataReaderService.LocationObjectResponse[] = [];
    const possibleChildrenOfLocationsRoots: NsMasterDataReaderService.LocationObjectResponse[] = [];
    locations.forEach((location) => {
        const newNode: NsMasterDataReaderService.LocationObjectResponse = {
            ...location,
        };
        if (location.parentLocationId === rootId) {
            locationsRoots.push(newNode);
        } else possibleChildrenOfLocationsRoots.push(newNode);
    });

    return locationsRoots.map((location) => {
        const populatedLocation = {
            ...location,
            children: convertLocationRootToLocationArray(
                possibleChildrenOfLocationsRoots,
                location.locationId,
                populatedLocationsArrayRef
            ),
        };
        populatedLocationsArrayRef.push(populatedLocation);
        return populatedLocation;
    });
};

export type UseFetchGlobalLocationsReturns = UseQueryReturn<GlobalLocationItem[]>;

export default function useFetchGlobalLocationsArray(
    options?: UseQueryOptions<
        NsMasterDataReaderService.LocationObjectResponse[],
        GlobalLocationItem[]
    >,
    contextName?: string
) {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return useQueryV2<NsMasterDataReaderService.LocationObjectResponse[], GlobalLocationItem[]>(
        {
            entity: Entities.MASTERS_READER,
            action: ProviderTypes.MANY,
            params: {
                filter: {
                    type: MasterDataTypes.Location,
                    contextName,
                },
            },
        },
        {
            onError: (err) => {
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t(error.message)} ${Entities.MASTERS_READER} - ${ProviderTypes.MANY} - ${
                        MasterDataTypes.Location
                    }`,
                    "error"
                );
                window.warner?.warn("Fetch global locations unsuccessfully", error);
            },
            selector: (data) => {
                let locationsArrayRef: GlobalLocationItem[] = [];
                convertLocationRootToLocationArray(data, "", locationsArrayRef);

                return locationsArrayRef;
            },
            ...options,
        }
    );
}
