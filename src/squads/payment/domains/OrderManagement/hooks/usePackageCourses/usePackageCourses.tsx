import {
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UsePackageCoursesProps {
    packageId: Payment_GetManyPackageCourseByPackageIdQueryVariables["package_id"] | undefined;
    onSuccess: (data: Payment_GetManyPackageCourseByPackageIdQuery["package_course"]) => void;
}

const usePackageCourses = ({
    packageId,
    onSuccess,
}: UsePackageCoursesProps): UseQueryBaseReturn<
    Payment_GetManyPackageCourseByPackageIdQuery["package_course"]
> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "packageCourse",
        action: "paymentGetManyPackageCourseByPackageId",
    })(
        { package_id: packageId },
        {
            enabled: Boolean(packageId),
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                window.warner?.warn("usePackageCourses in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} packageCourse - paymentGetManyPackageCourseByPackageId`,
                    "error"
                );
            },
        }
    );
};

export default usePackageCourses;
