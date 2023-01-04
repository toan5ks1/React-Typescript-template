import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";

export interface ButtonBaseProps extends Omit<MaterialButtonProps, "color"> {
    color?: MaterialButtonProps["color"] | "error";
    isLoading?: boolean;
}

const ButtonBase = ({
    color = "default", // set as default to consist with V4 color prop
    variant,
    children,
    className,
    isLoading,
    startIcon,
    sx = [],
    ...rest
}: ButtonBaseProps) => {
    const renderedStartIcon = isLoading ? <CircularProgressBase sizeVariant="button" /> : startIcon;

    return (
        <MaterialButton
            className={className}
            sx={[
                color === "error"
                    ? (theme) => {
                          if (variant === "contained") {
                              return {
                                  backgroundColor: theme.palette.error.main,
                                  color: theme.palette.error.contrastText,
                                  "&:hover": {
                                      backgroundColor: theme.palette.error.dark,
                                  },
                              };
                          } else {
                              return {
                                  color: theme.palette.error.main,
                              };
                          }
                      }
                    : {},
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            variant={variant}
            color={color !== "error" ? color : "default"}
            startIcon={renderedStartIcon}
            {...rest}
        >
            {children}
        </MaterialButton>
    );
};

export default ButtonBase;
