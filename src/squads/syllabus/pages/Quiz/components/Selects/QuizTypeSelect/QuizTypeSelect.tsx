import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { Entities } from "src/common/constants/enum";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { QuizType } from "src/squads/syllabus/models/quiz";
import { currentLOSelector } from "src/squads/syllabus/store/quiz";

import { MenuItem, SelectChangeEvent } from "@mui/material";
import Confirm from "src/squads/syllabus/components/LegacyDialogs/Confirm";

import { BaseSelectProps } from "../BaseSelect";
import { createSelectFromEnum, defaultSelectOptions } from "../select-utils";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface QuizTypeSelectProps extends Omit<BaseSelectProps, "onChange"> {
    onChange?: (e: ChangeEvent<any>) => void;
    value: QuizType;
}

const QuizTypeSelectFull = createSelectFromEnum(QuizType, {
    ...defaultSelectOptions,
    label: `resources.${Entities.QUIZZES}.questionType`,
    createTranslatorKey: (key: any) => `resources.choices.quizTypes.${key}`,
});

export const filterTypesByOnLOType = (loType: keyof typeof KeyLOTypes, menus: QuizType[]) => {
    if (loType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING) {
        return menus.filter(
            (menu) =>
                menu === QuizType.QUIZ_TYPE_MCQ ||
                menu === QuizType.QUIZ_TYPE_FIB ||
                menu === QuizType.QUIZ_TYPE_MIQ ||
                menu === QuizType.QUIZ_TYPE_MAQ
        );
    }

    if (loType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO) {
        return menus.filter(
            (menu) =>
                menu === QuizType.QUIZ_TYPE_MCQ ||
                menu === QuizType.QUIZ_TYPE_FIB ||
                menu === QuizType.QUIZ_TYPE_MAQ
        );
    }

    //for other LO, just display pair of words, term and definition
    return menus.filter(
        (menu) => menu === QuizType.QUIZ_TYPE_POW || menu === QuizType.QUIZ_TYPE_TAD
    );
};

const QuizTypeSelect = (props: QuizTypeSelectProps) => {
    const { onChange, ...rest } = props;

    const lo = useSelector(currentLOSelector);

    const [showConfirm, setShowConfirm] = useState(false);
    const temporaryValue = useRef<null | string>(null);
    const t = useTranslate();

    const _onChange = useCallback((e: SelectChangeEvent<any>) => {
        temporaryValue.current = e.target.value;
        setShowConfirm(true);
    }, []);

    const renderer = useMemo(() => {
        return {
            title: t(`resources.${Entities.QUIZZES}.changeQuizType`),
            content: t(`resources.${Entities.QUIZZES}.alertChangeQuizType`),
        };
    }, [t]);

    const onConfirm = useCallback(() => {
        const fakeEventChange = { target: { value: temporaryValue.current } } as ChangeEvent<any>;
        onChange && onChange(fakeEventChange);

        temporaryValue.current = null;
        setShowConfirm(false);
    }, [onChange]);

    const onCancel = useCallback(() => {
        temporaryValue.current = null;
        setShowConfirm(false);
    }, []);

    return (
        <>
            <QuizTypeSelectFull
                {...rest}
                renderMenus={(menus, createTranslatorKey) => {
                    return filterTypesByOnLOType(lo.type, menus).map((menu) => {
                        return (
                            <MenuItem key={menu} value={menu}>
                                {createTranslatorKey && t(createTranslatorKey(menu))}
                            </MenuItem>
                        );
                    });
                }}
                onChange={_onChange}
            />
            <Confirm
                open={showConfirm}
                renderer={renderer}
                OKText={t("ra.common.action.OK")}
                cancelText={t("ra.common.action.cancel")}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    );
};

export default QuizTypeSelect;
