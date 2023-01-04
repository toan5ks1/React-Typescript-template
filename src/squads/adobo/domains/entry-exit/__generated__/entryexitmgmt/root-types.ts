export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  smallint: number;
  timestamptz: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  _nlike?: InputMaybe<Scalars['String']>;
  _nsimilar?: InputMaybe<Scalars['String']>;
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "locations" */
export type Locations = {
  access_path?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  is_archived: Scalars['Boolean'];
  location_id: Scalars['String'];
  location_type?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent_location_id?: Maybe<Scalars['String']>;
  partner_internal_id?: Maybe<Scalars['String']>;
  partner_internal_parent_id?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An array relationship */
  user_access_paths: Array<User_Access_Paths>;
  /** An aggregated array relationship */
  user_access_paths_aggregate: User_Access_Paths_Aggregate;
};


/** columns and relationships of "locations" */
export type LocationsUser_Access_PathsArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** columns and relationships of "locations" */
export type LocationsUser_Access_Paths_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};

/** aggregated selection of "locations" */
export type Locations_Aggregate = {
  aggregate?: Maybe<Locations_Aggregate_Fields>;
  nodes: Array<Locations>;
};

/** aggregate fields of "locations" */
export type Locations_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Locations_Max_Fields>;
  min?: Maybe<Locations_Min_Fields>;
};


/** aggregate fields of "locations" */
export type Locations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Locations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "locations" */
export type Locations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Locations_Max_Order_By>;
  min?: InputMaybe<Locations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "locations" */
export type Locations_Arr_Rel_Insert_Input = {
  data: Array<Locations_Insert_Input>;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type Locations_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Locations_Bool_Exp>>>;
  _not?: InputMaybe<Locations_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Locations_Bool_Exp>>>;
  access_path?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  location_type?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent_location_id?: InputMaybe<String_Comparison_Exp>;
  partner_internal_id?: InputMaybe<String_Comparison_Exp>;
  partner_internal_parent_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_access_paths?: InputMaybe<User_Access_Paths_Bool_Exp>;
};

/** unique or primary key constraints on table "locations" */
export enum Locations_Constraint {
  /** unique or primary key constraint */
  LocationPk = 'location_pk'
}

/** input type for inserting data into table "locations" */
export type Locations_Insert_Input = {
  access_path?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent_location_id?: InputMaybe<Scalars['String']>;
  partner_internal_id?: InputMaybe<Scalars['String']>;
  partner_internal_parent_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_access_paths?: InputMaybe<User_Access_Paths_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Locations_Max_Fields = {
  access_path?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  location_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_location_id?: Maybe<Scalars['String']>;
  partner_internal_id?: Maybe<Scalars['String']>;
  partner_internal_parent_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "locations" */
export type Locations_Max_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_location_id?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  partner_internal_parent_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Locations_Min_Fields = {
  access_path?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  location_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_location_id?: Maybe<Scalars['String']>;
  partner_internal_id?: Maybe<Scalars['String']>;
  partner_internal_parent_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "locations" */
export type Locations_Min_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_location_id?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  partner_internal_parent_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "locations" */
export type Locations_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Locations>;
};

/** input type for inserting object relation for remote table "locations" */
export type Locations_Obj_Rel_Insert_Input = {
  data: Locations_Insert_Input;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};

/** on conflict condition type for table "locations" */
export type Locations_On_Conflict = {
  constraint: Locations_Constraint;
  update_columns: Array<Locations_Update_Column>;
  where?: InputMaybe<Locations_Bool_Exp>;
};

/** ordering options when selecting data from "locations" */
export type Locations_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_location_id?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  partner_internal_parent_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_access_paths_aggregate?: InputMaybe<User_Access_Paths_Aggregate_Order_By>;
};

/** primary key columns input for table: "locations" */
export type Locations_Pk_Columns_Input = {
  location_id: Scalars['String'];
};

/** select columns of table "locations" */
export enum Locations_Select_Column {
  /** column name */
  AccessPath = 'access_path',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationType = 'location_type',
  /** column name */
  Name = 'name',
  /** column name */
  ParentLocationId = 'parent_location_id',
  /** column name */
  PartnerInternalId = 'partner_internal_id',
  /** column name */
  PartnerInternalParentId = 'partner_internal_parent_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "locations" */
export type Locations_Set_Input = {
  access_path?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent_location_id?: InputMaybe<Scalars['String']>;
  partner_internal_id?: InputMaybe<Scalars['String']>;
  partner_internal_parent_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "locations" */
export enum Locations_Update_Column {
  /** column name */
  AccessPath = 'access_path',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationType = 'location_type',
  /** column name */
  Name = 'name',
  /** column name */
  ParentLocationId = 'parent_location_id',
  /** column name */
  PartnerInternalId = 'partner_internal_id',
  /** column name */
  PartnerInternalParentId = 'partner_internal_parent_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>;
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>;
  /** delete data from the table: "student_entryexit_records" */
  delete_student_entryexit_records?: Maybe<Student_Entryexit_Records_Mutation_Response>;
  /** delete single row from the table: "student_entryexit_records" */
  delete_student_entryexit_records_by_pk?: Maybe<Student_Entryexit_Records>;
  /** delete data from the table: "student_parents" */
  delete_student_parents?: Maybe<Student_Parents_Mutation_Response>;
  /** delete single row from the table: "student_parents" */
  delete_student_parents_by_pk?: Maybe<Student_Parents>;
  /** delete data from the table: "student_qr" */
  delete_student_qr?: Maybe<Student_Qr_Mutation_Response>;
  /** delete single row from the table: "student_qr" */
  delete_student_qr_by_pk?: Maybe<Student_Qr>;
  /** delete data from the table: "students" */
  delete_students?: Maybe<Students_Mutation_Response>;
  /** delete single row from the table: "students" */
  delete_students_by_pk?: Maybe<Students>;
  /** delete data from the table: "user_access_paths" */
  delete_user_access_paths?: Maybe<User_Access_Paths_Mutation_Response>;
  /** delete single row from the table: "user_access_paths" */
  delete_user_access_paths_by_pk?: Maybe<User_Access_Paths>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>;
  /** insert data into the table: "student_entryexit_records" */
  insert_student_entryexit_records?: Maybe<Student_Entryexit_Records_Mutation_Response>;
  /** insert a single row into the table: "student_entryexit_records" */
  insert_student_entryexit_records_one?: Maybe<Student_Entryexit_Records>;
  /** insert data into the table: "student_parents" */
  insert_student_parents?: Maybe<Student_Parents_Mutation_Response>;
  /** insert a single row into the table: "student_parents" */
  insert_student_parents_one?: Maybe<Student_Parents>;
  /** insert data into the table: "student_qr" */
  insert_student_qr?: Maybe<Student_Qr_Mutation_Response>;
  /** insert a single row into the table: "student_qr" */
  insert_student_qr_one?: Maybe<Student_Qr>;
  /** insert data into the table: "students" */
  insert_students?: Maybe<Students_Mutation_Response>;
  /** insert a single row into the table: "students" */
  insert_students_one?: Maybe<Students>;
  /** insert data into the table: "user_access_paths" */
  insert_user_access_paths?: Maybe<User_Access_Paths_Mutation_Response>;
  /** insert a single row into the table: "user_access_paths" */
  insert_user_access_paths_one?: Maybe<User_Access_Paths>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>;
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>;
  /** update data of the table: "student_entryexit_records" */
  update_student_entryexit_records?: Maybe<Student_Entryexit_Records_Mutation_Response>;
  /** update single row of the table: "student_entryexit_records" */
  update_student_entryexit_records_by_pk?: Maybe<Student_Entryexit_Records>;
  /** update data of the table: "student_parents" */
  update_student_parents?: Maybe<Student_Parents_Mutation_Response>;
  /** update single row of the table: "student_parents" */
  update_student_parents_by_pk?: Maybe<Student_Parents>;
  /** update data of the table: "student_qr" */
  update_student_qr?: Maybe<Student_Qr_Mutation_Response>;
  /** update single row of the table: "student_qr" */
  update_student_qr_by_pk?: Maybe<Student_Qr>;
  /** update data of the table: "students" */
  update_students?: Maybe<Students_Mutation_Response>;
  /** update single row of the table: "students" */
  update_students_by_pk?: Maybe<Students>;
  /** update data of the table: "user_access_paths" */
  update_user_access_paths?: Maybe<User_Access_Paths_Mutation_Response>;
  /** update single row of the table: "user_access_paths" */
  update_user_access_paths_by_pk?: Maybe<User_Access_Paths>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_LocationsArgs = {
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Locations_By_PkArgs = {
  location_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_Entryexit_RecordsArgs = {
  where: Student_Entryexit_Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Entryexit_Records_By_PkArgs = {
  entryexit_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Student_ParentsArgs = {
  where: Student_Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Parents_By_PkArgs = {
  parent_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_QrArgs = {
  where: Student_Qr_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Qr_By_PkArgs = {
  qr_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_StudentsArgs = {
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Students_By_PkArgs = {
  student_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_Access_PathsArgs = {
  where: User_Access_Paths_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Access_Paths_By_PkArgs = {
  location_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_LocationsArgs = {
  objects: Array<Locations_Insert_Input>;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Locations_OneArgs = {
  object: Locations_Insert_Input;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Entryexit_RecordsArgs = {
  objects: Array<Student_Entryexit_Records_Insert_Input>;
  on_conflict?: InputMaybe<Student_Entryexit_Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Entryexit_Records_OneArgs = {
  object: Student_Entryexit_Records_Insert_Input;
  on_conflict?: InputMaybe<Student_Entryexit_Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_ParentsArgs = {
  objects: Array<Student_Parents_Insert_Input>;
  on_conflict?: InputMaybe<Student_Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Parents_OneArgs = {
  object: Student_Parents_Insert_Input;
  on_conflict?: InputMaybe<Student_Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_QrArgs = {
  objects: Array<Student_Qr_Insert_Input>;
  on_conflict?: InputMaybe<Student_Qr_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Qr_OneArgs = {
  object: Student_Qr_Insert_Input;
  on_conflict?: InputMaybe<Student_Qr_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StudentsArgs = {
  objects: Array<Students_Insert_Input>;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Students_OneArgs = {
  object: Students_Insert_Input;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Access_PathsArgs = {
  objects: Array<User_Access_Paths_Insert_Input>;
  on_conflict?: InputMaybe<User_Access_Paths_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Access_Paths_OneArgs = {
  object: User_Access_Paths_Insert_Input;
  on_conflict?: InputMaybe<User_Access_Paths_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_LocationsArgs = {
  _set?: InputMaybe<Locations_Set_Input>;
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Locations_By_PkArgs = {
  _set?: InputMaybe<Locations_Set_Input>;
  pk_columns: Locations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Entryexit_RecordsArgs = {
  _inc?: InputMaybe<Student_Entryexit_Records_Inc_Input>;
  _set?: InputMaybe<Student_Entryexit_Records_Set_Input>;
  where: Student_Entryexit_Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Entryexit_Records_By_PkArgs = {
  _inc?: InputMaybe<Student_Entryexit_Records_Inc_Input>;
  _set?: InputMaybe<Student_Entryexit_Records_Set_Input>;
  pk_columns: Student_Entryexit_Records_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_ParentsArgs = {
  _set?: InputMaybe<Student_Parents_Set_Input>;
  where: Student_Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Parents_By_PkArgs = {
  _set?: InputMaybe<Student_Parents_Set_Input>;
  pk_columns: Student_Parents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_QrArgs = {
  _inc?: InputMaybe<Student_Qr_Inc_Input>;
  _set?: InputMaybe<Student_Qr_Set_Input>;
  where: Student_Qr_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Qr_By_PkArgs = {
  _inc?: InputMaybe<Student_Qr_Inc_Input>;
  _set?: InputMaybe<Student_Qr_Set_Input>;
  pk_columns: Student_Qr_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StudentsArgs = {
  _inc?: InputMaybe<Students_Inc_Input>;
  _set?: InputMaybe<Students_Set_Input>;
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Students_By_PkArgs = {
  _inc?: InputMaybe<Students_Inc_Input>;
  _set?: InputMaybe<Students_Set_Input>;
  pk_columns: Students_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Access_PathsArgs = {
  _set?: InputMaybe<User_Access_Paths_Set_Input>;
  where: User_Access_Paths_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Access_Paths_By_PkArgs = {
  _set?: InputMaybe<User_Access_Paths_Set_Input>;
  pk_columns: User_Access_Paths_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "student_entryexit_records" */
  student_entryexit_records: Array<Student_Entryexit_Records>;
  /** fetch aggregated fields from the table: "student_entryexit_records" */
  student_entryexit_records_aggregate: Student_Entryexit_Records_Aggregate;
  /** fetch data from the table: "student_entryexit_records" using primary key columns */
  student_entryexit_records_by_pk?: Maybe<Student_Entryexit_Records>;
  /** fetch data from the table: "student_parents" */
  student_parents: Array<Student_Parents>;
  /** fetch aggregated fields from the table: "student_parents" */
  student_parents_aggregate: Student_Parents_Aggregate;
  /** fetch data from the table: "student_parents" using primary key columns */
  student_parents_by_pk?: Maybe<Student_Parents>;
  /** fetch data from the table: "student_qr" */
  student_qr: Array<Student_Qr>;
  /** fetch aggregated fields from the table: "student_qr" */
  student_qr_aggregate: Student_Qr_Aggregate;
  /** fetch data from the table: "student_qr" using primary key columns */
  student_qr_by_pk?: Maybe<Student_Qr>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** fetch data from the table: "user_access_paths" */
  user_access_paths: Array<User_Access_Paths>;
  /** fetch aggregated fields from the table: "user_access_paths" */
  user_access_paths_aggregate: User_Access_Paths_Aggregate;
  /** fetch data from the table: "user_access_paths" using primary key columns */
  user_access_paths_by_pk?: Maybe<User_Access_Paths>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


/** query root */
export type Query_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


/** query root */
export type Query_RootLocations_By_PkArgs = {
  location_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_Entryexit_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Entryexit_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Entryexit_Records_By_PkArgs = {
  entryexit_id: Scalars['Int'];
};


/** query root */
export type Query_RootStudent_ParentsArgs = {
  distinct_on?: InputMaybe<Array<Student_Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Parents_Order_By>>;
  where?: InputMaybe<Student_Parents_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Parents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Parents_Order_By>>;
  where?: InputMaybe<Student_Parents_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Parents_By_PkArgs = {
  parent_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_QrArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Qr_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Qr_By_PkArgs = {
  qr_id: Scalars['Int'];
};


/** query root */
export type Query_RootStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** query root */
export type Query_RootStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** query root */
export type Query_RootStudents_By_PkArgs = {
  student_id: Scalars['String'];
};


/** query root */
export type Query_RootUser_Access_PathsArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Access_Paths_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Access_Paths_By_PkArgs = {
  location_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  user_id: Scalars['String'];
};

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']>;
  _gt?: InputMaybe<Scalars['smallint']>;
  _gte?: InputMaybe<Scalars['smallint']>;
  _in?: InputMaybe<Array<Scalars['smallint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['smallint']>;
  _lte?: InputMaybe<Scalars['smallint']>;
  _neq?: InputMaybe<Scalars['smallint']>;
  _nin?: InputMaybe<Array<Scalars['smallint']>>;
};

/** columns and relationships of "student_entryexit_records" */
export type Student_Entryexit_Records = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  entry_at: Scalars['timestamptz'];
  entryexit_id: Scalars['Int'];
  exit_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id: Scalars['String'];
  /** An object relationship */
  students: Students;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "student_entryexit_records" */
export type Student_Entryexit_Records_Aggregate = {
  aggregate?: Maybe<Student_Entryexit_Records_Aggregate_Fields>;
  nodes: Array<Student_Entryexit_Records>;
};

/** aggregate fields of "student_entryexit_records" */
export type Student_Entryexit_Records_Aggregate_Fields = {
  avg?: Maybe<Student_Entryexit_Records_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Entryexit_Records_Max_Fields>;
  min?: Maybe<Student_Entryexit_Records_Min_Fields>;
  stddev?: Maybe<Student_Entryexit_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Student_Entryexit_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Student_Entryexit_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Student_Entryexit_Records_Sum_Fields>;
  var_pop?: Maybe<Student_Entryexit_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Student_Entryexit_Records_Var_Samp_Fields>;
  variance?: Maybe<Student_Entryexit_Records_Variance_Fields>;
};


/** aggregate fields of "student_entryexit_records" */
export type Student_Entryexit_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_entryexit_records" */
export type Student_Entryexit_Records_Aggregate_Order_By = {
  avg?: InputMaybe<Student_Entryexit_Records_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Entryexit_Records_Max_Order_By>;
  min?: InputMaybe<Student_Entryexit_Records_Min_Order_By>;
  stddev?: InputMaybe<Student_Entryexit_Records_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Student_Entryexit_Records_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Student_Entryexit_Records_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Student_Entryexit_Records_Sum_Order_By>;
  var_pop?: InputMaybe<Student_Entryexit_Records_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Student_Entryexit_Records_Var_Samp_Order_By>;
  variance?: InputMaybe<Student_Entryexit_Records_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "student_entryexit_records" */
export type Student_Entryexit_Records_Arr_Rel_Insert_Input = {
  data: Array<Student_Entryexit_Records_Insert_Input>;
  on_conflict?: InputMaybe<Student_Entryexit_Records_On_Conflict>;
};

/** aggregate avg on columns */
export type Student_Entryexit_Records_Avg_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Avg_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "student_entryexit_records". All fields are combined with a logical 'AND'. */
export type Student_Entryexit_Records_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Entryexit_Records_Bool_Exp>>>;
  _not?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Entryexit_Records_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  entry_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  entryexit_id?: InputMaybe<Int_Comparison_Exp>;
  exit_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  students?: InputMaybe<Students_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_entryexit_records" */
export enum Student_Entryexit_Records_Constraint {
  /** unique or primary key constraint */
  StudentEntryexitRecordsPk = 'student_entryexit_records_pk'
}

/** input type for incrementing integer column in table "student_entryexit_records" */
export type Student_Entryexit_Records_Inc_Input = {
  entryexit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "student_entryexit_records" */
export type Student_Entryexit_Records_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  entry_at?: InputMaybe<Scalars['timestamptz']>;
  entryexit_id?: InputMaybe<Scalars['Int']>;
  exit_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  students?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Student_Entryexit_Records_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  entry_at?: Maybe<Scalars['timestamptz']>;
  entryexit_id?: Maybe<Scalars['Int']>;
  exit_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  entry_at?: InputMaybe<Order_By>;
  entryexit_id?: InputMaybe<Order_By>;
  exit_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Entryexit_Records_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  entry_at?: Maybe<Scalars['timestamptz']>;
  entryexit_id?: Maybe<Scalars['Int']>;
  exit_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  entry_at?: InputMaybe<Order_By>;
  entryexit_id?: InputMaybe<Order_By>;
  exit_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_entryexit_records" */
export type Student_Entryexit_Records_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Entryexit_Records>;
};

/** input type for inserting object relation for remote table "student_entryexit_records" */
export type Student_Entryexit_Records_Obj_Rel_Insert_Input = {
  data: Student_Entryexit_Records_Insert_Input;
  on_conflict?: InputMaybe<Student_Entryexit_Records_On_Conflict>;
};

/** on conflict condition type for table "student_entryexit_records" */
export type Student_Entryexit_Records_On_Conflict = {
  constraint: Student_Entryexit_Records_Constraint;
  update_columns: Array<Student_Entryexit_Records_Update_Column>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};

/** ordering options when selecting data from "student_entryexit_records" */
export type Student_Entryexit_Records_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  entry_at?: InputMaybe<Order_By>;
  entryexit_id?: InputMaybe<Order_By>;
  exit_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  students?: InputMaybe<Students_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_entryexit_records" */
export type Student_Entryexit_Records_Pk_Columns_Input = {
  entryexit_id: Scalars['Int'];
};

/** select columns of table "student_entryexit_records" */
export enum Student_Entryexit_Records_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EntryAt = 'entry_at',
  /** column name */
  EntryexitId = 'entryexit_id',
  /** column name */
  ExitAt = 'exit_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "student_entryexit_records" */
export type Student_Entryexit_Records_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  entry_at?: InputMaybe<Scalars['timestamptz']>;
  entryexit_id?: InputMaybe<Scalars['Int']>;
  exit_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Student_Entryexit_Records_Stddev_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Stddev_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Student_Entryexit_Records_Stddev_Pop_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Stddev_Pop_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Student_Entryexit_Records_Stddev_Samp_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Stddev_Samp_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Student_Entryexit_Records_Sum_Fields = {
  entryexit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Sum_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** update columns of table "student_entryexit_records" */
export enum Student_Entryexit_Records_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EntryAt = 'entry_at',
  /** column name */
  EntryexitId = 'entryexit_id',
  /** column name */
  ExitAt = 'exit_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Student_Entryexit_Records_Var_Pop_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Var_Pop_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Student_Entryexit_Records_Var_Samp_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Var_Samp_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Student_Entryexit_Records_Variance_Fields = {
  entryexit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "student_entryexit_records" */
export type Student_Entryexit_Records_Variance_Order_By = {
  entryexit_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "student_parents" */
export type Student_Parents = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  parent_id: Scalars['String'];
  relationship: Scalars['String'];
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "student_parents" */
export type Student_Parents_Aggregate = {
  aggregate?: Maybe<Student_Parents_Aggregate_Fields>;
  nodes: Array<Student_Parents>;
};

/** aggregate fields of "student_parents" */
export type Student_Parents_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Parents_Max_Fields>;
  min?: Maybe<Student_Parents_Min_Fields>;
};


/** aggregate fields of "student_parents" */
export type Student_Parents_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Parents_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_parents" */
export type Student_Parents_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Parents_Max_Order_By>;
  min?: InputMaybe<Student_Parents_Min_Order_By>;
};

/** input type for inserting array relation for remote table "student_parents" */
export type Student_Parents_Arr_Rel_Insert_Input = {
  data: Array<Student_Parents_Insert_Input>;
  on_conflict?: InputMaybe<Student_Parents_On_Conflict>;
};

/** Boolean expression to filter rows from the table "student_parents". All fields are combined with a logical 'AND'. */
export type Student_Parents_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Parents_Bool_Exp>>>;
  _not?: InputMaybe<Student_Parents_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Parents_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  parent_id?: InputMaybe<String_Comparison_Exp>;
  relationship?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_parents" */
export enum Student_Parents_Constraint {
  /** unique or primary key constraint */
  StudentParentsPk = 'student_parents_pk'
}

/** input type for inserting data into table "student_parents" */
export type Student_Parents_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  parent_id?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Student_Parents_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  parent_id?: Maybe<Scalars['String']>;
  relationship?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "student_parents" */
export type Student_Parents_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  relationship?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Parents_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  parent_id?: Maybe<Scalars['String']>;
  relationship?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "student_parents" */
export type Student_Parents_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  relationship?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_parents" */
export type Student_Parents_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Parents>;
};

/** input type for inserting object relation for remote table "student_parents" */
export type Student_Parents_Obj_Rel_Insert_Input = {
  data: Student_Parents_Insert_Input;
  on_conflict?: InputMaybe<Student_Parents_On_Conflict>;
};

/** on conflict condition type for table "student_parents" */
export type Student_Parents_On_Conflict = {
  constraint: Student_Parents_Constraint;
  update_columns: Array<Student_Parents_Update_Column>;
  where?: InputMaybe<Student_Parents_Bool_Exp>;
};

/** ordering options when selecting data from "student_parents" */
export type Student_Parents_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  relationship?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_parents" */
export type Student_Parents_Pk_Columns_Input = {
  parent_id: Scalars['String'];
  student_id: Scalars['String'];
};

/** select columns of table "student_parents" */
export enum Student_Parents_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Relationship = 'relationship',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "student_parents" */
export type Student_Parents_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  parent_id?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "student_parents" */
export enum Student_Parents_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Relationship = 'relationship',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "student_qr" */
export type Student_Qr = {
  created_at: Scalars['timestamptz'];
  qr_id: Scalars['Int'];
  qr_url: Scalars['String'];
  resource_path?: Maybe<Scalars['String']>;
  student_id: Scalars['String'];
  /** An object relationship */
  students: Students;
  updated_at: Scalars['timestamptz'];
  version?: Maybe<Scalars['String']>;
};

/** aggregated selection of "student_qr" */
export type Student_Qr_Aggregate = {
  aggregate?: Maybe<Student_Qr_Aggregate_Fields>;
  nodes: Array<Student_Qr>;
};

/** aggregate fields of "student_qr" */
export type Student_Qr_Aggregate_Fields = {
  avg?: Maybe<Student_Qr_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Qr_Max_Fields>;
  min?: Maybe<Student_Qr_Min_Fields>;
  stddev?: Maybe<Student_Qr_Stddev_Fields>;
  stddev_pop?: Maybe<Student_Qr_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Student_Qr_Stddev_Samp_Fields>;
  sum?: Maybe<Student_Qr_Sum_Fields>;
  var_pop?: Maybe<Student_Qr_Var_Pop_Fields>;
  var_samp?: Maybe<Student_Qr_Var_Samp_Fields>;
  variance?: Maybe<Student_Qr_Variance_Fields>;
};


/** aggregate fields of "student_qr" */
export type Student_Qr_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Qr_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_qr" */
export type Student_Qr_Aggregate_Order_By = {
  avg?: InputMaybe<Student_Qr_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Qr_Max_Order_By>;
  min?: InputMaybe<Student_Qr_Min_Order_By>;
  stddev?: InputMaybe<Student_Qr_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Student_Qr_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Student_Qr_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Student_Qr_Sum_Order_By>;
  var_pop?: InputMaybe<Student_Qr_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Student_Qr_Var_Samp_Order_By>;
  variance?: InputMaybe<Student_Qr_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "student_qr" */
export type Student_Qr_Arr_Rel_Insert_Input = {
  data: Array<Student_Qr_Insert_Input>;
  on_conflict?: InputMaybe<Student_Qr_On_Conflict>;
};

/** aggregate avg on columns */
export type Student_Qr_Avg_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "student_qr" */
export type Student_Qr_Avg_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "student_qr". All fields are combined with a logical 'AND'. */
export type Student_Qr_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Qr_Bool_Exp>>>;
  _not?: InputMaybe<Student_Qr_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Qr_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  qr_id?: InputMaybe<Int_Comparison_Exp>;
  qr_url?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  students?: InputMaybe<Students_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_qr" */
export enum Student_Qr_Constraint {
  /** unique or primary key constraint */
  StudentQrPk = 'student_qr_pk',
  /** unique or primary key constraint */
  StudentQrQrUrlKey = 'student_qr_qr_url_key',
  /** unique or primary key constraint */
  StudentQrStudentIdKey = 'student_qr_student_id_key'
}

/** input type for incrementing integer column in table "student_qr" */
export type Student_Qr_Inc_Input = {
  qr_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "student_qr" */
export type Student_Qr_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  qr_id?: InputMaybe<Scalars['Int']>;
  qr_url?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  students?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Student_Qr_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  qr_id?: Maybe<Scalars['Int']>;
  qr_url?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "student_qr" */
export type Student_Qr_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  qr_id?: InputMaybe<Order_By>;
  qr_url?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Qr_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  qr_id?: Maybe<Scalars['Int']>;
  qr_url?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "student_qr" */
export type Student_Qr_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  qr_id?: InputMaybe<Order_By>;
  qr_url?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_qr" */
export type Student_Qr_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Qr>;
};

/** input type for inserting object relation for remote table "student_qr" */
export type Student_Qr_Obj_Rel_Insert_Input = {
  data: Student_Qr_Insert_Input;
  on_conflict?: InputMaybe<Student_Qr_On_Conflict>;
};

/** on conflict condition type for table "student_qr" */
export type Student_Qr_On_Conflict = {
  constraint: Student_Qr_Constraint;
  update_columns: Array<Student_Qr_Update_Column>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};

/** ordering options when selecting data from "student_qr" */
export type Student_Qr_Order_By = {
  created_at?: InputMaybe<Order_By>;
  qr_id?: InputMaybe<Order_By>;
  qr_url?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  students?: InputMaybe<Students_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_qr" */
export type Student_Qr_Pk_Columns_Input = {
  qr_id: Scalars['Int'];
};

/** select columns of table "student_qr" */
export enum Student_Qr_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  QrId = 'qr_id',
  /** column name */
  QrUrl = 'qr_url',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "student_qr" */
export type Student_Qr_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  qr_id?: InputMaybe<Scalars['Int']>;
  qr_url?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Student_Qr_Stddev_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "student_qr" */
export type Student_Qr_Stddev_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Student_Qr_Stddev_Pop_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "student_qr" */
export type Student_Qr_Stddev_Pop_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Student_Qr_Stddev_Samp_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "student_qr" */
export type Student_Qr_Stddev_Samp_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Student_Qr_Sum_Fields = {
  qr_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "student_qr" */
export type Student_Qr_Sum_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** update columns of table "student_qr" */
export enum Student_Qr_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  QrId = 'qr_id',
  /** column name */
  QrUrl = 'qr_url',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** aggregate var_pop on columns */
export type Student_Qr_Var_Pop_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "student_qr" */
export type Student_Qr_Var_Pop_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Student_Qr_Var_Samp_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "student_qr" */
export type Student_Qr_Var_Samp_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Student_Qr_Variance_Fields = {
  qr_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "student_qr" */
export type Student_Qr_Variance_Order_By = {
  qr_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "students" */
export type Students = {
  created_at: Scalars['timestamptz'];
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  enrollment_status: Scalars['String'];
  resource_path: Scalars['String'];
  school_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  student_entryexit_record?: Maybe<Student_Entryexit_Records>;
  /** An array relationship */
  student_entryexit_records: Array<Student_Entryexit_Records>;
  /** An aggregated array relationship */
  student_entryexit_records_aggregate: Student_Entryexit_Records_Aggregate;
  student_id: Scalars['String'];
  /** An array relationship */
  student_qrs: Array<Student_Qr>;
  /** An aggregated array relationship */
  student_qrs_aggregate: Student_Qr_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "students" */
export type StudentsStudent_Entryexit_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsStudent_Entryexit_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsStudent_QrsArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsStudent_Qrs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};

/** aggregated selection of "students" */
export type Students_Aggregate = {
  aggregate?: Maybe<Students_Aggregate_Fields>;
  nodes: Array<Students>;
};

/** aggregate fields of "students" */
export type Students_Aggregate_Fields = {
  avg?: Maybe<Students_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Students_Max_Fields>;
  min?: Maybe<Students_Min_Fields>;
  stddev?: Maybe<Students_Stddev_Fields>;
  stddev_pop?: Maybe<Students_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Students_Stddev_Samp_Fields>;
  sum?: Maybe<Students_Sum_Fields>;
  var_pop?: Maybe<Students_Var_Pop_Fields>;
  var_samp?: Maybe<Students_Var_Samp_Fields>;
  variance?: Maybe<Students_Variance_Fields>;
};


/** aggregate fields of "students" */
export type Students_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Students_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "students" */
export type Students_Aggregate_Order_By = {
  avg?: InputMaybe<Students_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Students_Max_Order_By>;
  min?: InputMaybe<Students_Min_Order_By>;
  stddev?: InputMaybe<Students_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Students_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Students_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Students_Sum_Order_By>;
  var_pop?: InputMaybe<Students_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Students_Var_Samp_Order_By>;
  variance?: InputMaybe<Students_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "students" */
export type Students_Arr_Rel_Insert_Input = {
  data: Array<Students_Insert_Input>;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};

/** aggregate avg on columns */
export type Students_Avg_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "students" */
export type Students_Avg_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "students". All fields are combined with a logical 'AND'. */
export type Students_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Students_Bool_Exp>>>;
  _not?: InputMaybe<Students_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Students_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  current_grade?: InputMaybe<Smallint_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  enrollment_status?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  student_entryexit_record?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
  student_entryexit_records?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_qrs?: InputMaybe<Student_Qr_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "students" */
export enum Students_Constraint {
  /** unique or primary key constraint */
  StudentsPk = 'students_pk'
}

/** input type for incrementing integer column in table "students" */
export type Students_Inc_Input = {
  current_grade?: InputMaybe<Scalars['smallint']>;
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "students" */
export type Students_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_grade?: InputMaybe<Scalars['smallint']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  enrollment_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  student_entryexit_record?: InputMaybe<Student_Entryexit_Records_Obj_Rel_Insert_Input>;
  student_entryexit_records?: InputMaybe<Student_Entryexit_Records_Arr_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']>;
  student_qrs?: InputMaybe<Student_Qr_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Students_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  enrollment_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "students" */
export type Students_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_grade?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  enrollment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Students_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  enrollment_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "students" */
export type Students_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_grade?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  enrollment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "students" */
export type Students_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Students>;
};

/** input type for inserting object relation for remote table "students" */
export type Students_Obj_Rel_Insert_Input = {
  data: Students_Insert_Input;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};

/** on conflict condition type for table "students" */
export type Students_On_Conflict = {
  constraint: Students_Constraint;
  update_columns: Array<Students_Update_Column>;
  where?: InputMaybe<Students_Bool_Exp>;
};

/** ordering options when selecting data from "students" */
export type Students_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_grade?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  enrollment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  student_entryexit_record?: InputMaybe<Student_Entryexit_Records_Order_By>;
  student_entryexit_records_aggregate?: InputMaybe<Student_Entryexit_Records_Aggregate_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_qrs_aggregate?: InputMaybe<Student_Qr_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "students" */
export type Students_Pk_Columns_Input = {
  student_id: Scalars['String'];
};

/** select columns of table "students" */
export enum Students_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentGrade = 'current_grade',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EnrollmentStatus = 'enrollment_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "students" */
export type Students_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_grade?: InputMaybe<Scalars['smallint']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  enrollment_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Students_Stddev_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "students" */
export type Students_Stddev_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Students_Stddev_Pop_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "students" */
export type Students_Stddev_Pop_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Students_Stddev_Samp_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "students" */
export type Students_Stddev_Samp_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Students_Sum_Fields = {
  current_grade?: Maybe<Scalars['smallint']>;
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "students" */
export type Students_Sum_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "students" */
export enum Students_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentGrade = 'current_grade',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EnrollmentStatus = 'enrollment_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Students_Var_Pop_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "students" */
export type Students_Var_Pop_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Students_Var_Samp_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "students" */
export type Students_Var_Samp_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Students_Variance_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "students" */
export type Students_Variance_Order_By = {
  current_grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "student_entryexit_records" */
  student_entryexit_records: Array<Student_Entryexit_Records>;
  /** fetch aggregated fields from the table: "student_entryexit_records" */
  student_entryexit_records_aggregate: Student_Entryexit_Records_Aggregate;
  /** fetch data from the table: "student_entryexit_records" using primary key columns */
  student_entryexit_records_by_pk?: Maybe<Student_Entryexit_Records>;
  /** fetch data from the table: "student_parents" */
  student_parents: Array<Student_Parents>;
  /** fetch aggregated fields from the table: "student_parents" */
  student_parents_aggregate: Student_Parents_Aggregate;
  /** fetch data from the table: "student_parents" using primary key columns */
  student_parents_by_pk?: Maybe<Student_Parents>;
  /** fetch data from the table: "student_qr" */
  student_qr: Array<Student_Qr>;
  /** fetch aggregated fields from the table: "student_qr" */
  student_qr_aggregate: Student_Qr_Aggregate;
  /** fetch data from the table: "student_qr" using primary key columns */
  student_qr_by_pk?: Maybe<Student_Qr>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** fetch data from the table: "user_access_paths" */
  user_access_paths: Array<User_Access_Paths>;
  /** fetch aggregated fields from the table: "user_access_paths" */
  user_access_paths_aggregate: User_Access_Paths_Aggregate;
  /** fetch data from the table: "user_access_paths" using primary key columns */
  user_access_paths_by_pk?: Maybe<User_Access_Paths>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLocations_By_PkArgs = {
  location_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_Entryexit_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Entryexit_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Entryexit_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Entryexit_Records_Order_By>>;
  where?: InputMaybe<Student_Entryexit_Records_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Entryexit_Records_By_PkArgs = {
  entryexit_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootStudent_ParentsArgs = {
  distinct_on?: InputMaybe<Array<Student_Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Parents_Order_By>>;
  where?: InputMaybe<Student_Parents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Parents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Parents_Order_By>>;
  where?: InputMaybe<Student_Parents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Parents_By_PkArgs = {
  parent_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_QrArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Qr_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Qr_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Qr_Order_By>>;
  where?: InputMaybe<Student_Qr_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Qr_By_PkArgs = {
  qr_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudents_By_PkArgs = {
  student_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUser_Access_PathsArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Access_Paths_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Access_Paths_By_PkArgs = {
  location_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  user_id: Scalars['String'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_access_paths" */
export type User_Access_Paths = {
  access_path?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  location: Locations;
  location_id: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "user_access_paths" */
export type User_Access_Paths_Aggregate = {
  aggregate?: Maybe<User_Access_Paths_Aggregate_Fields>;
  nodes: Array<User_Access_Paths>;
};

/** aggregate fields of "user_access_paths" */
export type User_Access_Paths_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Access_Paths_Max_Fields>;
  min?: Maybe<User_Access_Paths_Min_Fields>;
};


/** aggregate fields of "user_access_paths" */
export type User_Access_Paths_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_access_paths" */
export type User_Access_Paths_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Access_Paths_Max_Order_By>;
  min?: InputMaybe<User_Access_Paths_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_access_paths" */
export type User_Access_Paths_Arr_Rel_Insert_Input = {
  data: Array<User_Access_Paths_Insert_Input>;
  on_conflict?: InputMaybe<User_Access_Paths_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_access_paths". All fields are combined with a logical 'AND'. */
export type User_Access_Paths_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<User_Access_Paths_Bool_Exp>>>;
  _not?: InputMaybe<User_Access_Paths_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<User_Access_Paths_Bool_Exp>>>;
  access_path?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location?: InputMaybe<Locations_Bool_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_access_paths" */
export enum User_Access_Paths_Constraint {
  /** unique or primary key constraint */
  UserAccessPathsPk = 'user_access_paths_pk'
}

/** input type for inserting data into table "user_access_paths" */
export type User_Access_Paths_Insert_Input = {
  access_path?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location?: InputMaybe<Locations_Obj_Rel_Insert_Input>;
  location_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Access_Paths_Max_Fields = {
  access_path?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_access_paths" */
export type User_Access_Paths_Max_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Access_Paths_Min_Fields = {
  access_path?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_access_paths" */
export type User_Access_Paths_Min_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_access_paths" */
export type User_Access_Paths_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Access_Paths>;
};

/** input type for inserting object relation for remote table "user_access_paths" */
export type User_Access_Paths_Obj_Rel_Insert_Input = {
  data: User_Access_Paths_Insert_Input;
  on_conflict?: InputMaybe<User_Access_Paths_On_Conflict>;
};

/** on conflict condition type for table "user_access_paths" */
export type User_Access_Paths_On_Conflict = {
  constraint: User_Access_Paths_Constraint;
  update_columns: Array<User_Access_Paths_Update_Column>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};

/** ordering options when selecting data from "user_access_paths" */
export type User_Access_Paths_Order_By = {
  access_path?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location?: InputMaybe<Locations_Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "user_access_paths" */
export type User_Access_Paths_Pk_Columns_Input = {
  location_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** select columns of table "user_access_paths" */
export enum User_Access_Paths_Select_Column {
  /** column name */
  AccessPath = 'access_path',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_access_paths" */
export type User_Access_Paths_Set_Input = {
  access_path?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "user_access_paths" */
export enum User_Access_Paths_Update_Column {
  /** column name */
  AccessPath = 'access_path',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "users" */
export type Users = {
  allow_notification?: Maybe<Scalars['Boolean']>;
  country: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An array relationship */
  user_access_paths: Array<User_Access_Paths>;
  /** An aggregated array relationship */
  user_access_paths_aggregate: User_Access_Paths_Aggregate;
  user_group: Scalars['String'];
  user_id: Scalars['String'];
};


/** columns and relationships of "users" */
export type UsersUser_Access_PathsArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Access_Paths_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Access_Paths_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Access_Paths_Order_By>>;
  where?: InputMaybe<User_Access_Paths_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  allow_notification?: InputMaybe<Boolean_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  device_token?: InputMaybe<String_Comparison_Exp>;
  given_name?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_access_paths?: InputMaybe<User_Access_Paths_Bool_Exp>;
  user_group?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPk = 'users_pk'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  allow_notification?: InputMaybe<Scalars['Boolean']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  device_token?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_access_paths?: InputMaybe<User_Access_Paths_Arr_Rel_Insert_Input>;
  user_group?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_group?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_group?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_group?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_group?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  allow_notification?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_access_paths_aggregate?: InputMaybe<User_Access_Paths_Aggregate_Order_By>;
  user_group?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  user_id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AllowNotification = 'allow_notification',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DeviceToken = 'device_token',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserGroup = 'user_group',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  allow_notification?: InputMaybe<Scalars['Boolean']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  device_token?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_group?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AllowNotification = 'allow_notification',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DeviceToken = 'device_token',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserGroup = 'user_group',
  /** column name */
  UserId = 'user_id'
}
