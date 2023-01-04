import { Payment_GetStudentsManyV3QueryVariables } from "src/squads/payment/service/bob/bob-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseFetchStudentInfoProps {
    studentIds: Payment_GetStudentsManyV3QueryVariables["studentIds"];
}

const useFetchStudentInfo = ({ studentIds }: UseFetchStudentInfoProps) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "students",
        action: "paymentGetOneStudent",
    })(
        {
            studentIds,
        },
        {
            enabled: Boolean(studentIds?.length),
            onError: (error) => {
                window.warner?.warn("useFetchStudentInfo", error);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")} students - paymentGetOneStudent`,
                    "error"
                );
            },
        }
    );
};

export default useFetchStudentInfo;
