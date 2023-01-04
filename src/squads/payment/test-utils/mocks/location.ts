import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { Payment_GetLocationNameByLocationIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export const createMockLocation = (): ArrayElement<
    Payment_GetLocationNameByLocationIdQuery["locations"]
> => {
    return {
        name: "HCM",
    };
};

export const createMockCenterChoices =
    (): NsBobLocationService.RetrieveLocationsResponseLocation[] => [
        {
            locationId: "1",
            name: "HCM",
        },
        {
            locationId: "2",
            name: "HN",
        },
    ];
