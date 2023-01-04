import { Entities, MIMETypes } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import {
    ArchitectureCategory,
    ArchitectureReserveCategory,
    InvoiceCategory,
    OrderManagementCategory,
    UserSchoolGroupCategory,
} from "src/squads/payment/constants/master";
import { NsPaymentMasterImportService } from "src/squads/payment/service/payment/master-import-payment-service/types";

import { generateFiles } from "./file";

export const createMockMasterTypeOptions = (
    featuresGroup: "Architecture" | "Architecture_Reserved" | "User" | "OrderManagement" | "Invoice"
): OptionSelectType[] => {
    switch (featuresGroup) {
        case "Architecture":
            return [
                {
                    id: ArchitectureCategory.Location,
                    value: ArchitectureCategory.Location,
                    label: "Location",
                },
                {
                    id: ArchitectureCategory.LocationType,
                    value: ArchitectureCategory.LocationType,
                    label: "LocationType",
                },
                {
                    id: ArchitectureCategory.Class,
                    value: ArchitectureCategory.Class,
                    label: "Class",
                },
            ];
        case "Architecture_Reserved":
            return [
                {
                    id: ArchitectureReserveCategory.Grade,
                    value: ArchitectureReserveCategory.Grade,
                    label: "Grade",
                },
            ];
        case "User":
            return [
                {
                    id: UserSchoolGroupCategory.School,
                    value: UserSchoolGroupCategory.School,
                    label: "School",
                },
            ];
        case "Invoice":
            return [
                {
                    id: InvoiceCategory.InvoiceSchedule,
                    value: InvoiceCategory.InvoiceSchedule,
                    label: "InvoiceSchedule",
                },
            ];
        default:
            return [];
    }
};

export const createMockCSVFiles = (count: number = 1) => {
    const fileSchemas = Array.from(Array(count), (_, i) => i + 1).map((number) => ({
        size: 300 * number,
        fileProperty: {
            type: MIMETypes.CSV,
        },
    }));

    return generateFiles(fileSchemas);
};

export const createMockMasterImportFile = (id: string = "1", isImporting: boolean = false) => {
    const file = createMockCSVFiles()[0];
    return {
        id: `${Entities.MASTERS}_${id}}`,
        file,
        isImporting,
    };
};

//services

export const createMockMasterImportPayload =
    (): NsPaymentMasterImportService.ImportMasterDataPayload => {
        const file = createMockCSVFiles()[0];

        return {
            file,
            category: OrderManagementCategory.AccountingCategory,
        };
    };

export const createMockMasterImportPayloadBob =
    (): NsPaymentMasterImportService.ImportMasterRequest["payload"] => {
        const file = createMockCSVFiles()[0];

        return {
            file,
            category: ArchitectureCategory.Location,
        };
    };
