import { ArrayElement } from "src/common/constants/types";
import { Lesson_CourseManyReferenceByNameAndLocationIdQuery } from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import { Order_By } from "src/squads/lesson/__generated__/bob/root-types";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseCourseManyReferenceProps {
    isEnabled: boolean;
    locationId: string | undefined;
    courseName: string | undefined;
}

type CourseAccessPathQueried =
    Lesson_CourseManyReferenceByNameAndLocationIdQuery["course_access_paths"];

export interface UseCourseManyReferenceReturn {
    courses: ArrayElement<CourseAccessPathQueried>["course"][];
    isLoading: boolean;
}

const useCourseManyReference = (
    props: UseCourseManyReferenceProps
): UseCourseManyReferenceReturn => {
    const { isEnabled, locationId, courseName } = props;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const shouldQuery = isEnabled && Boolean(locationId);

    const { data = [], isLoading } = inferQuery({
        entity: "courseAccessPathsService",
        action: "courseAccessPathsGetManyReference",
    })<CourseAccessPathQueried, ArrayElement<CourseAccessPathQueried>["course"][]>(
        {
            location_id: locationId,
            name: courseName,
            order_by: {
                // Confirm at https://manabie.slack.com/archives/C01TG8A97ME/p1654499296510339
                course: {
                    created_at: Order_By.Desc,
                    name: Order_By.Asc,
                    display_order: Order_By.Asc,
                    course_id: Order_By.Asc,
                },
            },
        },
        {
            enabled: shouldQuery,
            selector: (data) => data.map((courseAccessPath) => courseAccessPath.course),
            onError: (error) => {
                window.warner?.warn("[useCourseManyReference]", error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    return { courses: shouldQuery ? data : [], isLoading };
};

export default useCourseManyReference;
