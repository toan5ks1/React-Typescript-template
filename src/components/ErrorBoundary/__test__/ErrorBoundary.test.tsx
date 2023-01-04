import { TestContext } from "ra-test";
import { IErrorBoundary } from "src/internals/errors";

import ErrorBoundary from "../ErrorBoundary";

import { render, screen, RenderResult } from "@testing-library/react";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

describe("<ErrorBoundary />", () => {
    const testId: string = "ErrorBoundary";
    let wrapper: RenderResult;
    let spy: jest.SpyInstance;

    beforeEach(() => {
        spy = jest.spyOn(window.history, "go");
        const props: IErrorBoundary = {
            error: {
                name: "name",
                message: "message",
            },
            errorInfo: {
                componentStack: "errorInfo",
            },
        };
        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <ErrorBoundary {...props} />
                </TestThemeProvider>
            </TestContext>
        );
    });

    afterEach(() => {
        spy.mockRestore();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error UI", () => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it("should render back button", () => {
        expect(screen.getByText("ra.common.back")).toBeInTheDocument();

        screen.getByText("ra.common.back").click();

        expect(spy).toBeCalled();
    });
});

describe("<ErrorBoundary /> with chunk error", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        const props: IErrorBoundary = {
            error: {
                name: "ChunkLoadError",
                message: "ChunkLoadError",
            },
            errorInfo: {
                componentStack: "ChunkLoadError",
            },
        };
        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <ErrorBoundary {...props} />
                </TestThemeProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error message", () => {
        expect(wrapper.getByText("ra.common.cannotLoadPage")).toBeInTheDocument();
    });
});

describe("<ErrorBoundary /> doesn't return", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        const props: IErrorBoundary = {
            error: null,
            errorInfo: null,
        };
        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <ErrorBoundary {...props} />
                </TestThemeProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error message", () => {
        expect(wrapper.queryByTestId("ErrorBoundary")).not.toBeInTheDocument();
    });
});

describe("<ErrorBoundary /> with unstable network", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        const props: IErrorBoundary = {
            error: {
                name: "TypeError",
                message: "dynamically imported module",
            },
            errorInfo: {
                componentStack: "TypeError",
            },
        };
        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <ErrorBoundary {...props} />
                </TestThemeProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error message and detail toggle title", () => {
        expect(wrapper.getByText("resources.common.netWorkUnstable")).toBeInTheDocument();
        expect(wrapper.getByText("ra.message.details")).toBeInTheDocument();
    });
});
