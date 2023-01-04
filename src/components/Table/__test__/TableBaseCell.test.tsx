import { PropsWithChildren } from "react";

import TableBaseCell from "../TableBaseCell";

import { render } from "@testing-library/react";

const TableWrapper = ({ children }: PropsWithChildren<{}>) => {
    return (
        <table>
            <tbody>
                <tr>{children}</tr>
            </tbody>
        </table>
    );
};

describe("<TableBaseCell />", () => {
    it("should match snapshot", () => {
        const { container } = render(<TableBaseCell>Test</TableBaseCell>, {
            wrapper: TableWrapper,
        });

        expect(container).toMatchSnapshot();
    });

    it("should render children", () => {
        const { getByText } = render(<TableBaseCell>Test</TableBaseCell>, {
            wrapper: TableWrapper,
        });

        expect(getByText("Test")).toBeInTheDocument();
    });
});
