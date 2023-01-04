import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import TypographyBase from "src/components/Typographys/TypographyBase";

export default function SchoolFields() {
    return (
        <>
            <Box pb={2}>
                <TypographyBase variant="subtitle2">School</TypographyBase>
            </Box>
            <Grid container>
                <Grid item xs={6} pb={2}>
                    <AutocompleteHF
                        label={"School Level"}
                        name={"schoolLevel"}
                        size="small"
                        disableCloseOnSelect
                        filterSelectedOptions
                        getOptionSelectedField="school_level_id"
                        optionLabelKey={""}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} pb={1}>
                    <AutocompleteHF
                        label={"School Name"}
                        name={"schoolName"}
                        size="small"
                        disableCloseOnSelect
                        filterSelectedOptions
                        getOptionSelectedField="school_id"
                        optionLabelKey={""}
                        options={[]}
                    />
                </Grid>
                <Grid item>
                    <CheckboxLabelHF
                        name={"isSearchAllSchool"}
                        label={"Search all school in school history"}
                    />
                </Grid>
            </Grid>
        </>
    );
}
