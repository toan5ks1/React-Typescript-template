import { TablePagination, LabelDisplayedRowsArgs } from "@mui/material";
import { inputBaseClasses } from "@mui/material/InputBase";
import { tablePaginationClasses } from "@mui/material/TablePagination";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { TableBaseFooterProps } from "./table-types";

import useTranslate from "src/hooks/useTranslate";

const sx = {
    [`& .${inputBaseClasses.input}`]: {
        padding: "9px 35px 7px 8px",
        fontSize: "12px",
    },
    [`& .${tablePaginationClasses.selectIcon}`]: {
        top: "calc(50% - 13px)",
        right: "7px",
    },
    [`& .${tablePaginationClasses.select}`]: {
        paddingRight: "35px !important",
    },
};

const TableBaseFooter = (props: TableBaseFooterProps) => {
    const t = useTranslate();
    const {
        pagination,
        labelRowsPerPage = t("ra.navigation.page_rows_per_page"),
        rowsPerPageOptions = [5, 10, 25, 50, 100],
        style,
    } = props;

    const paginationValue: LabelDisplayedRowsArgs = {
        count: pagination.count,
        from: pagination.page * pagination.rowsPerPage + 1,
        page: pagination.page,
        to: pagination.page * pagination.rowsPerPage + pagination.rowsPerPage,
    };

    const labelDisplayedRows =
        paginationValue.count > -1
            ? t("ra.navigation.page_range_info", {
                  offsetBegin: paginationValue.from,
                  offsetEnd: Math.min(paginationValue.to, paginationValue.count),
                  total: paginationValue.count,
              })
            : `${paginationValue.from}-${paginationValue.to}`;

    return (
        <TablePagination
            SelectProps={{
                id: "TableBaseFooter__select",
            }}
            backIconButtonProps={{
                size: "large",
            }}
            nextIconButtonProps={{
                size: "large",
            }}
            labelDisplayedRows={() => (
                <TypographyBase data-testid="TableBaseFooter__totalRows" variant="caption">
                    {labelDisplayedRows}
                </TypographyBase>
            )}
            data-testid="TableBaseFooter"
            {...pagination}
            labelRowsPerPage={<TypographyBase variant="caption">{labelRowsPerPage}</TypographyBase>}
            rowsPerPageOptions={rowsPerPageOptions}
            count={pagination?.count}
            sx={sx}
            component="div"
            style={style}
        />
    );
};

export default TableBaseFooter;
