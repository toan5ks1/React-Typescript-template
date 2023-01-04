import { ERPModules } from "src/common/constants/enum";
import { choiceRelationship, choiceRelationshipV2 } from "src/squads/user/common/constants/choices";
import { translateForChoices } from "src/squads/user/common/utils/choice";

import { Grid } from "@mui/material";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import PhoneInputHF from "src/squads/user/components/PhoneInput";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

const FormSearchParent = () => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const validateRules = {
        required: {
            value: true,
            message: t("resources.input.error.required"),
        },
    };

    const isShowRelationship = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_RELATIONSHIP_PARENTS"
    );
    const choices = translateForChoices(
        isShowRelationship ? choiceRelationshipV2 : choiceRelationship,
        t
    );

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={3}>
                <Grid item xs={6}>
                    <TextFieldHF
                        name="name"
                        label={tStudents("labels.name")}
                        required
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            "data-testid": "FormSearchParent__inputName",
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SelectHF
                        name="relationship"
                        label={tStudents("labels.relationship")}
                        data-testid="FormSearchParent__selectRelationship"
                        required
                        options={choices}
                        rules={validateRules}
                    />
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item xs={6}>
                    <PhoneInputHF
                        name="phoneNumber"
                        nameCountryCode="countryCode"
                        xsFlag={4}
                        label={tStudents("labels.phoneNumber")}
                        InputProps={{
                            readOnly: true,
                        }}
                        SelectProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextFieldHF
                        name="email"
                        type="email"
                        required
                        label={tStudents("labels.email")}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            "data-testid": "FormSearchParent__inputEmail",
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FormSearchParent;
