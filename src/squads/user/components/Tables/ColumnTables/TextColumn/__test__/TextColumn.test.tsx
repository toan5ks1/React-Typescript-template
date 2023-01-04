import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import TextColumn, { TextColumnProps } from "../TextColumn";

import { render, screen } from "@testing-library/react";

describe("TextColumn/>", () => {
    const renderComponent = (props?: Partial<TextColumnProps>) => {
        return render(
            <TestCommonAppProvider>
                <TextColumn
                    content={"Test"}
                    dataTestIdContent="ColumnCommon__content"
                    dataTestIdLoading="ColumnCommon__loading"
                    isLoading={false}
                    {...props}
                />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content when having value loading false", () => {
        renderComponent();

        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByTestId("ColumnCommon__content")).toBeInTheDocument();
    });

    it("should render Skeleton when loading is true", () => {
        renderComponent({ isLoading: true });

        expect(screen.getByTestId("ColumnCommon__loading")).toBeInTheDocument();
    });

    it("should render -- when no data", () => {
        renderComponent({ content: "" });
        expect(screen.getByText("--")).toBeInTheDocument();
        expect(screen.getByTestId("ColumnCommon__content")).toBeInTheDocument();
    });
});
