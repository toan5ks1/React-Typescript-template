import { useMemo } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { EurekaEntities, MIMETypes } from "src/common/constants/enum";
import { SettingAssignment } from "src/squads/syllabus/models/assignment";

import { Box, FormGroup, Grid, SelectChangeEvent } from "@mui/material";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import FormUploadMaterials from "src/squads/syllabus/components/Form/FormUploadMaterials";

import { AssignmentFormValues } from "../../common/types";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useHookFormField from "src/squads/syllabus/hooks/useHookFormField";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const AssignmentForm = () => {
    const t = useTranslate();
    const tAssignment = useResourceTranslate(EurekaEntities.ASSIGNMENTS);
    const { getValues, setValue, trigger } = useFormContext<AssignmentFormValues>();
    const isRequiredGrade = useWatch<AssignmentFormValues, "is_required_grade">({
        name: "is_required_grade",
    });
    const [files, setFiles] = useHookFormField<AssignmentFormValues, (File | Media)[]>(
        "files",
        getValues("files")
    );
    const validationRules = {
        name: { required: { value: true, message: t("resources.input.error.required") } },
        maxGrade: {
            required: { value: true, message: t("resources.input.error.required") },
            min: 1,
        },
    };

    const settings = useMemo(
        () => [
            {
                id: SettingAssignment.requireTextNoteSubmission,
                name: tAssignment("requireTextNoteSubmission"),
            },
            {
                id: SettingAssignment.requireAttachmentSubmission,
                name: tAssignment("requireAttachmentSubmission"),
            },
            {
                id: SettingAssignment.requireRecordedVideoSubmission,
                name: tAssignment("requireRecordedVideoSubmission"),
            },
            {
                id: SettingAssignment.allowLateSubmission,
                name: tAssignment("allowLateSubmission"),
            },
            {
                id: SettingAssignment.allowResubmission,
                name: tAssignment("allowResubmission"),
            },
        ],
        [tAssignment]
    );

    const grades = useMemo(
        () => [
            { id: "true", value: tAssignment("value") },
            { id: "false", value: tAssignment("doesNotRequireGrading") },
        ],
        [tAssignment]
    );

    const handleGradingMethodChange = ({ target: { value } }: SelectChangeEvent<unknown>) => {
        setValue("is_required_grade", JSON.parse(value as string));
        void trigger("max_grade");
    };

    return (
        <Box data-testid="AssignmentForm__root" height={520}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={4}>
                    <PaperSectionWrapper>
                        <TypographyBase variant="h6">{tAssignment(`attachment`)}</TypographyBase>
                        <Box mt={2}>
                            <FormUploadMaterials
                                files={files as Media[]}
                                isBrightCoveOptional
                                formUploadFileProps={{
                                    multiple: true,
                                    accept: [
                                        MIMETypes.PDF,
                                        MIMETypes.AUDIO,
                                        MIMETypes.IMAGE,
                                        MIMETypes.VIDEO,
                                    ],
                                }}
                                //TODO: @syllabus fix error onChange
                                //@ts-ignore
                                onChange={setFiles}
                            />
                        </Box>
                    </PaperSectionWrapper>
                </Grid>
                <Grid item sm={12} md={8}>
                    <PaperSectionWrapper>
                        <TypographyBase variant="h6">
                            {tAssignment(`assignmentInfo`)}
                        </TypographyBase>
                        <Box mt={2}>
                            <Grid container spacing={6}>
                                <Grid item sm={12}>
                                    <TextFieldHF
                                        name="name"
                                        label={tAssignment("name")}
                                        rules={validationRules.name}
                                        inputProps={{
                                            "data-testid": "AssignmentForm__name",
                                            id: "name",
                                        }}
                                    />
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item sm={6}>
                                        <SelectHF
                                            id="is_required_grade"
                                            name="is_required_grade"
                                            label={tAssignment("gradingMethod")}
                                            options={grades}
                                            onChange={handleGradingMethodChange}
                                            data-testid="AssignmentForm__gradingMethod"
                                        />
                                    </Grid>
                                    <Grid item sm={6}>
                                        {isRequiredGrade && (
                                            <TextFieldHF
                                                name="max_grade"
                                                label={tAssignment("maxGrade")}
                                                type="number"
                                                inputProps={{
                                                    min: 1,
                                                    "data-testid": "AssignmentForm__maxGrade",
                                                }}
                                                rules={validationRules.maxGrade}
                                                InputProps={{
                                                    id: "max_grade",
                                                }}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                    <TextFieldHF
                                        multiline
                                        rows={4}
                                        name="instruction"
                                        inputProps={{
                                            "data-testid": "AssignmentForm__instruction",
                                            id: "instruction",
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <FormGroup row>
                                        {settings.map((setting) => (
                                            <CheckboxLabelHF
                                                key={setting.id}
                                                name={`settings.${setting.id}`}
                                                label={setting.name}
                                                checkBoxProps={{
                                                    id: `settings_${setting.id}`,
                                                    name: `settings.${setting.id}`,
                                                }}
                                            />
                                        ))}
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Box>
                    </PaperSectionWrapper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AssignmentForm;
