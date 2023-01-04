import { PropsWithChildren } from "react";

import Grid from "@mui/material/Grid";
import ChipBase, { ChipBaseProps } from "src/components/Chips/ChipBase/ChipBase";

export interface ColumnStudentParentNameProps {
    chipBaseProps?: ChipBaseProps & {
        "data-testid": string;
    };
}

const ColumnStudentParentName = ({
    chipBaseProps,
    children,
}: PropsWithChildren<ColumnStudentParentNameProps>) => {
    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item>{children}</Grid>

            <Grid item>
                <ChipBase {...chipBaseProps} />
            </Grid>
        </Grid>
    );
};

export default ColumnStudentParentName;
