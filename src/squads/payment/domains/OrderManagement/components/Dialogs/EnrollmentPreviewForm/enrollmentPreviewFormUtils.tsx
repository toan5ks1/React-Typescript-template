import { Fragment } from "react";

import { saveAs } from "file-saver";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import { getFormattedItemPrice } from "src/squads/payment/helpers/price";

import { TableCell, TableRow, Theme } from "@mui/material";
import { getBorder } from "src/components/Table/utils";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import ReactPDF from "@react-pdf/renderer";
import html2canvas from "html2canvas";

export interface RowOptions {
    currency: OrderCurrency;
    theme: Theme;
    borderStyle?: string;
}

export interface ProductRows extends RowOptions {
    billedAtOrderProducts: BilledAtOrderItemType[];
}

export interface TaxRows extends RowOptions {
    taxInclusions: Record<number, number>;
    taxLabel: string;
    inclLabel: string;
}

const pageStyles = ReactPDF.StyleSheet.create({
    page: {
        margin: "1in",
    },
    section: {
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "76%",
    },
});

export async function convertHtmlToImage(elementId: string): Promise<string | undefined> {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (!element) return;
    const canvas: HTMLCanvasElement = await html2canvas(element, { scale: 3 });
    const imgData: string = canvas.toDataURL("image/png");
    return imgData;
}

export async function downloadEnrollmentForm(elementId: string, fileName?: string) {
    const imgData = await convertHtmlToImage(elementId);
    const pdfFileName = fileName ?? "document";

    const blob = await ReactPDF.pdf(
        <ReactPDF.Document>
            <ReactPDF.Page size="A4" style={pageStyles.page} wrap>
                <ReactPDF.View style={pageStyles.section}>
                    <ReactPDF.Image src={imgData} />
                </ReactPDF.View>
            </ReactPDF.Page>
        </ReactPDF.Document>
    ).toBlob();

    saveAs(blob, `${pdfFileName}.pdf`);
}

export function generateTaxRows({
    taxInclusions,
    currency,
    theme,
    borderStyle,
    taxLabel,
    inclLabel,
}: TaxRows) {
    const taxInclusionEntries = Object.entries(taxInclusions);

    return taxInclusionEntries.map(([taxInclusionPercentage, taxInclusionTotal], index) => {
        return (
            <TableRow key={`tax-inclusive-row-${index}`}>
                <TableCell
                    style={{ ...getBorder(theme, "all"), borderLeft: borderStyle }}
                    colSpan={1}
                ></TableCell>
                <TableCell style={{ ...getBorder(theme, "all") }} colSpan={3}>
                    {/* TODO: [LT-16820] Translate tax format to Japanese */}
                    {`${taxLabel} (${taxInclusionPercentage}% ${inclLabel})`}
                </TableCell>
                <TableCell style={{ ...getBorder(theme, "all") }} colSpan={2} align="right">
                    {getFormattedItemPrice(currency, false, taxInclusionTotal)}
                </TableCell>
            </TableRow>
        );
    });
}

export function generateProductRows({
    billedAtOrderProducts,
    currency,
    theme,
    borderStyle,
}: ProductRows) {
    return billedAtOrderProducts.map((product, index) => {
        const discountAvailable = Boolean(product.discountName);
        return (
            <Fragment key={`product-item-${index + 1}`}>
                <TableRow>
                    <TableCell
                        style={{
                            ...getBorder(theme, "all"),
                            borderLeft: borderStyle,
                            verticalAlign: "top",
                        }}
                        rowSpan={discountAvailable ? 2 : 1}
                    >
                        {index + 1}
                    </TableCell>
                    <TableCell style={{ ...getBorder(theme, "all") }} colSpan={3} align="left">
                        {product.productName}
                    </TableCell>
                    <TableCell style={{ ...getBorder(theme, "all") }} colSpan={2} align="right">
                        {getFormattedItemPrice(currency, false, product.productPrice)}
                    </TableCell>
                </TableRow>
                {discountAvailable && (
                    <TableRow>
                        <TableCell style={{ ...getBorder(theme, "all") }} colSpan={3} align="left">
                            {product.discountName}
                        </TableCell>
                        <TableCell style={{ ...getBorder(theme, "all") }} colSpan={2} align="right">
                            {getFormattedItemPrice(currency, true, product.discountPrice)}
                        </TableCell>
                    </TableRow>
                )}
            </Fragment>
        );
    });
}
