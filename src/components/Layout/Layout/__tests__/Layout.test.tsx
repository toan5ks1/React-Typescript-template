import { Suspense } from "react";

import { lazyWithRetry } from "src/common/utils/other";

import { render, RenderResult } from "@testing-library/react";
import TestApp from "src/test-utils/TestApp";
import TestingRouter from "src/test-utils/TestingRouter";

jest.mock("src/hooks/data/useQueryWithPagination", () => ({
    __esModule: true,
    default: () => ({
        result: {
            data: [],
        },
    }),
}));

const ComponentRouter = lazyWithRetry(() =>
    Promise.resolve({ __esModule: true, default: () => <div /> })
);
const TestingLayout = () => {
    return (
        <TestApp>
            <TestingRouter redirectUrl="/testing">
                <Suspense fallback={<div data-testid="Loading">loading...</div>}>
                    <ComponentRouter />
                </Suspense>
            </TestingRouter>
        </TestApp>
    );
};

describe("<Layout /> return suspense", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<TestingLayout />);
    });

    it("should render loading", () => {
        expect(wrapper.queryByText("loading...")).toBeInTheDocument();
    });
});
