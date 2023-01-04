import { MIMETypes } from "src/common/constants/enum";
import {
    OrderManagementCategory,
    ArchitectureCategory,
} from "src/squads/architecture/common/constants/master";
import { NsArchitecture_Mastermgmt_LocationsService } from "src/squads/architecture/service/mastermgmt/locations-service/types";

import { generateFiles } from "./file";

export const createMockCSVFiles = (count: number = 1) => {
    const fileSchemas = Array.from(Array(count), (_, i) => i + 1).map((number) => ({
        size: 300 * number,
        fileProperty: {
            type: MIMETypes.CSV,
        },
    }));

    return generateFiles(fileSchemas);
};

export const createMockLocationImportPayload =
    (): NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest["payload"] => {
        const file = createMockCSVFiles()[0];

        return {
            file,
            category: ArchitectureCategory.Location,
        };
    };

export const createMockLocationImportPayloadInvalid =
    (): NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest["payload"] => {
        const file = createMockCSVFiles()[0];

        return {
            file,
            category: OrderManagementCategory.AccountingCategory,
        };
    };
