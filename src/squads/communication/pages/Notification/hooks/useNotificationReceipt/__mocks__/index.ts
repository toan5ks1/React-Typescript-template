import {
    createMockNotificationPagination,
    createMockNotificationParentNames,
    createMockNotificationReceipt,
    createMockNotificationStudentNames,
} from "src/squads/communication/test-utils/notification";

import { UseNotificationReceiptReturn } from "../useNotificationReceipt";

export default (): UseNotificationReceiptReturn => ({
    loading: false,
    notificationReceipt: createMockNotificationReceipt(),
    parentNames: createMockNotificationParentNames(),
    studentNames: createMockNotificationStudentNames(),
    pagination: createMockNotificationPagination(),
});
