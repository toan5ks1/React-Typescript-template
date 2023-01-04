import { memo } from "react";

import DatePickerHF from "src/components/DatePickers/DatePickerHF";

import { SchoolHistoryColumnsProps } from "./types";

interface StartDateColumnProps extends SchoolHistoryColumnsProps {
    name: string;
}
function StartDateColumn({ name }: StartDateColumnProps) {
    return <DatePickerHF name={name} />;
}
export default memo(StartDateColumn);
