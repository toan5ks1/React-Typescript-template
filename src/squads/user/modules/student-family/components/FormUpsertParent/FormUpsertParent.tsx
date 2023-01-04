import { ERPModules } from "src/common/constants/enum";
import { choiceRelationship, choiceRelationshipV2 } from "src/squads/user/common/constants/choices";
import { ParentUpdateInfo } from "src/squads/user/common/types";
import { translateForChoices } from "src/squads/user/common/utils/choice";

import { Grid } from "@mui/material";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import PhoneInputHF from "src/squads/user/components/PhoneInput";

import { StudentParentDataType } from "src/squads/user/hooks/useParentMapStudent";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useParentValidateRules from "src/squads/user/modules/student-family/hooks/useParentValidateRules";

export interface FormUpsertParentProps {
    parents: StudentParentDataType[];
    parentUpdate?: ParentUpdateInfo;
}

const FormUpsertParent = ({ parents, parentUpdate }: FormUpsertParentProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const validateRules = useParentValidateRules(parents, parentUpdate);

    const isUpdateMode = !!parentUpdate?.parent?.userId;

    const isShowRelationship = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_RELATIONSHIP_PARENTS"
    );
    const choices = translateForChoices(
        isShowRelationship ? choiceRelationshipV2 : choiceRelationship,
        t
    );
    return (
        <Grid container spacing={2} style={{ overflow: "hidden" }}>
            <Grid item container spacing={3}>
                <Grid item xs={6}>
                    <TextFieldHF
                        name="name"
                        label={tStudents("labels.name")}
                        required
                        rules={{ required: validateRules.required }}
                        inputProps={{
                            "data-testid": "FormUpsertParent__inputName",
                        }}
                        InputProps={{
                            readOnly: isUpdateMode,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    {choices && choices.length >= 0 ? (
                        <SelectHF
                            name="relationship"
                            label={tStudents("labels.relationship")}
                            data-testid="FormUpsertParent__selectRelationship"
                            required
                            options={choices}
                            rules={{
                                required: validateRules.required,
                                validate: validateRules.validate.relationship,
                            }}
                        />
                    ) : null}
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item xs={6}>
                    <PhoneInputHF
                        name="phoneNumber"
                        nameCountryCode="countryCode"
                        xsFlag={4}
                        label={tStudents("labels.phoneNumber")}
                        rules={{
                            validate: validateRules.validate.phone,
                        }}
                        InputProps={{
                            readOnly: isUpdateMode,
                        }}
                        SelectProps={{
                            readOnly: isUpdateMode,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextFieldHF
                        name="email"
                        type="email"
                        rules={{
                            required: validateRules.required,
                            pattern: validateRules.pattern.email,
                            validate: validateRules.validate.email,
                        }}
                        required
                        label={tStudents("labels.email")}
                        inputProps={{
                            "data-testid": "FormUpsertParent__inputEmail",
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FormUpsertParent;
