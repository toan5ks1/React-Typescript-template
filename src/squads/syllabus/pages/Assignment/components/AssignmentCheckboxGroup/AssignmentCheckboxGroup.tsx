import { EurekaEntities } from "src/common/constants/enum";
import { SettingAssignment } from "src/squads/syllabus/models/assignment";
import { $enum } from "ts-enum-util";

import { FormControlLabel } from "@mui/material";
import CheckboxBase from "src/components/Checkboxes/CheckboxBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface AssignmentCheckboxGroupProps {
    checkedSetting: boolean;
    keySetting: string;
}

const AssignmentCheckboxGroup = ({
    checkedSetting,
    keySetting: key,
}: AssignmentCheckboxGroupProps) => {
    const tAssignment = useResourceTranslate(EurekaEntities.ASSIGNMENTS);

    const name = $enum(SettingAssignment).getKeyOrDefault(key) || "";

    return (
        <FormControlLabel
            key={key}
            control={
                <CheckboxBase
                    disabled
                    name={key}
                    sx={(theme) => ({
                        color: `${theme.palette.success.main} !important`,
                        "& + span": {
                            color: `${theme.palette.text.primary} !important`,
                        },
                    })}
                    checked={checkedSetting || false}
                />
            }
            label={tAssignment(name)}
        />
    );
};

export default AssignmentCheckboxGroup;
