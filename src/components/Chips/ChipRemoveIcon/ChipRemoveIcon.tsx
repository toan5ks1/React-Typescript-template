import { MouseEvent } from "react";

import RemoveIcon from "@mui/icons-material/Close";

interface ChipRemoveIconProps {
    onClick?: (e: MouseEvent) => void;
}

const ChipRemoveIcon = ({ onClick }: ChipRemoveIconProps) => {
    return (
        <RemoveIcon
            onClick={onClick}
            fontSize="small"
            sx={(theme) => ({
                color: theme.palette.grey[500],
                cursor: "pointer",
            })}
            data-testid="ChipRemoveIcon__icon"
        />
    );
};

export default ChipRemoveIcon;
