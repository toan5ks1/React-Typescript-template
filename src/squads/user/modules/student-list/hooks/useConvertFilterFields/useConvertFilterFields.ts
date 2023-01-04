import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { Grade } from "src/squads/user/models/grade";
import { CoursesManyQuery } from "src/squads/user/service/bob/bob-types";

import isEqual from "lodash/isEqual";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export type FormFilterStudentValues = {
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
    isNotLogged: boolean;
};
export type UseConvertFilterFieldsReturn = {
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterStudentValues>;
    filterAppliedFieldObjects: ReturnType<typeof convertDefaultFilterAppliedObjects>;
};

export interface UseConvertFilterFieldsProps {
    valueFilters?: FormFilterStudentValues;
}

const convertDefaultFilterAppliedObjects = (
    valueFilters: FormFilterStudentValues,
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterStudentValues>
) => {
    const result = Object.values(filterFieldObjects).filter(
        (filterField) => !isEqual(filterField.defaultValue, valueFilters[filterField.name])
    );

    return result.map((_) => ({ ..._, isApplied: true }));
};

export const formFilterStudentDefaultValues: FormFilterStudentValues = {
    grades: [],
    courses: [],
    isNotLogged: false,
};

export default function useConvertFilterFields({
    valueFilters = formFilterStudentDefaultValues,
}: UseConvertFilterFieldsProps): UseConvertFilterFieldsReturn {
    const tStudentErp = useResourceTranslate(ERPModules.STUDENTS);

    const filterFieldObjects = useMemo(() => {
        return {
            grades: {
                name: "grades",
                inputLabel: tStudentErp("labels.colGrade"),
                isApplied: false,
                defaultValue: [],
            },
            courses: {
                name: "courses",
                inputLabel: tStudentErp("labels.colCourse"),
                isApplied: false,
                defaultValue: [],
            },
            isNotLogged: {
                name: "isNotLogged",
                inputLabel: tStudentErp("labels.neverLoggedIn"),
                isApplied: false,
                defaultValue: false,
            },
        };
    }, [tStudentErp]);

    const filterAppliedFieldObjects = useMemo(() => {
        return convertDefaultFilterAppliedObjects(valueFilters, filterFieldObjects);
    }, [valueFilters, filterFieldObjects]);

    return {
        filterFieldObjects,
        filterAppliedFieldObjects,
    };
}
