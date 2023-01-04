import { formatDate } from "src/common/utils/time";
import { getFormattedItemPrice } from "src/squads/payment/helpers/price";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {
    Grid,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Table,
    Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import { getBorder } from "src/components/Table/utils";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import {
    downloadEnrollmentForm,
    generateProductRows,
    generateTaxRows,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewForm/enrollmentPreviewFormUtils";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface EnrollmentPreviewFormProps {
    studentName?: string;
    billedAtOrderProducts?: BilledAtOrderItemType[];
    totalValue?: number;
    billedAtOrderTaxInclusions?: Record<number, number>;
}

const enrollmentFormId = "enrollment-form";
const enrollmentDate = formatDate(new Date(), "yyyy/LL/dd");

const EnrollmentPreviewForm = ({
    studentName,
    billedAtOrderProducts = [],
    totalValue = 0,
    billedAtOrderTaxInclusions = {},
}: EnrollmentPreviewFormProps) => {
    const theme = useTheme();
    const t = useTranslate();
    const { currency } = useProductPluginsContext();
    const borderStyle = `1px solid ${theme.palette.border?.main}`;
    const pdfFileName = `${studentName}-${formatDate(new Date(), "yyyyLLdd")}`;

    return (
        <Grid container justifyContent="center" data-testid="EnrollmentForm__previewForm">
            <Grid item xs={8}>
                <PaperSectionWrapper>
                    <Grid container mb={2} justifyContent="space-between" alignItems="center">
                        <Grid item xs="auto">
                            <TypographyHeader>
                                {t("resources.orders.title.previewTheForm")}
                            </TypographyHeader>
                        </Grid>
                        <Grid item>
                            <ButtonBase
                                color="primary"
                                variant="outlined"
                                startIcon={<DownloadOutlinedIcon />}
                                onClick={() =>
                                    downloadEnrollmentForm(enrollmentFormId, pdfFileName)
                                }
                            >
                                {t("ra.common.action.downloadFile")}
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <PaperSectionWrapper id={enrollmentFormId}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs="auto">
                                <TypographyHeader>
                                    {t("resources.orders.title.enrollmentForm")}
                                </TypographyHeader>
                            </Grid>
                            <Grid item>
                                <TypographyTextSecondary variant="caption">
                                    {enrollmentDate}
                                </TypographyTextSecondary>
                            </Grid>
                        </Grid>
                        <TypographyPrimary mt={2} variant="subtitle1">
                            {studentName}
                        </TypographyPrimary>
                        <TypographyTextSecondary mt={0.5} mb={3} variant="body2">
                            Thank you for enrolling with us! The total amount for the first payment
                            is shown below. We look forward to working with you!
                        </TypographyTextSecondary>
                        <Box mb={3}>
                            <DividerDashed />
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                                borderLeft: borderStyle,
                                                borderTop: borderStyle,
                                            }}
                                            colSpan={1}
                                        ></TableCell>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                                borderTop: borderStyle,
                                            }}
                                            colSpan={3}
                                        >
                                            {t("resources.orders.column.productDetails")}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                                borderTop: borderStyle,
                                            }}
                                            colSpan={2}
                                            align="right"
                                        >
                                            {t("resources.orders.column.amount")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {generateProductRows({
                                        billedAtOrderProducts,
                                        currency,
                                        theme,
                                        borderStyle,
                                    })}
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                                borderLeft: borderStyle,
                                            }}
                                            colSpan={1}
                                        ></TableCell>
                                        <TableCell
                                            style={{ ...getBorder(theme, "all") }}
                                            colSpan={3}
                                            align="left"
                                        >
                                            {t("resources.orders.label.subTotal")}
                                        </TableCell>
                                        <TableCell
                                            style={{ ...getBorder(theme, "all") }}
                                            colSpan={2}
                                            align="right"
                                        >
                                            {getFormattedItemPrice(currency, false, totalValue)}
                                        </TableCell>
                                    </TableRow>
                                    {generateTaxRows({
                                        taxInclusions: billedAtOrderTaxInclusions,
                                        currency,
                                        theme,
                                        borderStyle,
                                        taxLabel: t("resources.orders.label.tax"),
                                        inclLabel: t("resources.orders.label.incl"),
                                    })}
                                    <TableRow style={{ backgroundColor: "#FAFAFA" }}>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                                borderLeft: borderStyle,
                                            }}
                                            colSpan={1}
                                        ></TableCell>
                                        <TableCell
                                            style={{
                                                ...getBorder(theme, "all"),
                                            }}
                                            colSpan={5}
                                            align="left"
                                        >
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <TypographyPrimary variant="subtitle2">
                                                    {t("resources.orders.label.total")}
                                                </TypographyPrimary>
                                                <TypographyPrimary variant="subtitle2">
                                                    {getFormattedItemPrice(
                                                        currency,
                                                        false,
                                                        totalValue
                                                    )}
                                                </TypographyPrimary>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </PaperSectionWrapper>
                </PaperSectionWrapper>
            </Grid>
        </Grid>
    );
};

export default EnrollmentPreviewForm;
