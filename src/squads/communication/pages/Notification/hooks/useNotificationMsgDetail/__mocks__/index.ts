import {
    createMockNotificationMedia,
    createMockNotificationMsgDetail,
} from "src/squads/communication/test-utils/notification";

import { UseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail/useNotificationMsgDetail";

export const mockUseNotificationMsgDetailReturn: UseNotificationMsgDetailReturn = {
    isFetching: false,
    notificationMsgDetail: createMockNotificationMsgDetail(),
    mediaList: createMockNotificationMedia(),
};

export default (): UseNotificationMsgDetailReturn => mockUseNotificationMsgDetailReturn;
