import { ReactNode, useCallback, useMemo } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

interface FormSectionLessonTeachingMethodRenderProps {
    teachingMethod: LessonManagementUpsertFormType["teachingMethod"];
    location: LessonManagementUpsertFormType["location"];
    course: LessonManagementUpsertFormType["course"];
    classData: LessonManagementUpsertFormType["classData"];
    onChangeTeachingMethod: (
        teachingMethod: LessonManagementUpsertFormType["teachingMethod"]
    ) => void;
    onChangeLocation: () => void;
    onChangeCourse: () => void;
}

export interface FormSectionLessonTeachingMethodProps {
    render: (props: FormSectionLessonTeachingMethodRenderProps) => ReactNode;
}

const FormSectionLessonTeachingMethod = ({ render }: FormSectionLessonTeachingMethodProps) => {
    const [teachingMethod, location, course, classData] = useWatch<
        LessonManagementUpsertFormType,
        ["teachingMethod", "location", "course", "classData"]
    >({ name: ["teachingMethod", "location", "course", "classData"] });

    const { resetField } = useFormContext<LessonManagementUpsertFormType>();

    const resetCourseAndClass = useCallback(() => {
        course && resetField("course", { defaultValue: null });
        classData && resetField("classData", { defaultValue: null });
    }, [classData, course, resetField]);

    const onChangeTeachingMethod = useCallback(
        (teachingMethod: LessonManagementUpsertFormType["teachingMethod"]) => {
            if (teachingMethod === "LESSON_TEACHING_METHOD_INDIVIDUAL") resetCourseAndClass();
        },
        [resetCourseAndClass]
    );

    const onChangeLocation = useCallback(() => {
        resetCourseAndClass();
    }, [resetCourseAndClass]);

    const onChangeCourse = useCallback(() => {
        classData && resetField("classData", { defaultValue: null });
    }, [classData, resetField]);

    const renderFormSection: ReactNode = useMemo(() => {
        return render({
            teachingMethod,
            location,
            course,
            classData,
            onChangeTeachingMethod,
            onChangeLocation,
            onChangeCourse,
        });
    }, [
        render,
        teachingMethod,
        course,
        location,
        classData,
        onChangeTeachingMethod,
        onChangeLocation,
        onChangeCourse,
    ]);

    return <>{renderFormSection}</>;
};

export default FormSectionLessonTeachingMethod;
