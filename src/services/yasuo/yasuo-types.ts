import * as Types from "../../__generated__/root-types";

export type InfoNotificationMsgsAttrsFragment = Pick<
    Types.Info_Notification_Msgs,
    "notification_msg_id" | "title" | "content" | "media_ids" | "created_at" | "updated_at"
>;

export type InfoNotificationMsgsOneQueryVariables = Types.Exact<{
    notification_msg_id: Types.Scalars["String"];
}>;

export type InfoNotificationMsgsOneQuery = {
    info_notification_msgs: Array<InfoNotificationMsgsAttrsFragment>;
};
