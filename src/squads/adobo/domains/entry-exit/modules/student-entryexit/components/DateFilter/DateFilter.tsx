import { useState, useCallback } from "react";

import { DateTime } from "luxon";
import { OptionSelectType } from "src/common/constants/types";

import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SelectBase from "src/components/Select/SelectBase/SelectBase";

import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";

export type DateFilterValues = "all" | "thisMonth" | "lastMonth" | "thisYear";
export type DateFilterRange = {
    startDate: string;
    endDate: string;
};

const now = DateTime.local();
const currentYear = now.year;
const currentMonth = now.month;
const prevMonth = currentMonth - 1;
const JANUARY = 1;
const DECEMBER = 12;
const OLD_DATE = 0;

// Ex: this month is Aug 2022, start date is: 2022-07-31T16:00:00.000Z
export const getStartDate = (month: number) => {
    const startOfDay = new Date(currentYear, month - 1, 1).setHours(0, 0, 0, 0);
    const startDate = new Date(startOfDay);
    return startDate.toISOString();
};
// Ex: this month is Aug 2022, end date is: 2022-08-31T15:59:59.999Z
export const getEndDate = (month: number) => {
    const endOfDay = new Date(currentYear, month, 0).setHours(23, 59, 59, 999);
    const endDate = new Date(endOfDay);
    return endDate.toISOString();
};

const DateFilter = ({
    setDateFilterRange,
}: {
    setDateFilterRange: (filter: DateFilterRange) => void;
}) => {
    const t = useTranslate();
    const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterValues>("all");

    const dateFilterLabel = t("resources.input.dateFilter");

    const dateFilterOptions: OptionSelectType[] = [
        { id: "all", value: t("resources.choices.dateFilters.ALL") },
        {
            id: "thisMonth",
            value: t("resources.choices.dateFilters.THIS_MONTH"),
        },
        {
            id: "lastMonth",
            value: t("resources.choices.dateFilters.LAST_MONTH"),
        },
        {
            id: "thisYear",
            value: t("resources.choices.dateFilters.THIS_YEAR"),
        },
    ];

    const handleFilterChange = useCallback(
        (e) => {
            const dateFilterValue = e.target.value;
            setSelectedDateFilter(dateFilterValue as DateFilterValues);
            switch (dateFilterValue) {
                case "all":
                    setDateFilterRange({
                        startDate: new Date(OLD_DATE).toISOString(), //1970-01-01T00:00:00.000Z
                        endDate: getEndDate(currentMonth),
                    });
                    break;
                case "thisMonth":
                    setDateFilterRange({
                        startDate: getStartDate(currentMonth),
                        endDate: getEndDate(currentMonth),
                    });
                    break;
                case "lastMonth":
                    setDateFilterRange({
                        startDate: getStartDate(prevMonth),
                        endDate: getEndDate(prevMonth),
                    });
                    break;
                case "thisYear":
                    setDateFilterRange({
                        startDate: getStartDate(JANUARY),
                        endDate: getEndDate(DECEMBER),
                    });
                    break;
                default:
                    return;
            }
        },
        [setDateFilterRange]
    );

    return (
        <Box mb={2} display="inline-block">
            <FormControl sx={{ minWidth: 194 }} size="small">
                <InputLabel id="StudentEntryExitRecords-dateFilter-label">
                    {dateFilterLabel}
                </InputLabel>
                <SelectBase
                    label={dateFilterLabel}
                    labelId={"StudentEntryExitRecords-dateFilter-label"}
                    data-testid="StudentEntryExitRecords__dateFilter"
                    value={selectedDateFilter}
                    options={dateFilterOptions}
                    isTranslated={false}
                    onChange={handleFilterChange}
                />
            </FormControl>
        </Box>
    );
};

export default DateFilter;
