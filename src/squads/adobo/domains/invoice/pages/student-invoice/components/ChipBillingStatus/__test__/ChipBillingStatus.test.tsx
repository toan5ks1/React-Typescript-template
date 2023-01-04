import { CreateInvoiceBillingItemsStatus } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { TestThemeProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";
import { getThemeWithMuiV5 } from "src/styles";

import ChipBillingStatus from "../ChipBillingStatus";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases = [
    {
        status: CreateInvoiceBillingItemsStatus.BILLING_STATUS_PENDING,
        background: muiTheme.palette.warning.lightBackground,
        label: "resources.invoice.createInvoice.billingItems.BILLING_STATUS_PENDING",
    },
    {
        status: CreateInvoiceBillingItemsStatus.BILLING_STATUS_BILLED,
        background: muiTheme.palette.success.lightBackground,
        label: "resources.invoice.createInvoice.billingItems.BILLING_STATUS_BILLED",
    },
    {
        status: CreateInvoiceBillingItemsStatus.BILLING_STATUS_INVOICED,
        background: muiTheme.palette.purple?.[50],
        label: "resources.invoice.createInvoice.billingItems.BILLING_STATUS_INVOICED",
    },
];

describe("<ChipBillingStatus /> component", () => {
    test.each(cases)(
        "it should render label %p and background color %p when status is %p",
        ({ status, background, label }) => {
            render(
                <TestThemeProvider>
                    <ChipBillingStatus status={status} />
                </TestThemeProvider>
            );

            const chipBillingStatus = screen.getByTestId("ChipBillingStatus__root");
            expect(chipBillingStatus).toBeInTheDocument();
            expect(chipBillingStatus).toHaveTextContent(label);
            expect(chipBillingStatus).toHaveStyle(`background: ${background}`);
        }
    );
});
