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
  _int4: any;
  _text: any;
  jsonb: any;
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

/** expression to compare columns of type _int4. All fields are combined with logical 'AND'. */
export type _Int4_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_int4']>;
  _gt?: InputMaybe<Scalars['_int4']>;
  _gte?: InputMaybe<Scalars['_int4']>;
  _in?: InputMaybe<Array<Scalars['_int4']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_int4']>;
  _lte?: InputMaybe<Scalars['_int4']>;
  _neq?: InputMaybe<Scalars['_int4']>;
  _nin?: InputMaybe<Array<Scalars['_int4']>>;
};

/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks = {
  course_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  error_detail?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  resource_path: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  study_plan_ids: Scalars['_text'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Aggregate = {
  aggregate?: Maybe<Assign_Study_Plan_Tasks_Aggregate_Fields>;
  nodes: Array<Assign_Study_Plan_Tasks>;
};

/** aggregate fields of "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Assign_Study_Plan_Tasks_Max_Fields>;
  min?: Maybe<Assign_Study_Plan_Tasks_Min_Fields>;
};


/** aggregate fields of "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Assign_Study_Plan_Tasks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Assign_Study_Plan_Tasks_Max_Order_By>;
  min?: InputMaybe<Assign_Study_Plan_Tasks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Arr_Rel_Insert_Input = {
  data: Array<Assign_Study_Plan_Tasks_Insert_Input>;
  on_conflict?: InputMaybe<Assign_Study_Plan_Tasks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "assign_study_plan_tasks". All fields are combined with a logical 'AND'. */
export type Assign_Study_Plan_Tasks_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>>>;
  _not?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>>>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  error_detail?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  study_plan_ids?: InputMaybe<_Text_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "assign_study_plan_tasks" */
export enum Assign_Study_Plan_Tasks_Constraint {
  /** unique or primary key constraint */
  AssignStudyPlanTasksPk = 'assign_study_plan_tasks_pk'
}

/** input type for inserting data into table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Insert_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  error_detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  study_plan_ids?: InputMaybe<Scalars['_text']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Assign_Study_Plan_Tasks_Max_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  error_detail?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Max_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  error_detail?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Assign_Study_Plan_Tasks_Min_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  error_detail?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Min_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  error_detail?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Assign_Study_Plan_Tasks>;
};

/** input type for inserting object relation for remote table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Obj_Rel_Insert_Input = {
  data: Assign_Study_Plan_Tasks_Insert_Input;
  on_conflict?: InputMaybe<Assign_Study_Plan_Tasks_On_Conflict>;
};

/** on conflict condition type for table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_On_Conflict = {
  constraint: Assign_Study_Plan_Tasks_Constraint;
  update_columns: Array<Assign_Study_Plan_Tasks_Update_Column>;
  where?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
};

/** ordering options when selecting data from "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  error_detail?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan_ids?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "assign_study_plan_tasks" */
export enum Assign_Study_Plan_Tasks_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ErrorDetail = 'error_detail',
  /** column name */
  Id = 'id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanIds = 'study_plan_ids',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "assign_study_plan_tasks" */
export type Assign_Study_Plan_Tasks_Set_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  error_detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  study_plan_ids?: InputMaybe<Scalars['_text']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "assign_study_plan_tasks" */
export enum Assign_Study_Plan_Tasks_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ErrorDetail = 'error_detail',
  /** column name */
  Id = 'id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanIds = 'study_plan_ids',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items = {
  /** An object relationship */
  assignment: Assignments;
  assignment_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  /** An object relationship */
  study_plan_item: Study_Plan_Items;
  study_plan_item_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Aggregate = {
  aggregate?: Maybe<Assignment_Study_Plan_Items_Aggregate_Fields>;
  nodes: Array<Assignment_Study_Plan_Items>;
};

/** aggregate fields of "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Assignment_Study_Plan_Items_Max_Fields>;
  min?: Maybe<Assignment_Study_Plan_Items_Min_Fields>;
};


/** aggregate fields of "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Assignment_Study_Plan_Items_Max_Order_By>;
  min?: InputMaybe<Assignment_Study_Plan_Items_Min_Order_By>;
};

/** input type for inserting array relation for remote table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Arr_Rel_Insert_Input = {
  data: Array<Assignment_Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Assignment_Study_Plan_Items_On_Conflict>;
};

/** Boolean expression to filter rows from the table "assignment_study_plan_items". All fields are combined with a logical 'AND'. */
export type Assignment_Study_Plan_Items_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>>>;
  _not?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>>>;
  assignment?: InputMaybe<Assignments_Bool_Exp>;
  assignment_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Bool_Exp>;
  study_plan_item_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "assignment_study_plan_items" */
export enum Assignment_Study_Plan_Items_Constraint {
  /** unique or primary key constraint */
  AssignmentStudyPlanItemsPk = 'assignment_study_plan_items_pk',
  /** unique or primary key constraint */
  AssignmentStudyPlanItemsStudyPlanItemIdUn = 'assignment_study_plan_items_study_plan_item_id_un'
}

/** input type for inserting data into table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Insert_Input = {
  assignment?: InputMaybe<Assignments_Obj_Rel_Insert_Input>;
  assignment_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Obj_Rel_Insert_Input>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Assignment_Study_Plan_Items_Max_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Max_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Assignment_Study_Plan_Items_Min_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Min_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Assignment_Study_Plan_Items>;
};

/** input type for inserting object relation for remote table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Obj_Rel_Insert_Input = {
  data: Assignment_Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Assignment_Study_Plan_Items_On_Conflict>;
};

/** on conflict condition type for table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_On_Conflict = {
  constraint: Assignment_Study_Plan_Items_Constraint;
  update_columns: Array<Assignment_Study_Plan_Items_Update_Column>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};

/** ordering options when selecting data from "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Order_By = {
  assignment?: InputMaybe<Assignments_Order_By>;
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Pk_Columns_Input = {
  assignment_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};

/** select columns of table "assignment_study_plan_items" */
export enum Assignment_Study_Plan_Items_Select_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "assignment_study_plan_items" */
export type Assignment_Study_Plan_Items_Set_Input = {
  assignment_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "assignment_study_plan_items" */
export enum Assignment_Study_Plan_Items_Update_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "assignments" */
export type Assignments = {
  assignment_id: Scalars['String'];
  /** An array relationship */
  assignment_study_plan_items: Array<Assignment_Study_Plan_Items>;
  /** An aggregated array relationship */
  assignment_study_plan_items_aggregate: Assignment_Study_Plan_Items_Aggregate;
  attachment?: Maybe<Scalars['_text']>;
  check_list?: Maybe<Scalars['jsonb']>;
  content?: Maybe<Scalars['jsonb']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['Int']>;
  instruction?: Maybe<Scalars['String']>;
  is_required_grade?: Maybe<Scalars['Boolean']>;
  max_grade?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  original_topic?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  settings?: Maybe<Scalars['jsonb']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "assignments" */
export type AssignmentsAssignment_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "assignments" */
export type AssignmentsAssignment_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "assignments" */
export type AssignmentsCheck_ListArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "assignments" */
export type AssignmentsContentArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "assignments" */
export type AssignmentsSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "assignments" */
export type Assignments_Aggregate = {
  aggregate?: Maybe<Assignments_Aggregate_Fields>;
  nodes: Array<Assignments>;
};

/** aggregate fields of "assignments" */
export type Assignments_Aggregate_Fields = {
  avg?: Maybe<Assignments_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Assignments_Max_Fields>;
  min?: Maybe<Assignments_Min_Fields>;
  stddev?: Maybe<Assignments_Stddev_Fields>;
  stddev_pop?: Maybe<Assignments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Assignments_Stddev_Samp_Fields>;
  sum?: Maybe<Assignments_Sum_Fields>;
  var_pop?: Maybe<Assignments_Var_Pop_Fields>;
  var_samp?: Maybe<Assignments_Var_Samp_Fields>;
  variance?: Maybe<Assignments_Variance_Fields>;
};


/** aggregate fields of "assignments" */
export type Assignments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Assignments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "assignments" */
export type Assignments_Aggregate_Order_By = {
  avg?: InputMaybe<Assignments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Assignments_Max_Order_By>;
  min?: InputMaybe<Assignments_Min_Order_By>;
  stddev?: InputMaybe<Assignments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Assignments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Assignments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Assignments_Sum_Order_By>;
  var_pop?: InputMaybe<Assignments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Assignments_Var_Samp_Order_By>;
  variance?: InputMaybe<Assignments_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Assignments_Append_Input = {
  check_list?: InputMaybe<Scalars['jsonb']>;
  content?: InputMaybe<Scalars['jsonb']>;
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "assignments" */
export type Assignments_Arr_Rel_Insert_Input = {
  data: Array<Assignments_Insert_Input>;
  on_conflict?: InputMaybe<Assignments_On_Conflict>;
};

/** aggregate avg on columns */
export type Assignments_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "assignments" */
export type Assignments_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "assignments". All fields are combined with a logical 'AND'. */
export type Assignments_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Assignments_Bool_Exp>>>;
  _not?: InputMaybe<Assignments_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Assignments_Bool_Exp>>>;
  assignment_id?: InputMaybe<String_Comparison_Exp>;
  assignment_study_plan_items?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
  attachment?: InputMaybe<_Text_Comparison_Exp>;
  check_list?: InputMaybe<Jsonb_Comparison_Exp>;
  content?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Int_Comparison_Exp>;
  instruction?: InputMaybe<String_Comparison_Exp>;
  is_required_grade?: InputMaybe<Boolean_Comparison_Exp>;
  max_grade?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  original_topic?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  settings?: InputMaybe<Jsonb_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "assignments" */
export enum Assignments_Constraint {
  /** unique or primary key constraint */
  AssignmentsPk = 'assignments_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Assignments_Delete_At_Path_Input = {
  check_list?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  settings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Assignments_Delete_Elem_Input = {
  check_list?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['Int']>;
  settings?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Assignments_Delete_Key_Input = {
  check_list?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "assignments" */
export type Assignments_Inc_Input = {
  display_order?: InputMaybe<Scalars['Int']>;
  max_grade?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "assignments" */
export type Assignments_Insert_Input = {
  assignment_id?: InputMaybe<Scalars['String']>;
  assignment_study_plan_items?: InputMaybe<Assignment_Study_Plan_Items_Arr_Rel_Insert_Input>;
  attachment?: InputMaybe<Scalars['_text']>;
  check_list?: InputMaybe<Scalars['jsonb']>;
  content?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['Int']>;
  instruction?: InputMaybe<Scalars['String']>;
  is_required_grade?: InputMaybe<Scalars['Boolean']>;
  max_grade?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  original_topic?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Assignments_Max_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['Int']>;
  instruction?: Maybe<Scalars['String']>;
  max_grade?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  original_topic?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "assignments" */
export type Assignments_Max_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  original_topic?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Assignments_Min_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['Int']>;
  instruction?: Maybe<Scalars['String']>;
  max_grade?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  original_topic?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "assignments" */
export type Assignments_Min_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  original_topic?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "assignments" */
export type Assignments_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Assignments>;
};

/** input type for inserting object relation for remote table "assignments" */
export type Assignments_Obj_Rel_Insert_Input = {
  data: Assignments_Insert_Input;
  on_conflict?: InputMaybe<Assignments_On_Conflict>;
};

/** on conflict condition type for table "assignments" */
export type Assignments_On_Conflict = {
  constraint: Assignments_Constraint;
  update_columns: Array<Assignments_Update_Column>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};

/** ordering options when selecting data from "assignments" */
export type Assignments_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  assignment_study_plan_items_aggregate?: InputMaybe<Assignment_Study_Plan_Items_Aggregate_Order_By>;
  attachment?: InputMaybe<Order_By>;
  check_list?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  is_required_grade?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  original_topic?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  settings?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "assignments" */
export type Assignments_Pk_Columns_Input = {
  assignment_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Assignments_Prepend_Input = {
  check_list?: InputMaybe<Scalars['jsonb']>;
  content?: InputMaybe<Scalars['jsonb']>;
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "assignments" */
export enum Assignments_Select_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  Attachment = 'attachment',
  /** column name */
  CheckList = 'check_list',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Instruction = 'instruction',
  /** column name */
  IsRequiredGrade = 'is_required_grade',
  /** column name */
  MaxGrade = 'max_grade',
  /** column name */
  Name = 'name',
  /** column name */
  OriginalTopic = 'original_topic',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Settings = 'settings',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "assignments" */
export type Assignments_Set_Input = {
  assignment_id?: InputMaybe<Scalars['String']>;
  attachment?: InputMaybe<Scalars['_text']>;
  check_list?: InputMaybe<Scalars['jsonb']>;
  content?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['Int']>;
  instruction?: InputMaybe<Scalars['String']>;
  is_required_grade?: InputMaybe<Scalars['Boolean']>;
  max_grade?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  original_topic?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Assignments_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "assignments" */
export type Assignments_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Assignments_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "assignments" */
export type Assignments_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Assignments_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "assignments" */
export type Assignments_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Assignments_Sum_Fields = {
  display_order?: Maybe<Scalars['Int']>;
  max_grade?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "assignments" */
export type Assignments_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** update columns of table "assignments" */
export enum Assignments_Update_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  Attachment = 'attachment',
  /** column name */
  CheckList = 'check_list',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Instruction = 'instruction',
  /** column name */
  IsRequiredGrade = 'is_required_grade',
  /** column name */
  MaxGrade = 'max_grade',
  /** column name */
  Name = 'name',
  /** column name */
  OriginalTopic = 'original_topic',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Settings = 'settings',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Assignments_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "assignments" */
export type Assignments_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Assignments_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "assignments" */
export type Assignments_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Assignments_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  max_grade?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "assignments" */
export type Assignments_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
  max_grade?: InputMaybe<Order_By>;
};

/** columns and relationships of "books" */
export type Books = {
  /** An array relationship */
  book_chapters: Array<Books_Chapters>;
  /** An aggregated array relationship */
  book_chapters_aggregate: Books_Chapters_Aggregate;
  book_id: Scalars['String'];
  book_type?: Maybe<Scalars['String']>;
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** An array relationship */
  course_books: Array<Courses_Books>;
  /** An aggregated array relationship */
  course_books_aggregate: Courses_Books_Aggregate;
  created_at: Scalars['timestamptz'];
  current_chapter_display_order: Scalars['Int'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name: Scalars['String'];
  resource_path: Scalars['String'];
  school_id: Scalars['Int'];
  subject?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "books" */
export type BooksBook_ChaptersArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** columns and relationships of "books" */
export type BooksBook_Chapters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** columns and relationships of "books" */
export type BooksCourse_BooksArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};


/** columns and relationships of "books" */
export type BooksCourse_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};

/** aggregated selection of "books" */
export type Books_Aggregate = {
  aggregate?: Maybe<Books_Aggregate_Fields>;
  nodes: Array<Books>;
};

/** aggregate fields of "books" */
export type Books_Aggregate_Fields = {
  avg?: Maybe<Books_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Books_Max_Fields>;
  min?: Maybe<Books_Min_Fields>;
  stddev?: Maybe<Books_Stddev_Fields>;
  stddev_pop?: Maybe<Books_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Books_Stddev_Samp_Fields>;
  sum?: Maybe<Books_Sum_Fields>;
  var_pop?: Maybe<Books_Var_Pop_Fields>;
  var_samp?: Maybe<Books_Var_Samp_Fields>;
  variance?: Maybe<Books_Variance_Fields>;
};


/** aggregate fields of "books" */
export type Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "books" */
export type Books_Aggregate_Order_By = {
  avg?: InputMaybe<Books_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Books_Max_Order_By>;
  min?: InputMaybe<Books_Min_Order_By>;
  stddev?: InputMaybe<Books_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Books_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Books_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Books_Sum_Order_By>;
  var_pop?: InputMaybe<Books_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Books_Var_Samp_Order_By>;
  variance?: InputMaybe<Books_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "books" */
export type Books_Arr_Rel_Insert_Input = {
  data: Array<Books_Insert_Input>;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};

/** aggregate avg on columns */
export type Books_Avg_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "books" */
export type Books_Avg_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "books". All fields are combined with a logical 'AND'. */
export type Books_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Books_Bool_Exp>>>;
  _not?: InputMaybe<Books_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Books_Bool_Exp>>>;
  book_chapters?: InputMaybe<Books_Chapters_Bool_Exp>;
  book_id?: InputMaybe<String_Comparison_Exp>;
  book_type?: InputMaybe<String_Comparison_Exp>;
  copied_from?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  course_books?: InputMaybe<Courses_Books_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  current_chapter_display_order?: InputMaybe<Int_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  grade?: InputMaybe<Smallint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** columns and relationships of "books_chapters" */
export type Books_Chapters = {
  /** An object relationship */
  book?: Maybe<Books>;
  book_id: Scalars['String'];
  /** An object relationship */
  chapter?: Maybe<Chapters>;
  chapter_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "books_chapters" */
export type Books_Chapters_Aggregate = {
  aggregate?: Maybe<Books_Chapters_Aggregate_Fields>;
  nodes: Array<Books_Chapters>;
};

/** aggregate fields of "books_chapters" */
export type Books_Chapters_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Books_Chapters_Max_Fields>;
  min?: Maybe<Books_Chapters_Min_Fields>;
};


/** aggregate fields of "books_chapters" */
export type Books_Chapters_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "books_chapters" */
export type Books_Chapters_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Books_Chapters_Max_Order_By>;
  min?: InputMaybe<Books_Chapters_Min_Order_By>;
};

/** input type for inserting array relation for remote table "books_chapters" */
export type Books_Chapters_Arr_Rel_Insert_Input = {
  data: Array<Books_Chapters_Insert_Input>;
  on_conflict?: InputMaybe<Books_Chapters_On_Conflict>;
};

/** Boolean expression to filter rows from the table "books_chapters". All fields are combined with a logical 'AND'. */
export type Books_Chapters_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Books_Chapters_Bool_Exp>>>;
  _not?: InputMaybe<Books_Chapters_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Books_Chapters_Bool_Exp>>>;
  book?: InputMaybe<Books_Bool_Exp>;
  book_id?: InputMaybe<String_Comparison_Exp>;
  chapter?: InputMaybe<Chapters_Bool_Exp>;
  chapter_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "books_chapters" */
export enum Books_Chapters_Constraint {
  /** unique or primary key constraint */
  BooksChaptersPk = 'books_chapters_pk'
}

/** input type for inserting data into table "books_chapters" */
export type Books_Chapters_Insert_Input = {
  book?: InputMaybe<Books_Obj_Rel_Insert_Input>;
  book_id?: InputMaybe<Scalars['String']>;
  chapter?: InputMaybe<Chapters_Obj_Rel_Insert_Input>;
  chapter_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Books_Chapters_Max_Fields = {
  book_id?: Maybe<Scalars['String']>;
  chapter_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "books_chapters" */
export type Books_Chapters_Max_Order_By = {
  book_id?: InputMaybe<Order_By>;
  chapter_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Books_Chapters_Min_Fields = {
  book_id?: Maybe<Scalars['String']>;
  chapter_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "books_chapters" */
export type Books_Chapters_Min_Order_By = {
  book_id?: InputMaybe<Order_By>;
  chapter_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "books_chapters" */
export type Books_Chapters_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Books_Chapters>;
};

/** input type for inserting object relation for remote table "books_chapters" */
export type Books_Chapters_Obj_Rel_Insert_Input = {
  data: Books_Chapters_Insert_Input;
  on_conflict?: InputMaybe<Books_Chapters_On_Conflict>;
};

/** on conflict condition type for table "books_chapters" */
export type Books_Chapters_On_Conflict = {
  constraint: Books_Chapters_Constraint;
  update_columns: Array<Books_Chapters_Update_Column>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};

/** ordering options when selecting data from "books_chapters" */
export type Books_Chapters_Order_By = {
  book?: InputMaybe<Books_Order_By>;
  book_id?: InputMaybe<Order_By>;
  chapter?: InputMaybe<Chapters_Order_By>;
  chapter_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "books_chapters" */
export type Books_Chapters_Pk_Columns_Input = {
  book_id: Scalars['String'];
  chapter_id: Scalars['String'];
};

/** select columns of table "books_chapters" */
export enum Books_Chapters_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "books_chapters" */
export type Books_Chapters_Set_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  chapter_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "books_chapters" */
export enum Books_Chapters_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** unique or primary key constraints on table "books" */
export enum Books_Constraint {
  /** unique or primary key constraint */
  BooksPk = 'books_pk'
}

/** input type for incrementing integer column in table "books" */
export type Books_Inc_Input = {
  current_chapter_display_order?: InputMaybe<Scalars['Int']>;
  grade?: InputMaybe<Scalars['smallint']>;
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "books" */
export type Books_Insert_Input = {
  book_chapters?: InputMaybe<Books_Chapters_Arr_Rel_Insert_Input>;
  book_id?: InputMaybe<Scalars['String']>;
  book_type?: InputMaybe<Scalars['String']>;
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  course_books?: InputMaybe<Courses_Books_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_chapter_display_order?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Books_Max_Fields = {
  book_id?: Maybe<Scalars['String']>;
  book_type?: Maybe<Scalars['String']>;
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_chapter_display_order?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "books" */
export type Books_Max_Order_By = {
  book_id?: InputMaybe<Order_By>;
  book_type?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_chapter_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Books_Min_Fields = {
  book_id?: Maybe<Scalars['String']>;
  book_type?: Maybe<Scalars['String']>;
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_chapter_display_order?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "books" */
export type Books_Min_Order_By = {
  book_id?: InputMaybe<Order_By>;
  book_type?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_chapter_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "books" */
export type Books_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Books>;
};

/** input type for inserting object relation for remote table "books" */
export type Books_Obj_Rel_Insert_Input = {
  data: Books_Insert_Input;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};

/** on conflict condition type for table "books" */
export type Books_On_Conflict = {
  constraint: Books_Constraint;
  update_columns: Array<Books_Update_Column>;
  where?: InputMaybe<Books_Bool_Exp>;
};

/** ordering options when selecting data from "books" */
export type Books_Order_By = {
  book_chapters_aggregate?: InputMaybe<Books_Chapters_Aggregate_Order_By>;
  book_id?: InputMaybe<Order_By>;
  book_type?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  course_books_aggregate?: InputMaybe<Courses_Books_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_chapter_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "books" */
export type Books_Pk_Columns_Input = {
  book_id: Scalars['String'];
};

/** select columns of table "books" */
export enum Books_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  BookType = 'book_type',
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentChapterDisplayOrder = 'current_chapter_display_order',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "books" */
export type Books_Set_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  book_type?: InputMaybe<Scalars['String']>;
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_chapter_display_order?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Books_Stddev_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "books" */
export type Books_Stddev_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Books_Stddev_Pop_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "books" */
export type Books_Stddev_Pop_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Books_Stddev_Samp_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "books" */
export type Books_Stddev_Samp_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Books_Sum_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['smallint']>;
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "books" */
export type Books_Sum_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "books" */
export enum Books_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  BookType = 'book_type',
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentChapterDisplayOrder = 'current_chapter_display_order',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Books_Var_Pop_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "books" */
export type Books_Var_Pop_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Books_Var_Samp_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "books" */
export type Books_Var_Samp_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Books_Variance_Fields = {
  current_chapter_display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "books" */
export type Books_Variance_Order_By = {
  current_chapter_display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "brands" */
export type Brands = {
  academic_year_beginning?: Maybe<Scalars['timestamptz']>;
  academic_year_end?: Maybe<Scalars['timestamptz']>;
  brand_id: Scalars['String'];
  /** An array relationship */
  centers: Array<Centers>;
  /** An aggregated array relationship */
  centers_aggregate: Centers_Aggregate;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  org_id: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  /** An array relationship */
  scheduler_items: Array<Scheduler_Items>;
  /** An aggregated array relationship */
  scheduler_items_aggregate: Scheduler_Items_Aggregate;
  /** An array relationship */
  scheduler_patterns: Array<Scheduler_Patterns>;
  /** An aggregated array relationship */
  scheduler_patterns_aggregate: Scheduler_Patterns_Aggregate;
  scheduler_release_status?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "brands" */
export type BrandsCentersArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** columns and relationships of "brands" */
export type BrandsCenters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** columns and relationships of "brands" */
export type BrandsScheduler_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "brands" */
export type BrandsScheduler_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "brands" */
export type BrandsScheduler_PatternsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** columns and relationships of "brands" */
export type BrandsScheduler_Patterns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};

/** aggregated selection of "brands" */
export type Brands_Aggregate = {
  aggregate?: Maybe<Brands_Aggregate_Fields>;
  nodes: Array<Brands>;
};

/** aggregate fields of "brands" */
export type Brands_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Brands_Max_Fields>;
  min?: Maybe<Brands_Min_Fields>;
};


/** aggregate fields of "brands" */
export type Brands_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Brands_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "brands" */
export type Brands_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Brands_Max_Order_By>;
  min?: InputMaybe<Brands_Min_Order_By>;
};

/** input type for inserting array relation for remote table "brands" */
export type Brands_Arr_Rel_Insert_Input = {
  data: Array<Brands_Insert_Input>;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};

/** Boolean expression to filter rows from the table "brands". All fields are combined with a logical 'AND'. */
export type Brands_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Brands_Bool_Exp>>>;
  _not?: InputMaybe<Brands_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Brands_Bool_Exp>>>;
  academic_year_beginning?: InputMaybe<Timestamptz_Comparison_Exp>;
  academic_year_end?: InputMaybe<Timestamptz_Comparison_Exp>;
  brand_id?: InputMaybe<String_Comparison_Exp>;
  centers?: InputMaybe<Centers_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  org_id?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  scheduler_items?: InputMaybe<Scheduler_Items_Bool_Exp>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  scheduler_release_status?: InputMaybe<String_Comparison_Exp>;
  time_zone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "brands" */
export enum Brands_Constraint {
  /** unique or primary key constraint */
  BrandsPk = 'brands_pk',
  /** unique or primary key constraint */
  BrandsUn = 'brands_un'
}

/** input type for inserting data into table "brands" */
export type Brands_Insert_Input = {
  academic_year_beginning?: InputMaybe<Scalars['timestamptz']>;
  academic_year_end?: InputMaybe<Scalars['timestamptz']>;
  brand_id?: InputMaybe<Scalars['String']>;
  centers?: InputMaybe<Centers_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  org_id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_items?: InputMaybe<Scheduler_Items_Arr_Rel_Insert_Input>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Arr_Rel_Insert_Input>;
  scheduler_release_status?: InputMaybe<Scalars['String']>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Brands_Max_Fields = {
  academic_year_beginning?: Maybe<Scalars['timestamptz']>;
  academic_year_end?: Maybe<Scalars['timestamptz']>;
  brand_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  org_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_release_status?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "brands" */
export type Brands_Max_Order_By = {
  academic_year_beginning?: InputMaybe<Order_By>;
  academic_year_end?: InputMaybe<Order_By>;
  brand_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_release_status?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Brands_Min_Fields = {
  academic_year_beginning?: Maybe<Scalars['timestamptz']>;
  academic_year_end?: Maybe<Scalars['timestamptz']>;
  brand_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  org_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_release_status?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "brands" */
export type Brands_Min_Order_By = {
  academic_year_beginning?: InputMaybe<Order_By>;
  academic_year_end?: InputMaybe<Order_By>;
  brand_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_release_status?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "brands" */
export type Brands_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Brands>;
};

/** input type for inserting object relation for remote table "brands" */
export type Brands_Obj_Rel_Insert_Input = {
  data: Brands_Insert_Input;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};

/** on conflict condition type for table "brands" */
export type Brands_On_Conflict = {
  constraint: Brands_Constraint;
  update_columns: Array<Brands_Update_Column>;
  where?: InputMaybe<Brands_Bool_Exp>;
};

/** ordering options when selecting data from "brands" */
export type Brands_Order_By = {
  academic_year_beginning?: InputMaybe<Order_By>;
  academic_year_end?: InputMaybe<Order_By>;
  brand_id?: InputMaybe<Order_By>;
  centers_aggregate?: InputMaybe<Centers_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_items_aggregate?: InputMaybe<Scheduler_Items_Aggregate_Order_By>;
  scheduler_patterns_aggregate?: InputMaybe<Scheduler_Patterns_Aggregate_Order_By>;
  scheduler_release_status?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "brands" */
export type Brands_Pk_Columns_Input = {
  brand_id: Scalars['String'];
};

/** select columns of table "brands" */
export enum Brands_Select_Column {
  /** column name */
  AcademicYearBeginning = 'academic_year_beginning',
  /** column name */
  AcademicYearEnd = 'academic_year_end',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Name = 'name',
  /** column name */
  OrgId = 'org_id',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerReleaseStatus = 'scheduler_release_status',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "brands" */
export type Brands_Set_Input = {
  academic_year_beginning?: InputMaybe<Scalars['timestamptz']>;
  academic_year_end?: InputMaybe<Scalars['timestamptz']>;
  brand_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  org_id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_release_status?: InputMaybe<Scalars['String']>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "brands" */
export enum Brands_Update_Column {
  /** column name */
  AcademicYearBeginning = 'academic_year_beginning',
  /** column name */
  AcademicYearEnd = 'academic_year_end',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Name = 'name',
  /** column name */
  OrgId = 'org_id',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerReleaseStatus = 'scheduler_release_status',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "centers" */
export type Centers = {
  brand_id: Scalars['String'];
  /** An object relationship */
  brands: Brands;
  center_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  /** An array relationship */
  scheduler_items: Array<Scheduler_Items>;
  /** An aggregated array relationship */
  scheduler_items_aggregate: Scheduler_Items_Aggregate;
  /** An array relationship */
  scheduler_patterns: Array<Scheduler_Patterns>;
  /** An aggregated array relationship */
  scheduler_patterns_aggregate: Scheduler_Patterns_Aggregate;
  time_zone?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "centers" */
export type CentersScheduler_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "centers" */
export type CentersScheduler_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "centers" */
export type CentersScheduler_PatternsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** columns and relationships of "centers" */
export type CentersScheduler_Patterns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};

/** aggregated selection of "centers" */
export type Centers_Aggregate = {
  aggregate?: Maybe<Centers_Aggregate_Fields>;
  nodes: Array<Centers>;
};

/** aggregate fields of "centers" */
export type Centers_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Centers_Max_Fields>;
  min?: Maybe<Centers_Min_Fields>;
};


/** aggregate fields of "centers" */
export type Centers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Centers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "centers" */
export type Centers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Centers_Max_Order_By>;
  min?: InputMaybe<Centers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "centers" */
export type Centers_Arr_Rel_Insert_Input = {
  data: Array<Centers_Insert_Input>;
  on_conflict?: InputMaybe<Centers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "centers". All fields are combined with a logical 'AND'. */
export type Centers_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Centers_Bool_Exp>>>;
  _not?: InputMaybe<Centers_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Centers_Bool_Exp>>>;
  brand_id?: InputMaybe<String_Comparison_Exp>;
  brands?: InputMaybe<Brands_Bool_Exp>;
  center_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  scheduler_items?: InputMaybe<Scheduler_Items_Bool_Exp>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  time_zone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "centers" */
export enum Centers_Constraint {
  /** unique or primary key constraint */
  CentersPk = 'centers_pk',
  /** unique or primary key constraint */
  CentersUn = 'centers_un'
}

/** input type for inserting data into table "centers" */
export type Centers_Insert_Input = {
  brand_id?: InputMaybe<Scalars['String']>;
  brands?: InputMaybe<Brands_Obj_Rel_Insert_Input>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_items?: InputMaybe<Scheduler_Items_Arr_Rel_Insert_Input>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Arr_Rel_Insert_Input>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Centers_Max_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "centers" */
export type Centers_Max_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Centers_Min_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "centers" */
export type Centers_Min_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "centers" */
export type Centers_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Centers>;
};

/** input type for inserting object relation for remote table "centers" */
export type Centers_Obj_Rel_Insert_Input = {
  data: Centers_Insert_Input;
  on_conflict?: InputMaybe<Centers_On_Conflict>;
};

/** on conflict condition type for table "centers" */
export type Centers_On_Conflict = {
  constraint: Centers_Constraint;
  update_columns: Array<Centers_Update_Column>;
  where?: InputMaybe<Centers_Bool_Exp>;
};

/** ordering options when selecting data from "centers" */
export type Centers_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  brands?: InputMaybe<Brands_Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_items_aggregate?: InputMaybe<Scheduler_Items_Aggregate_Order_By>;
  scheduler_patterns_aggregate?: InputMaybe<Scheduler_Patterns_Aggregate_Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "centers" */
export type Centers_Pk_Columns_Input = {
  center_id: Scalars['String'];
};

/** select columns of table "centers" */
export enum Centers_Select_Column {
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "centers" */
export type Centers_Set_Input = {
  brand_id?: InputMaybe<Scalars['String']>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "centers" */
export enum Centers_Update_Column {
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "chapters" */
export type Chapters = {
  /** An object relationship */
  book_chapters?: Maybe<Books_Chapters>;
  chapter_id: Scalars['String'];
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  current_topic_display_order?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  name: Scalars['String'];
  resource_path: Scalars['String'];
  school_id: Scalars['Int'];
  subject?: Maybe<Scalars['String']>;
  /** An array relationship */
  topics: Array<Topics>;
  /** An aggregated array relationship */
  topics_aggregate: Topics_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "chapters" */
export type ChaptersTopicsArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};


/** columns and relationships of "chapters" */
export type ChaptersTopics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};

/** aggregated selection of "chapters" */
export type Chapters_Aggregate = {
  aggregate?: Maybe<Chapters_Aggregate_Fields>;
  nodes: Array<Chapters>;
};

/** aggregate fields of "chapters" */
export type Chapters_Aggregate_Fields = {
  avg?: Maybe<Chapters_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Chapters_Max_Fields>;
  min?: Maybe<Chapters_Min_Fields>;
  stddev?: Maybe<Chapters_Stddev_Fields>;
  stddev_pop?: Maybe<Chapters_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Chapters_Stddev_Samp_Fields>;
  sum?: Maybe<Chapters_Sum_Fields>;
  var_pop?: Maybe<Chapters_Var_Pop_Fields>;
  var_samp?: Maybe<Chapters_Var_Samp_Fields>;
  variance?: Maybe<Chapters_Variance_Fields>;
};


/** aggregate fields of "chapters" */
export type Chapters_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chapters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chapters" */
export type Chapters_Aggregate_Order_By = {
  avg?: InputMaybe<Chapters_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chapters_Max_Order_By>;
  min?: InputMaybe<Chapters_Min_Order_By>;
  stddev?: InputMaybe<Chapters_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Chapters_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Chapters_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Chapters_Sum_Order_By>;
  var_pop?: InputMaybe<Chapters_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Chapters_Var_Samp_Order_By>;
  variance?: InputMaybe<Chapters_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "chapters" */
export type Chapters_Arr_Rel_Insert_Input = {
  data: Array<Chapters_Insert_Input>;
  on_conflict?: InputMaybe<Chapters_On_Conflict>;
};

/** aggregate avg on columns */
export type Chapters_Avg_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "chapters" */
export type Chapters_Avg_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "chapters". All fields are combined with a logical 'AND'. */
export type Chapters_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Chapters_Bool_Exp>>>;
  _not?: InputMaybe<Chapters_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Chapters_Bool_Exp>>>;
  book_chapters?: InputMaybe<Books_Chapters_Bool_Exp>;
  chapter_id?: InputMaybe<String_Comparison_Exp>;
  copied_from?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  current_topic_display_order?: InputMaybe<Int_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Smallint_Comparison_Exp>;
  grade?: InputMaybe<Smallint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  topics?: InputMaybe<Topics_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "chapters" */
export enum Chapters_Constraint {
  /** unique or primary key constraint */
  ChaptersPk = 'chapters_pk'
}

/** input type for incrementing integer column in table "chapters" */
export type Chapters_Inc_Input = {
  current_topic_display_order?: InputMaybe<Scalars['Int']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "chapters" */
export type Chapters_Insert_Input = {
  book_chapters?: InputMaybe<Books_Chapters_Obj_Rel_Insert_Input>;
  chapter_id?: InputMaybe<Scalars['String']>;
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_topic_display_order?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  topics?: InputMaybe<Topics_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Chapters_Max_Fields = {
  chapter_id?: Maybe<Scalars['String']>;
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_topic_display_order?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "chapters" */
export type Chapters_Max_Order_By = {
  chapter_id?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_topic_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chapters_Min_Fields = {
  chapter_id?: Maybe<Scalars['String']>;
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_topic_display_order?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "chapters" */
export type Chapters_Min_Order_By = {
  chapter_id?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_topic_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chapters" */
export type Chapters_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Chapters>;
};

/** input type for inserting object relation for remote table "chapters" */
export type Chapters_Obj_Rel_Insert_Input = {
  data: Chapters_Insert_Input;
  on_conflict?: InputMaybe<Chapters_On_Conflict>;
};

/** on conflict condition type for table "chapters" */
export type Chapters_On_Conflict = {
  constraint: Chapters_Constraint;
  update_columns: Array<Chapters_Update_Column>;
  where?: InputMaybe<Chapters_Bool_Exp>;
};

/** ordering options when selecting data from "chapters" */
export type Chapters_Order_By = {
  book_chapters?: InputMaybe<Books_Chapters_Order_By>;
  chapter_id?: InputMaybe<Order_By>;
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_topic_display_order?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topics_aggregate?: InputMaybe<Topics_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "chapters" */
export type Chapters_Pk_Columns_Input = {
  chapter_id: Scalars['String'];
};

/** select columns of table "chapters" */
export enum Chapters_Select_Column {
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentTopicDisplayOrder = 'current_topic_display_order',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "chapters" */
export type Chapters_Set_Input = {
  chapter_id?: InputMaybe<Scalars['String']>;
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_topic_display_order?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Chapters_Stddev_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "chapters" */
export type Chapters_Stddev_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Chapters_Stddev_Pop_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "chapters" */
export type Chapters_Stddev_Pop_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Chapters_Stddev_Samp_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "chapters" */
export type Chapters_Stddev_Samp_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Chapters_Sum_Fields = {
  current_topic_display_order?: Maybe<Scalars['Int']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "chapters" */
export type Chapters_Sum_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "chapters" */
export enum Chapters_Update_Column {
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentTopicDisplayOrder = 'current_topic_display_order',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Chapters_Var_Pop_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "chapters" */
export type Chapters_Var_Pop_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Chapters_Var_Samp_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "chapters" */
export type Chapters_Var_Samp_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Chapters_Variance_Fields = {
  current_topic_display_order?: Maybe<Scalars['Float']>;
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "chapters" */
export type Chapters_Variance_Order_By = {
  current_topic_display_order?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "course_students" */
export type Course_Students = {
  course_id: Scalars['String'];
  course_student_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  start_at?: Maybe<Scalars['timestamptz']>;
  student_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "course_students" */
export type Course_Students_Aggregate = {
  aggregate?: Maybe<Course_Students_Aggregate_Fields>;
  nodes: Array<Course_Students>;
};

/** aggregate fields of "course_students" */
export type Course_Students_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Students_Max_Fields>;
  min?: Maybe<Course_Students_Min_Fields>;
};


/** aggregate fields of "course_students" */
export type Course_Students_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Course_Students_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_students" */
export type Course_Students_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Course_Students_Max_Order_By>;
  min?: InputMaybe<Course_Students_Min_Order_By>;
};

/** input type for inserting array relation for remote table "course_students" */
export type Course_Students_Arr_Rel_Insert_Input = {
  data: Array<Course_Students_Insert_Input>;
  on_conflict?: InputMaybe<Course_Students_On_Conflict>;
};

/** Boolean expression to filter rows from the table "course_students". All fields are combined with a logical 'AND'. */
export type Course_Students_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Course_Students_Bool_Exp>>>;
  _not?: InputMaybe<Course_Students_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Course_Students_Bool_Exp>>>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  course_student_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_students" */
export enum Course_Students_Constraint {
  /** unique or primary key constraint */
  CourseStudentIdUn = 'course_student_id_un',
  /** unique or primary key constraint */
  CourseStudentPk = 'course_student_pk'
}

/** input type for inserting data into table "course_students" */
export type Course_Students_Insert_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  course_student_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Course_Students_Max_Fields = {
  course_id?: Maybe<Scalars['String']>;
  course_student_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  start_at?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "course_students" */
export type Course_Students_Max_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_student_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Students_Min_Fields = {
  course_id?: Maybe<Scalars['String']>;
  course_student_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  start_at?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "course_students" */
export type Course_Students_Min_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_student_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "course_students" */
export type Course_Students_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Students>;
};

/** input type for inserting object relation for remote table "course_students" */
export type Course_Students_Obj_Rel_Insert_Input = {
  data: Course_Students_Insert_Input;
  on_conflict?: InputMaybe<Course_Students_On_Conflict>;
};

/** on conflict condition type for table "course_students" */
export type Course_Students_On_Conflict = {
  constraint: Course_Students_Constraint;
  update_columns: Array<Course_Students_Update_Column>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};

/** ordering options when selecting data from "course_students" */
export type Course_Students_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_student_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "course_students" */
export type Course_Students_Pk_Columns_Input = {
  course_id: Scalars['String'];
  student_id: Scalars['String'];
};

/** select columns of table "course_students" */
export enum Course_Students_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseStudentId = 'course_student_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "course_students" */
export type Course_Students_Set_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  course_student_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "course_students" */
export enum Course_Students_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseStudentId = 'course_student_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "course_study_plans" */
export type Course_Study_Plans = {
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  /** An object relationship */
  study_plan: Study_Plans;
  study_plan_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "course_study_plans" */
export type Course_Study_Plans_Aggregate = {
  aggregate?: Maybe<Course_Study_Plans_Aggregate_Fields>;
  nodes: Array<Course_Study_Plans>;
};

/** aggregate fields of "course_study_plans" */
export type Course_Study_Plans_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Study_Plans_Max_Fields>;
  min?: Maybe<Course_Study_Plans_Min_Fields>;
};


/** aggregate fields of "course_study_plans" */
export type Course_Study_Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_study_plans" */
export type Course_Study_Plans_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Course_Study_Plans_Max_Order_By>;
  min?: InputMaybe<Course_Study_Plans_Min_Order_By>;
};

/** input type for inserting array relation for remote table "course_study_plans" */
export type Course_Study_Plans_Arr_Rel_Insert_Input = {
  data: Array<Course_Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Course_Study_Plans_On_Conflict>;
};

/** Boolean expression to filter rows from the table "course_study_plans". All fields are combined with a logical 'AND'. */
export type Course_Study_Plans_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Course_Study_Plans_Bool_Exp>>>;
  _not?: InputMaybe<Course_Study_Plans_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Course_Study_Plans_Bool_Exp>>>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  study_plan?: InputMaybe<Study_Plans_Bool_Exp>;
  study_plan_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_study_plans" */
export enum Course_Study_Plans_Constraint {
  /** unique or primary key constraint */
  CourseStudyPlansPk = 'course_study_plans_pk'
}

/** input type for inserting data into table "course_study_plans" */
export type Course_Study_Plans_Insert_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan?: InputMaybe<Study_Plans_Obj_Rel_Insert_Input>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Course_Study_Plans_Max_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "course_study_plans" */
export type Course_Study_Plans_Max_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Study_Plans_Min_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "course_study_plans" */
export type Course_Study_Plans_Min_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "course_study_plans" */
export type Course_Study_Plans_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Study_Plans>;
};

/** input type for inserting object relation for remote table "course_study_plans" */
export type Course_Study_Plans_Obj_Rel_Insert_Input = {
  data: Course_Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Course_Study_Plans_On_Conflict>;
};

/** on conflict condition type for table "course_study_plans" */
export type Course_Study_Plans_On_Conflict = {
  constraint: Course_Study_Plans_Constraint;
  update_columns: Array<Course_Study_Plans_Update_Column>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};

/** ordering options when selecting data from "course_study_plans" */
export type Course_Study_Plans_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan?: InputMaybe<Study_Plans_Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "course_study_plans" */
export type Course_Study_Plans_Pk_Columns_Input = {
  course_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};

/** select columns of table "course_study_plans" */
export enum Course_Study_Plans_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "course_study_plans" */
export type Course_Study_Plans_Set_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "course_study_plans" */
export enum Course_Study_Plans_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "courses_books" */
export type Courses_Books = {
  book_id: Scalars['String'];
  /** An object relationship */
  books?: Maybe<Books>;
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "courses_books" */
export type Courses_Books_Aggregate = {
  aggregate?: Maybe<Courses_Books_Aggregate_Fields>;
  nodes: Array<Courses_Books>;
};

/** aggregate fields of "courses_books" */
export type Courses_Books_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Courses_Books_Max_Fields>;
  min?: Maybe<Courses_Books_Min_Fields>;
};


/** aggregate fields of "courses_books" */
export type Courses_Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Courses_Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "courses_books" */
export type Courses_Books_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Courses_Books_Max_Order_By>;
  min?: InputMaybe<Courses_Books_Min_Order_By>;
};

/** input type for inserting array relation for remote table "courses_books" */
export type Courses_Books_Arr_Rel_Insert_Input = {
  data: Array<Courses_Books_Insert_Input>;
  on_conflict?: InputMaybe<Courses_Books_On_Conflict>;
};

/** Boolean expression to filter rows from the table "courses_books". All fields are combined with a logical 'AND'. */
export type Courses_Books_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Courses_Books_Bool_Exp>>>;
  _not?: InputMaybe<Courses_Books_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Courses_Books_Bool_Exp>>>;
  book_id?: InputMaybe<String_Comparison_Exp>;
  books?: InputMaybe<Books_Bool_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "courses_books" */
export enum Courses_Books_Constraint {
  /** unique or primary key constraint */
  CoursesBooksPk = 'courses_books_pk'
}

/** input type for inserting data into table "courses_books" */
export type Courses_Books_Insert_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  books?: InputMaybe<Books_Obj_Rel_Insert_Input>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Courses_Books_Max_Fields = {
  book_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "courses_books" */
export type Courses_Books_Max_Order_By = {
  book_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Courses_Books_Min_Fields = {
  book_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "courses_books" */
export type Courses_Books_Min_Order_By = {
  book_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "courses_books" */
export type Courses_Books_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Courses_Books>;
};

/** input type for inserting object relation for remote table "courses_books" */
export type Courses_Books_Obj_Rel_Insert_Input = {
  data: Courses_Books_Insert_Input;
  on_conflict?: InputMaybe<Courses_Books_On_Conflict>;
};

/** on conflict condition type for table "courses_books" */
export type Courses_Books_On_Conflict = {
  constraint: Courses_Books_Constraint;
  update_columns: Array<Courses_Books_Update_Column>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};

/** ordering options when selecting data from "courses_books" */
export type Courses_Books_Order_By = {
  book_id?: InputMaybe<Order_By>;
  books?: InputMaybe<Books_Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "courses_books" */
export type Courses_Books_Pk_Columns_Input = {
  book_id: Scalars['String'];
  course_id: Scalars['String'];
};

/** select columns of table "courses_books" */
export enum Courses_Books_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "courses_books" */
export type Courses_Books_Set_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "courses_books" */
export enum Courses_Books_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Find_Assignment_By_Topic_Id_Args = {
  ids?: InputMaybe<Scalars['_text']>;
};

export type Find_Quiz_By_Lo_Id_Args = {
  id?: InputMaybe<Scalars['String']>;
};

export type Get_List_Course_Student_Study_Plans_By_Filter_Args = {
  _book_ids?: InputMaybe<Scalars['_text']>;
  _course_id?: InputMaybe<Scalars['String']>;
  _grades?: InputMaybe<Scalars['_int4']>;
  _status?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Get_List_Course_Study_Plan_By_Filter_Args = {
  _book_ids?: InputMaybe<Scalars['_text']>;
  _course_id?: InputMaybe<Scalars['String']>;
  _grades?: InputMaybe<Scalars['_int4']>;
  _status?: InputMaybe<Scalars['_text']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Get_Student_Study_Plans_By_Filter_Args = {
  _book_ids?: InputMaybe<Scalars['_text']>;
  _course_id?: InputMaybe<Scalars['String']>;
  _grades?: InputMaybe<Scalars['_int4']>;
  _status?: InputMaybe<Scalars['String']>;
  _student_ids?: InputMaybe<Scalars['_text']>;
  search?: InputMaybe<Scalars['String']>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "learning_objectives" */
export type Learning_Objectives = {
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  lo_id: Scalars['String'];
  master_lo_id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  prerequisites?: Maybe<Scalars['_text']>;
  /** An array relationship */
  quiz_sets: Array<Quiz_Sets>;
  /** An aggregated array relationship */
  quiz_sets_aggregate: Quiz_Sets_Aggregate;
  resource_path: Scalars['String'];
  school_id: Scalars['Int'];
  study_guide?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  video?: Maybe<Scalars['String']>;
  video_script?: Maybe<Scalars['String']>;
};


/** columns and relationships of "learning_objectives" */
export type Learning_ObjectivesQuiz_SetsArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** columns and relationships of "learning_objectives" */
export type Learning_ObjectivesQuiz_Sets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};

/** aggregated selection of "learning_objectives" */
export type Learning_Objectives_Aggregate = {
  aggregate?: Maybe<Learning_Objectives_Aggregate_Fields>;
  nodes: Array<Learning_Objectives>;
};

/** aggregate fields of "learning_objectives" */
export type Learning_Objectives_Aggregate_Fields = {
  avg?: Maybe<Learning_Objectives_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Learning_Objectives_Max_Fields>;
  min?: Maybe<Learning_Objectives_Min_Fields>;
  stddev?: Maybe<Learning_Objectives_Stddev_Fields>;
  stddev_pop?: Maybe<Learning_Objectives_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Learning_Objectives_Stddev_Samp_Fields>;
  sum?: Maybe<Learning_Objectives_Sum_Fields>;
  var_pop?: Maybe<Learning_Objectives_Var_Pop_Fields>;
  var_samp?: Maybe<Learning_Objectives_Var_Samp_Fields>;
  variance?: Maybe<Learning_Objectives_Variance_Fields>;
};


/** aggregate fields of "learning_objectives" */
export type Learning_Objectives_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "learning_objectives" */
export type Learning_Objectives_Aggregate_Order_By = {
  avg?: InputMaybe<Learning_Objectives_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Learning_Objectives_Max_Order_By>;
  min?: InputMaybe<Learning_Objectives_Min_Order_By>;
  stddev?: InputMaybe<Learning_Objectives_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Learning_Objectives_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Learning_Objectives_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Learning_Objectives_Sum_Order_By>;
  var_pop?: InputMaybe<Learning_Objectives_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Learning_Objectives_Var_Samp_Order_By>;
  variance?: InputMaybe<Learning_Objectives_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "learning_objectives" */
export type Learning_Objectives_Arr_Rel_Insert_Input = {
  data: Array<Learning_Objectives_Insert_Input>;
  on_conflict?: InputMaybe<Learning_Objectives_On_Conflict>;
};

/** aggregate avg on columns */
export type Learning_Objectives_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "learning_objectives" */
export type Learning_Objectives_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "learning_objectives". All fields are combined with a logical 'AND'. */
export type Learning_Objectives_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Learning_Objectives_Bool_Exp>>>;
  _not?: InputMaybe<Learning_Objectives_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Learning_Objectives_Bool_Exp>>>;
  copied_from?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Smallint_Comparison_Exp>;
  grade?: InputMaybe<Smallint_Comparison_Exp>;
  lo_id?: InputMaybe<String_Comparison_Exp>;
  master_lo_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  prerequisites?: InputMaybe<_Text_Comparison_Exp>;
  quiz_sets?: InputMaybe<Quiz_Sets_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  study_guide?: InputMaybe<String_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  video?: InputMaybe<String_Comparison_Exp>;
  video_script?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "learning_objectives" */
export enum Learning_Objectives_Constraint {
  /** unique or primary key constraint */
  LearningObjectivesPk = 'learning_objectives_pk'
}

/** input type for incrementing integer column in table "learning_objectives" */
export type Learning_Objectives_Inc_Input = {
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "learning_objectives" */
export type Learning_Objectives_Insert_Input = {
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  lo_id?: InputMaybe<Scalars['String']>;
  master_lo_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  prerequisites?: InputMaybe<Scalars['_text']>;
  quiz_sets?: InputMaybe<Quiz_Sets_Arr_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  study_guide?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  video?: InputMaybe<Scalars['String']>;
  video_script?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Learning_Objectives_Max_Fields = {
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  lo_id?: Maybe<Scalars['String']>;
  master_lo_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  study_guide?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video?: Maybe<Scalars['String']>;
  video_script?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "learning_objectives" */
export type Learning_Objectives_Max_Order_By = {
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  master_lo_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  study_guide?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video?: InputMaybe<Order_By>;
  video_script?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Learning_Objectives_Min_Fields = {
  copied_from?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  lo_id?: Maybe<Scalars['String']>;
  master_lo_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  study_guide?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video?: Maybe<Scalars['String']>;
  video_script?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "learning_objectives" */
export type Learning_Objectives_Min_Order_By = {
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  master_lo_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  study_guide?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video?: InputMaybe<Order_By>;
  video_script?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "learning_objectives" */
export type Learning_Objectives_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Learning_Objectives>;
};

/** input type for inserting object relation for remote table "learning_objectives" */
export type Learning_Objectives_Obj_Rel_Insert_Input = {
  data: Learning_Objectives_Insert_Input;
  on_conflict?: InputMaybe<Learning_Objectives_On_Conflict>;
};

/** on conflict condition type for table "learning_objectives" */
export type Learning_Objectives_On_Conflict = {
  constraint: Learning_Objectives_Constraint;
  update_columns: Array<Learning_Objectives_Update_Column>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};

/** ordering options when selecting data from "learning_objectives" */
export type Learning_Objectives_Order_By = {
  copied_from?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  master_lo_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  prerequisites?: InputMaybe<Order_By>;
  quiz_sets_aggregate?: InputMaybe<Quiz_Sets_Aggregate_Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  study_guide?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video?: InputMaybe<Order_By>;
  video_script?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "learning_objectives" */
export type Learning_Objectives_Pk_Columns_Input = {
  lo_id: Scalars['String'];
};

/** select columns of table "learning_objectives" */
export enum Learning_Objectives_Select_Column {
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Grade = 'grade',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  MasterLoId = 'master_lo_id',
  /** column name */
  Name = 'name',
  /** column name */
  Prerequisites = 'prerequisites',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  StudyGuide = 'study_guide',
  /** column name */
  Subject = 'subject',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Video = 'video',
  /** column name */
  VideoScript = 'video_script'
}

/** input type for updating data in table "learning_objectives" */
export type Learning_Objectives_Set_Input = {
  copied_from?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  lo_id?: InputMaybe<Scalars['String']>;
  master_lo_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  prerequisites?: InputMaybe<Scalars['_text']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  study_guide?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  video?: InputMaybe<Scalars['String']>;
  video_script?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Learning_Objectives_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "learning_objectives" */
export type Learning_Objectives_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Learning_Objectives_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "learning_objectives" */
export type Learning_Objectives_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Learning_Objectives_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "learning_objectives" */
export type Learning_Objectives_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Learning_Objectives_Sum_Fields = {
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "learning_objectives" */
export type Learning_Objectives_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "learning_objectives" */
export enum Learning_Objectives_Update_Column {
  /** column name */
  CopiedFrom = 'copied_from',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Grade = 'grade',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  MasterLoId = 'master_lo_id',
  /** column name */
  Name = 'name',
  /** column name */
  Prerequisites = 'prerequisites',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  StudyGuide = 'study_guide',
  /** column name */
  Subject = 'subject',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Video = 'video',
  /** column name */
  VideoScript = 'video_script'
}

/** aggregate var_pop on columns */
export type Learning_Objectives_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "learning_objectives" */
export type Learning_Objectives_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Learning_Objectives_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "learning_objectives" */
export type Learning_Objectives_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Learning_Objectives_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "learning_objectives" */
export type Learning_Objectives_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "lo_study_plan_items" */
export type Lo_Study_Plan_Items = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id: Scalars['String'];
  resource_path: Scalars['String'];
  /** An object relationship */
  study_plan_item: Study_Plan_Items;
  study_plan_item_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Aggregate = {
  aggregate?: Maybe<Lo_Study_Plan_Items_Aggregate_Fields>;
  nodes: Array<Lo_Study_Plan_Items>;
};

/** aggregate fields of "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Lo_Study_Plan_Items_Max_Fields>;
  min?: Maybe<Lo_Study_Plan_Items_Min_Fields>;
};


/** aggregate fields of "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Lo_Study_Plan_Items_Max_Order_By>;
  min?: InputMaybe<Lo_Study_Plan_Items_Min_Order_By>;
};

/** input type for inserting array relation for remote table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Arr_Rel_Insert_Input = {
  data: Array<Lo_Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Lo_Study_Plan_Items_On_Conflict>;
};

/** Boolean expression to filter rows from the table "lo_study_plan_items". All fields are combined with a logical 'AND'. */
export type Lo_Study_Plan_Items_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Lo_Study_Plan_Items_Bool_Exp>>>;
  _not?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Lo_Study_Plan_Items_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  lo_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Bool_Exp>;
  study_plan_item_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "lo_study_plan_items" */
export enum Lo_Study_Plan_Items_Constraint {
  /** unique or primary key constraint */
  LoStudyPlanItemsPk = 'lo_study_plan_items_pk',
  /** unique or primary key constraint */
  LoStudyPlanItemsStudyPlanItemIdUn = 'lo_study_plan_items_study_plan_item_id_un'
}

/** input type for inserting data into table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lo_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Obj_Rel_Insert_Input>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Lo_Study_Plan_Items_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Lo_Study_Plan_Items_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Lo_Study_Plan_Items>;
};

/** input type for inserting object relation for remote table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Obj_Rel_Insert_Input = {
  data: Lo_Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Lo_Study_Plan_Items_On_Conflict>;
};

/** on conflict condition type for table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_On_Conflict = {
  constraint: Lo_Study_Plan_Items_Constraint;
  update_columns: Array<Lo_Study_Plan_Items_Update_Column>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};

/** ordering options when selecting data from "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  study_plan_item?: InputMaybe<Study_Plan_Items_Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Pk_Columns_Input = {
  lo_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};

/** select columns of table "lo_study_plan_items" */
export enum Lo_Study_Plan_Items_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "lo_study_plan_items" */
export type Lo_Study_Plan_Items_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lo_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "lo_study_plan_items" */
export enum Lo_Study_Plan_Items_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "assign_study_plan_tasks" */
  delete_assign_study_plan_tasks?: Maybe<Assign_Study_Plan_Tasks_Mutation_Response>;
  /** delete single row from the table: "assign_study_plan_tasks" */
  delete_assign_study_plan_tasks_by_pk?: Maybe<Assign_Study_Plan_Tasks>;
  /** delete data from the table: "assignment_study_plan_items" */
  delete_assignment_study_plan_items?: Maybe<Assignment_Study_Plan_Items_Mutation_Response>;
  /** delete single row from the table: "assignment_study_plan_items" */
  delete_assignment_study_plan_items_by_pk?: Maybe<Assignment_Study_Plan_Items>;
  /** delete data from the table: "assignments" */
  delete_assignments?: Maybe<Assignments_Mutation_Response>;
  /** delete single row from the table: "assignments" */
  delete_assignments_by_pk?: Maybe<Assignments>;
  /** delete data from the table: "books" */
  delete_books?: Maybe<Books_Mutation_Response>;
  /** delete single row from the table: "books" */
  delete_books_by_pk?: Maybe<Books>;
  /** delete data from the table: "books_chapters" */
  delete_books_chapters?: Maybe<Books_Chapters_Mutation_Response>;
  /** delete single row from the table: "books_chapters" */
  delete_books_chapters_by_pk?: Maybe<Books_Chapters>;
  /** delete data from the table: "brands" */
  delete_brands?: Maybe<Brands_Mutation_Response>;
  /** delete single row from the table: "brands" */
  delete_brands_by_pk?: Maybe<Brands>;
  /** delete data from the table: "centers" */
  delete_centers?: Maybe<Centers_Mutation_Response>;
  /** delete single row from the table: "centers" */
  delete_centers_by_pk?: Maybe<Centers>;
  /** delete data from the table: "chapters" */
  delete_chapters?: Maybe<Chapters_Mutation_Response>;
  /** delete single row from the table: "chapters" */
  delete_chapters_by_pk?: Maybe<Chapters>;
  /** delete data from the table: "course_students" */
  delete_course_students?: Maybe<Course_Students_Mutation_Response>;
  /** delete single row from the table: "course_students" */
  delete_course_students_by_pk?: Maybe<Course_Students>;
  /** delete data from the table: "course_study_plans" */
  delete_course_study_plans?: Maybe<Course_Study_Plans_Mutation_Response>;
  /** delete single row from the table: "course_study_plans" */
  delete_course_study_plans_by_pk?: Maybe<Course_Study_Plans>;
  /** delete data from the table: "courses_books" */
  delete_courses_books?: Maybe<Courses_Books_Mutation_Response>;
  /** delete single row from the table: "courses_books" */
  delete_courses_books_by_pk?: Maybe<Courses_Books>;
  /** delete data from the table: "learning_objectives" */
  delete_learning_objectives?: Maybe<Learning_Objectives_Mutation_Response>;
  /** delete single row from the table: "learning_objectives" */
  delete_learning_objectives_by_pk?: Maybe<Learning_Objectives>;
  /** delete data from the table: "lo_study_plan_items" */
  delete_lo_study_plan_items?: Maybe<Lo_Study_Plan_Items_Mutation_Response>;
  /** delete single row from the table: "lo_study_plan_items" */
  delete_lo_study_plan_items_by_pk?: Maybe<Lo_Study_Plan_Items>;
  /** delete data from the table: "quiz_sets" */
  delete_quiz_sets?: Maybe<Quiz_Sets_Mutation_Response>;
  /** delete single row from the table: "quiz_sets" */
  delete_quiz_sets_by_pk?: Maybe<Quiz_Sets>;
  /** delete data from the table: "quizzes" */
  delete_quizzes?: Maybe<Quizzes_Mutation_Response>;
  /** delete single row from the table: "quizzes" */
  delete_quizzes_by_pk?: Maybe<Quizzes>;
  /** delete data from the table: "scheduler_items" */
  delete_scheduler_items?: Maybe<Scheduler_Items_Mutation_Response>;
  /** delete single row from the table: "scheduler_items" */
  delete_scheduler_items_by_pk?: Maybe<Scheduler_Items>;
  /** delete data from the table: "scheduler_patterns" */
  delete_scheduler_patterns?: Maybe<Scheduler_Patterns_Mutation_Response>;
  /** delete single row from the table: "scheduler_patterns" */
  delete_scheduler_patterns_by_pk?: Maybe<Scheduler_Patterns>;
  /** delete data from the table: "student_study_plans" */
  delete_student_study_plans?: Maybe<Student_Study_Plans_Mutation_Response>;
  /** delete single row from the table: "student_study_plans" */
  delete_student_study_plans_by_pk?: Maybe<Student_Study_Plans>;
  /** delete data from the table: "study_plan_items" */
  delete_study_plan_items?: Maybe<Study_Plan_Items_Mutation_Response>;
  /** delete single row from the table: "study_plan_items" */
  delete_study_plan_items_by_pk?: Maybe<Study_Plan_Items>;
  /** delete data from the table: "study_plans" */
  delete_study_plans?: Maybe<Study_Plans_Mutation_Response>;
  /** delete single row from the table: "study_plans" */
  delete_study_plans_by_pk?: Maybe<Study_Plans>;
  /** delete data from the table: "topics" */
  delete_topics?: Maybe<Topics_Mutation_Response>;
  /** delete data from the table: "topics_assignments" */
  delete_topics_assignments?: Maybe<Topics_Assignments_Mutation_Response>;
  /** delete single row from the table: "topics_assignments" */
  delete_topics_assignments_by_pk?: Maybe<Topics_Assignments>;
  /** delete single row from the table: "topics" */
  delete_topics_by_pk?: Maybe<Topics>;
  /** delete data from the table: "topics_learning_objectives" */
  delete_topics_learning_objectives?: Maybe<Topics_Learning_Objectives_Mutation_Response>;
  /** delete single row from the table: "topics_learning_objectives" */
  delete_topics_learning_objectives_by_pk?: Maybe<Topics_Learning_Objectives>;
  /** insert data into the table: "assign_study_plan_tasks" */
  insert_assign_study_plan_tasks?: Maybe<Assign_Study_Plan_Tasks_Mutation_Response>;
  /** insert a single row into the table: "assign_study_plan_tasks" */
  insert_assign_study_plan_tasks_one?: Maybe<Assign_Study_Plan_Tasks>;
  /** insert data into the table: "assignment_study_plan_items" */
  insert_assignment_study_plan_items?: Maybe<Assignment_Study_Plan_Items_Mutation_Response>;
  /** insert a single row into the table: "assignment_study_plan_items" */
  insert_assignment_study_plan_items_one?: Maybe<Assignment_Study_Plan_Items>;
  /** insert data into the table: "assignments" */
  insert_assignments?: Maybe<Assignments_Mutation_Response>;
  /** insert a single row into the table: "assignments" */
  insert_assignments_one?: Maybe<Assignments>;
  /** insert data into the table: "books" */
  insert_books?: Maybe<Books_Mutation_Response>;
  /** insert data into the table: "books_chapters" */
  insert_books_chapters?: Maybe<Books_Chapters_Mutation_Response>;
  /** insert a single row into the table: "books_chapters" */
  insert_books_chapters_one?: Maybe<Books_Chapters>;
  /** insert a single row into the table: "books" */
  insert_books_one?: Maybe<Books>;
  /** insert data into the table: "brands" */
  insert_brands?: Maybe<Brands_Mutation_Response>;
  /** insert a single row into the table: "brands" */
  insert_brands_one?: Maybe<Brands>;
  /** insert data into the table: "centers" */
  insert_centers?: Maybe<Centers_Mutation_Response>;
  /** insert a single row into the table: "centers" */
  insert_centers_one?: Maybe<Centers>;
  /** insert data into the table: "chapters" */
  insert_chapters?: Maybe<Chapters_Mutation_Response>;
  /** insert a single row into the table: "chapters" */
  insert_chapters_one?: Maybe<Chapters>;
  /** insert data into the table: "course_students" */
  insert_course_students?: Maybe<Course_Students_Mutation_Response>;
  /** insert a single row into the table: "course_students" */
  insert_course_students_one?: Maybe<Course_Students>;
  /** insert data into the table: "course_study_plans" */
  insert_course_study_plans?: Maybe<Course_Study_Plans_Mutation_Response>;
  /** insert a single row into the table: "course_study_plans" */
  insert_course_study_plans_one?: Maybe<Course_Study_Plans>;
  /** insert data into the table: "courses_books" */
  insert_courses_books?: Maybe<Courses_Books_Mutation_Response>;
  /** insert a single row into the table: "courses_books" */
  insert_courses_books_one?: Maybe<Courses_Books>;
  /** insert data into the table: "learning_objectives" */
  insert_learning_objectives?: Maybe<Learning_Objectives_Mutation_Response>;
  /** insert a single row into the table: "learning_objectives" */
  insert_learning_objectives_one?: Maybe<Learning_Objectives>;
  /** insert data into the table: "lo_study_plan_items" */
  insert_lo_study_plan_items?: Maybe<Lo_Study_Plan_Items_Mutation_Response>;
  /** insert a single row into the table: "lo_study_plan_items" */
  insert_lo_study_plan_items_one?: Maybe<Lo_Study_Plan_Items>;
  /** insert data into the table: "quiz_sets" */
  insert_quiz_sets?: Maybe<Quiz_Sets_Mutation_Response>;
  /** insert a single row into the table: "quiz_sets" */
  insert_quiz_sets_one?: Maybe<Quiz_Sets>;
  /** insert data into the table: "quizzes" */
  insert_quizzes?: Maybe<Quizzes_Mutation_Response>;
  /** insert a single row into the table: "quizzes" */
  insert_quizzes_one?: Maybe<Quizzes>;
  /** insert data into the table: "scheduler_items" */
  insert_scheduler_items?: Maybe<Scheduler_Items_Mutation_Response>;
  /** insert a single row into the table: "scheduler_items" */
  insert_scheduler_items_one?: Maybe<Scheduler_Items>;
  /** insert data into the table: "scheduler_patterns" */
  insert_scheduler_patterns?: Maybe<Scheduler_Patterns_Mutation_Response>;
  /** insert a single row into the table: "scheduler_patterns" */
  insert_scheduler_patterns_one?: Maybe<Scheduler_Patterns>;
  /** insert data into the table: "student_study_plans" */
  insert_student_study_plans?: Maybe<Student_Study_Plans_Mutation_Response>;
  /** insert a single row into the table: "student_study_plans" */
  insert_student_study_plans_one?: Maybe<Student_Study_Plans>;
  /** insert data into the table: "study_plan_items" */
  insert_study_plan_items?: Maybe<Study_Plan_Items_Mutation_Response>;
  /** insert a single row into the table: "study_plan_items" */
  insert_study_plan_items_one?: Maybe<Study_Plan_Items>;
  /** insert data into the table: "study_plans" */
  insert_study_plans?: Maybe<Study_Plans_Mutation_Response>;
  /** insert a single row into the table: "study_plans" */
  insert_study_plans_one?: Maybe<Study_Plans>;
  /** insert data into the table: "topics" */
  insert_topics?: Maybe<Topics_Mutation_Response>;
  /** insert data into the table: "topics_assignments" */
  insert_topics_assignments?: Maybe<Topics_Assignments_Mutation_Response>;
  /** insert a single row into the table: "topics_assignments" */
  insert_topics_assignments_one?: Maybe<Topics_Assignments>;
  /** insert data into the table: "topics_learning_objectives" */
  insert_topics_learning_objectives?: Maybe<Topics_Learning_Objectives_Mutation_Response>;
  /** insert a single row into the table: "topics_learning_objectives" */
  insert_topics_learning_objectives_one?: Maybe<Topics_Learning_Objectives>;
  /** insert a single row into the table: "topics" */
  insert_topics_one?: Maybe<Topics>;
  /** update data of the table: "assign_study_plan_tasks" */
  update_assign_study_plan_tasks?: Maybe<Assign_Study_Plan_Tasks_Mutation_Response>;
  /** update single row of the table: "assign_study_plan_tasks" */
  update_assign_study_plan_tasks_by_pk?: Maybe<Assign_Study_Plan_Tasks>;
  /** update data of the table: "assignment_study_plan_items" */
  update_assignment_study_plan_items?: Maybe<Assignment_Study_Plan_Items_Mutation_Response>;
  /** update single row of the table: "assignment_study_plan_items" */
  update_assignment_study_plan_items_by_pk?: Maybe<Assignment_Study_Plan_Items>;
  /** update data of the table: "assignments" */
  update_assignments?: Maybe<Assignments_Mutation_Response>;
  /** update single row of the table: "assignments" */
  update_assignments_by_pk?: Maybe<Assignments>;
  /** update data of the table: "books" */
  update_books?: Maybe<Books_Mutation_Response>;
  /** update single row of the table: "books" */
  update_books_by_pk?: Maybe<Books>;
  /** update data of the table: "books_chapters" */
  update_books_chapters?: Maybe<Books_Chapters_Mutation_Response>;
  /** update single row of the table: "books_chapters" */
  update_books_chapters_by_pk?: Maybe<Books_Chapters>;
  /** update data of the table: "brands" */
  update_brands?: Maybe<Brands_Mutation_Response>;
  /** update single row of the table: "brands" */
  update_brands_by_pk?: Maybe<Brands>;
  /** update data of the table: "centers" */
  update_centers?: Maybe<Centers_Mutation_Response>;
  /** update single row of the table: "centers" */
  update_centers_by_pk?: Maybe<Centers>;
  /** update data of the table: "chapters" */
  update_chapters?: Maybe<Chapters_Mutation_Response>;
  /** update single row of the table: "chapters" */
  update_chapters_by_pk?: Maybe<Chapters>;
  /** update data of the table: "course_students" */
  update_course_students?: Maybe<Course_Students_Mutation_Response>;
  /** update single row of the table: "course_students" */
  update_course_students_by_pk?: Maybe<Course_Students>;
  /** update data of the table: "course_study_plans" */
  update_course_study_plans?: Maybe<Course_Study_Plans_Mutation_Response>;
  /** update single row of the table: "course_study_plans" */
  update_course_study_plans_by_pk?: Maybe<Course_Study_Plans>;
  /** update data of the table: "courses_books" */
  update_courses_books?: Maybe<Courses_Books_Mutation_Response>;
  /** update single row of the table: "courses_books" */
  update_courses_books_by_pk?: Maybe<Courses_Books>;
  /** update data of the table: "learning_objectives" */
  update_learning_objectives?: Maybe<Learning_Objectives_Mutation_Response>;
  /** update single row of the table: "learning_objectives" */
  update_learning_objectives_by_pk?: Maybe<Learning_Objectives>;
  /** update data of the table: "lo_study_plan_items" */
  update_lo_study_plan_items?: Maybe<Lo_Study_Plan_Items_Mutation_Response>;
  /** update single row of the table: "lo_study_plan_items" */
  update_lo_study_plan_items_by_pk?: Maybe<Lo_Study_Plan_Items>;
  /** update data of the table: "quiz_sets" */
  update_quiz_sets?: Maybe<Quiz_Sets_Mutation_Response>;
  /** update single row of the table: "quiz_sets" */
  update_quiz_sets_by_pk?: Maybe<Quiz_Sets>;
  /** update data of the table: "quizzes" */
  update_quizzes?: Maybe<Quizzes_Mutation_Response>;
  /** update single row of the table: "quizzes" */
  update_quizzes_by_pk?: Maybe<Quizzes>;
  /** update data of the table: "scheduler_items" */
  update_scheduler_items?: Maybe<Scheduler_Items_Mutation_Response>;
  /** update single row of the table: "scheduler_items" */
  update_scheduler_items_by_pk?: Maybe<Scheduler_Items>;
  /** update data of the table: "scheduler_patterns" */
  update_scheduler_patterns?: Maybe<Scheduler_Patterns_Mutation_Response>;
  /** update single row of the table: "scheduler_patterns" */
  update_scheduler_patterns_by_pk?: Maybe<Scheduler_Patterns>;
  /** update data of the table: "student_study_plans" */
  update_student_study_plans?: Maybe<Student_Study_Plans_Mutation_Response>;
  /** update single row of the table: "student_study_plans" */
  update_student_study_plans_by_pk?: Maybe<Student_Study_Plans>;
  /** update data of the table: "study_plan_items" */
  update_study_plan_items?: Maybe<Study_Plan_Items_Mutation_Response>;
  /** update single row of the table: "study_plan_items" */
  update_study_plan_items_by_pk?: Maybe<Study_Plan_Items>;
  /** update data of the table: "study_plans" */
  update_study_plans?: Maybe<Study_Plans_Mutation_Response>;
  /** update single row of the table: "study_plans" */
  update_study_plans_by_pk?: Maybe<Study_Plans>;
  /** update data of the table: "topics" */
  update_topics?: Maybe<Topics_Mutation_Response>;
  /** update data of the table: "topics_assignments" */
  update_topics_assignments?: Maybe<Topics_Assignments_Mutation_Response>;
  /** update single row of the table: "topics_assignments" */
  update_topics_assignments_by_pk?: Maybe<Topics_Assignments>;
  /** update single row of the table: "topics" */
  update_topics_by_pk?: Maybe<Topics>;
  /** update data of the table: "topics_learning_objectives" */
  update_topics_learning_objectives?: Maybe<Topics_Learning_Objectives_Mutation_Response>;
  /** update single row of the table: "topics_learning_objectives" */
  update_topics_learning_objectives_by_pk?: Maybe<Topics_Learning_Objectives>;
};


/** mutation root */
export type Mutation_RootDelete_Assign_Study_Plan_TasksArgs = {
  where: Assign_Study_Plan_Tasks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Assign_Study_Plan_Tasks_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Assignment_Study_Plan_ItemsArgs = {
  where: Assignment_Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Assignment_Study_Plan_Items_By_PkArgs = {
  assignment_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_AssignmentsArgs = {
  where: Assignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Assignments_By_PkArgs = {
  assignment_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_BooksArgs = {
  where: Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Books_By_PkArgs = {
  book_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Books_ChaptersArgs = {
  where: Books_Chapters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Books_Chapters_By_PkArgs = {
  book_id: Scalars['String'];
  chapter_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_BrandsArgs = {
  where: Brands_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Brands_By_PkArgs = {
  brand_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_CentersArgs = {
  where: Centers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Centers_By_PkArgs = {
  center_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_ChaptersArgs = {
  where: Chapters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chapters_By_PkArgs = {
  chapter_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Course_StudentsArgs = {
  where: Course_Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Course_Students_By_PkArgs = {
  course_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Course_Study_PlansArgs = {
  where: Course_Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Course_Study_Plans_By_PkArgs = {
  course_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Courses_BooksArgs = {
  where: Courses_Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Courses_Books_By_PkArgs = {
  book_id: Scalars['String'];
  course_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Learning_ObjectivesArgs = {
  where: Learning_Objectives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Learning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Lo_Study_Plan_ItemsArgs = {
  where: Lo_Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Lo_Study_Plan_Items_By_PkArgs = {
  lo_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Quiz_SetsArgs = {
  where: Quiz_Sets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quiz_Sets_By_PkArgs = {
  quiz_set_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_QuizzesArgs = {
  where: Quizzes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quizzes_By_PkArgs = {
  quiz_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Scheduler_ItemsArgs = {
  where: Scheduler_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scheduler_Items_By_PkArgs = {
  scheduler_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Scheduler_PatternsArgs = {
  where: Scheduler_Patterns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scheduler_Patterns_By_PkArgs = {
  scheduler_pattern_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_Study_PlansArgs = {
  where: Student_Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Study_Plans_By_PkArgs = {
  student_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Study_Plan_ItemsArgs = {
  where: Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Study_Plan_Items_By_PkArgs = {
  study_plan_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Study_PlansArgs = {
  where: Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Study_Plans_By_PkArgs = {
  study_plan_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TopicsArgs = {
  where: Topics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Topics_AssignmentsArgs = {
  where: Topics_Assignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Topics_Assignments_By_PkArgs = {
  assignment_id: Scalars['String'];
  topic_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Topics_By_PkArgs = {
  topic_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Topics_Learning_ObjectivesArgs = {
  where: Topics_Learning_Objectives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Topics_Learning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
  topic_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_Assign_Study_Plan_TasksArgs = {
  objects: Array<Assign_Study_Plan_Tasks_Insert_Input>;
  on_conflict?: InputMaybe<Assign_Study_Plan_Tasks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Assign_Study_Plan_Tasks_OneArgs = {
  object: Assign_Study_Plan_Tasks_Insert_Input;
  on_conflict?: InputMaybe<Assign_Study_Plan_Tasks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Assignment_Study_Plan_ItemsArgs = {
  objects: Array<Assignment_Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Assignment_Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Assignment_Study_Plan_Items_OneArgs = {
  object: Assignment_Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Assignment_Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AssignmentsArgs = {
  objects: Array<Assignments_Insert_Input>;
  on_conflict?: InputMaybe<Assignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Assignments_OneArgs = {
  object: Assignments_Insert_Input;
  on_conflict?: InputMaybe<Assignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BooksArgs = {
  objects: Array<Books_Insert_Input>;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Books_ChaptersArgs = {
  objects: Array<Books_Chapters_Insert_Input>;
  on_conflict?: InputMaybe<Books_Chapters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Books_Chapters_OneArgs = {
  object: Books_Chapters_Insert_Input;
  on_conflict?: InputMaybe<Books_Chapters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Books_OneArgs = {
  object: Books_Insert_Input;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BrandsArgs = {
  objects: Array<Brands_Insert_Input>;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Brands_OneArgs = {
  object: Brands_Insert_Input;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CentersArgs = {
  objects: Array<Centers_Insert_Input>;
  on_conflict?: InputMaybe<Centers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Centers_OneArgs = {
  object: Centers_Insert_Input;
  on_conflict?: InputMaybe<Centers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ChaptersArgs = {
  objects: Array<Chapters_Insert_Input>;
  on_conflict?: InputMaybe<Chapters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chapters_OneArgs = {
  object: Chapters_Insert_Input;
  on_conflict?: InputMaybe<Chapters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_StudentsArgs = {
  objects: Array<Course_Students_Insert_Input>;
  on_conflict?: InputMaybe<Course_Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_Students_OneArgs = {
  object: Course_Students_Insert_Input;
  on_conflict?: InputMaybe<Course_Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_Study_PlansArgs = {
  objects: Array<Course_Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Course_Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_Study_Plans_OneArgs = {
  object: Course_Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Course_Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Courses_BooksArgs = {
  objects: Array<Courses_Books_Insert_Input>;
  on_conflict?: InputMaybe<Courses_Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Courses_Books_OneArgs = {
  object: Courses_Books_Insert_Input;
  on_conflict?: InputMaybe<Courses_Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Learning_ObjectivesArgs = {
  objects: Array<Learning_Objectives_Insert_Input>;
  on_conflict?: InputMaybe<Learning_Objectives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Learning_Objectives_OneArgs = {
  object: Learning_Objectives_Insert_Input;
  on_conflict?: InputMaybe<Learning_Objectives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Lo_Study_Plan_ItemsArgs = {
  objects: Array<Lo_Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Lo_Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Lo_Study_Plan_Items_OneArgs = {
  object: Lo_Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Lo_Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quiz_SetsArgs = {
  objects: Array<Quiz_Sets_Insert_Input>;
  on_conflict?: InputMaybe<Quiz_Sets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quiz_Sets_OneArgs = {
  object: Quiz_Sets_Insert_Input;
  on_conflict?: InputMaybe<Quiz_Sets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuizzesArgs = {
  objects: Array<Quizzes_Insert_Input>;
  on_conflict?: InputMaybe<Quizzes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quizzes_OneArgs = {
  object: Quizzes_Insert_Input;
  on_conflict?: InputMaybe<Quizzes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scheduler_ItemsArgs = {
  objects: Array<Scheduler_Items_Insert_Input>;
  on_conflict?: InputMaybe<Scheduler_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scheduler_Items_OneArgs = {
  object: Scheduler_Items_Insert_Input;
  on_conflict?: InputMaybe<Scheduler_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scheduler_PatternsArgs = {
  objects: Array<Scheduler_Patterns_Insert_Input>;
  on_conflict?: InputMaybe<Scheduler_Patterns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scheduler_Patterns_OneArgs = {
  object: Scheduler_Patterns_Insert_Input;
  on_conflict?: InputMaybe<Scheduler_Patterns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Study_PlansArgs = {
  objects: Array<Student_Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Student_Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Study_Plans_OneArgs = {
  object: Student_Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Student_Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Study_Plan_ItemsArgs = {
  objects: Array<Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Study_Plan_Items_OneArgs = {
  object: Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Study_Plan_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Study_PlansArgs = {
  objects: Array<Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Study_Plans_OneArgs = {
  object: Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Study_Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TopicsArgs = {
  objects: Array<Topics_Insert_Input>;
  on_conflict?: InputMaybe<Topics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topics_AssignmentsArgs = {
  objects: Array<Topics_Assignments_Insert_Input>;
  on_conflict?: InputMaybe<Topics_Assignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topics_Assignments_OneArgs = {
  object: Topics_Assignments_Insert_Input;
  on_conflict?: InputMaybe<Topics_Assignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topics_Learning_ObjectivesArgs = {
  objects: Array<Topics_Learning_Objectives_Insert_Input>;
  on_conflict?: InputMaybe<Topics_Learning_Objectives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topics_Learning_Objectives_OneArgs = {
  object: Topics_Learning_Objectives_Insert_Input;
  on_conflict?: InputMaybe<Topics_Learning_Objectives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topics_OneArgs = {
  object: Topics_Insert_Input;
  on_conflict?: InputMaybe<Topics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Assign_Study_Plan_TasksArgs = {
  _set?: InputMaybe<Assign_Study_Plan_Tasks_Set_Input>;
  where: Assign_Study_Plan_Tasks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Assign_Study_Plan_Tasks_By_PkArgs = {
  _set?: InputMaybe<Assign_Study_Plan_Tasks_Set_Input>;
  pk_columns: Assign_Study_Plan_Tasks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Assignment_Study_Plan_ItemsArgs = {
  _set?: InputMaybe<Assignment_Study_Plan_Items_Set_Input>;
  where: Assignment_Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Assignment_Study_Plan_Items_By_PkArgs = {
  _set?: InputMaybe<Assignment_Study_Plan_Items_Set_Input>;
  pk_columns: Assignment_Study_Plan_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AssignmentsArgs = {
  _append?: InputMaybe<Assignments_Append_Input>;
  _delete_at_path?: InputMaybe<Assignments_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Assignments_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Assignments_Delete_Key_Input>;
  _inc?: InputMaybe<Assignments_Inc_Input>;
  _prepend?: InputMaybe<Assignments_Prepend_Input>;
  _set?: InputMaybe<Assignments_Set_Input>;
  where: Assignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Assignments_By_PkArgs = {
  _append?: InputMaybe<Assignments_Append_Input>;
  _delete_at_path?: InputMaybe<Assignments_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Assignments_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Assignments_Delete_Key_Input>;
  _inc?: InputMaybe<Assignments_Inc_Input>;
  _prepend?: InputMaybe<Assignments_Prepend_Input>;
  _set?: InputMaybe<Assignments_Set_Input>;
  pk_columns: Assignments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BooksArgs = {
  _inc?: InputMaybe<Books_Inc_Input>;
  _set?: InputMaybe<Books_Set_Input>;
  where: Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Books_By_PkArgs = {
  _inc?: InputMaybe<Books_Inc_Input>;
  _set?: InputMaybe<Books_Set_Input>;
  pk_columns: Books_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Books_ChaptersArgs = {
  _set?: InputMaybe<Books_Chapters_Set_Input>;
  where: Books_Chapters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Books_Chapters_By_PkArgs = {
  _set?: InputMaybe<Books_Chapters_Set_Input>;
  pk_columns: Books_Chapters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BrandsArgs = {
  _set?: InputMaybe<Brands_Set_Input>;
  where: Brands_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Brands_By_PkArgs = {
  _set?: InputMaybe<Brands_Set_Input>;
  pk_columns: Brands_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CentersArgs = {
  _set?: InputMaybe<Centers_Set_Input>;
  where: Centers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Centers_By_PkArgs = {
  _set?: InputMaybe<Centers_Set_Input>;
  pk_columns: Centers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ChaptersArgs = {
  _inc?: InputMaybe<Chapters_Inc_Input>;
  _set?: InputMaybe<Chapters_Set_Input>;
  where: Chapters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chapters_By_PkArgs = {
  _inc?: InputMaybe<Chapters_Inc_Input>;
  _set?: InputMaybe<Chapters_Set_Input>;
  pk_columns: Chapters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Course_StudentsArgs = {
  _set?: InputMaybe<Course_Students_Set_Input>;
  where: Course_Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Course_Students_By_PkArgs = {
  _set?: InputMaybe<Course_Students_Set_Input>;
  pk_columns: Course_Students_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Course_Study_PlansArgs = {
  _set?: InputMaybe<Course_Study_Plans_Set_Input>;
  where: Course_Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Course_Study_Plans_By_PkArgs = {
  _set?: InputMaybe<Course_Study_Plans_Set_Input>;
  pk_columns: Course_Study_Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Courses_BooksArgs = {
  _set?: InputMaybe<Courses_Books_Set_Input>;
  where: Courses_Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Courses_Books_By_PkArgs = {
  _set?: InputMaybe<Courses_Books_Set_Input>;
  pk_columns: Courses_Books_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Learning_ObjectivesArgs = {
  _inc?: InputMaybe<Learning_Objectives_Inc_Input>;
  _set?: InputMaybe<Learning_Objectives_Set_Input>;
  where: Learning_Objectives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Learning_Objectives_By_PkArgs = {
  _inc?: InputMaybe<Learning_Objectives_Inc_Input>;
  _set?: InputMaybe<Learning_Objectives_Set_Input>;
  pk_columns: Learning_Objectives_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Lo_Study_Plan_ItemsArgs = {
  _set?: InputMaybe<Lo_Study_Plan_Items_Set_Input>;
  where: Lo_Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Lo_Study_Plan_Items_By_PkArgs = {
  _set?: InputMaybe<Lo_Study_Plan_Items_Set_Input>;
  pk_columns: Lo_Study_Plan_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quiz_SetsArgs = {
  _set?: InputMaybe<Quiz_Sets_Set_Input>;
  where: Quiz_Sets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quiz_Sets_By_PkArgs = {
  _set?: InputMaybe<Quiz_Sets_Set_Input>;
  pk_columns: Quiz_Sets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_QuizzesArgs = {
  _append?: InputMaybe<Quizzes_Append_Input>;
  _delete_at_path?: InputMaybe<Quizzes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Quizzes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Quizzes_Delete_Key_Input>;
  _inc?: InputMaybe<Quizzes_Inc_Input>;
  _prepend?: InputMaybe<Quizzes_Prepend_Input>;
  _set?: InputMaybe<Quizzes_Set_Input>;
  where: Quizzes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quizzes_By_PkArgs = {
  _append?: InputMaybe<Quizzes_Append_Input>;
  _delete_at_path?: InputMaybe<Quizzes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Quizzes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Quizzes_Delete_Key_Input>;
  _inc?: InputMaybe<Quizzes_Inc_Input>;
  _prepend?: InputMaybe<Quizzes_Prepend_Input>;
  _set?: InputMaybe<Quizzes_Set_Input>;
  pk_columns: Quizzes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scheduler_ItemsArgs = {
  _append?: InputMaybe<Scheduler_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Scheduler_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Scheduler_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Scheduler_Items_Delete_Key_Input>;
  _prepend?: InputMaybe<Scheduler_Items_Prepend_Input>;
  _set?: InputMaybe<Scheduler_Items_Set_Input>;
  where: Scheduler_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scheduler_Items_By_PkArgs = {
  _append?: InputMaybe<Scheduler_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Scheduler_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Scheduler_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Scheduler_Items_Delete_Key_Input>;
  _prepend?: InputMaybe<Scheduler_Items_Prepend_Input>;
  _set?: InputMaybe<Scheduler_Items_Set_Input>;
  pk_columns: Scheduler_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scheduler_PatternsArgs = {
  _append?: InputMaybe<Scheduler_Patterns_Append_Input>;
  _delete_at_path?: InputMaybe<Scheduler_Patterns_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Scheduler_Patterns_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Scheduler_Patterns_Delete_Key_Input>;
  _prepend?: InputMaybe<Scheduler_Patterns_Prepend_Input>;
  _set?: InputMaybe<Scheduler_Patterns_Set_Input>;
  where: Scheduler_Patterns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scheduler_Patterns_By_PkArgs = {
  _append?: InputMaybe<Scheduler_Patterns_Append_Input>;
  _delete_at_path?: InputMaybe<Scheduler_Patterns_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Scheduler_Patterns_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Scheduler_Patterns_Delete_Key_Input>;
  _prepend?: InputMaybe<Scheduler_Patterns_Prepend_Input>;
  _set?: InputMaybe<Scheduler_Patterns_Set_Input>;
  pk_columns: Scheduler_Patterns_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Study_PlansArgs = {
  _set?: InputMaybe<Student_Study_Plans_Set_Input>;
  where: Student_Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Study_Plans_By_PkArgs = {
  _set?: InputMaybe<Student_Study_Plans_Set_Input>;
  pk_columns: Student_Study_Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Study_Plan_ItemsArgs = {
  _append?: InputMaybe<Study_Plan_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Study_Plan_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Study_Plan_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Study_Plan_Items_Delete_Key_Input>;
  _inc?: InputMaybe<Study_Plan_Items_Inc_Input>;
  _prepend?: InputMaybe<Study_Plan_Items_Prepend_Input>;
  _set?: InputMaybe<Study_Plan_Items_Set_Input>;
  where: Study_Plan_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Study_Plan_Items_By_PkArgs = {
  _append?: InputMaybe<Study_Plan_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Study_Plan_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Study_Plan_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Study_Plan_Items_Delete_Key_Input>;
  _inc?: InputMaybe<Study_Plan_Items_Inc_Input>;
  _prepend?: InputMaybe<Study_Plan_Items_Prepend_Input>;
  _set?: InputMaybe<Study_Plan_Items_Set_Input>;
  pk_columns: Study_Plan_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Study_PlansArgs = {
  _inc?: InputMaybe<Study_Plans_Inc_Input>;
  _set?: InputMaybe<Study_Plans_Set_Input>;
  where: Study_Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Study_Plans_By_PkArgs = {
  _inc?: InputMaybe<Study_Plans_Inc_Input>;
  _set?: InputMaybe<Study_Plans_Set_Input>;
  pk_columns: Study_Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TopicsArgs = {
  _inc?: InputMaybe<Topics_Inc_Input>;
  _set?: InputMaybe<Topics_Set_Input>;
  where: Topics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Topics_AssignmentsArgs = {
  _inc?: InputMaybe<Topics_Assignments_Inc_Input>;
  _set?: InputMaybe<Topics_Assignments_Set_Input>;
  where: Topics_Assignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Topics_Assignments_By_PkArgs = {
  _inc?: InputMaybe<Topics_Assignments_Inc_Input>;
  _set?: InputMaybe<Topics_Assignments_Set_Input>;
  pk_columns: Topics_Assignments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Topics_By_PkArgs = {
  _inc?: InputMaybe<Topics_Inc_Input>;
  _set?: InputMaybe<Topics_Set_Input>;
  pk_columns: Topics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Topics_Learning_ObjectivesArgs = {
  _inc?: InputMaybe<Topics_Learning_Objectives_Inc_Input>;
  _set?: InputMaybe<Topics_Learning_Objectives_Set_Input>;
  where: Topics_Learning_Objectives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Topics_Learning_Objectives_By_PkArgs = {
  _inc?: InputMaybe<Topics_Learning_Objectives_Inc_Input>;
  _set?: InputMaybe<Topics_Learning_Objectives_Set_Input>;
  pk_columns: Topics_Learning_Objectives_Pk_Columns_Input;
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
  /** fetch data from the table: "assign_study_plan_tasks" */
  assign_study_plan_tasks: Array<Assign_Study_Plan_Tasks>;
  /** fetch aggregated fields from the table: "assign_study_plan_tasks" */
  assign_study_plan_tasks_aggregate: Assign_Study_Plan_Tasks_Aggregate;
  /** fetch data from the table: "assign_study_plan_tasks" using primary key columns */
  assign_study_plan_tasks_by_pk?: Maybe<Assign_Study_Plan_Tasks>;
  /** fetch data from the table: "assignment_study_plan_items" */
  assignment_study_plan_items: Array<Assignment_Study_Plan_Items>;
  /** fetch aggregated fields from the table: "assignment_study_plan_items" */
  assignment_study_plan_items_aggregate: Assignment_Study_Plan_Items_Aggregate;
  /** fetch data from the table: "assignment_study_plan_items" using primary key columns */
  assignment_study_plan_items_by_pk?: Maybe<Assignment_Study_Plan_Items>;
  /** fetch data from the table: "assignments" */
  assignments: Array<Assignments>;
  /** fetch aggregated fields from the table: "assignments" */
  assignments_aggregate: Assignments_Aggregate;
  /** fetch data from the table: "assignments" using primary key columns */
  assignments_by_pk?: Maybe<Assignments>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "books" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "books_chapters" */
  books_chapters: Array<Books_Chapters>;
  /** fetch aggregated fields from the table: "books_chapters" */
  books_chapters_aggregate: Books_Chapters_Aggregate;
  /** fetch data from the table: "books_chapters" using primary key columns */
  books_chapters_by_pk?: Maybe<Books_Chapters>;
  /** fetch data from the table: "brands" */
  brands: Array<Brands>;
  /** fetch aggregated fields from the table: "brands" */
  brands_aggregate: Brands_Aggregate;
  /** fetch data from the table: "brands" using primary key columns */
  brands_by_pk?: Maybe<Brands>;
  /** fetch data from the table: "centers" */
  centers: Array<Centers>;
  /** fetch aggregated fields from the table: "centers" */
  centers_aggregate: Centers_Aggregate;
  /** fetch data from the table: "centers" using primary key columns */
  centers_by_pk?: Maybe<Centers>;
  /** fetch data from the table: "chapters" */
  chapters: Array<Chapters>;
  /** fetch aggregated fields from the table: "chapters" */
  chapters_aggregate: Chapters_Aggregate;
  /** fetch data from the table: "chapters" using primary key columns */
  chapters_by_pk?: Maybe<Chapters>;
  /** fetch data from the table: "course_students" */
  course_students: Array<Course_Students>;
  /** fetch aggregated fields from the table: "course_students" */
  course_students_aggregate: Course_Students_Aggregate;
  /** fetch data from the table: "course_students" using primary key columns */
  course_students_by_pk?: Maybe<Course_Students>;
  /** fetch data from the table: "course_study_plans" */
  course_study_plans: Array<Course_Study_Plans>;
  /** fetch aggregated fields from the table: "course_study_plans" */
  course_study_plans_aggregate: Course_Study_Plans_Aggregate;
  /** fetch data from the table: "course_study_plans" using primary key columns */
  course_study_plans_by_pk?: Maybe<Course_Study_Plans>;
  /** fetch data from the table: "courses_books" */
  courses_books: Array<Courses_Books>;
  /** fetch aggregated fields from the table: "courses_books" */
  courses_books_aggregate: Courses_Books_Aggregate;
  /** fetch data from the table: "courses_books" using primary key columns */
  courses_books_by_pk?: Maybe<Courses_Books>;
  /** execute function "find_assignment_by_topic_id" which returns "assignments" */
  find_assignment_by_topic_id: Array<Assignments>;
  /** execute function "find_assignment_by_topic_id" and query aggregates on result of table type "assignments" */
  find_assignment_by_topic_id_aggregate: Assignments_Aggregate;
  /** execute function "find_quiz_by_lo_id" which returns "quizzes" */
  find_quiz_by_lo_id: Array<Quizzes>;
  /** execute function "find_quiz_by_lo_id" and query aggregates on result of table type "quizzes" */
  find_quiz_by_lo_id_aggregate: Quizzes_Aggregate;
  /** execute function "get_list_course_student_study_plans_by_filter" which returns "course_students" */
  get_list_course_student_study_plans_by_filter: Array<Course_Students>;
  /** execute function "get_list_course_student_study_plans_by_filter" and query aggregates on result of table type "course_students" */
  get_list_course_student_study_plans_by_filter_aggregate: Course_Students_Aggregate;
  /** execute function "get_list_course_study_plan_by_filter" which returns "course_study_plans" */
  get_list_course_study_plan_by_filter: Array<Course_Study_Plans>;
  /** execute function "get_list_course_study_plan_by_filter" and query aggregates on result of table type "course_study_plans" */
  get_list_course_study_plan_by_filter_aggregate: Course_Study_Plans_Aggregate;
  /** execute function "get_student_study_plans_by_filter" which returns "study_plans" */
  get_student_study_plans_by_filter: Array<Study_Plans>;
  /** execute function "get_student_study_plans_by_filter" and query aggregates on result of table type "study_plans" */
  get_student_study_plans_by_filter_aggregate: Study_Plans_Aggregate;
  /** fetch data from the table: "learning_objectives" */
  learning_objectives: Array<Learning_Objectives>;
  /** fetch aggregated fields from the table: "learning_objectives" */
  learning_objectives_aggregate: Learning_Objectives_Aggregate;
  /** fetch data from the table: "learning_objectives" using primary key columns */
  learning_objectives_by_pk?: Maybe<Learning_Objectives>;
  /** fetch data from the table: "lo_study_plan_items" */
  lo_study_plan_items: Array<Lo_Study_Plan_Items>;
  /** fetch aggregated fields from the table: "lo_study_plan_items" */
  lo_study_plan_items_aggregate: Lo_Study_Plan_Items_Aggregate;
  /** fetch data from the table: "lo_study_plan_items" using primary key columns */
  lo_study_plan_items_by_pk?: Maybe<Lo_Study_Plan_Items>;
  /** fetch data from the table: "quiz_sets" */
  quiz_sets: Array<Quiz_Sets>;
  /** fetch aggregated fields from the table: "quiz_sets" */
  quiz_sets_aggregate: Quiz_Sets_Aggregate;
  /** fetch data from the table: "quiz_sets" using primary key columns */
  quiz_sets_by_pk?: Maybe<Quiz_Sets>;
  /** fetch data from the table: "quizzes" */
  quizzes: Array<Quizzes>;
  /** fetch aggregated fields from the table: "quizzes" */
  quizzes_aggregate: Quizzes_Aggregate;
  /** fetch data from the table: "quizzes" using primary key columns */
  quizzes_by_pk?: Maybe<Quizzes>;
  /** fetch data from the table: "scheduler_items" */
  scheduler_items: Array<Scheduler_Items>;
  /** fetch aggregated fields from the table: "scheduler_items" */
  scheduler_items_aggregate: Scheduler_Items_Aggregate;
  /** fetch data from the table: "scheduler_items" using primary key columns */
  scheduler_items_by_pk?: Maybe<Scheduler_Items>;
  /** fetch data from the table: "scheduler_patterns" */
  scheduler_patterns: Array<Scheduler_Patterns>;
  /** fetch aggregated fields from the table: "scheduler_patterns" */
  scheduler_patterns_aggregate: Scheduler_Patterns_Aggregate;
  /** fetch data from the table: "scheduler_patterns" using primary key columns */
  scheduler_patterns_by_pk?: Maybe<Scheduler_Patterns>;
  /** fetch data from the table: "student_study_plans" */
  student_study_plans: Array<Student_Study_Plans>;
  /** fetch aggregated fields from the table: "student_study_plans" */
  student_study_plans_aggregate: Student_Study_Plans_Aggregate;
  /** fetch data from the table: "student_study_plans" using primary key columns */
  student_study_plans_by_pk?: Maybe<Student_Study_Plans>;
  /** fetch data from the table: "study_plan_items" */
  study_plan_items: Array<Study_Plan_Items>;
  /** fetch aggregated fields from the table: "study_plan_items" */
  study_plan_items_aggregate: Study_Plan_Items_Aggregate;
  /** fetch data from the table: "study_plan_items" using primary key columns */
  study_plan_items_by_pk?: Maybe<Study_Plan_Items>;
  /** fetch data from the table: "study_plans" */
  study_plans: Array<Study_Plans>;
  /** fetch aggregated fields from the table: "study_plans" */
  study_plans_aggregate: Study_Plans_Aggregate;
  /** fetch data from the table: "study_plans" using primary key columns */
  study_plans_by_pk?: Maybe<Study_Plans>;
  /** fetch data from the table: "topics" */
  topics: Array<Topics>;
  /** fetch aggregated fields from the table: "topics" */
  topics_aggregate: Topics_Aggregate;
  /** fetch data from the table: "topics_assignments" */
  topics_assignments: Array<Topics_Assignments>;
  /** fetch aggregated fields from the table: "topics_assignments" */
  topics_assignments_aggregate: Topics_Assignments_Aggregate;
  /** fetch data from the table: "topics_assignments" using primary key columns */
  topics_assignments_by_pk?: Maybe<Topics_Assignments>;
  /** fetch data from the table: "topics" using primary key columns */
  topics_by_pk?: Maybe<Topics>;
  /** fetch data from the table: "topics_learning_objectives" */
  topics_learning_objectives: Array<Topics_Learning_Objectives>;
  /** fetch aggregated fields from the table: "topics_learning_objectives" */
  topics_learning_objectives_aggregate: Topics_Learning_Objectives_Aggregate;
  /** fetch data from the table: "topics_learning_objectives" using primary key columns */
  topics_learning_objectives_by_pk?: Maybe<Topics_Learning_Objectives>;
};


/** query root */
export type Query_RootAssign_Study_Plan_TasksArgs = {
  distinct_on?: InputMaybe<Array<Assign_Study_Plan_Tasks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assign_Study_Plan_Tasks_Order_By>>;
  where?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
};


/** query root */
export type Query_RootAssign_Study_Plan_Tasks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assign_Study_Plan_Tasks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assign_Study_Plan_Tasks_Order_By>>;
  where?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
};


/** query root */
export type Query_RootAssign_Study_Plan_Tasks_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootAssignment_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootAssignment_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootAssignment_Study_Plan_Items_By_PkArgs = {
  assignment_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** query root */
export type Query_RootAssignmentsArgs = {
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootAssignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootAssignments_By_PkArgs = {
  assignment_id: Scalars['String'];
};


/** query root */
export type Query_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


/** query root */
export type Query_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


/** query root */
export type Query_RootBooks_By_PkArgs = {
  book_id: Scalars['String'];
};


/** query root */
export type Query_RootBooks_ChaptersArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** query root */
export type Query_RootBooks_Chapters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** query root */
export type Query_RootBooks_Chapters_By_PkArgs = {
  book_id: Scalars['String'];
  chapter_id: Scalars['String'];
};


/** query root */
export type Query_RootBrandsArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


/** query root */
export type Query_RootBrands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


/** query root */
export type Query_RootBrands_By_PkArgs = {
  brand_id: Scalars['String'];
};


/** query root */
export type Query_RootCentersArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** query root */
export type Query_RootCenters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** query root */
export type Query_RootCenters_By_PkArgs = {
  center_id: Scalars['String'];
};


/** query root */
export type Query_RootChaptersArgs = {
  distinct_on?: InputMaybe<Array<Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapters_Order_By>>;
  where?: InputMaybe<Chapters_Bool_Exp>;
};


/** query root */
export type Query_RootChapters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapters_Order_By>>;
  where?: InputMaybe<Chapters_Bool_Exp>;
};


/** query root */
export type Query_RootChapters_By_PkArgs = {
  chapter_id: Scalars['String'];
};


/** query root */
export type Query_RootCourse_StudentsArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** query root */
export type Query_RootCourse_Students_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** query root */
export type Query_RootCourse_Students_By_PkArgs = {
  course_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** query root */
export type Query_RootCourse_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootCourse_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootCourse_Study_Plans_By_PkArgs = {
  course_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** query root */
export type Query_RootCourses_BooksArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};


/** query root */
export type Query_RootCourses_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};


/** query root */
export type Query_RootCourses_Books_By_PkArgs = {
  book_id: Scalars['String'];
  course_id: Scalars['String'];
};


/** query root */
export type Query_RootFind_Assignment_By_Topic_IdArgs = {
  args: Find_Assignment_By_Topic_Id_Args;
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootFind_Assignment_By_Topic_Id_AggregateArgs = {
  args: Find_Assignment_By_Topic_Id_Args;
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootFind_Quiz_By_Lo_IdArgs = {
  args: Find_Quiz_By_Lo_Id_Args;
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** query root */
export type Query_RootFind_Quiz_By_Lo_Id_AggregateArgs = {
  args: Find_Quiz_By_Lo_Id_Args;
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** query root */
export type Query_RootGet_List_Course_Student_Study_Plans_By_FilterArgs = {
  args: Get_List_Course_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** query root */
export type Query_RootGet_List_Course_Student_Study_Plans_By_Filter_AggregateArgs = {
  args: Get_List_Course_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** query root */
export type Query_RootGet_List_Course_Study_Plan_By_FilterArgs = {
  args: Get_List_Course_Study_Plan_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootGet_List_Course_Study_Plan_By_Filter_AggregateArgs = {
  args: Get_List_Course_Study_Plan_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootGet_Student_Study_Plans_By_FilterArgs = {
  args: Get_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootGet_Student_Study_Plans_By_Filter_AggregateArgs = {
  args: Get_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootLearning_ObjectivesArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};


/** query root */
export type Query_RootLearning_Objectives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};


/** query root */
export type Query_RootLearning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
};


/** query root */
export type Query_RootLo_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootLo_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootLo_Study_Plan_Items_By_PkArgs = {
  lo_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** query root */
export type Query_RootQuiz_SetsArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** query root */
export type Query_RootQuiz_Sets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** query root */
export type Query_RootQuiz_Sets_By_PkArgs = {
  quiz_set_id: Scalars['String'];
};


/** query root */
export type Query_RootQuizzesArgs = {
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** query root */
export type Query_RootQuizzes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** query root */
export type Query_RootQuizzes_By_PkArgs = {
  quiz_id: Scalars['String'];
};


/** query root */
export type Query_RootScheduler_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** query root */
export type Query_RootScheduler_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** query root */
export type Query_RootScheduler_Items_By_PkArgs = {
  scheduler_item_id: Scalars['String'];
};


/** query root */
export type Query_RootScheduler_PatternsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** query root */
export type Query_RootScheduler_Patterns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** query root */
export type Query_RootScheduler_Patterns_By_PkArgs = {
  scheduler_pattern_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Study_Plans_By_PkArgs = {
  student_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** query root */
export type Query_RootStudy_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootStudy_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** query root */
export type Query_RootStudy_Plan_Items_By_PkArgs = {
  study_plan_item_id: Scalars['String'];
};


/** query root */
export type Query_RootStudy_PlansArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootStudy_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** query root */
export type Query_RootStudy_Plans_By_PkArgs = {
  study_plan_id: Scalars['String'];
};


/** query root */
export type Query_RootTopicsArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_AssignmentsArgs = {
  distinct_on?: InputMaybe<Array<Topics_Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Assignments_Order_By>>;
  where?: InputMaybe<Topics_Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_Assignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Assignments_Order_By>>;
  where?: InputMaybe<Topics_Assignments_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_Assignments_By_PkArgs = {
  assignment_id: Scalars['String'];
  topic_id: Scalars['String'];
};


/** query root */
export type Query_RootTopics_By_PkArgs = {
  topic_id: Scalars['String'];
};


/** query root */
export type Query_RootTopics_Learning_ObjectivesArgs = {
  distinct_on?: InputMaybe<Array<Topics_Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Learning_Objectives_Order_By>>;
  where?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_Learning_Objectives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Learning_Objectives_Order_By>>;
  where?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
};


/** query root */
export type Query_RootTopics_Learning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
  topic_id: Scalars['String'];
};

/** columns and relationships of "quiz_sets" */
export type Quiz_Sets = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id: Scalars['String'];
  quiz_external_ids: Scalars['_text'];
  quiz_set_id: Scalars['String'];
  resource_path: Scalars['String'];
  status: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "quiz_sets" */
export type Quiz_Sets_Aggregate = {
  aggregate?: Maybe<Quiz_Sets_Aggregate_Fields>;
  nodes: Array<Quiz_Sets>;
};

/** aggregate fields of "quiz_sets" */
export type Quiz_Sets_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quiz_Sets_Max_Fields>;
  min?: Maybe<Quiz_Sets_Min_Fields>;
};


/** aggregate fields of "quiz_sets" */
export type Quiz_Sets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quiz_sets" */
export type Quiz_Sets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quiz_Sets_Max_Order_By>;
  min?: InputMaybe<Quiz_Sets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "quiz_sets" */
export type Quiz_Sets_Arr_Rel_Insert_Input = {
  data: Array<Quiz_Sets_Insert_Input>;
  on_conflict?: InputMaybe<Quiz_Sets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "quiz_sets". All fields are combined with a logical 'AND'. */
export type Quiz_Sets_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Quiz_Sets_Bool_Exp>>>;
  _not?: InputMaybe<Quiz_Sets_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quiz_Sets_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  lo_id?: InputMaybe<String_Comparison_Exp>;
  quiz_external_ids?: InputMaybe<_Text_Comparison_Exp>;
  quiz_set_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "quiz_sets" */
export enum Quiz_Sets_Constraint {
  /** unique or primary key constraint */
  QuizSetsApprovedLoIdIdx = 'quiz_sets_approved_lo_id_idx',
  /** unique or primary key constraint */
  QuizSetsPk = 'quiz_sets_pk'
}

/** input type for inserting data into table "quiz_sets" */
export type Quiz_Sets_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lo_id?: InputMaybe<Scalars['String']>;
  quiz_external_ids?: InputMaybe<Scalars['_text']>;
  quiz_set_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Quiz_Sets_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id?: Maybe<Scalars['String']>;
  quiz_set_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "quiz_sets" */
export type Quiz_Sets_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  quiz_set_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quiz_Sets_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lo_id?: Maybe<Scalars['String']>;
  quiz_set_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "quiz_sets" */
export type Quiz_Sets_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  quiz_set_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quiz_sets" */
export type Quiz_Sets_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quiz_Sets>;
};

/** input type for inserting object relation for remote table "quiz_sets" */
export type Quiz_Sets_Obj_Rel_Insert_Input = {
  data: Quiz_Sets_Insert_Input;
  on_conflict?: InputMaybe<Quiz_Sets_On_Conflict>;
};

/** on conflict condition type for table "quiz_sets" */
export type Quiz_Sets_On_Conflict = {
  constraint: Quiz_Sets_Constraint;
  update_columns: Array<Quiz_Sets_Update_Column>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};

/** ordering options when selecting data from "quiz_sets" */
export type Quiz_Sets_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  quiz_external_ids?: InputMaybe<Order_By>;
  quiz_set_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quiz_sets" */
export type Quiz_Sets_Pk_Columns_Input = {
  quiz_set_id: Scalars['String'];
};

/** select columns of table "quiz_sets" */
export enum Quiz_Sets_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  QuizExternalIds = 'quiz_external_ids',
  /** column name */
  QuizSetId = 'quiz_set_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "quiz_sets" */
export type Quiz_Sets_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lo_id?: InputMaybe<Scalars['String']>;
  quiz_external_ids?: InputMaybe<Scalars['_text']>;
  quiz_set_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "quiz_sets" */
export enum Quiz_Sets_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  QuizExternalIds = 'quiz_external_ids',
  /** column name */
  QuizSetId = 'quiz_set_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "quizzes" */
export type Quizzes = {
  approved_by: Scalars['String'];
  country: Scalars['String'];
  created_at: Scalars['timestamptz'];
  created_by: Scalars['String'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  difficulty_level?: Maybe<Scalars['Int']>;
  explanation: Scalars['jsonb'];
  external_id: Scalars['String'];
  kind: Scalars['String'];
  lo_ids?: Maybe<Scalars['_text']>;
  options: Scalars['jsonb'];
  question: Scalars['jsonb'];
  quiz_id: Scalars['String'];
  /** An array relationship */
  quiz_sets: Array<Quiz_Sets>;
  /** An aggregated array relationship */
  quiz_sets_aggregate: Quiz_Sets_Aggregate;
  resource_path: Scalars['String'];
  school_id: Scalars['Int'];
  status: Scalars['String'];
  tagged_los?: Maybe<Scalars['_text']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "quizzes" */
export type QuizzesExplanationArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "quizzes" */
export type QuizzesOptionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "quizzes" */
export type QuizzesQuestionArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "quizzes" */
export type QuizzesQuiz_SetsArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** columns and relationships of "quizzes" */
export type QuizzesQuiz_Sets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};

/** aggregated selection of "quizzes" */
export type Quizzes_Aggregate = {
  aggregate?: Maybe<Quizzes_Aggregate_Fields>;
  nodes: Array<Quizzes>;
};

/** aggregate fields of "quizzes" */
export type Quizzes_Aggregate_Fields = {
  avg?: Maybe<Quizzes_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quizzes_Max_Fields>;
  min?: Maybe<Quizzes_Min_Fields>;
  stddev?: Maybe<Quizzes_Stddev_Fields>;
  stddev_pop?: Maybe<Quizzes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quizzes_Stddev_Samp_Fields>;
  sum?: Maybe<Quizzes_Sum_Fields>;
  var_pop?: Maybe<Quizzes_Var_Pop_Fields>;
  var_samp?: Maybe<Quizzes_Var_Samp_Fields>;
  variance?: Maybe<Quizzes_Variance_Fields>;
};


/** aggregate fields of "quizzes" */
export type Quizzes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quizzes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quizzes" */
export type Quizzes_Aggregate_Order_By = {
  avg?: InputMaybe<Quizzes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quizzes_Max_Order_By>;
  min?: InputMaybe<Quizzes_Min_Order_By>;
  stddev?: InputMaybe<Quizzes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quizzes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quizzes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quizzes_Sum_Order_By>;
  var_pop?: InputMaybe<Quizzes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quizzes_Var_Samp_Order_By>;
  variance?: InputMaybe<Quizzes_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Quizzes_Append_Input = {
  explanation?: InputMaybe<Scalars['jsonb']>;
  options?: InputMaybe<Scalars['jsonb']>;
  question?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "quizzes" */
export type Quizzes_Arr_Rel_Insert_Input = {
  data: Array<Quizzes_Insert_Input>;
  on_conflict?: InputMaybe<Quizzes_On_Conflict>;
};

/** aggregate avg on columns */
export type Quizzes_Avg_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quizzes" */
export type Quizzes_Avg_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quizzes". All fields are combined with a logical 'AND'. */
export type Quizzes_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Quizzes_Bool_Exp>>>;
  _not?: InputMaybe<Quizzes_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quizzes_Bool_Exp>>>;
  approved_by?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by?: InputMaybe<String_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  difficulty_level?: InputMaybe<Int_Comparison_Exp>;
  explanation?: InputMaybe<Jsonb_Comparison_Exp>;
  external_id?: InputMaybe<String_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  lo_ids?: InputMaybe<_Text_Comparison_Exp>;
  options?: InputMaybe<Jsonb_Comparison_Exp>;
  question?: InputMaybe<Jsonb_Comparison_Exp>;
  quiz_id?: InputMaybe<String_Comparison_Exp>;
  quiz_sets?: InputMaybe<Quiz_Sets_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  tagged_los?: InputMaybe<_Text_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "quizzes" */
export enum Quizzes_Constraint {
  /** unique or primary key constraint */
  QuizsPk = 'quizs_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Quizzes_Delete_At_Path_Input = {
  explanation?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  options?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  question?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Quizzes_Delete_Elem_Input = {
  explanation?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Quizzes_Delete_Key_Input = {
  explanation?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "quizzes" */
export type Quizzes_Inc_Input = {
  difficulty_level?: InputMaybe<Scalars['Int']>;
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quizzes" */
export type Quizzes_Insert_Input = {
  approved_by?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  created_by?: InputMaybe<Scalars['String']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  difficulty_level?: InputMaybe<Scalars['Int']>;
  explanation?: InputMaybe<Scalars['jsonb']>;
  external_id?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  lo_ids?: InputMaybe<Scalars['_text']>;
  options?: InputMaybe<Scalars['jsonb']>;
  question?: InputMaybe<Scalars['jsonb']>;
  quiz_id?: InputMaybe<Scalars['String']>;
  quiz_sets?: InputMaybe<Quiz_Sets_Arr_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tagged_los?: InputMaybe<Scalars['_text']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Quizzes_Max_Fields = {
  approved_by?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  difficulty_level?: Maybe<Scalars['Int']>;
  external_id?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  quiz_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "quizzes" */
export type Quizzes_Max_Order_By = {
  approved_by?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  difficulty_level?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  quiz_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quizzes_Min_Fields = {
  approved_by?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  difficulty_level?: Maybe<Scalars['Int']>;
  external_id?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  quiz_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "quizzes" */
export type Quizzes_Min_Order_By = {
  approved_by?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  difficulty_level?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  quiz_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quizzes" */
export type Quizzes_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quizzes>;
};

/** input type for inserting object relation for remote table "quizzes" */
export type Quizzes_Obj_Rel_Insert_Input = {
  data: Quizzes_Insert_Input;
  on_conflict?: InputMaybe<Quizzes_On_Conflict>;
};

/** on conflict condition type for table "quizzes" */
export type Quizzes_On_Conflict = {
  constraint: Quizzes_Constraint;
  update_columns: Array<Quizzes_Update_Column>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};

/** ordering options when selecting data from "quizzes" */
export type Quizzes_Order_By = {
  approved_by?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  difficulty_level?: InputMaybe<Order_By>;
  explanation?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  lo_ids?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  quiz_id?: InputMaybe<Order_By>;
  quiz_sets_aggregate?: InputMaybe<Quiz_Sets_Aggregate_Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tagged_los?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quizzes" */
export type Quizzes_Pk_Columns_Input = {
  quiz_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Quizzes_Prepend_Input = {
  explanation?: InputMaybe<Scalars['jsonb']>;
  options?: InputMaybe<Scalars['jsonb']>;
  question?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "quizzes" */
export enum Quizzes_Select_Column {
  /** column name */
  ApprovedBy = 'approved_by',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DifficultyLevel = 'difficulty_level',
  /** column name */
  Explanation = 'explanation',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Kind = 'kind',
  /** column name */
  LoIds = 'lo_ids',
  /** column name */
  Options = 'options',
  /** column name */
  Question = 'question',
  /** column name */
  QuizId = 'quiz_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  TaggedLos = 'tagged_los',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "quizzes" */
export type Quizzes_Set_Input = {
  approved_by?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  created_by?: InputMaybe<Scalars['String']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  difficulty_level?: InputMaybe<Scalars['Int']>;
  explanation?: InputMaybe<Scalars['jsonb']>;
  external_id?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  lo_ids?: InputMaybe<Scalars['_text']>;
  options?: InputMaybe<Scalars['jsonb']>;
  question?: InputMaybe<Scalars['jsonb']>;
  quiz_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tagged_los?: InputMaybe<Scalars['_text']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Quizzes_Stddev_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quizzes" */
export type Quizzes_Stddev_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quizzes_Stddev_Pop_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quizzes" */
export type Quizzes_Stddev_Pop_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quizzes_Stddev_Samp_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quizzes" */
export type Quizzes_Stddev_Samp_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Quizzes_Sum_Fields = {
  difficulty_level?: Maybe<Scalars['Int']>;
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quizzes" */
export type Quizzes_Sum_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "quizzes" */
export enum Quizzes_Update_Column {
  /** column name */
  ApprovedBy = 'approved_by',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DifficultyLevel = 'difficulty_level',
  /** column name */
  Explanation = 'explanation',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Kind = 'kind',
  /** column name */
  LoIds = 'lo_ids',
  /** column name */
  Options = 'options',
  /** column name */
  Question = 'question',
  /** column name */
  QuizId = 'quiz_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  TaggedLos = 'tagged_los',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Quizzes_Var_Pop_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quizzes" */
export type Quizzes_Var_Pop_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quizzes_Var_Samp_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quizzes" */
export type Quizzes_Var_Samp_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quizzes_Variance_Fields = {
  difficulty_level?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quizzes" */
export type Quizzes_Variance_Order_By = {
  difficulty_level?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "scheduler_items" */
export type Scheduler_Items = {
  all_day?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  brand?: Maybe<Brands>;
  brand_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  center?: Maybe<Centers>;
  center_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  meta_data?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_item_id: Scalars['String'];
  /** An object relationship */
  scheduler_pattern: Scheduler_Patterns;
  scheduler_pattern_id: Scalars['String'];
  start_time: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "scheduler_items" */
export type Scheduler_ItemsMeta_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "scheduler_items" */
export type Scheduler_Items_Aggregate = {
  aggregate?: Maybe<Scheduler_Items_Aggregate_Fields>;
  nodes: Array<Scheduler_Items>;
};

/** aggregate fields of "scheduler_items" */
export type Scheduler_Items_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Scheduler_Items_Max_Fields>;
  min?: Maybe<Scheduler_Items_Min_Fields>;
};


/** aggregate fields of "scheduler_items" */
export type Scheduler_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "scheduler_items" */
export type Scheduler_Items_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Scheduler_Items_Max_Order_By>;
  min?: InputMaybe<Scheduler_Items_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scheduler_Items_Append_Input = {
  meta_data?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "scheduler_items" */
export type Scheduler_Items_Arr_Rel_Insert_Input = {
  data: Array<Scheduler_Items_Insert_Input>;
  on_conflict?: InputMaybe<Scheduler_Items_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scheduler_items". All fields are combined with a logical 'AND'. */
export type Scheduler_Items_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Scheduler_Items_Bool_Exp>>>;
  _not?: InputMaybe<Scheduler_Items_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Scheduler_Items_Bool_Exp>>>;
  all_day?: InputMaybe<Boolean_Comparison_Exp>;
  brand?: InputMaybe<Brands_Bool_Exp>;
  brand_id?: InputMaybe<String_Comparison_Exp>;
  center?: InputMaybe<Centers_Bool_Exp>;
  center_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  meta_data?: InputMaybe<Jsonb_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  scheduler_item_id?: InputMaybe<String_Comparison_Exp>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  scheduler_pattern_id?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scheduler_items" */
export enum Scheduler_Items_Constraint {
  /** unique or primary key constraint */
  SchedulerItemsPk = 'scheduler_items_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scheduler_Items_Delete_At_Path_Input = {
  meta_data?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scheduler_Items_Delete_Elem_Input = {
  meta_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scheduler_Items_Delete_Key_Input = {
  meta_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "scheduler_items" */
export type Scheduler_Items_Insert_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  brand?: InputMaybe<Brands_Obj_Rel_Insert_Input>;
  brand_id?: InputMaybe<Scalars['String']>;
  center?: InputMaybe<Centers_Obj_Rel_Insert_Input>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  meta_data?: InputMaybe<Scalars['jsonb']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_item_id?: InputMaybe<Scalars['String']>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Obj_Rel_Insert_Input>;
  scheduler_pattern_id?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Scheduler_Items_Max_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_item_id?: Maybe<Scalars['String']>;
  scheduler_pattern_id?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "scheduler_items" */
export type Scheduler_Items_Max_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_item_id?: InputMaybe<Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Scheduler_Items_Min_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_item_id?: Maybe<Scalars['String']>;
  scheduler_pattern_id?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "scheduler_items" */
export type Scheduler_Items_Min_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_item_id?: InputMaybe<Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scheduler_items" */
export type Scheduler_Items_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Scheduler_Items>;
};

/** input type for inserting object relation for remote table "scheduler_items" */
export type Scheduler_Items_Obj_Rel_Insert_Input = {
  data: Scheduler_Items_Insert_Input;
  on_conflict?: InputMaybe<Scheduler_Items_On_Conflict>;
};

/** on conflict condition type for table "scheduler_items" */
export type Scheduler_Items_On_Conflict = {
  constraint: Scheduler_Items_Constraint;
  update_columns: Array<Scheduler_Items_Update_Column>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};

/** ordering options when selecting data from "scheduler_items" */
export type Scheduler_Items_Order_By = {
  all_day?: InputMaybe<Order_By>;
  brand?: InputMaybe<Brands_Order_By>;
  brand_id?: InputMaybe<Order_By>;
  center?: InputMaybe<Centers_Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  meta_data?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_item_id?: InputMaybe<Order_By>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "scheduler_items" */
export type Scheduler_Items_Pk_Columns_Input = {
  scheduler_item_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scheduler_Items_Prepend_Input = {
  meta_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "scheduler_items" */
export enum Scheduler_Items_Select_Column {
  /** column name */
  AllDay = 'all_day',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerItemId = 'scheduler_item_id',
  /** column name */
  SchedulerPatternId = 'scheduler_pattern_id',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "scheduler_items" */
export type Scheduler_Items_Set_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  brand_id?: InputMaybe<Scalars['String']>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  meta_data?: InputMaybe<Scalars['jsonb']>;
  owner?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_item_id?: InputMaybe<Scalars['String']>;
  scheduler_pattern_id?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "scheduler_items" */
export enum Scheduler_Items_Update_Column {
  /** column name */
  AllDay = 'all_day',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Owner = 'owner',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerItemId = 'scheduler_item_id',
  /** column name */
  SchedulerPatternId = 'scheduler_pattern_id',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "scheduler_patterns" */
export type Scheduler_Patterns = {
  all_day?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  brand?: Maybe<Brands>;
  brand_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  center?: Maybe<Centers>;
  center_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  latest_released_at?: Maybe<Scalars['timestamptz']>;
  meta_data?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  repeat_option_data?: Maybe<Scalars['jsonb']>;
  resource_path?: Maybe<Scalars['String']>;
  /** An array relationship */
  scheduler_items: Array<Scheduler_Items>;
  /** An aggregated array relationship */
  scheduler_items_aggregate: Scheduler_Items_Aggregate;
  /** An object relationship */
  scheduler_pattern?: Maybe<Scheduler_Patterns>;
  scheduler_pattern_id: Scalars['String'];
  scheduler_pattern_parent_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  scheduler_patterns: Array<Scheduler_Patterns>;
  /** An aggregated array relationship */
  scheduler_patterns_aggregate: Scheduler_Patterns_Aggregate;
  scheduler_type: Scalars['String'];
  start_time: Scalars['timestamptz'];
  time_zone: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsMeta_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsRepeat_Option_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsScheduler_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsScheduler_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsScheduler_PatternsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** columns and relationships of "scheduler_patterns" */
export type Scheduler_PatternsScheduler_Patterns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};

/** aggregated selection of "scheduler_patterns" */
export type Scheduler_Patterns_Aggregate = {
  aggregate?: Maybe<Scheduler_Patterns_Aggregate_Fields>;
  nodes: Array<Scheduler_Patterns>;
};

/** aggregate fields of "scheduler_patterns" */
export type Scheduler_Patterns_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Scheduler_Patterns_Max_Fields>;
  min?: Maybe<Scheduler_Patterns_Min_Fields>;
};


/** aggregate fields of "scheduler_patterns" */
export type Scheduler_Patterns_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "scheduler_patterns" */
export type Scheduler_Patterns_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Scheduler_Patterns_Max_Order_By>;
  min?: InputMaybe<Scheduler_Patterns_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scheduler_Patterns_Append_Input = {
  meta_data?: InputMaybe<Scalars['jsonb']>;
  repeat_option_data?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "scheduler_patterns" */
export type Scheduler_Patterns_Arr_Rel_Insert_Input = {
  data: Array<Scheduler_Patterns_Insert_Input>;
  on_conflict?: InputMaybe<Scheduler_Patterns_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scheduler_patterns". All fields are combined with a logical 'AND'. */
export type Scheduler_Patterns_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Scheduler_Patterns_Bool_Exp>>>;
  _not?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Scheduler_Patterns_Bool_Exp>>>;
  all_day?: InputMaybe<Boolean_Comparison_Exp>;
  brand?: InputMaybe<Brands_Bool_Exp>;
  brand_id?: InputMaybe<String_Comparison_Exp>;
  center?: InputMaybe<Centers_Bool_Exp>;
  center_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  latest_released_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  meta_data?: InputMaybe<Jsonb_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  repeat_option_data?: InputMaybe<Jsonb_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  scheduler_items?: InputMaybe<Scheduler_Items_Bool_Exp>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  scheduler_pattern_id?: InputMaybe<String_Comparison_Exp>;
  scheduler_pattern_parent_id?: InputMaybe<String_Comparison_Exp>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
  scheduler_type?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  time_zone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scheduler_patterns" */
export enum Scheduler_Patterns_Constraint {
  /** unique or primary key constraint */
  SchedulerPatternsPk = 'scheduler_patterns_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scheduler_Patterns_Delete_At_Path_Input = {
  meta_data?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  repeat_option_data?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scheduler_Patterns_Delete_Elem_Input = {
  meta_data?: InputMaybe<Scalars['Int']>;
  repeat_option_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scheduler_Patterns_Delete_Key_Input = {
  meta_data?: InputMaybe<Scalars['String']>;
  repeat_option_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "scheduler_patterns" */
export type Scheduler_Patterns_Insert_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  brand?: InputMaybe<Brands_Obj_Rel_Insert_Input>;
  brand_id?: InputMaybe<Scalars['String']>;
  center?: InputMaybe<Centers_Obj_Rel_Insert_Input>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  latest_released_at?: InputMaybe<Scalars['timestamptz']>;
  meta_data?: InputMaybe<Scalars['jsonb']>;
  owner?: InputMaybe<Scalars['String']>;
  repeat_option_data?: InputMaybe<Scalars['jsonb']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_items?: InputMaybe<Scheduler_Items_Arr_Rel_Insert_Input>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Obj_Rel_Insert_Input>;
  scheduler_pattern_id?: InputMaybe<Scalars['String']>;
  scheduler_pattern_parent_id?: InputMaybe<Scalars['String']>;
  scheduler_patterns?: InputMaybe<Scheduler_Patterns_Arr_Rel_Insert_Input>;
  scheduler_type?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Scheduler_Patterns_Max_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  latest_released_at?: Maybe<Scalars['timestamptz']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_pattern_id?: Maybe<Scalars['String']>;
  scheduler_pattern_parent_id?: Maybe<Scalars['String']>;
  scheduler_type?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "scheduler_patterns" */
export type Scheduler_Patterns_Max_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  latest_released_at?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  scheduler_pattern_parent_id?: InputMaybe<Order_By>;
  scheduler_type?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Scheduler_Patterns_Min_Fields = {
  brand_id?: Maybe<Scalars['String']>;
  center_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  latest_released_at?: Maybe<Scalars['timestamptz']>;
  owner?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  scheduler_pattern_id?: Maybe<Scalars['String']>;
  scheduler_pattern_parent_id?: Maybe<Scalars['String']>;
  scheduler_type?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  time_zone?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "scheduler_patterns" */
export type Scheduler_Patterns_Min_Order_By = {
  brand_id?: InputMaybe<Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  latest_released_at?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  scheduler_pattern_parent_id?: InputMaybe<Order_By>;
  scheduler_type?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scheduler_patterns" */
export type Scheduler_Patterns_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Scheduler_Patterns>;
};

/** input type for inserting object relation for remote table "scheduler_patterns" */
export type Scheduler_Patterns_Obj_Rel_Insert_Input = {
  data: Scheduler_Patterns_Insert_Input;
  on_conflict?: InputMaybe<Scheduler_Patterns_On_Conflict>;
};

/** on conflict condition type for table "scheduler_patterns" */
export type Scheduler_Patterns_On_Conflict = {
  constraint: Scheduler_Patterns_Constraint;
  update_columns: Array<Scheduler_Patterns_Update_Column>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};

/** ordering options when selecting data from "scheduler_patterns" */
export type Scheduler_Patterns_Order_By = {
  all_day?: InputMaybe<Order_By>;
  brand?: InputMaybe<Brands_Order_By>;
  brand_id?: InputMaybe<Order_By>;
  center?: InputMaybe<Centers_Order_By>;
  center_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  latest_released_at?: InputMaybe<Order_By>;
  meta_data?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  repeat_option_data?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  scheduler_items_aggregate?: InputMaybe<Scheduler_Items_Aggregate_Order_By>;
  scheduler_pattern?: InputMaybe<Scheduler_Patterns_Order_By>;
  scheduler_pattern_id?: InputMaybe<Order_By>;
  scheduler_pattern_parent_id?: InputMaybe<Order_By>;
  scheduler_patterns_aggregate?: InputMaybe<Scheduler_Patterns_Aggregate_Order_By>;
  scheduler_type?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  time_zone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "scheduler_patterns" */
export type Scheduler_Patterns_Pk_Columns_Input = {
  scheduler_pattern_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scheduler_Patterns_Prepend_Input = {
  meta_data?: InputMaybe<Scalars['jsonb']>;
  repeat_option_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "scheduler_patterns" */
export enum Scheduler_Patterns_Select_Column {
  /** column name */
  AllDay = 'all_day',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  LatestReleasedAt = 'latest_released_at',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Owner = 'owner',
  /** column name */
  RepeatOptionData = 'repeat_option_data',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerPatternId = 'scheduler_pattern_id',
  /** column name */
  SchedulerPatternParentId = 'scheduler_pattern_parent_id',
  /** column name */
  SchedulerType = 'scheduler_type',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "scheduler_patterns" */
export type Scheduler_Patterns_Set_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  brand_id?: InputMaybe<Scalars['String']>;
  center_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  latest_released_at?: InputMaybe<Scalars['timestamptz']>;
  meta_data?: InputMaybe<Scalars['jsonb']>;
  owner?: InputMaybe<Scalars['String']>;
  repeat_option_data?: InputMaybe<Scalars['jsonb']>;
  resource_path?: InputMaybe<Scalars['String']>;
  scheduler_pattern_id?: InputMaybe<Scalars['String']>;
  scheduler_pattern_parent_id?: InputMaybe<Scalars['String']>;
  scheduler_type?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  time_zone?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "scheduler_patterns" */
export enum Scheduler_Patterns_Update_Column {
  /** column name */
  AllDay = 'all_day',
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CenterId = 'center_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  LatestReleasedAt = 'latest_released_at',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Owner = 'owner',
  /** column name */
  RepeatOptionData = 'repeat_option_data',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchedulerPatternId = 'scheduler_pattern_id',
  /** column name */
  SchedulerPatternParentId = 'scheduler_pattern_parent_id',
  /** column name */
  SchedulerType = 'scheduler_type',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TimeZone = 'time_zone',
  /** column name */
  UpdatedAt = 'updated_at'
}

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

/** columns and relationships of "student_study_plans" */
export type Student_Study_Plans = {
  /** An array relationship */
  course_students: Array<Course_Students>;
  /** An aggregated array relationship */
  course_students_aggregate: Course_Students_Aggregate;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  /** An object relationship */
  study_plan: Study_Plans;
  study_plan_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "student_study_plans" */
export type Student_Study_PlansCourse_StudentsArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** columns and relationships of "student_study_plans" */
export type Student_Study_PlansCourse_Students_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};

/** aggregated selection of "student_study_plans" */
export type Student_Study_Plans_Aggregate = {
  aggregate?: Maybe<Student_Study_Plans_Aggregate_Fields>;
  nodes: Array<Student_Study_Plans>;
};

/** aggregate fields of "student_study_plans" */
export type Student_Study_Plans_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Study_Plans_Max_Fields>;
  min?: Maybe<Student_Study_Plans_Min_Fields>;
};


/** aggregate fields of "student_study_plans" */
export type Student_Study_Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_study_plans" */
export type Student_Study_Plans_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Study_Plans_Max_Order_By>;
  min?: InputMaybe<Student_Study_Plans_Min_Order_By>;
};

/** input type for inserting array relation for remote table "student_study_plans" */
export type Student_Study_Plans_Arr_Rel_Insert_Input = {
  data: Array<Student_Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Student_Study_Plans_On_Conflict>;
};

/** Boolean expression to filter rows from the table "student_study_plans". All fields are combined with a logical 'AND'. */
export type Student_Study_Plans_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Study_Plans_Bool_Exp>>>;
  _not?: InputMaybe<Student_Study_Plans_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Study_Plans_Bool_Exp>>>;
  course_students?: InputMaybe<Course_Students_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  master_study_plan_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  study_plan?: InputMaybe<Study_Plans_Bool_Exp>;
  study_plan_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_study_plans" */
export enum Student_Study_Plans_Constraint {
  /** unique or primary key constraint */
  StudentMasterStudyPlan = 'student_master_study_plan',
  /** unique or primary key constraint */
  StudentStudyPlansPk = 'student_study_plans_pk'
}

/** input type for inserting data into table "student_study_plans" */
export type Student_Study_Plans_Insert_Input = {
  course_students?: InputMaybe<Course_Students_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  master_study_plan_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  study_plan?: InputMaybe<Study_Plans_Obj_Rel_Insert_Input>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Student_Study_Plans_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "student_study_plans" */
export type Student_Study_Plans_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Study_Plans_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "student_study_plans" */
export type Student_Study_Plans_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_study_plans" */
export type Student_Study_Plans_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Study_Plans>;
};

/** input type for inserting object relation for remote table "student_study_plans" */
export type Student_Study_Plans_Obj_Rel_Insert_Input = {
  data: Student_Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Student_Study_Plans_On_Conflict>;
};

/** on conflict condition type for table "student_study_plans" */
export type Student_Study_Plans_On_Conflict = {
  constraint: Student_Study_Plans_Constraint;
  update_columns: Array<Student_Study_Plans_Update_Column>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};

/** ordering options when selecting data from "student_study_plans" */
export type Student_Study_Plans_Order_By = {
  course_students_aggregate?: InputMaybe<Course_Students_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  study_plan?: InputMaybe<Study_Plans_Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_study_plans" */
export type Student_Study_Plans_Pk_Columns_Input = {
  student_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};

/** select columns of table "student_study_plans" */
export enum Student_Study_Plans_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  MasterStudyPlanId = 'master_study_plan_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "student_study_plans" */
export type Student_Study_Plans_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  master_study_plan_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "student_study_plans" */
export enum Student_Study_Plans_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  MasterStudyPlanId = 'master_study_plan_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "study_plan_items" */
export type Study_Plan_Items = {
  /** An object relationship */
  assignment_study_plan_item?: Maybe<Assignment_Study_Plan_Items>;
  /** An array relationship */
  assignment_study_plan_items: Array<Assignment_Study_Plan_Items>;
  /** An aggregated array relationship */
  assignment_study_plan_items_aggregate: Assignment_Study_Plan_Items_Aggregate;
  available_from?: Maybe<Scalars['timestamptz']>;
  available_to?: Maybe<Scalars['timestamptz']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  content_structure?: Maybe<Scalars['jsonb']>;
  content_structure_flatten?: Maybe<Scalars['String']>;
  copy_study_plan_item_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order: Scalars['Int'];
  end_date?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  lo_study_plan_item?: Maybe<Lo_Study_Plan_Items>;
  /** An array relationship */
  lo_study_plan_items: Array<Lo_Study_Plan_Items>;
  /** An aggregated array relationship */
  lo_study_plan_items_aggregate: Lo_Study_Plan_Items_Aggregate;
  resource_path: Scalars['String'];
  school_date?: Maybe<Scalars['timestamptz']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  /** An object relationship */
  study_plan?: Maybe<Study_Plans>;
  study_plan_id?: Maybe<Scalars['String']>;
  study_plan_item_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "study_plan_items" */
export type Study_Plan_ItemsAssignment_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "study_plan_items" */
export type Study_Plan_ItemsAssignment_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "study_plan_items" */
export type Study_Plan_ItemsContent_StructureArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "study_plan_items" */
export type Study_Plan_ItemsLo_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "study_plan_items" */
export type Study_Plan_ItemsLo_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};

/** aggregated selection of "study_plan_items" */
export type Study_Plan_Items_Aggregate = {
  aggregate?: Maybe<Study_Plan_Items_Aggregate_Fields>;
  nodes: Array<Study_Plan_Items>;
};

/** aggregate fields of "study_plan_items" */
export type Study_Plan_Items_Aggregate_Fields = {
  avg?: Maybe<Study_Plan_Items_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Study_Plan_Items_Max_Fields>;
  min?: Maybe<Study_Plan_Items_Min_Fields>;
  stddev?: Maybe<Study_Plan_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Study_Plan_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Study_Plan_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Study_Plan_Items_Sum_Fields>;
  var_pop?: Maybe<Study_Plan_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Study_Plan_Items_Var_Samp_Fields>;
  variance?: Maybe<Study_Plan_Items_Variance_Fields>;
};


/** aggregate fields of "study_plan_items" */
export type Study_Plan_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "study_plan_items" */
export type Study_Plan_Items_Aggregate_Order_By = {
  avg?: InputMaybe<Study_Plan_Items_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Study_Plan_Items_Max_Order_By>;
  min?: InputMaybe<Study_Plan_Items_Min_Order_By>;
  stddev?: InputMaybe<Study_Plan_Items_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Study_Plan_Items_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Study_Plan_Items_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Study_Plan_Items_Sum_Order_By>;
  var_pop?: InputMaybe<Study_Plan_Items_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Study_Plan_Items_Var_Samp_Order_By>;
  variance?: InputMaybe<Study_Plan_Items_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Study_Plan_Items_Append_Input = {
  content_structure?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "study_plan_items" */
export type Study_Plan_Items_Arr_Rel_Insert_Input = {
  data: Array<Study_Plan_Items_Insert_Input>;
  on_conflict?: InputMaybe<Study_Plan_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Study_Plan_Items_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "study_plan_items" */
export type Study_Plan_Items_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "study_plan_items". All fields are combined with a logical 'AND'. */
export type Study_Plan_Items_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Study_Plan_Items_Bool_Exp>>>;
  _not?: InputMaybe<Study_Plan_Items_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Study_Plan_Items_Bool_Exp>>>;
  assignment_study_plan_item?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
  assignment_study_plan_items?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
  available_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  available_to?: InputMaybe<Timestamptz_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  content_structure?: InputMaybe<Jsonb_Comparison_Exp>;
  content_structure_flatten?: InputMaybe<String_Comparison_Exp>;
  copy_study_plan_item_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Int_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  lo_study_plan_item?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
  lo_study_plan_items?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  study_plan?: InputMaybe<Study_Plans_Bool_Exp>;
  study_plan_id?: InputMaybe<String_Comparison_Exp>;
  study_plan_item_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "study_plan_items" */
export enum Study_Plan_Items_Constraint {
  /** unique or primary key constraint */
  StudyPlanContentStructureIdx = 'study_plan_content_structure_idx',
  /** unique or primary key constraint */
  StudyPlanItemsPk = 'study_plan_items_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Study_Plan_Items_Delete_At_Path_Input = {
  content_structure?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Study_Plan_Items_Delete_Elem_Input = {
  content_structure?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Study_Plan_Items_Delete_Key_Input = {
  content_structure?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "study_plan_items" */
export type Study_Plan_Items_Inc_Input = {
  display_order?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "study_plan_items" */
export type Study_Plan_Items_Insert_Input = {
  assignment_study_plan_item?: InputMaybe<Assignment_Study_Plan_Items_Obj_Rel_Insert_Input>;
  assignment_study_plan_items?: InputMaybe<Assignment_Study_Plan_Items_Arr_Rel_Insert_Input>;
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_to?: InputMaybe<Scalars['timestamptz']>;
  completed_at?: InputMaybe<Scalars['timestamptz']>;
  content_structure?: InputMaybe<Scalars['jsonb']>;
  content_structure_flatten?: InputMaybe<Scalars['String']>;
  copy_study_plan_item_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['Int']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  lo_study_plan_item?: InputMaybe<Lo_Study_Plan_Items_Obj_Rel_Insert_Input>;
  lo_study_plan_items?: InputMaybe<Lo_Study_Plan_Items_Arr_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_date?: InputMaybe<Scalars['timestamptz']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  status?: InputMaybe<Scalars['String']>;
  study_plan?: InputMaybe<Study_Plans_Obj_Rel_Insert_Input>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Study_Plan_Items_Max_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_to?: Maybe<Scalars['timestamptz']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  content_structure_flatten?: Maybe<Scalars['String']>;
  copy_study_plan_item_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  school_date?: Maybe<Scalars['timestamptz']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "study_plan_items" */
export type Study_Plan_Items_Max_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_to?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  content_structure_flatten?: InputMaybe<Order_By>;
  copy_study_plan_item_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_date?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Study_Plan_Items_Min_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_to?: Maybe<Scalars['timestamptz']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  content_structure_flatten?: Maybe<Scalars['String']>;
  copy_study_plan_item_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  school_date?: Maybe<Scalars['timestamptz']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  study_plan_item_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "study_plan_items" */
export type Study_Plan_Items_Min_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_to?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  content_structure_flatten?: InputMaybe<Order_By>;
  copy_study_plan_item_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_date?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "study_plan_items" */
export type Study_Plan_Items_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Study_Plan_Items>;
};

/** input type for inserting object relation for remote table "study_plan_items" */
export type Study_Plan_Items_Obj_Rel_Insert_Input = {
  data: Study_Plan_Items_Insert_Input;
  on_conflict?: InputMaybe<Study_Plan_Items_On_Conflict>;
};

/** on conflict condition type for table "study_plan_items" */
export type Study_Plan_Items_On_Conflict = {
  constraint: Study_Plan_Items_Constraint;
  update_columns: Array<Study_Plan_Items_Update_Column>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};

/** ordering options when selecting data from "study_plan_items" */
export type Study_Plan_Items_Order_By = {
  assignment_study_plan_item?: InputMaybe<Assignment_Study_Plan_Items_Order_By>;
  assignment_study_plan_items_aggregate?: InputMaybe<Assignment_Study_Plan_Items_Aggregate_Order_By>;
  available_from?: InputMaybe<Order_By>;
  available_to?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  content_structure?: InputMaybe<Order_By>;
  content_structure_flatten?: InputMaybe<Order_By>;
  copy_study_plan_item_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  lo_study_plan_item?: InputMaybe<Lo_Study_Plan_Items_Order_By>;
  lo_study_plan_items_aggregate?: InputMaybe<Lo_Study_Plan_Items_Aggregate_Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_date?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan?: InputMaybe<Study_Plans_Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_item_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "study_plan_items" */
export type Study_Plan_Items_Pk_Columns_Input = {
  study_plan_item_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Study_Plan_Items_Prepend_Input = {
  content_structure?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "study_plan_items" */
export enum Study_Plan_Items_Select_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableTo = 'available_to',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  ContentStructure = 'content_structure',
  /** column name */
  ContentStructureFlatten = 'content_structure_flatten',
  /** column name */
  CopyStudyPlanItemId = 'copy_study_plan_item_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolDate = 'school_date',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "study_plan_items" */
export type Study_Plan_Items_Set_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_to?: InputMaybe<Scalars['timestamptz']>;
  completed_at?: InputMaybe<Scalars['timestamptz']>;
  content_structure?: InputMaybe<Scalars['jsonb']>;
  content_structure_flatten?: InputMaybe<Scalars['String']>;
  copy_study_plan_item_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['Int']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_date?: InputMaybe<Scalars['timestamptz']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  status?: InputMaybe<Scalars['String']>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  study_plan_item_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Study_Plan_Items_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "study_plan_items" */
export type Study_Plan_Items_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Study_Plan_Items_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "study_plan_items" */
export type Study_Plan_Items_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Study_Plan_Items_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "study_plan_items" */
export type Study_Plan_Items_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Study_Plan_Items_Sum_Fields = {
  display_order?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "study_plan_items" */
export type Study_Plan_Items_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** update columns of table "study_plan_items" */
export enum Study_Plan_Items_Update_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableTo = 'available_to',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  ContentStructure = 'content_structure',
  /** column name */
  ContentStructureFlatten = 'content_structure_flatten',
  /** column name */
  CopyStudyPlanItemId = 'copy_study_plan_item_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolDate = 'school_date',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  StudyPlanItemId = 'study_plan_item_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Study_Plan_Items_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "study_plan_items" */
export type Study_Plan_Items_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Study_Plan_Items_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "study_plan_items" */
export type Study_Plan_Items_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Study_Plan_Items_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "study_plan_items" */
export type Study_Plan_Items_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** columns and relationships of "study_plans" */
export type Study_Plans = {
  book_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  course_study_plans: Array<Course_Study_Plans>;
  /** An aggregated array relationship */
  course_study_plans_aggregate: Course_Study_Plans_Aggregate;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grades?: Maybe<Scalars['_int4']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  /** An array relationship */
  student_study_plans: Array<Student_Study_Plans>;
  /** An aggregated array relationship */
  student_study_plans_aggregate: Student_Study_Plans_Aggregate;
  /** An object relationship */
  study_plan?: Maybe<Study_Plans>;
  study_plan_id: Scalars['String'];
  /** An array relationship */
  study_plan_items: Array<Study_Plan_Items>;
  /** An aggregated array relationship */
  study_plan_items_aggregate: Study_Plan_Items_Aggregate;
  study_plan_type?: Maybe<Scalars['String']>;
  /** An array relationship */
  study_plans: Array<Study_Plans>;
  /** An aggregated array relationship */
  study_plans_aggregate: Study_Plans_Aggregate;
  track_school_progress?: Maybe<Scalars['Boolean']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "study_plans" */
export type Study_PlansCourse_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansCourse_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudent_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudent_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudy_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudy_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudy_PlansArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** columns and relationships of "study_plans" */
export type Study_PlansStudy_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};

/** aggregated selection of "study_plans" */
export type Study_Plans_Aggregate = {
  aggregate?: Maybe<Study_Plans_Aggregate_Fields>;
  nodes: Array<Study_Plans>;
};

/** aggregate fields of "study_plans" */
export type Study_Plans_Aggregate_Fields = {
  avg?: Maybe<Study_Plans_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Study_Plans_Max_Fields>;
  min?: Maybe<Study_Plans_Min_Fields>;
  stddev?: Maybe<Study_Plans_Stddev_Fields>;
  stddev_pop?: Maybe<Study_Plans_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Study_Plans_Stddev_Samp_Fields>;
  sum?: Maybe<Study_Plans_Sum_Fields>;
  var_pop?: Maybe<Study_Plans_Var_Pop_Fields>;
  var_samp?: Maybe<Study_Plans_Var_Samp_Fields>;
  variance?: Maybe<Study_Plans_Variance_Fields>;
};


/** aggregate fields of "study_plans" */
export type Study_Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Study_Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "study_plans" */
export type Study_Plans_Aggregate_Order_By = {
  avg?: InputMaybe<Study_Plans_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Study_Plans_Max_Order_By>;
  min?: InputMaybe<Study_Plans_Min_Order_By>;
  stddev?: InputMaybe<Study_Plans_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Study_Plans_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Study_Plans_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Study_Plans_Sum_Order_By>;
  var_pop?: InputMaybe<Study_Plans_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Study_Plans_Var_Samp_Order_By>;
  variance?: InputMaybe<Study_Plans_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "study_plans" */
export type Study_Plans_Arr_Rel_Insert_Input = {
  data: Array<Study_Plans_Insert_Input>;
  on_conflict?: InputMaybe<Study_Plans_On_Conflict>;
};

/** aggregate avg on columns */
export type Study_Plans_Avg_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "study_plans" */
export type Study_Plans_Avg_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "study_plans". All fields are combined with a logical 'AND'. */
export type Study_Plans_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Study_Plans_Bool_Exp>>>;
  _not?: InputMaybe<Study_Plans_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Study_Plans_Bool_Exp>>>;
  book_id?: InputMaybe<String_Comparison_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  course_study_plans?: InputMaybe<Course_Study_Plans_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  grades?: InputMaybe<_Int4_Comparison_Exp>;
  master_study_plan_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student_study_plans?: InputMaybe<Student_Study_Plans_Bool_Exp>;
  study_plan?: InputMaybe<Study_Plans_Bool_Exp>;
  study_plan_id?: InputMaybe<String_Comparison_Exp>;
  study_plan_items?: InputMaybe<Study_Plan_Items_Bool_Exp>;
  study_plan_type?: InputMaybe<String_Comparison_Exp>;
  study_plans?: InputMaybe<Study_Plans_Bool_Exp>;
  track_school_progress?: InputMaybe<Boolean_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "study_plans" */
export enum Study_Plans_Constraint {
  /** unique or primary key constraint */
  StudyPlansPk = 'study_plans_pk'
}

/** input type for incrementing integer column in table "study_plans" */
export type Study_Plans_Inc_Input = {
  school_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "study_plans" */
export type Study_Plans_Insert_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  course_id?: InputMaybe<Scalars['String']>;
  course_study_plans?: InputMaybe<Course_Study_Plans_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grades?: InputMaybe<Scalars['_int4']>;
  master_study_plan_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  student_study_plans?: InputMaybe<Student_Study_Plans_Arr_Rel_Insert_Input>;
  study_plan?: InputMaybe<Study_Plans_Obj_Rel_Insert_Input>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  study_plan_items?: InputMaybe<Study_Plan_Items_Arr_Rel_Insert_Input>;
  study_plan_type?: InputMaybe<Scalars['String']>;
  study_plans?: InputMaybe<Study_Plans_Arr_Rel_Insert_Input>;
  track_school_progress?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Study_Plans_Max_Fields = {
  book_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  study_plan_type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "study_plans" */
export type Study_Plans_Max_Order_By = {
  book_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Study_Plans_Min_Fields = {
  book_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  master_study_plan_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  study_plan_id?: Maybe<Scalars['String']>;
  study_plan_type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "study_plans" */
export type Study_Plans_Min_Order_By = {
  book_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "study_plans" */
export type Study_Plans_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Study_Plans>;
};

/** input type for inserting object relation for remote table "study_plans" */
export type Study_Plans_Obj_Rel_Insert_Input = {
  data: Study_Plans_Insert_Input;
  on_conflict?: InputMaybe<Study_Plans_On_Conflict>;
};

/** on conflict condition type for table "study_plans" */
export type Study_Plans_On_Conflict = {
  constraint: Study_Plans_Constraint;
  update_columns: Array<Study_Plans_Update_Column>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};

/** ordering options when selecting data from "study_plans" */
export type Study_Plans_Order_By = {
  book_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  course_study_plans_aggregate?: InputMaybe<Course_Study_Plans_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grades?: InputMaybe<Order_By>;
  master_study_plan_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_study_plans_aggregate?: InputMaybe<Student_Study_Plans_Aggregate_Order_By>;
  study_plan?: InputMaybe<Study_Plans_Order_By>;
  study_plan_id?: InputMaybe<Order_By>;
  study_plan_items_aggregate?: InputMaybe<Study_Plan_Items_Aggregate_Order_By>;
  study_plan_type?: InputMaybe<Order_By>;
  study_plans_aggregate?: InputMaybe<Study_Plans_Aggregate_Order_By>;
  track_school_progress?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "study_plans" */
export type Study_Plans_Pk_Columns_Input = {
  study_plan_id: Scalars['String'];
};

/** select columns of table "study_plans" */
export enum Study_Plans_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grades = 'grades',
  /** column name */
  MasterStudyPlanId = 'master_study_plan_id',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  StudyPlanType = 'study_plan_type',
  /** column name */
  TrackSchoolProgress = 'track_school_progress',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "study_plans" */
export type Study_Plans_Set_Input = {
  book_id?: InputMaybe<Scalars['String']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grades?: InputMaybe<Scalars['_int4']>;
  master_study_plan_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  study_plan_id?: InputMaybe<Scalars['String']>;
  study_plan_type?: InputMaybe<Scalars['String']>;
  track_school_progress?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Study_Plans_Stddev_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "study_plans" */
export type Study_Plans_Stddev_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Study_Plans_Stddev_Pop_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "study_plans" */
export type Study_Plans_Stddev_Pop_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Study_Plans_Stddev_Samp_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "study_plans" */
export type Study_Plans_Stddev_Samp_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Study_Plans_Sum_Fields = {
  school_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "study_plans" */
export type Study_Plans_Sum_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** update columns of table "study_plans" */
export enum Study_Plans_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grades = 'grades',
  /** column name */
  MasterStudyPlanId = 'master_study_plan_id',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  StudyPlanId = 'study_plan_id',
  /** column name */
  StudyPlanType = 'study_plan_type',
  /** column name */
  TrackSchoolProgress = 'track_school_progress',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Study_Plans_Var_Pop_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "study_plans" */
export type Study_Plans_Var_Pop_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Study_Plans_Var_Samp_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "study_plans" */
export type Study_Plans_Var_Samp_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Study_Plans_Variance_Fields = {
  school_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "study_plans" */
export type Study_Plans_Variance_Order_By = {
  school_id?: InputMaybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "assign_study_plan_tasks" */
  assign_study_plan_tasks: Array<Assign_Study_Plan_Tasks>;
  /** fetch aggregated fields from the table: "assign_study_plan_tasks" */
  assign_study_plan_tasks_aggregate: Assign_Study_Plan_Tasks_Aggregate;
  /** fetch data from the table: "assign_study_plan_tasks" using primary key columns */
  assign_study_plan_tasks_by_pk?: Maybe<Assign_Study_Plan_Tasks>;
  /** fetch data from the table: "assignment_study_plan_items" */
  assignment_study_plan_items: Array<Assignment_Study_Plan_Items>;
  /** fetch aggregated fields from the table: "assignment_study_plan_items" */
  assignment_study_plan_items_aggregate: Assignment_Study_Plan_Items_Aggregate;
  /** fetch data from the table: "assignment_study_plan_items" using primary key columns */
  assignment_study_plan_items_by_pk?: Maybe<Assignment_Study_Plan_Items>;
  /** fetch data from the table: "assignments" */
  assignments: Array<Assignments>;
  /** fetch aggregated fields from the table: "assignments" */
  assignments_aggregate: Assignments_Aggregate;
  /** fetch data from the table: "assignments" using primary key columns */
  assignments_by_pk?: Maybe<Assignments>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "books" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "books_chapters" */
  books_chapters: Array<Books_Chapters>;
  /** fetch aggregated fields from the table: "books_chapters" */
  books_chapters_aggregate: Books_Chapters_Aggregate;
  /** fetch data from the table: "books_chapters" using primary key columns */
  books_chapters_by_pk?: Maybe<Books_Chapters>;
  /** fetch data from the table: "brands" */
  brands: Array<Brands>;
  /** fetch aggregated fields from the table: "brands" */
  brands_aggregate: Brands_Aggregate;
  /** fetch data from the table: "brands" using primary key columns */
  brands_by_pk?: Maybe<Brands>;
  /** fetch data from the table: "centers" */
  centers: Array<Centers>;
  /** fetch aggregated fields from the table: "centers" */
  centers_aggregate: Centers_Aggregate;
  /** fetch data from the table: "centers" using primary key columns */
  centers_by_pk?: Maybe<Centers>;
  /** fetch data from the table: "chapters" */
  chapters: Array<Chapters>;
  /** fetch aggregated fields from the table: "chapters" */
  chapters_aggregate: Chapters_Aggregate;
  /** fetch data from the table: "chapters" using primary key columns */
  chapters_by_pk?: Maybe<Chapters>;
  /** fetch data from the table: "course_students" */
  course_students: Array<Course_Students>;
  /** fetch aggregated fields from the table: "course_students" */
  course_students_aggregate: Course_Students_Aggregate;
  /** fetch data from the table: "course_students" using primary key columns */
  course_students_by_pk?: Maybe<Course_Students>;
  /** fetch data from the table: "course_study_plans" */
  course_study_plans: Array<Course_Study_Plans>;
  /** fetch aggregated fields from the table: "course_study_plans" */
  course_study_plans_aggregate: Course_Study_Plans_Aggregate;
  /** fetch data from the table: "course_study_plans" using primary key columns */
  course_study_plans_by_pk?: Maybe<Course_Study_Plans>;
  /** fetch data from the table: "courses_books" */
  courses_books: Array<Courses_Books>;
  /** fetch aggregated fields from the table: "courses_books" */
  courses_books_aggregate: Courses_Books_Aggregate;
  /** fetch data from the table: "courses_books" using primary key columns */
  courses_books_by_pk?: Maybe<Courses_Books>;
  /** execute function "find_assignment_by_topic_id" which returns "assignments" */
  find_assignment_by_topic_id: Array<Assignments>;
  /** execute function "find_assignment_by_topic_id" and query aggregates on result of table type "assignments" */
  find_assignment_by_topic_id_aggregate: Assignments_Aggregate;
  /** execute function "find_quiz_by_lo_id" which returns "quizzes" */
  find_quiz_by_lo_id: Array<Quizzes>;
  /** execute function "find_quiz_by_lo_id" and query aggregates on result of table type "quizzes" */
  find_quiz_by_lo_id_aggregate: Quizzes_Aggregate;
  /** execute function "get_list_course_student_study_plans_by_filter" which returns "course_students" */
  get_list_course_student_study_plans_by_filter: Array<Course_Students>;
  /** execute function "get_list_course_student_study_plans_by_filter" and query aggregates on result of table type "course_students" */
  get_list_course_student_study_plans_by_filter_aggregate: Course_Students_Aggregate;
  /** execute function "get_list_course_study_plan_by_filter" which returns "course_study_plans" */
  get_list_course_study_plan_by_filter: Array<Course_Study_Plans>;
  /** execute function "get_list_course_study_plan_by_filter" and query aggregates on result of table type "course_study_plans" */
  get_list_course_study_plan_by_filter_aggregate: Course_Study_Plans_Aggregate;
  /** execute function "get_student_study_plans_by_filter" which returns "study_plans" */
  get_student_study_plans_by_filter: Array<Study_Plans>;
  /** execute function "get_student_study_plans_by_filter" and query aggregates on result of table type "study_plans" */
  get_student_study_plans_by_filter_aggregate: Study_Plans_Aggregate;
  /** fetch data from the table: "learning_objectives" */
  learning_objectives: Array<Learning_Objectives>;
  /** fetch aggregated fields from the table: "learning_objectives" */
  learning_objectives_aggregate: Learning_Objectives_Aggregate;
  /** fetch data from the table: "learning_objectives" using primary key columns */
  learning_objectives_by_pk?: Maybe<Learning_Objectives>;
  /** fetch data from the table: "lo_study_plan_items" */
  lo_study_plan_items: Array<Lo_Study_Plan_Items>;
  /** fetch aggregated fields from the table: "lo_study_plan_items" */
  lo_study_plan_items_aggregate: Lo_Study_Plan_Items_Aggregate;
  /** fetch data from the table: "lo_study_plan_items" using primary key columns */
  lo_study_plan_items_by_pk?: Maybe<Lo_Study_Plan_Items>;
  /** fetch data from the table: "quiz_sets" */
  quiz_sets: Array<Quiz_Sets>;
  /** fetch aggregated fields from the table: "quiz_sets" */
  quiz_sets_aggregate: Quiz_Sets_Aggregate;
  /** fetch data from the table: "quiz_sets" using primary key columns */
  quiz_sets_by_pk?: Maybe<Quiz_Sets>;
  /** fetch data from the table: "quizzes" */
  quizzes: Array<Quizzes>;
  /** fetch aggregated fields from the table: "quizzes" */
  quizzes_aggregate: Quizzes_Aggregate;
  /** fetch data from the table: "quizzes" using primary key columns */
  quizzes_by_pk?: Maybe<Quizzes>;
  /** fetch data from the table: "scheduler_items" */
  scheduler_items: Array<Scheduler_Items>;
  /** fetch aggregated fields from the table: "scheduler_items" */
  scheduler_items_aggregate: Scheduler_Items_Aggregate;
  /** fetch data from the table: "scheduler_items" using primary key columns */
  scheduler_items_by_pk?: Maybe<Scheduler_Items>;
  /** fetch data from the table: "scheduler_patterns" */
  scheduler_patterns: Array<Scheduler_Patterns>;
  /** fetch aggregated fields from the table: "scheduler_patterns" */
  scheduler_patterns_aggregate: Scheduler_Patterns_Aggregate;
  /** fetch data from the table: "scheduler_patterns" using primary key columns */
  scheduler_patterns_by_pk?: Maybe<Scheduler_Patterns>;
  /** fetch data from the table: "student_study_plans" */
  student_study_plans: Array<Student_Study_Plans>;
  /** fetch aggregated fields from the table: "student_study_plans" */
  student_study_plans_aggregate: Student_Study_Plans_Aggregate;
  /** fetch data from the table: "student_study_plans" using primary key columns */
  student_study_plans_by_pk?: Maybe<Student_Study_Plans>;
  /** fetch data from the table: "study_plan_items" */
  study_plan_items: Array<Study_Plan_Items>;
  /** fetch aggregated fields from the table: "study_plan_items" */
  study_plan_items_aggregate: Study_Plan_Items_Aggregate;
  /** fetch data from the table: "study_plan_items" using primary key columns */
  study_plan_items_by_pk?: Maybe<Study_Plan_Items>;
  /** fetch data from the table: "study_plans" */
  study_plans: Array<Study_Plans>;
  /** fetch aggregated fields from the table: "study_plans" */
  study_plans_aggregate: Study_Plans_Aggregate;
  /** fetch data from the table: "study_plans" using primary key columns */
  study_plans_by_pk?: Maybe<Study_Plans>;
  /** fetch data from the table: "topics" */
  topics: Array<Topics>;
  /** fetch aggregated fields from the table: "topics" */
  topics_aggregate: Topics_Aggregate;
  /** fetch data from the table: "topics_assignments" */
  topics_assignments: Array<Topics_Assignments>;
  /** fetch aggregated fields from the table: "topics_assignments" */
  topics_assignments_aggregate: Topics_Assignments_Aggregate;
  /** fetch data from the table: "topics_assignments" using primary key columns */
  topics_assignments_by_pk?: Maybe<Topics_Assignments>;
  /** fetch data from the table: "topics" using primary key columns */
  topics_by_pk?: Maybe<Topics>;
  /** fetch data from the table: "topics_learning_objectives" */
  topics_learning_objectives: Array<Topics_Learning_Objectives>;
  /** fetch aggregated fields from the table: "topics_learning_objectives" */
  topics_learning_objectives_aggregate: Topics_Learning_Objectives_Aggregate;
  /** fetch data from the table: "topics_learning_objectives" using primary key columns */
  topics_learning_objectives_by_pk?: Maybe<Topics_Learning_Objectives>;
};


/** subscription root */
export type Subscription_RootAssign_Study_Plan_TasksArgs = {
  distinct_on?: InputMaybe<Array<Assign_Study_Plan_Tasks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assign_Study_Plan_Tasks_Order_By>>;
  where?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssign_Study_Plan_Tasks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assign_Study_Plan_Tasks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assign_Study_Plan_Tasks_Order_By>>;
  where?: InputMaybe<Assign_Study_Plan_Tasks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssign_Study_Plan_Tasks_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootAssignment_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssignment_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignment_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignment_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Assignment_Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssignment_Study_Plan_Items_By_PkArgs = {
  assignment_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootAssignmentsArgs = {
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAssignments_By_PkArgs = {
  assignment_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBooks_By_PkArgs = {
  book_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBooks_ChaptersArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBooks_Chapters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Chapters_Order_By>>;
  where?: InputMaybe<Books_Chapters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBooks_Chapters_By_PkArgs = {
  book_id: Scalars['String'];
  chapter_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBrandsArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBrands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBrands_By_PkArgs = {
  brand_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootCentersArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCenters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Centers_Order_By>>;
  where?: InputMaybe<Centers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCenters_By_PkArgs = {
  center_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootChaptersArgs = {
  distinct_on?: InputMaybe<Array<Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapters_Order_By>>;
  where?: InputMaybe<Chapters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChapters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chapters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapters_Order_By>>;
  where?: InputMaybe<Chapters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChapters_By_PkArgs = {
  chapter_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootCourse_StudentsArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourse_Students_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourse_Students_By_PkArgs = {
  course_id: Scalars['String'];
  student_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootCourse_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourse_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourse_Study_Plans_By_PkArgs = {
  course_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootCourses_BooksArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourses_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Courses_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Books_Order_By>>;
  where?: InputMaybe<Courses_Books_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourses_Books_By_PkArgs = {
  book_id: Scalars['String'];
  course_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootFind_Assignment_By_Topic_IdArgs = {
  args: Find_Assignment_By_Topic_Id_Args;
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFind_Assignment_By_Topic_Id_AggregateArgs = {
  args: Find_Assignment_By_Topic_Id_Args;
  distinct_on?: InputMaybe<Array<Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Assignments_Order_By>>;
  where?: InputMaybe<Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFind_Quiz_By_Lo_IdArgs = {
  args: Find_Quiz_By_Lo_Id_Args;
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFind_Quiz_By_Lo_Id_AggregateArgs = {
  args: Find_Quiz_By_Lo_Id_Args;
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_List_Course_Student_Study_Plans_By_FilterArgs = {
  args: Get_List_Course_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_List_Course_Student_Study_Plans_By_Filter_AggregateArgs = {
  args: Get_List_Course_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Students_Order_By>>;
  where?: InputMaybe<Course_Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_List_Course_Study_Plan_By_FilterArgs = {
  args: Get_List_Course_Study_Plan_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_List_Course_Study_Plan_By_Filter_AggregateArgs = {
  args: Get_List_Course_Study_Plan_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Course_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Course_Study_Plans_Order_By>>;
  where?: InputMaybe<Course_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_Student_Study_Plans_By_FilterArgs = {
  args: Get_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_Student_Study_Plans_By_Filter_AggregateArgs = {
  args: Get_Student_Study_Plans_By_Filter_Args;
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLearning_ObjectivesArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLearning_Objectives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLearning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootLo_Study_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLo_Study_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Lo_Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lo_Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Lo_Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLo_Study_Plan_Items_By_PkArgs = {
  lo_id: Scalars['String'];
  study_plan_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuiz_SetsArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuiz_Sets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quiz_Sets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quiz_Sets_Order_By>>;
  where?: InputMaybe<Quiz_Sets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuiz_Sets_By_PkArgs = {
  quiz_set_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuizzesArgs = {
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuizzes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quizzes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quizzes_Order_By>>;
  where?: InputMaybe<Quizzes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuizzes_By_PkArgs = {
  quiz_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootScheduler_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScheduler_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Items_Order_By>>;
  where?: InputMaybe<Scheduler_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScheduler_Items_By_PkArgs = {
  scheduler_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootScheduler_PatternsArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScheduler_Patterns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduler_Patterns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scheduler_Patterns_Order_By>>;
  where?: InputMaybe<Scheduler_Patterns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScheduler_Patterns_By_PkArgs = {
  scheduler_pattern_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_Study_PlansArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Study_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Study_Plans_Order_By>>;
  where?: InputMaybe<Student_Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Study_Plans_By_PkArgs = {
  student_id: Scalars['String'];
  study_plan_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudy_Plan_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudy_Plan_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plan_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plan_Items_Order_By>>;
  where?: InputMaybe<Study_Plan_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudy_Plan_Items_By_PkArgs = {
  study_plan_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudy_PlansArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudy_Plans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Study_Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Study_Plans_Order_By>>;
  where?: InputMaybe<Study_Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudy_Plans_By_PkArgs = {
  study_plan_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTopicsArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Order_By>>;
  where?: InputMaybe<Topics_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_AssignmentsArgs = {
  distinct_on?: InputMaybe<Array<Topics_Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Assignments_Order_By>>;
  where?: InputMaybe<Topics_Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_Assignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Assignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Assignments_Order_By>>;
  where?: InputMaybe<Topics_Assignments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_Assignments_By_PkArgs = {
  assignment_id: Scalars['String'];
  topic_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTopics_By_PkArgs = {
  topic_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTopics_Learning_ObjectivesArgs = {
  distinct_on?: InputMaybe<Array<Topics_Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Learning_Objectives_Order_By>>;
  where?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_Learning_Objectives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Topics_Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topics_Learning_Objectives_Order_By>>;
  where?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTopics_Learning_Objectives_By_PkArgs = {
  lo_id: Scalars['String'];
  topic_id: Scalars['String'];
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

/** columns and relationships of "topics" */
export type Topics = {
  attachment_names?: Maybe<Scalars['_text']>;
  attachment_urls?: Maybe<Scalars['_text']>;
  chapter_id?: Maybe<Scalars['String']>;
  copied_topic_id?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  essay_required: Scalars['Boolean'];
  grade: Scalars['smallint'];
  icon_url?: Maybe<Scalars['String']>;
  instruction?: Maybe<Scalars['String']>;
  /** An array relationship */
  learning_objectives: Array<Learning_Objectives>;
  /** An aggregated array relationship */
  learning_objectives_aggregate: Learning_Objectives_Aggregate;
  lo_display_order_counter?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  published_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  school_id: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  topic_id: Scalars['String'];
  topic_type: Scalars['String'];
  total_los: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "topics" */
export type TopicsLearning_ObjectivesArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};


/** columns and relationships of "topics" */
export type TopicsLearning_Objectives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Learning_Objectives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Learning_Objectives_Order_By>>;
  where?: InputMaybe<Learning_Objectives_Bool_Exp>;
};

/** aggregated selection of "topics" */
export type Topics_Aggregate = {
  aggregate?: Maybe<Topics_Aggregate_Fields>;
  nodes: Array<Topics>;
};

/** aggregate fields of "topics" */
export type Topics_Aggregate_Fields = {
  avg?: Maybe<Topics_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Topics_Max_Fields>;
  min?: Maybe<Topics_Min_Fields>;
  stddev?: Maybe<Topics_Stddev_Fields>;
  stddev_pop?: Maybe<Topics_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Topics_Stddev_Samp_Fields>;
  sum?: Maybe<Topics_Sum_Fields>;
  var_pop?: Maybe<Topics_Var_Pop_Fields>;
  var_samp?: Maybe<Topics_Var_Samp_Fields>;
  variance?: Maybe<Topics_Variance_Fields>;
};


/** aggregate fields of "topics" */
export type Topics_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Topics_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "topics" */
export type Topics_Aggregate_Order_By = {
  avg?: InputMaybe<Topics_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Topics_Max_Order_By>;
  min?: InputMaybe<Topics_Min_Order_By>;
  stddev?: InputMaybe<Topics_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Topics_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Topics_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Topics_Sum_Order_By>;
  var_pop?: InputMaybe<Topics_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Topics_Var_Samp_Order_By>;
  variance?: InputMaybe<Topics_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "topics" */
export type Topics_Arr_Rel_Insert_Input = {
  data: Array<Topics_Insert_Input>;
  on_conflict?: InputMaybe<Topics_On_Conflict>;
};

/** columns and relationships of "topics_assignments" */
export type Topics_Assignments = {
  /** An object relationship */
  assignment: Assignments;
  assignment_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  resource_path: Scalars['String'];
  topic_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "topics_assignments" */
export type Topics_Assignments_Aggregate = {
  aggregate?: Maybe<Topics_Assignments_Aggregate_Fields>;
  nodes: Array<Topics_Assignments>;
};

/** aggregate fields of "topics_assignments" */
export type Topics_Assignments_Aggregate_Fields = {
  avg?: Maybe<Topics_Assignments_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Topics_Assignments_Max_Fields>;
  min?: Maybe<Topics_Assignments_Min_Fields>;
  stddev?: Maybe<Topics_Assignments_Stddev_Fields>;
  stddev_pop?: Maybe<Topics_Assignments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Topics_Assignments_Stddev_Samp_Fields>;
  sum?: Maybe<Topics_Assignments_Sum_Fields>;
  var_pop?: Maybe<Topics_Assignments_Var_Pop_Fields>;
  var_samp?: Maybe<Topics_Assignments_Var_Samp_Fields>;
  variance?: Maybe<Topics_Assignments_Variance_Fields>;
};


/** aggregate fields of "topics_assignments" */
export type Topics_Assignments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Topics_Assignments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "topics_assignments" */
export type Topics_Assignments_Aggregate_Order_By = {
  avg?: InputMaybe<Topics_Assignments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Topics_Assignments_Max_Order_By>;
  min?: InputMaybe<Topics_Assignments_Min_Order_By>;
  stddev?: InputMaybe<Topics_Assignments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Topics_Assignments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Topics_Assignments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Topics_Assignments_Sum_Order_By>;
  var_pop?: InputMaybe<Topics_Assignments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Topics_Assignments_Var_Samp_Order_By>;
  variance?: InputMaybe<Topics_Assignments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "topics_assignments" */
export type Topics_Assignments_Arr_Rel_Insert_Input = {
  data: Array<Topics_Assignments_Insert_Input>;
  on_conflict?: InputMaybe<Topics_Assignments_On_Conflict>;
};

/** aggregate avg on columns */
export type Topics_Assignments_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "topics_assignments" */
export type Topics_Assignments_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "topics_assignments". All fields are combined with a logical 'AND'. */
export type Topics_Assignments_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Topics_Assignments_Bool_Exp>>>;
  _not?: InputMaybe<Topics_Assignments_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Topics_Assignments_Bool_Exp>>>;
  assignment?: InputMaybe<Assignments_Bool_Exp>;
  assignment_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Smallint_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "topics_assignments" */
export enum Topics_Assignments_Constraint {
  /** unique or primary key constraint */
  TopicsAssignmentsPk = 'topics_assignments_pk'
}

/** input type for incrementing integer column in table "topics_assignments" */
export type Topics_Assignments_Inc_Input = {
  display_order?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "topics_assignments" */
export type Topics_Assignments_Insert_Input = {
  assignment?: InputMaybe<Assignments_Obj_Rel_Insert_Input>;
  assignment_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  resource_path?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Topics_Assignments_Max_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  resource_path?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "topics_assignments" */
export type Topics_Assignments_Max_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Topics_Assignments_Min_Fields = {
  assignment_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  resource_path?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "topics_assignments" */
export type Topics_Assignments_Min_Order_By = {
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "topics_assignments" */
export type Topics_Assignments_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Topics_Assignments>;
};

/** input type for inserting object relation for remote table "topics_assignments" */
export type Topics_Assignments_Obj_Rel_Insert_Input = {
  data: Topics_Assignments_Insert_Input;
  on_conflict?: InputMaybe<Topics_Assignments_On_Conflict>;
};

/** on conflict condition type for table "topics_assignments" */
export type Topics_Assignments_On_Conflict = {
  constraint: Topics_Assignments_Constraint;
  update_columns: Array<Topics_Assignments_Update_Column>;
  where?: InputMaybe<Topics_Assignments_Bool_Exp>;
};

/** ordering options when selecting data from "topics_assignments" */
export type Topics_Assignments_Order_By = {
  assignment?: InputMaybe<Assignments_Order_By>;
  assignment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "topics_assignments" */
export type Topics_Assignments_Pk_Columns_Input = {
  assignment_id: Scalars['String'];
  topic_id: Scalars['String'];
};

/** select columns of table "topics_assignments" */
export enum Topics_Assignments_Select_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "topics_assignments" */
export type Topics_Assignments_Set_Input = {
  assignment_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  resource_path?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Topics_Assignments_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "topics_assignments" */
export type Topics_Assignments_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Topics_Assignments_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "topics_assignments" */
export type Topics_Assignments_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Topics_Assignments_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "topics_assignments" */
export type Topics_Assignments_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Topics_Assignments_Sum_Fields = {
  display_order?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "topics_assignments" */
export type Topics_Assignments_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** update columns of table "topics_assignments" */
export enum Topics_Assignments_Update_Column {
  /** column name */
  AssignmentId = 'assignment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Topics_Assignments_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "topics_assignments" */
export type Topics_Assignments_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Topics_Assignments_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "topics_assignments" */
export type Topics_Assignments_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Topics_Assignments_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "topics_assignments" */
export type Topics_Assignments_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate avg on columns */
export type Topics_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "topics" */
export type Topics_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "topics". All fields are combined with a logical 'AND'. */
export type Topics_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Topics_Bool_Exp>>>;
  _not?: InputMaybe<Topics_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Topics_Bool_Exp>>>;
  attachment_names?: InputMaybe<_Text_Comparison_Exp>;
  attachment_urls?: InputMaybe<_Text_Comparison_Exp>;
  chapter_id?: InputMaybe<String_Comparison_Exp>;
  copied_topic_id?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Smallint_Comparison_Exp>;
  essay_required?: InputMaybe<Boolean_Comparison_Exp>;
  grade?: InputMaybe<Smallint_Comparison_Exp>;
  icon_url?: InputMaybe<String_Comparison_Exp>;
  instruction?: InputMaybe<String_Comparison_Exp>;
  learning_objectives?: InputMaybe<Learning_Objectives_Bool_Exp>;
  lo_display_order_counter?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  published_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  school_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<String_Comparison_Exp>;
  topic_type?: InputMaybe<String_Comparison_Exp>;
  total_los?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "topics" */
export enum Topics_Constraint {
  /** unique or primary key constraint */
  TopicsPk = 'topics_pk'
}

/** input type for incrementing integer column in table "topics" */
export type Topics_Inc_Input = {
  display_order?: InputMaybe<Scalars['smallint']>;
  grade?: InputMaybe<Scalars['smallint']>;
  lo_display_order_counter?: InputMaybe<Scalars['Int']>;
  school_id?: InputMaybe<Scalars['Int']>;
  total_los?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "topics" */
export type Topics_Insert_Input = {
  attachment_names?: InputMaybe<Scalars['_text']>;
  attachment_urls?: InputMaybe<Scalars['_text']>;
  chapter_id?: InputMaybe<Scalars['String']>;
  copied_topic_id?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  essay_required?: InputMaybe<Scalars['Boolean']>;
  grade?: InputMaybe<Scalars['smallint']>;
  icon_url?: InputMaybe<Scalars['String']>;
  instruction?: InputMaybe<Scalars['String']>;
  learning_objectives?: InputMaybe<Learning_Objectives_Arr_Rel_Insert_Input>;
  lo_display_order_counter?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  topic_type?: InputMaybe<Scalars['String']>;
  total_los?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "topics_learning_objectives" */
export type Topics_Learning_Objectives = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  /** An object relationship */
  learning_objective?: Maybe<Learning_Objectives>;
  lo_id: Scalars['String'];
  resource_path: Scalars['String'];
  topic_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "topics_learning_objectives" */
export type Topics_Learning_Objectives_Aggregate = {
  aggregate?: Maybe<Topics_Learning_Objectives_Aggregate_Fields>;
  nodes: Array<Topics_Learning_Objectives>;
};

/** aggregate fields of "topics_learning_objectives" */
export type Topics_Learning_Objectives_Aggregate_Fields = {
  avg?: Maybe<Topics_Learning_Objectives_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Topics_Learning_Objectives_Max_Fields>;
  min?: Maybe<Topics_Learning_Objectives_Min_Fields>;
  stddev?: Maybe<Topics_Learning_Objectives_Stddev_Fields>;
  stddev_pop?: Maybe<Topics_Learning_Objectives_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Topics_Learning_Objectives_Stddev_Samp_Fields>;
  sum?: Maybe<Topics_Learning_Objectives_Sum_Fields>;
  var_pop?: Maybe<Topics_Learning_Objectives_Var_Pop_Fields>;
  var_samp?: Maybe<Topics_Learning_Objectives_Var_Samp_Fields>;
  variance?: Maybe<Topics_Learning_Objectives_Variance_Fields>;
};


/** aggregate fields of "topics_learning_objectives" */
export type Topics_Learning_Objectives_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Topics_Learning_Objectives_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Aggregate_Order_By = {
  avg?: InputMaybe<Topics_Learning_Objectives_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Topics_Learning_Objectives_Max_Order_By>;
  min?: InputMaybe<Topics_Learning_Objectives_Min_Order_By>;
  stddev?: InputMaybe<Topics_Learning_Objectives_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Topics_Learning_Objectives_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Topics_Learning_Objectives_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Topics_Learning_Objectives_Sum_Order_By>;
  var_pop?: InputMaybe<Topics_Learning_Objectives_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Topics_Learning_Objectives_Var_Samp_Order_By>;
  variance?: InputMaybe<Topics_Learning_Objectives_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Arr_Rel_Insert_Input = {
  data: Array<Topics_Learning_Objectives_Insert_Input>;
  on_conflict?: InputMaybe<Topics_Learning_Objectives_On_Conflict>;
};

/** aggregate avg on columns */
export type Topics_Learning_Objectives_Avg_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Avg_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "topics_learning_objectives". All fields are combined with a logical 'AND'. */
export type Topics_Learning_Objectives_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Topics_Learning_Objectives_Bool_Exp>>>;
  _not?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Topics_Learning_Objectives_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_order?: InputMaybe<Smallint_Comparison_Exp>;
  learning_objective?: InputMaybe<Learning_Objectives_Bool_Exp>;
  lo_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "topics_learning_objectives" */
export enum Topics_Learning_Objectives_Constraint {
  /** unique or primary key constraint */
  TopicsLearningObjectivesPk = 'topics_learning_objectives_pk'
}

/** input type for incrementing integer column in table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Inc_Input = {
  display_order?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  learning_objective?: InputMaybe<Learning_Objectives_Obj_Rel_Insert_Input>;
  lo_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Topics_Learning_Objectives_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  lo_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Topics_Learning_Objectives_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  lo_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Topics_Learning_Objectives>;
};

/** input type for inserting object relation for remote table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Obj_Rel_Insert_Input = {
  data: Topics_Learning_Objectives_Insert_Input;
  on_conflict?: InputMaybe<Topics_Learning_Objectives_On_Conflict>;
};

/** on conflict condition type for table "topics_learning_objectives" */
export type Topics_Learning_Objectives_On_Conflict = {
  constraint: Topics_Learning_Objectives_Constraint;
  update_columns: Array<Topics_Learning_Objectives_Update_Column>;
  where?: InputMaybe<Topics_Learning_Objectives_Bool_Exp>;
};

/** ordering options when selecting data from "topics_learning_objectives" */
export type Topics_Learning_Objectives_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  learning_objective?: InputMaybe<Learning_Objectives_Order_By>;
  lo_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "topics_learning_objectives" */
export type Topics_Learning_Objectives_Pk_Columns_Input = {
  lo_id: Scalars['String'];
  topic_id: Scalars['String'];
};

/** select columns of table "topics_learning_objectives" */
export enum Topics_Learning_Objectives_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  lo_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Topics_Learning_Objectives_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Topics_Learning_Objectives_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Topics_Learning_Objectives_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Topics_Learning_Objectives_Sum_Fields = {
  display_order?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** update columns of table "topics_learning_objectives" */
export enum Topics_Learning_Objectives_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  LoId = 'lo_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Topics_Learning_Objectives_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Topics_Learning_Objectives_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Topics_Learning_Objectives_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "topics_learning_objectives" */
export type Topics_Learning_Objectives_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Topics_Max_Fields = {
  chapter_id?: Maybe<Scalars['String']>;
  copied_topic_id?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  icon_url?: Maybe<Scalars['String']>;
  instruction?: Maybe<Scalars['String']>;
  lo_display_order_counter?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  topic_type?: Maybe<Scalars['String']>;
  total_los?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "topics" */
export type Topics_Max_Order_By = {
  chapter_id?: InputMaybe<Order_By>;
  copied_topic_id?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  icon_url?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  topic_type?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Topics_Min_Fields = {
  chapter_id?: Maybe<Scalars['String']>;
  copied_topic_id?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  icon_url?: Maybe<Scalars['String']>;
  instruction?: Maybe<Scalars['String']>;
  lo_display_order_counter?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  school_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['String']>;
  topic_type?: Maybe<Scalars['String']>;
  total_los?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "topics" */
export type Topics_Min_Order_By = {
  chapter_id?: InputMaybe<Order_By>;
  copied_topic_id?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  icon_url?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  topic_type?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "topics" */
export type Topics_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Topics>;
};

/** input type for inserting object relation for remote table "topics" */
export type Topics_Obj_Rel_Insert_Input = {
  data: Topics_Insert_Input;
  on_conflict?: InputMaybe<Topics_On_Conflict>;
};

/** on conflict condition type for table "topics" */
export type Topics_On_Conflict = {
  constraint: Topics_Constraint;
  update_columns: Array<Topics_Update_Column>;
  where?: InputMaybe<Topics_Bool_Exp>;
};

/** ordering options when selecting data from "topics" */
export type Topics_Order_By = {
  attachment_names?: InputMaybe<Order_By>;
  attachment_urls?: InputMaybe<Order_By>;
  chapter_id?: InputMaybe<Order_By>;
  copied_topic_id?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  display_order?: InputMaybe<Order_By>;
  essay_required?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  icon_url?: InputMaybe<Order_By>;
  instruction?: InputMaybe<Order_By>;
  learning_objectives_aggregate?: InputMaybe<Learning_Objectives_Aggregate_Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  topic_type?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "topics" */
export type Topics_Pk_Columns_Input = {
  topic_id: Scalars['String'];
};

/** select columns of table "topics" */
export enum Topics_Select_Column {
  /** column name */
  AttachmentNames = 'attachment_names',
  /** column name */
  AttachmentUrls = 'attachment_urls',
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CopiedTopicId = 'copied_topic_id',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  EssayRequired = 'essay_required',
  /** column name */
  Grade = 'grade',
  /** column name */
  IconUrl = 'icon_url',
  /** column name */
  Instruction = 'instruction',
  /** column name */
  LoDisplayOrderCounter = 'lo_display_order_counter',
  /** column name */
  Name = 'name',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  Subject = 'subject',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  TopicType = 'topic_type',
  /** column name */
  TotalLos = 'total_los',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "topics" */
export type Topics_Set_Input = {
  attachment_names?: InputMaybe<Scalars['_text']>;
  attachment_urls?: InputMaybe<Scalars['_text']>;
  chapter_id?: InputMaybe<Scalars['String']>;
  copied_topic_id?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  display_order?: InputMaybe<Scalars['smallint']>;
  essay_required?: InputMaybe<Scalars['Boolean']>;
  grade?: InputMaybe<Scalars['smallint']>;
  icon_url?: InputMaybe<Scalars['String']>;
  instruction?: InputMaybe<Scalars['String']>;
  lo_display_order_counter?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  school_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['String']>;
  topic_type?: InputMaybe<Scalars['String']>;
  total_los?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Topics_Stddev_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "topics" */
export type Topics_Stddev_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Topics_Stddev_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "topics" */
export type Topics_Stddev_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Topics_Stddev_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "topics" */
export type Topics_Stddev_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Topics_Sum_Fields = {
  display_order?: Maybe<Scalars['smallint']>;
  grade?: Maybe<Scalars['smallint']>;
  lo_display_order_counter?: Maybe<Scalars['Int']>;
  school_id?: Maybe<Scalars['Int']>;
  total_los?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "topics" */
export type Topics_Sum_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** update columns of table "topics" */
export enum Topics_Update_Column {
  /** column name */
  AttachmentNames = 'attachment_names',
  /** column name */
  AttachmentUrls = 'attachment_urls',
  /** column name */
  ChapterId = 'chapter_id',
  /** column name */
  CopiedTopicId = 'copied_topic_id',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  EssayRequired = 'essay_required',
  /** column name */
  Grade = 'grade',
  /** column name */
  IconUrl = 'icon_url',
  /** column name */
  Instruction = 'instruction',
  /** column name */
  LoDisplayOrderCounter = 'lo_display_order_counter',
  /** column name */
  Name = 'name',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  SchoolId = 'school_id',
  /** column name */
  Status = 'status',
  /** column name */
  Subject = 'subject',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  TopicType = 'topic_type',
  /** column name */
  TotalLos = 'total_los',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Topics_Var_Pop_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "topics" */
export type Topics_Var_Pop_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Topics_Var_Samp_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "topics" */
export type Topics_Var_Samp_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Topics_Variance_Fields = {
  display_order?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  lo_display_order_counter?: Maybe<Scalars['Float']>;
  school_id?: Maybe<Scalars['Float']>;
  total_los?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "topics" */
export type Topics_Variance_Order_By = {
  display_order?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  lo_display_order_counter?: InputMaybe<Order_By>;
  school_id?: InputMaybe<Order_By>;
  total_los?: InputMaybe<Order_By>;
};
