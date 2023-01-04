import { memo } from "react";

import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";

import { SchoolHistoryColumnsProps } from "./types";

export interface LevelColumnProps extends SchoolHistoryColumnsProps {}
function LevelColumn({ name }: LevelColumnProps) {
    return (
        <AutocompleteHF name={name} optionLabelKey={""} getOptionSelectedField={""} options={[]} />
    );
}
export default memo(LevelColumn);
