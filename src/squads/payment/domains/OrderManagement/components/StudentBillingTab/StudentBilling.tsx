import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import StudentBillingBillingItemsSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingBillingItemsSection";
import StudentBillingOrdersSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingOrdersSection";
import StudentBillingProductListSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingProductListSection";

import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

const StudentBillingComponent = () => {
    const { id: studentId } = useParams<{ id: string }>();

    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <Box data-testid="TabStudentBilling__root" mt={3}>
            <Grid item container direction="column" spacing={3}>
                <Grid item>
                    <TypographyHeader data-testid="StudentBilling__title">
                        {tOrder("title.billingInfo")}
                    </TypographyHeader>
                </Grid>
                <StudentBillingProductListSection studentId={studentId} />
                <Grid item>
                    <DividerDashed />
                </Grid>
                <StudentBillingBillingItemsSection studentId={studentId} />
                <Grid item>
                    <DividerDashed />
                </Grid>
                <StudentBillingOrdersSection studentId={studentId} />
            </Grid>
        </Box>
    );
};

const StudentBilling = () => {
    return (
        <TranslationProvider>
            <StudentBillingComponent />
        </TranslationProvider>
    );
};

export default StudentBilling;
