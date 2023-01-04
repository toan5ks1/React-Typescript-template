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

/** columns and relationships of "bill_item" */
export type Bill_Item = {
  adjustment_price?: Maybe<Scalars['numeric']>;
  bill_item_sequence_number: Scalars['Int'];
  bill_type: Scalars['String'];
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_item_description?: Maybe<Scalars['jsonb']>;
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status: Scalars['String'];
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at: Scalars['timestamptz'];
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  discount_id?: Maybe<Scalars['String']>;
  final_price: Scalars['numeric'];
  is_latest_bill_item?: Maybe<Scalars['Boolean']>;
  location_id: Scalars['String'];
  location_name?: Maybe<Scalars['String']>;
  old_price?: Maybe<Scalars['numeric']>;
  order_id: Scalars['String'];
  previous_bill_item_sequence_number?: Maybe<Scalars['Int']>;
  previous_bill_item_status?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  product_description: Scalars['String'];
  product_id?: Maybe<Scalars['String']>;
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  student_product_id?: Maybe<Scalars['String']>;
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
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "bill_item" */
export type Bill_Item_Avg_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "bill_item". All fields are combined with a logical 'AND'. */
export type Bill_Item_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Bill_Item_Bool_Exp>>>;
  _not?: InputMaybe<Bill_Item_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Bill_Item_Bool_Exp>>>;
  adjustment_price?: InputMaybe<Numeric_Comparison_Exp>;
  bill_item_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  bill_type?: InputMaybe<String_Comparison_Exp>;
  billing_approval_status?: InputMaybe<String_Comparison_Exp>;
  billing_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_item_description?: InputMaybe<Jsonb_Comparison_Exp>;
  billing_ratio_denominator?: InputMaybe<Int_Comparison_Exp>;
  billing_ratio_numerator?: InputMaybe<Int_Comparison_Exp>;
  billing_schedule_period_id?: InputMaybe<String_Comparison_Exp>;
  billing_status?: InputMaybe<String_Comparison_Exp>;
  billing_to?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discount_amount?: InputMaybe<Numeric_Comparison_Exp>;
  discount_amount_type?: InputMaybe<String_Comparison_Exp>;
  discount_amount_value?: InputMaybe<Numeric_Comparison_Exp>;
  discount_id?: InputMaybe<String_Comparison_Exp>;
  final_price?: InputMaybe<Numeric_Comparison_Exp>;
  is_latest_bill_item?: InputMaybe<Boolean_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  location_name?: InputMaybe<String_Comparison_Exp>;
  old_price?: InputMaybe<Numeric_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  previous_bill_item_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  previous_bill_item_status?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  product_description?: InputMaybe<String_Comparison_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  product_pricing?: InputMaybe<Int_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_product_id?: InputMaybe<String_Comparison_Exp>;
  tax_amount?: InputMaybe<Numeric_Comparison_Exp>;
  tax_category?: InputMaybe<String_Comparison_Exp>;
  tax_id?: InputMaybe<String_Comparison_Exp>;
  tax_percentage?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "bill_item" */
export enum Bill_Item_Constraint {
  /** unique or primary key constraint */
  BillItemOrderBillItemSequenceNumberPk = 'bill_item_order_bill_item_sequence_number_pk',
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
  adjustment_price?: InputMaybe<Scalars['numeric']>;
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  old_price?: InputMaybe<Scalars['numeric']>;
  previous_bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "bill_item" */
export type Bill_Item_Insert_Input = {
  adjustment_price?: InputMaybe<Scalars['numeric']>;
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  bill_type?: InputMaybe<Scalars['String']>;
  billing_approval_status?: InputMaybe<Scalars['String']>;
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_from?: InputMaybe<Scalars['timestamptz']>;
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  billing_status?: InputMaybe<Scalars['String']>;
  billing_to?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  discount_id?: InputMaybe<Scalars['String']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  is_latest_bill_item?: InputMaybe<Scalars['Boolean']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_name?: InputMaybe<Scalars['String']>;
  old_price?: InputMaybe<Scalars['numeric']>;
  order_id?: InputMaybe<Scalars['String']>;
  previous_bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  previous_bill_item_status?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_description?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_product_id?: InputMaybe<Scalars['String']>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Bill_Item_Max_Fields = {
  adjustment_price?: Maybe<Scalars['numeric']>;
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  bill_type?: Maybe<Scalars['String']>;
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status?: Maybe<Scalars['String']>;
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  discount_id?: Maybe<Scalars['String']>;
  final_price?: Maybe<Scalars['numeric']>;
  location_id?: Maybe<Scalars['String']>;
  location_name?: Maybe<Scalars['String']>;
  old_price?: Maybe<Scalars['numeric']>;
  order_id?: Maybe<Scalars['String']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Int']>;
  previous_bill_item_status?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  product_description?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  student_product_id?: Maybe<Scalars['String']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "bill_item" */
export type Bill_Item_Max_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  previous_bill_item_status?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bill_Item_Min_Fields = {
  adjustment_price?: Maybe<Scalars['numeric']>;
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  bill_type?: Maybe<Scalars['String']>;
  billing_approval_status?: Maybe<Scalars['String']>;
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_from?: Maybe<Scalars['timestamptz']>;
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  billing_status?: Maybe<Scalars['String']>;
  billing_to?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  discount_id?: Maybe<Scalars['String']>;
  final_price?: Maybe<Scalars['numeric']>;
  location_id?: Maybe<Scalars['String']>;
  location_name?: Maybe<Scalars['String']>;
  old_price?: Maybe<Scalars['numeric']>;
  order_id?: Maybe<Scalars['String']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Int']>;
  previous_bill_item_status?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  product_description?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_pricing?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  student_product_id?: Maybe<Scalars['String']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "bill_item" */
export type Bill_Item_Min_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  previous_bill_item_status?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
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
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  bill_type?: InputMaybe<Order_By>;
  billing_approval_status?: InputMaybe<Order_By>;
  billing_date?: InputMaybe<Order_By>;
  billing_from?: InputMaybe<Order_By>;
  billing_item_description?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  billing_status?: InputMaybe<Order_By>;
  billing_to?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  is_latest_bill_item?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  location_name?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  previous_bill_item_status?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_description?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
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
  AdjustmentPrice = 'adjustment_price',
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
  BillingRatioDenominator = 'billing_ratio_denominator',
  /** column name */
  BillingRatioNumerator = 'billing_ratio_numerator',
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
  DiscountId = 'discount_id',
  /** column name */
  FinalPrice = 'final_price',
  /** column name */
  IsLatestBillItem = 'is_latest_bill_item',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  OldPrice = 'old_price',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PreviousBillItemSequenceNumber = 'previous_bill_item_sequence_number',
  /** column name */
  PreviousBillItemStatus = 'previous_bill_item_status',
  /** column name */
  Price = 'price',
  /** column name */
  ProductDescription = 'product_description',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductPricing = 'product_pricing',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentProductId = 'student_product_id',
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
  adjustment_price?: InputMaybe<Scalars['numeric']>;
  bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  bill_type?: InputMaybe<Scalars['String']>;
  billing_approval_status?: InputMaybe<Scalars['String']>;
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_from?: InputMaybe<Scalars['timestamptz']>;
  billing_item_description?: InputMaybe<Scalars['jsonb']>;
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  billing_status?: InputMaybe<Scalars['String']>;
  billing_to?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount?: InputMaybe<Scalars['numeric']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  discount_id?: InputMaybe<Scalars['String']>;
  final_price?: InputMaybe<Scalars['numeric']>;
  is_latest_bill_item?: InputMaybe<Scalars['Boolean']>;
  location_id?: InputMaybe<Scalars['String']>;
  location_name?: InputMaybe<Scalars['String']>;
  old_price?: InputMaybe<Scalars['numeric']>;
  order_id?: InputMaybe<Scalars['String']>;
  previous_bill_item_sequence_number?: InputMaybe<Scalars['Int']>;
  previous_bill_item_status?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_description?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_pricing?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_product_id?: InputMaybe<Scalars['String']>;
  tax_amount?: InputMaybe<Scalars['numeric']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Bill_Item_Stddev_Fields = {
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "bill_item" */
export type Bill_Item_Stddev_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Bill_Item_Stddev_Pop_Fields = {
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "bill_item" */
export type Bill_Item_Stddev_Pop_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Bill_Item_Stddev_Samp_Fields = {
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "bill_item" */
export type Bill_Item_Stddev_Samp_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Bill_Item_Sum_Fields = {
  adjustment_price?: Maybe<Scalars['numeric']>;
  bill_item_sequence_number?: Maybe<Scalars['Int']>;
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  discount_amount?: Maybe<Scalars['numeric']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  final_price?: Maybe<Scalars['numeric']>;
  old_price?: Maybe<Scalars['numeric']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['numeric']>;
  product_pricing?: Maybe<Scalars['Int']>;
  tax_amount?: Maybe<Scalars['numeric']>;
  tax_percentage?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "bill_item" */
export type Bill_Item_Sum_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** update columns of table "bill_item" */
export enum Bill_Item_Update_Column {
  /** column name */
  AdjustmentPrice = 'adjustment_price',
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
  BillingRatioDenominator = 'billing_ratio_denominator',
  /** column name */
  BillingRatioNumerator = 'billing_ratio_numerator',
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
  DiscountId = 'discount_id',
  /** column name */
  FinalPrice = 'final_price',
  /** column name */
  IsLatestBillItem = 'is_latest_bill_item',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  LocationName = 'location_name',
  /** column name */
  OldPrice = 'old_price',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PreviousBillItemSequenceNumber = 'previous_bill_item_sequence_number',
  /** column name */
  PreviousBillItemStatus = 'previous_bill_item_status',
  /** column name */
  Price = 'price',
  /** column name */
  ProductDescription = 'product_description',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductPricing = 'product_pricing',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentProductId = 'student_product_id',
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
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "bill_item" */
export type Bill_Item_Var_Pop_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Bill_Item_Var_Samp_Fields = {
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "bill_item" */
export type Bill_Item_Var_Samp_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Bill_Item_Variance_Fields = {
  adjustment_price?: Maybe<Scalars['Float']>;
  bill_item_sequence_number?: Maybe<Scalars['Float']>;
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_value?: Maybe<Scalars['Float']>;
  final_price?: Maybe<Scalars['Float']>;
  old_price?: Maybe<Scalars['Float']>;
  previous_bill_item_sequence_number?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_pricing?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "bill_item" */
export type Bill_Item_Variance_Order_By = {
  adjustment_price?: InputMaybe<Order_By>;
  bill_item_sequence_number?: InputMaybe<Order_By>;
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  old_price?: InputMaybe<Order_By>;
  previous_bill_item_sequence_number?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_pricing?: InputMaybe<Order_By>;
  tax_amount?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
};

/** columns and relationships of "billing_ratio" */
export type Billing_Ratio = {
  billing_ratio_denominator: Scalars['Int'];
  billing_ratio_id: Scalars['String'];
  billing_ratio_numerator: Scalars['Int'];
  /** An object relationship */
  billing_schedule_period: Billing_Schedule_Period;
  billing_schedule_period_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  end_date: Scalars['timestamptz'];
  is_archived: Scalars['Boolean'];
  resource_path: Scalars['String'];
  start_date: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "billing_ratio" */
export type Billing_Ratio_Aggregate = {
  aggregate?: Maybe<Billing_Ratio_Aggregate_Fields>;
  nodes: Array<Billing_Ratio>;
};

/** aggregate fields of "billing_ratio" */
export type Billing_Ratio_Aggregate_Fields = {
  avg?: Maybe<Billing_Ratio_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Billing_Ratio_Max_Fields>;
  min?: Maybe<Billing_Ratio_Min_Fields>;
  stddev?: Maybe<Billing_Ratio_Stddev_Fields>;
  stddev_pop?: Maybe<Billing_Ratio_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Billing_Ratio_Stddev_Samp_Fields>;
  sum?: Maybe<Billing_Ratio_Sum_Fields>;
  var_pop?: Maybe<Billing_Ratio_Var_Pop_Fields>;
  var_samp?: Maybe<Billing_Ratio_Var_Samp_Fields>;
  variance?: Maybe<Billing_Ratio_Variance_Fields>;
};


/** aggregate fields of "billing_ratio" */
export type Billing_Ratio_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "billing_ratio" */
export type Billing_Ratio_Aggregate_Order_By = {
  avg?: InputMaybe<Billing_Ratio_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Billing_Ratio_Max_Order_By>;
  min?: InputMaybe<Billing_Ratio_Min_Order_By>;
  stddev?: InputMaybe<Billing_Ratio_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Billing_Ratio_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Billing_Ratio_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Billing_Ratio_Sum_Order_By>;
  var_pop?: InputMaybe<Billing_Ratio_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Billing_Ratio_Var_Samp_Order_By>;
  variance?: InputMaybe<Billing_Ratio_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "billing_ratio" */
export type Billing_Ratio_Arr_Rel_Insert_Input = {
  data: Array<Billing_Ratio_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Ratio_On_Conflict>;
};

/** aggregate avg on columns */
export type Billing_Ratio_Avg_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "billing_ratio" */
export type Billing_Ratio_Avg_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "billing_ratio". All fields are combined with a logical 'AND'. */
export type Billing_Ratio_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Billing_Ratio_Bool_Exp>>>;
  _not?: InputMaybe<Billing_Ratio_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Billing_Ratio_Bool_Exp>>>;
  billing_ratio_denominator?: InputMaybe<Int_Comparison_Exp>;
  billing_ratio_id?: InputMaybe<String_Comparison_Exp>;
  billing_ratio_numerator?: InputMaybe<Int_Comparison_Exp>;
  billing_schedule_period?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
  billing_schedule_period_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "billing_ratio" */
export enum Billing_Ratio_Constraint {
  /** unique or primary key constraint */
  BillingRatioPk = 'billing_ratio_pk'
}

/** input type for incrementing integer column in table "billing_ratio" */
export type Billing_Ratio_Inc_Input = {
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "billing_ratio" */
export type Billing_Ratio_Insert_Input = {
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_id?: InputMaybe<Scalars['String']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
  billing_schedule_period?: InputMaybe<Billing_Schedule_Period_Obj_Rel_Insert_Input>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Billing_Ratio_Max_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_id?: Maybe<Scalars['String']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "billing_ratio" */
export type Billing_Ratio_Max_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_id?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Billing_Ratio_Min_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_id?: Maybe<Scalars['String']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "billing_ratio" */
export type Billing_Ratio_Min_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_id?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "billing_ratio" */
export type Billing_Ratio_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Billing_Ratio>;
};

/** input type for inserting object relation for remote table "billing_ratio" */
export type Billing_Ratio_Obj_Rel_Insert_Input = {
  data: Billing_Ratio_Insert_Input;
  on_conflict?: InputMaybe<Billing_Ratio_On_Conflict>;
};

/** on conflict condition type for table "billing_ratio" */
export type Billing_Ratio_On_Conflict = {
  constraint: Billing_Ratio_Constraint;
  update_columns: Array<Billing_Ratio_Update_Column>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};

/** ordering options when selecting data from "billing_ratio" */
export type Billing_Ratio_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_id?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
  billing_schedule_period?: InputMaybe<Billing_Schedule_Period_Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "billing_ratio" */
export type Billing_Ratio_Pk_Columns_Input = {
  billing_ratio_id: Scalars['String'];
};

/** select columns of table "billing_ratio" */
export enum Billing_Ratio_Select_Column {
  /** column name */
  BillingRatioDenominator = 'billing_ratio_denominator',
  /** column name */
  BillingRatioId = 'billing_ratio_id',
  /** column name */
  BillingRatioNumerator = 'billing_ratio_numerator',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "billing_ratio" */
export type Billing_Ratio_Set_Input = {
  billing_ratio_denominator?: InputMaybe<Scalars['Int']>;
  billing_ratio_id?: InputMaybe<Scalars['String']>;
  billing_ratio_numerator?: InputMaybe<Scalars['Int']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Billing_Ratio_Stddev_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "billing_ratio" */
export type Billing_Ratio_Stddev_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Billing_Ratio_Stddev_Pop_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "billing_ratio" */
export type Billing_Ratio_Stddev_Pop_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Billing_Ratio_Stddev_Samp_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "billing_ratio" */
export type Billing_Ratio_Stddev_Samp_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Billing_Ratio_Sum_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Int']>;
  billing_ratio_numerator?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "billing_ratio" */
export type Billing_Ratio_Sum_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** update columns of table "billing_ratio" */
export enum Billing_Ratio_Update_Column {
  /** column name */
  BillingRatioDenominator = 'billing_ratio_denominator',
  /** column name */
  BillingRatioId = 'billing_ratio_id',
  /** column name */
  BillingRatioNumerator = 'billing_ratio_numerator',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Billing_Ratio_Var_Pop_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "billing_ratio" */
export type Billing_Ratio_Var_Pop_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Billing_Ratio_Var_Samp_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "billing_ratio" */
export type Billing_Ratio_Var_Samp_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Billing_Ratio_Variance_Fields = {
  billing_ratio_denominator?: Maybe<Scalars['Float']>;
  billing_ratio_numerator?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "billing_ratio" */
export type Billing_Ratio_Variance_Order_By = {
  billing_ratio_denominator?: InputMaybe<Order_By>;
  billing_ratio_numerator?: InputMaybe<Order_By>;
};

/** columns and relationships of "billing_schedule" */
export type Billing_Schedule = {
  billing_schedule_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "billing_schedule" */
export type Billing_Schedule_Aggregate = {
  aggregate?: Maybe<Billing_Schedule_Aggregate_Fields>;
  nodes: Array<Billing_Schedule>;
};

/** aggregate fields of "billing_schedule" */
export type Billing_Schedule_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Billing_Schedule_Max_Fields>;
  min?: Maybe<Billing_Schedule_Min_Fields>;
};


/** aggregate fields of "billing_schedule" */
export type Billing_Schedule_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Billing_Schedule_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "billing_schedule" */
export type Billing_Schedule_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Billing_Schedule_Max_Order_By>;
  min?: InputMaybe<Billing_Schedule_Min_Order_By>;
};

/** input type for inserting array relation for remote table "billing_schedule" */
export type Billing_Schedule_Arr_Rel_Insert_Input = {
  data: Array<Billing_Schedule_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Schedule_On_Conflict>;
};

/** Boolean expression to filter rows from the table "billing_schedule". All fields are combined with a logical 'AND'. */
export type Billing_Schedule_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Billing_Schedule_Bool_Exp>>>;
  _not?: InputMaybe<Billing_Schedule_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Billing_Schedule_Bool_Exp>>>;
  billing_schedule_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "billing_schedule" */
export enum Billing_Schedule_Constraint {
  /** unique or primary key constraint */
  BillingSchedulePk = 'billing_schedule_pk'
}

/** input type for inserting data into table "billing_schedule" */
export type Billing_Schedule_Insert_Input = {
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Billing_Schedule_Max_Fields = {
  billing_schedule_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "billing_schedule" */
export type Billing_Schedule_Max_Order_By = {
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Billing_Schedule_Min_Fields = {
  billing_schedule_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "billing_schedule" */
export type Billing_Schedule_Min_Order_By = {
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "billing_schedule" */
export type Billing_Schedule_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Billing_Schedule>;
};

/** input type for inserting object relation for remote table "billing_schedule" */
export type Billing_Schedule_Obj_Rel_Insert_Input = {
  data: Billing_Schedule_Insert_Input;
  on_conflict?: InputMaybe<Billing_Schedule_On_Conflict>;
};

/** on conflict condition type for table "billing_schedule" */
export type Billing_Schedule_On_Conflict = {
  constraint: Billing_Schedule_Constraint;
  update_columns: Array<Billing_Schedule_Update_Column>;
  where?: InputMaybe<Billing_Schedule_Bool_Exp>;
};

/** ordering options when selecting data from "billing_schedule" */
export type Billing_Schedule_Order_By = {
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** columns and relationships of "billing_schedule_period" */
export type Billing_Schedule_Period = {
  billing_date: Scalars['timestamptz'];
  /** An array relationship */
  billing_ratios: Array<Billing_Ratio>;
  /** An aggregated array relationship */
  billing_ratios_aggregate: Billing_Ratio_Aggregate;
  billing_schedule_id: Scalars['String'];
  billing_schedule_period_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  end_date: Scalars['timestamptz'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  /** An array relationship */
  product_prices: Array<Product_Price>;
  /** An aggregated array relationship */
  product_prices_aggregate: Product_Price_Aggregate;
  remarks?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  start_date: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "billing_schedule_period" */
export type Billing_Schedule_PeriodBilling_RatiosArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** columns and relationships of "billing_schedule_period" */
export type Billing_Schedule_PeriodBilling_Ratios_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** columns and relationships of "billing_schedule_period" */
export type Billing_Schedule_PeriodProduct_PricesArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** columns and relationships of "billing_schedule_period" */
export type Billing_Schedule_PeriodProduct_Prices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};

/** aggregated selection of "billing_schedule_period" */
export type Billing_Schedule_Period_Aggregate = {
  aggregate?: Maybe<Billing_Schedule_Period_Aggregate_Fields>;
  nodes: Array<Billing_Schedule_Period>;
};

/** aggregate fields of "billing_schedule_period" */
export type Billing_Schedule_Period_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Billing_Schedule_Period_Max_Fields>;
  min?: Maybe<Billing_Schedule_Period_Min_Fields>;
};


/** aggregate fields of "billing_schedule_period" */
export type Billing_Schedule_Period_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Billing_Schedule_Period_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "billing_schedule_period" */
export type Billing_Schedule_Period_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Billing_Schedule_Period_Max_Order_By>;
  min?: InputMaybe<Billing_Schedule_Period_Min_Order_By>;
};

/** input type for inserting array relation for remote table "billing_schedule_period" */
export type Billing_Schedule_Period_Arr_Rel_Insert_Input = {
  data: Array<Billing_Schedule_Period_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Schedule_Period_On_Conflict>;
};

/** Boolean expression to filter rows from the table "billing_schedule_period". All fields are combined with a logical 'AND'. */
export type Billing_Schedule_Period_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Billing_Schedule_Period_Bool_Exp>>>;
  _not?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Billing_Schedule_Period_Bool_Exp>>>;
  billing_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_ratios?: InputMaybe<Billing_Ratio_Bool_Exp>;
  billing_schedule_id?: InputMaybe<String_Comparison_Exp>;
  billing_schedule_period_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  product_prices?: InputMaybe<Product_Price_Bool_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "billing_schedule_period" */
export enum Billing_Schedule_Period_Constraint {
  /** unique or primary key constraint */
  BillingSchedulePeriodPk = 'billing_schedule_period_pk'
}

/** input type for inserting data into table "billing_schedule_period" */
export type Billing_Schedule_Period_Insert_Input = {
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_ratios?: InputMaybe<Billing_Ratio_Arr_Rel_Insert_Input>;
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  product_prices?: InputMaybe<Product_Price_Arr_Rel_Insert_Input>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Billing_Schedule_Period_Max_Fields = {
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_schedule_id?: Maybe<Scalars['String']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "billing_schedule_period" */
export type Billing_Schedule_Period_Max_Order_By = {
  billing_date?: InputMaybe<Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Billing_Schedule_Period_Min_Fields = {
  billing_date?: Maybe<Scalars['timestamptz']>;
  billing_schedule_id?: Maybe<Scalars['String']>;
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "billing_schedule_period" */
export type Billing_Schedule_Period_Min_Order_By = {
  billing_date?: InputMaybe<Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "billing_schedule_period" */
export type Billing_Schedule_Period_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Billing_Schedule_Period>;
};

/** input type for inserting object relation for remote table "billing_schedule_period" */
export type Billing_Schedule_Period_Obj_Rel_Insert_Input = {
  data: Billing_Schedule_Period_Insert_Input;
  on_conflict?: InputMaybe<Billing_Schedule_Period_On_Conflict>;
};

/** on conflict condition type for table "billing_schedule_period" */
export type Billing_Schedule_Period_On_Conflict = {
  constraint: Billing_Schedule_Period_Constraint;
  update_columns: Array<Billing_Schedule_Period_Update_Column>;
  where?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
};

/** ordering options when selecting data from "billing_schedule_period" */
export type Billing_Schedule_Period_Order_By = {
  billing_date?: InputMaybe<Order_By>;
  billing_ratios_aggregate?: InputMaybe<Billing_Ratio_Aggregate_Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  product_prices_aggregate?: InputMaybe<Product_Price_Aggregate_Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "billing_schedule_period" */
export type Billing_Schedule_Period_Pk_Columns_Input = {
  billing_schedule_period_id: Scalars['String'];
};

/** select columns of table "billing_schedule_period" */
export enum Billing_Schedule_Period_Select_Column {
  /** column name */
  BillingDate = 'billing_date',
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "billing_schedule_period" */
export type Billing_Schedule_Period_Set_Input = {
  billing_date?: InputMaybe<Scalars['timestamptz']>;
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "billing_schedule_period" */
export enum Billing_Schedule_Period_Update_Column {
  /** column name */
  BillingDate = 'billing_date',
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** primary key columns input for table: "billing_schedule" */
export type Billing_Schedule_Pk_Columns_Input = {
  billing_schedule_id: Scalars['String'];
};

/** select columns of table "billing_schedule" */
export enum Billing_Schedule_Select_Column {
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "billing_schedule" */
export type Billing_Schedule_Set_Input = {
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "billing_schedule" */
export enum Billing_Schedule_Update_Column {
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "courses" */
export type Courses = {
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "courses" */
export type Courses_Aggregate = {
  aggregate?: Maybe<Courses_Aggregate_Fields>;
  nodes: Array<Courses>;
};

/** aggregate fields of "courses" */
export type Courses_Aggregate_Fields = {
  avg?: Maybe<Courses_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Courses_Max_Fields>;
  min?: Maybe<Courses_Min_Fields>;
  stddev?: Maybe<Courses_Stddev_Fields>;
  stddev_pop?: Maybe<Courses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Courses_Stddev_Samp_Fields>;
  sum?: Maybe<Courses_Sum_Fields>;
  var_pop?: Maybe<Courses_Var_Pop_Fields>;
  var_samp?: Maybe<Courses_Var_Samp_Fields>;
  variance?: Maybe<Courses_Variance_Fields>;
};


/** aggregate fields of "courses" */
export type Courses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Courses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "courses" */
export type Courses_Aggregate_Order_By = {
  avg?: InputMaybe<Courses_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Courses_Max_Order_By>;
  min?: InputMaybe<Courses_Min_Order_By>;
  stddev?: InputMaybe<Courses_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Courses_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Courses_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Courses_Sum_Order_By>;
  var_pop?: InputMaybe<Courses_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Courses_Var_Samp_Order_By>;
  variance?: InputMaybe<Courses_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "courses" */
export type Courses_Arr_Rel_Insert_Input = {
  data: Array<Courses_Insert_Input>;
  on_conflict?: InputMaybe<Courses_On_Conflict>;
};

/** aggregate avg on columns */
export type Courses_Avg_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "courses" */
export type Courses_Avg_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "courses". All fields are combined with a logical 'AND'. */
export type Courses_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Courses_Bool_Exp>>>;
  _not?: InputMaybe<Courses_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Courses_Bool_Exp>>>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  grade?: InputMaybe<Smallint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "courses" */
export enum Courses_Constraint {
  /** unique or primary key constraint */
  CoursesPk = 'courses_pk'
}

/** input type for incrementing integer column in table "courses" */
export type Courses_Inc_Input = {
  grade?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "courses" */
export type Courses_Insert_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Courses_Max_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "courses" */
export type Courses_Max_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Courses_Min_Fields = {
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['smallint']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "courses" */
export type Courses_Min_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "courses" */
export type Courses_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Courses>;
};

/** input type for inserting object relation for remote table "courses" */
export type Courses_Obj_Rel_Insert_Input = {
  data: Courses_Insert_Input;
  on_conflict?: InputMaybe<Courses_On_Conflict>;
};

/** on conflict condition type for table "courses" */
export type Courses_On_Conflict = {
  constraint: Courses_Constraint;
  update_columns: Array<Courses_Update_Column>;
  where?: InputMaybe<Courses_Bool_Exp>;
};

/** ordering options when selecting data from "courses" */
export type Courses_Order_By = {
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "courses" */
export type Courses_Pk_Columns_Input = {
  course_id: Scalars['String'];
};

/** select columns of table "courses" */
export enum Courses_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "courses" */
export type Courses_Set_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade?: InputMaybe<Scalars['smallint']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Courses_Stddev_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "courses" */
export type Courses_Stddev_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Courses_Stddev_Pop_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "courses" */
export type Courses_Stddev_Pop_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Courses_Stddev_Samp_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "courses" */
export type Courses_Stddev_Samp_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Courses_Sum_Fields = {
  grade?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "courses" */
export type Courses_Sum_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** update columns of table "courses" */
export enum Courses_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Courses_Var_Pop_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "courses" */
export type Courses_Var_Pop_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Courses_Var_Samp_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "courses" */
export type Courses_Var_Samp_Order_By = {
  grade?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Courses_Variance_Fields = {
  grade?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "courses" */
export type Courses_Variance_Order_By = {
  grade?: InputMaybe<Order_By>;
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

/** columns and relationships of "discount" */
export type Discount = {
  available_from: Scalars['timestamptz'];
  available_until: Scalars['timestamptz'];
  created_at: Scalars['timestamptz'];
  discount_amount_type: Scalars['String'];
  discount_amount_value: Scalars['numeric'];
  discount_id: Scalars['String'];
  discount_type: Scalars['String'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  /** An array relationship */
  order_items: Array<Order_Item>;
  /** An aggregated array relationship */
  order_items_aggregate: Order_Item_Aggregate;
  recurring_valid_duration?: Maybe<Scalars['Int']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "discount" */
export type DiscountOrder_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "discount" */
export type DiscountOrder_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};

/** aggregated selection of "discount" */
export type Discount_Aggregate = {
  aggregate?: Maybe<Discount_Aggregate_Fields>;
  nodes: Array<Discount>;
};

/** aggregate fields of "discount" */
export type Discount_Aggregate_Fields = {
  avg?: Maybe<Discount_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Discount_Max_Fields>;
  min?: Maybe<Discount_Min_Fields>;
  stddev?: Maybe<Discount_Stddev_Fields>;
  stddev_pop?: Maybe<Discount_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Discount_Stddev_Samp_Fields>;
  sum?: Maybe<Discount_Sum_Fields>;
  var_pop?: Maybe<Discount_Var_Pop_Fields>;
  var_samp?: Maybe<Discount_Var_Samp_Fields>;
  variance?: Maybe<Discount_Variance_Fields>;
};


/** aggregate fields of "discount" */
export type Discount_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Discount_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "discount" */
export type Discount_Aggregate_Order_By = {
  avg?: InputMaybe<Discount_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Discount_Max_Order_By>;
  min?: InputMaybe<Discount_Min_Order_By>;
  stddev?: InputMaybe<Discount_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Discount_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Discount_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Discount_Sum_Order_By>;
  var_pop?: InputMaybe<Discount_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Discount_Var_Samp_Order_By>;
  variance?: InputMaybe<Discount_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "discount" */
export type Discount_Arr_Rel_Insert_Input = {
  data: Array<Discount_Insert_Input>;
  on_conflict?: InputMaybe<Discount_On_Conflict>;
};

/** aggregate avg on columns */
export type Discount_Avg_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "discount" */
export type Discount_Avg_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "discount". All fields are combined with a logical 'AND'. */
export type Discount_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Discount_Bool_Exp>>>;
  _not?: InputMaybe<Discount_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Discount_Bool_Exp>>>;
  available_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  available_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discount_amount_type?: InputMaybe<String_Comparison_Exp>;
  discount_amount_value?: InputMaybe<Numeric_Comparison_Exp>;
  discount_id?: InputMaybe<String_Comparison_Exp>;
  discount_type?: InputMaybe<String_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order_items?: InputMaybe<Order_Item_Bool_Exp>;
  recurring_valid_duration?: InputMaybe<Int_Comparison_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "discount" */
export enum Discount_Constraint {
  /** unique or primary key constraint */
  DiscountPk = 'discount_pk'
}

/** input type for incrementing integer column in table "discount" */
export type Discount_Inc_Input = {
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  recurring_valid_duration?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "discount" */
export type Discount_Insert_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  discount_id?: InputMaybe<Scalars['String']>;
  discount_type?: InputMaybe<Scalars['String']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order_items?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  recurring_valid_duration?: InputMaybe<Scalars['Int']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Discount_Max_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  discount_id?: Maybe<Scalars['String']>;
  discount_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  recurring_valid_duration?: Maybe<Scalars['Int']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "discount" */
export type Discount_Max_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  discount_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Discount_Min_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_amount_type?: Maybe<Scalars['String']>;
  discount_amount_value?: Maybe<Scalars['numeric']>;
  discount_id?: Maybe<Scalars['String']>;
  discount_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  recurring_valid_duration?: Maybe<Scalars['Int']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "discount" */
export type Discount_Min_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  discount_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "discount" */
export type Discount_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Discount>;
};

/** input type for inserting object relation for remote table "discount" */
export type Discount_Obj_Rel_Insert_Input = {
  data: Discount_Insert_Input;
  on_conflict?: InputMaybe<Discount_On_Conflict>;
};

/** on conflict condition type for table "discount" */
export type Discount_On_Conflict = {
  constraint: Discount_Constraint;
  update_columns: Array<Discount_Update_Column>;
  where?: InputMaybe<Discount_Bool_Exp>;
};

/** ordering options when selecting data from "discount" */
export type Discount_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_amount_type?: InputMaybe<Order_By>;
  discount_amount_value?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  discount_type?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "discount" */
export type Discount_Pk_Columns_Input = {
  discount_id: Scalars['String'];
};

/** select columns of table "discount" */
export enum Discount_Select_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountAmountType = 'discount_amount_type',
  /** column name */
  DiscountAmountValue = 'discount_amount_value',
  /** column name */
  DiscountId = 'discount_id',
  /** column name */
  DiscountType = 'discount_type',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  RecurringValidDuration = 'recurring_valid_duration',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "discount" */
export type Discount_Set_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_amount_type?: InputMaybe<Scalars['String']>;
  discount_amount_value?: InputMaybe<Scalars['numeric']>;
  discount_id?: InputMaybe<Scalars['String']>;
  discount_type?: InputMaybe<Scalars['String']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  recurring_valid_duration?: InputMaybe<Scalars['Int']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Discount_Stddev_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "discount" */
export type Discount_Stddev_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Discount_Stddev_Pop_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "discount" */
export type Discount_Stddev_Pop_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Discount_Stddev_Samp_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "discount" */
export type Discount_Stddev_Samp_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Discount_Sum_Fields = {
  discount_amount_value?: Maybe<Scalars['numeric']>;
  recurring_valid_duration?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "discount" */
export type Discount_Sum_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** update columns of table "discount" */
export enum Discount_Update_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountAmountType = 'discount_amount_type',
  /** column name */
  DiscountAmountValue = 'discount_amount_value',
  /** column name */
  DiscountId = 'discount_id',
  /** column name */
  DiscountType = 'discount_type',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  RecurringValidDuration = 'recurring_valid_duration',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Discount_Var_Pop_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "discount" */
export type Discount_Var_Pop_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Discount_Var_Samp_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "discount" */
export type Discount_Var_Samp_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Discount_Variance_Fields = {
  discount_amount_value?: Maybe<Scalars['Float']>;
  recurring_valid_duration?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "discount" */
export type Discount_Variance_Order_By = {
  discount_amount_value?: InputMaybe<Order_By>;
  recurring_valid_duration?: InputMaybe<Order_By>;
};

/** columns and relationships of "fee" */
export type Fee = {
  fee_id: Scalars['String'];
  fee_type: Scalars['String'];
  /** An object relationship */
  product: Product;
  resource_path: Scalars['String'];
};

/** aggregated selection of "fee" */
export type Fee_Aggregate = {
  aggregate?: Maybe<Fee_Aggregate_Fields>;
  nodes: Array<Fee>;
};

/** aggregate fields of "fee" */
export type Fee_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Fee_Max_Fields>;
  min?: Maybe<Fee_Min_Fields>;
};


/** aggregate fields of "fee" */
export type Fee_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Fee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "fee" */
export type Fee_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Fee_Max_Order_By>;
  min?: InputMaybe<Fee_Min_Order_By>;
};

/** input type for inserting array relation for remote table "fee" */
export type Fee_Arr_Rel_Insert_Input = {
  data: Array<Fee_Insert_Input>;
  on_conflict?: InputMaybe<Fee_On_Conflict>;
};

/** Boolean expression to filter rows from the table "fee". All fields are combined with a logical 'AND'. */
export type Fee_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Fee_Bool_Exp>>>;
  _not?: InputMaybe<Fee_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Fee_Bool_Exp>>>;
  fee_id?: InputMaybe<String_Comparison_Exp>;
  fee_type?: InputMaybe<String_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "fee" */
export enum Fee_Constraint {
  /** unique or primary key constraint */
  FeePk = 'fee_pk'
}

/** input type for inserting data into table "fee" */
export type Fee_Insert_Input = {
  fee_id?: InputMaybe<Scalars['String']>;
  fee_type?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Fee_Max_Fields = {
  fee_id?: Maybe<Scalars['String']>;
  fee_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "fee" */
export type Fee_Max_Order_By = {
  fee_id?: InputMaybe<Order_By>;
  fee_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Fee_Min_Fields = {
  fee_id?: Maybe<Scalars['String']>;
  fee_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "fee" */
export type Fee_Min_Order_By = {
  fee_id?: InputMaybe<Order_By>;
  fee_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "fee" */
export type Fee_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Fee>;
};

/** input type for inserting object relation for remote table "fee" */
export type Fee_Obj_Rel_Insert_Input = {
  data: Fee_Insert_Input;
  on_conflict?: InputMaybe<Fee_On_Conflict>;
};

/** on conflict condition type for table "fee" */
export type Fee_On_Conflict = {
  constraint: Fee_Constraint;
  update_columns: Array<Fee_Update_Column>;
  where?: InputMaybe<Fee_Bool_Exp>;
};

/** ordering options when selecting data from "fee" */
export type Fee_Order_By = {
  fee_id?: InputMaybe<Order_By>;
  fee_type?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "fee" */
export type Fee_Pk_Columns_Input = {
  fee_id: Scalars['String'];
};

/** select columns of table "fee" */
export enum Fee_Select_Column {
  /** column name */
  FeeId = 'fee_id',
  /** column name */
  FeeType = 'fee_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "fee" */
export type Fee_Set_Input = {
  fee_id?: InputMaybe<Scalars['String']>;
  fee_type?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "fee" */
export enum Fee_Update_Column {
  /** column name */
  FeeId = 'fee_id',
  /** column name */
  FeeType = 'fee_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** columns and relationships of "grade" */
export type Grade = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade_id: Scalars['String'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  partner_internal_id: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "grade" */
export type Grade_Aggregate = {
  aggregate?: Maybe<Grade_Aggregate_Fields>;
  nodes: Array<Grade>;
};

/** aggregate fields of "grade" */
export type Grade_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Grade_Max_Fields>;
  min?: Maybe<Grade_Min_Fields>;
};


/** aggregate fields of "grade" */
export type Grade_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Grade_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "grade" */
export type Grade_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Grade_Max_Order_By>;
  min?: InputMaybe<Grade_Min_Order_By>;
};

/** input type for inserting array relation for remote table "grade" */
export type Grade_Arr_Rel_Insert_Input = {
  data: Array<Grade_Insert_Input>;
  on_conflict?: InputMaybe<Grade_On_Conflict>;
};

/** Boolean expression to filter rows from the table "grade". All fields are combined with a logical 'AND'. */
export type Grade_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Grade_Bool_Exp>>>;
  _not?: InputMaybe<Grade_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Grade_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  grade_id?: InputMaybe<String_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  partner_internal_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "grade" */
export enum Grade_Constraint {
  /** unique or primary key constraint */
  GradePk = 'grade_pk'
}

/** input type for inserting data into table "grade" */
export type Grade_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade_id?: InputMaybe<Scalars['String']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  partner_internal_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Grade_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  partner_internal_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "grade" */
export type Grade_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Grade_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  grade_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  partner_internal_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "grade" */
export type Grade_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "grade" */
export type Grade_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Grade>;
};

/** input type for inserting object relation for remote table "grade" */
export type Grade_Obj_Rel_Insert_Input = {
  data: Grade_Insert_Input;
  on_conflict?: InputMaybe<Grade_On_Conflict>;
};

/** on conflict condition type for table "grade" */
export type Grade_On_Conflict = {
  constraint: Grade_Constraint;
  update_columns: Array<Grade_Update_Column>;
  where?: InputMaybe<Grade_Bool_Exp>;
};

/** ordering options when selecting data from "grade" */
export type Grade_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  partner_internal_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "grade" */
export type Grade_Pk_Columns_Input = {
  grade_id: Scalars['String'];
};

/** select columns of table "grade" */
export enum Grade_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  GradeId = 'grade_id',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  PartnerInternalId = 'partner_internal_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "grade" */
export type Grade_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  grade_id?: InputMaybe<Scalars['String']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  partner_internal_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "grade" */
export enum Grade_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  GradeId = 'grade_id',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  PartnerInternalId = 'partner_internal_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

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

/** columns and relationships of "material" */
export type Material = {
  custom_billing_date?: Maybe<Scalars['timestamptz']>;
  material_id: Scalars['String'];
  material_type: Scalars['String'];
  /** An object relationship */
  product: Product;
  resource_path: Scalars['String'];
};

/** aggregated selection of "material" */
export type Material_Aggregate = {
  aggregate?: Maybe<Material_Aggregate_Fields>;
  nodes: Array<Material>;
};

/** aggregate fields of "material" */
export type Material_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Material_Max_Fields>;
  min?: Maybe<Material_Min_Fields>;
};


/** aggregate fields of "material" */
export type Material_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Material_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "material" */
export type Material_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Material_Max_Order_By>;
  min?: InputMaybe<Material_Min_Order_By>;
};

/** input type for inserting array relation for remote table "material" */
export type Material_Arr_Rel_Insert_Input = {
  data: Array<Material_Insert_Input>;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};

/** Boolean expression to filter rows from the table "material". All fields are combined with a logical 'AND'. */
export type Material_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Material_Bool_Exp>>>;
  _not?: InputMaybe<Material_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Material_Bool_Exp>>>;
  custom_billing_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  material_id?: InputMaybe<String_Comparison_Exp>;
  material_type?: InputMaybe<String_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "material" */
export enum Material_Constraint {
  /** unique or primary key constraint */
  MaterialPk = 'material_pk'
}

/** input type for inserting data into table "material" */
export type Material_Insert_Input = {
  custom_billing_date?: InputMaybe<Scalars['timestamptz']>;
  material_id?: InputMaybe<Scalars['String']>;
  material_type?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Material_Max_Fields = {
  custom_billing_date?: Maybe<Scalars['timestamptz']>;
  material_id?: Maybe<Scalars['String']>;
  material_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "material" */
export type Material_Max_Order_By = {
  custom_billing_date?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  material_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Material_Min_Fields = {
  custom_billing_date?: Maybe<Scalars['timestamptz']>;
  material_id?: Maybe<Scalars['String']>;
  material_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "material" */
export type Material_Min_Order_By = {
  custom_billing_date?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  material_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "material" */
export type Material_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Material>;
};

/** input type for inserting object relation for remote table "material" */
export type Material_Obj_Rel_Insert_Input = {
  data: Material_Insert_Input;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};

/** on conflict condition type for table "material" */
export type Material_On_Conflict = {
  constraint: Material_Constraint;
  update_columns: Array<Material_Update_Column>;
  where?: InputMaybe<Material_Bool_Exp>;
};

/** ordering options when selecting data from "material" */
export type Material_Order_By = {
  custom_billing_date?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  material_type?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "material" */
export type Material_Pk_Columns_Input = {
  material_id: Scalars['String'];
};

/** select columns of table "material" */
export enum Material_Select_Column {
  /** column name */
  CustomBillingDate = 'custom_billing_date',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  MaterialType = 'material_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "material" */
export type Material_Set_Input = {
  custom_billing_date?: InputMaybe<Scalars['timestamptz']>;
  material_id?: InputMaybe<Scalars['String']>;
  material_type?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "material" */
export enum Material_Update_Column {
  /** column name */
  CustomBillingDate = 'custom_billing_date',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  MaterialType = 'material_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "bill_item" */
  delete_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** delete single row from the table: "bill_item" */
  delete_bill_item_by_pk?: Maybe<Bill_Item>;
  /** delete data from the table: "billing_ratio" */
  delete_billing_ratio?: Maybe<Billing_Ratio_Mutation_Response>;
  /** delete single row from the table: "billing_ratio" */
  delete_billing_ratio_by_pk?: Maybe<Billing_Ratio>;
  /** delete data from the table: "billing_schedule" */
  delete_billing_schedule?: Maybe<Billing_Schedule_Mutation_Response>;
  /** delete single row from the table: "billing_schedule" */
  delete_billing_schedule_by_pk?: Maybe<Billing_Schedule>;
  /** delete data from the table: "billing_schedule_period" */
  delete_billing_schedule_period?: Maybe<Billing_Schedule_Period_Mutation_Response>;
  /** delete single row from the table: "billing_schedule_period" */
  delete_billing_schedule_period_by_pk?: Maybe<Billing_Schedule_Period>;
  /** delete data from the table: "courses" */
  delete_courses?: Maybe<Courses_Mutation_Response>;
  /** delete single row from the table: "courses" */
  delete_courses_by_pk?: Maybe<Courses>;
  /** delete data from the table: "discount" */
  delete_discount?: Maybe<Discount_Mutation_Response>;
  /** delete single row from the table: "discount" */
  delete_discount_by_pk?: Maybe<Discount>;
  /** delete data from the table: "fee" */
  delete_fee?: Maybe<Fee_Mutation_Response>;
  /** delete single row from the table: "fee" */
  delete_fee_by_pk?: Maybe<Fee>;
  /** delete data from the table: "grade" */
  delete_grade?: Maybe<Grade_Mutation_Response>;
  /** delete single row from the table: "grade" */
  delete_grade_by_pk?: Maybe<Grade>;
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>;
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>;
  /** delete data from the table: "material" */
  delete_material?: Maybe<Material_Mutation_Response>;
  /** delete single row from the table: "material" */
  delete_material_by_pk?: Maybe<Material>;
  /** delete data from the table: "order" */
  delete_order?: Maybe<Order_Mutation_Response>;
  /** delete data from the table: "order_action_log" */
  delete_order_action_log?: Maybe<Order_Action_Log_Mutation_Response>;
  /** delete single row from the table: "order_action_log" */
  delete_order_action_log_by_pk?: Maybe<Order_Action_Log>;
  /** delete single row from the table: "order" */
  delete_order_by_pk?: Maybe<Order>;
  /** delete data from the table: "order_item" */
  delete_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** delete single row from the table: "order_item" */
  delete_order_item_by_pk?: Maybe<Order_Item>;
  /** delete data from the table: "package" */
  delete_package?: Maybe<Package_Mutation_Response>;
  /** delete single row from the table: "package" */
  delete_package_by_pk?: Maybe<Package>;
  /** delete data from the table: "package_course" */
  delete_package_course?: Maybe<Package_Course_Mutation_Response>;
  /** delete single row from the table: "package_course" */
  delete_package_course_by_pk?: Maybe<Package_Course>;
  /** delete data from the table: "package_course_fee" */
  delete_package_course_fee?: Maybe<Package_Course_Fee_Mutation_Response>;
  /** delete single row from the table: "package_course_fee" */
  delete_package_course_fee_by_pk?: Maybe<Package_Course_Fee>;
  /** delete data from the table: "package_course_material" */
  delete_package_course_material?: Maybe<Package_Course_Material_Mutation_Response>;
  /** delete single row from the table: "package_course_material" */
  delete_package_course_material_by_pk?: Maybe<Package_Course_Material>;
  /** delete data from the table: "product" */
  delete_product?: Maybe<Product_Mutation_Response>;
  /** delete single row from the table: "product" */
  delete_product_by_pk?: Maybe<Product>;
  /** delete data from the table: "product_grade" */
  delete_product_grade?: Maybe<Product_Grade_Mutation_Response>;
  /** delete single row from the table: "product_grade" */
  delete_product_grade_by_pk?: Maybe<Product_Grade>;
  /** delete data from the table: "product_location" */
  delete_product_location?: Maybe<Product_Location_Mutation_Response>;
  /** delete single row from the table: "product_location" */
  delete_product_location_by_pk?: Maybe<Product_Location>;
  /** delete data from the table: "product_price" */
  delete_product_price?: Maybe<Product_Price_Mutation_Response>;
  /** delete single row from the table: "product_price" */
  delete_product_price_by_pk?: Maybe<Product_Price>;
  /** delete data from the table: "product_setting" */
  delete_product_setting?: Maybe<Product_Setting_Mutation_Response>;
  /** delete single row from the table: "product_setting" */
  delete_product_setting_by_pk?: Maybe<Product_Setting>;
  /** delete data from the table: "student_package_class" */
  delete_student_package_class?: Maybe<Student_Package_Class_Mutation_Response>;
  /** delete single row from the table: "student_package_class" */
  delete_student_package_class_by_pk?: Maybe<Student_Package_Class>;
  /** delete data from the table: "student_packages" */
  delete_student_packages?: Maybe<Student_Packages_Mutation_Response>;
  /** delete single row from the table: "student_packages" */
  delete_student_packages_by_pk?: Maybe<Student_Packages>;
  /** delete data from the table: "student_product" */
  delete_student_product?: Maybe<Student_Product_Mutation_Response>;
  /** delete single row from the table: "student_product" */
  delete_student_product_by_pk?: Maybe<Student_Product>;
  /** delete data from the table: "tax" */
  delete_tax?: Maybe<Tax_Mutation_Response>;
  /** delete single row from the table: "tax" */
  delete_tax_by_pk?: Maybe<Tax>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "bill_item" */
  insert_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** insert a single row into the table: "bill_item" */
  insert_bill_item_one?: Maybe<Bill_Item>;
  /** insert data into the table: "billing_ratio" */
  insert_billing_ratio?: Maybe<Billing_Ratio_Mutation_Response>;
  /** insert a single row into the table: "billing_ratio" */
  insert_billing_ratio_one?: Maybe<Billing_Ratio>;
  /** insert data into the table: "billing_schedule" */
  insert_billing_schedule?: Maybe<Billing_Schedule_Mutation_Response>;
  /** insert a single row into the table: "billing_schedule" */
  insert_billing_schedule_one?: Maybe<Billing_Schedule>;
  /** insert data into the table: "billing_schedule_period" */
  insert_billing_schedule_period?: Maybe<Billing_Schedule_Period_Mutation_Response>;
  /** insert a single row into the table: "billing_schedule_period" */
  insert_billing_schedule_period_one?: Maybe<Billing_Schedule_Period>;
  /** insert data into the table: "courses" */
  insert_courses?: Maybe<Courses_Mutation_Response>;
  /** insert a single row into the table: "courses" */
  insert_courses_one?: Maybe<Courses>;
  /** insert data into the table: "discount" */
  insert_discount?: Maybe<Discount_Mutation_Response>;
  /** insert a single row into the table: "discount" */
  insert_discount_one?: Maybe<Discount>;
  /** insert data into the table: "fee" */
  insert_fee?: Maybe<Fee_Mutation_Response>;
  /** insert a single row into the table: "fee" */
  insert_fee_one?: Maybe<Fee>;
  /** insert data into the table: "grade" */
  insert_grade?: Maybe<Grade_Mutation_Response>;
  /** insert a single row into the table: "grade" */
  insert_grade_one?: Maybe<Grade>;
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>;
  /** insert data into the table: "material" */
  insert_material?: Maybe<Material_Mutation_Response>;
  /** insert a single row into the table: "material" */
  insert_material_one?: Maybe<Material>;
  /** insert data into the table: "order" */
  insert_order?: Maybe<Order_Mutation_Response>;
  /** insert data into the table: "order_action_log" */
  insert_order_action_log?: Maybe<Order_Action_Log_Mutation_Response>;
  /** insert a single row into the table: "order_action_log" */
  insert_order_action_log_one?: Maybe<Order_Action_Log>;
  /** insert data into the table: "order_item" */
  insert_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** insert a single row into the table: "order_item" */
  insert_order_item_one?: Maybe<Order_Item>;
  /** insert a single row into the table: "order" */
  insert_order_one?: Maybe<Order>;
  /** insert data into the table: "package" */
  insert_package?: Maybe<Package_Mutation_Response>;
  /** insert data into the table: "package_course" */
  insert_package_course?: Maybe<Package_Course_Mutation_Response>;
  /** insert data into the table: "package_course_fee" */
  insert_package_course_fee?: Maybe<Package_Course_Fee_Mutation_Response>;
  /** insert a single row into the table: "package_course_fee" */
  insert_package_course_fee_one?: Maybe<Package_Course_Fee>;
  /** insert data into the table: "package_course_material" */
  insert_package_course_material?: Maybe<Package_Course_Material_Mutation_Response>;
  /** insert a single row into the table: "package_course_material" */
  insert_package_course_material_one?: Maybe<Package_Course_Material>;
  /** insert a single row into the table: "package_course" */
  insert_package_course_one?: Maybe<Package_Course>;
  /** insert a single row into the table: "package" */
  insert_package_one?: Maybe<Package>;
  /** insert data into the table: "product" */
  insert_product?: Maybe<Product_Mutation_Response>;
  /** insert data into the table: "product_grade" */
  insert_product_grade?: Maybe<Product_Grade_Mutation_Response>;
  /** insert a single row into the table: "product_grade" */
  insert_product_grade_one?: Maybe<Product_Grade>;
  /** insert data into the table: "product_location" */
  insert_product_location?: Maybe<Product_Location_Mutation_Response>;
  /** insert a single row into the table: "product_location" */
  insert_product_location_one?: Maybe<Product_Location>;
  /** insert a single row into the table: "product" */
  insert_product_one?: Maybe<Product>;
  /** insert data into the table: "product_price" */
  insert_product_price?: Maybe<Product_Price_Mutation_Response>;
  /** insert a single row into the table: "product_price" */
  insert_product_price_one?: Maybe<Product_Price>;
  /** insert data into the table: "product_setting" */
  insert_product_setting?: Maybe<Product_Setting_Mutation_Response>;
  /** insert a single row into the table: "product_setting" */
  insert_product_setting_one?: Maybe<Product_Setting>;
  /** insert data into the table: "student_package_class" */
  insert_student_package_class?: Maybe<Student_Package_Class_Mutation_Response>;
  /** insert a single row into the table: "student_package_class" */
  insert_student_package_class_one?: Maybe<Student_Package_Class>;
  /** insert data into the table: "student_packages" */
  insert_student_packages?: Maybe<Student_Packages_Mutation_Response>;
  /** insert a single row into the table: "student_packages" */
  insert_student_packages_one?: Maybe<Student_Packages>;
  /** insert data into the table: "student_product" */
  insert_student_product?: Maybe<Student_Product_Mutation_Response>;
  /** insert a single row into the table: "student_product" */
  insert_student_product_one?: Maybe<Student_Product>;
  /** insert data into the table: "tax" */
  insert_tax?: Maybe<Tax_Mutation_Response>;
  /** insert a single row into the table: "tax" */
  insert_tax_one?: Maybe<Tax>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "bill_item" */
  update_bill_item?: Maybe<Bill_Item_Mutation_Response>;
  /** update single row of the table: "bill_item" */
  update_bill_item_by_pk?: Maybe<Bill_Item>;
  /** update data of the table: "billing_ratio" */
  update_billing_ratio?: Maybe<Billing_Ratio_Mutation_Response>;
  /** update single row of the table: "billing_ratio" */
  update_billing_ratio_by_pk?: Maybe<Billing_Ratio>;
  /** update data of the table: "billing_schedule" */
  update_billing_schedule?: Maybe<Billing_Schedule_Mutation_Response>;
  /** update single row of the table: "billing_schedule" */
  update_billing_schedule_by_pk?: Maybe<Billing_Schedule>;
  /** update data of the table: "billing_schedule_period" */
  update_billing_schedule_period?: Maybe<Billing_Schedule_Period_Mutation_Response>;
  /** update single row of the table: "billing_schedule_period" */
  update_billing_schedule_period_by_pk?: Maybe<Billing_Schedule_Period>;
  /** update data of the table: "courses" */
  update_courses?: Maybe<Courses_Mutation_Response>;
  /** update single row of the table: "courses" */
  update_courses_by_pk?: Maybe<Courses>;
  /** update data of the table: "discount" */
  update_discount?: Maybe<Discount_Mutation_Response>;
  /** update single row of the table: "discount" */
  update_discount_by_pk?: Maybe<Discount>;
  /** update data of the table: "fee" */
  update_fee?: Maybe<Fee_Mutation_Response>;
  /** update single row of the table: "fee" */
  update_fee_by_pk?: Maybe<Fee>;
  /** update data of the table: "grade" */
  update_grade?: Maybe<Grade_Mutation_Response>;
  /** update single row of the table: "grade" */
  update_grade_by_pk?: Maybe<Grade>;
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>;
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>;
  /** update data of the table: "material" */
  update_material?: Maybe<Material_Mutation_Response>;
  /** update single row of the table: "material" */
  update_material_by_pk?: Maybe<Material>;
  /** update data of the table: "order" */
  update_order?: Maybe<Order_Mutation_Response>;
  /** update data of the table: "order_action_log" */
  update_order_action_log?: Maybe<Order_Action_Log_Mutation_Response>;
  /** update single row of the table: "order_action_log" */
  update_order_action_log_by_pk?: Maybe<Order_Action_Log>;
  /** update single row of the table: "order" */
  update_order_by_pk?: Maybe<Order>;
  /** update data of the table: "order_item" */
  update_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** update single row of the table: "order_item" */
  update_order_item_by_pk?: Maybe<Order_Item>;
  /** update data of the table: "package" */
  update_package?: Maybe<Package_Mutation_Response>;
  /** update single row of the table: "package" */
  update_package_by_pk?: Maybe<Package>;
  /** update data of the table: "package_course" */
  update_package_course?: Maybe<Package_Course_Mutation_Response>;
  /** update single row of the table: "package_course" */
  update_package_course_by_pk?: Maybe<Package_Course>;
  /** update data of the table: "package_course_fee" */
  update_package_course_fee?: Maybe<Package_Course_Fee_Mutation_Response>;
  /** update single row of the table: "package_course_fee" */
  update_package_course_fee_by_pk?: Maybe<Package_Course_Fee>;
  /** update data of the table: "package_course_material" */
  update_package_course_material?: Maybe<Package_Course_Material_Mutation_Response>;
  /** update single row of the table: "package_course_material" */
  update_package_course_material_by_pk?: Maybe<Package_Course_Material>;
  /** update data of the table: "product" */
  update_product?: Maybe<Product_Mutation_Response>;
  /** update single row of the table: "product" */
  update_product_by_pk?: Maybe<Product>;
  /** update data of the table: "product_grade" */
  update_product_grade?: Maybe<Product_Grade_Mutation_Response>;
  /** update single row of the table: "product_grade" */
  update_product_grade_by_pk?: Maybe<Product_Grade>;
  /** update data of the table: "product_location" */
  update_product_location?: Maybe<Product_Location_Mutation_Response>;
  /** update single row of the table: "product_location" */
  update_product_location_by_pk?: Maybe<Product_Location>;
  /** update data of the table: "product_price" */
  update_product_price?: Maybe<Product_Price_Mutation_Response>;
  /** update single row of the table: "product_price" */
  update_product_price_by_pk?: Maybe<Product_Price>;
  /** update data of the table: "product_setting" */
  update_product_setting?: Maybe<Product_Setting_Mutation_Response>;
  /** update single row of the table: "product_setting" */
  update_product_setting_by_pk?: Maybe<Product_Setting>;
  /** update data of the table: "student_package_class" */
  update_student_package_class?: Maybe<Student_Package_Class_Mutation_Response>;
  /** update single row of the table: "student_package_class" */
  update_student_package_class_by_pk?: Maybe<Student_Package_Class>;
  /** update data of the table: "student_packages" */
  update_student_packages?: Maybe<Student_Packages_Mutation_Response>;
  /** update single row of the table: "student_packages" */
  update_student_packages_by_pk?: Maybe<Student_Packages>;
  /** update data of the table: "student_product" */
  update_student_product?: Maybe<Student_Product_Mutation_Response>;
  /** update single row of the table: "student_product" */
  update_student_product_by_pk?: Maybe<Student_Product>;
  /** update data of the table: "tax" */
  update_tax?: Maybe<Tax_Mutation_Response>;
  /** update single row of the table: "tax" */
  update_tax_by_pk?: Maybe<Tax>;
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
export type Mutation_RootDelete_Billing_RatioArgs = {
  where: Billing_Ratio_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Billing_Ratio_By_PkArgs = {
  billing_ratio_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Billing_ScheduleArgs = {
  where: Billing_Schedule_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Billing_Schedule_By_PkArgs = {
  billing_schedule_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Billing_Schedule_PeriodArgs = {
  where: Billing_Schedule_Period_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Billing_Schedule_Period_By_PkArgs = {
  billing_schedule_period_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_CoursesArgs = {
  where: Courses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Courses_By_PkArgs = {
  course_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_DiscountArgs = {
  where: Discount_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Discount_By_PkArgs = {
  discount_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_FeeArgs = {
  where: Fee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Fee_By_PkArgs = {
  fee_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_GradeArgs = {
  where: Grade_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Grade_By_PkArgs = {
  grade_id: Scalars['String'];
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
export type Mutation_RootDelete_MaterialArgs = {
  where: Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Material_By_PkArgs = {
  material_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_OrderArgs = {
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Action_LogArgs = {
  where: Order_Action_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Action_Log_By_PkArgs = {
  order_action_log_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Order_By_PkArgs = {
  order_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Order_ItemArgs = {
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_By_PkArgs = {
  order_item_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PackageArgs = {
  where: Package_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_By_PkArgs = {
  package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Package_CourseArgs = {
  where: Package_Course_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_Course_By_PkArgs = {
  course_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Package_Course_FeeArgs = {
  where: Package_Course_Fee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_Course_Fee_By_PkArgs = {
  course_id: Scalars['String'];
  fee_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Package_Course_MaterialArgs = {
  where: Package_Course_Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_Course_Material_By_PkArgs = {
  course_id: Scalars['String'];
  material_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_ProductArgs = {
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_By_PkArgs = {
  product_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_GradeArgs = {
  where: Product_Grade_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Grade_By_PkArgs = {
  grade_id: Scalars['Int'];
  product_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_LocationArgs = {
  where: Product_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Location_By_PkArgs = {
  location_id: Scalars['String'];
  product_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_PriceArgs = {
  where: Product_Price_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Price_By_PkArgs = {
  product_price_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Product_SettingArgs = {
  where: Product_Setting_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Setting_By_PkArgs = {
  product_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_Package_ClassArgs = {
  where: Student_Package_Class_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Package_Class_By_PkArgs = {
  class_id: Scalars['String'];
  course_id: Scalars['String'];
  location_id: Scalars['String'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_PackagesArgs = {
  where: Student_Packages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Packages_By_PkArgs = {
  student_package_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Student_ProductArgs = {
  where: Student_Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Student_Product_By_PkArgs = {
  student_product_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TaxArgs = {
  where: Tax_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tax_By_PkArgs = {
  tax_id: Scalars['String'];
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
export type Mutation_RootInsert_Billing_RatioArgs = {
  objects: Array<Billing_Ratio_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Ratio_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_Ratio_OneArgs = {
  object: Billing_Ratio_Insert_Input;
  on_conflict?: InputMaybe<Billing_Ratio_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_ScheduleArgs = {
  objects: Array<Billing_Schedule_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Schedule_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_Schedule_OneArgs = {
  object: Billing_Schedule_Insert_Input;
  on_conflict?: InputMaybe<Billing_Schedule_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_Schedule_PeriodArgs = {
  objects: Array<Billing_Schedule_Period_Insert_Input>;
  on_conflict?: InputMaybe<Billing_Schedule_Period_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_Schedule_Period_OneArgs = {
  object: Billing_Schedule_Period_Insert_Input;
  on_conflict?: InputMaybe<Billing_Schedule_Period_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CoursesArgs = {
  objects: Array<Courses_Insert_Input>;
  on_conflict?: InputMaybe<Courses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Courses_OneArgs = {
  object: Courses_Insert_Input;
  on_conflict?: InputMaybe<Courses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DiscountArgs = {
  objects: Array<Discount_Insert_Input>;
  on_conflict?: InputMaybe<Discount_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Discount_OneArgs = {
  object: Discount_Insert_Input;
  on_conflict?: InputMaybe<Discount_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FeeArgs = {
  objects: Array<Fee_Insert_Input>;
  on_conflict?: InputMaybe<Fee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Fee_OneArgs = {
  object: Fee_Insert_Input;
  on_conflict?: InputMaybe<Fee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GradeArgs = {
  objects: Array<Grade_Insert_Input>;
  on_conflict?: InputMaybe<Grade_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Grade_OneArgs = {
  object: Grade_Insert_Input;
  on_conflict?: InputMaybe<Grade_On_Conflict>;
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
export type Mutation_RootInsert_MaterialArgs = {
  objects: Array<Material_Insert_Input>;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Material_OneArgs = {
  object: Material_Insert_Input;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrderArgs = {
  objects: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Action_LogArgs = {
  objects: Array<Order_Action_Log_Insert_Input>;
  on_conflict?: InputMaybe<Order_Action_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Action_Log_OneArgs = {
  object: Order_Action_Log_Insert_Input;
  on_conflict?: InputMaybe<Order_Action_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_ItemArgs = {
  objects: Array<Order_Item_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_OneArgs = {
  object: Order_Item_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_OneArgs = {
  object: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PackageArgs = {
  objects: Array<Package_Insert_Input>;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_CourseArgs = {
  objects: Array<Package_Course_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Course_FeeArgs = {
  objects: Array<Package_Course_Fee_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_Fee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Course_Fee_OneArgs = {
  object: Package_Course_Fee_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_Fee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Course_MaterialArgs = {
  objects: Array<Package_Course_Material_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Course_Material_OneArgs = {
  object: Package_Course_Material_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Course_OneArgs = {
  object: Package_Course_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_OneArgs = {
  object: Package_Insert_Input;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductArgs = {
  objects: Array<Product_Insert_Input>;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_GradeArgs = {
  objects: Array<Product_Grade_Insert_Input>;
  on_conflict?: InputMaybe<Product_Grade_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Grade_OneArgs = {
  object: Product_Grade_Insert_Input;
  on_conflict?: InputMaybe<Product_Grade_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_LocationArgs = {
  objects: Array<Product_Location_Insert_Input>;
  on_conflict?: InputMaybe<Product_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Location_OneArgs = {
  object: Product_Location_Insert_Input;
  on_conflict?: InputMaybe<Product_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_OneArgs = {
  object: Product_Insert_Input;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_PriceArgs = {
  objects: Array<Product_Price_Insert_Input>;
  on_conflict?: InputMaybe<Product_Price_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Price_OneArgs = {
  object: Product_Price_Insert_Input;
  on_conflict?: InputMaybe<Product_Price_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_SettingArgs = {
  objects: Array<Product_Setting_Insert_Input>;
  on_conflict?: InputMaybe<Product_Setting_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Setting_OneArgs = {
  object: Product_Setting_Insert_Input;
  on_conflict?: InputMaybe<Product_Setting_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Package_ClassArgs = {
  objects: Array<Student_Package_Class_Insert_Input>;
  on_conflict?: InputMaybe<Student_Package_Class_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Package_Class_OneArgs = {
  object: Student_Package_Class_Insert_Input;
  on_conflict?: InputMaybe<Student_Package_Class_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_PackagesArgs = {
  objects: Array<Student_Packages_Insert_Input>;
  on_conflict?: InputMaybe<Student_Packages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Packages_OneArgs = {
  object: Student_Packages_Insert_Input;
  on_conflict?: InputMaybe<Student_Packages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_ProductArgs = {
  objects: Array<Student_Product_Insert_Input>;
  on_conflict?: InputMaybe<Student_Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Student_Product_OneArgs = {
  object: Student_Product_Insert_Input;
  on_conflict?: InputMaybe<Student_Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TaxArgs = {
  objects: Array<Tax_Insert_Input>;
  on_conflict?: InputMaybe<Tax_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tax_OneArgs = {
  object: Tax_Insert_Input;
  on_conflict?: InputMaybe<Tax_On_Conflict>;
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
export type Mutation_RootUpdate_Billing_RatioArgs = {
  _inc?: InputMaybe<Billing_Ratio_Inc_Input>;
  _set?: InputMaybe<Billing_Ratio_Set_Input>;
  where: Billing_Ratio_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_Ratio_By_PkArgs = {
  _inc?: InputMaybe<Billing_Ratio_Inc_Input>;
  _set?: InputMaybe<Billing_Ratio_Set_Input>;
  pk_columns: Billing_Ratio_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_ScheduleArgs = {
  _set?: InputMaybe<Billing_Schedule_Set_Input>;
  where: Billing_Schedule_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_Schedule_By_PkArgs = {
  _set?: InputMaybe<Billing_Schedule_Set_Input>;
  pk_columns: Billing_Schedule_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_Schedule_PeriodArgs = {
  _set?: InputMaybe<Billing_Schedule_Period_Set_Input>;
  where: Billing_Schedule_Period_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_Schedule_Period_By_PkArgs = {
  _set?: InputMaybe<Billing_Schedule_Period_Set_Input>;
  pk_columns: Billing_Schedule_Period_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CoursesArgs = {
  _inc?: InputMaybe<Courses_Inc_Input>;
  _set?: InputMaybe<Courses_Set_Input>;
  where: Courses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Courses_By_PkArgs = {
  _inc?: InputMaybe<Courses_Inc_Input>;
  _set?: InputMaybe<Courses_Set_Input>;
  pk_columns: Courses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DiscountArgs = {
  _inc?: InputMaybe<Discount_Inc_Input>;
  _set?: InputMaybe<Discount_Set_Input>;
  where: Discount_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Discount_By_PkArgs = {
  _inc?: InputMaybe<Discount_Inc_Input>;
  _set?: InputMaybe<Discount_Set_Input>;
  pk_columns: Discount_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FeeArgs = {
  _set?: InputMaybe<Fee_Set_Input>;
  where: Fee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Fee_By_PkArgs = {
  _set?: InputMaybe<Fee_Set_Input>;
  pk_columns: Fee_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GradeArgs = {
  _set?: InputMaybe<Grade_Set_Input>;
  where: Grade_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Grade_By_PkArgs = {
  _set?: InputMaybe<Grade_Set_Input>;
  pk_columns: Grade_Pk_Columns_Input;
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
export type Mutation_RootUpdate_MaterialArgs = {
  _set?: InputMaybe<Material_Set_Input>;
  where: Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Material_By_PkArgs = {
  _set?: InputMaybe<Material_Set_Input>;
  pk_columns: Material_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrderArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Action_LogArgs = {
  _inc?: InputMaybe<Order_Action_Log_Inc_Input>;
  _set?: InputMaybe<Order_Action_Log_Set_Input>;
  where: Order_Action_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Action_Log_By_PkArgs = {
  _inc?: InputMaybe<Order_Action_Log_Inc_Input>;
  _set?: InputMaybe<Order_Action_Log_Set_Input>;
  pk_columns: Order_Action_Log_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_By_PkArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  pk_columns: Order_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ItemArgs = {
  _set?: InputMaybe<Order_Item_Set_Input>;
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_By_PkArgs = {
  _set?: InputMaybe<Order_Item_Set_Input>;
  pk_columns: Order_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PackageArgs = {
  _inc?: InputMaybe<Package_Inc_Input>;
  _set?: InputMaybe<Package_Set_Input>;
  where: Package_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_By_PkArgs = {
  _inc?: InputMaybe<Package_Inc_Input>;
  _set?: InputMaybe<Package_Set_Input>;
  pk_columns: Package_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_CourseArgs = {
  _inc?: InputMaybe<Package_Course_Inc_Input>;
  _set?: InputMaybe<Package_Course_Set_Input>;
  where: Package_Course_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Course_By_PkArgs = {
  _inc?: InputMaybe<Package_Course_Inc_Input>;
  _set?: InputMaybe<Package_Course_Set_Input>;
  pk_columns: Package_Course_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Course_FeeArgs = {
  _set?: InputMaybe<Package_Course_Fee_Set_Input>;
  where: Package_Course_Fee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Course_Fee_By_PkArgs = {
  _set?: InputMaybe<Package_Course_Fee_Set_Input>;
  pk_columns: Package_Course_Fee_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Course_MaterialArgs = {
  _set?: InputMaybe<Package_Course_Material_Set_Input>;
  where: Package_Course_Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Course_Material_By_PkArgs = {
  _set?: InputMaybe<Package_Course_Material_Set_Input>;
  pk_columns: Package_Course_Material_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductArgs = {
  _set?: InputMaybe<Product_Set_Input>;
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_By_PkArgs = {
  _set?: InputMaybe<Product_Set_Input>;
  pk_columns: Product_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_GradeArgs = {
  _inc?: InputMaybe<Product_Grade_Inc_Input>;
  _set?: InputMaybe<Product_Grade_Set_Input>;
  where: Product_Grade_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Grade_By_PkArgs = {
  _inc?: InputMaybe<Product_Grade_Inc_Input>;
  _set?: InputMaybe<Product_Grade_Set_Input>;
  pk_columns: Product_Grade_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_LocationArgs = {
  _set?: InputMaybe<Product_Location_Set_Input>;
  where: Product_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Location_By_PkArgs = {
  _set?: InputMaybe<Product_Location_Set_Input>;
  pk_columns: Product_Location_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_PriceArgs = {
  _inc?: InputMaybe<Product_Price_Inc_Input>;
  _set?: InputMaybe<Product_Price_Set_Input>;
  where: Product_Price_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Price_By_PkArgs = {
  _inc?: InputMaybe<Product_Price_Inc_Input>;
  _set?: InputMaybe<Product_Price_Set_Input>;
  pk_columns: Product_Price_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_SettingArgs = {
  _set?: InputMaybe<Product_Setting_Set_Input>;
  where: Product_Setting_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Setting_By_PkArgs = {
  _set?: InputMaybe<Product_Setting_Set_Input>;
  pk_columns: Product_Setting_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Package_ClassArgs = {
  _set?: InputMaybe<Student_Package_Class_Set_Input>;
  where: Student_Package_Class_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Package_Class_By_PkArgs = {
  _set?: InputMaybe<Student_Package_Class_Set_Input>;
  pk_columns: Student_Package_Class_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_PackagesArgs = {
  _append?: InputMaybe<Student_Packages_Append_Input>;
  _delete_at_path?: InputMaybe<Student_Packages_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Student_Packages_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Student_Packages_Delete_Key_Input>;
  _prepend?: InputMaybe<Student_Packages_Prepend_Input>;
  _set?: InputMaybe<Student_Packages_Set_Input>;
  where: Student_Packages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Packages_By_PkArgs = {
  _append?: InputMaybe<Student_Packages_Append_Input>;
  _delete_at_path?: InputMaybe<Student_Packages_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Student_Packages_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Student_Packages_Delete_Key_Input>;
  _prepend?: InputMaybe<Student_Packages_Prepend_Input>;
  _set?: InputMaybe<Student_Packages_Set_Input>;
  pk_columns: Student_Packages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Student_ProductArgs = {
  _set?: InputMaybe<Student_Product_Set_Input>;
  where: Student_Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Student_Product_By_PkArgs = {
  _set?: InputMaybe<Student_Product_Set_Input>;
  pk_columns: Student_Product_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TaxArgs = {
  _inc?: InputMaybe<Tax_Inc_Input>;
  _set?: InputMaybe<Tax_Set_Input>;
  where: Tax_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tax_By_PkArgs = {
  _inc?: InputMaybe<Tax_Inc_Input>;
  _set?: InputMaybe<Tax_Set_Input>;
  pk_columns: Tax_Pk_Columns_Input;
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

/** columns and relationships of "order" */
export type Order = {
  created_at: Scalars['timestamptz'];
  location_id: Scalars['String'];
  order_comment?: Maybe<Scalars['String']>;
  order_id: Scalars['String'];
  order_sequence_number: Scalars['Int'];
  order_status: Scalars['String'];
  order_type?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  student_full_name: Scalars['String'];
  student_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** columns and relationships of "order_action_log" */
export type Order_Action_Log = {
  action?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  order_action_log_id: Scalars['Int'];
  order_id: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "order_action_log" */
export type Order_Action_Log_Aggregate = {
  aggregate?: Maybe<Order_Action_Log_Aggregate_Fields>;
  nodes: Array<Order_Action_Log>;
};

/** aggregate fields of "order_action_log" */
export type Order_Action_Log_Aggregate_Fields = {
  avg?: Maybe<Order_Action_Log_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Order_Action_Log_Max_Fields>;
  min?: Maybe<Order_Action_Log_Min_Fields>;
  stddev?: Maybe<Order_Action_Log_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Action_Log_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Action_Log_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Action_Log_Sum_Fields>;
  var_pop?: Maybe<Order_Action_Log_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Action_Log_Var_Samp_Fields>;
  variance?: Maybe<Order_Action_Log_Variance_Fields>;
};


/** aggregate fields of "order_action_log" */
export type Order_Action_Log_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Action_Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order_action_log" */
export type Order_Action_Log_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Action_Log_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Action_Log_Max_Order_By>;
  min?: InputMaybe<Order_Action_Log_Min_Order_By>;
  stddev?: InputMaybe<Order_Action_Log_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Action_Log_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Action_Log_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Action_Log_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Action_Log_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Action_Log_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Action_Log_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_action_log" */
export type Order_Action_Log_Arr_Rel_Insert_Input = {
  data: Array<Order_Action_Log_Insert_Input>;
  on_conflict?: InputMaybe<Order_Action_Log_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Action_Log_Avg_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "order_action_log" */
export type Order_Action_Log_Avg_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_action_log". All fields are combined with a logical 'AND'. */
export type Order_Action_Log_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Order_Action_Log_Bool_Exp>>>;
  _not?: InputMaybe<Order_Action_Log_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Order_Action_Log_Bool_Exp>>>;
  action?: InputMaybe<String_Comparison_Exp>;
  comment?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  order_action_log_id?: InputMaybe<Int_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_action_log" */
export enum Order_Action_Log_Constraint {
  /** unique or primary key constraint */
  OrderActionLogPk = 'order_action_log_pk'
}

/** input type for incrementing integer column in table "order_action_log" */
export type Order_Action_Log_Inc_Input = {
  order_action_log_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "order_action_log" */
export type Order_Action_Log_Insert_Input = {
  action?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  order_action_log_id?: InputMaybe<Scalars['Int']>;
  order_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Order_Action_Log_Max_Fields = {
  action?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  order_action_log_id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "order_action_log" */
export type Order_Action_Log_Max_Order_By = {
  action?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  order_action_log_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Action_Log_Min_Fields = {
  action?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  order_action_log_id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "order_action_log" */
export type Order_Action_Log_Min_Order_By = {
  action?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  order_action_log_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_action_log" */
export type Order_Action_Log_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Order_Action_Log>;
};

/** input type for inserting object relation for remote table "order_action_log" */
export type Order_Action_Log_Obj_Rel_Insert_Input = {
  data: Order_Action_Log_Insert_Input;
  on_conflict?: InputMaybe<Order_Action_Log_On_Conflict>;
};

/** on conflict condition type for table "order_action_log" */
export type Order_Action_Log_On_Conflict = {
  constraint: Order_Action_Log_Constraint;
  update_columns: Array<Order_Action_Log_Update_Column>;
  where?: InputMaybe<Order_Action_Log_Bool_Exp>;
};

/** ordering options when selecting data from "order_action_log" */
export type Order_Action_Log_Order_By = {
  action?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  order_action_log_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "order_action_log" */
export type Order_Action_Log_Pk_Columns_Input = {
  order_action_log_id: Scalars['Int'];
};

/** select columns of table "order_action_log" */
export enum Order_Action_Log_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  OrderActionLogId = 'order_action_log_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "order_action_log" */
export type Order_Action_Log_Set_Input = {
  action?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  order_action_log_id?: InputMaybe<Scalars['Int']>;
  order_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Order_Action_Log_Stddev_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "order_action_log" */
export type Order_Action_Log_Stddev_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Action_Log_Stddev_Pop_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "order_action_log" */
export type Order_Action_Log_Stddev_Pop_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Action_Log_Stddev_Samp_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "order_action_log" */
export type Order_Action_Log_Stddev_Samp_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Order_Action_Log_Sum_Fields = {
  order_action_log_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "order_action_log" */
export type Order_Action_Log_Sum_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_action_log" */
export enum Order_Action_Log_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  OrderActionLogId = 'order_action_log_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Order_Action_Log_Var_Pop_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "order_action_log" */
export type Order_Action_Log_Var_Pop_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Action_Log_Var_Samp_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "order_action_log" */
export type Order_Action_Log_Var_Samp_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Action_Log_Variance_Fields = {
  order_action_log_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "order_action_log" */
export type Order_Action_Log_Variance_Order_By = {
  order_action_log_id?: InputMaybe<Order_By>;
};

/** aggregated selection of "order" */
export type Order_Aggregate = {
  aggregate?: Maybe<Order_Aggregate_Fields>;
  nodes: Array<Order>;
};

/** aggregate fields of "order" */
export type Order_Aggregate_Fields = {
  avg?: Maybe<Order_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Order_Max_Fields>;
  min?: Maybe<Order_Min_Fields>;
  stddev?: Maybe<Order_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Sum_Fields>;
  var_pop?: Maybe<Order_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Var_Samp_Fields>;
  variance?: Maybe<Order_Variance_Fields>;
};


/** aggregate fields of "order" */
export type Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order" */
export type Order_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Max_Order_By>;
  min?: InputMaybe<Order_Min_Order_By>;
  stddev?: InputMaybe<Order_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order" */
export type Order_Arr_Rel_Insert_Input = {
  data: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Avg_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "order" */
export type Order_Avg_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order". All fields are combined with a logical 'AND'. */
export type Order_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Order_Bool_Exp>>>;
  _not?: InputMaybe<Order_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Order_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  order_comment?: InputMaybe<String_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  order_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  order_status?: InputMaybe<String_Comparison_Exp>;
  order_type?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_full_name?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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

/** unique or primary key constraints on table "order" */
export enum Order_Constraint {
  /** unique or primary key constraint */
  OrderPk = 'order_pk',
  /** unique or primary key constraint */
  OrderSequenceNumberResourcePathUnique = 'order_sequence_number_resource_path_unique'
}

/** input type for incrementing integer column in table "order" */
export type Order_Inc_Input = {
  order_sequence_number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "order" */
export type Order_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  order_comment?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  order_sequence_number?: InputMaybe<Scalars['Int']>;
  order_status?: InputMaybe<Scalars['String']>;
  order_type?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_full_name?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "order_item" */
export type Order_Item = {
  cancellation_date?: Maybe<Scalars['timestamptz']>;
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  discount?: Maybe<Discount>;
  discount_id?: Maybe<Scalars['String']>;
  effective_date?: Maybe<Scalars['timestamptz']>;
  order_id: Scalars['String'];
  order_item_id: Scalars['String'];
  /** An object relationship */
  product?: Maybe<Product>;
  product_id?: Maybe<Scalars['String']>;
  product_name?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  start_date?: Maybe<Scalars['timestamptz']>;
  student_product_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "order_item" */
export type Order_Item_Aggregate = {
  aggregate?: Maybe<Order_Item_Aggregate_Fields>;
  nodes: Array<Order_Item>;
};

/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Order_Item_Max_Fields>;
  min?: Maybe<Order_Item_Min_Fields>;
};


/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order_item" */
export type Order_Item_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Item_Max_Order_By>;
  min?: InputMaybe<Order_Item_Min_Order_By>;
};

/** input type for inserting array relation for remote table "order_item" */
export type Order_Item_Arr_Rel_Insert_Input = {
  data: Array<Order_Item_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};

/** Boolean expression to filter rows from the table "order_item". All fields are combined with a logical 'AND'. */
export type Order_Item_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Order_Item_Bool_Exp>>>;
  _not?: InputMaybe<Order_Item_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Order_Item_Bool_Exp>>>;
  cancellation_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discount?: InputMaybe<Discount_Bool_Exp>;
  discount_id?: InputMaybe<String_Comparison_Exp>;
  effective_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  order_item_id?: InputMaybe<String_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  product_name?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  student_product_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_item" */
export enum Order_Item_Constraint {
  /** unique or primary key constraint */
  OrderItemIdPk = 'order_item_id_pk'
}

/** input type for inserting data into table "order_item" */
export type Order_Item_Insert_Input = {
  cancellation_date?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount?: InputMaybe<Discount_Obj_Rel_Insert_Input>;
  discount_id?: InputMaybe<Scalars['String']>;
  effective_date?: InputMaybe<Scalars['timestamptz']>;
  order_id?: InputMaybe<Scalars['String']>;
  order_item_id?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  product_name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  student_product_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Order_Item_Max_Fields = {
  cancellation_date?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_id?: Maybe<Scalars['String']>;
  effective_date?: Maybe<Scalars['timestamptz']>;
  order_id?: Maybe<Scalars['String']>;
  order_item_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  student_product_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "order_item" */
export type Order_Item_Max_Order_By = {
  cancellation_date?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  effective_date?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Item_Min_Fields = {
  cancellation_date?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_id?: Maybe<Scalars['String']>;
  effective_date?: Maybe<Scalars['timestamptz']>;
  order_id?: Maybe<Scalars['String']>;
  order_item_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  student_product_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "order_item" */
export type Order_Item_Min_Order_By = {
  cancellation_date?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_id?: InputMaybe<Order_By>;
  effective_date?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_item" */
export type Order_Item_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Order_Item>;
};

/** input type for inserting object relation for remote table "order_item" */
export type Order_Item_Obj_Rel_Insert_Input = {
  data: Order_Item_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};

/** on conflict condition type for table "order_item" */
export type Order_Item_On_Conflict = {
  constraint: Order_Item_Constraint;
  update_columns: Array<Order_Item_Update_Column>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};

/** ordering options when selecting data from "order_item" */
export type Order_Item_Order_By = {
  cancellation_date?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount?: InputMaybe<Discount_Order_By>;
  discount_id?: InputMaybe<Order_By>;
  effective_date?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "order_item" */
export type Order_Item_Pk_Columns_Input = {
  order_item_id: Scalars['String'];
};

/** select columns of table "order_item" */
export enum Order_Item_Select_Column {
  /** column name */
  CancellationDate = 'cancellation_date',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountId = 'discount_id',
  /** column name */
  EffectiveDate = 'effective_date',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  OrderItemId = 'order_item_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductName = 'product_name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StudentProductId = 'student_product_id'
}

/** input type for updating data in table "order_item" */
export type Order_Item_Set_Input = {
  cancellation_date?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  discount_id?: InputMaybe<Scalars['String']>;
  effective_date?: InputMaybe<Scalars['timestamptz']>;
  order_id?: InputMaybe<Scalars['String']>;
  order_item_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  student_product_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "order_item" */
export enum Order_Item_Update_Column {
  /** column name */
  CancellationDate = 'cancellation_date',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountId = 'discount_id',
  /** column name */
  EffectiveDate = 'effective_date',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  OrderItemId = 'order_item_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductName = 'product_name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StudentProductId = 'student_product_id'
}

/** aggregate max on columns */
export type Order_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  order_comment?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  order_sequence_number?: Maybe<Scalars['Int']>;
  order_status?: Maybe<Scalars['String']>;
  order_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_full_name?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "order" */
export type Order_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  order_comment?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_sequence_number?: InputMaybe<Order_By>;
  order_status?: InputMaybe<Order_By>;
  order_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_full_name?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  order_comment?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  order_sequence_number?: Maybe<Scalars['Int']>;
  order_status?: Maybe<Scalars['String']>;
  order_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_full_name?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "order" */
export type Order_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  order_comment?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_sequence_number?: InputMaybe<Order_By>;
  order_status?: InputMaybe<Order_By>;
  order_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_full_name?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order" */
export type Order_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Order>;
};

/** input type for inserting object relation for remote table "order" */
export type Order_Obj_Rel_Insert_Input = {
  data: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** on conflict condition type for table "order" */
export type Order_On_Conflict = {
  constraint: Order_Constraint;
  update_columns: Array<Order_Update_Column>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** ordering options when selecting data from "order" */
export type Order_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  order_comment?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_sequence_number?: InputMaybe<Order_By>;
  order_status?: InputMaybe<Order_By>;
  order_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_full_name?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "order" */
export type Order_Pk_Columns_Input = {
  order_id: Scalars['String'];
};

/** select columns of table "order" */
export enum Order_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  OrderComment = 'order_comment',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  OrderSequenceNumber = 'order_sequence_number',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  OrderType = 'order_type',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentFullName = 'student_full_name',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "order" */
export type Order_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  order_comment?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  order_sequence_number?: InputMaybe<Scalars['Int']>;
  order_status?: InputMaybe<Scalars['String']>;
  order_type?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_full_name?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Order_Stddev_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "order" */
export type Order_Stddev_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Stddev_Pop_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "order" */
export type Order_Stddev_Pop_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Stddev_Samp_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "order" */
export type Order_Stddev_Samp_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Order_Sum_Fields = {
  order_sequence_number?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "order" */
export type Order_Sum_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** update columns of table "order" */
export enum Order_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  OrderComment = 'order_comment',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  OrderSequenceNumber = 'order_sequence_number',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  OrderType = 'order_type',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentFullName = 'student_full_name',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Order_Var_Pop_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "order" */
export type Order_Var_Pop_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Var_Samp_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "order" */
export type Order_Var_Samp_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Variance_Fields = {
  order_sequence_number?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "order" */
export type Order_Variance_Order_By = {
  order_sequence_number?: InputMaybe<Order_By>;
};

/** columns and relationships of "package" */
export type Package = {
  max_slot: Scalars['Int'];
  package_end_date?: Maybe<Scalars['timestamptz']>;
  package_id: Scalars['String'];
  package_start_date?: Maybe<Scalars['timestamptz']>;
  package_type: Scalars['String'];
  /** An object relationship */
  product: Product;
  resource_path: Scalars['String'];
};

/** aggregated selection of "package" */
export type Package_Aggregate = {
  aggregate?: Maybe<Package_Aggregate_Fields>;
  nodes: Array<Package>;
};

/** aggregate fields of "package" */
export type Package_Aggregate_Fields = {
  avg?: Maybe<Package_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Package_Max_Fields>;
  min?: Maybe<Package_Min_Fields>;
  stddev?: Maybe<Package_Stddev_Fields>;
  stddev_pop?: Maybe<Package_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Package_Stddev_Samp_Fields>;
  sum?: Maybe<Package_Sum_Fields>;
  var_pop?: Maybe<Package_Var_Pop_Fields>;
  var_samp?: Maybe<Package_Var_Samp_Fields>;
  variance?: Maybe<Package_Variance_Fields>;
};


/** aggregate fields of "package" */
export type Package_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package" */
export type Package_Aggregate_Order_By = {
  avg?: InputMaybe<Package_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Max_Order_By>;
  min?: InputMaybe<Package_Min_Order_By>;
  stddev?: InputMaybe<Package_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Package_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Package_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Package_Sum_Order_By>;
  var_pop?: InputMaybe<Package_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Package_Var_Samp_Order_By>;
  variance?: InputMaybe<Package_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "package" */
export type Package_Arr_Rel_Insert_Input = {
  data: Array<Package_Insert_Input>;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};

/** aggregate avg on columns */
export type Package_Avg_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "package" */
export type Package_Avg_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "package". All fields are combined with a logical 'AND'. */
export type Package_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Package_Bool_Exp>>>;
  _not?: InputMaybe<Package_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Package_Bool_Exp>>>;
  max_slot?: InputMaybe<Int_Comparison_Exp>;
  package_end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  package_id?: InputMaybe<String_Comparison_Exp>;
  package_start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  package_type?: InputMaybe<String_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "package" */
export enum Package_Constraint {
  /** unique or primary key constraint */
  PackagePk = 'package_pk'
}

/** columns and relationships of "package_course" */
export type Package_Course = {
  course_id: Scalars['String'];
  course_weight: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  mandatory_flag: Scalars['Boolean'];
  max_slots_per_course: Scalars['Int'];
  package_id: Scalars['String'];
  resource_path: Scalars['String'];
};

/** aggregated selection of "package_course" */
export type Package_Course_Aggregate = {
  aggregate?: Maybe<Package_Course_Aggregate_Fields>;
  nodes: Array<Package_Course>;
};

/** aggregate fields of "package_course" */
export type Package_Course_Aggregate_Fields = {
  avg?: Maybe<Package_Course_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Package_Course_Max_Fields>;
  min?: Maybe<Package_Course_Min_Fields>;
  stddev?: Maybe<Package_Course_Stddev_Fields>;
  stddev_pop?: Maybe<Package_Course_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Package_Course_Stddev_Samp_Fields>;
  sum?: Maybe<Package_Course_Sum_Fields>;
  var_pop?: Maybe<Package_Course_Var_Pop_Fields>;
  var_samp?: Maybe<Package_Course_Var_Samp_Fields>;
  variance?: Maybe<Package_Course_Variance_Fields>;
};


/** aggregate fields of "package_course" */
export type Package_Course_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Course_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package_course" */
export type Package_Course_Aggregate_Order_By = {
  avg?: InputMaybe<Package_Course_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Course_Max_Order_By>;
  min?: InputMaybe<Package_Course_Min_Order_By>;
  stddev?: InputMaybe<Package_Course_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Package_Course_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Package_Course_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Package_Course_Sum_Order_By>;
  var_pop?: InputMaybe<Package_Course_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Package_Course_Var_Samp_Order_By>;
  variance?: InputMaybe<Package_Course_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "package_course" */
export type Package_Course_Arr_Rel_Insert_Input = {
  data: Array<Package_Course_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_On_Conflict>;
};

/** aggregate avg on columns */
export type Package_Course_Avg_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "package_course" */
export type Package_Course_Avg_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "package_course". All fields are combined with a logical 'AND'. */
export type Package_Course_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Package_Course_Bool_Exp>>>;
  _not?: InputMaybe<Package_Course_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Package_Course_Bool_Exp>>>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  course_weight?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  mandatory_flag?: InputMaybe<Boolean_Comparison_Exp>;
  max_slots_per_course?: InputMaybe<Int_Comparison_Exp>;
  package_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "package_course" */
export enum Package_Course_Constraint {
  /** unique or primary key constraint */
  PackageCoursePk = 'package_course_pk'
}

/** columns and relationships of "package_course_fee" */
export type Package_Course_Fee = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  fee_id: Scalars['String'];
  package_id: Scalars['String'];
  resource_path: Scalars['String'];
};

/** aggregated selection of "package_course_fee" */
export type Package_Course_Fee_Aggregate = {
  aggregate?: Maybe<Package_Course_Fee_Aggregate_Fields>;
  nodes: Array<Package_Course_Fee>;
};

/** aggregate fields of "package_course_fee" */
export type Package_Course_Fee_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Package_Course_Fee_Max_Fields>;
  min?: Maybe<Package_Course_Fee_Min_Fields>;
};


/** aggregate fields of "package_course_fee" */
export type Package_Course_Fee_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Course_Fee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package_course_fee" */
export type Package_Course_Fee_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Course_Fee_Max_Order_By>;
  min?: InputMaybe<Package_Course_Fee_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package_course_fee" */
export type Package_Course_Fee_Arr_Rel_Insert_Input = {
  data: Array<Package_Course_Fee_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_Fee_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package_course_fee". All fields are combined with a logical 'AND'. */
export type Package_Course_Fee_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Package_Course_Fee_Bool_Exp>>>;
  _not?: InputMaybe<Package_Course_Fee_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Package_Course_Fee_Bool_Exp>>>;
  available_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  available_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fee_id?: InputMaybe<String_Comparison_Exp>;
  package_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "package_course_fee" */
export enum Package_Course_Fee_Constraint {
  /** unique or primary key constraint */
  PackageCourseFeePk = 'package_course_fee_pk'
}

/** input type for inserting data into table "package_course_fee" */
export type Package_Course_Fee_Insert_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  fee_id?: InputMaybe<Scalars['String']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Package_Course_Fee_Max_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  fee_id?: Maybe<Scalars['String']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package_course_fee" */
export type Package_Course_Fee_Max_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Course_Fee_Min_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  fee_id?: Maybe<Scalars['String']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package_course_fee" */
export type Package_Course_Fee_Min_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package_course_fee" */
export type Package_Course_Fee_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Package_Course_Fee>;
};

/** input type for inserting object relation for remote table "package_course_fee" */
export type Package_Course_Fee_Obj_Rel_Insert_Input = {
  data: Package_Course_Fee_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_Fee_On_Conflict>;
};

/** on conflict condition type for table "package_course_fee" */
export type Package_Course_Fee_On_Conflict = {
  constraint: Package_Course_Fee_Constraint;
  update_columns: Array<Package_Course_Fee_Update_Column>;
  where?: InputMaybe<Package_Course_Fee_Bool_Exp>;
};

/** ordering options when selecting data from "package_course_fee" */
export type Package_Course_Fee_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "package_course_fee" */
export type Package_Course_Fee_Pk_Columns_Input = {
  course_id: Scalars['String'];
  fee_id: Scalars['String'];
  package_id: Scalars['String'];
};

/** select columns of table "package_course_fee" */
export enum Package_Course_Fee_Select_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeeId = 'fee_id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "package_course_fee" */
export type Package_Course_Fee_Set_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  fee_id?: InputMaybe<Scalars['String']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package_course_fee" */
export enum Package_Course_Fee_Update_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeeId = 'fee_id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for incrementing integer column in table "package_course" */
export type Package_Course_Inc_Input = {
  course_weight?: InputMaybe<Scalars['Int']>;
  max_slots_per_course?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "package_course" */
export type Package_Course_Insert_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  course_weight?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  mandatory_flag?: InputMaybe<Scalars['Boolean']>;
  max_slots_per_course?: InputMaybe<Scalars['Int']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "package_course_material" */
export type Package_Course_Material = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  material_id: Scalars['String'];
  package_id: Scalars['String'];
  resource_path: Scalars['String'];
};

/** aggregated selection of "package_course_material" */
export type Package_Course_Material_Aggregate = {
  aggregate?: Maybe<Package_Course_Material_Aggregate_Fields>;
  nodes: Array<Package_Course_Material>;
};

/** aggregate fields of "package_course_material" */
export type Package_Course_Material_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Package_Course_Material_Max_Fields>;
  min?: Maybe<Package_Course_Material_Min_Fields>;
};


/** aggregate fields of "package_course_material" */
export type Package_Course_Material_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Course_Material_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package_course_material" */
export type Package_Course_Material_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Course_Material_Max_Order_By>;
  min?: InputMaybe<Package_Course_Material_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package_course_material" */
export type Package_Course_Material_Arr_Rel_Insert_Input = {
  data: Array<Package_Course_Material_Insert_Input>;
  on_conflict?: InputMaybe<Package_Course_Material_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package_course_material". All fields are combined with a logical 'AND'. */
export type Package_Course_Material_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Package_Course_Material_Bool_Exp>>>;
  _not?: InputMaybe<Package_Course_Material_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Package_Course_Material_Bool_Exp>>>;
  available_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  available_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  material_id?: InputMaybe<String_Comparison_Exp>;
  package_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "package_course_material" */
export enum Package_Course_Material_Constraint {
  /** unique or primary key constraint */
  PackageCourseMaterialPk = 'package_course_material_pk'
}

/** input type for inserting data into table "package_course_material" */
export type Package_Course_Material_Insert_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  material_id?: InputMaybe<Scalars['String']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Package_Course_Material_Max_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  material_id?: Maybe<Scalars['String']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package_course_material" */
export type Package_Course_Material_Max_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Course_Material_Min_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  material_id?: Maybe<Scalars['String']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package_course_material" */
export type Package_Course_Material_Min_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package_course_material" */
export type Package_Course_Material_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Package_Course_Material>;
};

/** input type for inserting object relation for remote table "package_course_material" */
export type Package_Course_Material_Obj_Rel_Insert_Input = {
  data: Package_Course_Material_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_Material_On_Conflict>;
};

/** on conflict condition type for table "package_course_material" */
export type Package_Course_Material_On_Conflict = {
  constraint: Package_Course_Material_Constraint;
  update_columns: Array<Package_Course_Material_Update_Column>;
  where?: InputMaybe<Package_Course_Material_Bool_Exp>;
};

/** ordering options when selecting data from "package_course_material" */
export type Package_Course_Material_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "package_course_material" */
export type Package_Course_Material_Pk_Columns_Input = {
  course_id: Scalars['String'];
  material_id: Scalars['String'];
  package_id: Scalars['String'];
};

/** select columns of table "package_course_material" */
export enum Package_Course_Material_Select_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "package_course_material" */
export type Package_Course_Material_Set_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  material_id?: InputMaybe<Scalars['String']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package_course_material" */
export enum Package_Course_Material_Update_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate max on columns */
export type Package_Course_Max_Fields = {
  course_id?: Maybe<Scalars['String']>;
  course_weight?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  max_slots_per_course?: Maybe<Scalars['Int']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package_course" */
export type Package_Course_Max_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_weight?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Course_Min_Fields = {
  course_id?: Maybe<Scalars['String']>;
  course_weight?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  max_slots_per_course?: Maybe<Scalars['Int']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package_course" */
export type Package_Course_Min_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_weight?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package_course" */
export type Package_Course_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Package_Course>;
};

/** input type for inserting object relation for remote table "package_course" */
export type Package_Course_Obj_Rel_Insert_Input = {
  data: Package_Course_Insert_Input;
  on_conflict?: InputMaybe<Package_Course_On_Conflict>;
};

/** on conflict condition type for table "package_course" */
export type Package_Course_On_Conflict = {
  constraint: Package_Course_Constraint;
  update_columns: Array<Package_Course_Update_Column>;
  where?: InputMaybe<Package_Course_Bool_Exp>;
};

/** ordering options when selecting data from "package_course" */
export type Package_Course_Order_By = {
  course_id?: InputMaybe<Order_By>;
  course_weight?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  mandatory_flag?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "package_course" */
export type Package_Course_Pk_Columns_Input = {
  course_id: Scalars['String'];
  package_id: Scalars['String'];
};

/** select columns of table "package_course" */
export enum Package_Course_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseWeight = 'course_weight',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MandatoryFlag = 'mandatory_flag',
  /** column name */
  MaxSlotsPerCourse = 'max_slots_per_course',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "package_course" */
export type Package_Course_Set_Input = {
  course_id?: InputMaybe<Scalars['String']>;
  course_weight?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  mandatory_flag?: InputMaybe<Scalars['Boolean']>;
  max_slots_per_course?: InputMaybe<Scalars['Int']>;
  package_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Package_Course_Stddev_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "package_course" */
export type Package_Course_Stddev_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Package_Course_Stddev_Pop_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "package_course" */
export type Package_Course_Stddev_Pop_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Package_Course_Stddev_Samp_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "package_course" */
export type Package_Course_Stddev_Samp_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Package_Course_Sum_Fields = {
  course_weight?: Maybe<Scalars['Int']>;
  max_slots_per_course?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "package_course" */
export type Package_Course_Sum_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** update columns of table "package_course" */
export enum Package_Course_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseWeight = 'course_weight',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MandatoryFlag = 'mandatory_flag',
  /** column name */
  MaxSlotsPerCourse = 'max_slots_per_course',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate var_pop on columns */
export type Package_Course_Var_Pop_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "package_course" */
export type Package_Course_Var_Pop_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Package_Course_Var_Samp_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "package_course" */
export type Package_Course_Var_Samp_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Package_Course_Variance_Fields = {
  course_weight?: Maybe<Scalars['Float']>;
  max_slots_per_course?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "package_course" */
export type Package_Course_Variance_Order_By = {
  course_weight?: InputMaybe<Order_By>;
  max_slots_per_course?: InputMaybe<Order_By>;
};

/** input type for incrementing integer column in table "package" */
export type Package_Inc_Input = {
  max_slot?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "package" */
export type Package_Insert_Input = {
  max_slot?: InputMaybe<Scalars['Int']>;
  package_end_date?: InputMaybe<Scalars['timestamptz']>;
  package_id?: InputMaybe<Scalars['String']>;
  package_start_date?: InputMaybe<Scalars['timestamptz']>;
  package_type?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Package_Max_Fields = {
  max_slot?: Maybe<Scalars['Int']>;
  package_end_date?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['String']>;
  package_start_date?: Maybe<Scalars['timestamptz']>;
  package_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package" */
export type Package_Max_Order_By = {
  max_slot?: InputMaybe<Order_By>;
  package_end_date?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  package_start_date?: InputMaybe<Order_By>;
  package_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Min_Fields = {
  max_slot?: Maybe<Scalars['Int']>;
  package_end_date?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['String']>;
  package_start_date?: Maybe<Scalars['timestamptz']>;
  package_type?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package" */
export type Package_Min_Order_By = {
  max_slot?: InputMaybe<Order_By>;
  package_end_date?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  package_start_date?: InputMaybe<Order_By>;
  package_type?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package" */
export type Package_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Package>;
};

/** input type for inserting object relation for remote table "package" */
export type Package_Obj_Rel_Insert_Input = {
  data: Package_Insert_Input;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};

/** on conflict condition type for table "package" */
export type Package_On_Conflict = {
  constraint: Package_Constraint;
  update_columns: Array<Package_Update_Column>;
  where?: InputMaybe<Package_Bool_Exp>;
};

/** ordering options when selecting data from "package" */
export type Package_Order_By = {
  max_slot?: InputMaybe<Order_By>;
  package_end_date?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  package_start_date?: InputMaybe<Order_By>;
  package_type?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "package" */
export type Package_Pk_Columns_Input = {
  package_id: Scalars['String'];
};

/** select columns of table "package" */
export enum Package_Select_Column {
  /** column name */
  MaxSlot = 'max_slot',
  /** column name */
  PackageEndDate = 'package_end_date',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  PackageStartDate = 'package_start_date',
  /** column name */
  PackageType = 'package_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "package" */
export type Package_Set_Input = {
  max_slot?: InputMaybe<Scalars['Int']>;
  package_end_date?: InputMaybe<Scalars['timestamptz']>;
  package_id?: InputMaybe<Scalars['String']>;
  package_start_date?: InputMaybe<Scalars['timestamptz']>;
  package_type?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Package_Stddev_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "package" */
export type Package_Stddev_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Package_Stddev_Pop_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "package" */
export type Package_Stddev_Pop_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Package_Stddev_Samp_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "package" */
export type Package_Stddev_Samp_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Package_Sum_Fields = {
  max_slot?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "package" */
export type Package_Sum_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** update columns of table "package" */
export enum Package_Update_Column {
  /** column name */
  MaxSlot = 'max_slot',
  /** column name */
  PackageEndDate = 'package_end_date',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  PackageStartDate = 'package_start_date',
  /** column name */
  PackageType = 'package_type',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate var_pop on columns */
export type Package_Var_Pop_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "package" */
export type Package_Var_Pop_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Package_Var_Samp_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "package" */
export type Package_Var_Samp_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Package_Variance_Fields = {
  max_slot?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "package" */
export type Package_Variance_Order_By = {
  max_slot?: InputMaybe<Order_By>;
};

/** columns and relationships of "product" */
export type Product = {
  available_from: Scalars['timestamptz'];
  available_until: Scalars['timestamptz'];
  billing_schedule_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  custom_billing_period?: Maybe<Scalars['timestamptz']>;
  disable_pro_rating_flag: Scalars['Boolean'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  /** An array relationship */
  order_items: Array<Order_Item>;
  /** An aggregated array relationship */
  order_items_aggregate: Order_Item_Aggregate;
  /** An array relationship */
  product_fees: Array<Fee>;
  /** An aggregated array relationship */
  product_fees_aggregate: Fee_Aggregate;
  /** An array relationship */
  product_grades: Array<Product_Grade>;
  /** An aggregated array relationship */
  product_grades_aggregate: Product_Grade_Aggregate;
  product_id: Scalars['String'];
  /** An array relationship */
  product_locations: Array<Product_Location>;
  /** An aggregated array relationship */
  product_locations_aggregate: Product_Location_Aggregate;
  /** An array relationship */
  product_materials: Array<Material>;
  /** An aggregated array relationship */
  product_materials_aggregate: Material_Aggregate;
  /** An array relationship */
  product_packages: Array<Package>;
  /** An aggregated array relationship */
  product_packages_aggregate: Package_Aggregate;
  /** An array relationship */
  product_prices: Array<Product_Price>;
  /** An aggregated array relationship */
  product_prices_aggregate: Product_Price_Aggregate;
  /** An array relationship */
  product_settings: Array<Product_Setting>;
  /** An aggregated array relationship */
  product_settings_aggregate: Product_Setting_Aggregate;
  product_type: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
  resource_path: Scalars['String'];
  tax_id?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "product" */
export type ProductOrder_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductOrder_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_FeesArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Fees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_GradesArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Grades_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_MaterialsArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Materials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_PricesArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Prices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};

/** aggregated selection of "product" */
export type Product_Aggregate = {
  aggregate?: Maybe<Product_Aggregate_Fields>;
  nodes: Array<Product>;
};

/** aggregate fields of "product" */
export type Product_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Max_Fields>;
  min?: Maybe<Product_Min_Fields>;
};


/** aggregate fields of "product" */
export type Product_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product" */
export type Product_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Max_Order_By>;
  min?: InputMaybe<Product_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product" */
export type Product_Arr_Rel_Insert_Input = {
  data: Array<Product_Insert_Input>;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type Product_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Product_Bool_Exp>>>;
  _not?: InputMaybe<Product_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Product_Bool_Exp>>>;
  available_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  available_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  billing_schedule_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  custom_billing_period?: InputMaybe<Timestamptz_Comparison_Exp>;
  disable_pro_rating_flag?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order_items?: InputMaybe<Order_Item_Bool_Exp>;
  product_fees?: InputMaybe<Fee_Bool_Exp>;
  product_grades?: InputMaybe<Product_Grade_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  product_locations?: InputMaybe<Product_Location_Bool_Exp>;
  product_materials?: InputMaybe<Material_Bool_Exp>;
  product_packages?: InputMaybe<Package_Bool_Exp>;
  product_prices?: InputMaybe<Product_Price_Bool_Exp>;
  product_settings?: InputMaybe<Product_Setting_Bool_Exp>;
  product_type?: InputMaybe<String_Comparison_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  tax_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product" */
export enum Product_Constraint {
  /** unique or primary key constraint */
  ProductPk = 'product_pk'
}

/** columns and relationships of "product_grade" */
export type Product_Grade = {
  created_at: Scalars['timestamptz'];
  grade_id: Scalars['Int'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['String'];
  resource_path: Scalars['String'];
};

/** aggregated selection of "product_grade" */
export type Product_Grade_Aggregate = {
  aggregate?: Maybe<Product_Grade_Aggregate_Fields>;
  nodes: Array<Product_Grade>;
};

/** aggregate fields of "product_grade" */
export type Product_Grade_Aggregate_Fields = {
  avg?: Maybe<Product_Grade_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Grade_Max_Fields>;
  min?: Maybe<Product_Grade_Min_Fields>;
  stddev?: Maybe<Product_Grade_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Grade_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Grade_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Grade_Sum_Fields>;
  var_pop?: Maybe<Product_Grade_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Grade_Var_Samp_Fields>;
  variance?: Maybe<Product_Grade_Variance_Fields>;
};


/** aggregate fields of "product_grade" */
export type Product_Grade_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Grade_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_grade" */
export type Product_Grade_Aggregate_Order_By = {
  avg?: InputMaybe<Product_Grade_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Grade_Max_Order_By>;
  min?: InputMaybe<Product_Grade_Min_Order_By>;
  stddev?: InputMaybe<Product_Grade_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Grade_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Grade_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Grade_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Grade_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Grade_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Grade_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product_grade" */
export type Product_Grade_Arr_Rel_Insert_Input = {
  data: Array<Product_Grade_Insert_Input>;
  on_conflict?: InputMaybe<Product_Grade_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Grade_Avg_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product_grade" */
export type Product_Grade_Avg_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_grade". All fields are combined with a logical 'AND'. */
export type Product_Grade_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Product_Grade_Bool_Exp>>>;
  _not?: InputMaybe<Product_Grade_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Product_Grade_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  grade_id?: InputMaybe<Int_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_grade" */
export enum Product_Grade_Constraint {
  /** unique or primary key constraint */
  ProductGradePk = 'product_grade_pk'
}

/** input type for incrementing integer column in table "product_grade" */
export type Product_Grade_Inc_Input = {
  grade_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_grade" */
export type Product_Grade_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  grade_id?: InputMaybe<Scalars['Int']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Grade_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  grade_id?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_grade" */
export type Product_Grade_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Grade_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  grade_id?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_grade" */
export type Product_Grade_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_grade" */
export type Product_Grade_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Grade>;
};

/** input type for inserting object relation for remote table "product_grade" */
export type Product_Grade_Obj_Rel_Insert_Input = {
  data: Product_Grade_Insert_Input;
  on_conflict?: InputMaybe<Product_Grade_On_Conflict>;
};

/** on conflict condition type for table "product_grade" */
export type Product_Grade_On_Conflict = {
  constraint: Product_Grade_Constraint;
  update_columns: Array<Product_Grade_Update_Column>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};

/** ordering options when selecting data from "product_grade" */
export type Product_Grade_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grade_id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "product_grade" */
export type Product_Grade_Pk_Columns_Input = {
  grade_id: Scalars['Int'];
  product_id: Scalars['String'];
};

/** select columns of table "product_grade" */
export enum Product_Grade_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GradeId = 'grade_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "product_grade" */
export type Product_Grade_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  grade_id?: InputMaybe<Scalars['Int']>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Product_Grade_Stddev_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product_grade" */
export type Product_Grade_Stddev_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Grade_Stddev_Pop_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product_grade" */
export type Product_Grade_Stddev_Pop_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Grade_Stddev_Samp_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product_grade" */
export type Product_Grade_Stddev_Samp_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Grade_Sum_Fields = {
  grade_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "product_grade" */
export type Product_Grade_Sum_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** update columns of table "product_grade" */
export enum Product_Grade_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GradeId = 'grade_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate var_pop on columns */
export type Product_Grade_Var_Pop_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product_grade" */
export type Product_Grade_Var_Pop_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Grade_Var_Samp_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product_grade" */
export type Product_Grade_Var_Samp_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Grade_Variance_Fields = {
  grade_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product_grade" */
export type Product_Grade_Variance_Order_By = {
  grade_id?: InputMaybe<Order_By>;
};

/** input type for inserting data into table "product" */
export type Product_Insert_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  custom_billing_period?: InputMaybe<Scalars['timestamptz']>;
  disable_pro_rating_flag?: InputMaybe<Scalars['Boolean']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order_items?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  product_fees?: InputMaybe<Fee_Arr_Rel_Insert_Input>;
  product_grades?: InputMaybe<Product_Grade_Arr_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  product_locations?: InputMaybe<Product_Location_Arr_Rel_Insert_Input>;
  product_materials?: InputMaybe<Material_Arr_Rel_Insert_Input>;
  product_packages?: InputMaybe<Package_Arr_Rel_Insert_Input>;
  product_prices?: InputMaybe<Product_Price_Arr_Rel_Insert_Input>;
  product_settings?: InputMaybe<Product_Setting_Arr_Rel_Insert_Input>;
  product_type?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "product_location" */
export type Product_Location = {
  created_at: Scalars['timestamptz'];
  location_id: Scalars['String'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['String'];
  resource_path: Scalars['String'];
};

/** aggregated selection of "product_location" */
export type Product_Location_Aggregate = {
  aggregate?: Maybe<Product_Location_Aggregate_Fields>;
  nodes: Array<Product_Location>;
};

/** aggregate fields of "product_location" */
export type Product_Location_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Location_Max_Fields>;
  min?: Maybe<Product_Location_Min_Fields>;
};


/** aggregate fields of "product_location" */
export type Product_Location_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_location" */
export type Product_Location_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Location_Max_Order_By>;
  min?: InputMaybe<Product_Location_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product_location" */
export type Product_Location_Arr_Rel_Insert_Input = {
  data: Array<Product_Location_Insert_Input>;
  on_conflict?: InputMaybe<Product_Location_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product_location". All fields are combined with a logical 'AND'. */
export type Product_Location_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Product_Location_Bool_Exp>>>;
  _not?: InputMaybe<Product_Location_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Product_Location_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_location" */
export enum Product_Location_Constraint {
  /** unique or primary key constraint */
  ProductLocationPk = 'product_location_pk'
}

/** input type for inserting data into table "product_location" */
export type Product_Location_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Location_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_location" */
export type Product_Location_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Location_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_location" */
export type Product_Location_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_location" */
export type Product_Location_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Location>;
};

/** input type for inserting object relation for remote table "product_location" */
export type Product_Location_Obj_Rel_Insert_Input = {
  data: Product_Location_Insert_Input;
  on_conflict?: InputMaybe<Product_Location_On_Conflict>;
};

/** on conflict condition type for table "product_location" */
export type Product_Location_On_Conflict = {
  constraint: Product_Location_Constraint;
  update_columns: Array<Product_Location_Update_Column>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};

/** ordering options when selecting data from "product_location" */
export type Product_Location_Order_By = {
  created_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "product_location" */
export type Product_Location_Pk_Columns_Input = {
  location_id: Scalars['String'];
  product_id: Scalars['String'];
};

/** select columns of table "product_location" */
export enum Product_Location_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "product_location" */
export type Product_Location_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "product_location" */
export enum Product_Location_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate max on columns */
export type Product_Max_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  billing_schedule_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  custom_billing_period?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "product" */
export type Product_Max_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  custom_billing_period?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_type?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Min_Fields = {
  available_from?: Maybe<Scalars['timestamptz']>;
  available_until?: Maybe<Scalars['timestamptz']>;
  billing_schedule_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  custom_billing_period?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "product" */
export type Product_Min_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  custom_billing_period?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_type?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product" */
export type Product_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product>;
};

/** input type for inserting object relation for remote table "product" */
export type Product_Obj_Rel_Insert_Input = {
  data: Product_Insert_Input;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};

/** on conflict condition type for table "product" */
export type Product_On_Conflict = {
  constraint: Product_Constraint;
  update_columns: Array<Product_Update_Column>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** ordering options when selecting data from "product" */
export type Product_Order_By = {
  available_from?: InputMaybe<Order_By>;
  available_until?: InputMaybe<Order_By>;
  billing_schedule_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  custom_billing_period?: InputMaybe<Order_By>;
  disable_pro_rating_flag?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  product_fees_aggregate?: InputMaybe<Fee_Aggregate_Order_By>;
  product_grades_aggregate?: InputMaybe<Product_Grade_Aggregate_Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_locations_aggregate?: InputMaybe<Product_Location_Aggregate_Order_By>;
  product_materials_aggregate?: InputMaybe<Material_Aggregate_Order_By>;
  product_packages_aggregate?: InputMaybe<Package_Aggregate_Order_By>;
  product_prices_aggregate?: InputMaybe<Product_Price_Aggregate_Order_By>;
  product_settings_aggregate?: InputMaybe<Product_Setting_Aggregate_Order_By>;
  product_type?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "product" */
export type Product_Pk_Columns_Input = {
  product_id: Scalars['String'];
};

/** columns and relationships of "product_price" */
export type Product_Price = {
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  price: Scalars['numeric'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['String'];
  product_price_id: Scalars['Int'];
  quantity?: Maybe<Scalars['Int']>;
  resource_path: Scalars['String'];
};

/** aggregated selection of "product_price" */
export type Product_Price_Aggregate = {
  aggregate?: Maybe<Product_Price_Aggregate_Fields>;
  nodes: Array<Product_Price>;
};

/** aggregate fields of "product_price" */
export type Product_Price_Aggregate_Fields = {
  avg?: Maybe<Product_Price_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Price_Max_Fields>;
  min?: Maybe<Product_Price_Min_Fields>;
  stddev?: Maybe<Product_Price_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Price_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Price_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Price_Sum_Fields>;
  var_pop?: Maybe<Product_Price_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Price_Var_Samp_Fields>;
  variance?: Maybe<Product_Price_Variance_Fields>;
};


/** aggregate fields of "product_price" */
export type Product_Price_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Price_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_price" */
export type Product_Price_Aggregate_Order_By = {
  avg?: InputMaybe<Product_Price_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Price_Max_Order_By>;
  min?: InputMaybe<Product_Price_Min_Order_By>;
  stddev?: InputMaybe<Product_Price_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Price_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Price_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Price_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Price_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Price_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Price_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product_price" */
export type Product_Price_Arr_Rel_Insert_Input = {
  data: Array<Product_Price_Insert_Input>;
  on_conflict?: InputMaybe<Product_Price_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Price_Avg_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product_price" */
export type Product_Price_Avg_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_price". All fields are combined with a logical 'AND'. */
export type Product_Price_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Product_Price_Bool_Exp>>>;
  _not?: InputMaybe<Product_Price_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Product_Price_Bool_Exp>>>;
  billing_schedule_period_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  product_price_id?: InputMaybe<Int_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_price" */
export enum Product_Price_Constraint {
  /** unique or primary key constraint */
  ProductPricePk = 'product_price_pk',
  /** unique or primary key constraint */
  ProductPriceUniIdx = 'product_price_uni_idx'
}

/** input type for incrementing integer column in table "product_price" */
export type Product_Price_Inc_Input = {
  price?: InputMaybe<Scalars['numeric']>;
  product_price_id?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_price" */
export type Product_Price_Insert_Input = {
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['numeric']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  product_price_id?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Price_Max_Fields = {
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  price?: Maybe<Scalars['numeric']>;
  product_id?: Maybe<Scalars['String']>;
  product_price_id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_price" */
export type Product_Price_Max_Order_By = {
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Price_Min_Fields = {
  billing_schedule_period_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  price?: Maybe<Scalars['numeric']>;
  product_id?: Maybe<Scalars['String']>;
  product_price_id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  resource_path?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_price" */
export type Product_Price_Min_Order_By = {
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_price" */
export type Product_Price_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Price>;
};

/** input type for inserting object relation for remote table "product_price" */
export type Product_Price_Obj_Rel_Insert_Input = {
  data: Product_Price_Insert_Input;
  on_conflict?: InputMaybe<Product_Price_On_Conflict>;
};

/** on conflict condition type for table "product_price" */
export type Product_Price_On_Conflict = {
  constraint: Product_Price_Constraint;
  update_columns: Array<Product_Price_Update_Column>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};

/** ordering options when selecting data from "product_price" */
export type Product_Price_Order_By = {
  billing_schedule_period_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "product_price" */
export type Product_Price_Pk_Columns_Input = {
  product_price_id: Scalars['Int'];
};

/** select columns of table "product_price" */
export enum Product_Price_Select_Column {
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Price = 'price',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductPriceId = 'product_price_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ResourcePath = 'resource_path'
}

/** input type for updating data in table "product_price" */
export type Product_Price_Set_Input = {
  billing_schedule_period_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_price_id?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
  resource_path?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Product_Price_Stddev_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product_price" */
export type Product_Price_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Price_Stddev_Pop_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product_price" */
export type Product_Price_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Price_Stddev_Samp_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product_price" */
export type Product_Price_Stddev_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Price_Sum_Fields = {
  price?: Maybe<Scalars['numeric']>;
  product_price_id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "product_price" */
export type Product_Price_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** update columns of table "product_price" */
export enum Product_Price_Update_Column {
  /** column name */
  BillingSchedulePeriodId = 'billing_schedule_period_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Price = 'price',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductPriceId = 'product_price_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ResourcePath = 'resource_path'
}

/** aggregate var_pop on columns */
export type Product_Price_Var_Pop_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product_price" */
export type Product_Price_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Price_Var_Samp_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product_price" */
export type Product_Price_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Price_Variance_Fields = {
  price?: Maybe<Scalars['Float']>;
  product_price_id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product_price" */
export type Product_Price_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
  product_price_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** select columns of table "product" */
export enum Product_Select_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomBillingPeriod = 'custom_billing_period',
  /** column name */
  DisableProRatingFlag = 'disable_pro_rating_flag',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductType = 'product_type',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TaxId = 'tax_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "product" */
export type Product_Set_Input = {
  available_from?: InputMaybe<Scalars['timestamptz']>;
  available_until?: InputMaybe<Scalars['timestamptz']>;
  billing_schedule_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  custom_billing_period?: InputMaybe<Scalars['timestamptz']>;
  disable_pro_rating_flag?: InputMaybe<Scalars['Boolean']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_type?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "product_setting" */
export type Product_Setting = {
  created_at: Scalars['timestamptz'];
  is_required_for_enrollment?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  product: Product;
  product_id: Scalars['String'];
  resource_path: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "product_setting" */
export type Product_Setting_Aggregate = {
  aggregate?: Maybe<Product_Setting_Aggregate_Fields>;
  nodes: Array<Product_Setting>;
};

/** aggregate fields of "product_setting" */
export type Product_Setting_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Setting_Max_Fields>;
  min?: Maybe<Product_Setting_Min_Fields>;
};


/** aggregate fields of "product_setting" */
export type Product_Setting_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Setting_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_setting" */
export type Product_Setting_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Setting_Max_Order_By>;
  min?: InputMaybe<Product_Setting_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product_setting" */
export type Product_Setting_Arr_Rel_Insert_Input = {
  data: Array<Product_Setting_Insert_Input>;
  on_conflict?: InputMaybe<Product_Setting_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product_setting". All fields are combined with a logical 'AND'. */
export type Product_Setting_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Product_Setting_Bool_Exp>>>;
  _not?: InputMaybe<Product_Setting_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Product_Setting_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_required_for_enrollment?: InputMaybe<Boolean_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_setting" */
export enum Product_Setting_Constraint {
  /** unique or primary key constraint */
  ProductSettingsPk = 'product_settings_pk'
}

/** input type for inserting data into table "product_setting" */
export type Product_Setting_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_required_for_enrollment?: InputMaybe<Scalars['Boolean']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Product_Setting_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "product_setting" */
export type Product_Setting_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Setting_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  product_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "product_setting" */
export type Product_Setting_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_setting" */
export type Product_Setting_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Setting>;
};

/** input type for inserting object relation for remote table "product_setting" */
export type Product_Setting_Obj_Rel_Insert_Input = {
  data: Product_Setting_Insert_Input;
  on_conflict?: InputMaybe<Product_Setting_On_Conflict>;
};

/** on conflict condition type for table "product_setting" */
export type Product_Setting_On_Conflict = {
  constraint: Product_Setting_Constraint;
  update_columns: Array<Product_Setting_Update_Column>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};

/** ordering options when selecting data from "product_setting" */
export type Product_Setting_Order_By = {
  created_at?: InputMaybe<Order_By>;
  is_required_for_enrollment?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "product_setting" */
export type Product_Setting_Pk_Columns_Input = {
  product_id: Scalars['String'];
};

/** select columns of table "product_setting" */
export enum Product_Setting_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsRequiredForEnrollment = 'is_required_for_enrollment',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "product_setting" */
export type Product_Setting_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_required_for_enrollment?: InputMaybe<Scalars['Boolean']>;
  product_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "product_setting" */
export enum Product_Setting_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsRequiredForEnrollment = 'is_required_for_enrollment',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** update columns of table "product" */
export enum Product_Update_Column {
  /** column name */
  AvailableFrom = 'available_from',
  /** column name */
  AvailableUntil = 'available_until',
  /** column name */
  BillingScheduleId = 'billing_schedule_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomBillingPeriod = 'custom_billing_period',
  /** column name */
  DisableProRatingFlag = 'disable_pro_rating_flag',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductType = 'product_type',
  /** column name */
  Remarks = 'remarks',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TaxId = 'tax_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** query root */
export type Query_Root = {
  /** fetch data from the table: "bill_item" */
  bill_item: Array<Bill_Item>;
  /** fetch aggregated fields from the table: "bill_item" */
  bill_item_aggregate: Bill_Item_Aggregate;
  /** fetch data from the table: "bill_item" using primary key columns */
  bill_item_by_pk?: Maybe<Bill_Item>;
  /** fetch data from the table: "billing_ratio" */
  billing_ratio: Array<Billing_Ratio>;
  /** fetch aggregated fields from the table: "billing_ratio" */
  billing_ratio_aggregate: Billing_Ratio_Aggregate;
  /** fetch data from the table: "billing_ratio" using primary key columns */
  billing_ratio_by_pk?: Maybe<Billing_Ratio>;
  /** fetch data from the table: "billing_schedule" */
  billing_schedule: Array<Billing_Schedule>;
  /** fetch aggregated fields from the table: "billing_schedule" */
  billing_schedule_aggregate: Billing_Schedule_Aggregate;
  /** fetch data from the table: "billing_schedule" using primary key columns */
  billing_schedule_by_pk?: Maybe<Billing_Schedule>;
  /** fetch data from the table: "billing_schedule_period" */
  billing_schedule_period: Array<Billing_Schedule_Period>;
  /** fetch aggregated fields from the table: "billing_schedule_period" */
  billing_schedule_period_aggregate: Billing_Schedule_Period_Aggregate;
  /** fetch data from the table: "billing_schedule_period" using primary key columns */
  billing_schedule_period_by_pk?: Maybe<Billing_Schedule_Period>;
  /** fetch data from the table: "courses" */
  courses: Array<Courses>;
  /** fetch aggregated fields from the table: "courses" */
  courses_aggregate: Courses_Aggregate;
  /** fetch data from the table: "courses" using primary key columns */
  courses_by_pk?: Maybe<Courses>;
  /** fetch data from the table: "discount" */
  discount: Array<Discount>;
  /** fetch aggregated fields from the table: "discount" */
  discount_aggregate: Discount_Aggregate;
  /** fetch data from the table: "discount" using primary key columns */
  discount_by_pk?: Maybe<Discount>;
  /** fetch data from the table: "fee" */
  fee: Array<Fee>;
  /** fetch aggregated fields from the table: "fee" */
  fee_aggregate: Fee_Aggregate;
  /** fetch data from the table: "fee" using primary key columns */
  fee_by_pk?: Maybe<Fee>;
  /** fetch data from the table: "grade" */
  grade: Array<Grade>;
  /** fetch aggregated fields from the table: "grade" */
  grade_aggregate: Grade_Aggregate;
  /** fetch data from the table: "grade" using primary key columns */
  grade_by_pk?: Maybe<Grade>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch data from the table: "order_action_log" */
  order_action_log: Array<Order_Action_Log>;
  /** fetch aggregated fields from the table: "order_action_log" */
  order_action_log_aggregate: Order_Action_Log_Aggregate;
  /** fetch data from the table: "order_action_log" using primary key columns */
  order_action_log_by_pk?: Maybe<Order_Action_Log>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table: "package" */
  package: Array<Package>;
  /** fetch aggregated fields from the table: "package" */
  package_aggregate: Package_Aggregate;
  /** fetch data from the table: "package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package_course" */
  package_course: Array<Package_Course>;
  /** fetch aggregated fields from the table: "package_course" */
  package_course_aggregate: Package_Course_Aggregate;
  /** fetch data from the table: "package_course" using primary key columns */
  package_course_by_pk?: Maybe<Package_Course>;
  /** fetch data from the table: "package_course_fee" */
  package_course_fee: Array<Package_Course_Fee>;
  /** fetch aggregated fields from the table: "package_course_fee" */
  package_course_fee_aggregate: Package_Course_Fee_Aggregate;
  /** fetch data from the table: "package_course_fee" using primary key columns */
  package_course_fee_by_pk?: Maybe<Package_Course_Fee>;
  /** fetch data from the table: "package_course_material" */
  package_course_material: Array<Package_Course_Material>;
  /** fetch aggregated fields from the table: "package_course_material" */
  package_course_material_aggregate: Package_Course_Material_Aggregate;
  /** fetch data from the table: "package_course_material" using primary key columns */
  package_course_material_by_pk?: Maybe<Package_Course_Material>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_grade" */
  product_grade: Array<Product_Grade>;
  /** fetch aggregated fields from the table: "product_grade" */
  product_grade_aggregate: Product_Grade_Aggregate;
  /** fetch data from the table: "product_grade" using primary key columns */
  product_grade_by_pk?: Maybe<Product_Grade>;
  /** fetch data from the table: "product_location" */
  product_location: Array<Product_Location>;
  /** fetch aggregated fields from the table: "product_location" */
  product_location_aggregate: Product_Location_Aggregate;
  /** fetch data from the table: "product_location" using primary key columns */
  product_location_by_pk?: Maybe<Product_Location>;
  /** fetch data from the table: "product_price" */
  product_price: Array<Product_Price>;
  /** fetch aggregated fields from the table: "product_price" */
  product_price_aggregate: Product_Price_Aggregate;
  /** fetch data from the table: "product_price" using primary key columns */
  product_price_by_pk?: Maybe<Product_Price>;
  /** fetch data from the table: "product_setting" */
  product_setting: Array<Product_Setting>;
  /** fetch aggregated fields from the table: "product_setting" */
  product_setting_aggregate: Product_Setting_Aggregate;
  /** fetch data from the table: "product_setting" using primary key columns */
  product_setting_by_pk?: Maybe<Product_Setting>;
  /** fetch data from the table: "student_package_class" */
  student_package_class: Array<Student_Package_Class>;
  /** fetch aggregated fields from the table: "student_package_class" */
  student_package_class_aggregate: Student_Package_Class_Aggregate;
  /** fetch data from the table: "student_package_class" using primary key columns */
  student_package_class_by_pk?: Maybe<Student_Package_Class>;
  /** fetch data from the table: "student_packages" */
  student_packages: Array<Student_Packages>;
  /** fetch aggregated fields from the table: "student_packages" */
  student_packages_aggregate: Student_Packages_Aggregate;
  /** fetch data from the table: "student_packages" using primary key columns */
  student_packages_by_pk?: Maybe<Student_Packages>;
  /** fetch data from the table: "student_product" */
  student_product: Array<Student_Product>;
  /** fetch aggregated fields from the table: "student_product" */
  student_product_aggregate: Student_Product_Aggregate;
  /** fetch data from the table: "student_product" using primary key columns */
  student_product_by_pk?: Maybe<Student_Product>;
  /** fetch data from the table: "tax" */
  tax: Array<Tax>;
  /** fetch aggregated fields from the table: "tax" */
  tax_aggregate: Tax_Aggregate;
  /** fetch data from the table: "tax" using primary key columns */
  tax_by_pk?: Maybe<Tax>;
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
export type Query_RootBilling_RatioArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Ratio_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Ratio_By_PkArgs = {
  billing_ratio_id: Scalars['String'];
};


/** query root */
export type Query_RootBilling_ScheduleArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Schedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Schedule_By_PkArgs = {
  billing_schedule_id: Scalars['String'];
};


/** query root */
export type Query_RootBilling_Schedule_PeriodArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Period_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Period_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Schedule_Period_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Period_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Period_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
};


/** query root */
export type Query_RootBilling_Schedule_Period_By_PkArgs = {
  billing_schedule_period_id: Scalars['String'];
};


/** query root */
export type Query_RootCoursesArgs = {
  distinct_on?: InputMaybe<Array<Courses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Order_By>>;
  where?: InputMaybe<Courses_Bool_Exp>;
};


/** query root */
export type Query_RootCourses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Courses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Order_By>>;
  where?: InputMaybe<Courses_Bool_Exp>;
};


/** query root */
export type Query_RootCourses_By_PkArgs = {
  course_id: Scalars['String'];
};


/** query root */
export type Query_RootDiscountArgs = {
  distinct_on?: InputMaybe<Array<Discount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Discount_Order_By>>;
  where?: InputMaybe<Discount_Bool_Exp>;
};


/** query root */
export type Query_RootDiscount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Discount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Discount_Order_By>>;
  where?: InputMaybe<Discount_Bool_Exp>;
};


/** query root */
export type Query_RootDiscount_By_PkArgs = {
  discount_id: Scalars['String'];
};


/** query root */
export type Query_RootFeeArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** query root */
export type Query_RootFee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** query root */
export type Query_RootFee_By_PkArgs = {
  fee_id: Scalars['String'];
};


/** query root */
export type Query_RootGradeArgs = {
  distinct_on?: InputMaybe<Array<Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grade_Order_By>>;
  where?: InputMaybe<Grade_Bool_Exp>;
};


/** query root */
export type Query_RootGrade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grade_Order_By>>;
  where?: InputMaybe<Grade_Bool_Exp>;
};


/** query root */
export type Query_RootGrade_By_PkArgs = {
  grade_id: Scalars['String'];
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
export type Query_RootMaterialArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** query root */
export type Query_RootMaterial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** query root */
export type Query_RootMaterial_By_PkArgs = {
  material_id: Scalars['String'];
};


/** query root */
export type Query_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_Action_LogArgs = {
  distinct_on?: InputMaybe<Array<Order_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Action_Log_Order_By>>;
  where?: InputMaybe<Order_Action_Log_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_Action_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Action_Log_Order_By>>;
  where?: InputMaybe<Order_Action_Log_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_Action_Log_By_PkArgs = {
  order_action_log_id: Scalars['Int'];
};


/** query root */
export type Query_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_By_PkArgs = {
  order_id: Scalars['String'];
};


/** query root */
export type Query_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** query root */
export type Query_RootOrder_Item_By_PkArgs = {
  order_item_id: Scalars['String'];
};


/** query root */
export type Query_RootPackageArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_By_PkArgs = {
  package_id: Scalars['String'];
};


/** query root */
export type Query_RootPackage_CourseArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Order_By>>;
  where?: InputMaybe<Package_Course_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Order_By>>;
  where?: InputMaybe<Package_Course_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_By_PkArgs = {
  course_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** query root */
export type Query_RootPackage_Course_FeeArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Fee_Order_By>>;
  where?: InputMaybe<Package_Course_Fee_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_Fee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Fee_Order_By>>;
  where?: InputMaybe<Package_Course_Fee_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_Fee_By_PkArgs = {
  course_id: Scalars['String'];
  fee_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** query root */
export type Query_RootPackage_Course_MaterialArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Material_Order_By>>;
  where?: InputMaybe<Package_Course_Material_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_Material_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Material_Order_By>>;
  where?: InputMaybe<Package_Course_Material_Bool_Exp>;
};


/** query root */
export type Query_RootPackage_Course_Material_By_PkArgs = {
  course_id: Scalars['String'];
  material_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** query root */
export type Query_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_By_PkArgs = {
  product_id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_GradeArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Grade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Grade_By_PkArgs = {
  grade_id: Scalars['Int'];
  product_id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_LocationArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Location_By_PkArgs = {
  location_id: Scalars['String'];
  product_id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_PriceArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Price_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Price_By_PkArgs = {
  product_price_id: Scalars['Int'];
};


/** query root */
export type Query_RootProduct_SettingArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Setting_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Setting_By_PkArgs = {
  product_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_Package_ClassArgs = {
  distinct_on?: InputMaybe<Array<Student_Package_Class_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Package_Class_Order_By>>;
  where?: InputMaybe<Student_Package_Class_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Package_Class_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Package_Class_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Package_Class_Order_By>>;
  where?: InputMaybe<Student_Package_Class_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Package_Class_By_PkArgs = {
  class_id: Scalars['String'];
  course_id: Scalars['String'];
  location_id: Scalars['String'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Student_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Packages_Order_By>>;
  where?: InputMaybe<Student_Packages_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Packages_Order_By>>;
  where?: InputMaybe<Student_Packages_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Packages_By_PkArgs = {
  student_package_id: Scalars['String'];
};


/** query root */
export type Query_RootStudent_ProductArgs = {
  distinct_on?: InputMaybe<Array<Student_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Product_Order_By>>;
  where?: InputMaybe<Student_Product_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Product_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Product_Order_By>>;
  where?: InputMaybe<Student_Product_Bool_Exp>;
};


/** query root */
export type Query_RootStudent_Product_By_PkArgs = {
  student_product_id: Scalars['String'];
};


/** query root */
export type Query_RootTaxArgs = {
  distinct_on?: InputMaybe<Array<Tax_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tax_Order_By>>;
  where?: InputMaybe<Tax_Bool_Exp>;
};


/** query root */
export type Query_RootTax_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tax_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tax_Order_By>>;
  where?: InputMaybe<Tax_Bool_Exp>;
};


/** query root */
export type Query_RootTax_By_PkArgs = {
  tax_id: Scalars['String'];
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

/** columns and relationships of "student_package_class" */
export type Student_Package_Class = {
  class_id: Scalars['String'];
  course_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id: Scalars['String'];
  resource_path: Scalars['String'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "student_package_class" */
export type Student_Package_Class_Aggregate = {
  aggregate?: Maybe<Student_Package_Class_Aggregate_Fields>;
  nodes: Array<Student_Package_Class>;
};

/** aggregate fields of "student_package_class" */
export type Student_Package_Class_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Package_Class_Max_Fields>;
  min?: Maybe<Student_Package_Class_Min_Fields>;
};


/** aggregate fields of "student_package_class" */
export type Student_Package_Class_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Package_Class_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_package_class" */
export type Student_Package_Class_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Package_Class_Max_Order_By>;
  min?: InputMaybe<Student_Package_Class_Min_Order_By>;
};

/** input type for inserting array relation for remote table "student_package_class" */
export type Student_Package_Class_Arr_Rel_Insert_Input = {
  data: Array<Student_Package_Class_Insert_Input>;
  on_conflict?: InputMaybe<Student_Package_Class_On_Conflict>;
};

/** Boolean expression to filter rows from the table "student_package_class". All fields are combined with a logical 'AND'. */
export type Student_Package_Class_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Package_Class_Bool_Exp>>>;
  _not?: InputMaybe<Student_Package_Class_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Package_Class_Bool_Exp>>>;
  class_id?: InputMaybe<String_Comparison_Exp>;
  course_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_package_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_package_class" */
export enum Student_Package_Class_Constraint {
  /** unique or primary key constraint */
  StudentPackageClassPk = 'student_package_class_pk'
}

/** input type for inserting data into table "student_package_class" */
export type Student_Package_Class_Insert_Input = {
  class_id?: InputMaybe<Scalars['String']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_package_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Student_Package_Class_Max_Fields = {
  class_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  student_package_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "student_package_class" */
export type Student_Package_Class_Max_Order_By = {
  class_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Package_Class_Min_Fields = {
  class_id?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['String']>;
  student_package_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "student_package_class" */
export type Student_Package_Class_Min_Order_By = {
  class_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_package_class" */
export type Student_Package_Class_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Package_Class>;
};

/** input type for inserting object relation for remote table "student_package_class" */
export type Student_Package_Class_Obj_Rel_Insert_Input = {
  data: Student_Package_Class_Insert_Input;
  on_conflict?: InputMaybe<Student_Package_Class_On_Conflict>;
};

/** on conflict condition type for table "student_package_class" */
export type Student_Package_Class_On_Conflict = {
  constraint: Student_Package_Class_Constraint;
  update_columns: Array<Student_Package_Class_Update_Column>;
  where?: InputMaybe<Student_Package_Class_Bool_Exp>;
};

/** ordering options when selecting data from "student_package_class" */
export type Student_Package_Class_Order_By = {
  class_id?: InputMaybe<Order_By>;
  course_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_package_class" */
export type Student_Package_Class_Pk_Columns_Input = {
  class_id: Scalars['String'];
  course_id: Scalars['String'];
  location_id: Scalars['String'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
};

/** select columns of table "student_package_class" */
export enum Student_Package_Class_Select_Column {
  /** column name */
  ClassId = 'class_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentPackageId = 'student_package_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "student_package_class" */
export type Student_Package_Class_Set_Input = {
  class_id?: InputMaybe<Scalars['String']>;
  course_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_package_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "student_package_class" */
export enum Student_Package_Class_Update_Column {
  /** column name */
  ClassId = 'class_id',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentPackageId = 'student_package_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "student_packages" */
export type Student_Packages = {
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at: Scalars['timestamptz'];
  is_active: Scalars['Boolean'];
  location_ids?: Maybe<Scalars['_text']>;
  package_id?: Maybe<Scalars['String']>;
  properties: Scalars['jsonb'];
  resource_path: Scalars['String'];
  start_at: Scalars['timestamptz'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "student_packages" */
export type Student_PackagesPropertiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "student_packages" */
export type Student_Packages_Aggregate = {
  aggregate?: Maybe<Student_Packages_Aggregate_Fields>;
  nodes: Array<Student_Packages>;
};

/** aggregate fields of "student_packages" */
export type Student_Packages_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Packages_Max_Fields>;
  min?: Maybe<Student_Packages_Min_Fields>;
};


/** aggregate fields of "student_packages" */
export type Student_Packages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Packages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_packages" */
export type Student_Packages_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Packages_Max_Order_By>;
  min?: InputMaybe<Student_Packages_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Student_Packages_Append_Input = {
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "student_packages" */
export type Student_Packages_Arr_Rel_Insert_Input = {
  data: Array<Student_Packages_Insert_Input>;
  on_conflict?: InputMaybe<Student_Packages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "student_packages". All fields are combined with a logical 'AND'. */
export type Student_Packages_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Packages_Bool_Exp>>>;
  _not?: InputMaybe<Student_Packages_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Packages_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  location_ids?: InputMaybe<_Text_Comparison_Exp>;
  package_id?: InputMaybe<String_Comparison_Exp>;
  properties?: InputMaybe<Jsonb_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_package_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_packages" */
export enum Student_Packages_Constraint {
  /** unique or primary key constraint */
  PkStudentPackages = 'pk__student_packages'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Student_Packages_Delete_At_Path_Input = {
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Student_Packages_Delete_Elem_Input = {
  properties?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Student_Packages_Delete_Key_Input = {
  properties?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "student_packages" */
export type Student_Packages_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  location_ids?: InputMaybe<Scalars['_text']>;
  package_id?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_package_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Student_Packages_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_at?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  student_package_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "student_packages" */
export type Student_Packages_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Packages_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_at?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_at?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  student_package_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "student_packages" */
export type Student_Packages_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_packages" */
export type Student_Packages_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Packages>;
};

/** input type for inserting object relation for remote table "student_packages" */
export type Student_Packages_Obj_Rel_Insert_Input = {
  data: Student_Packages_Insert_Input;
  on_conflict?: InputMaybe<Student_Packages_On_Conflict>;
};

/** on conflict condition type for table "student_packages" */
export type Student_Packages_On_Conflict = {
  constraint: Student_Packages_Constraint;
  update_columns: Array<Student_Packages_Update_Column>;
  where?: InputMaybe<Student_Packages_Bool_Exp>;
};

/** ordering options when selecting data from "student_packages" */
export type Student_Packages_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_at?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  location_ids?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  properties?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_package_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_packages" */
export type Student_Packages_Pk_Columns_Input = {
  student_package_id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Student_Packages_Prepend_Input = {
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "student_packages" */
export enum Student_Packages_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LocationIds = 'location_ids',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  Properties = 'properties',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentPackageId = 'student_package_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "student_packages" */
export type Student_Packages_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_at?: InputMaybe<Scalars['timestamptz']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  location_ids?: InputMaybe<Scalars['_text']>;
  package_id?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_package_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "student_packages" */
export enum Student_Packages_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndAt = 'end_at',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LocationIds = 'location_ids',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  Properties = 'properties',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentPackageId = 'student_package_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "student_product" */
export type Student_Product = {
  approval_status?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  location_id: Scalars['String'];
  product_id: Scalars['String'];
  product_status: Scalars['String'];
  resource_path: Scalars['String'];
  start_date?: Maybe<Scalars['timestamptz']>;
  student_id: Scalars['String'];
  student_product_id: Scalars['String'];
  student_product_label?: Maybe<Scalars['String']>;
  upcoming_billing_date?: Maybe<Scalars['timestamptz']>;
  updated_at: Scalars['timestamptz'];
  updated_from_student_product_id?: Maybe<Scalars['String']>;
  updated_to_student_product_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "student_product" */
export type Student_Product_Aggregate = {
  aggregate?: Maybe<Student_Product_Aggregate_Fields>;
  nodes: Array<Student_Product>;
};

/** aggregate fields of "student_product" */
export type Student_Product_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Student_Product_Max_Fields>;
  min?: Maybe<Student_Product_Min_Fields>;
};


/** aggregate fields of "student_product" */
export type Student_Product_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Student_Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "student_product" */
export type Student_Product_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Student_Product_Max_Order_By>;
  min?: InputMaybe<Student_Product_Min_Order_By>;
};

/** input type for inserting array relation for remote table "student_product" */
export type Student_Product_Arr_Rel_Insert_Input = {
  data: Array<Student_Product_Insert_Input>;
  on_conflict?: InputMaybe<Student_Product_On_Conflict>;
};

/** Boolean expression to filter rows from the table "student_product". All fields are combined with a logical 'AND'. */
export type Student_Product_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Student_Product_Bool_Exp>>>;
  _not?: InputMaybe<Student_Product_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Student_Product_Bool_Exp>>>;
  approval_status?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  location_id?: InputMaybe<String_Comparison_Exp>;
  product_id?: InputMaybe<String_Comparison_Exp>;
  product_status?: InputMaybe<String_Comparison_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_product_id?: InputMaybe<String_Comparison_Exp>;
  student_product_label?: InputMaybe<String_Comparison_Exp>;
  upcoming_billing_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_from_student_product_id?: InputMaybe<String_Comparison_Exp>;
  updated_to_student_product_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "student_product" */
export enum Student_Product_Constraint {
  /** unique or primary key constraint */
  StudentProductPk = 'student_product_pk'
}

/** input type for inserting data into table "student_product" */
export type Student_Product_Insert_Input = {
  approval_status?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_product_id?: InputMaybe<Scalars['String']>;
  student_product_label?: InputMaybe<Scalars['String']>;
  upcoming_billing_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  updated_from_student_product_id?: InputMaybe<Scalars['String']>;
  updated_to_student_product_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Student_Product_Max_Fields = {
  approval_status?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  student_product_id?: Maybe<Scalars['String']>;
  student_product_label?: Maybe<Scalars['String']>;
  upcoming_billing_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_from_student_product_id?: Maybe<Scalars['String']>;
  updated_to_student_product_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "student_product" */
export type Student_Product_Max_Order_By = {
  approval_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
  student_product_label?: InputMaybe<Order_By>;
  upcoming_billing_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_from_student_product_id?: InputMaybe<Order_By>;
  updated_to_student_product_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Student_Product_Min_Fields = {
  approval_status?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  end_date?: Maybe<Scalars['timestamptz']>;
  location_id?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  product_status?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['timestamptz']>;
  student_id?: Maybe<Scalars['String']>;
  student_product_id?: Maybe<Scalars['String']>;
  student_product_label?: Maybe<Scalars['String']>;
  upcoming_billing_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_from_student_product_id?: Maybe<Scalars['String']>;
  updated_to_student_product_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "student_product" */
export type Student_Product_Min_Order_By = {
  approval_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
  student_product_label?: InputMaybe<Order_By>;
  upcoming_billing_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_from_student_product_id?: InputMaybe<Order_By>;
  updated_to_student_product_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "student_product" */
export type Student_Product_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Student_Product>;
};

/** input type for inserting object relation for remote table "student_product" */
export type Student_Product_Obj_Rel_Insert_Input = {
  data: Student_Product_Insert_Input;
  on_conflict?: InputMaybe<Student_Product_On_Conflict>;
};

/** on conflict condition type for table "student_product" */
export type Student_Product_On_Conflict = {
  constraint: Student_Product_Constraint;
  update_columns: Array<Student_Product_Update_Column>;
  where?: InputMaybe<Student_Product_Bool_Exp>;
};

/** ordering options when selecting data from "student_product" */
export type Student_Product_Order_By = {
  approval_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  location_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  product_status?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_product_id?: InputMaybe<Order_By>;
  student_product_label?: InputMaybe<Order_By>;
  upcoming_billing_date?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_from_student_product_id?: InputMaybe<Order_By>;
  updated_to_student_product_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "student_product" */
export type Student_Product_Pk_Columns_Input = {
  student_product_id: Scalars['String'];
};

/** select columns of table "student_product" */
export enum Student_Product_Select_Column {
  /** column name */
  ApprovalStatus = 'approval_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductStatus = 'product_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentProductId = 'student_product_id',
  /** column name */
  StudentProductLabel = 'student_product_label',
  /** column name */
  UpcomingBillingDate = 'upcoming_billing_date',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedFromStudentProductId = 'updated_from_student_product_id',
  /** column name */
  UpdatedToStudentProductId = 'updated_to_student_product_id'
}

/** input type for updating data in table "student_product" */
export type Student_Product_Set_Input = {
  approval_status?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
  location_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_status?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  student_id?: InputMaybe<Scalars['String']>;
  student_product_id?: InputMaybe<Scalars['String']>;
  student_product_label?: InputMaybe<Scalars['String']>;
  upcoming_billing_date?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  updated_from_student_product_id?: InputMaybe<Scalars['String']>;
  updated_to_student_product_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "student_product" */
export enum Student_Product_Update_Column {
  /** column name */
  ApprovalStatus = 'approval_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  LocationId = 'location_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  ProductStatus = 'product_status',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentProductId = 'student_product_id',
  /** column name */
  StudentProductLabel = 'student_product_label',
  /** column name */
  UpcomingBillingDate = 'upcoming_billing_date',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedFromStudentProductId = 'updated_from_student_product_id',
  /** column name */
  UpdatedToStudentProductId = 'updated_to_student_product_id'
}

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "bill_item" */
  bill_item: Array<Bill_Item>;
  /** fetch aggregated fields from the table: "bill_item" */
  bill_item_aggregate: Bill_Item_Aggregate;
  /** fetch data from the table: "bill_item" using primary key columns */
  bill_item_by_pk?: Maybe<Bill_Item>;
  /** fetch data from the table: "billing_ratio" */
  billing_ratio: Array<Billing_Ratio>;
  /** fetch aggregated fields from the table: "billing_ratio" */
  billing_ratio_aggregate: Billing_Ratio_Aggregate;
  /** fetch data from the table: "billing_ratio" using primary key columns */
  billing_ratio_by_pk?: Maybe<Billing_Ratio>;
  /** fetch data from the table: "billing_schedule" */
  billing_schedule: Array<Billing_Schedule>;
  /** fetch aggregated fields from the table: "billing_schedule" */
  billing_schedule_aggregate: Billing_Schedule_Aggregate;
  /** fetch data from the table: "billing_schedule" using primary key columns */
  billing_schedule_by_pk?: Maybe<Billing_Schedule>;
  /** fetch data from the table: "billing_schedule_period" */
  billing_schedule_period: Array<Billing_Schedule_Period>;
  /** fetch aggregated fields from the table: "billing_schedule_period" */
  billing_schedule_period_aggregate: Billing_Schedule_Period_Aggregate;
  /** fetch data from the table: "billing_schedule_period" using primary key columns */
  billing_schedule_period_by_pk?: Maybe<Billing_Schedule_Period>;
  /** fetch data from the table: "courses" */
  courses: Array<Courses>;
  /** fetch aggregated fields from the table: "courses" */
  courses_aggregate: Courses_Aggregate;
  /** fetch data from the table: "courses" using primary key columns */
  courses_by_pk?: Maybe<Courses>;
  /** fetch data from the table: "discount" */
  discount: Array<Discount>;
  /** fetch aggregated fields from the table: "discount" */
  discount_aggregate: Discount_Aggregate;
  /** fetch data from the table: "discount" using primary key columns */
  discount_by_pk?: Maybe<Discount>;
  /** fetch data from the table: "fee" */
  fee: Array<Fee>;
  /** fetch aggregated fields from the table: "fee" */
  fee_aggregate: Fee_Aggregate;
  /** fetch data from the table: "fee" using primary key columns */
  fee_by_pk?: Maybe<Fee>;
  /** fetch data from the table: "grade" */
  grade: Array<Grade>;
  /** fetch aggregated fields from the table: "grade" */
  grade_aggregate: Grade_Aggregate;
  /** fetch data from the table: "grade" using primary key columns */
  grade_by_pk?: Maybe<Grade>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch data from the table: "order_action_log" */
  order_action_log: Array<Order_Action_Log>;
  /** fetch aggregated fields from the table: "order_action_log" */
  order_action_log_aggregate: Order_Action_Log_Aggregate;
  /** fetch data from the table: "order_action_log" using primary key columns */
  order_action_log_by_pk?: Maybe<Order_Action_Log>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table: "package" */
  package: Array<Package>;
  /** fetch aggregated fields from the table: "package" */
  package_aggregate: Package_Aggregate;
  /** fetch data from the table: "package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package_course" */
  package_course: Array<Package_Course>;
  /** fetch aggregated fields from the table: "package_course" */
  package_course_aggregate: Package_Course_Aggregate;
  /** fetch data from the table: "package_course" using primary key columns */
  package_course_by_pk?: Maybe<Package_Course>;
  /** fetch data from the table: "package_course_fee" */
  package_course_fee: Array<Package_Course_Fee>;
  /** fetch aggregated fields from the table: "package_course_fee" */
  package_course_fee_aggregate: Package_Course_Fee_Aggregate;
  /** fetch data from the table: "package_course_fee" using primary key columns */
  package_course_fee_by_pk?: Maybe<Package_Course_Fee>;
  /** fetch data from the table: "package_course_material" */
  package_course_material: Array<Package_Course_Material>;
  /** fetch aggregated fields from the table: "package_course_material" */
  package_course_material_aggregate: Package_Course_Material_Aggregate;
  /** fetch data from the table: "package_course_material" using primary key columns */
  package_course_material_by_pk?: Maybe<Package_Course_Material>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_grade" */
  product_grade: Array<Product_Grade>;
  /** fetch aggregated fields from the table: "product_grade" */
  product_grade_aggregate: Product_Grade_Aggregate;
  /** fetch data from the table: "product_grade" using primary key columns */
  product_grade_by_pk?: Maybe<Product_Grade>;
  /** fetch data from the table: "product_location" */
  product_location: Array<Product_Location>;
  /** fetch aggregated fields from the table: "product_location" */
  product_location_aggregate: Product_Location_Aggregate;
  /** fetch data from the table: "product_location" using primary key columns */
  product_location_by_pk?: Maybe<Product_Location>;
  /** fetch data from the table: "product_price" */
  product_price: Array<Product_Price>;
  /** fetch aggregated fields from the table: "product_price" */
  product_price_aggregate: Product_Price_Aggregate;
  /** fetch data from the table: "product_price" using primary key columns */
  product_price_by_pk?: Maybe<Product_Price>;
  /** fetch data from the table: "product_setting" */
  product_setting: Array<Product_Setting>;
  /** fetch aggregated fields from the table: "product_setting" */
  product_setting_aggregate: Product_Setting_Aggregate;
  /** fetch data from the table: "product_setting" using primary key columns */
  product_setting_by_pk?: Maybe<Product_Setting>;
  /** fetch data from the table: "student_package_class" */
  student_package_class: Array<Student_Package_Class>;
  /** fetch aggregated fields from the table: "student_package_class" */
  student_package_class_aggregate: Student_Package_Class_Aggregate;
  /** fetch data from the table: "student_package_class" using primary key columns */
  student_package_class_by_pk?: Maybe<Student_Package_Class>;
  /** fetch data from the table: "student_packages" */
  student_packages: Array<Student_Packages>;
  /** fetch aggregated fields from the table: "student_packages" */
  student_packages_aggregate: Student_Packages_Aggregate;
  /** fetch data from the table: "student_packages" using primary key columns */
  student_packages_by_pk?: Maybe<Student_Packages>;
  /** fetch data from the table: "student_product" */
  student_product: Array<Student_Product>;
  /** fetch aggregated fields from the table: "student_product" */
  student_product_aggregate: Student_Product_Aggregate;
  /** fetch data from the table: "student_product" using primary key columns */
  student_product_by_pk?: Maybe<Student_Product>;
  /** fetch data from the table: "tax" */
  tax: Array<Tax>;
  /** fetch aggregated fields from the table: "tax" */
  tax_aggregate: Tax_Aggregate;
  /** fetch data from the table: "tax" using primary key columns */
  tax_by_pk?: Maybe<Tax>;
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
export type Subscription_RootBilling_RatioArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Ratio_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Ratio_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Ratio_Order_By>>;
  where?: InputMaybe<Billing_Ratio_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Ratio_By_PkArgs = {
  billing_ratio_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBilling_ScheduleArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Schedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Schedule_By_PkArgs = {
  billing_schedule_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBilling_Schedule_PeriodArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Period_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Period_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Schedule_Period_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Billing_Schedule_Period_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Billing_Schedule_Period_Order_By>>;
  where?: InputMaybe<Billing_Schedule_Period_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBilling_Schedule_Period_By_PkArgs = {
  billing_schedule_period_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootCoursesArgs = {
  distinct_on?: InputMaybe<Array<Courses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Order_By>>;
  where?: InputMaybe<Courses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Courses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Courses_Order_By>>;
  where?: InputMaybe<Courses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCourses_By_PkArgs = {
  course_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootDiscountArgs = {
  distinct_on?: InputMaybe<Array<Discount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Discount_Order_By>>;
  where?: InputMaybe<Discount_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDiscount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Discount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Discount_Order_By>>;
  where?: InputMaybe<Discount_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDiscount_By_PkArgs = {
  discount_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootFeeArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Fee_Order_By>>;
  where?: InputMaybe<Fee_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFee_By_PkArgs = {
  fee_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootGradeArgs = {
  distinct_on?: InputMaybe<Array<Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grade_Order_By>>;
  where?: InputMaybe<Grade_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGrade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grade_Order_By>>;
  where?: InputMaybe<Grade_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGrade_By_PkArgs = {
  grade_id: Scalars['String'];
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
export type Subscription_RootMaterialArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMaterial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMaterial_By_PkArgs = {
  material_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_Action_LogArgs = {
  distinct_on?: InputMaybe<Array<Order_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Action_Log_Order_By>>;
  where?: InputMaybe<Order_Action_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_Action_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Action_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Action_Log_Order_By>>;
  where?: InputMaybe<Order_Action_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_Action_Log_By_PkArgs = {
  order_action_log_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_By_PkArgs = {
  order_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrder_Item_By_PkArgs = {
  order_item_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPackageArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_By_PkArgs = {
  package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPackage_CourseArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Order_By>>;
  where?: InputMaybe<Package_Course_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Order_By>>;
  where?: InputMaybe<Package_Course_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_By_PkArgs = {
  course_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPackage_Course_FeeArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Fee_Order_By>>;
  where?: InputMaybe<Package_Course_Fee_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_Fee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Fee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Fee_Order_By>>;
  where?: InputMaybe<Package_Course_Fee_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_Fee_By_PkArgs = {
  course_id: Scalars['String'];
  fee_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPackage_Course_MaterialArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Material_Order_By>>;
  where?: InputMaybe<Package_Course_Material_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_Material_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Course_Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Course_Material_Order_By>>;
  where?: InputMaybe<Package_Course_Material_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPackage_Course_Material_By_PkArgs = {
  course_id: Scalars['String'];
  material_id: Scalars['String'];
  package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_By_PkArgs = {
  product_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_GradeArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Grade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Grade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Grade_Order_By>>;
  where?: InputMaybe<Product_Grade_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Grade_By_PkArgs = {
  grade_id: Scalars['Int'];
  product_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_LocationArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Location_Order_By>>;
  where?: InputMaybe<Product_Location_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Location_By_PkArgs = {
  location_id: Scalars['String'];
  product_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_PriceArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Price_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Price_Order_By>>;
  where?: InputMaybe<Product_Price_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Price_By_PkArgs = {
  product_price_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootProduct_SettingArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Setting_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Setting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Setting_Order_By>>;
  where?: InputMaybe<Product_Setting_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Setting_By_PkArgs = {
  product_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_Package_ClassArgs = {
  distinct_on?: InputMaybe<Array<Student_Package_Class_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Package_Class_Order_By>>;
  where?: InputMaybe<Student_Package_Class_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Package_Class_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Package_Class_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Package_Class_Order_By>>;
  where?: InputMaybe<Student_Package_Class_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Package_Class_By_PkArgs = {
  class_id: Scalars['String'];
  course_id: Scalars['String'];
  location_id: Scalars['String'];
  student_id: Scalars['String'];
  student_package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Student_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Packages_Order_By>>;
  where?: InputMaybe<Student_Packages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Packages_Order_By>>;
  where?: InputMaybe<Student_Packages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Packages_By_PkArgs = {
  student_package_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStudent_ProductArgs = {
  distinct_on?: InputMaybe<Array<Student_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Product_Order_By>>;
  where?: InputMaybe<Student_Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Product_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Student_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Student_Product_Order_By>>;
  where?: InputMaybe<Student_Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudent_Product_By_PkArgs = {
  student_product_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTaxArgs = {
  distinct_on?: InputMaybe<Array<Tax_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tax_Order_By>>;
  where?: InputMaybe<Tax_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTax_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tax_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tax_Order_By>>;
  where?: InputMaybe<Tax_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTax_By_PkArgs = {
  tax_id: Scalars['String'];
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

/** columns and relationships of "tax" */
export type Tax = {
  created_at: Scalars['timestamptz'];
  default_flag: Scalars['Boolean'];
  is_archived: Scalars['Boolean'];
  name: Scalars['String'];
  /** An array relationship */
  products: Array<Product>;
  /** An aggregated array relationship */
  products_aggregate: Product_Aggregate;
  resource_path: Scalars['String'];
  tax_category: Scalars['String'];
  tax_id: Scalars['String'];
  tax_percentage: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "tax" */
export type TaxProductsArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "tax" */
export type TaxProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** aggregated selection of "tax" */
export type Tax_Aggregate = {
  aggregate?: Maybe<Tax_Aggregate_Fields>;
  nodes: Array<Tax>;
};

/** aggregate fields of "tax" */
export type Tax_Aggregate_Fields = {
  avg?: Maybe<Tax_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Tax_Max_Fields>;
  min?: Maybe<Tax_Min_Fields>;
  stddev?: Maybe<Tax_Stddev_Fields>;
  stddev_pop?: Maybe<Tax_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tax_Stddev_Samp_Fields>;
  sum?: Maybe<Tax_Sum_Fields>;
  var_pop?: Maybe<Tax_Var_Pop_Fields>;
  var_samp?: Maybe<Tax_Var_Samp_Fields>;
  variance?: Maybe<Tax_Variance_Fields>;
};


/** aggregate fields of "tax" */
export type Tax_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tax_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tax" */
export type Tax_Aggregate_Order_By = {
  avg?: InputMaybe<Tax_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tax_Max_Order_By>;
  min?: InputMaybe<Tax_Min_Order_By>;
  stddev?: InputMaybe<Tax_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tax_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tax_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tax_Sum_Order_By>;
  var_pop?: InputMaybe<Tax_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tax_Var_Samp_Order_By>;
  variance?: InputMaybe<Tax_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tax" */
export type Tax_Arr_Rel_Insert_Input = {
  data: Array<Tax_Insert_Input>;
  on_conflict?: InputMaybe<Tax_On_Conflict>;
};

/** aggregate avg on columns */
export type Tax_Avg_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "tax" */
export type Tax_Avg_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tax". All fields are combined with a logical 'AND'. */
export type Tax_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Tax_Bool_Exp>>>;
  _not?: InputMaybe<Tax_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Tax_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  default_flag?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  products?: InputMaybe<Product_Bool_Exp>;
  resource_path?: InputMaybe<String_Comparison_Exp>;
  tax_category?: InputMaybe<String_Comparison_Exp>;
  tax_id?: InputMaybe<String_Comparison_Exp>;
  tax_percentage?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "tax" */
export enum Tax_Constraint {
  /** unique or primary key constraint */
  TaxDefaultFlagIdx = 'tax_default_flag_idx',
  /** unique or primary key constraint */
  TaxPk = 'tax_pk'
}

/** input type for incrementing integer column in table "tax" */
export type Tax_Inc_Input = {
  tax_percentage?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "tax" */
export type Tax_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  default_flag?: InputMaybe<Scalars['Boolean']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Product_Arr_Rel_Insert_Input>;
  resource_path?: InputMaybe<Scalars['String']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Tax_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "tax" */
export type Tax_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tax_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  resource_path?: Maybe<Scalars['String']>;
  tax_category?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  tax_percentage?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "tax" */
export type Tax_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tax" */
export type Tax_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Tax>;
};

/** input type for inserting object relation for remote table "tax" */
export type Tax_Obj_Rel_Insert_Input = {
  data: Tax_Insert_Input;
  on_conflict?: InputMaybe<Tax_On_Conflict>;
};

/** on conflict condition type for table "tax" */
export type Tax_On_Conflict = {
  constraint: Tax_Constraint;
  update_columns: Array<Tax_Update_Column>;
  where?: InputMaybe<Tax_Bool_Exp>;
};

/** ordering options when selecting data from "tax" */
export type Tax_Order_By = {
  created_at?: InputMaybe<Order_By>;
  default_flag?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<Product_Aggregate_Order_By>;
  resource_path?: InputMaybe<Order_By>;
  tax_category?: InputMaybe<Order_By>;
  tax_id?: InputMaybe<Order_By>;
  tax_percentage?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "tax" */
export type Tax_Pk_Columns_Input = {
  tax_id: Scalars['String'];
};

/** select columns of table "tax" */
export enum Tax_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultFlag = 'default_flag',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
  /** column name */
  TaxCategory = 'tax_category',
  /** column name */
  TaxId = 'tax_id',
  /** column name */
  TaxPercentage = 'tax_percentage',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "tax" */
export type Tax_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  default_flag?: InputMaybe<Scalars['Boolean']>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  resource_path?: InputMaybe<Scalars['String']>;
  tax_category?: InputMaybe<Scalars['String']>;
  tax_id?: InputMaybe<Scalars['String']>;
  tax_percentage?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Tax_Stddev_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "tax" */
export type Tax_Stddev_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tax_Stddev_Pop_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "tax" */
export type Tax_Stddev_Pop_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tax_Stddev_Samp_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "tax" */
export type Tax_Stddev_Samp_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Tax_Sum_Fields = {
  tax_percentage?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "tax" */
export type Tax_Sum_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** update columns of table "tax" */
export enum Tax_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultFlag = 'default_flag',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  Name = 'name',
  /** column name */
  ResourcePath = 'resource_path',
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
export type Tax_Var_Pop_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "tax" */
export type Tax_Var_Pop_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tax_Var_Samp_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "tax" */
export type Tax_Var_Samp_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tax_Variance_Fields = {
  tax_percentage?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "tax" */
export type Tax_Variance_Order_By = {
  tax_percentage?: InputMaybe<Order_By>;
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
