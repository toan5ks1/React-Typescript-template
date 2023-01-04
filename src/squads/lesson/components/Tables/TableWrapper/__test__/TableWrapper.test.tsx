import TableWrapper from "src/squads/lesson/components/Tables/TableWrapper";

import { render } from "@testing-library/react";

describe("<TableWrapper />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <TableWrapper component="div" errorMessage="error">
                <table />
            </TableWrapper>
        );

        expect(container).toMatchSnapshot();
    });

    it("should not render error message if there is no error message", () => {
        const { queryByRole } = render(
            <TableWrapper component="div">
                <table />
            </TableWrapper>
        );

        expect(queryByRole("alert")).toBeNull();
    });

    it("should render error message if there is error message", () => {
        const { getByRole, getByText } = render(
            <TableWrapper component="div" errorMessage="error message">
                <table />
            </TableWrapper>
        );

        expect(getByRole("alert")).toBeInTheDocument();
        expect(getByText("error message")).toBeInTheDocument();
    });
});
