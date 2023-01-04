import ChipBase from "src/components/Chips/ChipBase";

import TableCellWithChip from "../TableCellWithChip";

import { render, screen } from "@testing-library/react";

const ChipContent = () => <ChipBase size="small" label="Chip content" />;

describe("TableCellWithChip", () => {
    it("should render chip with correct style", () => {
        render(<TableCellWithChip chip={<ChipContent />}>Table cell content</TableCellWithChip>);
        expect(screen.getByTestId("TableCellWithChip__chip")).toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__chip")).toHaveStyle(
            "margin-top: 4px; margin-bottom: 4px;"
        );
    });

    it("shoud render with chip", () => {
        render(<TableCellWithChip chip={<ChipContent />}>Table cell content</TableCellWithChip>);
        expect(screen.getByTestId("TableCellWithChip__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__content")).toHaveTextContent(
            "Table cell content"
        );
        expect(screen.getByTestId("TableCellWithChip__chip")).toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__chip")).toHaveTextContent("Chip content");
    });

    it("shoud render without chip", () => {
        render(<TableCellWithChip>Table cell content</TableCellWithChip>);
        expect(screen.getByTestId("TableCellWithChip__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__content")).toHaveTextContent(
            "Table cell content"
        );
    });

    it("shoud render without content", () => {
        render(<TableCellWithChip chip={<ChipContent />} />);
        expect(screen.queryByTestId("TableCellWithChip__content")).not.toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__chip")).toBeInTheDocument();
        expect(screen.getByTestId("TableCellWithChip__chip")).toHaveTextContent("Chip content");
    });
});
