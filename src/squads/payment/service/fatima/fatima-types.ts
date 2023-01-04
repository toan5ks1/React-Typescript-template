import * as Types from '../../__generated__/fatima/root-types';

export type Payment_GetManyBillItemsV2QueryVariables = Types.Exact<{
  order_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetManyBillItemsV2Query = { bill_item: Array<{ bill_item_sequence_number: number, product_description: string, billing_status: string, billing_date?: any | null | undefined, final_price: number, order_id: string, product_id?: string | null | undefined }>, bill_item_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables = Types.Exact<{
  student_product_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyBillItemsByStudentProductIdsV2Query = { bill_item: Array<{ product_id?: string | null | undefined, product_pricing?: number | null | undefined, discount_amount_type?: string | null | undefined, discount_amount_value?: number | null | undefined, tax_id?: string | null | undefined, tax_category?: string | null | undefined, tax_percentage?: number | null | undefined, order_id: string, billing_status: string, billing_date?: any | null | undefined, billing_schedule_period_id?: string | null | undefined, bill_item_sequence_number: number, discount_amount?: number | null | undefined, tax_amount?: number | null | undefined, final_price: number, billing_approval_status?: string | null | undefined, billing_item_description?: any | null | undefined, student_product_id?: string | null | undefined, previous_bill_item_status?: string | null | undefined, previous_bill_item_sequence_number?: number | null | undefined, is_latest_bill_item?: boolean | null | undefined, adjustment_price?: number | null | undefined, price?: number | null | undefined, old_price?: number | null | undefined, billing_ratio_numerator?: number | null | undefined, billing_ratio_denominator?: number | null | undefined }> };

export type BillingRatioAttrsFragment = { billing_ratio_id: string, start_date: any, end_date: any, billing_schedule_period_id: string, billing_ratio_numerator: number, billing_ratio_denominator: number };

export type Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables = Types.Exact<{
  billingSchedulePeriodId: Types.Scalars['String'];
}>;


export type Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery = { billing_ratio: Array<{ billing_ratio_id: string, start_date: any, end_date: any, billing_schedule_period_id: string, billing_ratio_numerator: number, billing_ratio_denominator: number }> };

export type Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables = Types.Exact<{
  billingScheduleId: Types.Scalars['String'];
}>;


export type Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery = { billing_schedule_period: Array<{ billing_schedule_period_id: string, billing_schedule_id: string, name: string, billing_date: any, start_date: any, end_date: any, billing_ratios: Array<{ billing_ratio_id: string, start_date: any, end_date: any, billing_schedule_period_id: string, billing_ratio_numerator: number, billing_ratio_denominator: number }> }> };

export type Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables = Types.Exact<{
  billingScheduleIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery = { billing_schedule_period: Array<{ billing_schedule_period_id: string, billing_schedule_id: string, name: string, billing_date: any, start_date: any, end_date: any, billing_ratios: Array<{ billing_ratio_id: string, start_date: any, end_date: any, billing_schedule_period_id: string, billing_ratio_numerator: number, billing_ratio_denominator: number }> }> };

export type Payment_GetManyCourseByCourseIdsQueryVariables = Types.Exact<{
  course_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyCourseByCourseIdsQuery = { courses: Array<{ course_id: string, grade?: number | null | undefined, name: string }> };

export type DiscountAttrsFragment = { available_from: any, available_until: any, created_at: any, discount_amount_type: string, discount_amount_value: number, discount_type: string, discount_id: string, name: string, recurring_valid_duration?: number | null | undefined, remarks?: string | null | undefined, updated_at: any };

export type Payment_GetManyDiscountsQueryVariables = Types.Exact<{
  current_date: Types.Scalars['timestamptz'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetManyDiscountsQuery = { discount: Array<{ available_from: any, available_until: any, created_at: any, discount_amount_type: string, discount_amount_value: number, discount_type: string, discount_id: string, name: string, recurring_valid_duration?: number | null | undefined, remarks?: string | null | undefined, updated_at: any }> };

export type Payment_GetManyDiscountsByDiscountIdsQueryVariables = Types.Exact<{
  discountIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyDiscountsByDiscountIdsQuery = { discount: Array<{ available_from: any, available_until: any, created_at: any, discount_amount_type: string, discount_amount_value: number, discount_type: string, discount_id: string, name: string, recurring_valid_duration?: number | null | undefined, remarks?: string | null | undefined, updated_at: any }> };

export type Payment_GetFeeByProductIdQueryVariables = Types.Exact<{
  product_id: Types.Scalars['String'];
}>;


export type Payment_GetFeeByProductIdQuery = { fee: Array<{ fee_type: string }> };

export type Payment_GetManyFeesByProductIdsQueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyFeesByProductIdsQuery = { fee: Array<{ fee_id: string, fee_type: string }> };

export type User_CountGradesByIdsQueryVariables = Types.Exact<{
  gradeIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type User_CountGradesByIdsQuery = { grade_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Payment_GetLocationNameByLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
}>;


export type Payment_GetLocationNameByLocationIdQuery = { locations: Array<{ name: string }> };

export type Payment_GetMaterialByProductIdQueryVariables = Types.Exact<{
  product_id: Types.Scalars['String'];
}>;


export type Payment_GetMaterialByProductIdQuery = { material: Array<{ custom_billing_date?: any | null | undefined, material_type: string }> };

export type Payment_GetManyMaterialsByProductIdsV2QueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyMaterialsByProductIdsV2Query = { material: Array<{ material_id: string, material_type: string, custom_billing_date?: any | null | undefined }> };

export type Payment_ActionLogsAttrFragment = { user_id: string, action?: string | null | undefined, comment?: string | null | undefined, created_at: any };

export type Payment_GetManyActionLogsByOrderIdQueryVariables = Types.Exact<{
  order_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetManyActionLogsByOrderIdQuery = { order_action_log: Array<{ user_id: string, action?: string | null | undefined, comment?: string | null | undefined, created_at: any }>, order_action_log_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Payment_GetOrderItemsByOrderIdQueryVariables = Types.Exact<{
  orderId: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetOrderItemsByOrderIdQuery = { order_item: Array<{ discount_id?: string | null | undefined, product_id?: string | null | undefined, start_date?: any | null | undefined }>, order_item_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Payment_GetManyOrderItemsByStudentProductIdsQueryVariables = Types.Exact<{
  student_product_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyOrderItemsByStudentProductIdsQuery = { order_item: Array<{ student_product_id?: string | null | undefined, discount_id?: string | null | undefined, product_id?: string | null | undefined, order_id: string }> };

export type Payment_OrderAttrsFragment = { order_id: string, order_sequence_number: number, order_status: string, order_type?: string | null | undefined, student_id: string, location_id: string, created_at: any };

export type Payment_GetOrderByOrderIdQueryVariables = Types.Exact<{
  order_id: Types.Scalars['String'];
}>;


export type Payment_GetOrderByOrderIdQuery = { order: Array<{ order_id: string, order_sequence_number: number, order_status: string, order_type?: string | null | undefined, student_id: string, location_id: string, created_at: any }> };

export type Payment_GetManyPackageCourseFeesByPackageIdQueryVariables = Types.Exact<{
  current_date: Types.Scalars['timestamptz'];
  package_id: Types.Scalars['String'];
}>;


export type Payment_GetManyPackageCourseFeesByPackageIdQuery = { package_course_fee: Array<{ available_from?: any | null | undefined, available_until?: any | null | undefined, course_id: string, created_at: any, fee_id: string, package_id: string }> };

export type Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables = Types.Exact<{
  current_date: Types.Scalars['timestamptz'];
  package_id: Types.Scalars['String'];
}>;


export type Payment_GetManyPackageCourseMaterialsByPackageIdQuery = { package_course_material: Array<{ available_from?: any | null | undefined, available_until?: any | null | undefined, course_id: string, created_at: any, material_id: string, package_id: string }> };

export type Payment_GetManyPackageCourseByPackageIdQueryVariables = Types.Exact<{
  package_id: Types.Scalars['String'];
}>;


export type Payment_GetManyPackageCourseByPackageIdQuery = { package_course: Array<{ course_id: string, course_weight: number, created_at: any, mandatory_flag: boolean, max_slots_per_course: number, package_id: string }> };

export type Payment_GetPackageByProductIdQueryVariables = Types.Exact<{
  product_id: Types.Scalars['String'];
}>;


export type Payment_GetPackageByProductIdQuery = { package: Array<{ max_slot: number, package_end_date?: any | null | undefined, package_start_date?: any | null | undefined, package_type: string }> };

export type Payment_GetPackagesByProductIdsQueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetPackagesByProductIdsQuery = { package: Array<{ package_id: string, max_slot: number, package_end_date?: any | null | undefined, package_start_date?: any | null | undefined, package_type: string }> };

export type Payment_GetProductIdsByGradeIdsQueryVariables = Types.Exact<{
  grade_ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type Payment_GetProductIdsByGradeIdsQuery = { product_grade: Array<{ product_id: string }> };

export type Payment_GetProductIdsByLocationIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetProductIdsByLocationIdsQuery = { product_location: Array<{ product_id: string }> };

export type ProductPriceAttrsFragment = { product_price_id: number, billing_schedule_period_id?: string | null | undefined, created_at: any, price: number, product_id: string, quantity?: number | null | undefined };

export type Payment_GetProductPriceByProductIdQueryVariables = Types.Exact<{
  product_id: Types.Scalars['String'];
}>;


export type Payment_GetProductPriceByProductIdQuery = { product_price: Array<{ product_price_id: number, billing_schedule_period_id?: string | null | undefined, created_at: any, price: number, product_id: string, quantity?: number | null | undefined }> };

export type Payment_GetManyProductPricesByProductIdsQueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyProductPricesByProductIdsQuery = { product_price: Array<{ product_price_id: number, billing_schedule_period_id?: string | null | undefined, created_at: any, price: number, product_id: string, quantity?: number | null | undefined }> };

export type ProductAttrsFragment = { product_id: string, available_from: any, available_until: any, billing_schedule_id?: string | null | undefined, created_at: any, custom_billing_period?: any | null | undefined, disable_pro_rating_flag: boolean, name: string, product_type: string, remarks?: string | null | undefined, tax_id?: string | null | undefined, updated_at: any };

export type Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  product_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  available_from?: Types.InputMaybe<Types.Scalars['timestamptz']>;
  available_until?: Types.InputMaybe<Types.Scalars['timestamptz']>;
}>;


export type Payment_GetManyProductsByProductIdsAndAvailableDateQuery = { product: Array<{ product_id: string, available_from: any, available_until: any, billing_schedule_id?: string | null | undefined, created_at: any, custom_billing_period?: any | null | undefined, disable_pro_rating_flag: boolean, name: string, product_type: string, remarks?: string | null | undefined, tax_id?: string | null | undefined, updated_at: any }> };

export type Payment_GetManyProductsReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetManyProductsReferenceQuery = { product: Array<{ product_id: string, available_from: any, available_until: any, billing_schedule_id?: string | null | undefined, created_at: any, custom_billing_period?: any | null | undefined, disable_pro_rating_flag: boolean, name: string, product_type: string, remarks?: string | null | undefined, tax_id?: string | null | undefined, updated_at: any }> };

export type Payment_GetManyProductsByProductIdsQueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyProductsByProductIdsQuery = { product: Array<{ product_id: string, available_from: any, available_until: any, billing_schedule_id?: string | null | undefined, created_at: any, custom_billing_period?: any | null | undefined, disable_pro_rating_flag: boolean, name: string, product_type: string, remarks?: string | null | undefined, tax_id?: string | null | undefined, updated_at: any }> };

export type Payment_GetEnrollmentProductIdsByProductIdsQueryVariables = Types.Exact<{
  productIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetEnrollmentProductIdsByProductIdsQuery = { product_setting: Array<{ product_id: string }> };

export type Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables = Types.Exact<{
  student_product_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyStudentProductsByStudentProductIdsV2Query = { student_product: Array<{ approval_status?: string | null | undefined, location_id: string, product_id: string, product_status: string, start_date?: any | null | undefined, end_date?: any | null | undefined, student_id: string, student_product_id: string, upcoming_billing_date?: any | null | undefined, updated_from_student_product_id?: string | null | undefined, updated_to_student_product_id?: string | null | undefined, student_product_label?: string | null | undefined }> };

export type TaxAttrsFragment = { tax_percentage: number, tax_category: string };

export type Payment_GetTaxByTaxIdV2QueryVariables = Types.Exact<{
  tax_id: Types.Scalars['String'];
}>;


export type Payment_GetTaxByTaxIdV2Query = { tax: Array<{ tax_percentage: number, tax_category: string }> };

export type Payment_GetManyTaxesByTaxIdsQueryVariables = Types.Exact<{
  tax_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Payment_GetManyTaxesByTaxIdsQuery = { tax: Array<{ tax_id: string, tax_percentage: number, tax_category: string }> };

export type Payment_GetManyTaxesReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Payment_GetManyTaxesReferenceQuery = { tax: Array<{ tax_id: string, name: string, tax_percentage: number, tax_category: string }> };
