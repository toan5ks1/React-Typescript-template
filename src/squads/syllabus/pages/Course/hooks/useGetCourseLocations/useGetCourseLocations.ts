import { Entities } from "src/common/constants/enum";
import { LocationManyType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

export interface UseGetCourseLocationsProps {
    courseId: string | undefined;
}

export interface UseGetCourseLocationsReturn {
    locationIds: string[] | undefined;
    locations: LocationManyType[] | undefined;
    isLoading: boolean;
    updateCourseLocations: () => Promise<void>;
}

const useGetCourseLocations = (props: UseGetCourseLocationsProps): UseGetCourseLocationsReturn => {
    const { courseId } = props;
    const showSnackBar = useShowSnackbar();
    const t = useResourceTranslate(Entities.COURSES);

    const {
        data: locationIds,
        isLoading: isLoadingLocationIds,
        refetch: refetchLocationIds,
    } = inferQuery({
        entity: "location",
        action: "lessonLocationIdsByCourseId",
    })(
        {
            course: courseId,
        },
        {
            enabled: Boolean(courseId),
            selector(data) {
                if (data && arrayHasItem(data)) return data.map((location) => location.location_id);
                return [];
            },
            onError(error) {
                logger.warn(`useGetCourseLocation fetch location ids`, error);

                showSnackBar(t("unableToGetLocationIds"), "error");
            },
        }
    );

    const isNeedToQueryLocation = arrayHasItem(locationIds);

    const {
        data: locations,
        isLoading: isLoadingLocations,
        refetch: refetchLocations,
    } = inferQuery({
        entity: "location",
        action: "lessonLocationGetMany",
    })(
        {
            location_ids: locationIds,
        },
        {
            enabled: isNeedToQueryLocation,
            onError(error) {
                logger.warn(`useGetCourseLocation fetch locations`, error);

                showSnackBar(t("unableToGetLocation"), "error");
            },
        }
    );

    const refetchLocationQueries = async () => {
        Boolean(courseId) && (await refetchLocationIds());
        Boolean(locationIds) && (await refetchLocations());
    };

    return {
        locationIds,
        locations: isNeedToQueryLocation ? locations : [],
        isLoading: isLoadingLocationIds || isLoadingLocations,
        updateCourseLocations: refetchLocationQueries,
    };
};

export default useGetCourseLocations;
