import { ReactNode } from "react";

import { useWatch } from "react-hook-form";
import {
    OrderFormLocationFieldName,
    OrderFormStudentInfoFieldName,
    OrderFormValues,
    ProductFieldItem,
} from "src/squads/payment/types/form/order-form-types";

import ProductListItem from "src/squads/payment/components/Sections/ProductListSection/ProductListItem";

import useProductIdsByGradeAndLocation from "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation";
import useWatchSelectedProductIds from "src/squads/payment/domains/OrderManagement/hooks/useWatchSelectedProductIds";

interface UseProductComponentProps {
    studentIndex: number;
}

interface UseProductComponentReturnType {
    renderProductComponent: (
        productFieldItem: ProductFieldItem,
        productIndex?: number
    ) => ReactNode;
}

export const useProductComponent = ({
    studentIndex,
}: UseProductComponentProps): UseProductComponentReturnType => {
    const [location, studentInfo] = useWatch<
        OrderFormValues,
        [OrderFormLocationFieldName, OrderFormStudentInfoFieldName]
    >({
        name: ["location", `students.${studentIndex}.studentInfo`],
    });

    const { productIds } = useProductIdsByGradeAndLocation({
        locationIds: location?.locationId ? [location.locationId] : undefined,
        gradeIds: studentInfo?.current_grade ? [studentInfo.current_grade] : undefined,
    });

    const { selectedProductIds } = useWatchSelectedProductIds(studentIndex);

    const renderProductComponent: UseProductComponentReturnType["renderProductComponent"] = (
        productFieldItem,
        productIndex
    ) => {
        return typeof productIndex === "undefined" ? undefined : (
            <ProductListItem
                productFieldItem={productFieldItem}
                productIndex={productIndex}
                productIds={productIds}
                selectedProductIds={selectedProductIds}
                studentIndex={studentIndex}
            />
        );
    };

    return { renderProductComponent };
};

export type { UseProductComponentReturnType, UseProductComponentProps };
