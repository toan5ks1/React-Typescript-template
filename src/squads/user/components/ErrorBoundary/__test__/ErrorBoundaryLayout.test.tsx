import { act } from "react-dom/test-utils";
import { manabieWindowEvent } from "src/internals/manabie-event";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ErrorBoundaryLayout, {
    MyErrorBoundaryProps,
    NetworkErrorType,
} from "../ErrorBoundaryLayout";

import { render, RenderResult } from "@testing-library/react";

jest.mock("src/internals/manabie-event", () => {
    const store = {};

    return {
        __esModule: true,
        manabieWindowEvent: {
            dispatchEvent: (eventName: string, details: CustomEventInit) => {
                store[eventName](details);
            },
            addListener: (eventName: string, listener: EventListenerOrEventListenerObject) => {
                store[eventName] = listener;
            },
        },
    };
});

describe("<ErrorBoundaryLayout />", () => {
    let wrapper: RenderResult;
    const props: MyErrorBoundaryProps = {};

    const paramsNetworkError: NetworkErrorType = {
        code: 2,
        props: {
            error: {
                name: "resources.common.cannotLoadPage",
                message: "Http response at 400 or 500 level",
            },
            errorInfo: { componentStack: "Http response at 400 or 500 level" },
        },
    };

    it("should render snapshot", () => {
        wrapper = render(
            <TestCommonAppProvider>
                <ErrorBoundaryLayout {...props}>
                    <p>Test Error</p>
                </ErrorBoundaryLayout>
            </TestCommonAppProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render handleNetworkErrors with manabieWindowEvent", async () => {
        wrapper = render(
            <TestCommonAppProvider>
                <ErrorBoundaryLayout {...props}>
                    <p>Test Error</p>
                </ErrorBoundaryLayout>
            </TestCommonAppProvider>
        );

        act(() => {
            manabieWindowEvent.dispatchEvent("manabie/network-error", {
                detail: paramsNetworkError,
            });
        });

        expect(wrapper.container).toMatchSnapshot();

        expect(
            wrapper.getByText(
                "We cannot load the page data, maybe the internet was disconnected, please try again"
            )
        ).toBeInTheDocument();
        expect(wrapper.getByText("Http response at 400 or 500 level")).toBeInTheDocument();

        expect(wrapper.getByTestId("ErrorBoundary")).toBeInTheDocument();
        expect(wrapper.getByTestId("ErrorBoundary__action")).toBeInTheDocument();
    });

    it("should render handleNetworkErrors with default code of manabieWindowEvent", async () => {
        wrapper = render(
            <TestCommonAppProvider>
                <ErrorBoundaryLayout {...props}>
                    <p>Test Error</p>
                </ErrorBoundaryLayout>
            </TestCommonAppProvider>
        );

        act(() => {
            manabieWindowEvent.dispatchEvent("manabie/network-error", {
                detail: {
                    code: undefined,
                    props: paramsNetworkError.props,
                },
            });
        });

        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.getByText("Test Error")).toBeInTheDocument();
    });

    it("should render hasError with getDerivedStateFromError", () => {
        const spy = jest.spyOn(console, "error");
        spy.mockImplementation(() => {});

        const TestChild = () => {
            throw new Error("Test");
        };
        wrapper = render(
            <TestCommonAppProvider>
                <ErrorBoundaryLayout {...props}>
                    <TestChild />
                </ErrorBoundaryLayout>
            </TestCommonAppProvider>
        );

        expect(wrapper.getByText("Error: Test")).toBeInTheDocument();

        expect(wrapper.getByTestId("ErrorBoundary")).toBeInTheDocument();
        expect(wrapper.getByTestId("ErrorBoundary__action")).toBeInTheDocument();

        spy.mockRestore();
    });
});
