import { NsMasterDataReaderService } from "src/services/master/master-reader-service-master/types";

export interface GlobalLocationItem extends NsMasterDataReaderService.LocationObjectResponse {}
export interface GlobalLocationTreeNode extends GlobalLocationItem {
    children?: GlobalLocationTreeNode[];
    // These props are for checkbox UI only
    indeterminate: boolean;
    isChecked: boolean;
}

export interface GlobalLocationTypeItem
    extends NsMasterDataReaderService.LocationTypeObjectResponse {}

export interface GlobalLocationTypeWithLocations extends GlobalLocationTypeItem {
    locations: GlobalLocationItem[];
}
