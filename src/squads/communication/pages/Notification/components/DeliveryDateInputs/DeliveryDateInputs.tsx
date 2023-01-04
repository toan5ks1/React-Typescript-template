import { Grid, Box, GridSize } from "@mui/material";
import TimePickerAutocompleteHF, {
    TimePickerAutocompleteHFProps,
} from "src/components/Autocompletes/TimePickerAutocompleteHF";
import DatePickerHF, { DatePickerHFProps } from "src/components/DatePickers/DatePickerHF";

interface LayoutDeliveryDateFieldProps {
    datePicker: GridSize;
    timePicker: GridSize;
}

interface TimePickerHFProps extends TimePickerAutocompleteHFProps {
    "data-testid"?: string;
}

export interface DeliveryDateFieldProps {
    dateFieldProps: DatePickerHFProps;
    timeFieldProps: TimePickerHFProps;
    rateOfLayout?: LayoutDeliveryDateFieldProps;
}

const DeliveryDateInputs = ({
    dateFieldProps,
    timeFieldProps,
    rateOfLayout = {
        datePicker: 6,
        timePicker: 4,
    },
}: DeliveryDateFieldProps) => {
    return (
        <Grid item container spacing={1}>
            <Grid item xs={rateOfLayout.datePicker}>
                <DatePickerHF {...dateFieldProps} />
            </Grid>
            <Grid item xs={rateOfLayout.timePicker}>
                {/* design confirm */}
                <Box minWidth={130}>
                    <TimePickerAutocompleteHF {...timeFieldProps} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default DeliveryDateInputs;
