import {
    notificationListFilterHookData,
    NotificationTableV2ContainerTest,
} from "./NotificationTableV2.test";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<NotificationTableV2 call onClickNotificationRowTitle", () => {
    it("should call onOpenCompose when click notification row title status Schedule & Draft", () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({ isEnabled: true });

        render(<NotificationTableV2ContainerTest {...notificationListFilterHookData} />);
        userEvent.click(screen.getAllByTestId("NotificationTableV2__title")[2]); // status Schedule

        // TODO: @communication refactor this test when create NotificationDialogWithDataV2
    });
});
