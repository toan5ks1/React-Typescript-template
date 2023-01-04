import { Calendar_LocationTypesListQuery } from "src/squads/calendar/service/bob/bob-types";
import { inferQuery } from "src/squads/calendar/service/infer-query";

import useShowSnackbar from "src/squads/calendar/hooks/useShowSnackbar";
import useTranslate from "src/squads/calendar/hooks/useTranslate";

export interface UseLocationTypesListReturn {
    data: Calendar_LocationTypesListQuery["location_types"];
    isLoading: boolean;
}

export interface UseLocationTypesListProps {
    onSuccess?: (data: Calendar_LocationTypesListQuery["location_types"]) => void;
}

const useLocationTypesList = (props: UseLocationTypesListProps): UseLocationTypesListReturn => {
    const { onSuccess } = props;
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { data = [], isLoading } = inferQuery({
        entity: "locationTypes",
        action: "calendarGetLocationTypesList",
    })(
        {},
        {
            onError: (error) => {
                window.warner?.warn("useLocationTypesList: ", error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
            onSuccess: (data) => {
                data && onSuccess?.(data);
            },
        }
    );

    return { data, isLoading };
};

export default useLocationTypesList;
