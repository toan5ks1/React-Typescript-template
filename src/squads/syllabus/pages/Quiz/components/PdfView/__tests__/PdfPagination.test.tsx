import PdfPagination from "../PdfPagination";

import { fireEvent, render, screen } from "@testing-library/react";

describe("<PdfPagination />", () => {
    it("should render correct page value", () => {
        const currentPage = 4;
        render(<PdfPagination currentPage={currentPage} totalPage={8} onChange={() => {}} />);

        expect(screen.getByTestId("PdfPagination__input").getAttribute("value")).toEqual(
            currentPage.toString()
        );
    });

    it("should call handler for input correctly", () => {
        const currentPage = 4;
        const onChange = jest.fn();

        render(<PdfPagination currentPage={currentPage} totalPage={8} onChange={onChange} />);
        const input = screen.getByTestId("PdfPagination__input");

        // type on input
        fireEvent.change(input, { target: { value: "2" } });
        expect(onChange).toHaveBeenCalledWith("2");
    });

    it("should call handler for prev/next", () => {
        const currentPage = 4;
        const onChange = jest.fn();

        render(<PdfPagination currentPage={currentPage} totalPage={8} onChange={onChange} />);

        // click arrow prev
        fireEvent.click(screen.getByTestId("PdfPagination__prev"));
        expect(onChange).toHaveBeenCalledWith(currentPage - 1);

        // click arrow next
        fireEvent.click(screen.getByTestId("PdfPagination__next"));
        expect(onChange).toHaveBeenCalledWith(currentPage + 1);
    });

    test("prev || next should be disable when currentPage = 1 || currentPage = totalPage by default", () => {
        const currentPage = 4;
        const onChange = jest.fn();

        const { rerender } = render(
            <PdfPagination currentPage={currentPage} totalPage={8} onChange={onChange} />
        );

        // valid page dont disable
        expect(screen.getByTestId("PdfPagination__prev")).not.toBeDisabled();
        expect(screen.getByTestId("PdfPagination__next")).not.toBeDisabled();

        // disable prev page
        rerender(<PdfPagination currentPage={1} totalPage={8} onChange={onChange} />);

        fireEvent.click(screen.getByTestId("PdfPagination__prev"));
        expect(screen.getByTestId("PdfPagination__prev")).toBeDisabled();

        // disable next page
        const totalPage = 8;
        rerender(
            <PdfPagination currentPage={totalPage} totalPage={totalPage} onChange={onChange} />
        );

        fireEvent.click(screen.getByTestId("PdfPagination__next"));
        expect(screen.getByTestId("PdfPagination__next")).toBeDisabled();
    });

    test("disables props effect", () => {
        const currentPage = 4;
        const onChange = jest.fn();

        const { rerender } = render(
            <PdfPagination currentPage={currentPage} totalPage={8} onChange={onChange} />
        );

        // nothing is disabled by default
        expect(screen.getByTestId("PdfPagination__prev")).not.toBeDisabled();
        expect(screen.getByTestId("PdfPagination__input")).not.toBeDisabled();
        expect(screen.getByTestId("PdfPagination__next")).not.toBeDisabled();

        // disable input when currentPage = 4
        rerender(
            <PdfPagination
                disables={{}}
                currentPage={currentPage}
                totalPage={8}
                onChange={onChange}
            />
        );
    });

    it("should disable the prev/next button when current page is not parsable to number", () => {
        const currentPage = "4ss";
        const onChange = jest.fn();

        render(<PdfPagination currentPage={currentPage} totalPage={8} onChange={onChange} />);

        expect(screen.getByTestId("PdfPagination__prev")).toBeDisabled();
        expect(screen.getByTestId("PdfPagination__next")).toBeDisabled();
    });
});
