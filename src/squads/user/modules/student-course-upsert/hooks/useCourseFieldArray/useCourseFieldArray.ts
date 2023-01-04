import { useCallback } from "react";

import { useFieldArray } from "react-hook-form";
import { StudentKeys } from "src/squads/user/common/constants/student";
import {
    StudentPackageClientWithLocation,
    StudentPackageCourseForm,
} from "src/squads/user/common/types/student";

import { useFormContext } from "src/components/Forms/HookForm";

import { initializeCourse } from "src/squads/user/common/helpers/initializeFieldArray";

export interface UseCourseFieldArrayReturn {
    courses: StudentPackageClientWithLocation[];
    onAdd: () => void;
    onDelete: (records: StudentPackageClientWithLocation[]) => void;
    append: (studentPackage: StudentPackageClientWithLocation) => void;
    remove: (index: number) => void;
    update: (index: number, value: Partial<unknown>) => void;
}

const useCourseFieldArray = (): UseCourseFieldArrayReturn => {
    const { control, watch } = useFormContext<StudentPackageCourseForm>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: StudentKeys.STUDENT_PACKAGES,
    });

    const watchFieldArray = watch(StudentKeys.STUDENT_PACKAGES);

    const courses = fields.map((field, index) => ({
        ...field,
        ...watchFieldArray[index],
    }));

    const onAdd = useCallback(() => {
        const newCourse = initializeCourse();
        append(newCourse);
    }, [append]);

    const onDelete = useCallback(
        (records: StudentPackageClientWithLocation[]) => {
            const ids = records.map((record) => record.id);

            const deletedCoursePositions = courses.reduce((positions: number[], course, index) => {
                if (ids.includes(course.id)) {
                    positions.push(index);
                }
                return positions;
            }, []);

            remove(deletedCoursePositions);
        },
        [courses, remove]
    );

    return {
        courses,
        onAdd,
        onDelete,
        append,
        remove,
        update,
    };
};

export default useCourseFieldArray;
