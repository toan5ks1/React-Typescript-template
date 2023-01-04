import { Lesson_ClassManyByNullableCourseIdsAndNameQuery } from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseClassManyWithNullableCourseProps {
    courseIds: string[] | undefined;
    className: string | undefined;
}

export interface UseClassManyWithNullableCourseReturn {
    classes: Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"];
    isLoading: boolean;
}

const useClassManyWithNullableCourse = (
    props: UseClassManyWithNullableCourseProps
): UseClassManyWithNullableCourseReturn => {
    const { courseIds, className } = props;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { data = [], isLoading } = inferQuery({
        entity: "class",
        action: "classGetManyByNullableCourseAndName",
    })(
        {
            course_ids: courseIds,
            name: className,
        },
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn("[useClassManyWithNullableCourse]", error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    return { classes: data, isLoading };
};

export default useClassManyWithNullableCourse;
