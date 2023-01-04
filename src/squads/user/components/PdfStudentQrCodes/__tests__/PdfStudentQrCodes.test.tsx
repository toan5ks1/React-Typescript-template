import { PdfStudentQrCodesTypes } from "src/squads/user/common/constants/enum";

import PdfStudentQrCodes, { PdfStudentQrCodesProps, StudentQrInfo } from "../PdfStudentQrCodes";

import PDF from "@react-pdf/renderer";

const { pdf } = PDF;

jest.mock("@react-pdf/renderer", () => {
    const actual = jest.requireActual("@react-pdf/renderer");

    return {
        ...actual,
        Font: {
            register: jest.fn(),
        },
    };
});

jest.mock("react-pdf");

const selectedStudentsQrInfo: StudentQrInfo[] = [
    {
        student_id: "id01",
        name: "Student 01",
        qr_url: "qrurl01",
    },
    {
        student_id: "id02",
        name: "Student 02",
        qr_url: "qrurl02",
    },
];

describe("<PdfStudentQrCodes /> for Student Card", () => {
    const props: PdfStudentQrCodesProps = {
        selectedStudentsQrInfo: selectedStudentsQrInfo,
        pdfType: PdfStudentQrCodesTypes.STUDENT_CARD,
    };

    it("should render without crashing", () => {
        // Since this is rendered as a PDF file and not part of the React DOM, we use pdf()
        // Reference: https://github.com/diegomura/react-pdf/issues/750#issuecomment-607361102
        pdf(<PdfStudentQrCodes {...props} />);
    });

    it("should match snapshot", () => {
        const pdfFile = pdf(<PdfStudentQrCodes {...props} />);

        expect(pdfFile).toMatchSnapshot();
    });
});

describe("<PdfStudentQrCodes /> for QR Code Sheet", () => {
    const props: PdfStudentQrCodesProps = {
        selectedStudentsQrInfo: selectedStudentsQrInfo,
        pdfType: PdfStudentQrCodesTypes.QR_CODE_SHEET,
    };

    it("should render without crashing", () => {
        // Since this is rendered as a PDF file and not part of the React DOM, we use pdf()
        // Reference: https://github.com/diegomura/react-pdf/issues/750#issuecomment-607361102
        pdf(<PdfStudentQrCodes {...props} />);
    });

    it("should match snapshot", () => {
        const pdfFile = pdf(<PdfStudentQrCodes {...props} />);

        expect(pdfFile).toMatchSnapshot();
    });
});
