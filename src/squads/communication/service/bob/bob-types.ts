import * as Types from '../../__generated__/bob/root-types';

export type CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined };

export type CoursesManyQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type CoursesManyQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }> };

export type CoursesManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CoursesManyReferenceQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type InfoNotificationMsgsAttrsFragment = { notification_msg_id: string, title: string, content?: any | null | undefined, media_ids?: any | null | undefined, created_at: any, updated_at: any };

export type InfoNotificationMsgsOneQueryVariables = Types.Exact<{
  notification_msg_id: Types.Scalars['String'];
}>;


export type InfoNotificationMsgsOneQuery = { info_notification_msgs: Array<{ notification_msg_id: string, title: string, content?: any | null | undefined, media_ids?: any | null | undefined, created_at: any, updated_at: any }> };

export type InfoNotificationMsgsTitlesQueryVariables = Types.Exact<{
  notification_msg_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type InfoNotificationMsgsTitlesQuery = { info_notification_msgs: Array<{ notification_msg_id: string, title: string }> };

export type InfoNotificationsAttrsFragment = { notification_id: string, notification_msg_id?: string | null | undefined, sent_at?: any | null | undefined, receiver_ids?: any | null | undefined, status?: string | null | undefined, type: string, target_groups?: any | null | undefined, updated_at: any, created_at: any, editor_id?: string | null | undefined, event?: string | null | undefined, scheduled_at?: any | null | undefined };

export type InfoNotificationsWithQuestionnaireAttrsFragment = { notification_id: string, notification_msg_id?: string | null | undefined, sent_at?: any | null | undefined, receiver_ids?: any | null | undefined, status?: string | null | undefined, type: string, target_groups?: any | null | undefined, updated_at: any, created_at: any, editor_id?: string | null | undefined, event?: string | null | undefined, scheduled_at?: any | null | undefined, is_important?: boolean | null | undefined, questionnaire_id?: string | null | undefined };

export type Communication_GetListInfoNotificationsQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Communication_GetListInfoNotificationsQuery = { info_notifications: Array<{ notification_id: string, notification_msg_id?: string | null | undefined, sent_at?: any | null | undefined, receiver_ids?: any | null | undefined, status?: string | null | undefined, type: string, target_groups?: any | null | undefined, updated_at: any, created_at: any, editor_id?: string | null | undefined, event?: string | null | undefined, scheduled_at?: any | null | undefined }> };

export type InfoNotificationsCountReadQueryVariables = Types.Exact<{
  notification_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type InfoNotificationsCountReadQuery = { info_notifications: Array<{ notification_id: string, all_receiver_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined }, read_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } }> };

export type Communication_GetInfoNotificationByNotificationIdQueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
}>;


export type Communication_GetInfoNotificationByNotificationIdQuery = { info_notifications: Array<{ notification_id: string, notification_msg_id?: string | null | undefined, sent_at?: any | null | undefined, receiver_ids?: any | null | undefined, status?: string | null | undefined, type: string, target_groups?: any | null | undefined, updated_at: any, created_at: any, editor_id?: string | null | undefined, event?: string | null | undefined, scheduled_at?: any | null | undefined }> };

export type Communication_GetInfoNotificationByNotificationIdV2QueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
}>;


export type Communication_GetInfoNotificationByNotificationIdV2Query = { info_notifications: Array<{ notification_id: string, notification_msg_id?: string | null | undefined, sent_at?: any | null | undefined, receiver_ids?: any | null | undefined, status?: string | null | undefined, type: string, target_groups?: any | null | undefined, updated_at: any, created_at: any, editor_id?: string | null | undefined, event?: string | null | undefined, scheduled_at?: any | null | undefined, is_important?: boolean | null | undefined, questionnaire_id?: string | null | undefined }> };

export type InfoNotificationsGetStatusByIdQueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
}>;


export type InfoNotificationsGetStatusByIdQuery = { info_notifications: Array<{ status?: string | null | undefined }> };

export type InfoNotificationCountsByStatusV2QueryVariables = Types.Exact<{ [key: string]: never; }>;


export type InfoNotificationCountsByStatusV2Query = { draft: { aggregate?: { count?: number | null | undefined } | null | undefined }, sent: { aggregate?: { count?: number | null | undefined } | null | undefined }, schedule: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type MediaAttrsFragment = { media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined };

export type MediasManyQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type MediasManyQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, conversion_tasks: Array<{ status: string }> }> };

export type QuestionnaireQuestionsAttrsFragment = { questionnaire_question_id: string, questionnaire_id: string, order_index: number, type: string, title: string, choices?: any | null | undefined, is_required: boolean, created_at: any, updated_at: any };

export type Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables = Types.Exact<{
  questionnaire_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery = { questionnaire_questions: Array<{ questionnaire_question_id: string, questionnaire_id: string, order_index: number, type: string, title: string, choices?: any | null | undefined, is_required: boolean, created_at: any, updated_at: any }> };

export type Communication_GetUserAnswersByQuestionIdsQueryVariables = Types.Exact<{
  questionIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Communication_GetUserAnswersByQuestionIdsQuery = { questionnaire_user_answers: Array<{ answer?: string | null | undefined, questionnaire_question_id: string, submitted_at: any, target_id: string, user_id: string, user_notification_id: string }> };

export type QuestionnaireAttrsFragment = { questionnaire_id: string, resubmit_allowed: boolean, expiration_date: any, created_at: any, updated_at: any };

export type Communication_GetQuestionnaireByQuestionnaireIdQueryVariables = Types.Exact<{
  questionnaire_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Communication_GetQuestionnaireByQuestionnaireIdQuery = { questionnaires: Array<{ questionnaire_id: string, resubmit_allowed: boolean, expiration_date: any, created_at: any, updated_at: any }> };

export type TagAttrsFragment = { tag_id: string, tag_name: string, created_at: any, updated_at: any };

export type Communication_GetTagsManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Communication_GetTagsManyReferenceQuery = { tags: Array<{ tag_id: string, tag_name: string, created_at: any, updated_at: any }>, tags_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Communication_GetListTagNameByTagIdsQueryVariables = Types.Exact<{
  tag_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Communication_GetListTagNameByTagIdsQuery = { tags: Array<{ name: string }> };

export type Communication_GetTagsSelectedByNotificationIdQueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
}>;


export type Communication_GetTagsSelectedByNotificationIdQuery = { tags: Array<{ tag_id: string, tag_name: string, created_at: any, updated_at: any }> };

export type Communication_GetListTagsByTagIdsQueryVariables = Types.Exact<{
  tag_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Communication_GetListTagsByTagIdsQuery = { tags: Array<{ tag_id: string, tag_name: string, created_at: any, updated_at: any }> };

export type UsersInfoNotificationsAttrsFragment = { user_id: string, user_notification_id: string, notification_id: string, current_grade?: number | null | undefined, course_ids?: any | null | undefined, status: string, user_group?: string | null | undefined };

export type UsersInfoNotificationsWithQnStatusAttrsFragment = { user_id: string, user_notification_id: string, notification_id: string, current_grade?: number | null | undefined, course_ids?: any | null | undefined, status: string, user_group?: string | null | undefined, qn_status?: string | null | undefined };

export type UsersInfoNotificationsListQueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UsersInfoNotificationsListQuery = { users_info_notifications: Array<{ student_id?: string | null | undefined, parent_id?: string | null | undefined, user_id: string, user_notification_id: string, notification_id: string, current_grade?: number | null | undefined, course_ids?: any | null | undefined, status: string, user_group?: string | null | undefined }>, users_info_notifications_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Communication_UsersInfoNotificationsListQueryVariables = Types.Exact<{
  notification_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Communication_UsersInfoNotificationsListQuery = { users_info_notifications: Array<{ student_id?: string | null | undefined, parent_id?: string | null | undefined, user_id: string, user_notification_id: string, notification_id: string, current_grade?: number | null | undefined, course_ids?: any | null | undefined, status: string, user_group?: string | null | undefined, qn_status?: string | null | undefined }>, users_info_notifications_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type UserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string };

export type StudentUserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined };

export type UserNameByIdsQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type UserNameByIdsQuery = { users: Array<{ user_id: string, name: string }> };

export type StudentsManyQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentsManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type StudentsManyReferenceQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type StudentsManyReferenceQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };
