import { InputAdornment } from "@mui/material";
import TextFieldHF, { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";

export interface TextFieldPercentageHFProps extends TextFieldHFProps {}

const oneHundredPercent = 100;

const TextFieldPercentageHF = (props: TextFieldPercentageHFProps) => {
    return (
        <TextFieldHF
            InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            inputProps={{
                min: 0,
                max: oneHundredPercent,
                onInput: (event) => {
                    const inputValue = parseInt(event.currentTarget.value, 10);
                    event.currentTarget.value = `${inputValue}`;

                    if (inputValue > oneHundredPercent) {
                        event.currentTarget.value = `${oneHundredPercent}`;
                    }

                    if (inputValue < 0) {
                        event.currentTarget.value = "0";
                    }
                },
            }}
            type="number"
            {...props}
        />
    );
};

export default TextFieldPercentageHF;
