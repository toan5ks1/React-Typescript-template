import { memo } from "react";

import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";

import { SchoolHistoryColumnsProps } from "./types";

export interface CourseColumnProps extends SchoolHistoryColumnsProps {}

function CourseColumn({ name }: CourseColumnProps) {
    return (
        <AutocompleteHF name={name} optionLabelKey={""} getOptionSelectedField={""} options={[]} />
    );
}

export default memo(CourseColumn);
