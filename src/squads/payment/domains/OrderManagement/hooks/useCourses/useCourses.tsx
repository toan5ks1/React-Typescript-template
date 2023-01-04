import { arrayHasItem } from "src/common/utils/other";
import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyCourseByCourseIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseCoursesProps {
    courseIds: Payment_GetManyCourseByCourseIdsQueryVariables["course_ids"];
    onSuccess: (data: Payment_GetManyCourseByCourseIdsQuery["courses"]) => void;
}

const useCourses = ({
    courseIds,
    onSuccess,
}: UseCoursesProps): UseQueryBaseReturn<Payment_GetManyCourseByCourseIdsQuery["courses"]> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "courses",
        action: "paymentGetManyCoursesByCourseIds",
    })(
        { course_ids: courseIds },
        {
            enabled: arrayHasItem(courseIds),
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                window.warner?.warn("useCourses in Payment Order", error);

                showSnackbar(
                    `${t("ra.message.unableToLoadData")} course - paymentGetManyCoursesByCourseIds`,
                    "error"
                );
            },
        }
    );
};

export default useCourses;
