import { defineService } from "src/squads/lesson/service/service-creator";

import brightcoveYasuo from "./brightcove-yasuo-reader.query";

export const brightcoveService = defineService({
    query: {
        lessonGetProfile: () => {
            return brightcoveYasuo.retrieveBrightcoveProfileData();
        },
    },
});
