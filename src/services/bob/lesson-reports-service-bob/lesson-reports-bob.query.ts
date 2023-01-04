import { gql } from "graphql-tag";

import {
    LessonReportByLessonIdQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getOneByLessonIdQuery = gql`
    query LessonReportByLessonId($lesson_id: String!) {
        lesson_reports(where: { lesson_id: { _eq: $lesson_id } }) {
            lesson_id
            lesson_report_id
            report_submitting_status
            partner_form_config {
                form_config_id
                feature_name
                form_config_data
            }
            lesson_report_details {
                lesson_report_detail_id
                student {
                    student_id
                }
                partner_dynamic_form_field_values {
                    dynamic_form_field_value_id
                    value_type
                    int_value
                    int_set_value
                    int_array_value
                    string_value
                    string_set_value
                    string_array_value
                    bool_value
                    field_render_guide
                    field_id
                }
            }
        }
    }
`;

const getOneByCourseIdAndStudentIdAndReportIdAndLessonIdQuery = gql`
    query PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonId(
        $user_id: String!
        $report_course_id: String!
        $report_id: String
        $report_lesson_id: String
    ) {
        get_previous_report_of_student_v2(
            args: {
                report_course_id: $report_course_id
                user_id: $user_id
                report_id: $report_id
                report_lesson_id: $report_lesson_id
            }
        ) {
            form_config_id
            lesson_report_id
            lesson_id
        }
    }
`;

class LessonReportsBobQuery {
    getOne(
        variables: LessonReportByLessonIdQueryVariables
    ): GraphqlBody<LessonReportByLessonIdQueryVariables> {
        return {
            query: getOneByLessonIdQuery,
            variables,
        };
    }

    getOneByCourseIdAndStudentIdAndReportIdAndLessonId(
        variables: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdQueryVariables
    ): GraphqlBody<PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdQueryVariables> {
        return {
            query: getOneByCourseIdAndStudentIdAndReportIdAndLessonIdQuery,
            variables,
        };
    }
}

const LessonReportsQueriesBob = new LessonReportsBobQuery();

export default LessonReportsQueriesBob;
