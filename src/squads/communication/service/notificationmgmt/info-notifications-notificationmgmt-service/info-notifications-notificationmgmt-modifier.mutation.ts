import { convertToRaw, EditorState } from "draft-js";
import { arrayHasItem } from "src/common/utils/other";
import { toTimestampOriginDate } from "src/common/utils/timezone";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import {
    NotifyUnreadUser,
    SendNotification,
    DiscardNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import { InheritedGrpcServiceClient } from "src/squads/communication/service/service-types";
import { UserGroupKeys } from "src/squads/communication/typings/remote";

import { RichText } from "manabuf/common/v1/contents_pb";
import {
    Notification,
    NotificationEvent,
    NotificationMessage,
    NotificationStatus,
    NotificationTargetGroup,
    NotificationTargetGroupSelect,
    NotificationType,
    Question,
    Questionnaire,
} from "manabuf/common/v1/notifications_pb";
import { UserGroup } from "manabuf/common/v1/profiles_pb";
import { NotificationModifierServicePromiseClient } from "manabuf/notificationmgmt/v1/notifications_grpc_web_pb";
import {
    DiscardNotificationRequest,
    DiscardNotificationResponse,
    NotifyUnreadUserRequest,
    NotifyUnreadUserResponse,
    SendNotificationRequest,
    SendNotificationResponse,
    UpsertNotificationRequest,
    UpsertNotificationResponse,
} from "manabuf/notificationmgmt/v1/notifications_pb";

import { MutationParams } from "@manabie-com/react-utils";

function toRichTextManabuf(editorState: EditorState, innerHTML: string): RichText {
    const richText = new RichText();

    richText.setRaw(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    richText.setRendered(innerHTML);

    return richText;
}

function validateNotification(data?: NotifyUnreadUser | SendNotification | DiscardNotification) {
    if (!data || !data.notificationId) {
        throw formInvalidErr;
    }
}

function validateUpsertNotification(data?: UpsertNotificationProps) {
    if (
        !data ||
        !data.type ||
        !data.title ||
        !data.event ||
        !data.status ||
        !data.content ||
        !data.content.raw ||
        !data.targetGroup.length ||
        !data.content.contentHTML
    ) {
        throw formInvalidErr;
    }
}

function getQuestionnaireUpsertRequest(questionnaire: UpsertNotificationProps["questionnaire"]) {
    if (!questionnaire) return;

    const questionnaireReq = new Questionnaire();

    const questionList = questionnaire.questionsList.reduce<Question[]>(
        (questionList, currentQuestion) => {
            const question = new Question();

            question.setTitle(currentQuestion.title);
            question.setQuestionnaireQuestionId(currentQuestion.questionnaireQuestionId);
            question.setType(currentQuestion.type);
            question.setChoicesList(currentQuestion.choicesList);
            question.setOrderIndex(currentQuestion.orderIndex);
            question.setRequired(currentQuestion.required);

            questionList.push(question);

            return questionList;
        },
        []
    );

    questionnaireReq.setQuestionnaireId(questionnaire.questionnaireId);
    questionnaireReq.setResubmitAllowed(questionnaire.resubmitAllowed);
    questionnaireReq.setExpirationDate(toTimestampOriginDate(questionnaire.expirationDate));
    questionnaireReq.setQuestionsList(questionList);

    return questionnaireReq;
}

export function resendNotificationRequest(data: NotifyUnreadUser): NotifyUnreadUserRequest {
    const req = new NotifyUnreadUserRequest();
    req.setNotificationId(data.notificationId);
    return req;
}

export function sendNotificationRequest(data: SendNotification): SendNotificationRequest {
    const req = new SendNotificationRequest();
    req.setNotificationId(data.notificationId);
    return req;
}

export function discardNotificationRequest(data: DiscardNotification): DiscardNotificationRequest {
    const req = new DiscardNotificationRequest();
    req.setNotificationId(data.notificationId);
    return req;
}

export function upsertNotificationRequest(
    data: UpsertNotificationProps,
    mediasIds: string[]
): UpsertNotificationRequest {
    const notificationReq = new Notification();

    if (data.notificationId) notificationReq.setNotificationId(data.notificationId);

    const notificationMessageReq = new NotificationMessage();

    const richTextReq = toRichTextManabuf(data.content.raw, data.content.contentHTML);

    notificationMessageReq.setContent(richTextReq);

    if (arrayHasItem(mediasIds)) {
        notificationMessageReq.setMediaIdsList(mediasIds);
    } else if (arrayHasItem(data.mediaIds)) {
        notificationMessageReq.setMediaIdsList(data.mediaIds!);
    }
    notificationMessageReq.setTitle(data.title);

    notificationReq.setMessage(notificationMessageReq);
    notificationReq.setEditorId(data.editorId!);
    notificationReq.setType(NotificationType[data.type]);
    notificationReq.setEvent(NotificationEvent[data.event]);
    notificationReq.setStatus(NotificationStatus[data.status]);
    notificationReq.setData(data.data ?? "{}");
    notificationReq.setReceiverIdsList(data.receiverIdsList);
    notificationReq.setIsImportant(data.isImportant);

    const targetGroupReq = new NotificationTargetGroup();
    const course = new NotificationTargetGroup.CourseFilter();
    const grade = new NotificationTargetGroup.GradeFilter();
    const userGroup = new NotificationTargetGroup.UserGroupFilter();

    let courseType: NotificationTargetGroupSelect =
        NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL;

    if (!data.isAllCourses) {
        course.setCourseIdsList(data.courseIds);
        courseType = arrayHasItem(data.courseIds)
            ? NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST
            : NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_NONE;
    }
    course.setType(courseType);

    let gradeType: NotificationTargetGroupSelect =
        NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL;

    if (!data.isAllGrades) {
        grade.setGradesList(data.gradeIds);
        gradeType = arrayHasItem(data.gradeIds)
            ? NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST
            : NotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_NONE;
    }
    grade.setType(gradeType);

    userGroup.setUserGroupsList(
        data.targetGroup.map((e: string) => UserGroup[e as UserGroupKeys]) as UserGroup[]
    );

    targetGroupReq.setCourseFilter(course);
    targetGroupReq.setGradeFilter(grade);
    targetGroupReq.setUserGroupFilter(userGroup);

    notificationReq.setTargetGroup(targetGroupReq);

    if (data.scheduledAt) notificationReq.setScheduledAt(toTimestampOriginDate(data.scheduledAt));

    const questionnaireReq = getQuestionnaireUpsertRequest(data.questionnaire);

    const req = new UpsertNotificationRequest();
    req.setNotification(notificationReq);
    req.setQuestionnaire(questionnaireReq);

    if (data.tagIdsList) req.setTagIdsList(data.tagIdsList);

    return req;
}

class InfoNotificationsNotificationMgmtModifierMutationService extends InheritedGrpcServiceClient<NotificationModifierServicePromiseClient> {
    async resendNotification({
        data,
    }: MutationParams<NotifyUnreadUser>): Promise<NotifyUnreadUserResponse.AsObject> {
        validateNotification(data);
        const req = resendNotificationRequest(data!);

        const resp = await this._call("notifyUnreadUser", req);

        return {
            ...resp.toObject,
            notificationId: data?.notificationId,
        };
    }

    async sendNotification({
        data,
    }: MutationParams<SendNotification>): Promise<SendNotificationResponse.AsObject> {
        validateNotification(data);

        const req = sendNotificationRequest(data!);

        const resp = await this._call("sendNotification", req);
        return {
            ...resp.toObject,
            notificationId: data?.notificationId,
        };
    }

    async discardNotification({
        data,
    }: MutationParams<DiscardNotification>): Promise<DiscardNotificationResponse.AsObject> {
        validateNotification(data);
        const req = discardNotificationRequest(data!);

        await this._call("discardNotification", req);

        return {
            notificationId: data?.notificationId,
        };
    }

    async upsertNotification({
        data,
    }: MutationParams<UpsertNotificationProps>): Promise<UpsertNotificationResponse.AsObject> {
        validateUpsertNotification(data);

        const req = upsertNotificationRequest(data!, data?.mediaIds || []);

        const resp = await this._call("upsertNotification", req);

        return {
            notificationId: resp?.getNotificationId(),
        };
    }
}

const infoNotificationsNotificationMgmtModifierMutationService =
    new InfoNotificationsNotificationMgmtModifierMutationService(
        NotificationModifierServicePromiseClient,
        appConfigs,
        commonGrpcOptions
    );

export default infoNotificationsNotificationMgmtModifierMutationService;
