import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_StaffListV2QueryVariables,
    User_StaffListV2Query,
    User_StaffOneQueryVariables,
    User_StaffOneQuery,
    User_StaffListV3QueryVariables,
    User_StaffListV3Query,
    User_StaffOneV2QueryVariables,
    User_StaffOneV2Query,
    User_StaffListV4Query,
    User_StaffListV4QueryVariables,
    User_StaffTimesheetConfigQuery,
    User_StaffTimesheetConfigQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { userFragment } from "src/squads/user/service/bob/fragments";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { getSearchString } from "src/squads/user/service/utils";

const getListQueryV2 = gql`
    query User_StaffListV2(
        $limit: Int = 10
        $offset: Int = 0
        $user_name: String
        $user_email: String
        $school_id: Int! = 0
    ) {
        find_teacher_by_school_id(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            args: { school_id: $school_id }
            where: { name: { _ilike: $user_name }, email: { _ilike: $user_email } }
        ) {
            name
            email
            user_id
            resource_path
        }
        find_teacher_by_school_id_aggregate(
            args: { school_id: $school_id }
            where: { name: { _ilike: $user_name }, email: { _ilike: $user_email } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

const getStaffListQuery = gql`
    query User_StaffListV3($limit: Int = 10, $offset: Int = 0, $user_name: String) {
        staff(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { user: { name: { _ilike: $user_name } } }
        ) {
            staff_id
            user {
                email
                name
                user_group_members {
                    user_group {
                        user_group_id
                        user_group_name
                    }
                }
            }
        }
        staff_aggregate(where: { user: { name: { _ilike: $user_name } } }) {
            aggregate {
                count
            }
        }
    }
`;

const getStaffListQueryV2 = gql`
    query User_StaffListV4($limit: Int = 10, $offset: Int = 0, $user_name: String) {
        staff(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { user: { name: { _ilike: $user_name } } }
        ) {
            staff_id
            user {
                email
                name
                resource_path
                user_group_members {
                    user_group {
                        user_group_id
                        user_group_name
                    }
                }
            }
        }
        staff_aggregate(where: { user: { name: { _ilike: $user_name } } }) {
            aggregate {
                count
            }
        }
    }
`;

const staffFragment = gql`
    fragment User_StaffAttrs on teachers {
        users {
            name
            email
            avatar
            phone_number
            user_group
            country
        }
        teacher_id
    }
`;

const getOneQuery = gql`
    query User_StaffOne($teacher_id: String!) {
        teachers(where: { teacher_id: { _eq: $teacher_id } }) {
            teacher_by_school_ids {
                school_id
            }
            ...User_StaffAttrs
        }
    }
    ${staffFragment}
`;

const getOneQueryV2 = gql`
    query User_StaffOneV2($staff_id: String!) {
        staff(where: { staff_id: { _eq: $staff_id } }) {
            staff_id
            user {
                user_group_members {
                    user_group {
                        user_group_id
                        user_group_name
                    }
                }
                ...UserAttrs
            }
        }
    }
    ${userFragment}
`;

const userGetTimesheetConfig = gql`
    query User_StaffTimesheetConfig($staff_id: String!) {
        staff(where: { staff_id: { _eq: $staff_id } }) {
            staff_id
            auto_create_timesheet
            updated_at
        }
    }
`;

export interface StaffListQueryReturn {
    data: User_StaffListV2Query["find_teacher_by_school_id"] | undefined;
    total: number | null | undefined;
}

export interface StaffListQueryReturnV2 {
    data: User_StaffListV3Query["staff"] | undefined;
    total: number | null | undefined;
}

export interface StaffListQueryReturnV3 {
    data: User_StaffListV4Query["staff"] | undefined;
    total: number | null | undefined;
}

class StaffQueryBob extends InheritedHasuraServiceClient {
    async getListWithFilterV2(
        variables: User_StaffListV2QueryVariables
    ): Promise<StaffListQueryReturn | undefined> {
        const { user_name, user_email, ...rest } = variables;

        const query = {
            query: getListQueryV2,
            variables: {
                ...rest,
                user_name: getSearchString(user_name),
            },
        };

        const res = await this._call<User_StaffListV2Query>(query);

        return {
            data: res.data?.find_teacher_by_school_id,
            total: res.data?.find_teacher_by_school_id_aggregate.aggregate?.count,
        };
    }

    async getListWithFilterV3(
        variables: User_StaffListV3QueryVariables
    ): Promise<StaffListQueryReturnV2 | undefined> {
        const { user_name, ...rest } = variables;

        const query = {
            query: getStaffListQuery,
            variables: {
                ...rest,
                user_name: getSearchString(user_name),
            },
        };

        const res = await this._call<User_StaffListV3Query>(query);

        return {
            data: res.data?.staff,
            total: res.data?.staff_aggregate.aggregate?.count,
        };
    }

    async getListWithFilterV4(
        variables: User_StaffListV4QueryVariables
    ): Promise<StaffListQueryReturnV3 | undefined> {
        const { user_name, ...rest } = variables;

        const query = {
            query: getStaffListQueryV2,
            variables: {
                ...rest,
                user_name: getSearchString(user_name),
            },
        };

        const res = await this._call<User_StaffListV4Query>(query);

        return {
            data: res.data?.staff,
            total: res.data?.staff_aggregate.aggregate?.count,
        };
    }

    async getOne(
        variables: Partial<User_StaffOneQueryVariables>
    ): Promise<ArrayElement<User_StaffOneQuery["teachers"]> | undefined> {
        const { teacher_id } = variables;
        const query = {
            query: getOneQuery,
            variables: {
                teacher_id,
            },
        };
        const res = await this._call<User_StaffOneQuery>(query);

        return res.data?.teachers[0];
    }

    async userGetOneStaff(
        variables: Partial<User_StaffOneV2QueryVariables>
    ): Promise<ArrayElement<User_StaffOneV2Query["staff"]> | undefined> {
        const { staff_id } = variables;
        const query = {
            query: getOneQueryV2,
            variables: {
                staff_id,
            },
        };

        const res = await this._call<User_StaffOneV2Query>(query);
        return res.data?.staff[0];
    }

    async userGetTimesheetConfig(
        variables: Partial<User_StaffTimesheetConfigQueryVariables>
    ): Promise<ArrayElement<User_StaffTimesheetConfigQuery["staff"]> | undefined> {
        const { staff_id } = variables;
        const query = {
            query: userGetTimesheetConfig,
            variables: {
                staff_id,
            },
        };

        const res = await this._call<User_StaffTimesheetConfigQuery>(query);
        return res.data?.staff[0];
    }
}

const staffQueriesBob = new StaffQueryBob(appConfigs, "bobGraphQL", doQuery);

export default staffQueriesBob;
