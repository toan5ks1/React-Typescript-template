import { Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery } from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseClassManyReferenceProps {
    isEnabled: boolean;
    locationId: string | undefined;
    courseId: string | undefined;
    className: string | undefined;
}

export interface UseClassManyReferenceReturn {
    classes: Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery["class"];
    isLoading: boolean;
}

const useClassManyReference = (props: UseClassManyReferenceProps): UseClassManyReferenceReturn => {
    const { isEnabled, courseId, locationId, className } = props;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const shouldQuery = isEnabled && Boolean(courseId) && Boolean(locationId);

    const { data = [], isLoading } = inferQuery({
        entity: "class",
        action: "classGetManyByLocationIdAndCourseIdAndName",
    })(
        {
            course_id: courseId,
            location_id: locationId,
            name: className,
        },
        {
            enabled: shouldQuery,
            onError: (error) => {
                window.warner?.warn("[useClassManyReference]", error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    return { classes: shouldQuery ? data : [], isLoading };
};

export default useClassManyReference;
