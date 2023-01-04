import { inferQuery } from "src/squads/timesheet/service/infer-service";

import { TimesheetConfigListData } from "../../common/types";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface UseTimesheetConfigsReturn {
    data?: TimesheetConfigListData;
    isFetching: boolean;
    refetch: () => void;
}

export default function useTimesheetConfigs(configType: string): UseTimesheetConfigsReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "timesheetConfig",
        action: "timesheetConfigGetListByKey",
    })(
        {
            filter: {
                config_type: configType,
            },
        },
        {
            enabled: true,
            onError(error: Error) {
                window.warner?.warn(`fetch timesheet configs error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );
}
