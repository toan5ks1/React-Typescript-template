import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import EntryExitRouter from "../EntryExitRouter";

import { render, screen, waitFor } from "@testing-library/react";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/adobo/domains/entry-exit/pages/scanner/QrCodeScannerPage", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>QrCodeScannerPage</div>;
        },
    };
});

describe("<EntryExitRouter />", () => {
    it("should render qr scanner page without crashing", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/entry-exit/student_qr_scanner"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/entry-exit/student_qr_scanner" component={EntryExitRouter} />
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
