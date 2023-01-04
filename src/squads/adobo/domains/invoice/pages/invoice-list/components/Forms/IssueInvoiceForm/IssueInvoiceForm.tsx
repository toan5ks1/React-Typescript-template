import { DateTime } from "luxon";
import { Entities } from "src/common/constants/enum";
import { getChoices } from "src/squads/adobo/domains/invoice/common/constants/choices";
import { IssueInvoiceFormFields } from "src/squads/adobo/domains/invoice/common/constants/enum";

import { Grid } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import useIssueInvoiceValidationRules from "src/squads/adobo/domains/invoice/hooks/useIssueInvoiceValidationRules";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

const IssueInvoiceForm = () => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    const { required, validate } = useIssueInvoiceValidationRules();
    const minDate = DateTime.local().plus({ days: 1 });

    return (
        <Grid container pb={1}>
            <Grid container item xs={12} spacing={2} pb={2} pt={0.75}>
                <Grid item xs={6} pr={0.5}>
                    <SelectHF
                        name={IssueInvoiceFormFields.PAYMENT_METHOD}
                        label={tInvoice("invoiceManagement.columns.paymentMethod")}
                        data-testid="FormIssueInvoice__selectPaymentMethod"
                        required
                        options={getChoices(tInvoice)}
                        rules={{ required }}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2} pb={2}>
                <Grid item xs={6} pr={0.5}>
                    <DatePickerHF
                        minDate={minDate}
                        name={IssueInvoiceFormFields.DUE_DATE}
                        label={tInvoice("invoiceManagement.columns.dueDate")}
                        rules={{ required, validate: validate.dueDate }}
                        InputProps={{
                            "data-testid": "FormIssueInvoice__inputInvoiceDueDate",
                            required: true,
                        }}
                        DialogProps={{
                            "aria-label": "DatePickerHF__dialogDueDate",
                        }}
                    />
                </Grid>
                <Grid item xs={6} pl={0.5}>
                    <DatePickerHF
                        minDate={minDate}
                        name={IssueInvoiceFormFields.EXPIRY_DATE}
                        label={tInvoice("invoiceManagement.columns.expiryDate")}
                        rules={{
                            required,
                            validate: validate.expiryDate,
                        }}
                        InputProps={{
                            "data-testid": "FormIssueInvoice__inputInvoiceExpiryDate",
                            required: true,
                        }}
                        DialogProps={{
                            "aria-label": "DatePickerHF__dialogExpiryDate",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1} pb={0}>
                <Grid item xs={12} p={0}>
                    <TextFieldHF
                        name={IssueInvoiceFormFields.REMARKS}
                        label={tInvoice("remarks")}
                        inputProps={{
                            "data-testid": "FormIssueInvoice__inputInvoiceRemarks",
                        }}
                        multiline
                        rows={6.474}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default IssueInvoiceForm;
