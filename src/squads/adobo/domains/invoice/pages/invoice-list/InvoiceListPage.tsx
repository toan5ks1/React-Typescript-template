import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { inferQueryPagination } from "src/squads/adobo/domains/invoice/services/infer-service";

import { HeaderInvoiceList } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/HeaderInvoiceList";
import TableInvoices from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TableInvoices";

export const InvoiceListPage = () => {
    const {
        data: invoices,
        pagination,
        result: { isFetching },
    } = inferQueryPagination({
        entity: "invoice",
        action: "invoiceGetList",
    })(
        {},
        {
            enabled: true,
        }
    );

    return (
        <>
            <HeaderInvoiceList />
            <TableInvoices
                currency={InvoiceCurrency.JAPANESE_YEN}
                invoices={invoices?.data}
                isLoading={isFetching}
                pagination={pagination}
            />
        </>
    );
};

export default InvoiceListPage;
