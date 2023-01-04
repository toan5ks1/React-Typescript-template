import { forwardRef, useImperativeHandle } from "react";

import { useFieldArray } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import {
    OrderFormProductFieldArrayItemsFieldName,
    OrderFormValues,
} from "src/squads/payment/types/form/order-form-types";

import { useProductActions } from "src/squads/payment/components/Sections/ProductListSection/hooks/useProductActions";
import { useProductComponent } from "src/squads/payment/components/Sections/ProductListSection/hooks/useProductComponent";
import TableAddDeleteRow from "src/squads/payment/components/TableAddDeleteRow";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface ProductListSectionRefs {
    replace: (obj: object[]) => void;
}

export interface ProductListSectionProps {
    studentIndex: number;
}

const ProductListSection = forwardRef<ProductListSectionRefs | undefined, ProductListSectionProps>(
    ({ studentIndex }: ProductListSectionProps, ref) => {
        const tOrder = useResourceTranslate(Entities.ORDERS);

        const fieldArrayMethods = useFieldArray<
            OrderFormValues,
            OrderFormProductFieldArrayItemsFieldName
        >({ name: `students.${studentIndex}.productFieldArrayItems` });
        const { fields, append, replace } = fieldArrayMethods;

        const { orderType } = useProductPluginsContext();

        const errorMessage =
            useOrderValidationRules().errorMessages.productArrayTable(studentIndex);

        useImperativeHandle(ref, () => ({
            replace,
        }));

        const { renderProductComponent } = useProductComponent({ studentIndex });

        const { getProductActions } = useProductActions({ fieldArrayMethods, orderType });

        return (
            <TableAddDeleteRow
                loading={false}
                title={tOrder("title.productList")}
                dataSource={fields}
                onClickAddRow={() => append({ product: null })}
                errorMessage={errorMessage}
                renderComponent={renderProductComponent}
                getActions={getProductActions}
                showAddRowButton={orderType !== OrderType.ORDER_TYPE_UPDATE}
            />
        );
    }
);

export default ProductListSection;
