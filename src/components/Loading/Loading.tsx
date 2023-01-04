import { FC, ElementType, HtmlHTMLAttributes } from "react";

import clsx from "clsx";

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress";
import { styled } from "@mui/material/styles";

import Fullscreen from "../Fullscreen";

const PREFIX = "Loading";

const classes = {
    root: `${PREFIX}-root`,
};

const Root = styled("span")({
    width: "100%",
    display: "flex",
    justifyContent: "center",
});

export interface LoadingProps
    extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "color">,
        Pick<CircularProgressProps, "color"> {
    loading?: boolean;
    size?: number | string;
    fullscreen?: boolean;
    component?: ElementType;
}

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
    const {
        loading = true,
        className,
        size,
        fullscreen = false,
        component: Component = fullscreen ? Fullscreen : Box,
        color = "primary",
        ...rest
    } = props;

    if (!loading) return null;

    return (
        <Root>
            <Component
                data-testid="Loading__root"
                className={clsx(!fullscreen && classes.root, className)}
                {...rest}
            >
                <CircularProgress color={color} size={size} />
            </Component>
        </Root>
    );
};

export default Loading;
