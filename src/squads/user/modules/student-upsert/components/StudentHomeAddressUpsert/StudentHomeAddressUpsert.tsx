import { ERPModules } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

const StudentHomeAddressUpsert = () => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    return (
        <>
            <Box mb={2}>
                <TypographyHeader>Home Address</TypographyHeader>
            </Box>
            <Grid container data-testid="StudentHomeAddressUpsert__homeAddress">
                <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                    <Grid item xs={6} p={1}>
                        <TextFieldHF
                            name="homeAddress.postalCode"
                            label={tStudents("labels.postalCode")}
                            inputProps={{
                                "data-testid": "StudentHomeAddressUpsert__inputPostalCode",
                                maxLength: 10,
                            }}
                            data-testid="StudentHomeAddressUpsert__inputPostalCodeRoot"
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                    <Grid item xs={6} p={1}>
                        <AutocompleteHF
                            name="homeAddress.prefecture"
                            key="prefecture"
                            data-testid="StudentHomeAddressUpsert__autoCompletePrefecture"
                            id="PrefectureAutocompleteHF__autocomplete"
                            label={tStudents("labels.prefecture")}
                            optionLabelKey="prefecture_name"
                            options={[]}
                            getOptionSelectedField="prefecture_code"
                        />
                    </Grid>
                    <Grid item xs={6} p={1} pr={0}>
                        <TextFieldHF
                            name="homeAddress.city"
                            label={tStudents("labels.city")}
                            inputProps={{
                                "data-testid": "StudentHomeAddressUpsert__inputCity",
                            }}
                            data-testid="StudentHomeAddressUpsert__inputCityRoot"
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                    <Grid item xs={6} p={1}>
                        <TextFieldHF
                            name="homeAddress.firstStreet"
                            label={tStudents("labels.firstStreet")}
                            inputProps={{
                                "data-testid": "StudentHomeAddressUpsert__inputFirstStreet",
                            }}
                            data-testid="StudentHomeAddressUpsert__inputFirstStreetRoot"
                        />
                    </Grid>
                    <Grid item xs={6} p={1} pr={0}>
                        <TextFieldHF
                            name="homeAddress.secondStreet"
                            label={tStudents("labels.secondStreet")}
                            inputProps={{
                                "data-testid": "StudentHomeAddressUpsert__inputSecondStreet",
                            }}
                            data-testid="StudentHomeAddressUpsert__inputSecondStreetRoot"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default StudentHomeAddressUpsert;
