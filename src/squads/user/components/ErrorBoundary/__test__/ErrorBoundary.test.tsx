import { IErrorBoundary } from "src/squads/user/internals/errors";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ErrorBoundary from "../ErrorBoundary";

import { render, screen, RenderResult } from "@testing-library/react";

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
            <TestCommonAppProvider>
                <ErrorBoundary {...props} />
            </TestCommonAppProvider>
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
        expect(screen.getByText("Go Back")).toBeInTheDocument();

        screen.getByText("Go Back").click();

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
            <TestCommonAppProvider>
                <ErrorBoundary {...props} />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error message", () => {
        expect(
            wrapper.getByText(
                "We cannot load the page data, maybe the internet was disconnected, please try again"
            )
        ).toBeInTheDocument();
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
            <TestCommonAppProvider>
                <ErrorBoundary {...props} />
            </TestCommonAppProvider>
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
            <TestCommonAppProvider>
                <ErrorBoundary {...props} />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct error message and detail toggle title", () => {
        expect(
            wrapper.getByText(
                "Your internet connection is unstable, Please refresh the page or try again"
            )
        ).toBeInTheDocument();
        expect(wrapper.getByText("Details")).toBeInTheDocument();
    });
});
