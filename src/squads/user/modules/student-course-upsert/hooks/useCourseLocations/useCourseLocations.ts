import { useEffect, useRef, useState } from "react";

import { useUnmount } from "react-use";
import { ArrayElement } from "src/common/constants/types";
import { User_CourseLocationsByCourseIdQuery } from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export type ICourseLocation = ArrayElement<
    User_CourseLocationsByCourseIdQuery["course_access_paths"]
>["location"];

const useCourseLocations = (courseId: string) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ICourseLocation[]>([]);

    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    useEffect(() => {
        void (async () => {
            setLoading(true);
            try {
                const options = await inferStandaloneQuery({
                    entity: "courseAccessPath",
                    action: "userGetManyCourseAccessPathsByCourseId",
                })({ course_id: courseId });

                const locationsData = options?.map((options) => options.location);

                if (!unMountedRef.current) setData(locationsData || []);
            } catch (err) {
                window.warner?.log("useCourseLocations", err);
                if (!unMountedRef.current) {
                    showSnackbar(
                        `${t(
                            "ra.message.unableToLoadData"
                        )} courseLocations - User_CourseLocationsByCourseId`,
                        "error"
                    );
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
    }, [courseId, showSnackbar, t]);
    return {
        loading,
        options: data,
    };
};

export default useCourseLocations;
