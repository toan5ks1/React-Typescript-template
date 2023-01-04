import { useEffect } from "react";

import { DateTime } from "luxon";
import { NavigateAction } from "react-big-calendar";
import { FormProvider, useForm } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { convertToDate } from "src/common/utils/time";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonBase from "src/components/Buttons/ButtonBase";
import SelectBase from "src/components/Select/SelectBase";
import { DatePickerBaseProps } from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/DatePickers/DatePickerBase";
import DatePickerHF from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/DatePickers/DatePickerHF";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import { ToolbarProps as ManaToolbarProps } from "@manabie-com/mana-calendar";
import useResourceTranslate from "src/squads/calendar/hooks/useResourceTranslate";

interface ToolbarProps extends ManaToolbarProps {
    onChangeDate: () => void;
}

const Toolbar = (props: ToolbarProps) => {
    const { date, onNavigate, onChangeDate } = props;
    const tCalendar = useResourceTranslate(ERPModules.SCHEDULE);

    const viewOptions: OptionSelectType[] = [
        {
            id: "month",
            value: tCalendar("label.month"),
        },
    ];

    const methods = useForm({
        defaultValues: {
            date: date,
        },
    });

    // TODO: will fix in the next epic
    useEffect(() => {
        methods.setValue("date", date);
    }, [date, methods]);

    const handleNavigateDate: DatePickerBaseProps["onAccept"] = (selectedValue) => {
        if (selectedValue instanceof DateTime) {
            const selectedDate = new Date(convertToDate(selectedValue));
            onNavigate("DATE", selectedDate);

            if (
                selectedDate.getMonth() !== date.getMonth() ||
                selectedDate.getFullYear() !== date.getFullYear()
            ) {
                onChangeDate();
            }
        }
    };

    const handleNavigateToolbar = (navigate: NavigateAction) => {
        onNavigate(navigate);
        onChangeDate();
    };

    return (
        <Box
            data-testid="Toolbar__wrapper"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={calendarStyles.calendarToolbar.wrapper}
        >
            <Box display="flex" alignItems="center">
                <Box>
                    <ButtonBase
                        data-testid="Toolbar__buttonToday"
                        variant="outlined"
                        size={"small"}
                        sx={{ color: "text.primary" }}
                        onClick={() => handleNavigateToolbar("TODAY")}
                    >
                        {tCalendar("button.today")}
                    </ButtonBase>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                    <IconButton
                        size="small"
                        data-testid="Toolbar__iconButtonLeft"
                        onClick={() => handleNavigateToolbar("PREV")}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        size="small"
                        data-testid="Toolbar__iconButtonRight"
                        onClick={() => handleNavigateToolbar("NEXT")}
                    >
                        <ChevronRight />
                    </IconButton>
                </Box>
                <Box display="flex" alignItems="center">
                    <FormProvider {...methods}>
                        <DatePickerHF name="date" onAccept={handleNavigateDate} />
                    </FormProvider>
                </Box>
            </Box>
            <Box>
                <SelectBase
                    data-testid="Toolbar__selectCalendarView"
                    displayEmpty
                    input={<OutlinedInput margin="dense" size={"small"} />}
                    options={viewOptions}
                    value={"month"}
                    variant={"outlined"}
                    size={"small"}
                    sx={calendarStyles.calendarToolbar.selectCalendarView}
                />
            </Box>
        </Box>
    );
};

export default Toolbar;
