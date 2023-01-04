import { useParams } from "react-router";

import { Box } from "@mui/material";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import { GeneralInfo } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/GeneralInfo";
import { HeaderInvoiceDetail } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/HeaderInvoiceDetail";
import InvoiceInfo from "src/squads/adobo/domains/invoice/pages/invoice-list/components/InvoiceInfo";
import TableActionLog from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TableActionLog/TableActionLog";
import TablePaymentHistory from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TablePaymentHistory/TablePaymentHistory";

import useInvoiceDetailQuery from "src/squads/adobo/domains/invoice/hooks/useInvoiceDetailQuery";

const InvoiceDetail = () => {
    const { id: invoiceId } = useParams<{ id: string }>();
    const { invoice, paymentHistory, isFetching, refetch, billItems, actionLogs } =
        useInvoiceDetailQuery({ invoiceId });

    if (isFetching) return <Loading />;
    if (typeof invoice === undefined) return <NotFound />;

    return (
        <Box data-testid="InvoiceDetail__root">
            <HeaderInvoiceDetail invoice={invoice} onStatusChange={refetch} />
            <GeneralInfo invoice={invoice} />
            <InvoiceInfo billItems={billItems} />
            <TablePaymentHistory paymentHistory={paymentHistory?.data} />
            <TableActionLog actionLogs={actionLogs?.data} />
        </Box>
    );
};

export default InvoiceDetail;
