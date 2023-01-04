import { Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import CustomBillingCommentSection from "src/squads/payment/components/Sections/CustomBillingCommentSection";
import CustomBillingSection from "src/squads/payment/components/Sections/CustomBillingSection";
import CustomBillingStudentInfoSection from "src/squads/payment/components/Sections/CustomBillingStudentInfoSection";

export interface CustomBillingOrderFormProps {
    onLocationChange?: () => void;
    billingErrorMessage: string | null;
}

const CustomBillingOrderForm = ({
    onLocationChange,
    billingErrorMessage,
}: CustomBillingOrderFormProps) => {
    return (
        <PaperSectionWrapper data-testid="CustomBillingOrderForm__container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CustomBillingStudentInfoSection onLocationChange={onLocationChange} />
                </Grid>

                <Grid item xs={12}>
                    <DividerDashed />
                </Grid>

                <Grid item xs={12}>
                    <CustomBillingSection billingErrorMessage={billingErrorMessage} />
                </Grid>

                <Grid item xs={12}>
                    <DividerDashed />
                </Grid>

                <Grid item xs={6}>
                    <CustomBillingCommentSection />
                </Grid>
            </Grid>
        </PaperSectionWrapper>
    );
};

export default CustomBillingOrderForm;
