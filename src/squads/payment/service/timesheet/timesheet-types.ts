import * as Types from '../../__generated__/timesheet/root-types';

export type Timesheet_ImportTimesheetConfigsMutationVariables = Types.Exact<{
  data: Array<Types.Timesheet_Config_Insert_Input> | Types.Timesheet_Config_Insert_Input;
}>;


export type Timesheet_ImportTimesheetConfigsMutation = { insert_timesheet_config?: { affected_rows: number } | null | undefined };

export type Timesheet_CountTimesheetConfigByIdsQueryVariables = Types.Exact<{
  timesheetConfigIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type Timesheet_CountTimesheetConfigByIdsQuery = { timesheet_config_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };
