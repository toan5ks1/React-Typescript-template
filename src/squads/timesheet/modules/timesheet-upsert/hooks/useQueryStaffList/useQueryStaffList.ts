import { Timesheet_StaffListV2Query } from "src/squads/timesheet/service/bob/bob-types";
import { inferQuery } from "src/squads/timesheet/service/infer-service";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export type UseQueryStaffListReturn = {
    data: Timesheet_StaffListV2Query["staff"];
    isFetching: boolean;
    refetch: () => void;
};

export interface UseQueryStaffListProps {
    keyword: string;
    isTeacher?: boolean;
}

function useQueryStaffList({
    keyword,
    isTeacher,
}: UseQueryStaffListProps): UseQueryStaffListReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data = [],
        isFetching,
        refetch,
    } = inferQuery({
        entity: "staff",
        action: "timesheetGetStaffListWithFilterV2",
    })(
        {
            filter: {
                keyword,
            },
        },
        {
            enabled: !isTeacher,
            onError(error: Error) {
                window.warner?.warn(`fetch staff list error: `, error);
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

export default useQueryStaffList;
