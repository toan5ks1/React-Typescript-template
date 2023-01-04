import { useCallback } from "react";

import { Quiz, QuizOptionConfig } from "src/squads/syllabus/models/quiz";

import { Box, Grid } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import TypographyBase from "src/components/Typographys/TypographyBase";

import FormControlLabel from "../FormControlLabel";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface QuizAnswerSettingProps {
    settingValues: Quiz["answer"]["configs"];
    settings: Quiz["answer"]["configs"];
    onChangeAnswerConfigs: (configs: QuizOptionConfig | QuizOptionConfig[]) => void;
}

const pathKeyTranslate: string = "resources.choices.answerConfigs";

const QuizAnswerSetting = (props: QuizAnswerSettingProps) => {
    const t = useTranslate();
    const { settings, settingValues, onChangeAnswerConfigs } = props;

    const onChange = useCallback(
        (config: QuizOptionConfig) => {
            onChangeAnswerConfigs(config);
        },
        [onChangeAnswerConfigs]
    );

    const isSettingSelected = (setting: QuizOptionConfig) => {
        switch (setting) {
            case QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE:
                return !settingValues.includes(setting);
            default:
                return settingValues.includes(setting);
        }
    };

    return (
        <Box marginTop={3}>
            <Grid container>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <TypographyBase variant="subtitle2">
                            {t("resources.quizzes.answerConfigs")}
                        </TypographyBase>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {settings.map((setting) => {
                        const labelTranslated = t(`${pathKeyTranslate}.${setting}`);

                        return (
                            <FormControlLabel
                                key={setting}
                                checked={isSettingSelected(setting)}
                                control={
                                    <Checkbox
                                        color="primary"
                                        name="checkbox"
                                        sx={(theme) => ({
                                            background: theme.palette.common.white,
                                            [`&.${checkboxClasses.checked}`]: {
                                                color: theme.palette.blue?.[500],
                                            },
                                        })}
                                        onChange={() => onChange(setting)}
                                    />
                                }
                                label={labelTranslated}
                                data-testid="QuizAnswerSetting__formLabel"
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Box>
    );
};

export default QuizAnswerSetting;
