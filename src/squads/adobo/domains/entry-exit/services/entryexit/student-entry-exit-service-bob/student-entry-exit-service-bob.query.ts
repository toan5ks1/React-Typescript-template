import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/entry-exit/internals/hasura-client/execute-query";
import {
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery,
    EntryExit_StudentQrCodeByStudentIdsV2Query,
    EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2Query,
} from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service-bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/entry-exit/services/service-types";

const getManyQueryV2 = gql`
    query EntryExit_StudentQrCodeByStudentIdsV2($student_ids: [String!] = []) {
        student_qr(where: { student_id: { _in: $student_ids } }) {
            qr_url
            qr_id
            student_id
            version
        }
    }
`;

gql`
    query StudentQRCodeByStudentIds($student_ids: [String!] = []) {
        student_qr(where: { student_id: { _in: $student_ids } }) {
            qr_url
            qr_id
            student_id
        }
    }
`;

const getListQuery = gql`
    query EntryExit_StudentEntryExitRecordsWithAggregateByStudentId(
        $student_id: String!
        $limit: Int = 10
        $offset: Int = 0
    ) {
        student_entryexit_records(
            where: { student_id: { _eq: $student_id } }
            limit: $limit
            offset: $offset
            order_by: { entry_at: desc }
        ) {
            entry_at
            entryexit_id
            exit_at
            student_id
        }
        student_entryexit_records_aggregate(where: { student_id: { _eq: $student_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const getListQueryV2 = gql`
    query EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2(
        $student_id: String!
        $limit: Int = 10
        $offset: Int = 0
        $start_date: timestamptz
        $end_date: timestamptz
    ) {
        student_entryexit_records(
            where: {
                student_id: { _eq: $student_id }
                entry_at: { _gte: $start_date, _lte: $end_date }
            }
            limit: $limit
            offset: $offset
            order_by: { entry_at: desc }
        ) {
            entry_at
            entryexit_id
            exit_at
            student_id
        }
        student_entryexit_records_aggregate(
            where: {
                student_id: { _eq: $student_id }
                entry_at: { _gte: $start_date, _lte: $end_date }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class StudentEntryExitBobQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: EntryExit_StudentQrCodeByStudentIdsV2QueryVariables
    ): Promise<EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"] | undefined> {
        const response = await this._call<EntryExit_StudentQrCodeByStudentIdsV2Query>({
            query: getManyQueryV2,
            variables,
        });

        return response.data?.student_qr;
    }

    async getList(
        variables: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables
    ): Promise<
        | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
        | undefined
    > {
        const query = {
            query: getListQuery,
            variables,
        };

        const resp =
            await this._call<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery>(query);

        return resp.data?.student_entryexit_records;
    }

    async entryExitGetManyStudentRecordsByDate(
        variables: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables
    ): Promise<
        | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2Query["student_entryexit_records"]
        | undefined
    > {
        const query = {
            query: getListQueryV2,
            variables,
        };

        const resp =
            await this._call<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2Query>(
                query
            );

        return resp.data?.student_entryexit_records;
    }
}

const studentEntryExitQueriesBob = new StudentEntryExitBobQuery(appConfigs, "bobGraphQL", doQuery);

export default studentEntryExitQueriesBob;
