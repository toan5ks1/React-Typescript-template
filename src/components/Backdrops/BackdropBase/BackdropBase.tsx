import {
    Backdrop as MaterialBackdrop,
    BackdropProps as MaterialBackdropProps,
} from "@mui/material";

export interface BackdropBaseProps extends MaterialBackdropProps {}

const BackdropBase = ({ className, sx = [], ...props }: BackdropBaseProps) => {
    return (
        <MaterialBackdrop
            {...props}
            sx={[
                (theme) => ({ zIndex: theme.zIndex.drawer + 1, color: "#fff" }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            className={className}
        />
    );
};

export default BackdropBase;
