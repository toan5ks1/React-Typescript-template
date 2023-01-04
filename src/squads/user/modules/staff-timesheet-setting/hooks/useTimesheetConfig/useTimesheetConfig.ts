import { NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { inferQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseTimesheetConfigReturn {
    data: boolean;
    isLoading: boolean;
    refetch: () => void;
}

const useTimesheetConfig = (staffId: string): UseTimesheetConfigReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { data, isLoading, refetch } = inferQuery({
        entity: "staff",
        action: "userGetTimesheetConfig",
    })(
        { staff_id: staffId },
        {
            enabled: !!staffId,
            onError(err: Error) {
                const error = handleUnknownError(err);
                window.warner?.log(error.message);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")}: ${error.message}`,
                    NotifyTypes.ERROR
                );
            },
        }
    );

    return { data: Boolean(data?.auto_create_timesheet), isLoading, refetch };
};

export default useTimesheetConfig;
