import { Fragment, MutableRefObject } from "react";

import { Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import BulkOrderBillingAccordion from "src/squads/payment/components/Accordions/BulkOrderBillingAccordion";
import BilledAtOrderSection from "src/squads/payment/components/Sections/BilledAtOrderSection";
import CommentSection from "src/squads/payment/components/Sections/CommentSection";
import ProductListSection, {
    ProductListSectionRefs,
} from "src/squads/payment/components/Sections/ProductListSection";
import StudentInfoSection from "src/squads/payment/components/Sections/StudentInfoSection";
import UpcomingBillingSection from "src/squads/payment/components/Sections/UpcomingBillingSection";
import EnrollmentPreviewFormDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewFormDialog/EnrollmentPreviewFormDialog";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";

export interface OrderFormProps {
    onLocationChange?: () => void;
    productListSectionRef: MutableRefObject<ProductListSectionRefs | undefined>;
    renderPreviewEnrollmentButton?: () => React.ReactElement;
    showEnrollmentForm?: boolean;
    closeEnrollmentForm?: () => void;
    studentIndex: number;
    shouldShowStudentInfoSection?: boolean; // TODO: remove this when bulk order is finalized
}

const OrderForm = ({
    onLocationChange,
    productListSectionRef,
    renderPreviewEnrollmentButton,
    showEnrollmentForm = false,
    closeEnrollmentForm,
    studentIndex,
    shouldShowStudentInfoSection = true,
}: OrderFormProps) => {
    const { orderType } = useProductPluginsContext();
    useOrderValidationRules()["requiredSection"]({ studentIndex });

    return (
        <Grid data-testid="OrderForm__container" container spacing={3}>
            <Grid item xs>
                <PaperSectionWrapper>
                    <Grid container spacing={3}>
                        {shouldShowStudentInfoSection ? (
                            <Fragment>
                                <Grid item xs={12}>
                                    <StudentInfoSection
                                        onLocationChange={onLocationChange}
                                        studentIndex={studentIndex}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DividerDashed />
                                </Grid>
                            </Fragment>
                        ) : (
                            <Grid item xs={12}>
                                <BulkOrderBillingAccordion
                                    billedAtOrderSection={
                                        <BilledAtOrderSection
                                            showBilledAtOrderSectionTitle={false}
                                            studentIndex={studentIndex}
                                        />
                                    }
                                    upcomingBillingSection={
                                        <UpcomingBillingSection
                                            showUpcomingBillingSectionTitle={false}
                                            studentIndex={studentIndex}
                                        />
                                    }
                                    studentIndex={studentIndex}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <ProductListSection
                                ref={productListSectionRef}
                                studentIndex={studentIndex}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DividerDashed />
                        </Grid>

                        <Grid item xs={12} pb={1}>
                            <CommentSection studentIndex={studentIndex} />
                        </Grid>
                    </Grid>
                </PaperSectionWrapper>
            </Grid>
            {shouldShowStudentInfoSection && (
                <Grid item xs={4}>
                    <Grid container spacing={3}>
                        {orderType === OrderType.ORDER_TYPE_ENROLLMENT &&
                            renderPreviewEnrollmentButton && (
                                <>
                                    <Grid item xs={12}>
                                        {renderPreviewEnrollmentButton()}
                                    </Grid>
                                    <EnrollmentPreviewFormDialog
                                        showEnrollmentForm={showEnrollmentForm}
                                        closeEnrollmentForm={closeEnrollmentForm}
                                        studentIndex={studentIndex}
                                    />
                                </>
                            )}
                        <Grid item xs={12}>
                            <PaperSectionWrapper>
                                <BilledAtOrderSection studentIndex={studentIndex} />
                            </PaperSectionWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperSectionWrapper>
                                <UpcomingBillingSection studentIndex={studentIndex} />
                            </PaperSectionWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default OrderForm;
