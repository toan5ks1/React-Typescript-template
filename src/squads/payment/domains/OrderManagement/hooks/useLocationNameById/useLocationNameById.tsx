import {
    Payment_GetLocationNameByLocationIdQuery,
    Payment_GetLocationNameByLocationIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseCoursesProps {
    locationId: Payment_GetLocationNameByLocationIdQueryVariables["location_id"];
    onSuccess?: (data: ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>) => void;
}

const useLocationNameById = ({
    locationId,
    onSuccess,
}: UseCoursesProps): UseQueryBaseReturn<
    ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>
> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "locations",
        action: "paymentGetLocationTitleByLocationId",
    })(
        { location_id: locationId },
        {
            enabled: Boolean(locationId),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useLocationNameById in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} locations - paymentGetLocationTitleByLocationId`,
                    "error"
                );
            },
        }
    );
};

export default useLocationNameById;
