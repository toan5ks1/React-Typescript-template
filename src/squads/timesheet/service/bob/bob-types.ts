import * as Types from '../../__generated__/bob/root-types';

export type Timesheet_LocationAttrsFragment = { location_id: string, name: string };

export type Timesheet_LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Timesheet_LocationListByIdsQuery = { locations: Array<{ location_id: string, name: string }> };

export type Timesheet_LocationOneQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
}>;


export type Timesheet_LocationOneQuery = { locations: Array<{ location_id: string, name: string }> };

export type Timesheet_LocationListQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Timesheet_LocationListQuery = { locations: Array<{ location_id: string, name: string }> };

export type Timesheet_StaffAttrsFragment = { user_id: string, name: string, email?: string | null | undefined };

export type Timesheet_StaffListByIdsQueryVariables = Types.Exact<{
  staff_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Timesheet_StaffListByIdsQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined }> };

export type Timesheet_StaffOneQueryVariables = Types.Exact<{
  staff_id: Types.Scalars['String'];
}>;


export type Timesheet_StaffOneQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined }> };

export type Timesheet_StaffListQueryVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Timesheet_StaffListQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined }> };

export type Timesheet_StaffListV2QueryVariables = Types.Exact<{
  keyword?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Timesheet_StaffListV2Query = { staff: Array<{ staff_id: string, user: { name: string, email?: string | null | undefined } }> };
