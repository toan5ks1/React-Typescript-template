import { ReactNode, SyntheticEvent, useState } from "react";

import { ContentState } from "draft-js";

import { Box, Theme } from "@mui/material";
import SpinnerIcon from "src/squads/syllabus/components/SvgIcons/SpinnerIcon";

import { CustomBlockTypes, findInlineStrategy } from "../wyswyg-utils";

const loadingImageStrategy = findInlineStrategy(CustomBlockTypes.LOADING_IMAGE);

export interface LoadingImageProps {
    offsetKey: string;
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
}

const sx = {
    wrapper: {
        position: "relative",
        display: "inline-block",
        fontSize: "0",
    },
    spinner: (theme: Theme) => ({
        width: "8px",
        height: "8px",
        position: "absolute",
        bottom: "1px",
        right: "1px",
        borderRadius: "25%",
        padding: theme.spacing(0.125),
        background: theme.palette.grey[100],
        "& svg": {
            borderRadius: "50%",
            animation: `$spinner 900ms ${theme.transitions.easing.sharp} infinite`,
        },
    }),
    spinner2: (theme: Theme) => ({
        bottom: "1px",
        right: "1px",
        width: "4px",
        height: "4px",
        padding: theme.spacing(0.125),
    }),
    spinner6: (theme: Theme) => ({
        bottom: "1px",
        right: "1px",
        width: "8px",
        height: "8px",
        padding: theme.spacing(0.125),
    }),
    spinner8: (theme: Theme) => ({
        bottom: "2px",
        right: "2px",
        width: "12px",
        height: "12px",
        padding: theme.spacing(0.25),
    }),
    spinner12: (theme: Theme) => ({
        bottom: "4px",
        right: "4px",
        width: "16px",
        height: "16px",
        padding: theme.spacing(0.25),
    }),
    spinner20: (theme: Theme) => ({
        bottom: "4px",
        right: "4px",
        width: "24px",
        height: "24px",
        padding: theme.spacing(0.25),
    }),
    "@keyframes spinner": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        },
    },
};

const getSpinnerSize = (width: number, height: number) => {
    if (width <= 16 && height <= 16) {
        return 2;
    }
    if (width <= 24 && height <= 24) {
        return 6;
    }
    if (width <= 48 && height <= 48) {
        return 8;
    }
    if (width < 200 && height < 200) {
        return 12;
    }
    return 20;
};

const LoadingImage = function ({
    offsetKey,
    contentState,
    entityKey,
    children,
}: LoadingImageProps) {
    const { data } = contentState.getEntity(entityKey).getData();
    const [spinnerSize, setSpinnerSize] = useState<number>(6);

    const handleOnLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = event.target as HTMLImageElement;
        setSpinnerSize(getSpinnerSize(width, height));
    };

    return (
        <span data-offset-key={offsetKey} data-testid="Editor__loading-image">
            <Box sx={sx.wrapper}>
                <img src={data} alt="wyswyg loading image" onLoad={handleOnLoad} />
                <Box sx={[sx.spinner, sx[spinnerSize]]}>
                    <SpinnerIcon width={spinnerSize} height={spinnerSize} />
                </Box>
            </Box>
            {children}
        </span>
    );
};

export const decorator = {
    strategy: loadingImageStrategy,
    component: LoadingImage,
};

export default LoadingImage;
