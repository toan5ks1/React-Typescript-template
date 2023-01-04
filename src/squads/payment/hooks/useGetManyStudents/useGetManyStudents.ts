import { arrayHasItem } from "src/common/utils/other";
import { Payment_GetStudentsManyV3QueryVariables } from "src/squads/payment/service/bob/bob-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseGetManyStudentsProps {
    studentIds: Payment_GetStudentsManyV3QueryVariables["studentIds"];
}

const useGetManyStudents = ({ studentIds }: UseGetManyStudentsProps) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "students",
        action: "paymentGetManyStudents",
    })(
        {
            studentIds,
        },
        {
            enabled: Boolean(studentIds) && arrayHasItem(studentIds),
            onError: (error) => {
                window.warner?.warn("useGetManyStudents", error);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")} students - paymentGetManyStudent`,
                    "error"
                );
            },
        }
    );
};

export default useGetManyStudents;
