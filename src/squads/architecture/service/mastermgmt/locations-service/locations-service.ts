import { NsArchitecture_Mastermgmt_LocationsService } from "src/squads/architecture/service/mastermgmt/locations-service/types";
import { defineService } from "src/squads/architecture/service/service-creator";

import locationsManagementServiceMaster from "src/squads/architecture/service/mastermgmt/locations-service/locations-management.mutation";

export const locationsServiceMaster = defineService({
    mutation: {
        importFile: (data: NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest) => {
            return locationsManagementServiceMaster.ImportMaster(data);
        },
    },
});
