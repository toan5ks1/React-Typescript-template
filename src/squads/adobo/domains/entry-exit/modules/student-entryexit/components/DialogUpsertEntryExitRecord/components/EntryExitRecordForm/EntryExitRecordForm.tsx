import { useState } from "react";

import { DateTime } from "luxon";
import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import { convertToDate, formatDate } from "src/common/utils/time";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";

import { Grid } from "@mui/material";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import TimePickerHF from "src/squads/adobo/domains/entry-exit/components/TimePickerHF";

import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";
import useEntryExitRecordValidationRules from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEntryExitRecordValidationRules";

export interface EntryExitRecordFormProps {
    defaultValues: EntryExitRecordFormData;
    mode: ModeOpenDialog;
}

const EntryExitRecordForm = (props: EntryExitRecordFormProps) => {
    const { defaultValues, mode } = props;
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);
    const [newExitTime, setNewExitTime] = useState<Date | null>(defaultValues.exitTime);

    const validationRules = useEntryExitRecordValidationRules(tEntryExit);

    const convertAndSetNewExitTime = (inputTime?: any) => {
        if (!inputTime) return;

        const newTime: Date = convertToDate(inputTime);
        setNewExitTime(newTime);
    };

    const getAndFormatExitTime = (inputExitTime?: Date | null) => {
        if (!inputExitTime) return "";

        return formatDate(inputExitTime, "HH:mm");
    };

    return (
        <Grid container spacing={2} data-testid="EntryExitRecordForm__root">
            <Grid item xs={12}>
                <DatePickerHF
                    disabled={mode !== ModeOpenDialog.ADD}
                    label={tEntryExit("columns.date")}
                    name="entryDate"
                    id="entryDate"
                    maxDate={DateTime.now()}
                    InputProps={{
                        required: mode === ModeOpenDialog.ADD,
                        "data-testid": "EntryExitRecordForm__entryDatePicker",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TimePickerHF
                    id="entryTime"
                    label={tEntryExit("columns.entryTime")}
                    name="entryTime"
                    rules={validationRules.entryTime}
                    InputProps={{
                        required: true,
                        "data-testid": "EntryExitRecordForm__entryTimePicker",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TimePickerHF
                    id="exitTime"
                    label={tEntryExit("columns.exitTime")}
                    name="exitTime"
                    rules={validationRules.exitTime}
                    InputProps={{
                        "data-testid": "EntryExitRecordForm__exitTimePicker",
                        placeholder: tEntryExit("columns.exitTime"),
                        value: getAndFormatExitTime(newExitTime),
                    }}
                    onChange={(inputTime) => convertAndSetNewExitTime(inputTime)}
                />
            </Grid>

            <Grid item xs={12}>
                <CheckboxLabelHF
                    name="notifyParents"
                    label={tEntryExit("form.notifyParents")}
                    data-testid="CheckboxLabelHF__notifyParents"
                />
            </Grid>
        </Grid>
    );
};

export default EntryExitRecordForm;
