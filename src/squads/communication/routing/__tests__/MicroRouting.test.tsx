import { Suspense } from "react";

import { render } from "@testing-library/react";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/communication",
        }),
        useLocation: () => ({
            pathname: "/communication",
        }),
    };
});
const renderComponent = () => {
    const MicroRouting = require("../MicroRouting").default;
    const SwitchWith404Route = require("src/components/Route/SwitchWith404Route").default;
    const { MemoryRouter, Route } = require("react-router");

    return render(
        <MemoryRouter initialEntries={["/communication/notifications"]}>
            <Suspense fallback={"..."}>
                <SwitchWith404Route>
                    <Route path="/communication" component={MicroRouting} />
                </SwitchWith404Route>
            </Suspense>
        </MemoryRouter>
    );
};

describe("<MicroRouting />", () => {
    it("should render /communication path", () => {
        jest.doMock(
            "src/squads/communication/hooks/useCommunicationAppInit/useCommunicationAppInit",
            () => {
                return {
                    __esModule: true,
                    default: () => {
                        return {
                            routes: [
                                {
                                    path: "/notifications",
                                    component: () => <div>NotificationRouter</div>,
                                },
                            ],
                            ready: true,
                        };
                    },
                };
            }
        );

        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
        jest.dontMock(
            "src/squads/communication/hooks/useCommunicationAppInit/useCommunicationAppInit"
        );
    });
    it("return loading when unready", () => {
        jest.doMock(
            "src/squads/communication/hooks/useCommunicationAppInit/useCommunicationAppInit",
            () => {
                return {
                    __esModule: true,
                    default: jest.fn(() => {
                        return {
                            routes: [
                                {
                                    path: "/notifications",
                                    component: () => <div>NotificationRouter</div>,
                                },
                            ],
                            ready: false,
                        };
                    }),
                };
            }
        );

        const wrapper = renderComponent();
        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
        jest.dontMock(
            "src/squads/communication/hooks/useCommunicationAppInit/useCommunicationAppInit"
        );
    });
});
