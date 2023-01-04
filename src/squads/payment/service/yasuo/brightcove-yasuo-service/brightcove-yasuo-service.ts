import { defineService } from "@manabie-com/react-utils";
import brightcoveYasuo from "src/squads/payment/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-reader.query";

export const brightcoveService = defineService({
    query: {
        paymentGetBrightcoveProfile: () => {
            return brightcoveYasuo.retrieveBrightcoveProfileData();
        },
    },
});
