import { memo } from "react";

import { ERPModules } from "src/common/constants/enum";

import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";
import StyledLink from "src/components/StyledLink";
import { TableCellWithChip } from "src/components/Table";
import BaseColumn, {
    BaseColumnProps,
} from "src/squads/user/components/Tables/ColumnTables/BaseColumn";

import useDisplayTooltip from "src/squads/user/hooks/useDisplayTooltip";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface NameColumnProps extends Omit<BaseColumnProps, "onMouseEnter" | "title" | "sx"> {
    isLoggedIn: boolean;
    redirectUrl: string;
    maxLines: number;
}

const NameColumn = ({ isLoggedIn, redirectUrl, content, maxLines, ...rest }: NameColumnProps) => {
    const tStudent = useResourceTranslate(ERPModules.STUDENTS);
    const { handleMouseEnter, shouldDisplayTooltip } = useDisplayTooltip();

    if (!Boolean(content)) return null;

    return (
        <TableCellWithChip
            chip={
                !isLoggedIn ? (
                    <ChipAutocomplete size="small" label={tStudent("labels.neverLoggedIn")} />
                ) : null
            }
        >
            <StyledLink data-testid="TableColumnName__content" to={redirectUrl}>
                <BaseColumn
                    {...rest}
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: maxLines,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                    content={content}
                    onMouseEnter={handleMouseEnter}
                    title={shouldDisplayTooltip && content ? content : ""}
                />
            </StyledLink>
        </TableCellWithChip>
    );
};

export default memo(NameColumn);
