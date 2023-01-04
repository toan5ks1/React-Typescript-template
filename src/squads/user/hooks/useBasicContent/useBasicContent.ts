import { useMemo } from "react";

import { KeyCountries, KeySubjects } from "src/common/constants/const";
import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { CountryKeys, SubjectKeys } from "src/squads/user/typings/remote";

export interface UseBasicContent {
    country: CountryKeys;
    school_id: number;
    subject: SubjectKeys;
    subjects: SubjectKeys[];
    grade: number;
}
function useBasicContent(): UseBasicContent {
    const schoolId = useMemo(() => {
        return Number(
            reactiveStorage.get("ADMIN_PROPERTIES")?.school_id ||
                reactiveStorage.get("PROFILE")?.schoolId ||
                0
        );
    }, []);

    const country: CountryKeys = useMemo(() => {
        return (
            (reactiveStorage.get("ADMIN_PROPERTIES")?.country as CountryKeys) ||
            reactiveStorage.get("PROFILE")?.countryName ||
            KeyCountries.COUNTRY_VN
        );
    }, []);

    return useMemo(
        () => ({
            country,
            subject: KeySubjects.SUBJECT_ENGLISH,
            subjects: [KeySubjects.SUBJECT_ENGLISH],
            grade: 0,
            grades: [0],
            school_id: schoolId,
        }),
        [country, schoolId]
    );
}

export default useBasicContent;
