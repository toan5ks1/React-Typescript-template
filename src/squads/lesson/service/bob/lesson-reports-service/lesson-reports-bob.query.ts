import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    LessonReportByLessonIdQuery,
    LessonReportByLessonIdQueryVariables,
    Lesson_LessonReportListByLessonIdsQuery,
    Lesson_LessonReportListByLessonIdsQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

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

const getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query = gql`
    query PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2(
        $report_user_id: String!
        $report_course_id: String!
        $report_id: String
        $report_lesson_id: String
    ) {
        get_previous_report_of_student_v3(
            args: {
                report_course_id: $report_course_id
                report_user_id: $report_user_id
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

const lessonGetLessonReportListByLessonIds = gql`
    query Lesson_LessonReportListByLessonIds($lesson_ids: [String!] = []) {
        lesson_reports(where: { lesson_id: { _in: $lesson_ids } }) {
            report_submitting_status
            lesson_report_id
            lesson_id
        }
    }
`;

class LessonReportsBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: LessonReportByLessonIdQueryVariables
    ): Promise<ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]> | undefined> {
        const response = await this._call<LessonReportByLessonIdQuery>({
            query: getOneByLessonIdQuery,
            variables,
        });

        return response.data?.lesson_reports[0];
    }

    async lessonGetLessonReportListByLessonIds(
        variables: Lesson_LessonReportListByLessonIdsQueryVariables
    ): Promise<Lesson_LessonReportListByLessonIdsQuery["lesson_reports"] | undefined> {
        const response = await this._call<Lesson_LessonReportListByLessonIdsQuery>({
            query: lessonGetLessonReportListByLessonIds,
            variables,
        });

        return response.data?.lesson_reports;
    }

    async getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2(
        variables: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables
    ): Promise<
        | ArrayElement<
              PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query["get_previous_report_of_student_v3"]
          >
        | undefined
    > {
        const response =
            await this._call<PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query>(
                {
                    query: getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query,
                    variables,
                }
            );

        return response.data?.get_previous_report_of_student_v3[0];
    }
}

const lessonReportsQueriesBob = new LessonReportsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default lessonReportsQueriesBob;
