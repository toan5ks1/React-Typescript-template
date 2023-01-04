import { FormProvider, useForm } from "react-hook-form";

import { Box, Grid, Switch } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import SelectHF from "src/components/Select/SelectHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import AutocompleteTimePickerHF from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteTimePickerHF";

type FormSetOpenDayInfo = {
    date: Date;
};

const FormSetOpenDayInfo = () => {
    const methods = useForm<FormSetOpenDayInfo>({
        defaultValues: {
            date: new Date(),
        },
    });

    // TODO: will remove when backend support table for it
    const dayTypesOptions = [
        {
            id: "regular",
            value: "Regular",
        },
        {
            id: "seasonal",
            value: "Seasonal",
        },
        {
            id: "spare",
            value: "Spare",
        },
        {
            id: "closed",
            value: "Closed",
        },
    ];

    return (
        <FormProvider {...methods}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <DatePickerHF name="date" label="Date"></DatePickerHF>
                </Grid>
                <Grid item>
                    <SelectHF name="opening_status" label="Date Type" options={dayTypesOptions} />
                </Grid>
                <Grid item>
                    <AutocompleteTimePickerHF
                        name="openTime"
                        getOptionSelectedField="value"
                        label="Open Time"
                    />
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center" ml="-4px" mt="-5px">
                        <Switch />
                        <TypographyBase variant="body1">Publish</TypographyBase>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default FormSetOpenDayInfo;
