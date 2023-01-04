import {
    createMockNotificationInfoList,
    createMockNotificationPagination,
    createMockNotificationsComposerList,
    createMockReadCountOfNotifications,
    notificationMsgTitles,
} from "src/squads/communication/test-utils/notification";

import { UseNotificationListReturn } from "../useNotificationList";

export default (): UseNotificationListReturn => ({
    notificationInfoList: createMockNotificationInfoList(),
    composerList: createMockNotificationsComposerList(),
    readCountOfNotifications: createMockReadCountOfNotifications(),
    readCountOfNotificationsLoading: false,
    notificationListLoading: false,
    pagination: createMockNotificationPagination(),
    isFetchingComposerList: false,
    notificationMsgTitles: notificationMsgTitles,
    readCountOfNotificationsRefetch: jest.fn(),
    notificationListRefetch: jest.fn(),
    notificationMsgTitlesFetched: true,
    resetPaginationOffset: jest.fn(),
});
