import * as Types from '../../__generated__/fatima/root-types';

export type User_StudentPackagesClassListWithFilterQueryVariables = Types.Exact<{
  student_id: Types.Scalars['String'];
  student_package_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_StudentPackagesClassListWithFilterQuery = { student_package_class: Array<{ class_id: string, course_id: string, location_id: string, student_package_id: string }> };

export type StudentAttrsFragment = { start_at: any, end_at: any, properties: any, student_package_id: string };

export type StudentAttrsWithListStudentIdFragment = { properties: any, student_package_id: string, student_id: string, end_at: any, start_at: any };

export type User_StudentPackagesByListStudentIdV2QueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  order_by?: Types.Student_Packages_Order_By;
}>;


export type User_StudentPackagesByListStudentIdV2Query = { student_packages: Array<{ location_ids?: any | null | undefined, properties: any, student_package_id: string, student_id: string, end_at: any, start_at: any }> };

export type StudentPackageByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type StudentPackageByIdQuery = { student_packages: Array<{ start_at: any, end_at: any, properties: any, student_package_id: string }> };
