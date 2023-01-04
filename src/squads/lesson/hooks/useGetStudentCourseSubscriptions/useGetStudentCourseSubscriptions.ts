import { QueryObserverBaseResult } from "react-query";
import { arrayHasItem } from "src/common/utils/other";
import {
    GetStudentCourseSubscriptionsRequestQuery,
    StudentCourseSubscriptionsQueried,
} from "src/squads/lesson/common/types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface useGetStudentCourseSubscriptionsProps {
    studentCourseInfos: GetStudentCourseSubscriptionsRequestQuery;
}
export interface useGetStudentCourseSubscriptionsReturn {
    studentSubscriptions: StudentCourseSubscriptionsQueried | undefined;
    isLoadingStudentSubscriptions: boolean;
    refetchStudentCourseSubscriptions: QueryObserverBaseResult["refetch"];
}

const useGetStudentCourseSubscriptions = (
    props: useGetStudentCourseSubscriptionsProps
): useGetStudentCourseSubscriptionsReturn => {
    const { studentCourseInfos } = props;
    const showSnackBar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: studentSubscriptions,
        isLoading: isLoadingStudentSubscriptions,
        refetch: refetchStudentCourseSubscriptions,
    } = inferQuery({
        entity: "lessonStudentSubscriptions",
        action: "lessonStudentSubscriptionsGetStudentCourseSubscription",
    })(studentCourseInfos, {
        enabled: arrayHasItem(studentCourseInfos),
        onError(error) {
            window.warner?.warn(`useGetStudentSubcriptions fetch`, error);
            showSnackBar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
        },
    });

    return {
        studentSubscriptions: studentSubscriptions?.itemsList,
        isLoadingStudentSubscriptions,
        refetchStudentCourseSubscriptions,
    };
};

export default useGetStudentCourseSubscriptions;
