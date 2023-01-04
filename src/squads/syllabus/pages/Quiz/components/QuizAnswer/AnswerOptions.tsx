import { Entities } from "src/common/constants/enum";
import { ExtendedLabelTypes, LabelTypes } from "src/common/utils/label-generator";
import { AnswerField } from "src/squads/syllabus/models/quiz";

import { FormControlLabel, Checkbox, FormGroup, Box } from "@mui/material";
import type { SelectChangeEvent, Theme } from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";
import { formControlClasses } from "@mui/material/FormControl";
import ListLabelSelect from "src/squads/syllabus/pages/Quiz/components/Selects/ListLabelSelect";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    root: (theme: Theme) => ({
        marginBottom: theme.spacing(3),
        [`& .${formControlClasses.fullWidth}`]: {
            width: "120px",
        },
    }),
    makeIntoList: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "1.5rem",
        maxWidth: "80%",

        "& > :first-of-type": (theme: Theme) => ({
            marginLeft: theme.spacing(1.5),
        }),
    },
    applyOption: {
        [`&.${checkboxClasses.checked}`]: (theme: Theme) => ({
            color: theme.palette.blue?.[500],
        }),
    },
};

export interface AnswerOptionsProps {
    labelType: AnswerField["labelType"];
    configs: AnswerField["configs"];
    onChangeLabelType: (labelType: AnswerField["labelType"]) => void;
}

const AnswerOptions = (props: AnswerOptionsProps) => {
    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const { labelType, onChangeLabelType } = props;

    return (
        <Box sx={sx.root}>
            <Box sx={sx.makeIntoList}>
                <FormGroup row>
                    <FormControlLabel
                        data-testid="AnswerOptions__highlightRadio"
                        label={tQuiz("makeIntoList")}
                        checked={!!labelType}
                        control={
                            <Checkbox
                                sx={sx.applyOption}
                                onChange={() =>
                                    onChangeLabelType(labelType ? null : LabelTypes.NUMBER)
                                }
                            />
                        }
                    />
                </FormGroup>
                <ListLabelSelect<ExtendedLabelTypes>
                    size="small"
                    disabled={!labelType}
                    readOnly={!labelType}
                    value={labelType ?? ""}
                    onChange={(e: SelectChangeEvent<any>) =>
                        onChangeLabelType(e.target.value as LabelTypes)
                    }
                    data-testid="AnswerOption__selectedList"
                />
            </Box>
        </Box>
    );
};

export default AnswerOptions;
