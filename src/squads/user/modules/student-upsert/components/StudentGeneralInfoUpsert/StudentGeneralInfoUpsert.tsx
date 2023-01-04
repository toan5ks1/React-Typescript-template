import { memo, useMemo } from "react";

import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { choiceStatus } from "src/squads/user/common/constants/choices";
import { GenderKeys } from "src/squads/user/common/types/common";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import RadioGroupHF from "src/components/RadioGroups/RadioGroupHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import LocationSelectInputHF from "src/squads/user/components/LocationSelectInputHF";
import PhoneInputHF from "src/squads/user/components/PhoneInput";

import useGradeMap from "src/squads/user/hooks/useGradeMap";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useStudentInfoRules from "src/squads/user/modules/student-upsert/hooks/useStudentInfoRules";

export interface StudentGeneralInfoUpsertProps {
    mode: ModeOpenDialog;
}

const StudentGeneralInfoUpsert = memo(({ mode }: StudentGeneralInfoUpsertProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();
    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");

    const { choiceGrades } = useGradeMap();

    const validateRules = useStudentInfoRules();

    const statusOptions = useMemo(
        () =>
            choiceStatus.map((status: OptionSelectType) => ({
                id: status.label,
                value: t(status.value.toString()),
            })),
        [t]
    );

    const isEditMode = useMemo(() => mode === ModeOpenDialog.EDIT, [mode]);

    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tStudents("titles.generalInfo")}</TypographyHeader>
            </Box>
            {isShowNamePhonetic ? (
                <Grid container data-testid="FormStudentInfo__generalInfo" pb={1}>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.lastName"
                                required
                                label={tStudents("labels.lastName")}
                                rules={{ required: validateRules.required }}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputLastName",
                                }}
                                data-testid="FormStudentInfo__inputLastNameRoot"
                            />
                        </Grid>
                        <Grid item xs={6} p={1} pr={0}>
                            <TextFieldHF
                                name="generalInfo.firstName"
                                required
                                label={tStudents("labels.firstName")}
                                rules={{ required: validateRules.required }}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputFirstName",
                                }}
                                data-testid="FormStudentInfo__inputFirstNameRoot"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.lastNamePhonetic"
                                label={tStudents("labels.lastNamePhonetic")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputLastNamePhonetic",
                                }}
                                data-testid="FormStudentInfo__inputLastNamePhoneticRoot"
                            />
                        </Grid>
                        <Grid item xs={6} p={1} pr={0}>
                            <TextFieldHF
                                name="generalInfo.firstNamePhonetic"
                                label={tStudents("labels.firstNamePhonetic")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputFirstNamePhonetic",
                                }}
                                data-testid="FormStudentInfo__inputFirstNamePhoneticRoot"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.email"
                                type="email"
                                label={tStudents("labels.email")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputEmail",
                                }}
                                required
                                rules={{
                                    required: validateRules.required,
                                    pattern: validateRules.pattern.email,
                                    validate: validateRules.validate.email,
                                }}
                                data-testid="FormStudentInfo__inputEmailRoot"
                            />
                        </Grid>

                        <Grid item xs={6} p={1} pr={0}>
                            <PhoneInputHF
                                name="generalInfo.phoneNumber"
                                nameCountryCode="generalInfo.countryCode"
                                label={tStudents("labels.phoneNumber")}
                                rules={{
                                    validate: validateRules.validate.phone,
                                }}
                                InputProps={{ readOnly: isEditMode }}
                                SelectProps={{ readOnly: isEditMode }}
                                xsFlag={2}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        {arrayHasItem(choiceGrades) ? (
                            <Grid item xs={6} p={1}>
                                <AutocompleteHF
                                    name="generalInfo.grade"
                                    key="grade"
                                    data-testid="FormStudentInfo__autoCompleteGrade"
                                    id="GradeAutocompleteHF__autocomplete"
                                    label={tStudents("labels.grade")}
                                    optionLabelKey="name"
                                    options={choiceGrades || []}
                                    rules={{
                                        required: validateRules.required,
                                    }}
                                    required
                                    getOptionSelectedField="id"
                                />
                            </Grid>
                        ) : null}

                        <Grid item xs={6} p={1} pr={0}>
                            <AutocompleteHF
                                name="generalInfo.enrollmentStatus"
                                label={tStudents("enrollmentStatus")}
                                data-testid="FormStudentInfo__autocompleteStatus"
                                id="EnrollmentStatusAutocompleteHF__autocomplete"
                                required
                                optionLabelKey="value"
                                options={statusOptions}
                                rules={{ required: validateRules.required }}
                                getOptionSelectedField="id"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <DatePickerHF
                                name="generalInfo.birthday"
                                label={tStudents("labels.birthday")}
                                InputProps={{
                                    "data-testid": "FormStudentInfo__inputStudentBirthday",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} p={0}>
                            <TypographyBase color="textSecondary" variant="body2">
                                {tStudents("labels.gender")}
                            </TypographyBase>
                            <RadioGroupHF
                                sxRadio={(theme) => ({
                                    padding: theme.spacing(0, 1.2),
                                })}
                                name="generalInfo.gender"
                                data-testid="FormStudentInfo__inputStudentGender"
                                options={[
                                    {
                                        id: GenderKeys.MALE,
                                        value: tStudents("labels.male"),
                                    },
                                    {
                                        id: GenderKeys.FEMALE,
                                        value: tStudents("labels.female"),
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.studentExternalId"
                                label={tStudents("labels.externalStudentID")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputExternalStudentID",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} p={1} pr={0}>
                            <LocationSelectInputHF
                                label={tStudents("labels.location")}
                                name="generalInfo.locations"
                                getOptionSelectedField="locationId"
                                titleDialog={tStudents("titles.dialogSelectLocation")}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pr={0}>
                        <Grid item xs={6} px={1}>
                            <TextFieldHF
                                name="generalInfo.studentNote"
                                label={tStudents("labels.note")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputStudentNote",
                                }}
                                multiline
                                rows={6.215}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid container data-testid="FormStudentInfo__generalInfo" pb={1}>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.name"
                                required
                                label={tStudents("labels.name")}
                                rules={{ required: validateRules.required }}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputName",
                                }}
                                data-testid="FormStudentInfo__inputNameRoot"
                            />
                        </Grid>
                        <Grid item xs={6} p={1} pr={0}>
                            <AutocompleteHF
                                name="generalInfo.enrollmentStatus"
                                label={tStudents("enrollmentStatus")}
                                data-testid="FormStudentInfo__autocompleteStatus"
                                id="EnrollmentStatusAutocompleteHF__autocomplete"
                                required
                                optionLabelKey="value"
                                options={statusOptions}
                                rules={{ required: validateRules.required }}
                                getOptionSelectedField="id"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <TextFieldHF
                                name="generalInfo.email"
                                type="email"
                                label={tStudents("labels.email")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputEmail",
                                }}
                                required
                                rules={{
                                    required: validateRules.required,
                                    pattern: validateRules.pattern.email,
                                    validate: validateRules.validate.email,
                                }}
                                data-testid="FormStudentInfo__inputEmailRoot"
                            />
                        </Grid>

                        {arrayHasItem(choiceGrades) ? (
                            <Grid item xs={6} p={1} pr={0}>
                                <AutocompleteHF
                                    name="generalInfo.grade"
                                    key="grade"
                                    data-testid="FormStudentInfo__autoCompleteGrade"
                                    id="GradeAutocompleteHF__autocomplete"
                                    label={tStudents("labels.grade")}
                                    optionLabelKey="name"
                                    options={choiceGrades || []}
                                    rules={{
                                        required: validateRules.required,
                                    }}
                                    required
                                    getOptionSelectedField="id"
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <PhoneInputHF
                                name="generalInfo.phoneNumber"
                                nameCountryCode="generalInfo.countryCode"
                                label={tStudents("labels.phoneNumber")}
                                rules={{
                                    validate: validateRules.validate.phone,
                                }}
                                InputProps={{ readOnly: isEditMode }}
                                SelectProps={{ readOnly: isEditMode }}
                                xsFlag={2}
                            />
                        </Grid>
                        <Grid item xs={6} p={1} pr={0}>
                            <TextFieldHF
                                name="generalInfo.studentExternalId"
                                label={tStudents("labels.externalStudentID")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputExternalStudentID",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <DatePickerHF
                                name="generalInfo.birthday"
                                label={tStudents("labels.birthday")}
                                InputProps={{
                                    "data-testid": "FormStudentInfo__inputStudentBirthday",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} p={0}>
                            <TypographyBase color="textSecondary" variant="body2">
                                {tStudents("labels.gender")}
                            </TypographyBase>
                            <RadioGroupHF
                                sxRadio={(theme) => ({
                                    padding: theme.spacing(0, 1.2),
                                })}
                                name="generalInfo.gender"
                                data-testid="FormStudentInfo__inputStudentGender"
                                options={[
                                    {
                                        id: GenderKeys.MALE,
                                        value: tStudents("labels.male"),
                                    },
                                    {
                                        id: GenderKeys.FEMALE,
                                        value: tStudents("labels.female"),
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                        <Grid item xs={6} p={1}>
                            <LocationSelectInputHF
                                label={tStudents("labels.location")}
                                name="generalInfo.locations"
                                getOptionSelectedField="locationId"
                                titleDialog={tStudents("titles.dialogSelectLocation")}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2} pr={0}>
                        <Grid item xs={6} px={1}>
                            <TextFieldHF
                                name="generalInfo.studentNote"
                                label={tStudents("labels.note")}
                                inputProps={{
                                    "data-testid": "FormStudentInfo__inputStudentNote",
                                }}
                                multiline
                                rows={6.215}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
});
export default StudentGeneralInfoUpsert;
