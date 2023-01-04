import { Calendar_LocationsListByLocationTypesQuery } from "src/squads/calendar/service/bob/bob-types";
import { inferQuery } from "src/squads/calendar/service/infer-query";

import useShowSnackbar from "src/squads/calendar/hooks/useShowSnackbar";
import useTranslate from "src/squads/calendar/hooks/useTranslate";

export interface useLocationListByLocationTypeProps {
    locationTypeId: string;
}

export interface useLocationListByLocationTypeReturn {
    data: Calendar_LocationsListByLocationTypesQuery["locations"];
    isLoading: boolean;
}

const useLocationsListByLocationTypes = ({
    locationTypeId,
}: useLocationListByLocationTypeProps): useLocationListByLocationTypeReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { data = [], isLoading } = inferQuery({
        entity: "locations",
        action: "calendarGetLocationsListByLocationTypes",
    })(
        { location_type_id: locationTypeId },
        {
            enabled: Boolean(locationTypeId),
            onError: (error) => {
                window.warner?.warn("useLocationsListByLocationTypes: ", error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    return { data, isLoading };
};

export default useLocationsListByLocationTypes;
