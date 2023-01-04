import { useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { StudentBillingItem } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { inferQueryPagination } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TableInvoices from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TableInvoices";
import DialogCreateInvoice from "src/squads/adobo/domains/invoice/pages/student-invoice/components/DialogCreateInvoice";
import TranslationProvider from "src/squads/adobo/domains/invoice/providers/TranslationProvider";

import { InvoiceType } from "manabuf/invoicemgmt/v1/enums_pb";

import useDialog from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useGenerateInvoices from "src/squads/adobo/domains/invoice/pages/student-invoice/hooks/useGenerateInvoices";

interface StudentInvoiceProps {
    studentId: string;
}

const StudentInvoiceComponent = (props: StudentInvoiceProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { studentId, ...rest } = props;

    const {
        data: invoices,
        pagination,
        result: { isFetching, refetch },
    } = inferQueryPagination({
        entity: "invoice",
        action: "invoiceGetManyByStudentId",
    })(
        {
            studentId,
        },
        {
            enabled: true,
        }
    );
    const { generateInvoices, isLoading: isLoading } = useGenerateInvoices();

    const [selectedBillItems, setSelectedBillItems] = useState<StudentBillingItem[]>([]);

    const {
        open: openCreateInvoice,
        onOpen: onOpenCreateInvoice,
        onClose: onCloseCreateInvoice,
    } = useDialog();

    const convertToBillItemIdsList = useMemo(() => {
        const idsList = selectedBillItems.reduce((billItemIds: number[], billItem) => {
            billItemIds.push(billItem.bill_item_sequence_number);
            return billItemIds;
        }, []);
        return idsList;
    }, [selectedBillItems]);

    const computeSubTotal = useMemo(() => {
        const sum = selectedBillItems.reduce((acc, billItem) => acc + billItem.final_price, 0);
        return sum;
    }, [selectedBillItems]);

    const handleCreateInvoice = () => {
        const payload: NsInvoiceService.GenerateInvoiceDetail = {
            studentId,
            billItemIdsList: convertToBillItemIdsList,
            subTotal: computeSubTotal,
            total: computeSubTotal,
            invoiceType: InvoiceType.MANUAL,
        };
        return generateInvoices([payload], {
            onSuccess: () => {
                void refetch();
                onCloseCreateInvoice();
                setSelectedBillItems([]);
            },
        });
    };

    return (
        <>
            <Box
                mt={3}
                mb={4}
                data-testid="StudentInvoice"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <TypographyBase data-testid="StudentInvoice__title" variant="h6">
                    {tInvoice("title")}
                </TypographyBase>
                <ButtonCreate onClick={onOpenCreateInvoice} data-testid="StudentInvoice__btnCreate">
                    {tInvoice("createInvoice.title")}
                </ButtonCreate>
            </Box>
            <TableInvoices
                currency={InvoiceCurrency.JAPANESE_YEN}
                invoices={invoices?.data}
                isLoading={isFetching}
                pagination={pagination}
                studentId={studentId}
            />
            <DialogCreateInvoice
                open={openCreateInvoice}
                onClose={() => {
                    onCloseCreateInvoice();
                    setSelectedBillItems([]);
                }}
                onSave={handleCreateInvoice}
                onSelect={setSelectedBillItems}
                selectedBillItems={selectedBillItems}
                currency={InvoiceCurrency.JAPANESE_YEN}
                studentId={studentId}
                loading={isLoading}
                {...rest}
            />
        </>
    );
};

const StudentInvoice = (props: StudentInvoiceProps) => {
    const { studentId } = props;

    return (
        <TranslationProvider>
            <StudentInvoiceComponent studentId={studentId} />
        </TranslationProvider>
    );
};

export default StudentInvoice;
