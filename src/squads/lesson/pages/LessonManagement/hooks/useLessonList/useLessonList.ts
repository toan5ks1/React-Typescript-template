import { useCallback, useEffect, useMemo, useState } from "react";

import { isEqual, uniq } from "lodash";
import { Features } from "src/common/constants/enum";
import {
    CourseManyType,
    CourseObjectType,
    LessonReportManyType,
    LessonReportObjectType,
    LocationManyType,
    LocationObjectType,
    TeacherManyType,
    TeacherObjectType,
} from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { getTimeZoneName } from "src/common/utils/timezone";
import { ClassManyType, ClassObjectType } from "src/squads/lesson/common/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import {
    UseQueryWithGRPCPaginationReturn,
    PaginationWithTotal,
} from "src/squads/lesson/service/service-creator";

import { LessonTime, RetrieveLessonsResponseV2 } from "manabuf/bob/v1/lessons_pb";
import { DateOfWeek, LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";

import isEmpty from "lodash/isEmpty";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import {
    convertToFilterDateValue,
    convertToFilterTimeValue,
} from "src/squads/lesson/hooks/useFormFilterAdvanced/useFormFilterAdvanced";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { mapDataToLessonListItem } from "src/squads/lesson/pages/LessonManagement/common/service-to-ui-mappers";
import {
    FilterLessonsParamsType,
    LessonItem,
    RetrieveLessonsParamsType,
    TeacherAndCenterIdList,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { FormFilterLessonManagementValues } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";
import { FormFilterLessonManagementValuesV2 } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2";

const getDefaultParams = (
    isFutureLesson: boolean,
    locationIdsList: string[],
    isEnabled: boolean
): RetrieveLessonsParamsType => {
    const lessonTime = isFutureLesson ? LessonTime.LESSON_TIME_FUTURE : LessonTime.LESSON_TIME_PAST;
    const locationIds = isEnabled ? locationIdsList : [];
    return {
        keyword: "",
        currentTime: new Date(),
        lessonTime,
        locationIdsList: locationIds,
    };
};

export interface UseLessonListReturn {
    isLoadingLesson: boolean;
    isLoadingLessonReport: boolean;
    isLoadingCenter: boolean;
    isLoadingTeacher: boolean;
    isLoadingCourse: boolean;
    isLoadingClass: boolean;
    isSearching: Boolean;
    isFiltered: Boolean;
    lessons: LessonItem[];
    refreshPage: UseQueryWithGRPCPaginationReturn<RetrieveLessonsResponseV2.AsObject>["results"]["refetch"];
    keyword: string;
    onFilter: (data: FormFilterLessonManagementValues) => void; // TODO: remove this fn when Lesson Group is enabled (LT-13375)
    onFilterV2: (data: FormFilterLessonManagementValuesV2) => void;
    onSearch: (keyword: string) => void;
    pagination: PaginationWithTotal;
}

export interface UseLessonListProps {
    isFutureLesson: boolean;
    locationIdsList: string[];
}

const useLessonList = (props: UseLessonListProps): UseLessonListReturn => {
    const { isFutureLesson, locationIdsList } = props;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { isEnabled } = useFeatureToggle(Features.LESSON_MANAGEMENT_LOCATION_FILTER);

    const [retrieveLessonsParams, setRetrieveLessonsParams] = useState<RetrieveLessonsParamsType>(
        getDefaultParams(isFutureLesson, locationIdsList, isEnabled)
    );

    const [idListObject, setIdListObject] = useState<TeacherAndCenterIdList>({
        teacherIdList: [],
        centerIdList: [],
        courseIdsList: [],
        classIdsList: [],
        lessonIdList: [],
    });

    const [isSearching, setIsSearching] = useState<Boolean>(false);
    const [isFiltered, setIsFiltered] = useState<Boolean>(false);

    const { results, pagination, goToFirstPage } = inferQueryWithGRPCPagination({
        entity: "lessons",
        action: "lessonsRetrieve",
    })(retrieveLessonsParams, {
        enabled: true,
        onSuccess: (data: RetrieveLessonsResponseV2.AsObject) => {
            if (!data || !arrayHasItem(data.itemsList)) return [];

            const teacherIdListNotUniq: string[] = [];
            const centerIdListNotUniq: string[] = [];
            const courseIdsListNotUniq: string[] = [];
            const classIdsListNotUniq: string[] = [];
            const lessonIdList: string[] = [];

            data.itemsList.map((report) => {
                const { teacherIdsList, centerId, courseId, classId, id } = report;

                lessonIdList.push(id);

                if (arrayHasItem(teacherIdsList)) {
                    teacherIdListNotUniq.push(...teacherIdsList);
                }

                if (centerId) {
                    centerIdListNotUniq.push(centerId);
                }

                if (courseId) {
                    courseIdsListNotUniq.push(courseId);
                }

                if (classId) {
                    classIdsListNotUniq.push(classId);
                }
            });

            const teacherIdList = uniq(teacherIdListNotUniq);
            const centerIdList = uniq(centerIdListNotUniq);
            const courseIdsList = uniq(courseIdsListNotUniq);
            const classIdsList = uniq(classIdsListNotUniq);
            if (
                !isEqual(teacherIdList, idListObject.teacherIdList) ||
                !isEqual(centerIdList, idListObject.centerIdList) ||
                !isEqual(courseIdsList, idListObject.courseIdsList) ||
                !isEqual(classIdsList, idListObject.classIdsList)
            ) {
                setIdListObject({
                    teacherIdList,
                    centerIdList,
                    courseIdsList,
                    classIdsList,
                    lessonIdList,
                });
            }
        },
        onError: (error: Error) => {
            window.warner?.warn(`useLessonList fetchLessonList`, error);

            showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
        },
    });

    useEffect(() => {
        if (!isEnabled) return;

        const prevParameter = { ...retrieveLessonsParams };

        const isDifferenceLength = prevParameter.locationIdsList.length !== locationIdsList.length;
        const isDifferenceValue = prevParameter.locationIdsList.some(
            (location) => !locationIdsList.includes(location)
        );

        if (isDifferenceLength || isDifferenceValue) {
            setRetrieveLessonsParams({ ...prevParameter, locationIdsList });
            goToFirstPage();
        }
    }, [locationIdsList, retrieveLessonsParams, isEnabled, goToFirstPage]);

    const { data: originLessons, isFetching: isLoadingLesson, refetch: refreshPage } = results;

    // Get Centers
    // Currently, We think center is Location. Because i use entity equal Location but i use name variable equal centerObject.
    const { data: centerObject, isFetching: isCenterFetching } = inferQuery({
        entity: "locations",
        action: "locationsGetMany",
    })(
        {
            location_ids: idListObject.centerIdList,
        },
        {
            enabled: arrayHasItem(idListObject.centerIdList),
            selector(locations: LocationManyType[]) {
                return locations.reduce(
                    (result: LocationObjectType, location: LocationManyType) => {
                        result[location.location_id] = location.name;
                        return result;
                    },
                    {}
                );
            },
            onError(error: Error) {
                window.warner?.warn(`useLessonList fetchLocationList`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    // Get Teachers
    const { data: teacherObject, isFetching: isTeacherFetching } = inferQuery({
        entity: "teachers",
        action: "teachersGetMany",
    })(
        { user_id: idListObject.teacherIdList },
        {
            enabled: arrayHasItem(idListObject.teacherIdList),
            selector(teachers: TeacherManyType[]) {
                return teachers.reduce((result: TeacherObjectType, teacher: TeacherManyType) => {
                    result[teacher.user_id] = teacher.name;
                    return result;
                }, {});
            },
            onError(error: Error) {
                window.warner?.warn(`useLessonList fetchTeacherList`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    // Get Courses
    const { data: courseObject, isFetching: isCourseFetching } = inferQuery({
        entity: "courses",
        action: "coursesGetMany",
    })(
        { course_id: idListObject.courseIdsList },
        {
            enabled: arrayHasItem(idListObject.courseIdsList),
            selector(courses: CourseManyType[]) {
                return courses.reduce((result: CourseObjectType, course: CourseManyType) => {
                    result[course.course_id] = course.name;
                    return result;
                }, {});
            },
            onError(error: Error) {
                window.warner?.warn(`useLessonList fetchCoursesList`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    // get Class
    const { data: classObject, isFetching: isClassFetching } = inferQuery({
        entity: "class",
        action: "classGetMany",
    })(
        { class_ids: idListObject.classIdsList },
        {
            enabled: arrayHasItem(idListObject.classIdsList),
            selector(classes: ClassManyType[]) {
                return classes.reduce((result: ClassObjectType, classData: ClassManyType) => {
                    result[classData.class_id] = classData.name;
                    return result;
                }, {});
            },
            onError(error: Error) {
                window.warner?.warn(`useLessonList fetchClassesList`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    // Get Lesson Report
    const { data: lessonReportObject, isFetching: isLessonReportFetching } = inferQuery({
        entity: "lessonReports",
        action: "lessonGetLessonReportListByLessonIds",
    })(
        {
            lesson_ids: idListObject.lessonIdList,
        },
        {
            enabled: arrayHasItem(idListObject.lessonIdList),
            selector(lessonReports: LessonReportManyType[]) {
                return lessonReports.reduce(
                    (result: LessonReportObjectType, lessonReport: LessonReportManyType) => {
                        if (lessonReport.lesson_id)
                            result[lessonReport.lesson_id] = lessonReport.report_submitting_status;
                        return result;
                    },
                    {}
                );
            },
            onError(error: Error) {
                window.warner?.warn(`useLessonList fetchLessonReportList`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const lessons = useMemo(() => {
        if (!originLessons || isEmpty(originLessons)) return [];

        const lessonList = mapDataToLessonListItem(
            originLessons.itemsList,
            lessonReportObject,
            teacherObject,
            centerObject,
            courseObject,
            classObject
        );
        return lessonList;
    }, [centerObject, classObject, courseObject, lessonReportObject, originLessons, teacherObject]);

    const handleSearch = useCallback(
        (keyword: string) => {
            if (!retrieveLessonsParams.keyword && !keyword) return;
            setRetrieveLessonsParams({ ...retrieveLessonsParams, keyword });
            setIsSearching(true);
            goToFirstPage();
        },
        [retrieveLessonsParams, goToFirstPage]
    );

    // TODO: remove this fn when Lesson Group is enabled
    const handleFilter = useCallback(
        (data: FormFilterLessonManagementValues) => {
            const {
                courses,
                grades,
                dayOfWeek,
                lessonStatus,
                centers,
                fromDate,
                toDate,
                startTime,
                endTime,
                students,
                teachers,
            } = data;

            const lessonStatusList = lessonStatus.map(
                (status) => LessonSchedulingStatus[status.id]
            );
            const courseIdsList = courses.map((course) => course.course_id);
            const centerIdsList = centers.map((center) => center.locationId);
            const gradesList = grades.map((grade) => grade.id);
            const dateOfWeeksList = dayOfWeek.map((day) => DateOfWeek[day.id]);
            const studentIdsList = students.map((student) => student.user_id);
            const teacherIdsList = teachers.map((teacher) => teacher.user_id);
            const timeZone = getTimeZoneName();

            const filter: FilterLessonsParamsType = {
                timeZone,
                fromDate: convertToFilterDateValue(fromDate),
                toDate: convertToFilterDateValue(toDate),
                fromTime: convertToFilterDateValue(startTime),
                toTime: convertToFilterDateValue(endTime),
                courseIdsList,
                centerIdsList,
                gradesList,
                dateOfWeeksList,
                studentIdsList,
                teacherIdsList,
                dateOfWeek: 0,
                centerId: "",
                grade: 0,
                schedulingStatusList: lessonStatusList,
                classIdsList: [],
            };

            goToFirstPage();
            setRetrieveLessonsParams({ ...retrieveLessonsParams, filter });
            setIsFiltered(true);
        },
        [retrieveLessonsParams, goToFirstPage]
    );

    const handleFilterV2 = useCallback(
        (data: FormFilterLessonManagementValuesV2) => {
            const {
                courses,
                grades,
                lessonStatus,
                dayOfWeek,
                centers,
                fromDate,
                toDate,
                startTime,
                endTime,
                students,
                teachers,
                classOfCourses,
            } = data;

            const lessonStatusList = lessonStatus.map(
                (status) => LessonSchedulingStatus[status.id]
            );
            const courseIdsList = courses.map((course) => course.course_id);
            const classIdsList = classOfCourses.map((classData) => classData.class_id);
            const centerIdsList = centers.map((center) => center.locationId);
            const gradesList = grades.map((grade) => grade.id);
            const dateOfWeeksList = dayOfWeek.map((day) => DateOfWeek[day.id]);
            const studentIdsList = students.map((student) => student.user_id);
            const teacherIdsList = teachers.map((teacher) => teacher.user_id);
            const timeZone = getTimeZoneName();

            const filter: FilterLessonsParamsType = {
                timeZone,
                fromDate: convertToFilterDateValue(fromDate),
                toDate: convertToFilterDateValue(toDate),
                fromTime: convertToFilterTimeValue(startTime),
                toTime: convertToFilterTimeValue(endTime),
                courseIdsList,
                centerIdsList,
                gradesList,
                dateOfWeeksList,
                studentIdsList,
                teacherIdsList,
                dateOfWeek: 0,
                centerId: "",
                grade: 0,
                schedulingStatusList: lessonStatusList,
                classIdsList: classIdsList,
            };

            goToFirstPage();
            setRetrieveLessonsParams({ ...retrieveLessonsParams, filter });
            setIsFiltered(true);
        },
        [retrieveLessonsParams, goToFirstPage]
    );

    return {
        isLoadingTeacher: isTeacherFetching,
        isLoadingCenter: isCenterFetching,
        isLoadingLessonReport: isLessonReportFetching,
        isLoadingLesson,
        isLoadingCourse: isCourseFetching,
        isLoadingClass: isClassFetching,
        isSearching,
        isFiltered,
        refreshPage,
        pagination,
        lessons,
        keyword: retrieveLessonsParams.keyword,
        onSearch: handleSearch,
        onFilter: handleFilter,
        onFilterV2: handleFilterV2,
    };
};

export default useLessonList;
