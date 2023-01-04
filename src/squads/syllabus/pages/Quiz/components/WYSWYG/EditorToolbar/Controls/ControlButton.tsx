import { forwardRef, PropsWithChildren, SyntheticEvent } from "react";

import { StandardProps } from "src/squads/syllabus/typings/react-component";

import { IconButton, Tooltip } from "@mui/material";

const sx = {
    root: {
        flexShrink: 0,
        color: "rgba(0, 0, 0, 0.54)",
        cursor: "pointer",
        marginRight: "16px",
        padding: "2px 0",
        display: "inline-block",
        "&:hover": {
            backgroundColor: "unset",
        },
    },
    active: {
        color: "#5890ff",
    },
};

export interface StyleButtonProps extends StandardProps {
    tooltip: string;
    active: boolean;
    controlValue?: string;
    onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const ControlButton = forwardRef<HTMLButtonElement, PropsWithChildren<StyleButtonProps>>(
    (props, _ref) => {
        const { style, tooltip = "", active, children, onClick } = props;

        return (
            <Tooltip title={tooltip}>
                <IconButton
                    aria-label={tooltip}
                    sx={[sx.root, active && sx.active]}
                    size="small"
                    style={style}
                    onClick={onClick}
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                >
                    {children}
                </IconButton>
            </Tooltip>
        );
    }
);

export default ControlButton;
