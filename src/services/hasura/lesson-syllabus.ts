import { ProviderTypes } from "src/common/constants/enum";

import { liveLessonBobQuery } from "../bob/live-lessons-service-bob";
import { createEmptyResponse, getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.MANY;
    payload: {
        filter: Parameters<typeof liveLessonBobQuery.getMany>[0];
    };
};

const lessonSyllabusService = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY: {
            const { course_id } = params.payload.filter;
            if (course_id) {
                return liveLessonBobQuery.getMany({
                    course_id,
                });
            }

            return createEmptyResponse({
                data: [],
                total: 0,
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default lessonSyllabusService;
