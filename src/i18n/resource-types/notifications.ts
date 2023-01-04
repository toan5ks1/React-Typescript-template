declare module NsNotification {
    export interface NotificationStatus {
        NOTIFICATION_STATUS_NONE: string;
        NOTIFICATION_STATUS_DRAFT: string;
        NOTIFICATION_STATUS_SCHEDULED: string;
        NOTIFICATION_STATUS_SENT: string;
        NOTIFICATION_STATUS_DISCARD: string;
    }

    export interface Placeholder {
        selectCourse: string;
        selectCourses: string;
        selectGrade: string;
        selectIndividualRecipient: string;
        notificationTitle: string;
        selectContent: string;
        selectTime: string;
    }

    export interface Label {
        name: string;
        recipientGroup: string;
        individualRecipient: string;
        grades: string;
        courses: string;
        userType: string;
        to: string;
        title: string;
        content: string;
        attachment: string;
        recipient: string;
        audience: string;
        composer: string;
        lastUpdated: string;
        sentDate: string;
        status: string;
        parent: string;
        student: string;
        parentOfStudent: string;
        all: string;
        allCourses: string;
        allGrades: string;
        read: string;
        unRead: string;
        target: string;
        deliveryDate: string;
        now: string;
        schedule: string;
        uploadYourFile: string;
        placeholder: Placeholder;
    }

    export interface Title {
        generalInfo: string;
        composeMessage: string;
        editMessage: string;
        notification: string;
        notificationCenter: string;
    }

    export interface Button {
        notifyUnread: string;
        compose: string;
        clone: string;
        addInlineLink: string;
    }

    export interface UserNotificationStatus {
        USER_NOTIFICATION_STATUS_NEW: string;
        USER_NOTIFICATION_STATUS_SEEN: string;
        USER_NOTIFICATION_STATUS_NONE: string;
        USER_NOTIFICATION_STATUS_READ: string;
        USER_NOTIFICATION_STATUS_FAILED: string;
    }

    export interface TargetGroupSelect {
        NOTIFICATION_TARGET_GROUP_SELECT_NONE: string;
        NOTIFICATION_TARGET_GROUP_SELECT_ALL: string;
    }

    export interface RootObject {
        name: string;
        notificationStatus: NotificationStatus;
        label: Label;
        title: Title;
        button: Button;
        userNotificationStatus: UserNotificationStatus;
        targetGroupSelect: TargetGroupSelect;
    }
}

export interface Notifications extends NsNotification.RootObject {}
