import { useMemo } from "react";

import { useFormContext } from "react-hook-form";
import { EurekaEntities, MIMETypes } from "src/common/constants/enum";
import { SettingTaskAssignment } from "src/squads/syllabus/models/assignment";

import { Box, FormGroup, Grid } from "@mui/material";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import FormUploadMaterials from "src/squads/syllabus/components/Form/FormUploadMaterials";

import { TaskAssignmentFormValues } from "../../common/types";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useHookFormField from "src/squads/syllabus/hooks/useHookFormField";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const sx = {
    requiredTitle: {
        fontWeight: 500,
    },
};

const TaskAssignmentForm = () => {
    const t = useTranslate();
    const tTask = useResourceTranslate(EurekaEntities.TASK_ASSIGNMENTS);

    const { getValues } = useFormContext<TaskAssignmentFormValues>();
    const [files, setFiles] = useHookFormField<TaskAssignmentFormValues, (File | Media)[]>(
        "files",
        getValues("files")
    );
    const validationRules = {
        name: { required: { value: true, message: t("resources.input.error.required") } },
    };

    const settings = useMemo(
        () => [
            {
                id: SettingTaskAssignment.requireTextNoteSubmission,
                name: tTask("requireTextNoteSubmission"),
            },
            {
                id: SettingTaskAssignment.requireDuration,
                name: tTask("requireDuration"),
            },
            {
                id: SettingTaskAssignment.requireCorrectness,
                name: tTask("requireCorrectness"),
            },
            {
                id: SettingTaskAssignment.requireUnderstandingLevel,
                name: tTask("requireUnderstandingLevel"),
            },
            {
                id: SettingTaskAssignment.requireAttachmentSubmission,
                name: tTask("requireAttachmentSubmission"),
            },
        ],
        [tTask]
    );

    return (
        <Box data-testid="TaskAssignmentForm__root">
            <Grid container spacing={3}>
                <Grid item sm={12} md={4}>
                    <PaperSectionWrapper>
                        <TypographyBase variant="h6">{tTask(`attachment`)}</TypographyBase>
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
                    </PaperSectionWrapper>
                </Grid>
                <Grid item sm={12} md={8}>
                    <PaperSectionWrapper>
                        <TypographyBase variant="h6">{tTask(`taskInformation`)}</TypographyBase>
                        <Box mt={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextFieldHF
                                        required
                                        name="name"
                                        label={tTask("name")}
                                        rules={validationRules.name}
                                        inputProps={{
                                            "data-testid": "TaskAssignmentForm__name",
                                            id: "name",
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextFieldHF
                                        multiline
                                        rows={6}
                                        name="instruction"
                                        label={tTask("description")}
                                        inputProps={{
                                            "data-testid": "TaskAssignmentForm__instruction",
                                            id: "instruction",
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TypographyBase
                                        variant="body1"
                                        sx={sx.requiredTitle}
                                        gutterBottom
                                    >
                                        {tTask("requiredItems")}
                                    </TypographyBase>
                                    <FormGroup>
                                        {settings.map((setting) => (
                                            <CheckboxLabelHF
                                                key={setting.id}
                                                name={`settings.${setting.id}`}
                                                label={setting.name}
                                                sx={{ height: "20px", mb: 1 }}
                                                checkBoxProps={{
                                                    id: `settings_${setting.id}`,
                                                    name: `settings.${setting.id}`,
                                                    size: "small",
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

export default TaskAssignmentForm;
