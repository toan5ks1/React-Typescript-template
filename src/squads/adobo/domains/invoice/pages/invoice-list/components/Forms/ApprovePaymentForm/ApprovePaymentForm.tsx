import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useIssueInvoiceValidationRules from "src/squads/adobo/domains/invoice/hooks/useIssueInvoiceValidationRules";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface ApprovePaymentFormProps extends Pick<UseDialogReturn, "onClose"> {}

const ApprovePaymentForm = () => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { required } = useIssueInvoiceValidationRules();

    return (
        <Grid container pb={1}>
            <Grid container item xs={12} spacing={2} pb={2} pt={0.75}>
                <Grid item xs={6} pr={0.5}>
                    <DatePickerHF
                        name="paymentDate"
                        label={tInvoice("paymentHistory.columns.paymentDate")}
                        rules={{ required }}
                        InputProps={{
                            "data-testid": "FormApprovePayment__inputPaymentDate",
                            required: true,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1} pb={0}>
                <Grid item xs={12} p={0}>
                    <TextFieldHF
                        name="remarks"
                        label={tInvoice("remarks")}
                        inputProps={{
                            "data-testid": "FormApprovePayment__inputRemark",
                        }}
                        multiline
                        rows={6.474}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ApprovePaymentForm;
