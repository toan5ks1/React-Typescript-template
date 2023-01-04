import { useEffect, useRef, useState } from "react";

import { useUnmount } from "react-use";
import { ArrayElement } from "src/common/constants/types";
import { User_ClassListWithFilterQuery } from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export type ICourseClass = ArrayElement<User_ClassListWithFilterQuery["class"]>;

const useCourseClasses = (courseId: string, locationId: string) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ICourseClass[]>([]);

    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    useEffect(() => {
        if (!courseId || !locationId) return;
        void (async () => {
            setLoading(true);
            try {
                const options = await inferStandaloneQuery({
                    entity: "class",
                    action: "userGetListClassWithFilter",
                })({
                    course_id: courseId,
                    location_id: locationId,
                });

                if (!unMountedRef.current) setData(options || []);
            } catch (err) {
                window.warner?.log("useCourseClasses", err);
                if (!unMountedRef.current) {
                    showSnackbar(
                        `${t(
                            "ra.message.unableToLoadData"
                        )} courseClass - User_ClassListWithFilter`,
                        "error"
                    );
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
    }, [courseId, locationId, showSnackbar, t]);

    return {
        loading,
        options: data,
    };
};

export default useCourseClasses;
