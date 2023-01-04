import { createMockNotificationCategories } from "src/squads/communication/test-utils/notification";

import { UseNotificationCategoriesReturn } from "../useNotificationCategories";

export default (): UseNotificationCategoriesReturn => {
    return {
        notificationCategoriesRefetch: jest.fn(),
        notificationCategories: createMockNotificationCategories(),
        notificationCategoriesLoading: false,
    };
};
