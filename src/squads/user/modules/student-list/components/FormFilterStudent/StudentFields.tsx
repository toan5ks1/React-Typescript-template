import { ERPModules } from "src/common/constants/enum";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GradesAutocompleteHF from "src/components/Autocompletes/GradesAutocompleteHF";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import type { UseConvertFilterFieldsReturn } from "src/squads/user/modules/student-list/hooks/useConvertFilterFields";

export interface StudentFieldsProps
    extends Pick<UseConvertFilterFieldsReturn["filterFieldObjects"], "grades" | "isNotLogged"> {}

export default function StudentFields({ grades, isNotLogged }: StudentFieldsProps) {
    const tStudentErp = useResourceTranslate(ERPModules.STUDENTS);
    return (
        <>
            <Box pb={2}>
                <TypographyBase variant="subtitle2">{tStudentErp(`titles.student`)}</TypographyBase>
            </Box>
            <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                    <GradesAutocompleteHF
                        label={grades.inputLabel}
                        name={grades.name}
                        size="small"
                        disableCloseOnSelect
                        filterSelectedOptions
                        multiple
                        getOptionSelectedField="id"
                    />
                </Grid>
                <Grid item xs={12}>
                    <CheckboxLabelHF
                        name={isNotLogged.name}
                        label={isNotLogged.inputLabel}
                        data-testid="CheckboxLabelHF_isNotLogged"
                    />
                </Grid>
            </Grid>
        </>
    );
}
