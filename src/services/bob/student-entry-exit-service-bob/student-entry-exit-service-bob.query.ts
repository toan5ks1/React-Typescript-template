import { gql } from "graphql-tag";

import {
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    StudentQrCodeByStudentIdsQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getManyQuery = gql`
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

class StudentEntryExitBobQuery {
    getMany(
        variables: StudentQrCodeByStudentIdsQueryVariables
    ): GraphqlBody<StudentQrCodeByStudentIdsQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getList(
        variables: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables
    ): GraphqlBody<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables> {
        return {
            query: getListQuery,
            variables,
        };
    }
}

const studentEntryExitQueriesBob = new StudentEntryExitBobQuery();

export default studentEntryExitQueriesBob;
