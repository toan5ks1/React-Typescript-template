import { createMockNotificationFormData } from "src/squads/communication/test-utils/notification";

import { UseNotificationFormDataReturn } from "../useNotificationFormData";

const status: UseNotificationFormDataReturn["status"] = "NOTIFICATION_STATUS_SENT";

export default (): UseNotificationFormDataReturn => ({
    formData: createMockNotificationFormData(),
    status,
});
