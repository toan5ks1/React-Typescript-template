import { useMemo } from "react";

import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";

export interface UseBasicContent {
    school_id: number;
}
function useBasicContent(): UseBasicContent {
    const schoolId = useMemo(() => {
        const adminSchoolId = reactiveStorage.get("ADMIN_PROPERTIES")?.school_id;
        const userSchoolId = reactiveStorage.get("PROFILE")?.schoolId;

        return Number(adminSchoolId || userSchoolId || 0);
    }, []);

    return useMemo(
        () => ({
            school_id: schoolId,
        }),
        [schoolId]
    );
}

export default useBasicContent;
