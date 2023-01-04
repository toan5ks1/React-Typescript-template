import { FC, useCallback, useMemo, useRef, useState } from "react";

import { useFormContext } from "react-hook-form";
import { KeyLOTypes } from "src/common/constants/const";
import { Entities } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { $enum } from "ts-enum-util";

import { SelectChangeEvent } from "@mui/material";
import SelectHF from "src/components/Select/SelectHF";

import ConfirmDialog from "./ConfirmDialog";

import isNil from "lodash/isNil";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import QuizV2, { createDefaultAnswerFieldV2, QuizType } from "src/squads/syllabus/models/quizV2";
import { useQuizContext } from "src/squads/syllabus/pages/QuizV2/contexts/QuizContext";
import useQuizValidation from "src/squads/syllabus/pages/QuizV2/hooks/useQuizValidation";

const quizTypeValues = $enum(QuizType).getValues();

export const filterTypesByOnLOType = (loType: keyof typeof KeyLOTypes) => {
    if (loType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING) {
        return quizTypeValues.filter(
            (type) =>
                type === QuizType.QUIZ_TYPE_MCQ ||
                type === QuizType.QUIZ_TYPE_FIB ||
                type === QuizType.QUIZ_TYPE_MIQ ||
                type === QuizType.QUIZ_TYPE_MAQ
        );
    }

    if (loType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO) {
        return quizTypeValues.filter(
            (type) =>
                type === QuizType.QUIZ_TYPE_MCQ ||
                type === QuizType.QUIZ_TYPE_FIB ||
                type === QuizType.QUIZ_TYPE_MAQ
        );
    }

    return quizTypeValues.filter(
        (type) => type === QuizType.QUIZ_TYPE_POW || type === QuizType.QUIZ_TYPE_TAD
    );
};

const QuizTypeSelect: FC = () => {
    const t = useTranslate();
    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const { getValues, setValue, resetField } = useFormContext<QuizV2>();
    const { lo } = useQuizContext();
    const [shouldShowConfirm, setShouldShowConfirm] = useState(false);
    const changeInfo = useRef<{
        currentType: QuizType;
        nextType?: QuizType;
    }>({
        currentType: getValues("kind"),
    });
    const rules = useQuizValidation();

    const options = useMemo<OptionSelectType[]>(() => {
        if (!lo) return [];
        return filterTypesByOnLOType(lo.type).map((key) => ({
            id: key,
            value: t(`resources.choices.quizTypes.${key}`),
        }));
    }, [lo, t]);

    const onCancelChange = useCallback(() => {
        if (!isNil(changeInfo.current.currentType)) {
            setValue("kind", changeInfo.current.currentType);
        }
        changeInfo.current.nextType = undefined;
        setShouldShowConfirm(false);
    }, [setValue]);

    const onChange = useCallback((e: SelectChangeEvent<unknown>) => {
        changeInfo.current.nextType = e.target.value as QuizType;
        setShouldShowConfirm(true);
    }, []);

    const onConfirmChange = useCallback(() => {
        setShouldShowConfirm(false);
        const nextType = changeInfo.current.nextType;
        if (isNil(nextType)) return;
        const answer = createDefaultAnswerFieldV2(nextType);
        resetField("answer.configs", {
            defaultValue: answer.configs,
        });
        resetField("answer.labelType", {
            defaultValue: answer.labelType,
        });
        resetField("answer.list", {
            defaultValue: answer.list,
        });
        changeInfo.current = {
            currentType: nextType,
            nextType: undefined,
        };
    }, [resetField]);

    return (
        <>
            <SelectHF
                data-testid="QuizTypeSelect__root"
                label={tQuiz("questionType")}
                name="kind"
                options={options}
                onChange={onChange}
                rules={rules.kind}
                required
            />
            <ConfirmDialog
                open={shouldShowConfirm}
                onClose={onCancelChange}
                onSave={onConfirmChange}
            />
        </>
    );
};

export default QuizTypeSelect;
