import {
    Lesson_LocationIdsByCourseIdV2QueryVariables,
    LocationListByIdsQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { defineService } from "src/squads/syllabus/services/service-creator";

import locationQueryBob from "./location-bob.query";

export const locationService = defineService({
    query: {
        lessonLocationGetMany: (params: LocationListByIdsQueryVariables) => {
            return locationQueryBob.getManyQuery(params);
        },
        lessonLocationIdsByCourseId: (params: Lesson_LocationIdsByCourseIdV2QueryVariables) => {
            return locationQueryBob.getLocationIdsByCourseId(params);
        },
    },
});
