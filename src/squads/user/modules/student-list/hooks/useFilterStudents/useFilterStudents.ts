import { useState, useCallback, useMemo } from "react";

import { DeepPartial, UnpackNestedValue } from "react-hook-form";
import { Grade } from "src/squads/user/models/grade";
import {
    CoursesOneQuery,
    User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables,
} from "src/squads/user/service/bob/bob-types";

import {
    formFilterStudentDefaultValues as formDefaultValues,
    FormFilterStudentValues,
} from "src/squads/user/modules/student-list/components/FormFilterAdvancedStudent";

import useGlobalLocations from "src/hooks/useGlobalLocations";

export interface UseFilterStudentsReturn {
    filter: FormFilterStudentValues & {
        keyword: string;
        locationIds?: User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables["location_ids"];
    };
    onFilter: (data: UnpackNestedValue<DeepPartial<FormFilterStudentValues>>) => void;
    onSearch: (keyword: string) => void;
}

const useFilterStudents = (): UseFilterStudentsReturn => {
    const [grades, setGrades] = useState<FormFilterStudentValues["grades"]>(
        formDefaultValues.grades
    );
    const [courses, setCourses] = useState<FormFilterStudentValues["courses"]>(
        formDefaultValues.courses
    );
    const [isNotLogged, setIsNotLogged] = useState<FormFilterStudentValues["isNotLogged"]>(
        formDefaultValues.isNotLogged
    );
    const [keyword, setKeyword] = useState<string>("");
    const { locations } = useGlobalLocations();

    const onFilter = useCallback(
        (data: UnpackNestedValue<DeepPartial<FormFilterStudentValues>>) => {
            setGrades(data.grades as Grade[]);
            setCourses(data.courses as CoursesOneQuery["courses"]);
            setIsNotLogged(data.isNotLogged || false);
        },
        [setGrades, setCourses, setIsNotLogged]
    );

    const onSearch = useCallback(
        (keyword: string) => {
            setKeyword(keyword);
        },
        [setKeyword]
    );

    const locationIds = useMemo(
        () => locations.map((location) => location.locationId),
        [locations]
    );

    const filter = useMemo(() => {
        const result = {
            keyword,
            grades,
            courses,
            isNotLogged,
        };
        if (locationIds?.length !== 0) return { ...result, locationIds };

        return result;
    }, [keyword, grades, courses, isNotLogged, locationIds]);

    return {
        filter,
        onFilter,
        onSearch,
    };
};
export default useFilterStudents;
