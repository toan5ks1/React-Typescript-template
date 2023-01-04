import { act } from "react-dom/test-utils";
import { manabieWindowEvent } from "src/internals/manabie-event";
import { TestThemeProvider } from "src/test-utils";

import ErrorLayout, { MyErrorBoundaryProps, NetworkErrorType } from "../ErrorLayout";

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

describe("<ErrorLayout />", () => {
    let wrapper: RenderResult;
    const props: MyErrorBoundaryProps = {};

    const paramsNetworkError: NetworkErrorType = {
        code: 2,
        props: {
            error: {
                name: "ra.common.cannotLoadPage",
                message: "Http response at 400 or 500 level",
            },
            errorInfo: { componentStack: "Http response at 400 or 500 level" },
        },
    };

    it("should render snapshot", () => {
        wrapper = render(
            <TestThemeProvider>
                <ErrorLayout {...props}>
                    <p>Test Error</p>
                </ErrorLayout>
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render handleNetworkErrors with manabieWindowEvent", async () => {
        wrapper = render(
            <TestThemeProvider>
                <ErrorLayout {...props}>
                    <p>Test Error</p>
                </ErrorLayout>
            </TestThemeProvider>
        );

        act(() => {
            manabieWindowEvent.dispatchEvent("manabie/network-error", {
                detail: paramsNetworkError,
            });
        });

        expect(wrapper.container).toMatchSnapshot();

        expect(wrapper.getByText("ra.common.cannotLoadPage")).toBeInTheDocument();
        expect(wrapper.getByText("Http response at 400 or 500 level")).toBeInTheDocument();

        expect(wrapper.getByTestId("ErrorBoundary")).toBeInTheDocument();
        expect(wrapper.getByTestId("ErrorBoundary__action")).toBeInTheDocument();
    });

    it("should render handleNetworkErrors with default code of manabieWindowEvent", async () => {
        wrapper = render(
            <TestThemeProvider>
                <ErrorLayout {...props}>
                    <p>Test Error</p>
                </ErrorLayout>
            </TestThemeProvider>
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
            <TestThemeProvider>
                <ErrorLayout {...props}>
                    <TestChild />
                </ErrorLayout>
            </TestThemeProvider>
        );

        expect(wrapper.getByText("Error: Test")).toBeInTheDocument();

        expect(wrapper.getByTestId("ErrorBoundary")).toBeInTheDocument();
        expect(wrapper.getByTestId("ErrorBoundary__action")).toBeInTheDocument();

        spy.mockRestore();
    });
});
