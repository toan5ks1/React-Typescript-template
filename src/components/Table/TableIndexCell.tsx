import TypographyBase from "../Typographys/TypographyBase";
import TableBaseCell from "./TableBaseCell";
import { TableBaseCellProps, TableIndex } from "./table-types";

export interface TableIndexCellProps extends TableBaseCellProps {
    withIndex: TableIndex;
}

const TableIndexCell = (props: TableIndexCellProps) => {
    const { border, children, style, withIndex, ...rest } = props;

    return (
        <TableBaseCell
            border={border}
            style={{
                minWidth: typeof withIndex === "boolean" ? "60px" : withIndex.width,
                ...style,
            }}
            {...rest}
        >
            <TypographyBase data-testid="TableIndexCell__index" variant="body2">
                {children}
            </TypographyBase>
        </TableBaseCell>
    );
};

export default TableIndexCell;
