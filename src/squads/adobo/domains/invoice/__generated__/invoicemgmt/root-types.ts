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
  date: string;
  jsonb: any;
  numeric: number;
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

/** columns and relationships of "bill_item" */
export type Bill_Item = {
  bill_item_sequence_number: Scalars['Int'];
  bill_type: Scalars['String'];
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_item_description?: Maybe<Scalars['jsonb']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status: Scalars['String'];
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at: Scalars['timestamptz'];
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  final_price: Scalars['numeric'];
  location_id: Scalars['String'];
  location_name?: Maybe<Scalars['String']>;
  order_id: Scalars['String'];
  product_description: Scalars['String'];
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  /** An object relationship */
  students: Students;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "bill_item" */
export type Bill_ItemBilling_Item_DescriptionArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "bill_item" */
export type Bill_Item_Aggregate = {
  aggregate?: Maybe<Bill_Item_Aggregate_Fields>;
  nodes: Array<Bill_Item>;
};

/** aggregate fields of "bill_item" */
export type Bill_Item_Aggregate_Fields = {
  avg?: Maybe<Bill_Item_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Bill_Item_Max_Fields>;
  min?: Maybe<Bill_Item_Min_Fields>;
  stddev?: Maybe<Bill_Item_Stddev_Fields>;
  stddev_pop?: Maybe<Bill_Item_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Bill_Item_Stddev_Samp_Fields>;
  sum?: Maybe<Bill_Item_Sum_Fields>;
  var_pop?: Maybe<Bill_Item_Var_Pop_Fields>;
  var_samp?: Maybe<Bill_Item_Var_Samp_Fields>;
  variance?: Maybe<Bill_Item_Variance_Fields>;
};


/** aggregate fields of "bill_item" */
export type Bill_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Bill_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "bill_item" */
export type Bill_Item_Aggregate_Order_By = {
  avg?: InputMaybe<Bill_Item_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Bill_Item_Max_Order_By>;
  min?: InputMaybe<Bill_Item_Min_Order_By>;
  stddev?: InputMaybe<Bill_Item_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Bill_Item_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Bill_Item_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Bill_Item_Sum_Order_By>;
  var_pop?: InputMaybe<Bill_Item_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Bill_Item_Var_Samp_Order_By>;
  variance?: InputMaybe<Bill_Item_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Bill_Item_Append_Input = {
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "bill_item" */
export type Bill_Item_Arr_Rel_Insert_Input = {
  data: Array<Bill_Item_Insert_Input>;
  on_conflict?: InputMaybe<Bill_Item_On_Conflict>;
};

/** aggregate avg on columns */
export type Bill_Item_Avg_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "bill_item" */
export type Bill_Item_Avg_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "bill_item". All fields are combined with a logical 'AND'. */
export type Bill_Item_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Bill_Item_Bool_Exp>>>;
  _not?: InputMaybe<Bill_Item_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Bill_Item_Bool_Exp>>>;
  bill_item_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  bill_type?: InputMaybe<String_Comparison_Exp>;
  billing_approval_status?: InputMaybe<String_Comparison_Exp>;
  billing_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_item_description?: InputMaybe<Jsonb_Comparison_Exp>;
  billing_schedule_period_id?: InputMaybe<String_Comparison_Exp>;
  billing_status?: InputMaybe<String_Comparison_Exp>;
  billing_to?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discount_amount?: InputMaybe<Numeric_Comparison_Exp>;
  discount_amount_type?: InputMaybe<String_Comparison_Exp>;
  discount_amount_value?: InputMaybe<Numeric_Comparison_Exp>;
  final_price?: InputMaybe<Numeric_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  location_name?: InputMaybe<String_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  product_description?: InputMaybe<String_Comparison_Exp>;
  product_pricing?: InputMaybe<Int_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  students?: InputMaybe<Students_Bool_Exp>;
  tax_amount?: InputMaybe<Numeric_Comparison_Exp>;
  tax_category?: InputMaybe<String_Comparison_Exp>;
  tax_id?: InputMaybe<String_Comparison_Exp>;
  tax_percentage?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "bill_item" */
export enum Bill_Item_Constraint {
  /** unique or primary key constraint */
  BillItemProductPk = 'bill_item_product_pk',
  /** unique or primary key constraint */
  BillItemSequenceNumberResourcePathUnique = 'bill_item_sequence_number_resource_path_unique'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Bill_Item_Delete_At_Path_Input = {
  billing_item_description?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Bill_Item_Delete_Elem_Input = {
  billing_item_description?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Bill_Item_Delete_Key_Input = {
  billing_item_description?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "bill_item" */
export type Bill_Item_Inc_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "bill_item" */
export type Bill_Item_Insert_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  bill_type?: InputMaybe<Scalars['String']>;
  billing_approval_status?: InputMaybe<Scalars['String']>;
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_from?: InputMaybe<Scalars['timestamptz']>;
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  billing_status?: InputMaybe<Scalars['String']>;
  billing_to?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_name?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  product_description?: InputMaybe<Scalars['String']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  students?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Bill_Item_Max_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  bill_type?: Maybe<Scalars['String']>;
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status?: Maybe<Scalars['String']>;
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  final_price?: Maybe<Scalars['numeric']>;
  location_id?: Maybe<Scalars['String']>;
  location_name?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  product_description?: Maybe<Scalars['String']>;
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "bill_item" */
export type Bill_Item_Max_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bill_Item_Min_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  bill_type?: Maybe<Scalars['String']>;
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status?: Maybe<Scalars['String']>;
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  final_price?: Maybe<Scalars['numeric']>;
  location_id?: Maybe<Scalars['String']>;
  location_name?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  product_description?: Maybe<Scalars['String']>;
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "bill_item" */
export type Bill_Item_Min_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "bill_item" */
export type Bill_Item_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Bill_Item>;
};

/** input type for inserting object relation for remote table "bill_item" */
export type Bill_Item_Obj_Rel_Insert_Input = {
  data: Bill_Item_Insert_Input;
  on_conflict?: InputMaybe<Bill_Item_On_Conflict>;
};

/** on conflict condition type for table "bill_item" */
export type Bill_Item_On_Conflict = {
  constraint: Bill_Item_Constraint;
  update_columns: Array<Bill_Item_Update_Column>;
  where?: InputMaybe<Bill_Item_Bool_Exp>;
};

/** ordering options when selecting data from "bill_item" */
export type Bill_Item_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_item_description?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  students?: InputMaybe<Students_Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "bill_item" */
export type Bill_Item_Pk_Columns_Input = {
  bill_item_sequence_number: Scalars['Int'];
  order_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Bill_Item_Prepend_Input = {
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "bill_item" */
export enum Bill_Item_Select_Column {
  /** column name */
  BillItemSequenceNumber = 'bill_item_sequence_number',
  /** column name */
  BillType = 'bill_type',
  /** column name */
  BillingApprovalStatus = 'billing_approval_status',
  /** column name */
  BillingDate = 'billing_date',
  /** column name */
  BillingFrom = 'billing_from',
  /** column name */
  BillingItemDescription = 'billing_item_description',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  BillingStatus = 'billing_status',
  /** column name */
  BillingTo = 'billing_to',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountAmount = 'discount_amount',
  /** column name */
  DiscountAmountType = 'discount_amount_type',
  /** column name */
  DiscountAmountValue = 'discount_amount_value',
  /** column name */
  FinalPrice = 'final_price',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ProductDescription = 'product_description',
  /** column name */
  ProductPricing = 'product_pricing',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  TaxAmount = 'tax_amount',
  /** column name */
  TaxCategory = 'tax_category',
  /** column name */
  TaxId = 'tax_id',
  /** column name */
  TaxPercentage = 'tax_percentage',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "bill_item" */
export type Bill_Item_Set_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  bill_type?: InputMaybe<Scalars['String']>;
  billing_approval_status?: InputMaybe<Scalars['String']>;
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_from?: InputMaybe<Scalars['timestamptz']>;
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  billing_status?: InputMaybe<Scalars['String']>;
  billing_to?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_name?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  product_description?: InputMaybe<Scalars['String']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Bill_Item_Stddev_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "bill_item" */
export type Bill_Item_Stddev_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Bill_Item_Stddev_Pop_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "bill_item" */
export type Bill_Item_Stddev_Pop_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Bill_Item_Stddev_Samp_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "bill_item" */
export type Bill_Item_Stddev_Samp_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Bill_Item_Sum_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  final_price?: Maybe<Scalars['numeric']>;
  product_pricing?: Maybe<Scalars['Int']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_percentage?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "bill_item" */
export type Bill_Item_Sum_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** update columns of table "bill_item" */
export enum Bill_Item_Update_Column {
  /** column name */
  BillItemSequenceNumber = 'bill_item_sequence_number',
  /** column name */
  BillType = 'bill_type',
  /** column name */
  BillingApprovalStatus = 'billing_approval_status',
  /** column name */
  BillingDate = 'billing_date',
  /** column name */
  BillingFrom = 'billing_from',
  /** column name */
  BillingItemDescription = 'billing_item_description',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  BillingStatus = 'billing_status',
  /** column name */
  BillingTo = 'billing_to',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountAmount = 'discount_amount',
  /** column name */
  DiscountAmountType = 'discount_amount_type',
  /** column name */
  DiscountAmountValue = 'discount_amount_value',
  /** column name */
  FinalPrice = 'final_price',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ProductDescription = 'product_description',
  /** column name */
  ProductPricing = 'product_pricing',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  TaxAmount = 'tax_amount',
  /** column name */
  TaxCategory = 'tax_category',
  /** column name */
  TaxId = 'tax_id',
  /** column name */
  TaxPercentage = 'tax_percentage',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Bill_Item_Var_Pop_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "bill_item" */
export type Bill_Item_Var_Pop_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Bill_Item_Var_Samp_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "bill_item" */
export type Bill_Item_Var_Samp_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Bill_Item_Variance_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "bill_item" */
export type Bill_Item_Variance_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** columns and relationships of "invoice" */
export type Invoice = {
  created_at: Scalars['timestamptz'];
  invoice_id: Scalars['String'];
  invoice_sequence_number?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  student_id: Scalars['String'];
  sub_total: Scalars['numeric'];
  total: Scalars['numeric'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** columns and relationships of "invoice_action_log" */
export type Invoice_Action_Log = {
  action: Scalars['String'];
  action_comment: Scalars['String'];
  action_detail: Scalars['String'];
  created_at: Scalars['timestamptz'];
  invoice_action_id: Scalars['String'];
  invoice_id: Scalars['String'];
  resource_path?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
};

/** aggregated selection of "invoice_action_log" */
export type Invoice_Action_Log_Aggregate = {
  aggregate?: Maybe<Invoice_Action_Log_Aggregate_Fields>;
  nodes: Array<Invoice_Action_Log>;
};

/** aggregate fields of "invoice_action_log" */
export type Invoice_Action_Log_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Invoice_Action_Log_Max_Fields>;
  min?: Maybe<Invoice_Action_Log_Min_Fields>;
};


/** aggregate fields of "invoice_action_log" */
export type Invoice_Action_Log_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invoice_Action_Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "invoice_action_log" */
export type Invoice_Action_Log_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invoice_Action_Log_Max_Order_By>;
  min?: InputMaybe<Invoice_Action_Log_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invoice_action_log" */
export type Invoice_Action_Log_Arr_Rel_Insert_Input = {
  data: Array<Invoice_Action_Log_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_Action_Log_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invoice_action_log". All fields are combined with a logical 'AND'. */
export type Invoice_Action_Log_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Invoice_Action_Log_Bool_Exp>>>;
  _not?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Invoice_Action_Log_Bool_Exp>>>;
  action?: InputMaybe<String_Comparison_Exp>;
  action_comment?: InputMaybe<String_Comparison_Exp>;
  action_detail?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invoice_action_id?: InputMaybe<String_Comparison_Exp>;
  invoice_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "invoice_action_log" */
export enum Invoice_Action_Log_Constraint {
  /** unique or primary key constraint */
  InvoiceActionLogPk = 'invoice_action_log_pk'
}

/** input type for inserting data into table "invoice_action_log" */
export type Invoice_Action_Log_Insert_Input = {
  action?: InputMaybe<Scalars['String']>;
  action_comment?: InputMaybe<Scalars['String']>;
  action_detail?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_action_id?: InputMaybe<Scalars['String']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Invoice_Action_Log_Max_Fields = {
  action?: Maybe<Scalars['String']>;
  action_comment?: Maybe<Scalars['String']>;
  action_detail?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_action_id?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "invoice_action_log" */
export type Invoice_Action_Log_Max_Order_By = {
  action?: InputMaybe<Order_By>;
  action_comment?: InputMaybe<Order_By>;
  action_detail?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_action_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invoice_Action_Log_Min_Fields = {
  action?: Maybe<Scalars['String']>;
  action_comment?: Maybe<Scalars['String']>;
  action_detail?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_action_id?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "invoice_action_log" */
export type Invoice_Action_Log_Min_Order_By = {
  action?: InputMaybe<Order_By>;
  action_comment?: InputMaybe<Order_By>;
  action_detail?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_action_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invoice_action_log" */
export type Invoice_Action_Log_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Invoice_Action_Log>;
};

/** input type for inserting object relation for remote table "invoice_action_log" */
export type Invoice_Action_Log_Obj_Rel_Insert_Input = {
  data: Invoice_Action_Log_Insert_Input;
  on_conflict?: InputMaybe<Invoice_Action_Log_On_Conflict>;
};

/** on conflict condition type for table "invoice_action_log" */
export type Invoice_Action_Log_On_Conflict = {
  constraint: Invoice_Action_Log_Constraint;
  update_columns: Array<Invoice_Action_Log_Update_Column>;
  where?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
};

/** ordering options when selecting data from "invoice_action_log" */
export type Invoice_Action_Log_Order_By = {
  action?: InputMaybe<Order_By>;
  action_comment?: InputMaybe<Order_By>;
  action_detail?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_action_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "invoice_action_log" */
export type Invoice_Action_Log_Pk_Columns_Input = {
  invoice_action_id: Scalars['String'];
};

/** select columns of table "invoice_action_log" */
export enum Invoice_Action_Log_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  ActionComment = 'action_comment',
  /** column name */
  ActionDetail = 'action_detail',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceActionId = 'invoice_action_id',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "invoice_action_log" */
export type Invoice_Action_Log_Set_Input = {
  action?: InputMaybe<Scalars['String']>;
  action_comment?: InputMaybe<Scalars['String']>;
  action_detail?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_action_id?: InputMaybe<Scalars['String']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "invoice_action_log" */
export enum Invoice_Action_Log_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  ActionComment = 'action_comment',
  /** column name */
  ActionDetail = 'action_detail',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceActionId = 'invoice_action_id',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregated selection of "invoice" */
export type Invoice_Aggregate = {
  aggregate?: Maybe<Invoice_Aggregate_Fields>;
  nodes: Array<Invoice>;
};

/** aggregate fields of "invoice" */
export type Invoice_Aggregate_Fields = {
  avg?: Maybe<Invoice_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Invoice_Max_Fields>;
  min?: Maybe<Invoice_Min_Fields>;
  stddev?: Maybe<Invoice_Stddev_Fields>;
  stddev_pop?: Maybe<Invoice_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invoice_Stddev_Samp_Fields>;
  sum?: Maybe<Invoice_Sum_Fields>;
  var_pop?: Maybe<Invoice_Var_Pop_Fields>;
  var_samp?: Maybe<Invoice_Var_Samp_Fields>;
  variance?: Maybe<Invoice_Variance_Fields>;
};


/** aggregate fields of "invoice" */
export type Invoice_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invoice_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "invoice" */
export type Invoice_Aggregate_Order_By = {
  avg?: InputMaybe<Invoice_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invoice_Max_Order_By>;
  min?: InputMaybe<Invoice_Min_Order_By>;
  stddev?: InputMaybe<Invoice_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Invoice_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Invoice_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Invoice_Sum_Order_By>;
  var_pop?: InputMaybe<Invoice_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Invoice_Var_Samp_Order_By>;
  variance?: InputMaybe<Invoice_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "invoice" */
export type Invoice_Arr_Rel_Insert_Input = {
  data: Array<Invoice_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_On_Conflict>;
};

/** aggregate avg on columns */
export type Invoice_Avg_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "invoice" */
export type Invoice_Avg_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** columns and relationships of "invoice_bill_item" */
export type Invoice_Bill_Item = {
  bill_item_sequence_number: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  invoice_bill_item_id: Scalars['String'];
  invoice_id: Scalars['String'];
  past_billing_status: Scalars['String'];
  resource_path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "invoice_bill_item" */
export type Invoice_Bill_Item_Aggregate = {
  aggregate?: Maybe<Invoice_Bill_Item_Aggregate_Fields>;
  nodes: Array<Invoice_Bill_Item>;
};

/** aggregate fields of "invoice_bill_item" */
export type Invoice_Bill_Item_Aggregate_Fields = {
  avg?: Maybe<Invoice_Bill_Item_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Invoice_Bill_Item_Max_Fields>;
  min?: Maybe<Invoice_Bill_Item_Min_Fields>;
  stddev?: Maybe<Invoice_Bill_Item_Stddev_Fields>;
  stddev_pop?: Maybe<Invoice_Bill_Item_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invoice_Bill_Item_Stddev_Samp_Fields>;
  sum?: Maybe<Invoice_Bill_Item_Sum_Fields>;
  var_pop?: Maybe<Invoice_Bill_Item_Var_Pop_Fields>;
  var_samp?: Maybe<Invoice_Bill_Item_Var_Samp_Fields>;
  variance?: Maybe<Invoice_Bill_Item_Variance_Fields>;
};


/** aggregate fields of "invoice_bill_item" */
export type Invoice_Bill_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invoice_Bill_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "invoice_bill_item" */
export type Invoice_Bill_Item_Aggregate_Order_By = {
  avg?: InputMaybe<Invoice_Bill_Item_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invoice_Bill_Item_Max_Order_By>;
  min?: InputMaybe<Invoice_Bill_Item_Min_Order_By>;
  stddev?: InputMaybe<Invoice_Bill_Item_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Invoice_Bill_Item_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Invoice_Bill_Item_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Invoice_Bill_Item_Sum_Order_By>;
  var_pop?: InputMaybe<Invoice_Bill_Item_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Invoice_Bill_Item_Var_Samp_Order_By>;
  variance?: InputMaybe<Invoice_Bill_Item_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "invoice_bill_item" */
export type Invoice_Bill_Item_Arr_Rel_Insert_Input = {
  data: Array<Invoice_Bill_Item_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_Bill_Item_On_Conflict>;
};

/** aggregate avg on columns */
export type Invoice_Bill_Item_Avg_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Avg_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invoice_bill_item". All fields are combined with a logical 'AND'. */
export type Invoice_Bill_Item_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Invoice_Bill_Item_Bool_Exp>>>;
  _not?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Invoice_Bill_Item_Bool_Exp>>>;
  bill_item_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invoice_bill_item_id?: InputMaybe<String_Comparison_Exp>;
  invoice_id?: InputMaybe<String_Comparison_Exp>;
  past_billing_status?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "invoice_bill_item" */
export enum Invoice_Bill_Item_Constraint {
  /** unique or primary key constraint */
  InvoiceBillItemPk = 'invoice_bill_item_pk'
}

/** input type for incrementing integer column in table "invoice_bill_item" */
export type Invoice_Bill_Item_Inc_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "invoice_bill_item" */
export type Invoice_Bill_Item_Insert_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_bill_item_id?: InputMaybe<Scalars['String']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  past_billing_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Invoice_Bill_Item_Max_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_bill_item_id?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['String']>;
  past_billing_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Max_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_bill_item_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  past_billing_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invoice_Bill_Item_Min_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_bill_item_id?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['String']>;
  past_billing_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Min_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_bill_item_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  past_billing_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invoice_bill_item" */
export type Invoice_Bill_Item_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Invoice_Bill_Item>;
};

/** input type for inserting object relation for remote table "invoice_bill_item" */
export type Invoice_Bill_Item_Obj_Rel_Insert_Input = {
  data: Invoice_Bill_Item_Insert_Input;
  on_conflict?: InputMaybe<Invoice_Bill_Item_On_Conflict>;
};

/** on conflict condition type for table "invoice_bill_item" */
export type Invoice_Bill_Item_On_Conflict = {
  constraint: Invoice_Bill_Item_Constraint;
  update_columns: Array<Invoice_Bill_Item_Update_Column>;
  where?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
};

/** ordering options when selecting data from "invoice_bill_item" */
export type Invoice_Bill_Item_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invoice_bill_item_id?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  past_billing_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "invoice_bill_item" */
export type Invoice_Bill_Item_Pk_Columns_Input = {
  invoice_bill_item_id: Scalars['String'];
};

/** select columns of table "invoice_bill_item" */
export enum Invoice_Bill_Item_Select_Column {
  /** column name */
  BillItemSequenceNumber = 'bill_item_sequence_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceBillItemId = 'invoice_bill_item_id',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  PastBillingStatus = 'past_billing_status',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "invoice_bill_item" */
export type Invoice_Bill_Item_Set_Input = {
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_bill_item_id?: InputMaybe<Scalars['String']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  past_billing_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Invoice_Bill_Item_Stddev_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Stddev_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Invoice_Bill_Item_Stddev_Pop_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Stddev_Pop_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Invoice_Bill_Item_Stddev_Samp_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Stddev_Samp_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Invoice_Bill_Item_Sum_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Sum_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** update columns of table "invoice_bill_item" */
export enum Invoice_Bill_Item_Update_Column {
  /** column name */
  BillItemSequenceNumber = 'bill_item_sequence_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceBillItemId = 'invoice_bill_item_id',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  PastBillingStatus = 'past_billing_status',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate var_pop on columns */
export type Invoice_Bill_Item_Var_Pop_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Var_Pop_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Invoice_Bill_Item_Var_Samp_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Var_Samp_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Invoice_Bill_Item_Variance_Fields = {
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "invoice_bill_item" */
export type Invoice_Bill_Item_Variance_Order_By = {
  bill_item_sequence_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invoice". All fields are combined with a logical 'AND'. */
export type Invoice_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Invoice_Bool_Exp>>>;
  _not?: InputMaybe<Invoice_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Invoice_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invoice_id?: InputMaybe<String_Comparison_Exp>;
  invoice_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  sub_total?: InputMaybe<Numeric_Comparison_Exp>;
  total?: InputMaybe<Numeric_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "invoice" */
export enum Invoice_Constraint {
  /** unique or primary key constraint */
  InvoicePk = 'invoice_pk',
  /** unique or primary key constraint */
  InvoiceSequenceNumberResourcePathUnique = 'invoice_sequence_number_resource_path_unique'
}

/** input type for incrementing integer column in table "invoice" */
export type Invoice_Inc_Input = {
  invoice_sequence_number?: InputMaybe<Scalars['Int']>;
  sub_total?: InputMaybe<Scalars['numeric']>;
  total?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "invoice" */
export type Invoice_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  invoice_sequence_number?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  sub_total?: InputMaybe<Scalars['numeric']>;
  total?: InputMaybe<Scalars['numeric']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Invoice_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_id?: Maybe<Scalars['String']>;
  invoice_sequence_number?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  sub_total?: Maybe<Scalars['numeric']>;
  total?: Maybe<Scalars['numeric']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "invoice" */
export type Invoice_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  invoice_sequence_number?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invoice_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_id?: Maybe<Scalars['String']>;
  invoice_sequence_number?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  sub_total?: Maybe<Scalars['numeric']>;
  total?: Maybe<Scalars['numeric']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "invoice" */
export type Invoice_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  invoice_sequence_number?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invoice" */
export type Invoice_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Invoice>;
};

/** input type for inserting object relation for remote table "invoice" */
export type Invoice_Obj_Rel_Insert_Input = {
  data: Invoice_Insert_Input;
  on_conflict?: InputMaybe<Invoice_On_Conflict>;
};

/** on conflict condition type for table "invoice" */
export type Invoice_On_Conflict = {
  constraint: Invoice_Constraint;
  update_columns: Array<Invoice_Update_Column>;
  where?: InputMaybe<Invoice_Bool_Exp>;
};

/** ordering options when selecting data from "invoice" */
export type Invoice_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  invoice_sequence_number?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "invoice" */
export type Invoice_Pk_Columns_Input = {
  invoice_id: Scalars['String'];
};

/** select columns of table "invoice" */
export enum Invoice_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  InvoiceSequenceNumber = 'invoice_sequence_number',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  SubTotal = 'sub_total',
  /** column name */
  Total = 'total',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "invoice" */
export type Invoice_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  invoice_sequence_number?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  sub_total?: InputMaybe<Scalars['numeric']>;
  total?: InputMaybe<Scalars['numeric']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Invoice_Stddev_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "invoice" */
export type Invoice_Stddev_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Invoice_Stddev_Pop_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "invoice" */
export type Invoice_Stddev_Pop_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Invoice_Stddev_Samp_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "invoice" */
export type Invoice_Stddev_Samp_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Invoice_Sum_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Int']>;
  sub_total?: Maybe<Scalars['numeric']>;
  total?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "invoice" */
export type Invoice_Sum_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** update columns of table "invoice" */
export enum Invoice_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  InvoiceSequenceNumber = 'invoice_sequence_number',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  SubTotal = 'sub_total',
  /** column name */
  Total = 'total',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Invoice_Var_Pop_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "invoice" */
export type Invoice_Var_Pop_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Invoice_Var_Samp_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "invoice" */
export type Invoice_Var_Samp_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Invoice_Variance_Fields = {
  invoice_sequence_number?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "invoice" */
export type Invoice_Variance_Order_By = {
  invoice_sequence_number?: InputMaybe<Order_By>;
  sub_total?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
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

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "bill_item" */
  delete_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** delete single row from the table: "bill_item" */
  delete_bill_item_by_pk?: Maybe<Bill_Item>;
  /** delete data from the table: "invoice" */
  delete_invoice?: Maybe<Invoice_Mutation_Response>;
  /** delete data from the table: "invoice_action_log" */
  delete_invoice_action_log?: Maybe<Invoice_Action_Log_Mutation_Response>;
  /** delete single row from the table: "invoice_action_log" */
  delete_invoice_action_log_by_pk?: Maybe<Invoice_Action_Log>;
  /** delete data from the table: "invoice_bill_item" */
  delete_invoice_bill_item?: Maybe<Invoice_Bill_Item_Mutation_Response>;
  /** delete single row from the table: "invoice_bill_item" */
  delete_invoice_bill_item_by_pk?: Maybe<Invoice_Bill_Item>;
  /** delete single row from the table: "invoice" */
  delete_invoice_by_pk?: Maybe<Invoice>;
  /** delete data from the table: "payment" */
  delete_payment?: Maybe<Payment_Mutation_Response>;
  /** delete single row from the table: "payment" */
  delete_payment_by_pk?: Maybe<Payment>;
  /** delete data from the table: "students" */
  delete_students?: Maybe<Students_Mutation_Response>;
  /** delete single row from the table: "students" */
  delete_students_by_pk?: Maybe<Students>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "bill_item" */
  insert_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** insert a single row into the table: "bill_item" */
  insert_bill_item_one?: Maybe<Bill_Item>;
  /** insert data into the table: "invoice" */
  insert_invoice?: Maybe<Invoice_Mutation_Response>;
  /** insert data into the table: "invoice_action_log" */
  insert_invoice_action_log?: Maybe<Invoice_Action_Log_Mutation_Response>;
  /** insert a single row into the table: "invoice_action_log" */
  insert_invoice_action_log_one?: Maybe<Invoice_Action_Log>;
  /** insert data into the table: "invoice_bill_item" */
  insert_invoice_bill_item?: Maybe<Invoice_Bill_Item_Mutation_Response>;
  /** insert a single row into the table: "invoice_bill_item" */
  insert_invoice_bill_item_one?: Maybe<Invoice_Bill_Item>;
  /** insert a single row into the table: "invoice" */
  insert_invoice_one?: Maybe<Invoice>;
  /** insert data into the table: "payment" */
  insert_payment?: Maybe<Payment_Mutation_Response>;
  /** insert a single row into the table: "payment" */
  insert_payment_one?: Maybe<Payment>;
  /** insert data into the table: "students" */
  insert_students?: Maybe<Students_Mutation_Response>;
  /** insert a single row into the table: "students" */
  insert_students_one?: Maybe<Students>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "bill_item" */
  update_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** update single row of the table: "bill_item" */
  update_bill_item_by_pk?: Maybe<Bill_Item>;
  /** update data of the table: "invoice" */
  update_invoice?: Maybe<Invoice_Mutation_Response>;
  /** update data of the table: "invoice_action_log" */
  update_invoice_action_log?: Maybe<Invoice_Action_Log_Mutation_Response>;
  /** update single row of the table: "invoice_action_log" */
  update_invoice_action_log_by_pk?: Maybe<Invoice_Action_Log>;
  /** update data of the table: "invoice_bill_item" */
  update_invoice_bill_item?: Maybe<Invoice_Bill_Item_Mutation_Response>;
  /** update single row of the table: "invoice_bill_item" */
  update_invoice_bill_item_by_pk?: Maybe<Invoice_Bill_Item>;
  /** update single row of the table: "invoice" */
  update_invoice_by_pk?: Maybe<Invoice>;
  /** update data of the table: "payment" */
  update_payment?: Maybe<Payment_Mutation_Response>;
  /** update single row of the table: "payment" */
  update_payment_by_pk?: Maybe<Payment>;
  /** update data of the table: "students" */
  update_students?: Maybe<Students_Mutation_Response>;
  /** update single row of the table: "students" */
  update_students_by_pk?: Maybe<Students>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_Bill_ItemArgs = {
  where: Bill_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Bill_Item_By_PkArgs = {
  bill_item_sequence_number: Scalars['Int'];
  order_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_InvoiceArgs = {
  where: Invoice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invoice_Action_LogArgs = {
  where: Invoice_Action_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invoice_Action_Log_By_PkArgs = {
  invoice_action_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Invoice_Bill_ItemArgs = {
  where: Invoice_Bill_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invoice_Bill_Item_By_PkArgs = {
  invoice_bill_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Invoice_By_PkArgs = {
  invoice_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PaymentArgs = {
  where: Payment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payment_By_PkArgs = {
  payment_id: Scalars['String'];
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
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_Bill_ItemArgs = {
  objects: Array<Bill_Item_Insert_Input>;
  on_conflict?: InputMaybe<Bill_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bill_Item_OneArgs = {
  object: Bill_Item_Insert_Input;
  on_conflict?: InputMaybe<Bill_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvoiceArgs = {
  objects: Array<Invoice_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invoice_Action_LogArgs = {
  objects: Array<Invoice_Action_Log_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_Action_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invoice_Action_Log_OneArgs = {
  object: Invoice_Action_Log_Insert_Input;
  on_conflict?: InputMaybe<Invoice_Action_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invoice_Bill_ItemArgs = {
  objects: Array<Invoice_Bill_Item_Insert_Input>;
  on_conflict?: InputMaybe<Invoice_Bill_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invoice_Bill_Item_OneArgs = {
  object: Invoice_Bill_Item_Insert_Input;
  on_conflict?: InputMaybe<Invoice_Bill_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invoice_OneArgs = {
  object: Invoice_Insert_Input;
  on_conflict?: InputMaybe<Invoice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PaymentArgs = {
  objects: Array<Payment_Insert_Input>;
  on_conflict?: InputMaybe<Payment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_OneArgs = {
  object: Payment_Insert_Input;
  on_conflict?: InputMaybe<Payment_On_Conflict>;
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
export type Mutation_RootUpdate_Bill_ItemArgs = {
  _append?: InputMaybe<Bill_Item_Append_Input>;
  _delete_at_path?: InputMaybe<Bill_Item_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Bill_Item_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Bill_Item_Delete_Key_Input>;
  _inc?: InputMaybe<Bill_Item_Inc_Input>;
  _prepend?: InputMaybe<Bill_Item_Prepend_Input>;
  _set?: InputMaybe<Bill_Item_Set_Input>;
  where: Bill_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bill_Item_By_PkArgs = {
  _append?: InputMaybe<Bill_Item_Append_Input>;
  _delete_at_path?: InputMaybe<Bill_Item_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Bill_Item_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Bill_Item_Delete_Key_Input>;
  _inc?: InputMaybe<Bill_Item_Inc_Input>;
  _prepend?: InputMaybe<Bill_Item_Prepend_Input>;
  _set?: InputMaybe<Bill_Item_Set_Input>;
  pk_columns: Bill_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InvoiceArgs = {
  _inc?: InputMaybe<Invoice_Inc_Input>;
  _set?: InputMaybe<Invoice_Set_Input>;
  where: Invoice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invoice_Action_LogArgs = {
  _set?: InputMaybe<Invoice_Action_Log_Set_Input>;
  where: Invoice_Action_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invoice_Action_Log_By_PkArgs = {
  _set?: InputMaybe<Invoice_Action_Log_Set_Input>;
  pk_columns: Invoice_Action_Log_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invoice_Bill_ItemArgs = {
  _inc?: InputMaybe<Invoice_Bill_Item_Inc_Input>;
  _set?: InputMaybe<Invoice_Bill_Item_Set_Input>;
  where: Invoice_Bill_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invoice_Bill_Item_By_PkArgs = {
  _inc?: InputMaybe<Invoice_Bill_Item_Inc_Input>;
  _set?: InputMaybe<Invoice_Bill_Item_Set_Input>;
  pk_columns: Invoice_Bill_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invoice_By_PkArgs = {
  _inc?: InputMaybe<Invoice_Inc_Input>;
  _set?: InputMaybe<Invoice_Set_Input>;
  pk_columns: Invoice_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PaymentArgs = {
  _inc?: InputMaybe<Payment_Inc_Input>;
  _set?: InputMaybe<Payment_Set_Input>;
  where: Payment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_By_PkArgs = {
  _inc?: InputMaybe<Payment_Inc_Input>;
  _set?: InputMaybe<Payment_Set_Input>;
  pk_columns: Payment_Pk_Columns_Input;
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
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
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

/** columns and relationships of "payment" */
export type Payment = {
  created_at: Scalars['timestamptz'];
  invoice_id: Scalars['String'];
  payment_date?: Maybe<Scalars['timestamptz']>;
  payment_due_date: Scalars['timestamptz'];
  payment_expiry_date: Scalars['timestamptz'];
  payment_id: Scalars['String'];
  payment_method: Scalars['String'];
  payment_sequence_number?: Maybe<Scalars['Int']>;
  payment_status: Scalars['String'];
  resource_path?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "payment" */
export type Payment_Aggregate = {
  aggregate?: Maybe<Payment_Aggregate_Fields>;
  nodes: Array<Payment>;
};

/** aggregate fields of "payment" */
export type Payment_Aggregate_Fields = {
  avg?: Maybe<Payment_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Payment_Max_Fields>;
  min?: Maybe<Payment_Min_Fields>;
  stddev?: Maybe<Payment_Stddev_Fields>;
  stddev_pop?: Maybe<Payment_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payment_Stddev_Samp_Fields>;
  sum?: Maybe<Payment_Sum_Fields>;
  var_pop?: Maybe<Payment_Var_Pop_Fields>;
  var_samp?: Maybe<Payment_Var_Samp_Fields>;
  variance?: Maybe<Payment_Variance_Fields>;
};


/** aggregate fields of "payment" */
export type Payment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Payment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payment" */
export type Payment_Aggregate_Order_By = {
  avg?: InputMaybe<Payment_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Payment_Max_Order_By>;
  min?: InputMaybe<Payment_Min_Order_By>;
  stddev?: InputMaybe<Payment_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Payment_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Payment_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Payment_Sum_Order_By>;
  var_pop?: InputMaybe<Payment_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Payment_Var_Samp_Order_By>;
  variance?: InputMaybe<Payment_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment" */
export type Payment_Arr_Rel_Insert_Input = {
  data: Array<Payment_Insert_Input>;
  on_conflict?: InputMaybe<Payment_On_Conflict>;
};

/** aggregate avg on columns */
export type Payment_Avg_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payment" */
export type Payment_Avg_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payment". All fields are combined with a logical 'AND'. */
export type Payment_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Payment_Bool_Exp>>>;
  _not?: InputMaybe<Payment_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Payment_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invoice_id?: InputMaybe<String_Comparison_Exp>;
  payment_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  payment_due_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  payment_expiry_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  payment_id?: InputMaybe<String_Comparison_Exp>;
  payment_method?: InputMaybe<String_Comparison_Exp>;
  payment_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  payment_status?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "payment" */
export enum Payment_Constraint {
  /** unique or primary key constraint */
  PaymentPk = 'payment_pk',
  /** unique or primary key constraint */
  PaymentSequenceNumberResourcePathUnique = 'payment_sequence_number_resource_path_unique'
}

/** input type for incrementing integer column in table "payment" */
export type Payment_Inc_Input = {
  payment_sequence_number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "payment" */
export type Payment_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  payment_date?: InputMaybe<Scalars['timestamptz']>;
  payment_due_date?: InputMaybe<Scalars['timestamptz']>;
  payment_expiry_date?: InputMaybe<Scalars['timestamptz']>;
  payment_id?: InputMaybe<Scalars['String']>;
  payment_method?: InputMaybe<Scalars['String']>;
  payment_sequence_number?: InputMaybe<Scalars['Int']>;
  payment_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Payment_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_id?: Maybe<Scalars['String']>;
  payment_date?: Maybe<Scalars['timestamptz']>;
  payment_due_date?: Maybe<Scalars['timestamptz']>;
  payment_expiry_date?: Maybe<Scalars['timestamptz']>;
  payment_id?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_sequence_number?: Maybe<Scalars['Int']>;
  payment_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "payment" */
export type Payment_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  payment_date?: InputMaybe<Order_By>;
  payment_due_date?: InputMaybe<Order_By>;
  payment_expiry_date?: InputMaybe<Order_By>;
  payment_id?: InputMaybe<Order_By>;
  payment_method?: InputMaybe<Order_By>;
  payment_sequence_number?: InputMaybe<Order_By>;
  payment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Payment_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  invoice_id?: Maybe<Scalars['String']>;
  payment_date?: Maybe<Scalars['timestamptz']>;
  payment_due_date?: Maybe<Scalars['timestamptz']>;
  payment_expiry_date?: Maybe<Scalars['timestamptz']>;
  payment_id?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_sequence_number?: Maybe<Scalars['Int']>;
  payment_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "payment" */
export type Payment_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  payment_date?: InputMaybe<Order_By>;
  payment_due_date?: InputMaybe<Order_By>;
  payment_expiry_date?: InputMaybe<Order_By>;
  payment_id?: InputMaybe<Order_By>;
  payment_method?: InputMaybe<Order_By>;
  payment_sequence_number?: InputMaybe<Order_By>;
  payment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "payment" */
export type Payment_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Payment>;
};

/** input type for inserting object relation for remote table "payment" */
export type Payment_Obj_Rel_Insert_Input = {
  data: Payment_Insert_Input;
  on_conflict?: InputMaybe<Payment_On_Conflict>;
};

/** on conflict condition type for table "payment" */
export type Payment_On_Conflict = {
  constraint: Payment_Constraint;
  update_columns: Array<Payment_Update_Column>;
  where?: InputMaybe<Payment_Bool_Exp>;
};

/** ordering options when selecting data from "payment" */
export type Payment_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invoice_id?: InputMaybe<Order_By>;
  payment_date?: InputMaybe<Order_By>;
  payment_due_date?: InputMaybe<Order_By>;
  payment_expiry_date?: InputMaybe<Order_By>;
  payment_id?: InputMaybe<Order_By>;
  payment_method?: InputMaybe<Order_By>;
  payment_sequence_number?: InputMaybe<Order_By>;
  payment_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "payment" */
export type Payment_Pk_Columns_Input = {
  payment_id: Scalars['String'];
};

/** select columns of table "payment" */
export enum Payment_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  PaymentDate = 'payment_date',
  /** column name */
  PaymentDueDate = 'payment_due_date',
  /** column name */
  PaymentExpiryDate = 'payment_expiry_date',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  PaymentMethod = 'payment_method',
  /** column name */
  PaymentSequenceNumber = 'payment_sequence_number',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "payment" */
export type Payment_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  invoice_id?: InputMaybe<Scalars['String']>;
  payment_date?: InputMaybe<Scalars['timestamptz']>;
  payment_due_date?: InputMaybe<Scalars['timestamptz']>;
  payment_expiry_date?: InputMaybe<Scalars['timestamptz']>;
  payment_id?: InputMaybe<Scalars['String']>;
  payment_method?: InputMaybe<Scalars['String']>;
  payment_sequence_number?: InputMaybe<Scalars['Int']>;
  payment_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Payment_Stddev_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payment" */
export type Payment_Stddev_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payment_Stddev_Pop_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payment" */
export type Payment_Stddev_Pop_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payment_Stddev_Samp_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payment" */
export type Payment_Stddev_Samp_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Payment_Sum_Fields = {
  payment_sequence_number?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payment" */
export type Payment_Sum_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** update columns of table "payment" */
export enum Payment_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvoiceId = 'invoice_id',
  /** column name */
  PaymentDate = 'payment_date',
  /** column name */
  PaymentDueDate = 'payment_due_date',
  /** column name */
  PaymentExpiryDate = 'payment_expiry_date',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  PaymentMethod = 'payment_method',
  /** column name */
  PaymentSequenceNumber = 'payment_sequence_number',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Payment_Var_Pop_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payment" */
export type Payment_Var_Pop_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payment_Var_Samp_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payment" */
export type Payment_Var_Samp_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Payment_Variance_Fields = {
  payment_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payment" */
export type Payment_Variance_Order_By = {
  payment_sequence_number?: InputMaybe<Order_By>;
};

/** query root */
export type Query_Root = {
  /** fetch data from the table: "bill_item" */
  bill_item: Array<Bill_Item>;
  /** fetch aggregated fields from the table: "bill_item" */
  bill_item_aggregate: Bill_Item_Aggregate;
  /** fetch data from the table: "bill_item" using primary key columns */
  bill_item_by_pk?: Maybe<Bill_Item>;
  /** fetch data from the table: "invoice" */
  invoice: Array<Invoice>;
  /** fetch data from the table: "invoice_action_log" */
  invoice_action_log: Array<Invoice_Action_Log>;
  /** fetch aggregated fields from the table: "invoice_action_log" */
  invoice_action_log_aggregate: Invoice_Action_Log_Aggregate;
  /** fetch data from the table: "invoice_action_log" using primary key columns */
  invoice_action_log_by_pk?: Maybe<Invoice_Action_Log>;
  /** fetch aggregated fields from the table: "invoice" */
  invoice_aggregate: Invoice_Aggregate;
  /** fetch data from the table: "invoice_bill_item" */
  invoice_bill_item: Array<Invoice_Bill_Item>;
  /** fetch aggregated fields from the table: "invoice_bill_item" */
  invoice_bill_item_aggregate: Invoice_Bill_Item_Aggregate;
  /** fetch data from the table: "invoice_bill_item" using primary key columns */
  invoice_bill_item_by_pk?: Maybe<Invoice_Bill_Item>;
  /** fetch data from the table: "invoice" using primary key columns */
  invoice_by_pk?: Maybe<Invoice>;
  /** fetch data from the table: "payment" */
  payment: Array<Payment>;
  /** fetch aggregated fields from the table: "payment" */
  payment_aggregate: Payment_Aggregate;
  /** fetch data from the table: "payment" using primary key columns */
  payment_by_pk?: Maybe<Payment>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootBill_ItemArgs = {
  distinct_on?: InputMaybe<Array<Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Item_Order_By>>;
  where?: InputMaybe<Bill_Item_Bool_Exp>;
};


/** query root */
export type Query_RootBill_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Item_Order_By>>;
  where?: InputMaybe<Bill_Item_Bool_Exp>;
};


/** query root */
export type Query_RootBill_Item_By_PkArgs = {
  bill_item_sequence_number: Scalars['Int'];
  order_id: Scalars['String'];
};


/** query root */
export type Query_RootInvoiceArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Order_By>>;
  where?: InputMaybe<Invoice_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Action_LogArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Action_Log_Order_By>>;
  where?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Action_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Action_Log_Order_By>>;
  where?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Action_Log_By_PkArgs = {
  invoice_action_id: Scalars['String'];
};


/** query root */
export type Query_RootInvoice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Order_By>>;
  where?: InputMaybe<Invoice_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Bill_ItemArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Bill_Item_Order_By>>;
  where?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Bill_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Bill_Item_Order_By>>;
  where?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
};


/** query root */
export type Query_RootInvoice_Bill_Item_By_PkArgs = {
  invoice_bill_item_id: Scalars['String'];
};


/** query root */
export type Query_RootInvoice_By_PkArgs = {
  invoice_id: Scalars['String'];
};


/** query root */
export type Query_RootPaymentArgs = {
  distinct_on?: InputMaybe<Array<Payment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Order_By>>;
  where?: InputMaybe<Payment_Bool_Exp>;
};


/** query root */
export type Query_RootPayment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Order_By>>;
  where?: InputMaybe<Payment_Bool_Exp>;
};


/** query root */
export type Query_RootPayment_By_PkArgs = {
  payment_id: Scalars['String'];
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

/** columns and relationships of "students" */
export type Students = {
  created_at: Scalars['timestamptz'];
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
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
};

/** order by avg() on columns of table "students" */
export type Students_Avg_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "students". All fields are combined with a logical 'AND'. */
export type Students_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Students_Bool_Exp>>>;
  _not?: InputMaybe<Students_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Students_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  current_grade?: InputMaybe<Smallint_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "students" */
export enum Students_Constraint {
  /** unique or primary key constraint */
  StudentPk = 'student_pk'
}

/** input type for incrementing integer column in table "students" */
export type Students_Inc_Input = {
  current_grade?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "students" */
export type Students_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_grade?: InputMaybe<Scalars['smallint']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Students_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "students" */
export type Students_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_grade?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Students_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  current_grade?: Maybe<Scalars['smallint']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "students" */
export type Students_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_grade?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
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
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
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
  ResourcePath = 'resource_path',
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
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Students_Stddev_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "students" */
export type Students_Stddev_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Students_Stddev_Pop_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "students" */
export type Students_Stddev_Pop_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Students_Stddev_Samp_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "students" */
export type Students_Stddev_Samp_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Students_Sum_Fields = {
  current_grade?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "students" */
export type Students_Sum_Order_By = {
  current_grade?: InputMaybe<Order_By>;
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
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Students_Var_Pop_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "students" */
export type Students_Var_Pop_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Students_Var_Samp_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "students" */
export type Students_Var_Samp_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Students_Variance_Fields = {
  current_grade?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "students" */
export type Students_Variance_Order_By = {
  current_grade?: InputMaybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "bill_item" */
  bill_item: Array<Bill_Item>;
  /** fetch aggregated fields from the table: "bill_item" */
  bill_item_aggregate: Bill_Item_Aggregate;
  /** fetch data from the table: "bill_item" using primary key columns */
  bill_item_by_pk?: Maybe<Bill_Item>;
  /** fetch data from the table: "invoice" */
  invoice: Array<Invoice>;
  /** fetch data from the table: "invoice_action_log" */
  invoice_action_log: Array<Invoice_Action_Log>;
  /** fetch aggregated fields from the table: "invoice_action_log" */
  invoice_action_log_aggregate: Invoice_Action_Log_Aggregate;
  /** fetch data from the table: "invoice_action_log" using primary key columns */
  invoice_action_log_by_pk?: Maybe<Invoice_Action_Log>;
  /** fetch aggregated fields from the table: "invoice" */
  invoice_aggregate: Invoice_Aggregate;
  /** fetch data from the table: "invoice_bill_item" */
  invoice_bill_item: Array<Invoice_Bill_Item>;
  /** fetch aggregated fields from the table: "invoice_bill_item" */
  invoice_bill_item_aggregate: Invoice_Bill_Item_Aggregate;
  /** fetch data from the table: "invoice_bill_item" using primary key columns */
  invoice_bill_item_by_pk?: Maybe<Invoice_Bill_Item>;
  /** fetch data from the table: "invoice" using primary key columns */
  invoice_by_pk?: Maybe<Invoice>;
  /** fetch data from the table: "payment" */
  payment: Array<Payment>;
  /** fetch aggregated fields from the table: "payment" */
  payment_aggregate: Payment_Aggregate;
  /** fetch data from the table: "payment" using primary key columns */
  payment_by_pk?: Maybe<Payment>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootBill_ItemArgs = {
  distinct_on?: InputMaybe<Array<Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Item_Order_By>>;
  where?: InputMaybe<Bill_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBill_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Item_Order_By>>;
  where?: InputMaybe<Bill_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBill_Item_By_PkArgs = {
  bill_item_sequence_number: Scalars['Int'];
  order_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootInvoiceArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Order_By>>;
  where?: InputMaybe<Invoice_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Action_LogArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Action_Log_Order_By>>;
  where?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Action_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Action_Log_Order_By>>;
  where?: InputMaybe<Invoice_Action_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Action_Log_By_PkArgs = {
  invoice_action_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootInvoice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Order_By>>;
  where?: InputMaybe<Invoice_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Bill_ItemArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Bill_Item_Order_By>>;
  where?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Bill_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invoice_Bill_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Invoice_Bill_Item_Order_By>>;
  where?: InputMaybe<Invoice_Bill_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvoice_Bill_Item_By_PkArgs = {
  invoice_bill_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootInvoice_By_PkArgs = {
  invoice_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPaymentArgs = {
  distinct_on?: InputMaybe<Array<Payment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Order_By>>;
  where?: InputMaybe<Payment_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Order_By>>;
  where?: InputMaybe<Payment_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayment_By_PkArgs = {
  payment_id: Scalars['String'];
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

/** columns and relationships of "users" */
export type Users = {
  allow_notification?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['date']>;
  country: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  facebook_id?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  first_name_phonetic?: Maybe<Scalars['String']>;
  full_name_phonetic?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  is_tester?: Maybe<Scalars['Boolean']>;
  last_login_date?: Maybe<Scalars['timestamptz']>;
  last_name: Scalars['String'];
  last_name_phonetic?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone_number?: Maybe<Scalars['String']>;
  phone_verified?: Maybe<Scalars['Boolean']>;
  platform?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  user_group: Scalars['String'];
  user_id: Scalars['String'];
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
  avatar?: InputMaybe<String_Comparison_Exp>;
  birthday?: InputMaybe<Date_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  device_token?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Boolean_Comparison_Exp>;
  facebook_id?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  first_name_phonetic?: InputMaybe<String_Comparison_Exp>;
  full_name_phonetic?: InputMaybe<String_Comparison_Exp>;
  gender?: InputMaybe<String_Comparison_Exp>;
  given_name?: InputMaybe<String_Comparison_Exp>;
  is_tester?: InputMaybe<Boolean_Comparison_Exp>;
  last_login_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  last_name_phonetic?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone_number?: InputMaybe<String_Comparison_Exp>;
  phone_verified?: InputMaybe<Boolean_Comparison_Exp>;
  platform?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  avatar?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['date']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  device_token?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['Boolean']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  first_name_phonetic?: InputMaybe<Scalars['String']>;
  full_name_phonetic?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  is_tester?: InputMaybe<Scalars['Boolean']>;
  last_login_date?: InputMaybe<Scalars['timestamptz']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_name_phonetic?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  phone_verified?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_group?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['date']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  first_name_phonetic?: Maybe<Scalars['String']>;
  full_name_phonetic?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  last_login_date?: Maybe<Scalars['timestamptz']>;
  last_name?: Maybe<Scalars['String']>;
  last_name_phonetic?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_group?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  avatar?: InputMaybe<Order_By>;
  birthday?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  facebook_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  first_name_phonetic?: InputMaybe<Order_By>;
  full_name_phonetic?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  last_login_date?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_name_phonetic?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_number?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_group?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['date']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  device_token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  first_name_phonetic?: Maybe<Scalars['String']>;
  full_name_phonetic?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  last_login_date?: Maybe<Scalars['timestamptz']>;
  last_name?: Maybe<Scalars['String']>;
  last_name_phonetic?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_group?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  avatar?: InputMaybe<Order_By>;
  birthday?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  facebook_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  first_name_phonetic?: InputMaybe<Order_By>;
  full_name_phonetic?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  last_login_date?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_name_phonetic?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_number?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
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
  avatar?: InputMaybe<Order_By>;
  birthday?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  device_token?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  facebook_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  first_name_phonetic?: InputMaybe<Order_By>;
  full_name_phonetic?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  is_tester?: InputMaybe<Order_By>;
  last_login_date?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_name_phonetic?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_number?: InputMaybe<Order_By>;
  phone_verified?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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
  Avatar = 'avatar',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DeviceToken = 'device_token',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  FacebookId = 'facebook_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FirstNamePhonetic = 'first_name_phonetic',
  /** column name */
  FullNamePhonetic = 'full_name_phonetic',
  /** column name */
  Gender = 'gender',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  IsTester = 'is_tester',
  /** column name */
  LastLoginDate = 'last_login_date',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LastNamePhonetic = 'last_name_phonetic',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  PhoneVerified = 'phone_verified',
  /** column name */
  Platform = 'platform',
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
  avatar?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['date']>;
  country?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  device_token?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['Boolean']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  first_name_phonetic?: InputMaybe<Scalars['String']>;
  full_name_phonetic?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  is_tester?: InputMaybe<Scalars['Boolean']>;
  last_login_date?: InputMaybe<Scalars['timestamptz']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_name_phonetic?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  phone_verified?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<Scalars['String']>;
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
  Avatar = 'avatar',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DeviceToken = 'device_token',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  FacebookId = 'facebook_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FirstNamePhonetic = 'first_name_phonetic',
  /** column name */
  FullNamePhonetic = 'full_name_phonetic',
  /** column name */
  Gender = 'gender',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  IsTester = 'is_tester',
  /** column name */
  LastLoginDate = 'last_login_date',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LastNamePhonetic = 'last_name_phonetic',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  PhoneVerified = 'phone_verified',
  /** column name */
  Platform = 'platform',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserGroup = 'user_group',
  /** column name */
  UserId = 'user_id'
}
