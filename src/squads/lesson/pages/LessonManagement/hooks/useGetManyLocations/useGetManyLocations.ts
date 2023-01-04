import { LocationManyType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseGetManyLocationsReturn {
    data: LocationManyType[];
    isLoading: boolean;
}

const useGetManyLocations = (locationIds: string[]): UseGetManyLocationsReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const { data = [], isFetching } = inferQuery({
        entity: "locations",
        action: "locationsGetMany",
    })(
        {
            location_ids: locationIds,
        },
        {
            enabled: arrayHasItem(locationIds),
            onError(error: Error) {
                window.warner?.warn(`useGetManyLocation error: `, error);
                showSnackbar(`${t("ra.message.unableToLoadData")} ${error.message}`, "error");
            },
        }
    );

    return { data, isLoading: isFetching };
};

export default useGetManyLocations;
