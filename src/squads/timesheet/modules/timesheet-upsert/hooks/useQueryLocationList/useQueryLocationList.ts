import { Timesheet_LocationListByIdsQuery } from "src/squads/timesheet/service/bob/bob-types";
import { inferQuery } from "src/squads/timesheet/service/infer-service";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export type useQueryLocationListReturn = {
    data: Timesheet_LocationListByIdsQuery["locations"];
    isFetching: boolean;
    refetch: () => void;
};

export interface UseQueryLocationListProps {
    keyword: string;
    enabled?: boolean;
}

function useQueryLocationList({
    keyword,
    enabled = true,
}: UseQueryLocationListProps): useQueryLocationListReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data = [],
        isFetching,
        refetch,
    } = inferQuery({
        entity: "location",
        action: "timesheetGetLocationListWithFilter",
    })(
        {
            filter: {
                name: keyword,
            },
        },
        {
            enabled,
            onError(error: Error) {
                window.warner?.warn(`fetch location list error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );
    return {
        data,
        isFetching,
        refetch,
    };
}

export default useQueryLocationList;
