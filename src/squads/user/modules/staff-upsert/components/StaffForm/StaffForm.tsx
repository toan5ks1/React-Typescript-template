import { Entities } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import UserGroupsAutocompleteHF from "src/squads/user/modules/staff-upsert/components/UserGroupsAutocompleteHF";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import { useEditStaffEmailFeatureFlag } from "src/squads/user/hooks/useStaffFeatureFlag";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useStaffInfoRules from "src/squads/user/modules/staff-upsert/hooks/useStaffInfoRules";

export interface StaffFormProps {
    staffId?: string;
}
export const StaffForm = ({ staffId }: StaffFormProps) => {
    const tStaff = useResourceTranslate(Entities.STAFF);
    const validateRules = useStaffInfoRules();

    const isEnabledEditStaffEmail = useEditStaffEmailFeatureFlag();
    const isEnabledAssignUserGroup = useUserFeatureToggle(
        "STAFF_MANAGEMENT_STAFF_ASSIGN_USER_GROUP"
    );

    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tStaff("titles.generalInfo")}</TypographyHeader>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextFieldHF
                                name="name"
                                label={`${tStaff("labels.name")}*`}
                                fullWidth
                                inputProps={{ "data-testid": "StaffForm__name" }}
                                rules={{
                                    required: validateRules.required,
                                }}
                                data-testid="StaffForm__nameRoot"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldHF
                                disabled={!!staffId && !isEnabledEditStaffEmail}
                                name="email"
                                label={`${tStaff("labels.email")}*`}
                                fullWidth
                                inputProps={{ "data-testid": "StaffForm__email" }}
                                rules={{
                                    required: validateRules.required,
                                    pattern: validateRules.pattern.email,
                                    ...((isEnabledEditStaffEmail || !staffId) && {
                                        validate: validateRules.validate.email,
                                    }),
                                }}
                                data-testid="StaffForm__emailRoot"
                            />
                        </Grid>
                        {isEnabledAssignUserGroup ? (
                            <Grid item xs={6}>
                                <UserGroupsAutocompleteHF
                                    label={tStaff("labels.userGroup")}
                                    name="userGroupsList"
                                    getOptionSelectedField="user_group_id"
                                    optionLabelKey="user_group_name"
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
