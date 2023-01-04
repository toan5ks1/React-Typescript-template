import { KeyNotificationStatus } from "src/common/constants/const";
import { TestThemeProvider } from "src/squads/communication/test-utils";
import { NotificationStatusKeys } from "src/squads/communication/typings/remote";
import { getThemeWithMuiV5 } from "src/styles";

import ChipNotificationStatus, { ChipNotificationStatusProps } from "../ChipNotificationStatus";

import { render, RenderResult, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases = [
    {
        status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        background: muiTheme.palette.success.lightBackground,
        label: "Sent",
    },
    {
        status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        background: muiTheme.palette.error.lightBackground,
        label: "Draft",
    },
    {
        status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
        background: muiTheme.palette.warning.lightBackground,
        label: "Scheduled",
    },
    {
        status: "",
        background: "#F5F5F5", // the default background of chip
        label: "Test",
    },
];

describe("<ChipNotificationStatus /> component", () => {
    let wrapper: RenderResult;
    test.each(cases)(
        "it should render label %p and background color %p when status is %p",
        ({ status, background, label }) => {
            const props: ChipNotificationStatusProps = {
                status: status as NotificationStatusKeys,
                label: label,
            };

            wrapper = render(
                <TestThemeProvider>
                    <ChipNotificationStatus {...props} />
                </TestThemeProvider>
            );
            expect(wrapper.container).toMatchSnapshot();

            expect(screen.getByTestId("ChipNotificationStatus")).toHaveTextContent(label);

            expect(screen.getByTestId("ChipNotificationStatus")).toHaveStyle(
                `background: ${background}`
            );
        }
    );
});
