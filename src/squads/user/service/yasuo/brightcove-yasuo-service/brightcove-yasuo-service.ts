import { defineService } from "@manabie-com/react-utils";
import brightcoveYasuo from "src/squads/user/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-reader.query";

const brightcoveService = defineService({
    query: {
        userGetBrightcoveProfile: () => {
            return brightcoveYasuo.retrieveBrightcoveProfileData();
        },
    },
});

export default brightcoveService;
