import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface TaskAssignmentDetailFieldProps {
    label: string;
    value: string | JSX.Element;
    dataTestId: string;
}

function TaskAssignmentDetailField(props: TaskAssignmentDetailFieldProps) {
    const { label, value, dataTestId } = props;

    return (
        <Grid container item sm={12}>
            <Grid item sm={3}>
                <TypographyBase variant="body2" color="textSecondary">
                    {label}
                </TypographyBase>
            </Grid>
            <Grid item sm>
                <TypographyBase variant="body1" color="textPrimary" data-testid={dataTestId}>
                    {value}
                </TypographyBase>
            </Grid>
        </Grid>
    );
}

export default TaskAssignmentDetailField;
