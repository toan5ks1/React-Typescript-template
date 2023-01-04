import { Entities, ProviderTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import {
    MasterDataTypes,
    NsMasterDataReaderService,
} from "src/services/master/master-reader-service-master/types";
import { GlobalLocationTreeNode } from "src/typings/locations-provider";

import useQueryV2, { UseQueryOptions, UseQueryReturn } from "src/hooks/data/useQueryV2";
import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

// This is the naive approach so it's quite inefficient
// I think it's N^(highest level), which is O n^3 but with descending n, although I'm not confident with this estimation
// If we use accessPath, it's probably possible for us to optimize this into an O(n) :thonking:
// TODO: try to refactor to optimize this. We can also move this selector out of this hook but I think it's not necessary at the moment
export const turnLocationArrayIntoTree = (
    locations: NsMasterDataReaderService.LocationObjectResponse[],
    rootId = "",
    populatedLocationsArrayRef: GlobalLocationTreeNode[]
): GlobalLocationTreeNode[] => {
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
            name: location.name,
            indeterminate: false,
            isChecked: false,
            children: turnLocationArrayIntoTree(
                possibleChildrenOfLocationsRoots,
                location.locationId,
                populatedLocationsArrayRef
            ),
        };
        populatedLocationsArrayRef.push(populatedLocation);
        return populatedLocation;
    });
};

export interface FetchGlobalLocationsDataMappedType {
    locationsTree: GlobalLocationTreeNode[];
    locationsArray: GlobalLocationTreeNode[];
    locationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>;
}

export type UseFetchGlobalLocationsReturns = UseQueryReturn<FetchGlobalLocationsDataMappedType>;

export default function useFetchGlobalLocations(
    options?: UseQueryOptions<
        NsMasterDataReaderService.LocationObjectResponse[],
        FetchGlobalLocationsDataMappedType
    >
) {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return useQueryV2<
        NsMasterDataReaderService.LocationObjectResponse[],
        FetchGlobalLocationsDataMappedType
    >(
        {
            entity: Entities.MASTERS_READER,
            action: ProviderTypes.MANY,
            params: {
                filter: {
                    type: MasterDataTypes.Location,
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
                let locationsArrayRef: GlobalLocationTreeNode[] = [];
                const locationsMap = new Map<
                    GlobalLocationTreeNode["locationId"],
                    GlobalLocationTreeNode
                >();
                const locationsTree = turnLocationArrayIntoTree(data, "", locationsArrayRef);
                locationsArrayRef.forEach((location) =>
                    locationsMap.set(location.locationId, location)
                );
                return { locationsArray: locationsArrayRef, locationsTree, locationsMap };
            },
            ...options,
        }
    );
}
