import gql from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_InvoiceOneQuery,
    Invoice_InvoiceOneQueryVariables,
    Invoice_InvoicesByStatusQuery,
    Invoice_InvoicesByStatusQueryVariables,
    Invoice_InvoicesByStudentIdQuery,
    Invoice_InvoicesByStudentIdQueryVariables,
    Invoice_InvoicesQuery,
    Invoice_InvoicesQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

const getInvoiceQuery = gql`
    query Invoice_InvoiceOne($invoice_id: String) {
        invoice(where: { invoice_id: { _eq: $invoice_id } }) {
            invoice_id
            invoice_sequence_number
            status
            sub_total
            student_id
            total
            type
            created_at
        }
    }
`;

const getInvoicesQuery = gql`
    query Invoice_Invoices($limit: Int = 10, $offset: Int = 0) {
        invoice(limit: $limit, offset: $offset) {
            invoice_id
            invoice_sequence_number
            status
            student_id
            sub_total
            total
            type
        }
        invoice_aggregate {
            aggregate {
                count
            }
        }
    }
`;

const getInvoicesByStatusQuery = gql`
    query Invoice_InvoicesByStatus($status: String, $limit: Int = 10, $offset: Int = 0) {
        invoice(where: { status: { _eq: $status } }, limit: $limit, offset: $offset) {
            invoice_id
            invoice_sequence_number
            status
            student_id
            sub_total
            total
            type
        }
        invoice_aggregate(where: { status: { _eq: $status } }) {
            aggregate {
                count
            }
        }
    }
`;

const getInvoicesByStudentIdQuery = gql`
    query Invoice_InvoicesByStudentId($studentId: String, $limit: Int = 10, $offset: Int = 0) {
        invoice(where: { student_id: { _eq: $studentId } }, limit: $limit, offset: $offset) {
            invoice_id
            invoice_sequence_number
            status
            student_id
            sub_total
            total
            type
        }
        invoice_aggregate(where: { student_id: { _eq: $studentId } }) {
            aggregate {
                count
            }
        }
    }
`;

class InvoicesQuery extends InheritedHasuraServiceClient {
    async getInvoice(
        variables: Invoice_InvoiceOneQueryVariables
    ): Promise<ArrayElement<Invoice_InvoiceOneQuery["invoice"]> | undefined> {
        const response = await this._call<Invoice_InvoiceOneQuery>({
            query: getInvoiceQuery,
            variables,
        });

        return response.data?.invoice[0];
    }

    async getInvoices(
        variables: Invoice_InvoicesQueryVariables
    ): Promise<DataWithTotal<Invoice_InvoicesQuery["invoice"] | undefined>> {
        const response = await this._call<Invoice_InvoicesQuery>({
            query: getInvoicesQuery,
            variables,
        });

        return {
            data: response.data?.invoice,
            total: response.data?.invoice_aggregate.aggregate?.count ?? 0,
        };
    }

    async getInvoicesByStatus(
        variables: Invoice_InvoicesByStatusQueryVariables
    ): Promise<DataWithTotal<Invoice_InvoicesByStatusQuery["invoice"] | undefined>> {
        const response = await this._call<Invoice_InvoicesByStatusQuery>({
            query: getInvoicesByStatusQuery,
            variables,
        });

        return {
            data: response.data?.invoice,
            total: response.data?.invoice_aggregate.aggregate?.count ?? 0,
        };
    }

    async getInvoicesByStudentId(
        variables: Invoice_InvoicesByStudentIdQueryVariables
    ): Promise<DataWithTotal<Invoice_InvoicesByStudentIdQuery["invoice"] | undefined>> {
        const response = await this._call<Invoice_InvoicesByStudentIdQuery>({
            query: getInvoicesByStudentIdQuery,
            variables,
        });

        return {
            data: response.data?.invoice,
            total: response.data?.invoice_aggregate.aggregate?.count ?? 0,
        };
    }
}

const invoiceQueryInvoiceMgmt = new InvoicesQuery(appConfigs, "invoicemgmtGraphQL", doQuery);

export default invoiceQueryInvoiceMgmt;
