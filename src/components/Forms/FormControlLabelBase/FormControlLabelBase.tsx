import { FormControlLabel, FormControlLabelProps } from "@mui/material";

export interface FormControlLabelBaseProps extends FormControlLabelProps {
    disableMarginLeft?: boolean;
    disableMarginRight?: boolean;
}

const FormControlLabelBase = (props: FormControlLabelBaseProps) => {
    const { disableMarginLeft, disableMarginRight, sx = [], ...rest } = props;

    return (
        <FormControlLabel
            {...rest}
            sx={[
                disableMarginLeft ? { marginLeft: 0 } : {},
                disableMarginRight ? { marginRight: 0 } : {},
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        />
    );
};

export default FormControlLabelBase;
