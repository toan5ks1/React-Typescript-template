import { memo } from "react";

import DatePickerHF from "src/components/DatePickers/DatePickerHF";

import { SchoolHistoryColumnsProps } from "./types";

export interface EndDateColumnProps extends SchoolHistoryColumnsProps {}

function EndDateColumn({ name }: EndDateColumnProps) {
    return <DatePickerHF name={name} />;
}
export default memo(EndDateColumn);
