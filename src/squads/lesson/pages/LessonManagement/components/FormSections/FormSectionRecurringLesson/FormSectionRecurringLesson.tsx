import { ReactNode, useCallback, useMemo } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";

import {
    LessonManagementUpsertFormType,
    LessonSavingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";

interface FormSectionRecurringLessonRenderProps {
    method: LessonSavingMethodType;
    onChangeRecurringLesson: (methodSaving: CreateLessonSavingMethod) => void;
}

interface FormSectionRecurringLessonProps {
    render: (props: FormSectionRecurringLessonRenderProps) => ReactNode;
}

const FormSectionRecurringLesson = ({ render }: FormSectionRecurringLessonProps) => {
    const method = useWatch<LessonManagementUpsertFormType, "method">({
        name: "method",
    });

    const { setValue } = useFormContext<LessonManagementUpsertFormType>();

    const onChangeRecurringLesson = useCallback(
        (method: CreateLessonSavingMethod) => {
            if (method === CreateLessonSavingMethod["CREATE_LESSON_SAVING_METHOD_ONE_TIME"])
                setValue("endDate", null);
        },
        [setValue]
    );

    const renderFormSection: ReactNode = useMemo(() => {
        return render({
            method,
            onChangeRecurringLesson,
        });
    }, [method, onChangeRecurringLesson, render]);

    return <>{renderFormSection}</>;
};

export default FormSectionRecurringLesson;
