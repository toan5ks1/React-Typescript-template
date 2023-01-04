import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { CustomBillingTaxType } from "src/squads/payment/types/service/tax-types";

export interface BillingFieldArrayItemType {
    name: string;
    taxItem?: CustomBillingTaxType;
    price: number;
}

export interface CustomBillingOrderFormValue {
    student: ArrayElement<Payment_GetStudentsManyV3Query["students"]>;
    location: NsBobLocationService.RetrieveLocationsResponseLocation;
    comment: string;
    billingFieldArrayItem: BillingFieldArrayItemType[];
}
