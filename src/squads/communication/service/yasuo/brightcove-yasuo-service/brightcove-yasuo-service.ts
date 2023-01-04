import brightcoveYasuo from "./brightcove-yasuo-reader.mutation";

import { defineService } from "@manabie-com/react-utils";

export const brightcoveService = defineService({
    query: {
        communicationGetProfile: () => {
            return brightcoveYasuo.retrieveBrightcoveProfileData();
        },
    },
});
