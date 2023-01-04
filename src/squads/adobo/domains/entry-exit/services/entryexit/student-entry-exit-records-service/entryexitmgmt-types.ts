import * as Types from '../../../__generated__/entryexitmgmt/root-types';

export type EntryExit_StudentQrCodeByStudentIdsV2QueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type EntryExit_StudentQrCodeByStudentIdsV2Query = { student_qr: Array<{ qr_url: string, qr_id: number, student_id: string, version?: string | null | undefined }> };

export type StudentQrCodeByStudentIdsQueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentQrCodeByStudentIdsQuery = { student_qr: Array<{ qr_url: string, qr_id: number, student_id: string }> };

export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables = Types.Exact<{
  student_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery = { student_entryexit_records: Array<{ entry_at: any, entryexit_id: number, exit_at?: any | null | undefined, student_id: string }>, student_entryexit_records_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables = Types.Exact<{
  student_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  start_date?: Types.InputMaybe<Types.Scalars['timestamptz']>;
  end_date?: Types.InputMaybe<Types.Scalars['timestamptz']>;
}>;


export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2Query = { student_entryexit_records: Array<{ entry_at: any, entryexit_id: number, exit_at?: any | null | undefined, student_id: string }>, student_entryexit_records_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };
