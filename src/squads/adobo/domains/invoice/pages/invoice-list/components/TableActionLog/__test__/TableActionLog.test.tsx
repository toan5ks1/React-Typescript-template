import { getUserByUserId } from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import { getMockInvoiceActionLogData } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoice-action-log";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestThemeProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import TableActionLog from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TableActionLog";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";

const mockActionLogs = getMockInvoiceActionLogData();
const mockUser = getUsersMock();

jest.mock("src/squads/adobo/domains/invoice/hooks/useGetUserName", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <TestThemeProvider>
                    <MuiPickersUtilsProvider>
                        <TableActionLog actionLogs={mockActionLogs} />
                    </MuiPickersUtilsProvider>
                </TestThemeProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

describe("<TableActionLog />", () => {
    beforeEach(() => {
        (useGetUserName as jest.Mock).mockImplementation(() => ({
            data: mockUser,
            isFetching: false,
        }));
        renderComponent();
    });

    it("should contain content", () => {
        expect(screen.getByTestId("ActionLog__title")).toBeInTheDocument();
        expect(screen.getByTestId("TableActionLog")).toBeInTheDocument();

        for (let i = 0; i < mockActionLogs.length; i++) {
            expect(screen.getAllByTestId("ActionLogTableCell__userName")[i + 1]).toHaveTextContent(
                getUserByUserId(mockActionLogs[i].user_id, mockUser)
            );
            expect(screen.getAllByTestId("ActionLogTableCell__action")[i + 1]).toHaveTextContent(
                mockActionLogs[i].action
            );
            expect(screen.getAllByTestId("ActionLogTableCell__detail")[i + 1]).toHaveTextContent(
                mockActionLogs[i].action_detail
            );
            expect(screen.getAllByTestId("ActionLogTableCell__comment")[i + 1]).toHaveTextContent(
                mockActionLogs[i].action_comment
            );
        }
    });
});
