import Box from "@mui/material/Box";
import CoursesAutocompleteHF from "src/components/Autocompletes/CoursesAutocompleteHF";
import TypographyBase from "src/components/Typographys/TypographyBase";

import type { UseConvertFilterFieldsReturn } from "src/squads/user/modules/student-list/hooks/useConvertFilterFields";

export interface StudyItemFieldsProps
    extends Pick<UseConvertFilterFieldsReturn["filterFieldObjects"], "courses"> {}

export default function StudyItemFields({ courses }: StudyItemFieldsProps) {
    return (
        <>
            <Box pb={2}>
                <TypographyBase variant="subtitle2">Study Item</TypographyBase>
            </Box>
            <CoursesAutocompleteHF
                label={courses.inputLabel}
                name={courses.name}
                size="small"
                disableCloseOnSelect
                filterSelectedOptions
                getOptionSelectedField="course_id"
            />
        </>
    );
}
