import { useRef, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import EnrollmentOrderDialogContainer from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog/EnrollmentOrderDialogContainer";
import EnrollmentPreviewButton from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog/EnrollmentPreviewButton";
import OrderForm from "src/squads/payment/domains/OrderManagement/components/OrderForm";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import {
    defaultProductFieldArrayItems,
    FIRST_STUDENT_IDX,
} from "src/squads/payment/domains/OrderManagement/common/constants";
import useEnrollmentProducts from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts";
import useSubmitOrder from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";

export interface EnrollmentOrderDialogProps {
    isOpen: boolean;
}

const EnrollmentOrderDialog = ({ isOpen }: EnrollmentOrderDialogProps) => {
    const [showEnrollmentPreviewForm, setShowEnrollmentPreviewForm] = useState<boolean>(false);
    const productListSectionRef = useRef<ProductListSectionRefs>();

    const { handleSubmit, setValue } = useFormContext<OrderFormValues>();

    const onCreateError = (error: string) => {
        if (error === "ra.manabie-error.specified.orderMismatch") {
            productListSectionRef.current?.replace(defaultProductFieldArrayItems);
        }
    };
    const { createOrder, isOnCreateLoading } = useSubmitOrder({
        orderType: OrderType.ORDER_TYPE_ENROLLMENT,
        onCreateError,
    });

    const [location, studentInfo] = useWatch<
        OrderFormValues,
        ["location", `students.${number}.studentInfo`]
    >({
        name: ["location", `students.${FIRST_STUDENT_IDX}.studentInfo`],
    });
    useEnrollmentProducts({
        locationIds: location && location.locationId ? [location.locationId] : undefined,
        gradeIds:
            studentInfo && studentInfo.current_grade ? [studentInfo.current_grade] : undefined,
        onFinishFetchingData: (enrollmentProducts) => {
            if (enrollmentProducts.length > 0) {
                setValue(`students.${FIRST_STUDENT_IDX}.productFieldArrayItems`, [
                    ...enrollmentProducts,
                ]);
            }
        },
    });

    const onLocationChange = (): void => {
        productListSectionRef.current?.replace(defaultProductFieldArrayItems);
    };

    const goToViewEnrollmentPreviewForm = () => {
        setShowEnrollmentPreviewForm(true);
    };

    const closeEnrollmentForm = () => {
        setShowEnrollmentPreviewForm(false);
    };

    const renderPreviewEnrollmentButton = () => (
        <EnrollmentPreviewButton onClick={goToViewEnrollmentPreviewForm} />
    );

    return (
        <>
            <EnrollmentOrderDialogContainer
                isOpen={isOpen}
                onSave={handleSubmit(createOrder)}
                isLoading={isOnCreateLoading}
            >
                <div id="enrollment-preview-form"></div>
                <OrderForm
                    onLocationChange={onLocationChange}
                    productListSectionRef={productListSectionRef}
                    renderPreviewEnrollmentButton={renderPreviewEnrollmentButton}
                    showEnrollmentForm={showEnrollmentPreviewForm}
                    closeEnrollmentForm={closeEnrollmentForm}
                    studentIndex={FIRST_STUDENT_IDX}
                />
            </EnrollmentOrderDialogContainer>
        </>
    );
};

export default EnrollmentOrderDialog;
