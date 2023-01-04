import {
    FormControlLabel as MuiFormControlLabel,
    FormControl,
    FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material";
import { typographyClasses } from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";

const sx = {
    root: (theme: Theme) => ({
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(0.25),
    }),
    label: (theme: Theme) => ({
        "& span:first-of-type": {
            marginRight: theme.spacing(0.25),
        },
        [`& .${typographyClasses.root}`]: {
            color: theme.palette.text.primary,
            fontWeight: 400,
        },
    }),
};

interface FormControlLabelProps extends MuiFormControlLabelProps {}

const FormControlLabel = (props: FormControlLabelProps) => {
    const { label, labelPlacement, control, onChange, ...rest } = props;
    return (
        <FormControl component="fieldset" sx={sx.root}>
            <MuiFormControlLabel
                sx={sx.label}
                control={control}
                label={label}
                labelPlacement={labelPlacement}
                onChange={onChange}
                {...rest}
            />
        </FormControl>
    );
};

FormControlLabel.defaultProps = {
    labelPlacement: "end",
};

export default FormControlLabel;
