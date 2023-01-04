import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import { render, screen, waitFor } from "@testing-library/react";
import InvoiceManagementRouter from "src/squads/adobo/domains/invoice/pages/invoice-list/InvoiceManagementRouter";

jest.mock("src/app/useFeatureController");

jest.mock("src/squads/adobo/domains/invoice/pages/invoice-list/InvoiceListPage", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>Invoice List</div>;
        },
    };
});

describe("<InvoiceManagementRouter />", () => {
    it("should render invoice list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/invoice_management"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/invoice_management" component={InvoiceManagementRouter} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
    });
});
