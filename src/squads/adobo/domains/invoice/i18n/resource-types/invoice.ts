declare module NsInvoice {
    export interface RootObject {
        name: string;
        title: string;
        invoiceManagement: {
            name: string;
            columns: {
                invoiceNo: string;
                invoiceStatus: string;
                studentName: string;
                amount: string;
                paymentMethod: string;
                createdDate: string;
                dueDate: string;
                expiryDate: string;
                invoiceType: string;
            };
            invoiceStatuses: {
                DRAFT: string;
                ISSUED: string;
                FAILED: string;
                REFUNDED: string;
                PAID: string;
                VOID: string;
            };
            paymentMethods: {
                directDebit: string;
                convenienceStore: string;
            };
            invoiceTypes: {
                MANUAL: string;
                SCHEDULED: string;
            };
        };
        invoiceDetails: {
            generalInfo: string;
            invoiceInfo: string;
        };
        actions: {
            voidInvoice: string;
            issueInvoice: string;
            approvePayment: string;
            cancelPayment: string;
            scheduledInvoiceHistory: string;
            bulkIssueInvoice: string;
        };
        paymentHistory: {
            title: string;
            columns: {
                paymentNo: string;
                paymentMethod: string;
                createdDate: string;
                dueDate: string;
                paymentDate: string;
                status: string;
                result: string;
            };
            paymentStatuses: {
                pending: string;
                failed: string;
                successful: string;
            };
        };
        actionLog: {
            title: string;
            columns: {
                userName: string;
                action: string;
                detail: string;
                comment: string;
                updatedTime: string;
            };
            commentViewButton: string;
        };
        createInvoice: {
            title: string;
            columns: {
                location: string;
                billingNo: string;
                billingItem: string;
                status: string;
                billingDate: string;
                amount: string;
            };
            billingItems: {
                BILLING_STATUS_PENDING: string;
                BILLING_STATUS_BILLED: string;
                BILLING_STATUS_INVOICED: string;
            };
        };
        remarks: string;
        messages: {
            issueInvoice: {
                success: string;
                failed: string;
            };
            voidInvoice: {
                success: string;
                failed: string;
            };
            approveInvoicePayment: {
                success: string;
                failed: string;
            };
            cancelInvoicePayment: {
                success: string;
                failed: string;
            };
        };
        validations: {
            dueDate: string;
            expiryDate: string;
            dueDateAfterExpiryDate: string;
        };
        scheduledInvoiceHistory: {
            title: string;
        };
    }
}

export interface Invoice extends NsInvoice.RootObject {}
