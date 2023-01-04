import * as Types from '../../__generated__/timesheet/root-types';

export type Timesheet_LessonHoursByTimesheetIdsQueryVariables = Types.Exact<{
  timesheet_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Timesheet_LessonHoursByTimesheetIdsQuery = { timesheet_lesson_hours: Array<{ timesheet_id: string, lesson_id: string }> };

export type Timesheet_LessonListByLessonIdsQueryVariables = Types.Exact<{
  lesson_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Timesheet_LessonListByLessonIdsQuery = { lessons: Array<{ lesson_id: string, start_time?: any | null | undefined, end_time?: any | null | undefined, scheduling_status?: string | null | undefined, teaching_method?: string | null | undefined }> };

export type Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables = Types.Exact<{
  timesheet_id: Types.Scalars['String'];
}>;


export type Timesheet_OtherWorkingHoursByTimesheetIdQuery = { other_working_hours: Array<{ other_working_hours_id: string, timesheet_id: string, timesheet_config_id: string, start_time: any, end_time: any, total_hour: number, remarks?: string | null | undefined }> };

export type Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables = Types.Exact<{
  timesheet_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Timesheet_OtherWorkingHoursListByTimesheetIdsQuery = { other_working_hours: Array<{ other_working_hours_id: string, timesheet_id: string, total_hour: number }> };

export type Timesheet_TimesheetConfigListByKeyQueryVariables = Types.Exact<{
  config_type?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Timesheet_TimesheetConfigListByKeyQuery = { timesheet_config: Array<{ timesheet_config_id: string, config_type: string, config_value: string }> };

export type Timesheet_TimesheetListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Timesheet_TimesheetListQuery = { timesheet: Array<{ staff_id: string, timesheet_date: any, timesheet_id: string, location_id: string, timesheet_status: string }>, timesheet_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Timesheet_TimesheetListV2QueryVariables = Types.Exact<{
  staff_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Timesheet_TimesheetListV2Query = { timesheet: Array<{ staff_id: string, timesheet_date: any, timesheet_id: string, location_id: string, timesheet_status: string }>, timesheet_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Timesheet_TimesheetAttrsFragment = { staff_id: string, timesheet_date: any, timesheet_id: string, location_id: string, timesheet_status: string, remark?: string | null | undefined };

export type Timesheet_TimesheetOneQueryVariables = Types.Exact<{
  timesheet_id: Types.Scalars['String'];
}>;


export type Timesheet_TimesheetOneQuery = { timesheet: Array<{ staff_id: string, timesheet_date: any, timesheet_id: string, location_id: string, timesheet_status: string, remark?: string | null | undefined }> };

export type Timesheet_TimesheetManyReferenceQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  staff_id: Types.Scalars['String'];
  from_date: Types.Scalars['timestamptz'];
  to_date: Types.Scalars['timestamptz'];
}>;


export type Timesheet_TimesheetManyReferenceQuery = { timesheet: Array<{ timesheet_date: any, timesheet_id: string }> };
