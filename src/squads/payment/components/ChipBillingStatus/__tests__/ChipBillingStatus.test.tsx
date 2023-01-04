import { KeyBillingStatus } from "src/squads/payment/constants/const";
import { getThemeWithMuiV5 } from "src/styles";

import ChipBillingStatus from "../ChipBillingStatus";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases = [
    {
        status: KeyBillingStatus.BILLING_STATUS_PENDING,
        background: muiTheme.palette.warning.lightBackground,
        label: "Pending",
    },
    {
        status: KeyBillingStatus.BILLING_STATUS_BILLED,
        background: muiTheme.palette.success.lightBackground,
        label: "Billed",
    },
    {
        status: KeyBillingStatus.BILLING_STATUS_CANCELLED,
        background: muiTheme.palette.error.lightBackground,
        label: "Cancelled",
    },
    {
        status: KeyBillingStatus.BILLING_STATUS_WAITING_APPROVAL,
        background: muiTheme.palette.grey?.[100],
        label: "Waiting",
    },
    {
        status: KeyBillingStatus.BILLING_STATUS_INVOICED,
        background: muiTheme.palette.purple?.[50],
        label: "Invoiced",
    },
];

describe("<ChipBillingStatus /> component", () => {
    test.each(cases)(
        "it should render label %p and background color %p when status is %p",
        ({ status, background, label }) => {
            render(
                <TestApp>
                    <TestThemeProvider>
                        <ChipBillingStatus status={status} />
                    </TestThemeProvider>
                </TestApp>
            );

            const chipBillingStatus = screen.getByTestId("ChipBillingStatus__root");
            expect(chipBillingStatus).toBeInTheDocument();
            expect(chipBillingStatus).toHaveTextContent(label);
            expect(chipBillingStatus).toHaveStyle(`background: ${background}`);
        }
    );
});
