import * as Types from '../../__generated__/fatima/root-types';

export type StudentAttrsWithListStudentIdFragment = { properties: any, student_package_id: string, student_id: string, end_at: any, start_at: any };

export type User_StudentPackagesByListStudentIdV2QueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  order_by?: Types.Student_Packages_Order_By;
}>;


export type User_StudentPackagesByListStudentIdV2Query = { student_packages: Array<{ location_ids?: any | null | undefined, properties: any, student_package_id: string, student_id: string, end_at: any, start_at: any }> };
