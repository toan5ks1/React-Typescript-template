import {
    createMockNotificationInfo,
    createMockNotificationMsgDetail,
} from "src/squads/communication/test-utils/notification";

import HeaderNotification from "src/squads/communication/pages/Notification/components/HeaderNotification/HeaderNotification";

import { render } from "@testing-library/react";

describe("<HeaderNotification />", () => {
    it("should render snapshot and correct title", () => {
        const wrapper = render(
            <HeaderNotification
                notificationInfo={createMockNotificationInfo()!}
                notificationMsgDetail={createMockNotificationMsgDetail()!}
            />
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
