import * as Types from '../../__generated__/invoicemgmt/root-types';

export type Invoice_BillItemsQueryVariables = Types.Exact<{
  student_id?: Types.InputMaybe<Types.Scalars['String']>;
  billing_statuses?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_BillItemsQuery = { bill_item: Array<{ billing_item_description?: any | null | undefined, final_price: number, student_id: string, billing_date?: any | null | undefined, billing_status: string, bill_item_sequence_number: number }>, bill_item_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_ActionLogQueryVariables = Types.Exact<{
  invoice_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  invoice_action_log_order_by?: Types.Invoice_Action_Log_Order_By;
}>;


export type Invoice_ActionLogQuery = { invoice_action_log: Array<{ user_id: string, action: string, action_detail: string, action_comment: string, invoice_action_id: string, created_at: any, updated_at: any }>, invoice_action_log_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_BillItemsListQueryVariables = Types.Exact<{
  invoice_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_BillItemsListQuery = { invoice_bill_item: Array<{ invoice_bill_item_id: string, invoice_id: string, bill_item_sequence_number: number }>, invoice_bill_item_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_BillItemManyQueryVariables = Types.Exact<{
  bill_item_sequence_number?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_BillItemManyQuery = { bill_item: Array<{ bill_item_sequence_number: number, billing_item_description?: any | null | undefined, billing_date?: any | null | undefined, discount_amount?: number | null | undefined, discount_amount_type?: string | null | undefined, discount_amount_value?: number | null | undefined, tax_amount?: number | null | undefined, tax_percentage?: number | null | undefined, tax_id?: string | null | undefined, tax_category?: string | null | undefined, final_price: number }> };

export type Invoice_InvoiceOneQueryVariables = Types.Exact<{
  invoice_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Invoice_InvoiceOneQuery = { invoice: Array<{ invoice_id: string, invoice_sequence_number?: number | null | undefined, status: string, sub_total: number, student_id: string, total: number, type: string, created_at: any }> };

export type Invoice_InvoicesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_InvoicesQuery = { invoice: Array<{ invoice_id: string, invoice_sequence_number?: number | null | undefined, status: string, student_id: string, sub_total: number, total: number, type: string }>, invoice_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_InvoicesByStatusQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_InvoicesByStatusQuery = { invoice: Array<{ invoice_id: string, invoice_sequence_number?: number | null | undefined, status: string, student_id: string, sub_total: number, total: number, type: string }>, invoice_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_InvoicesByStudentIdQueryVariables = Types.Exact<{
  studentId?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Invoice_InvoicesByStudentIdQuery = { invoice: Array<{ invoice_id: string, invoice_sequence_number?: number | null | undefined, status: string, student_id: string, sub_total: number, total: number, type: string }>, invoice_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Invoice_UsersQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Invoice_UsersQuery = { users: Array<{ user_id: string, name: string }> };

export type Invoice_PaymentHistoryQueryVariables = Types.Exact<{
  invoice_id?: Types.InputMaybe<Types.Scalars['String']>;
  payment_status?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  payment_order_by?: Types.Payment_Order_By;
}>;


export type Invoice_PaymentHistoryQuery = { payment: Array<{ invoice_id: string, payment_date?: any | null | undefined, payment_due_date: any, payment_expiry_date: any, payment_id: string, payment_method: string, payment_sequence_number?: number | null | undefined, payment_status: string, result?: string | null | undefined, created_at: any, updated_at: any }>, payment_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };
