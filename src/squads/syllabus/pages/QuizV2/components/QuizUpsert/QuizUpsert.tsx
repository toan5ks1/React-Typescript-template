import { FC, useCallback } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import { QuizType } from "src/squads/syllabus/models/quiz";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";

import { useQuizContext } from "../../contexts/QuizContext";
import QuizContentLayout from "../QuizContentLayout";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import QuizV2, { createEmptyQuizV2 } from "src/squads/syllabus/models/quizV2";

export type QuizUpsertProps = {
    title: string;
    initialData?: QuizV2;
};

const getDefaultValues = (lo: LOWithQuizSet) => {
    return createEmptyQuizV2({
        loId: lo.lo_id,
        schoolId: lo.school_id,
        isLo: lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        kind:
            lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO
                ? QuizType.QUIZ_TYPE_MCQ
                : undefined,
    });
};

const QuizUpsert: FC<QuizUpsertProps> = ({ title, initialData }) => {
    const navigation = useNavigation();
    const { search } = useLocation();
    const { lo } = useQuizContext();
    const pdfUrl = null;

    const methods = useForm<QuizV2>({
        defaultValues: initialData ?? getDefaultValues(lo),
    });

    const onClose = useCallback(() => {
        navigation.push(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${lo.lo_id}/show${search}`
        );
    }, [lo, navigation, search]);

    const onSubmit = useCallback((formData: QuizV2) => {
        logger.info(formData);
    }, []);

    return (
        <DialogFullScreenHF<QuizV2>
            open
            methods={methods}
            onClose={onClose}
            // Here is why I needed to cast the type: https://github.com/react-hook-form/react-hook-form/issues/6523
            onSave={methods.handleSubmit(onSubmit as SubmitHandler<QuizV2>)}
            title={title}
            contentSize={pdfUrl ? "with-navigation-page" : "medium"}
        >
            <QuizContentLayout pdfUrl={pdfUrl} />
        </DialogFullScreenHF>
    );
};

export default QuizUpsert;
