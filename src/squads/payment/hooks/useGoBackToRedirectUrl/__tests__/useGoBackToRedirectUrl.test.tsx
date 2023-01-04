import { Route, Link, MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";

describe("useGoBackToRedirectUrl", () => {
    const PaymentPage = () => {
        const goBackToRedirectUrl = useGoBackToRedirectUrl();
        return <button onClick={() => goBackToRedirectUrl()}>Go Back</button>;
    };
    const App = () => {
        return (
            <div>
                <Route
                    exact
                    path="/user"
                    render={() => (
                        <div>
                            <h1>User Page</h1>
                            <Link to="/payment">Link To Payment</Link>
                        </div>
                    )}
                />
                <Route
                    exact
                    path="/payment"
                    render={() => (
                        <div>
                            <h1>Payment Page</h1>
                            <PaymentPage />
                        </div>
                    )}
                />
            </div>
        );
    };

    it("should redirect back to the previous page when missing redirectUrl", async () => {
        render(
            <MemoryRouter initialEntries={["/user"]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText("User Page")).toBeInTheDocument();
        expect(screen.queryByText("Payment Page")).not.toBeInTheDocument();
        userEvent.click(screen.getByText("Link To Payment"));
        expect(await screen.findByText("Payment Page")).toBeInTheDocument();
        expect(screen.queryByText("User Page")).not.toBeInTheDocument();

        userEvent.click(screen.getByText("Go Back"));
        expect(screen.getByText("User Page")).toBeInTheDocument();
    });

    it("should redirect to redirectUrl query when it exist", async () => {
        render(
            <MemoryRouter initialEntries={["/payment?redirectUrl=/user"]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText("Payment Page")).toBeInTheDocument();
        expect(screen.queryByText("User Page")).not.toBeInTheDocument();

        userEvent.click(screen.getByText("Go Back"));
        expect(await screen.findByText("User Page")).toBeInTheDocument();
        expect(screen.queryByText("Payment Page")).not.toBeInTheDocument();
    });
});
