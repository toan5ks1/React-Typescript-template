import { forwardRef, memo } from "react";

import { Document, Page, pdfjs, DocumentProps } from "react-pdf";
import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const documentOptions = {
    cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/`,
    cMapPacked: true,
};

const StyledPage = styled(Page)({ paddingBottom: "60px" });
interface PdfDocumentProps {
    pdfUrl: string;
    scale?: number;
    pdfWidth?: number;
    currentPage: number;
    onLoad: DocumentProps["onLoadSuccess"];
}

const PdfDocument = forwardRef((props: PdfDocumentProps, ref) => {
    const { pdfUrl, currentPage, scale = 1, pdfWidth, onLoad } = props;
    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <Document
            ref={ref as any}
            file={pdfUrl}
            options={documentOptions}
            onLoadSuccess={onLoad}
            loading={<Box sx={{ padding: "10px" }}>{t("loadingPdf")}</Box>}
            error={<Box sx={{ padding: "10px" }}>{t("failedToLoadPdf")}</Box>}
        >
            <StyledPage
                scale={scale}
                width={pdfWidth}
                key={`page_${currentPage}`}
                pageNumber={currentPage}
            />
        </Document>
    );
});

export default memo(PdfDocument);
