import * as Types from '../../__generated__/bob/root-types';

export type User_ImportBanksMutationVariables = Types.Exact<{
  data: Array<Types.Bank_Insert_Input> | Types.Bank_Insert_Input;
}>;


export type User_ImportBanksMutation = { insert_bank?: { affected_rows: number } | null | undefined };

export type User_CountBankByIdsQueryVariables = Types.Exact<{
  bankIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountBankByIdsQuery = { bank_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_CountBankByBankCodesQueryVariables = Types.Exact<{
  bankCodes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountBankByBankCodesQuery = { bank_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_GetBanksByBankCodesQueryVariables = Types.Exact<{
  bankCodes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_GetBanksByBankCodesQuery = { bank: Array<{ bank_id: string, bank_code: string }> };

export type User_ImportBankBranchesMutationVariables = Types.Exact<{
  data: Array<Types.Bank_Branch_Insert_Input> | Types.Bank_Branch_Insert_Input;
}>;


export type User_ImportBankBranchesMutation = { insert_bank_branch?: { affected_rows: number } | null | undefined };

export type User_CountBankBranchByIdsQueryVariables = Types.Exact<{
  bankBranchIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountBankBranchByIdsQuery = { bank_branch_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type LocationsListByNameLowestLevelQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type LocationsListByNameLowestLevelQuery = { get_locations_lowest_level: Array<{ name: string, location_id: string }> };

export type LocationByLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
}>;


export type LocationByLocationIdQuery = { locations: Array<{ location_id: string, name: string }> };

export type LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type LocationListByIdsQuery = { locations: Array<{ name: string, location_id: string }> };

export type User_LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_LocationListByIdsQuery = { locations: Array<{ location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined }> };

export type User_ImportSchoolCoursesMutationVariables = Types.Exact<{
  data: Array<Types.School_Course_Insert_Input> | Types.School_Course_Insert_Input;
}>;


export type User_ImportSchoolCoursesMutation = { insert_school_course?: { affected_rows: number } | null | undefined };

export type User_CountSchoolCourseByIdsQueryVariables = Types.Exact<{
  schoolCourseIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountSchoolCourseByIdsQuery = { school_course_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_ImportSchoolInfosMutationVariables = Types.Exact<{
  data: Array<Types.School_Info_Insert_Input> | Types.School_Info_Insert_Input;
}>;


export type User_ImportSchoolInfosMutation = { insert_school_info?: { affected_rows: number } | null | undefined };

export type User_CountSchoolInfoByIdsQueryVariables = Types.Exact<{
  schoolInfoIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountSchoolInfoByIdsQuery = { school_info_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_CountSchoolInfoByPartnerIdsQueryVariables = Types.Exact<{
  schoolPartnerIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountSchoolInfoByPartnerIdsQuery = { school_info_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_GetSchoolInfoIdByPartnerIdsQueryVariables = Types.Exact<{
  schoolPartnerIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_GetSchoolInfoIdByPartnerIdsQuery = { school_info: Array<{ school_id: string, school_partner_id: string }> };

export type User_ImportSchoolLevelsMutationVariables = Types.Exact<{
  data: Array<Types.School_Level_Insert_Input> | Types.School_Level_Insert_Input;
}>;


export type User_ImportSchoolLevelsMutation = { insert_school_level?: { affected_rows: number } | null | undefined };

export type User_CountSchoolLevelByIdsQueryVariables = Types.Exact<{
  schoolLevelIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountSchoolLevelByIdsQuery = { school_level_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_ImportSchoolLevelGradesMutationVariables = Types.Exact<{
  data: Array<Types.School_Level_Grade_Insert_Input> | Types.School_Level_Grade_Insert_Input;
}>;


export type User_ImportSchoolLevelGradesMutation = { insert_school_level_grade?: { affected_rows: number } | null | undefined };

export type Payment_GetStudentsManyV3QueryVariables = Types.Exact<{
  studentIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type Payment_GetStudentsManyV3Query = { students: Array<{ enrollment_status: string, student_external_id?: string | null | undefined, student_note: string, student_id: string, current_grade?: number | null | undefined, user?: { user_id: string, email?: string | null | undefined, user_group: string, country: string, first_name: string, last_name: string } | null | undefined }> };

export type User_ImportUserTagsMutationVariables = Types.Exact<{
  data: Array<Types.User_Tag_Insert_Input> | Types.User_Tag_Insert_Input;
}>;


export type User_ImportUserTagsMutation = { insert_user_tag?: { affected_rows: number } | null | undefined };

export type User_CountUserTagByIdsQueryVariables = Types.Exact<{
  userTagIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountUserTagByIdsQuery = { user_tag_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type UserNameByIdsQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type UserNameByIdsQuery = { users: Array<{ user_id: string, name: string }> };
