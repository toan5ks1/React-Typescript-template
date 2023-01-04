import PdfDocument from "../PdfDocument";

import { render } from "@testing-library/react";

jest.mock("react-pdf");

describe("<PdfDocument />", () => {
    it("a", () => {});
    it("should render without crash", () => {
        render(<PdfDocument pdfUrl={""} currentPage={0} onLoad={() => {}} />);
    });
});
