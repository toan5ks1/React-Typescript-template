import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_UsersQuery,
    Invoice_UsersQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";

import userQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/user.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockUsers = getUsersMock();

describe("invoiceQueryInvoiceMgmt", () => {
    it("getUsers", async () => {
        const variables: Invoice_UsersQueryVariables = {
            user_ids: ["123"],
        };

        const mockInvoiceQuery: HasuraAndDefaultResponse<Invoice_UsersQuery> = {
            data: {
                users: mockUsers,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceQuery);

        const result = await userQueryInvoiceMgmt.getUsers(variables);

        expect(result).toEqual(mockUsers);
    });
});
