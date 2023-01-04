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

/** columns and relationships of "lessons" */
export type Lessons = {
  center_id?: Maybe<Scalars['String']>;
  class_id?: Maybe<Scalars['String']>;
  control_settings?: Maybe<Scalars['jsonb']>;
  course_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  is_locked: Scalars['Boolean'];
  learner_ids: Scalars['_text'];
  lesson_group_id?: Maybe<Scalars['String']>;
  lesson_id: Scalars['String'];
  lesson_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  room_id?: Maybe<Scalars['String']>;
  room_state?: Maybe<Scalars['jsonb']>;
  scheduler_id?: Maybe<Scalars['String']>;
  scheduling_status?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  stream_learner_counter: Scalars['Int'];
  teacher_id?: Maybe<Scalars['String']>;
  teaching_medium?: Maybe<Scalars['String']>;
  teaching_method?: Maybe<Scalars['String']>;
  teaching_model?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "lessons" */
export type LessonsControl_SettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "lessons" */
export type LessonsRoom_StateArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "lessons" */
export type Lessons_Aggregate = {
  aggregate?: Maybe<Lessons_Aggregate_Fields>;
  nodes: Array<Lessons>;
};

/** aggregate fields of "lessons" */
export type Lessons_Aggregate_Fields = {
  avg?: Maybe<Lessons_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Lessons_Max_Fields>;
  min?: Maybe<Lessons_Min_Fields>;
  stddev?: Maybe<Lessons_Stddev_Fields>;
  stddev_pop?: Maybe<Lessons_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Lessons_Stddev_Samp_Fields>;
  sum?: Maybe<Lessons_Sum_Fields>;
  var_pop?: Maybe<Lessons_Var_Pop_Fields>;
  var_samp?: Maybe<Lessons_Var_Samp_Fields>;
  variance?: Maybe<Lessons_Variance_Fields>;
};


/** aggregate fields of "lessons" */
export type Lessons_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Lessons_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lessons" */
export type Lessons_Aggregate_Order_By = {
  avg?: InputMaybe<Lessons_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Lessons_Max_Order_By>;
  min?: InputMaybe<Lessons_Min_Order_By>;
  stddev?: InputMaybe<Lessons_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Lessons_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Lessons_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Lessons_Sum_Order_By>;
  var_pop?: InputMaybe<Lessons_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Lessons_Var_Samp_Order_By>;
  variance?: InputMaybe<Lessons_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Lessons_Append_Input = {
  control_settings?: InputMaybe<Scalars['jsonb']>;
  room_state?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "lessons" */
export type Lessons_Arr_Rel_Insert_Input = {
  data: Array<Lessons_Insert_Input>;
  on_conflict?: InputMaybe<Lessons_On_Conflict>;
};

/** aggregate avg on columns */
export type Lessons_Avg_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "lessons" */
export type Lessons_Avg_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "lessons". All fields are combined with a logical 'AND'. */
export type Lessons_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Lessons_Bool_Exp>>>;
  _not?: InputMaybe<Lessons_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Lessons_Bool_Exp>>>;
  center_id?: InputMaybe<String_Comparison_Exp>;
  class_id?: InputMaybe<String_Comparison_Exp>;
  control_settings?: InputMaybe<Jsonb_Comparison_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_locked?: InputMaybe<Boolean_Comparison_Exp>;
  learner_ids?: InputMaybe<_Text_Comparison_Exp>;
  lesson_group_id?: InputMaybe<String_Comparison_Exp>;
  lesson_id?: InputMaybe<String_Comparison_Exp>;
  lesson_type?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  room_id?: InputMaybe<String_Comparison_Exp>;
  room_state?: InputMaybe<Jsonb_Comparison_Exp>;
  scheduler_id?: InputMaybe<String_Comparison_Exp>;
  scheduling_status?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  stream_learner_counter?: InputMaybe<Int_Comparison_Exp>;
  teacher_id?: InputMaybe<String_Comparison_Exp>;
  teaching_medium?: InputMaybe<String_Comparison_Exp>;
  teaching_method?: InputMaybe<String_Comparison_Exp>;
  teaching_model?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "lessons" */
export enum Lessons_Constraint {
  /** unique or primary key constraint */
  LessonsPk = 'lessons_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Lessons_Delete_At_Path_Input = {
  control_settings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  room_state?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Lessons_Delete_Elem_Input = {
  control_settings?: InputMaybe<Scalars['Int']>;
  room_state?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Lessons_Delete_Key_Input = {
  control_settings?: InputMaybe<Scalars['String']>;
  room_state?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "lessons" */
export type Lessons_Inc_Input = {
  stream_learner_counter?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "lessons" */
export type Lessons_Insert_Input = {
  center_id?: InputMaybe<Scalars['String']>;
  class_id?: InputMaybe<Scalars['String']>;
  control_settings?: InputMaybe<Scalars['jsonb']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  is_locked?: InputMaybe<Scalars['Boolean']>;
  learner_ids?: InputMaybe<Scalars['_text']>;
  lesson_group_id?: InputMaybe<Scalars['String']>;
  lesson_id?: InputMaybe<Scalars['String']>;
  lesson_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  room_id?: InputMaybe<Scalars['String']>;
  room_state?: InputMaybe<Scalars['jsonb']>;
  scheduler_id?: InputMaybe<Scalars['String']>;
  scheduling_status?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  status?: InputMaybe<Scalars['String']>;
  stream_learner_counter?: InputMaybe<Scalars['Int']>;
  teacher_id?: InputMaybe<Scalars['String']>;
  teaching_medium?: InputMaybe<Scalars['String']>;
  teaching_method?: InputMaybe<Scalars['String']>;
  teaching_model?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Lessons_Max_Fields = {
  center_id?: Maybe<Scalars['String']>;
  class_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  lesson_group_id?: Maybe<Scalars['String']>;
  lesson_id?: Maybe<Scalars['String']>;
  lesson_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  room_id?: Maybe<Scalars['String']>;
  scheduler_id?: Maybe<Scalars['String']>;
  scheduling_status?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  stream_learner_counter?: Maybe<Scalars['Int']>;
  teacher_id?: Maybe<Scalars['String']>;
  teaching_medium?: Maybe<Scalars['String']>;
  teaching_method?: Maybe<Scalars['String']>;
  teaching_model?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "lessons" */
export type Lessons_Max_Order_By = {
  center_id?: InputMaybe<Order_By>;
  class_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  lesson_group_id?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  lesson_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  scheduler_id?: InputMaybe<Order_By>;
  scheduling_status?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  stream_learner_counter?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
  teaching_medium?: InputMaybe<Order_By>;
  teaching_method?: InputMaybe<Order_By>;
  teaching_model?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Lessons_Min_Fields = {
  center_id?: Maybe<Scalars['String']>;
  class_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  lesson_group_id?: Maybe<Scalars['String']>;
  lesson_id?: Maybe<Scalars['String']>;
  lesson_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  room_id?: Maybe<Scalars['String']>;
  scheduler_id?: Maybe<Scalars['String']>;
  scheduling_status?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  stream_learner_counter?: Maybe<Scalars['Int']>;
  teacher_id?: Maybe<Scalars['String']>;
  teaching_medium?: Maybe<Scalars['String']>;
  teaching_method?: Maybe<Scalars['String']>;
  teaching_model?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "lessons" */
export type Lessons_Min_Order_By = {
  center_id?: InputMaybe<Order_By>;
  class_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  lesson_group_id?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  lesson_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  scheduler_id?: InputMaybe<Order_By>;
  scheduling_status?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  stream_learner_counter?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
  teaching_medium?: InputMaybe<Order_By>;
  teaching_method?: InputMaybe<Order_By>;
  teaching_model?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "lessons" */
export type Lessons_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Lessons>;
};

/** input type for inserting object relation for remote table "lessons" */
export type Lessons_Obj_Rel_Insert_Input = {
  data: Lessons_Insert_Input;
  on_conflict?: InputMaybe<Lessons_On_Conflict>;
};

/** on conflict condition type for table "lessons" */
export type Lessons_On_Conflict = {
  constraint: Lessons_Constraint;
  update_columns: Array<Lessons_Update_Column>;
  where?: InputMaybe<Lessons_Bool_Exp>;
};

/** ordering options when selecting data from "lessons" */
export type Lessons_Order_By = {
  center_id?: InputMaybe<Order_By>;
  class_id?: InputMaybe<Order_By>;
  control_settings?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  is_locked?: InputMaybe<Order_By>;
  learner_ids?: InputMaybe<Order_By>;
  lesson_group_id?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  lesson_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  room_state?: InputMaybe<Order_By>;
  scheduler_id?: InputMaybe<Order_By>;
  scheduling_status?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  stream_learner_counter?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
  teaching_medium?: InputMaybe<Order_By>;
  teaching_method?: InputMaybe<Order_By>;
  teaching_model?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "lessons" */
export type Lessons_Pk_Columns_Input = {
  lesson_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Lessons_Prepend_Input = {
  control_settings?: InputMaybe<Scalars['jsonb']>;
  room_state?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "lessons" */
export enum Lessons_Select_Column {
  /** column name */
  CenterId = 'center_id',
  /** column name */
  ClassId = 'class_id',
  /** column name */
  ControlSettings = 'control_settings',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  IsLocked = 'is_locked',
  /** column name */
  LearnerIds = 'learner_ids',
  /** column name */
  LessonGroupId = 'lesson_group_id',
  /** column name */
  LessonId = 'lesson_id',
  /** column name */
  LessonType = 'lesson_type',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  RoomState = 'room_state',
  /** column name */
  SchedulerId = 'scheduler_id',
  /** column name */
  SchedulingStatus = 'scheduling_status',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  StreamLearnerCounter = 'stream_learner_counter',
  /** column name */
  TeacherId = 'teacher_id',
  /** column name */
  TeachingMedium = 'teaching_medium',
  /** column name */
  TeachingMethod = 'teaching_method',
  /** column name */
  TeachingModel = 'teaching_model',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "lessons" */
export type Lessons_Set_Input = {
  center_id?: InputMaybe<Scalars['String']>;
  class_id?: InputMaybe<Scalars['String']>;
  control_settings?: InputMaybe<Scalars['jsonb']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  is_locked?: InputMaybe<Scalars['Boolean']>;
  learner_ids?: InputMaybe<Scalars['_text']>;
  lesson_group_id?: InputMaybe<Scalars['String']>;
  lesson_id?: InputMaybe<Scalars['String']>;
  lesson_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  room_id?: InputMaybe<Scalars['String']>;
  room_state?: InputMaybe<Scalars['jsonb']>;
  scheduler_id?: InputMaybe<Scalars['String']>;
  scheduling_status?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  status?: InputMaybe<Scalars['String']>;
  stream_learner_counter?: InputMaybe<Scalars['Int']>;
  teacher_id?: InputMaybe<Scalars['String']>;
  teaching_medium?: InputMaybe<Scalars['String']>;
  teaching_method?: InputMaybe<Scalars['String']>;
  teaching_model?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Lessons_Stddev_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "lessons" */
export type Lessons_Stddev_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Lessons_Stddev_Pop_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "lessons" */
export type Lessons_Stddev_Pop_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Lessons_Stddev_Samp_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "lessons" */
export type Lessons_Stddev_Samp_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Lessons_Sum_Fields = {
  stream_learner_counter?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "lessons" */
export type Lessons_Sum_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** update columns of table "lessons" */
export enum Lessons_Update_Column {
  /** column name */
  CenterId = 'center_id',
  /** column name */
  ClassId = 'class_id',
  /** column name */
  ControlSettings = 'control_settings',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  IsLocked = 'is_locked',
  /** column name */
  LearnerIds = 'learner_ids',
  /** column name */
  LessonGroupId = 'lesson_group_id',
  /** column name */
  LessonId = 'lesson_id',
  /** column name */
  LessonType = 'lesson_type',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  RoomState = 'room_state',
  /** column name */
  SchedulerId = 'scheduler_id',
  /** column name */
  SchedulingStatus = 'scheduling_status',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  StreamLearnerCounter = 'stream_learner_counter',
  /** column name */
  TeacherId = 'teacher_id',
  /** column name */
  TeachingMedium = 'teaching_medium',
  /** column name */
  TeachingMethod = 'teaching_method',
  /** column name */
  TeachingModel = 'teaching_model',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Lessons_Var_Pop_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "lessons" */
export type Lessons_Var_Pop_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Lessons_Var_Samp_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "lessons" */
export type Lessons_Var_Samp_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Lessons_Variance_Fields = {
  stream_learner_counter?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "lessons" */
export type Lessons_Variance_Order_By = {
  stream_learner_counter?: InputMaybe<Order_By>;
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
  resource_path?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
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
};

/** unique or primary key constraints on table "locations" */
export enum Locations_Constraint {
  /** unique or primary key constraint */
  LocationsPkey = 'locations_pkey'
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
  /** delete data from the table: "lessons" */
  delete_lessons?: Maybe<Lessons_Mutation_Response>;
  /** delete single row from the table: "lessons" */
  delete_lessons_by_pk?: Maybe<Lessons>;
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>;
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>;
  /** delete data from the table: "other_working_hours" */
  delete_other_working_hours?: Maybe<Other_Working_Hours_Mutation_Response>;
  /** delete single row from the table: "other_working_hours" */
  delete_other_working_hours_by_pk?: Maybe<Other_Working_Hours>;
  /** delete data from the table: "timesheet" */
  delete_timesheet?: Maybe<Timesheet_Mutation_Response>;
  /** delete single row from the table: "timesheet" */
  delete_timesheet_by_pk?: Maybe<Timesheet>;
  /** delete data from the table: "timesheet_config" */
  delete_timesheet_config?: Maybe<Timesheet_Config_Mutation_Response>;
  /** delete single row from the table: "timesheet_config" */
  delete_timesheet_config_by_pk?: Maybe<Timesheet_Config>;
  /** delete data from the table: "timesheet_lesson_hours" */
  delete_timesheet_lesson_hours?: Maybe<Timesheet_Lesson_Hours_Mutation_Response>;
  /** delete single row from the table: "timesheet_lesson_hours" */
  delete_timesheet_lesson_hours_by_pk?: Maybe<Timesheet_Lesson_Hours>;
  /** insert data into the table: "lessons" */
  insert_lessons?: Maybe<Lessons_Mutation_Response>;
  /** insert a single row into the table: "lessons" */
  insert_lessons_one?: Maybe<Lessons>;
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>;
  /** insert data into the table: "other_working_hours" */
  insert_other_working_hours?: Maybe<Other_Working_Hours_Mutation_Response>;
  /** insert a single row into the table: "other_working_hours" */
  insert_other_working_hours_one?: Maybe<Other_Working_Hours>;
  /** insert data into the table: "timesheet" */
  insert_timesheet?: Maybe<Timesheet_Mutation_Response>;
  /** insert data into the table: "timesheet_config" */
  insert_timesheet_config?: Maybe<Timesheet_Config_Mutation_Response>;
  /** insert a single row into the table: "timesheet_config" */
  insert_timesheet_config_one?: Maybe<Timesheet_Config>;
  /** insert data into the table: "timesheet_lesson_hours" */
  insert_timesheet_lesson_hours?: Maybe<Timesheet_Lesson_Hours_Mutation_Response>;
  /** insert a single row into the table: "timesheet_lesson_hours" */
  insert_timesheet_lesson_hours_one?: Maybe<Timesheet_Lesson_Hours>;
  /** insert a single row into the table: "timesheet" */
  insert_timesheet_one?: Maybe<Timesheet>;
  /** update data of the table: "lessons" */
  update_lessons?: Maybe<Lessons_Mutation_Response>;
  /** update single row of the table: "lessons" */
  update_lessons_by_pk?: Maybe<Lessons>;
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>;
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>;
  /** update data of the table: "other_working_hours" */
  update_other_working_hours?: Maybe<Other_Working_Hours_Mutation_Response>;
  /** update single row of the table: "other_working_hours" */
  update_other_working_hours_by_pk?: Maybe<Other_Working_Hours>;
  /** update data of the table: "timesheet" */
  update_timesheet?: Maybe<Timesheet_Mutation_Response>;
  /** update single row of the table: "timesheet" */
  update_timesheet_by_pk?: Maybe<Timesheet>;
  /** update data of the table: "timesheet_config" */
  update_timesheet_config?: Maybe<Timesheet_Config_Mutation_Response>;
  /** update single row of the table: "timesheet_config" */
  update_timesheet_config_by_pk?: Maybe<Timesheet_Config>;
  /** update data of the table: "timesheet_lesson_hours" */
  update_timesheet_lesson_hours?: Maybe<Timesheet_Lesson_Hours_Mutation_Response>;
  /** update single row of the table: "timesheet_lesson_hours" */
  update_timesheet_lesson_hours_by_pk?: Maybe<Timesheet_Lesson_Hours>;
};


/** mutation root */
export type Mutation_RootDelete_LessonsArgs = {
  where: Lessons_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Lessons_By_PkArgs = {
  lesson_id: Scalars['String'];
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
export type Mutation_RootDelete_Other_Working_HoursArgs = {
  where: Other_Working_Hours_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Other_Working_Hours_By_PkArgs = {
  other_working_hours_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TimesheetArgs = {
  where: Timesheet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Timesheet_By_PkArgs = {
  timesheet_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Timesheet_ConfigArgs = {
  where: Timesheet_Config_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Timesheet_Config_By_PkArgs = {
  timesheet_config_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Timesheet_Lesson_HoursArgs = {
  where: Timesheet_Lesson_Hours_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Timesheet_Lesson_Hours_By_PkArgs = {
  lesson_id: Scalars['String'];
  timesheet_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_LessonsArgs = {
  objects: Array<Lessons_Insert_Input>;
  on_conflict?: InputMaybe<Lessons_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Lessons_OneArgs = {
  object: Lessons_Insert_Input;
  on_conflict?: InputMaybe<Lessons_On_Conflict>;
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
export type Mutation_RootInsert_Other_Working_HoursArgs = {
  objects: Array<Other_Working_Hours_Insert_Input>;
  on_conflict?: InputMaybe<Other_Working_Hours_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Other_Working_Hours_OneArgs = {
  object: Other_Working_Hours_Insert_Input;
  on_conflict?: InputMaybe<Other_Working_Hours_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TimesheetArgs = {
  objects: Array<Timesheet_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Timesheet_ConfigArgs = {
  objects: Array<Timesheet_Config_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_Config_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Timesheet_Config_OneArgs = {
  object: Timesheet_Config_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_Config_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Timesheet_Lesson_HoursArgs = {
  objects: Array<Timesheet_Lesson_Hours_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_Lesson_Hours_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Timesheet_Lesson_Hours_OneArgs = {
  object: Timesheet_Lesson_Hours_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_Lesson_Hours_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Timesheet_OneArgs = {
  object: Timesheet_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_LessonsArgs = {
  _append?: InputMaybe<Lessons_Append_Input>;
  _delete_at_path?: InputMaybe<Lessons_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Lessons_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Lessons_Delete_Key_Input>;
  _inc?: InputMaybe<Lessons_Inc_Input>;
  _prepend?: InputMaybe<Lessons_Prepend_Input>;
  _set?: InputMaybe<Lessons_Set_Input>;
  where: Lessons_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Lessons_By_PkArgs = {
  _append?: InputMaybe<Lessons_Append_Input>;
  _delete_at_path?: InputMaybe<Lessons_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Lessons_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Lessons_Delete_Key_Input>;
  _inc?: InputMaybe<Lessons_Inc_Input>;
  _prepend?: InputMaybe<Lessons_Prepend_Input>;
  _set?: InputMaybe<Lessons_Set_Input>;
  pk_columns: Lessons_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Other_Working_HoursArgs = {
  _inc?: InputMaybe<Other_Working_Hours_Inc_Input>;
  _set?: InputMaybe<Other_Working_Hours_Set_Input>;
  where: Other_Working_Hours_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Other_Working_Hours_By_PkArgs = {
  _inc?: InputMaybe<Other_Working_Hours_Inc_Input>;
  _set?: InputMaybe<Other_Working_Hours_Set_Input>;
  pk_columns: Other_Working_Hours_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TimesheetArgs = {
  _set?: InputMaybe<Timesheet_Set_Input>;
  where: Timesheet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Timesheet_By_PkArgs = {
  _set?: InputMaybe<Timesheet_Set_Input>;
  pk_columns: Timesheet_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Timesheet_ConfigArgs = {
  _set?: InputMaybe<Timesheet_Config_Set_Input>;
  where: Timesheet_Config_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Timesheet_Config_By_PkArgs = {
  _set?: InputMaybe<Timesheet_Config_Set_Input>;
  pk_columns: Timesheet_Config_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Timesheet_Lesson_HoursArgs = {
  _set?: InputMaybe<Timesheet_Lesson_Hours_Set_Input>;
  where: Timesheet_Lesson_Hours_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Timesheet_Lesson_Hours_By_PkArgs = {
  _set?: InputMaybe<Timesheet_Lesson_Hours_Set_Input>;
  pk_columns: Timesheet_Lesson_Hours_Pk_Columns_Input;
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

/** columns and relationships of "other_working_hours" */
export type Other_Working_Hours = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time: Scalars['timestamptz'];
  other_working_hours_id: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_time: Scalars['timestamptz'];
  timesheet_config_id: Scalars['String'];
  timesheet_id: Scalars['String'];
  total_hour: Scalars['smallint'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "other_working_hours" */
export type Other_Working_Hours_Aggregate = {
  aggregate?: Maybe<Other_Working_Hours_Aggregate_Fields>;
  nodes: Array<Other_Working_Hours>;
};

/** aggregate fields of "other_working_hours" */
export type Other_Working_Hours_Aggregate_Fields = {
  avg?: Maybe<Other_Working_Hours_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Other_Working_Hours_Max_Fields>;
  min?: Maybe<Other_Working_Hours_Min_Fields>;
  stddev?: Maybe<Other_Working_Hours_Stddev_Fields>;
  stddev_pop?: Maybe<Other_Working_Hours_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Other_Working_Hours_Stddev_Samp_Fields>;
  sum?: Maybe<Other_Working_Hours_Sum_Fields>;
  var_pop?: Maybe<Other_Working_Hours_Var_Pop_Fields>;
  var_samp?: Maybe<Other_Working_Hours_Var_Samp_Fields>;
  variance?: Maybe<Other_Working_Hours_Variance_Fields>;
};


/** aggregate fields of "other_working_hours" */
export type Other_Working_Hours_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Other_Working_Hours_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "other_working_hours" */
export type Other_Working_Hours_Aggregate_Order_By = {
  avg?: InputMaybe<Other_Working_Hours_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Other_Working_Hours_Max_Order_By>;
  min?: InputMaybe<Other_Working_Hours_Min_Order_By>;
  stddev?: InputMaybe<Other_Working_Hours_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Other_Working_Hours_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Other_Working_Hours_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Other_Working_Hours_Sum_Order_By>;
  var_pop?: InputMaybe<Other_Working_Hours_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Other_Working_Hours_Var_Samp_Order_By>;
  variance?: InputMaybe<Other_Working_Hours_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "other_working_hours" */
export type Other_Working_Hours_Arr_Rel_Insert_Input = {
  data: Array<Other_Working_Hours_Insert_Input>;
  on_conflict?: InputMaybe<Other_Working_Hours_On_Conflict>;
};

/** aggregate avg on columns */
export type Other_Working_Hours_Avg_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "other_working_hours" */
export type Other_Working_Hours_Avg_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "other_working_hours". All fields are combined with a logical 'AND'. */
export type Other_Working_Hours_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Other_Working_Hours_Bool_Exp>>>;
  _not?: InputMaybe<Other_Working_Hours_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Other_Working_Hours_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  other_working_hours_id?: InputMaybe<String_Comparison_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  timesheet_config_id?: InputMaybe<String_Comparison_Exp>;
  timesheet_id?: InputMaybe<String_Comparison_Exp>;
  total_hour?: InputMaybe<Smallint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "other_working_hours" */
export enum Other_Working_Hours_Constraint {
  /** unique or primary key constraint */
  OtherWorkingHoursPk = 'other_working_hours__pk'
}

/** input type for incrementing integer column in table "other_working_hours" */
export type Other_Working_Hours_Inc_Input = {
  total_hour?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "other_working_hours" */
export type Other_Working_Hours_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  other_working_hours_id?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  timesheet_config_id?: InputMaybe<Scalars['String']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  total_hour?: InputMaybe<Scalars['smallint']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Other_Working_Hours_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  other_working_hours_id?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  timesheet_config_id?: Maybe<Scalars['String']>;
  timesheet_id?: Maybe<Scalars['String']>;
  total_hour?: Maybe<Scalars['smallint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "other_working_hours" */
export type Other_Working_Hours_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  other_working_hours_id?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  total_hour?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Other_Working_Hours_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  other_working_hours_id?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  timesheet_config_id?: Maybe<Scalars['String']>;
  timesheet_id?: Maybe<Scalars['String']>;
  total_hour?: Maybe<Scalars['smallint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "other_working_hours" */
export type Other_Working_Hours_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  other_working_hours_id?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  total_hour?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "other_working_hours" */
export type Other_Working_Hours_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Other_Working_Hours>;
};

/** input type for inserting object relation for remote table "other_working_hours" */
export type Other_Working_Hours_Obj_Rel_Insert_Input = {
  data: Other_Working_Hours_Insert_Input;
  on_conflict?: InputMaybe<Other_Working_Hours_On_Conflict>;
};

/** on conflict condition type for table "other_working_hours" */
export type Other_Working_Hours_On_Conflict = {
  constraint: Other_Working_Hours_Constraint;
  update_columns: Array<Other_Working_Hours_Update_Column>;
  where?: InputMaybe<Other_Working_Hours_Bool_Exp>;
};

/** ordering options when selecting data from "other_working_hours" */
export type Other_Working_Hours_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  other_working_hours_id?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  total_hour?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "other_working_hours" */
export type Other_Working_Hours_Pk_Columns_Input = {
  other_working_hours_id: Scalars['String'];
};

/** select columns of table "other_working_hours" */
export enum Other_Working_Hours_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  OtherWorkingHoursId = 'other_working_hours_id',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TimesheetConfigId = 'timesheet_config_id',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  TotalHour = 'total_hour',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "other_working_hours" */
export type Other_Working_Hours_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  other_working_hours_id?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
  timesheet_config_id?: InputMaybe<Scalars['String']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  total_hour?: InputMaybe<Scalars['smallint']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Other_Working_Hours_Stddev_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "other_working_hours" */
export type Other_Working_Hours_Stddev_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Other_Working_Hours_Stddev_Pop_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "other_working_hours" */
export type Other_Working_Hours_Stddev_Pop_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Other_Working_Hours_Stddev_Samp_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "other_working_hours" */
export type Other_Working_Hours_Stddev_Samp_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Other_Working_Hours_Sum_Fields = {
  total_hour?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "other_working_hours" */
export type Other_Working_Hours_Sum_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** update columns of table "other_working_hours" */
export enum Other_Working_Hours_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  OtherWorkingHoursId = 'other_working_hours_id',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TimesheetConfigId = 'timesheet_config_id',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  TotalHour = 'total_hour',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Other_Working_Hours_Var_Pop_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "other_working_hours" */
export type Other_Working_Hours_Var_Pop_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Other_Working_Hours_Var_Samp_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "other_working_hours" */
export type Other_Working_Hours_Var_Samp_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Other_Working_Hours_Variance_Fields = {
  total_hour?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "other_working_hours" */
export type Other_Working_Hours_Variance_Order_By = {
  total_hour?: InputMaybe<Order_By>;
};

/** query root */
export type Query_Root = {
  /** fetch data from the table: "lessons" */
  lessons: Array<Lessons>;
  /** fetch aggregated fields from the table: "lessons" */
  lessons_aggregate: Lessons_Aggregate;
  /** fetch data from the table: "lessons" using primary key columns */
  lessons_by_pk?: Maybe<Lessons>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "other_working_hours" */
  other_working_hours: Array<Other_Working_Hours>;
  /** fetch aggregated fields from the table: "other_working_hours" */
  other_working_hours_aggregate: Other_Working_Hours_Aggregate;
  /** fetch data from the table: "other_working_hours" using primary key columns */
  other_working_hours_by_pk?: Maybe<Other_Working_Hours>;
  /** fetch data from the table: "timesheet" */
  timesheet: Array<Timesheet>;
  /** fetch aggregated fields from the table: "timesheet" */
  timesheet_aggregate: Timesheet_Aggregate;
  /** fetch data from the table: "timesheet" using primary key columns */
  timesheet_by_pk?: Maybe<Timesheet>;
  /** fetch data from the table: "timesheet_config" */
  timesheet_config: Array<Timesheet_Config>;
  /** fetch aggregated fields from the table: "timesheet_config" */
  timesheet_config_aggregate: Timesheet_Config_Aggregate;
  /** fetch data from the table: "timesheet_config" using primary key columns */
  timesheet_config_by_pk?: Maybe<Timesheet_Config>;
  /** fetch data from the table: "timesheet_lesson_hours" */
  timesheet_lesson_hours: Array<Timesheet_Lesson_Hours>;
  /** fetch aggregated fields from the table: "timesheet_lesson_hours" */
  timesheet_lesson_hours_aggregate: Timesheet_Lesson_Hours_Aggregate;
  /** fetch data from the table: "timesheet_lesson_hours" using primary key columns */
  timesheet_lesson_hours_by_pk?: Maybe<Timesheet_Lesson_Hours>;
};


/** query root */
export type Query_RootLessonsArgs = {
  distinct_on?: InputMaybe<Array<Lessons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lessons_Order_By>>;
  where?: InputMaybe<Lessons_Bool_Exp>;
};


/** query root */
export type Query_RootLessons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Lessons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lessons_Order_By>>;
  where?: InputMaybe<Lessons_Bool_Exp>;
};


/** query root */
export type Query_RootLessons_By_PkArgs = {
  lesson_id: Scalars['String'];
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
export type Query_RootOther_Working_HoursArgs = {
  distinct_on?: InputMaybe<Array<Other_Working_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Other_Working_Hours_Order_By>>;
  where?: InputMaybe<Other_Working_Hours_Bool_Exp>;
};


/** query root */
export type Query_RootOther_Working_Hours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Other_Working_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Other_Working_Hours_Order_By>>;
  where?: InputMaybe<Other_Working_Hours_Bool_Exp>;
};


/** query root */
export type Query_RootOther_Working_Hours_By_PkArgs = {
  other_working_hours_id: Scalars['String'];
};


/** query root */
export type Query_RootTimesheetArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Order_By>>;
  where?: InputMaybe<Timesheet_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Order_By>>;
  where?: InputMaybe<Timesheet_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_By_PkArgs = {
  timesheet_id: Scalars['String'];
};


/** query root */
export type Query_RootTimesheet_ConfigArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Config_Order_By>>;
  where?: InputMaybe<Timesheet_Config_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Config_Order_By>>;
  where?: InputMaybe<Timesheet_Config_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_Config_By_PkArgs = {
  timesheet_config_id: Scalars['String'];
};


/** query root */
export type Query_RootTimesheet_Lesson_HoursArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Lesson_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Lesson_Hours_Order_By>>;
  where?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_Lesson_Hours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Lesson_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Lesson_Hours_Order_By>>;
  where?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
};


/** query root */
export type Query_RootTimesheet_Lesson_Hours_By_PkArgs = {
  lesson_id: Scalars['String'];
  timesheet_id: Scalars['String'];
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

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "lessons" */
  lessons: Array<Lessons>;
  /** fetch aggregated fields from the table: "lessons" */
  lessons_aggregate: Lessons_Aggregate;
  /** fetch data from the table: "lessons" using primary key columns */
  lessons_by_pk?: Maybe<Lessons>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "other_working_hours" */
  other_working_hours: Array<Other_Working_Hours>;
  /** fetch aggregated fields from the table: "other_working_hours" */
  other_working_hours_aggregate: Other_Working_Hours_Aggregate;
  /** fetch data from the table: "other_working_hours" using primary key columns */
  other_working_hours_by_pk?: Maybe<Other_Working_Hours>;
  /** fetch data from the table: "timesheet" */
  timesheet: Array<Timesheet>;
  /** fetch aggregated fields from the table: "timesheet" */
  timesheet_aggregate: Timesheet_Aggregate;
  /** fetch data from the table: "timesheet" using primary key columns */
  timesheet_by_pk?: Maybe<Timesheet>;
  /** fetch data from the table: "timesheet_config" */
  timesheet_config: Array<Timesheet_Config>;
  /** fetch aggregated fields from the table: "timesheet_config" */
  timesheet_config_aggregate: Timesheet_Config_Aggregate;
  /** fetch data from the table: "timesheet_config" using primary key columns */
  timesheet_config_by_pk?: Maybe<Timesheet_Config>;
  /** fetch data from the table: "timesheet_lesson_hours" */
  timesheet_lesson_hours: Array<Timesheet_Lesson_Hours>;
  /** fetch aggregated fields from the table: "timesheet_lesson_hours" */
  timesheet_lesson_hours_aggregate: Timesheet_Lesson_Hours_Aggregate;
  /** fetch data from the table: "timesheet_lesson_hours" using primary key columns */
  timesheet_lesson_hours_by_pk?: Maybe<Timesheet_Lesson_Hours>;
};


/** subscription root */
export type Subscription_RootLessonsArgs = {
  distinct_on?: InputMaybe<Array<Lessons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lessons_Order_By>>;
  where?: InputMaybe<Lessons_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLessons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Lessons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Lessons_Order_By>>;
  where?: InputMaybe<Lessons_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLessons_By_PkArgs = {
  lesson_id: Scalars['String'];
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
export type Subscription_RootOther_Working_HoursArgs = {
  distinct_on?: InputMaybe<Array<Other_Working_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Other_Working_Hours_Order_By>>;
  where?: InputMaybe<Other_Working_Hours_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOther_Working_Hours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Other_Working_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Other_Working_Hours_Order_By>>;
  where?: InputMaybe<Other_Working_Hours_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOther_Working_Hours_By_PkArgs = {
  other_working_hours_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTimesheetArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Order_By>>;
  where?: InputMaybe<Timesheet_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Order_By>>;
  where?: InputMaybe<Timesheet_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_By_PkArgs = {
  timesheet_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTimesheet_ConfigArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Config_Order_By>>;
  where?: InputMaybe<Timesheet_Config_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Config_Order_By>>;
  where?: InputMaybe<Timesheet_Config_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_Config_By_PkArgs = {
  timesheet_config_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTimesheet_Lesson_HoursArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Lesson_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Lesson_Hours_Order_By>>;
  where?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_Lesson_Hours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Timesheet_Lesson_Hours_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timesheet_Lesson_Hours_Order_By>>;
  where?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTimesheet_Lesson_Hours_By_PkArgs = {
  lesson_id: Scalars['String'];
  timesheet_id: Scalars['String'];
};

/** columns and relationships of "timesheet" */
export type Timesheet = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  staff_id: Scalars['String'];
  time_sheet_status: Scalars['String'];
  timesheet_date: Scalars['timestamptz'];
  timesheet_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "timesheet" */
export type Timesheet_Aggregate = {
  aggregate?: Maybe<Timesheet_Aggregate_Fields>;
  nodes: Array<Timesheet>;
};

/** aggregate fields of "timesheet" */
export type Timesheet_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Timesheet_Max_Fields>;
  min?: Maybe<Timesheet_Min_Fields>;
};


/** aggregate fields of "timesheet" */
export type Timesheet_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Timesheet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "timesheet" */
export type Timesheet_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Timesheet_Max_Order_By>;
  min?: InputMaybe<Timesheet_Min_Order_By>;
};

/** input type for inserting array relation for remote table "timesheet" */
export type Timesheet_Arr_Rel_Insert_Input = {
  data: Array<Timesheet_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_On_Conflict>;
};

/** Boolean expression to filter rows from the table "timesheet". All fields are combined with a logical 'AND'. */
export type Timesheet_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Timesheet_Bool_Exp>>>;
  _not?: InputMaybe<Timesheet_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Timesheet_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  remark?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  staff_id?: InputMaybe<String_Comparison_Exp>;
  time_sheet_status?: InputMaybe<String_Comparison_Exp>;
  timesheet_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  timesheet_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** columns and relationships of "timesheet_config" */
export type Timesheet_Config = {
  config_type: Scalars['String'];
  config_value: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  is_archived: Scalars['Boolean'];
  resource_path?: Maybe<Scalars['String']>;
  timesheet_config_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "timesheet_config" */
export type Timesheet_Config_Aggregate = {
  aggregate?: Maybe<Timesheet_Config_Aggregate_Fields>;
  nodes: Array<Timesheet_Config>;
};

/** aggregate fields of "timesheet_config" */
export type Timesheet_Config_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Timesheet_Config_Max_Fields>;
  min?: Maybe<Timesheet_Config_Min_Fields>;
};


/** aggregate fields of "timesheet_config" */
export type Timesheet_Config_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Timesheet_Config_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "timesheet_config" */
export type Timesheet_Config_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Timesheet_Config_Max_Order_By>;
  min?: InputMaybe<Timesheet_Config_Min_Order_By>;
};

/** input type for inserting array relation for remote table "timesheet_config" */
export type Timesheet_Config_Arr_Rel_Insert_Input = {
  data: Array<Timesheet_Config_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_Config_On_Conflict>;
};

/** Boolean expression to filter rows from the table "timesheet_config". All fields are combined with a logical 'AND'. */
export type Timesheet_Config_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Timesheet_Config_Bool_Exp>>>;
  _not?: InputMaybe<Timesheet_Config_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Timesheet_Config_Bool_Exp>>>;
  config_type?: InputMaybe<String_Comparison_Exp>;
  config_value?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  timesheet_config_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "timesheet_config" */
export enum Timesheet_Config_Constraint {
  /** unique or primary key constraint */
  TimesheetConfigPk = 'timesheet_config__pk'
}

/** input type for inserting data into table "timesheet_config" */
export type Timesheet_Config_Insert_Input = {
  config_type?: InputMaybe<Scalars['String']>;
  config_value?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  resource_path?: InputMaybe<Scalars['String']>;
  timesheet_config_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Timesheet_Config_Max_Fields = {
  config_type?: Maybe<Scalars['String']>;
  config_value?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  timesheet_config_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "timesheet_config" */
export type Timesheet_Config_Max_Order_By = {
  config_type?: InputMaybe<Order_By>;
  config_value?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Timesheet_Config_Min_Fields = {
  config_type?: Maybe<Scalars['String']>;
  config_value?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  timesheet_config_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "timesheet_config" */
export type Timesheet_Config_Min_Order_By = {
  config_type?: InputMaybe<Order_By>;
  config_value?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "timesheet_config" */
export type Timesheet_Config_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Timesheet_Config>;
};

/** input type for inserting object relation for remote table "timesheet_config" */
export type Timesheet_Config_Obj_Rel_Insert_Input = {
  data: Timesheet_Config_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_Config_On_Conflict>;
};

/** on conflict condition type for table "timesheet_config" */
export type Timesheet_Config_On_Conflict = {
  constraint: Timesheet_Config_Constraint;
  update_columns: Array<Timesheet_Config_Update_Column>;
  where?: InputMaybe<Timesheet_Config_Bool_Exp>;
};

/** ordering options when selecting data from "timesheet_config" */
export type Timesheet_Config_Order_By = {
  config_type?: InputMaybe<Order_By>;
  config_value?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_config_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "timesheet_config" */
export type Timesheet_Config_Pk_Columns_Input = {
  timesheet_config_id: Scalars['String'];
};

/** select columns of table "timesheet_config" */
export enum Timesheet_Config_Select_Column {
  /** column name */
  ConfigType = 'config_type',
  /** column name */
  ConfigValue = 'config_value',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimesheetConfigId = 'timesheet_config_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "timesheet_config" */
export type Timesheet_Config_Set_Input = {
  config_type?: InputMaybe<Scalars['String']>;
  config_value?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  resource_path?: InputMaybe<Scalars['String']>;
  timesheet_config_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "timesheet_config" */
export enum Timesheet_Config_Update_Column {
  /** column name */
  ConfigType = 'config_type',
  /** column name */
  ConfigValue = 'config_value',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimesheetConfigId = 'timesheet_config_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** unique or primary key constraints on table "timesheet" */
export enum Timesheet_Constraint {
  /** unique or primary key constraint */
  IdxStaffIdLocationIdTimesheetDate = 'idx__staff_id_location_id_timesheet_date',
  /** unique or primary key constraint */
  TimesheetPk = 'timesheet__pk'
}

/** input type for inserting data into table "timesheet" */
export type Timesheet_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  staff_id?: InputMaybe<Scalars['String']>;
  time_sheet_status?: InputMaybe<Scalars['String']>;
  timesheet_date?: InputMaybe<Scalars['timestamptz']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lesson_id: Scalars['String'];
  resource_path?: Maybe<Scalars['String']>;
  timesheet_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Aggregate = {
  aggregate?: Maybe<Timesheet_Lesson_Hours_Aggregate_Fields>;
  nodes: Array<Timesheet_Lesson_Hours>;
};

/** aggregate fields of "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Timesheet_Lesson_Hours_Max_Fields>;
  min?: Maybe<Timesheet_Lesson_Hours_Min_Fields>;
};


/** aggregate fields of "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Timesheet_Lesson_Hours_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Timesheet_Lesson_Hours_Max_Order_By>;
  min?: InputMaybe<Timesheet_Lesson_Hours_Min_Order_By>;
};

/** input type for inserting array relation for remote table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Arr_Rel_Insert_Input = {
  data: Array<Timesheet_Lesson_Hours_Insert_Input>;
  on_conflict?: InputMaybe<Timesheet_Lesson_Hours_On_Conflict>;
};

/** Boolean expression to filter rows from the table "timesheet_lesson_hours". All fields are combined with a logical 'AND'. */
export type Timesheet_Lesson_Hours_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>>>;
  _not?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  lesson_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  timesheet_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "timesheet_lesson_hours" */
export enum Timesheet_Lesson_Hours_Constraint {
  /** unique or primary key constraint */
  TimesheetLessonHoursPk = 'timesheet_lesson_hours_pk'
}

/** input type for inserting data into table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lesson_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Timesheet_Lesson_Hours_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lesson_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  timesheet_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Timesheet_Lesson_Hours_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  lesson_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  timesheet_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Timesheet_Lesson_Hours>;
};

/** input type for inserting object relation for remote table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Obj_Rel_Insert_Input = {
  data: Timesheet_Lesson_Hours_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_Lesson_Hours_On_Conflict>;
};

/** on conflict condition type for table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_On_Conflict = {
  constraint: Timesheet_Lesson_Hours_Constraint;
  update_columns: Array<Timesheet_Lesson_Hours_Update_Column>;
  where?: InputMaybe<Timesheet_Lesson_Hours_Bool_Exp>;
};

/** ordering options when selecting data from "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  lesson_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Pk_Columns_Input = {
  lesson_id: Scalars['String'];
  timesheet_id: Scalars['String'];
};

/** select columns of table "timesheet_lesson_hours" */
export enum Timesheet_Lesson_Hours_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LessonId = 'lesson_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "timesheet_lesson_hours" */
export type Timesheet_Lesson_Hours_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  lesson_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "timesheet_lesson_hours" */
export enum Timesheet_Lesson_Hours_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LessonId = 'lesson_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate max on columns */
export type Timesheet_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  staff_id?: Maybe<Scalars['String']>;
  time_sheet_status?: Maybe<Scalars['String']>;
  timesheet_date?: Maybe<Scalars['timestamptz']>;
  timesheet_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "timesheet" */
export type Timesheet_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  remark?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  staff_id?: InputMaybe<Order_By>;
  time_sheet_status?: InputMaybe<Order_By>;
  timesheet_date?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Timesheet_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  staff_id?: Maybe<Scalars['String']>;
  time_sheet_status?: Maybe<Scalars['String']>;
  timesheet_date?: Maybe<Scalars['timestamptz']>;
  timesheet_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "timesheet" */
export type Timesheet_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  remark?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  staff_id?: InputMaybe<Order_By>;
  time_sheet_status?: InputMaybe<Order_By>;
  timesheet_date?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "timesheet" */
export type Timesheet_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Timesheet>;
};

/** input type for inserting object relation for remote table "timesheet" */
export type Timesheet_Obj_Rel_Insert_Input = {
  data: Timesheet_Insert_Input;
  on_conflict?: InputMaybe<Timesheet_On_Conflict>;
};

/** on conflict condition type for table "timesheet" */
export type Timesheet_On_Conflict = {
  constraint: Timesheet_Constraint;
  update_columns: Array<Timesheet_Update_Column>;
  where?: InputMaybe<Timesheet_Bool_Exp>;
};

/** ordering options when selecting data from "timesheet" */
export type Timesheet_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  remark?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  staff_id?: InputMaybe<Order_By>;
  time_sheet_status?: InputMaybe<Order_By>;
  timesheet_date?: InputMaybe<Order_By>;
  timesheet_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "timesheet" */
export type Timesheet_Pk_Columns_Input = {
  timesheet_id: Scalars['String'];
};

/** select columns of table "timesheet" */
export enum Timesheet_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  Remark = 'remark',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StaffId = 'staff_id',
  /** column name */
  TimeSheetStatus = 'time_sheet_status',
  /** column name */
  TimesheetDate = 'timesheet_date',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "timesheet" */
export type Timesheet_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  staff_id?: InputMaybe<Scalars['String']>;
  time_sheet_status?: InputMaybe<Scalars['String']>;
  timesheet_date?: InputMaybe<Scalars['timestamptz']>;
  timesheet_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "timesheet" */
export enum Timesheet_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  Remark = 'remark',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StaffId = 'staff_id',
  /** column name */
  TimeSheetStatus = 'time_sheet_status',
  /** column name */
  TimesheetDate = 'timesheet_date',
  /** column name */
  TimesheetId = 'timesheet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

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
