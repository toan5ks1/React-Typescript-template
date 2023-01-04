import {
    InvoiceStatus,
    ScheduledInvoiceStatus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { TestThemeProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";
import { InvoiceChipStatusKeys } from "src/squads/adobo/domains/invoice/typings/remote";
import { getThemeWithMuiV5 } from "src/styles";

import ChipInvoiceStatus from "src/squads/adobo/domains/invoice/pages/invoice-list/components/ChipInvoiceStatus";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

type TCases = {
    status: InvoiceChipStatusKeys;
    background?: string;
    label: string;
}[];

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases: TCases = [
    {
        status: InvoiceStatus.DRAFT,
        background: muiTheme.palette.grey?.[100],
        label: "DRAFT",
    },
    {
        status: InvoiceStatus.ISSUED,
        background: muiTheme.palette.warning.lightBackground,
        label: "ISSUED",
    },
    {
        status: InvoiceStatus.FAILED,
        background: muiTheme.palette.error.lightBackground,
        label: "FAILED",
    },
    {
        status: InvoiceStatus.REFUNDED,
        background: muiTheme.palette.success.lightBackground,
        label: "REFUNDED",
    },
    {
        status: InvoiceStatus.PAID,
        background: muiTheme.palette.success.lightBackground,
        label: "PAID",
    },
    {
        status: InvoiceStatus.VOID,
        background: muiTheme.palette.error.lightBackground,
        label: "resources.invoice.invoiceManagement.invoiceStatuses.VOID",
    },
    {
        status: ScheduledInvoiceStatus.INCOMPLETE,
        background: muiTheme.palette.grey?.[100],
        label: "INCOMPLETE",
    },
    {
        status: ScheduledInvoiceStatus.COMPLETED,
        background: muiTheme.palette.success.lightBackground,
        label: "COMPLETED",
    },
];

describe(ChipInvoiceStatus.name, () => {
    test.each(cases)(
        "it should render label %s and background color %s when status is %s",
        ({ label, background, status }) => {
            render(
                <TestThemeProvider>
                    <ChipInvoiceStatus status={status} label={label} />
                </TestThemeProvider>
            );

            const chipInvoiceStatus = screen.getByTestId("ChipInvoiceStatus__root");

            expect(chipInvoiceStatus).toHaveTextContent(label);

            expect(chipInvoiceStatus).toHaveStyle(`background: ${background}`);
        }
    );
});
