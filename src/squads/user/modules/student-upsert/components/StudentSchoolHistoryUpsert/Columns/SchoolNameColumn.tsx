import { memo } from "react";

import AutocompleteTooltipHF from "src/squads/user/components/Autocomplete/AutocompleteTooltipHF";

import { SchoolHistoryColumnsProps } from "./types";

interface SchoolNameColumnProps extends SchoolHistoryColumnsProps {
    name: string;
}

function SchoolNameColumn(props: SchoolNameColumnProps) {
    return (
        <AutocompleteTooltipHF
            options={[]}
            name={props.name}
            optionLabelKey={""}
            getOptionSelectedField={""}
        />
    );
}

export default memo(SchoolNameColumn);
