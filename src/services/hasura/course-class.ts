import { ProviderTypes } from "src/common/constants/enum";
import { courseClassQueriesBob } from "src/services/bob/course-class-service-bob";
import { AppPagination, ListQuery } from "src/services/service-types";
import { RaSort } from "src/typings/react-admin";

import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.LIST_WITH_FILTER;
    payload: ListQuery<
        Parameters<typeof courseClassQueriesBob.getListWithFilter>[0],
        RaSort,
        AppPagination
    >;
};

const hasuraCourseClass = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;

            return courseClassQueriesBob.getListWithFilter({
                course_id: filter?.course_id || "",
                location_id: filter?.location_id || "",
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraCourseClass;
