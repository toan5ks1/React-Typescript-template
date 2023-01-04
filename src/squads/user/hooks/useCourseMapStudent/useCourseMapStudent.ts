import { useMemo } from "react";

import uniq from "lodash/uniq";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    User_CoursesManyWithLocationQuery,
    User_LocationListByIdsQuery,
    User_ClassManyQuery,
} from "src/squads/user/service/bob/bob-types";
import {
    User_StudentPackagesByListStudentIdV2Query,
    User_StudentPackagesClassListWithFilterQuery,
} from "src/squads/user/service/fatima/fatima-types";
import { inferQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface ICourses extends ArrayElement<User_CoursesManyWithLocationQuery["courses"]> {}
export interface ILocations extends ArrayElement<User_LocationListByIdsQuery["locations"]> {}
export interface IClass extends ArrayElement<User_ClassManyQuery["class"]> {}
export interface IStudentPackageClass
    extends ArrayElement<User_StudentPackagesClassListWithFilterQuery["student_package_class"]> {}

export interface CourseReturnType {
    name: ArrayElement<User_CoursesManyWithLocationQuery["courses"]>["name"];
    course_id: ArrayElement<User_CoursesManyWithLocationQuery["courses"]>["course_id"];
    course_access_paths?: ArrayElement<
        User_CoursesManyWithLocationQuery["courses"]
    >["course_access_paths"];
    student_package_id: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["student_package_id"];
    start_date: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["start_at"];
    end_date: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["end_at"];
    locations: ILocations[];
    class?: IClass;
}

export interface IStudentPackage
    extends ArrayElement<User_StudentPackagesByListStudentIdV2Query["student_packages"]> {}

export interface ICourseAndStudent {
    studentId: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["student_id"];
    courses: CourseReturnType[];
}

export interface UseCourseMapStudentReturn {
    coursesData: ICourseAndStudent[];
    loaded: boolean;
    refetch: () => void;
    rawCourses?: ICourses[];
}

const mapCoursesEachUniqStudent = (
    studentPackages: IStudentPackage[],
    mapCourses: Map<string, ICourses>,
    mapLocations: Map<string, ILocations>,
    studentPackageClasses: IStudentPackageClass[],
    mapClasses: Map<string, IClass>
) => {
    const mapData = new Map<string, ICourseAndStudent>();

    studentPackages.forEach((studentPackage) => {
        const studentId = studentPackage.student_id!;
        const result = mapData.get(studentId)!;

        const courses: CourseReturnType[] = [];
        (studentPackage.properties.can_do_quiz || []).forEach((course_id: string) => {
            const studentPackageClass = studentPackageClasses.find(
                ({ student_package_id, course_id, location_id }) => {
                    return (
                        student_package_id === studentPackage.student_package_id &&
                        course_id === course_id &&
                        location_id === studentPackage.location_ids[0]
                    );
                }
            );

            const courseClass = mapClasses.get(studentPackageClass?.class_id || "");

            courses.push({
                name: mapCourses.get(course_id)?.name || "",
                course_access_paths: mapCourses.get(course_id)?.course_access_paths || [],
                student_package_id: studentPackage.student_package_id,
                course_id: course_id,
                end_date: studentPackage.end_at,
                start_date: studentPackage.start_at,
                locations: (studentPackage.location_ids || []).map((locationId: string) =>
                    mapLocations.get(locationId)
                ),
                class: courseClass!,
            });
        });

        mapData.set(studentPackage.student_id!, {
            ...result,
            studentId: studentPackage.student_id!,
            courses: result ? [...result?.courses, ...courses] : [...courses],
        });
    });

    return [...mapData.values()];
};

function useCourseMapStudent(studentIds: string[]): UseCourseMapStudentReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    // STEP 1: get student-packages of students
    const {
        data: studentPackages = [],
        isFetching: isFetchingStudentPackage,
        refetch,
    } = inferQuery({
        entity: "studentPackage",
        action: "userGetStudentPackagesByStudentIds",
    })(
        {
            filter: {
                student_ids: studentIds,
            },
            sort: {
                end_at: "desc",
                start_at: "asc",
            },
        },
        {
            enabled: arrayHasItem(studentIds),
            onError: (error) => {
                window.warner?.warn(`useCourseMapStudent get student-packages`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 2: get uniq courseIds in student-packages
    const coursesIdsUniq = useMemo(() => {
        const courseIds: string[] = [];
        studentPackages.forEach((studentPackage) => {
            studentPackage.properties.can_do_quiz.forEach((quiz: string) => {
                courseIds.push(quiz);
            });
        });
        return uniq(courseIds);
    }, [studentPackages]);

    // STEP 2.1: get course name from courseIds
    const { data: courses = [], isFetching: isFetchingCourses } = inferQuery({
        entity: "course",
        action: "userGetManyCoursesWithLocation",
    })(
        {
            filter: {
                course_id: coursesIdsUniq,
            },
        },
        {
            enabled: arrayHasItem(studentPackages),
            onError: (error) => {
                window.warner?.warn(`useCourseMapStudent get courses`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 2.2: create map courseName with key = courseId
    const mapCourses = useMemo(() => {
        const map = new Map<string, ICourses>();

        (courses || []).forEach((course: ICourses) => {
            map.set(course.course_id, course);
        });

        return map;
    }, [courses]);

    // STEP 3.1: get uniq locationIds in student-packages
    const locationIdsUniq = useMemo(() => {
        const locationIds: string[] = [];
        studentPackages.forEach((studentPackage) => {
            studentPackage.location_ids?.forEach((locationId: string) => {
                locationIds.push(locationId);
            });
        });
        return uniq(locationIds);
    }, [studentPackages]);

    // STEP 3.2: get locations from courseIds
    const { data: locations = [], isFetching: isFetchingLocations } = inferQuery({
        entity: "location",
        action: "userGetManyLocationsWithFilter",
    })<ILocations[]>(
        {
            filter: {
                location_ids: locationIdsUniq,
            },
        },
        {
            enabled: arrayHasItem(studentPackages),
            onError: (error) => {
                window.warner?.warn(`useCourseMapStudent get locations`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 3.3: create map location with key = locationId
    const mapLocations = useMemo(() => {
        const map = new Map<string, ILocations>();

        (locations || []).forEach((location: ILocations) => {
            map.set(location.location_id, location);
        });

        return map;
    }, [locations]);

    // STEP 4.1: get uniq student_package_ids in student-packages
    const studentPackageIdsUniq = useMemo(() => {
        const studentPackageIds = studentPackages.map(
            (studentPackage) => studentPackage.student_package_id
        );
        return uniq(studentPackageIds);
    }, [studentPackages]);

    // STEP 4.2: get studentPackageClass from student_packages
    const {
        data: studentPackageClasses = [],
        isFetching: isFetchingStudentPackageClasses,
        refetch: refetchClass,
    } = inferQuery({
        entity: "studentPackageClass",
        action: "userGetManyStudentPackageClassWithFilter",
    })<IStudentPackageClass[]>(
        {
            filter: {
                student_package_ids: studentPackageIdsUniq,
                student_id: studentIds[0],
            },
        },
        {
            enabled: arrayHasItem(studentPackages),
            onError: (error) => {
                window.warner?.warn(`useCourseMapStudent get classes`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 4.3: get uniq class_ids in student-package-class
    const classIdsUniq = useMemo(() => {
        const classIds = studentPackageClasses.map(
            (studentPackageClass) => studentPackageClass.class_id
        );
        return uniq(classIds);
    }, [studentPackageClasses]);

    // STEP 4.4: get Class list from studentPackageClass
    const { data: classes = [], isFetching: isFetchingClasses } = inferQuery({
        entity: "class",
        action: "userGetManyClass",
    })(
        {
            filter: {
                class_ids: classIdsUniq,
            },
        },
        {
            enabled: arrayHasItem(classIdsUniq),
            onError: (error) => {
                window.warner?.warn(`useCourseMapStudent get classes`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 4.5: create map location with key = locationId
    const mapClasses = useMemo(() => {
        const map = new Map<string, IClass>();
        (classes || []).forEach((classItem) => {
            map.set(classItem.class_id, classItem);
        });
        return map;
    }, [classes]);

    // STEP 5: mapping courseName with uniq student
    const coursesData = useMemo(
        () =>
            mapCoursesEachUniqStudent(
                studentPackages,
                mapCourses,
                mapLocations,
                studentPackageClasses,
                mapClasses
            ),
        [studentPackages, mapCourses, mapLocations, studentPackageClasses, mapClasses]
    );

    const loaded = useMemo(() => {
        return (
            !isFetchingStudentPackage &&
            !isFetchingCourses &&
            !isFetchingLocations &&
            !isFetchingStudentPackageClasses &&
            !isFetchingClasses
        );
    }, [
        isFetchingStudentPackage,
        isFetchingCourses,
        isFetchingLocations,
        isFetchingStudentPackageClasses,
        isFetchingClasses,
    ]);

    return {
        coursesData,
        loaded,
        refetch: () => {
            void refetch();
            void refetchClass();
        },
    };
}

export default useCourseMapStudent;
