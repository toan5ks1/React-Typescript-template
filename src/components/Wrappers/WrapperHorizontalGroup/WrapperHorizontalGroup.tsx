import { ReactElement } from "react";

import { isArray } from "lodash";

import { Grid, GridProps } from "@mui/material";

export interface WrapperHorizontalGroupProps {
    wrap?: GridProps["wrap"];
    children: boolean | ReactElement | (boolean | ReactElement)[];
}

const WrapperHorizontalGroup = ({ wrap = "nowrap", children }: WrapperHorizontalGroupProps) => {
    return isArray(children) ? (
        <Grid container wrap={wrap} spacing={2}>
            {children
                .filter((element) => typeof element != "boolean")
                .map((element, index) => (
                    <Grid item key={index}>
                        {element}
                    </Grid>
                ))}
        </Grid>
    ) : children && children != true ? (
        children
    ) : null;
};

export default WrapperHorizontalGroup;
