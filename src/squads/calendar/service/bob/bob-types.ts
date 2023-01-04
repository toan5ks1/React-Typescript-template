import * as Types from '../../__generated__/bob/root-types';

export type Calendar_LocationTypesListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Calendar_LocationTypesListQuery = { location_types: Array<{ name: string, display_name?: string | null | undefined, location_type_id: string, parent_location_type_id?: string | null | undefined, parent_name?: string | null | undefined, is_archived: boolean }> };

export type Calendar_LocationsListByLocationTypesQueryVariables = Types.Exact<{
  location_type_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Calendar_LocationsListByLocationTypesQuery = { locations: Array<{ location_id: string, name: string, is_archived: boolean, locations?: { location_id: string, name: string } | null | undefined, location_types?: { location_type_id: string, display_name?: string | null | undefined, name: string } | null | undefined }> };
