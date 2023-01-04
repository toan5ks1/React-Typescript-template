import { ArrayElement } from "src/common/constants/types";
import { StudentQrCodeByStudentIdsQuery } from "src/squads/user/service/bob/bob-types";

import { PdfStudentQrCodesTypes } from "../../common/constants/enum";
import { commonStyle } from "./commonStyle";

import ReactPDF from "@react-pdf/renderer";

export interface StudentQrInfo
    extends Omit<ArrayElement<StudentQrCodeByStudentIdsQuery["student_qr"]>, "qr_id" | "qr_url"> {
    student_id: string;
    name: string;
    qr_url?: string;
}

export interface PdfStudentQrCodesProps {
    selectedStudentsQrInfo: StudentQrInfo[];
    pdfType: PdfStudentQrCodesTypes;
}

const pdfStyles = {
    studentCard: ReactPDF.StyleSheet.create({
        container: {
            ...commonStyle.container,
            paddingLeft: "15px",
        },
        section: {
            width: "262.5px",
            height: "160px",
            flexDirection: "row",
        },
        imageSection: {
            width: "60%",
        },
        image: {
            width: "100%",
        },
        textSection: {
            width: "40%",
        },
        text: {
            ...commonStyle.text,
            fontSize: "10px",
            textAlign: "left",
            top: "45%",
        },
    }),
    qrCodeSheet: ReactPDF.StyleSheet.create({
        container: {
            ...commonStyle.container,
            paddingTop: "11px",
            paddingLeft: "37px",
        },
        section: {
            marginRight: "10.5px",
            marginBottom: "10.5px",
            width: "89px",
            height: "89px",
            paddingHorizontal: 5,
            paddingBottom: 5,
        },
        text: {
            ...commonStyle.text,
            maxLines: 1,
            fontSize: "5px",
            textAlign: "center",
            fontWeight: 500,
        },
        image: {
            height: "100%",
        },
    }),
};

const testIds = {
    studentCard: "StudentCard__Student",
    qrCodeSheet: "QrCode__Student",
};

const PdfStudentCardPage = ({
    selectedStudentsQrInfo,
}: {
    selectedStudentsQrInfo: StudentQrInfo[];
}) => {
    const type = PdfStudentQrCodesTypes.STUDENT_CARD;

    return (
        <ReactPDF.View style={pdfStyles[type]?.container}>
            {selectedStudentsQrInfo.map((student) => (
                <ReactPDF.View
                    style={pdfStyles[type]?.section}
                    key={student?.student_id}
                    data-testid={testIds[type]}
                    wrap={false}
                >
                    <ReactPDF.View style={pdfStyles[type]?.imageSection}>
                        {student.qr_url ? <ReactPDF.Image src={student.qr_url} /> : null}
                    </ReactPDF.View>
                    <ReactPDF.View style={pdfStyles[type]?.textSection}>
                        <ReactPDF.Text style={pdfStyles[type]?.text}>{student?.name}</ReactPDF.Text>
                    </ReactPDF.View>
                </ReactPDF.View>
            ))}
        </ReactPDF.View>
    );
};

const PdfQrCodeSheetPage = ({
    selectedStudentsQrInfo,
}: {
    selectedStudentsQrInfo: StudentQrInfo[];
}) => {
    const type = PdfStudentQrCodesTypes.QR_CODE_SHEET;
    const pages = Math.ceil(selectedStudentsQrInfo.length / 40);
    const qrCodePages = [];

    // if selected.length <= 40, 1 page only. key will be the page number
    if (selectedStudentsQrInfo.length <= 40) {
        qrCodePages.push(
            <ReactPDF.View style={pdfStyles[type]?.container} key={1}>
                {selectedStudentsQrInfo.map((student) => (
                    <ReactPDF.View
                        style={pdfStyles[type]?.section}
                        key={student?.student_id}
                        data-testid={testIds[type]}
                        wrap={false}
                    >
                        {student.qr_url ? (
                            <ReactPDF.Image src={student?.qr_url} style={pdfStyles[type]?.image} />
                        ) : null}
                        <ReactPDF.Text style={pdfStyles[type]?.text}>{student?.name}</ReactPDF.Text>
                    </ReactPDF.View>
                ))}
            </ReactPDF.View>
        );
    } else {
        // if selected.length > 40
        for (let p = 0; p < pages; p++) {
            // slice selectedStudentsQrInfo in 40s until we reach the length
            const startIndex = p * 40;
            let endIndex = selectedStudentsQrInfo.length;
            if (p * 40 < endIndex) {
                endIndex = (p + 1) * 40; // excluding the element at this index
            }

            const slicedSelected = selectedStudentsQrInfo.slice(startIndex, endIndex);

            // key will be the page number
            qrCodePages.push(
                <ReactPDF.View style={pdfStyles[type]?.container} key={p + 1}>
                    {slicedSelected.map((student) => (
                        <ReactPDF.View
                            style={pdfStyles[type]?.section}
                            key={student?.student_id}
                            data-testid={testIds[type]}
                            wrap={false}
                        >
                            {student.qr_url ? (
                                <ReactPDF.Image
                                    src={student?.qr_url}
                                    style={pdfStyles[type]?.image}
                                />
                            ) : null}
                            <ReactPDF.Text style={pdfStyles[type]?.text}>
                                {student?.name}
                            </ReactPDF.Text>
                        </ReactPDF.View>
                    ))}
                </ReactPDF.View>
            );
        }
    }

    return <>{qrCodePages}</>;
};

const PdfStudentQrCodes = (props: PdfStudentQrCodesProps) => {
    return (
        <ReactPDF.Document>
            <ReactPDF.Page size="A4" style={commonStyle.page} wrap>
                {props.pdfType === PdfStudentQrCodesTypes.STUDENT_CARD ? (
                    <PdfStudentCardPage selectedStudentsQrInfo={props.selectedStudentsQrInfo} />
                ) : (
                    <PdfQrCodeSheetPage selectedStudentsQrInfo={props.selectedStudentsQrInfo} />
                )}
            </ReactPDF.Page>
        </ReactPDF.Document>
    );
};

export default PdfStudentQrCodes;
