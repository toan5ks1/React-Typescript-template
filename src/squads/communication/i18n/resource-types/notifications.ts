declare module NsNotification {
    export interface NotificationStatus {
        ALL_STATUS: string;
        NOTIFICATION_STATUS_NONE: string;
        NOTIFICATION_STATUS_DRAFT: string;
        NOTIFICATION_STATUS_SCHEDULED: string;
        NOTIFICATION_STATUS_SENT: string;
        NOTIFICATION_STATUS_DISCARD: string;
    }

    export interface QuestionnaireStatus {
        USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED: string;
        USER_NOTIFICATION_QUESTIONNAIRE_STATUS_UNANSWERED: string;
    }

    export interface Placeholder {
        selectCourse: string;
        selectCourses: string;
        selectGrade: string;
        selectIndividualRecipient: string;
        notificationTitle: string;
        selectContent: string;
        selectTime: string;
        question: string;
        answer: string;
        tags: string;
        searchByNotificationTitles: string;
    }

    export interface Label {
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
        recipientName: string;
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
        deliveryOption: string;
        now: string;
        schedule: string;
        uploadYourFile: string;
        question: string;
        notificationDate: string;
        placeholder: Placeholder;
        questionnaire: string;
        allowResubmission: string;
        questionType: string;
        requiredQuestion: string;
        expirationDate: string;
        expirationTime: string;
        importantNotification: string;
        timeStamp: string;
        responderName: string;
        listQuestion: string;
        tags: string;
        filters: string;
        tag: string;
        votes: string;
        numberOfRespondents: string;
    }

    export interface Message {
        reloadPage: string;
    }

    export interface Title {
        generalInfo: string;
        composeMessage: string;
        editMessage: string;
        notification: string;
        notificationCenter: string;
        questionnaireResult: string;
        addTag: string;
    }

    export interface Button {
        notifyUnread: string;
        compose: string;
        clone: string;
        addInlineLink: string;
        addQuestion: string;
        addAnswer: string;
        viewLess: string;
        viewMore: string;
        clearAll: string;
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

    export interface QuestionType {
        QUESTION_TYPE_MULTIPLE_CHOICE: string;
        QUESTION_TYPE_FREE_TEXT: string;
        QUESTION_TYPE_CHECK_BOX: string;
    }

    export interface ChoicesType {
        questionType: QuestionType;
    }

    export interface FiltersType {
        fromDate: string;
        toDate: string;
        fromTime: string;
        toTime: string;
        tags: string;
    }

    export interface RootObject {
        name: string;
        notificationStatus: NotificationStatus;
        questionnaireStatus: QuestionnaireStatus;
        label: Label;
        message: Message;
        title: Title;
        button: Button;
        userNotificationStatus: UserNotificationStatus;
        targetGroupSelect: TargetGroupSelect;
        image: string;
        heading: string;
        orderList: string;
        ul: string;
        bold: string;
        color: string;
        italic: string;
        insertLink: string;
        underline: string;
        choices: ChoicesType;
        filters: FiltersType;
    }
}

export interface Notifications extends NsNotification.RootObject {}
