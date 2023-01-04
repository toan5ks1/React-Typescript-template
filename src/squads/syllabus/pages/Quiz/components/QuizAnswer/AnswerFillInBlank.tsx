import { ChangeEvent, memo, useCallback } from "react";

import { ContentState, EditorState } from "draft-js";
import { Entities, Features } from "src/common/constants/enum";
import { pick1stElement } from "src/common/utils/other";
import { Answer, Quiz, QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import Asterisk from "src/squads/syllabus/pages/Quiz/components/Asterisk";
import ListLabel from "src/squads/syllabus/pages/Quiz/components/ListLabel";

import HandwritingSetting from "../HandwritingSetting";
import AnswerFillInBlankInput from "./AnswerFillInBlankInput";
import DeleteAnswerButton from "./DeleteAnswerButton";
import { CommonAnswerProps } from "./types";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { isMainAnswerFIB } from "src/squads/syllabus/pages/Quiz/common/utils";

export interface AnswerFillInBlankProps
    extends Omit<
        CommonAnswerProps,
        "onChange" | "content" | "quizType" | "correct" | "label" | "onDelete"
    > {
    index: number;
    readOnly?: boolean;
    labelType: Quiz["answer"]["labelType"];
    onChangeLabel: (id: string, newVal: string) => void;
    onChange: (id: string, text: EditorState) => void;
    onChangeAttributeConfigs: (
        params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ) => void;
    list: Answer[];
    onAddNewAnswer: (params: NsQuizAction.AddNewAnswer["payload"]) => void;
    onDeleteGroup: (id: string) => void;
    onDelete: (id: string) => void;
}

export const getOptionValue = (answer: Answer) => {
    return answer.attribute?.configs[0] || QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE;
};

const AnswerFillInBlank = (props: AnswerFillInBlankProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const {
        index: mainIndex,
        labelType,
        list,
        readOnly,
        onChange,
        onChangeAttributeConfigs,
        onDelete,
        onChangeLabel,
        onAddNewAnswer,
        onDeleteGroup,
    } = props;

    const { isEnabled: isHandwritingEnabled } = useFeatureToggle(
        Features.SYLLABUS_QUIZ_HANDWRITING
    );

    const _onChangeLabel = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        onChangeLabel(id, e.target.value);
    };

    const _onChangeAttributeConfigs = useCallback(
        (e: SelectChangeEvent<any>, answerList: Answer[]) => {
            answerList.forEach((answer) => {
                const value =
                    e.target.value === QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE
                        ? []
                        : [e.target.value as QuizItemAttributeConfig];

                onChangeAttributeConfigs({
                    answerId: answer.id,
                    value,
                });
            });
        },
        [onChangeAttributeConfigs]
    );

    const _onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
            onChange(
                id,
                EditorState.createWithContent(ContentState.createFromText(e.target.value))
            );
        },
        [onChange]
    );

    const _onAddNewAnswer = useCallback(() => {
        const first = pick1stElement(list);
        if (first && first.groupKey && first.attribute.configs) {
            onAddNewAnswer({
                answerAttributeConfigs: first.attribute.configs,
                groupKey: first.groupKey,
            });
        }
    }, [list, onAddNewAnswer]);

    const _onDeleteGroup = () => {
        const answer = pick1stElement(list);
        if (answer && answer.groupKey) onDeleteGroup(answer.groupKey);
    };

    if (list.length === 0) return null;

    return (
        <Box data-testid="AnswerFillInBlank__root">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <TypographyBase variant="subtitle2">
                    {t("answer")} {mainIndex}&nbsp;
                    <Asterisk />
                </TypographyBase>

                <DeleteAnswerButton onClick={_onDeleteGroup} />
            </Box>
            <Grid container alignItems="start">
                <Grid item xs={2} pr={2}>
                    {labelType ? (
                        <ListLabel
                            type={labelType}
                            label={(pick1stElement(list) as Answer).label}
                            readOnly={readOnly}
                            onChange={(e) =>
                                _onChangeLabel(e, (pick1stElement(list) as Answer)?.id)
                            }
                        />
                    ) : null}
                </Grid>
                <Grid container item xs={10}>
                    {list.map((value, index) => {
                        return (
                            <Grid
                                container
                                item
                                key={index}
                                alignItems="center"
                                mt={isMainAnswerFIB(index) ? 0 : 1}
                            >
                                <Grid item xs={isHandwritingEnabled ? 9 : 10} pr={1}>
                                    <AnswerFillInBlankInput
                                        id={value.id}
                                        content={value.content}
                                        mainAnswerNumber={mainIndex}
                                        alternativeIndex={index}
                                        onChange={_onChange}
                                        readOnly={readOnly}
                                    />
                                </Grid>
                                <Grid item xs={isHandwritingEnabled ? 3 : 2}>
                                    {isMainAnswerFIB(index) ? (
                                        isHandwritingEnabled ? (
                                            <HandwritingSetting
                                                value={getOptionValue(value)}
                                                onChange={(e) => _onChangeAttributeConfigs(e, list)}
                                                data-testid="AnswerFillInBlank__handwritingSetting"
                                            />
                                        ) : null
                                    ) : (
                                        <ButtonBase
                                            variant="text"
                                            color="error"
                                            disableRipple
                                            startIcon={<CloseIcon />}
                                            onClick={() => onDelete(value.id)}
                                            data-testid="AnswerFillInBlank__removeAlternative"
                                        >
                                            {t("removeTheAnswer")}
                                        </ButtonBase>
                                    )}
                                </Grid>
                            </Grid>
                        );
                    })}
                    <Grid item xs={12} mt={1}>
                        <ButtonBase
                            variant="text"
                            color="primary"
                            data-testid="AnswerFillInBlank__addAlternative"
                            disableRipple
                            onClick={_onAddNewAnswer}
                            startIcon={<AddCircleIcon />}
                        >
                            {t("addAlternative")}
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(AnswerFillInBlank);
