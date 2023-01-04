import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { formatDate } from "src/common/utils/time";
import { InvoiceNumberCode } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { Invoice_InvoiceOneQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface GeneralInfoProps {
    invoice?: ArrayElement<Invoice_InvoiceOneQuery["invoice"]>;
}

export const GeneralInfo = ({ invoice }: GeneralInfoProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    const { data: users } = useGetUserName({
        userIds: invoice?.student_id || [],
    });

    return (
        <Box data-testid="InvoiceGeneralInfo">
            <Grid container direction="row" justifyContent="space-between" spacing={4}>
                <Grid item>
                    <Box mb={1}>
                        <TypographyPrimary data-testid="InvoiceDetail__genInfoTitle">
                            {tInvoice("invoiceDetails.generalInfo")}
                        </TypographyPrimary>
                    </Box>
                </Grid>
            </Grid>
            <Box data-testid="InvoiceDetails__generalInfo">
                <Box display="flex" flexDirection="row" py={0.75}>
                    <Grid container data-testid="InvoiceGenInfo__invoiceNo">
                        <TypographyWithValue
                            variant="horizontal"
                            value={`${InvoiceNumberCode.INVOICE_CODE}-${invoice?.invoice_sequence_number}`}
                            label={tInvoice("invoiceManagement.columns.invoiceNo")}
                            xsLabel={3}
                            xsValue={8}
                        />
                    </Grid>
                    <Grid container data-testid="InvoiceGenInfo__studentName">
                        <TypographyWithValue
                            variant="horizontal"
                            value={users ? users[0].name : ""}
                            label={tInvoice("invoiceManagement.columns.studentName")}
                            xsLabel={3}
                            xsValue={8}
                        />
                    </Grid>
                </Box>
                <Box display="flex" flexDirection="row" py={0.75}>
                    <Grid container data-testid="InvoiceGenInfo__invoiceType">
                        <TypographyWithValue
                            variant="horizontal"
                            value={invoice?.type}
                            label={tInvoice("invoiceManagement.columns.invoiceType")}
                            xsLabel={3}
                            xsValue={8}
                        />
                    </Grid>
                    <Grid container data-testid="InvoiceGenInfo__createdDate">
                        <TypographyWithValue
                            variant="horizontal"
                            value={formatDate(invoice?.created_at, "yyyy/LL/dd")}
                            label={tInvoice("invoiceManagement.columns.createdDate")}
                            xsLabel={3}
                            xsValue={8}
                        />
                    </Grid>
                </Box>
            </Box>
            <Box my={2}>
                <DividerDashed />
            </Box>
        </Box>
    );
};
