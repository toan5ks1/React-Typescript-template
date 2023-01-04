import { getThemeWithMuiV5 } from "src/styles";

import ChipProductListStatus from "src/squads/payment/components/ChipProductListStatus/ChipProductListStatus";

import { StudentProductStatus } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const cases = [
    {
        status: StudentProductStatus.PENDING,
        background: muiTheme.palette.warning.lightBackground,
        label: "Pending",
    },
    {
        status: StudentProductStatus.ORDERED,
        background: muiTheme.palette.success.lightBackground,
        label: "Ordered",
    },
    {
        status: StudentProductStatus.CANCELLED,
        background: muiTheme.palette.error.lightBackground,
        label: "Cancelled",
    },
];

describe("", () => {
    test.each(cases)(
        "it should render label %p and background color %p when product list status is %p",
        ({ status, background, label }) => {
            const wrapper = render(
                <TestApp>
                    <TestThemeProvider>
                        <ChipProductListStatus status={status} />
                    </TestThemeProvider>
                </TestApp>
            );

            const chipProductListStatus = wrapper.getByTestId("ChipProductListStatus__root");
            expect(chipProductListStatus).toBeInTheDocument();
            expect(chipProductListStatus).toHaveTextContent(label);
            expect(chipProductListStatus).toHaveStyle(`background: ${background}`);
        }
    );
});
