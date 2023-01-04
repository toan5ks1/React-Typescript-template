import { getThemeWithMuiV5 } from "src/styles";

import { OrderStatus } from "manabuf/payment/v1/enums_pb";

import ChipOrderStatus from "../ChipOrderStatus";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases = [
    {
        status: OrderStatus.ORDER_STATUS_PENDING,
        background: muiTheme.palette.warning.lightBackground,
        label: "Pending",
    },
    {
        status: OrderStatus.ORDER_STATUS_SUBMITTED,
        background: muiTheme.palette.success.lightBackground,
        label: "Submitted",
    },
    {
        status: OrderStatus.ORDER_STATUS_REJECTED,
        background: muiTheme.palette.error.lightBackground,
        label: "Rejected",
    },
    {
        status: OrderStatus.ORDER_STATUS_VOIDED,
        background: muiTheme.palette.error.lightBackground,
        label: "Voided",
    },
    {
        status: OrderStatus.ORDER_STATUS_INVOICED,
        background: muiTheme.palette.purple?.[50],
        label: "Invoiced",
    },
];

describe("<ChipOrderStatus /> component", () => {
    test.each(cases)(
        "it should render label %p and background color %p when status is %p",
        ({ status, background, label }) => {
            render(
                <TestApp>
                    <TestThemeProvider>
                        <ChipOrderStatus status={status} />
                    </TestThemeProvider>
                </TestApp>
            );

            const chipOrderStatus = screen.getByTestId("ChipOrderStatus__root");
            expect(chipOrderStatus).toBeInTheDocument();
            expect(chipOrderStatus).toHaveTextContent(label);
            expect(chipOrderStatus).toHaveStyle(`background: ${background}`);
        }
    );
});
