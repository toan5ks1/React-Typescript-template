import { FieldErrors } from "react-hook-form";
import {
    CoursesManyQuery,
    LocationListByIdsQuery,
    StudentsManyQuery,
    TeacherManyQuery,
} from "src/services/bob/bob-types";
import { Lesson_LessonReportListByLessonIdsQuery } from "src/squads/lesson/service/bob/bob-types";

import { Paging } from "manabuf/common/v1/requests_pb";
import { OpeningStatus } from "manabuf/eureka/v1/scheduler_pb";

export interface DateCommon {
    date: string | Date | number;
}

export interface OptionSelectType {
    id: string | number;
    value: string;
    label?: string | JSX.Element; // add a label for more descriptive item when map to element
    disabled?: boolean;
}

export type ErrorMessageArrayFieldHF<T> =
    | { message: string }
    | (FieldErrors<T> | undefined)[]
    | undefined;

export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface AutocompleteRecord {
    [key: string]: any;
}

//Form filter advanced types
export type FilterAppliedObjects<T> = {
    name: string;
    chipLabel?: string;
    inputLabel: string;
    isApplied: boolean;
    defaultValue: T;
};

export type FilterAppliedObjectsMap<T> = {
    [X in keyof T]: FilterAppliedObjects<T[X]>;
};

export type FilterAppliedObjectValuesMap<T> = FilterAppliedObjects<T[keyof T]>[];

export interface PagingRequest extends Paging.AsObject {}

export type StudentManyType = ArrayElement<StudentsManyQuery["users"]>;

export type CourseManyType = ArrayElement<CoursesManyQuery["courses"]>;

export type TeacherManyType = ArrayElement<TeacherManyQuery["find_teacher_by_school_id"]>;

export type LessonReportManyType = ArrayElement<
    Lesson_LessonReportListByLessonIdsQuery["lesson_reports"]
>;

export type FilterDateType = null | string | Date;

export type CourseObjectType = Record<CourseManyType["course_id"], CourseManyType["name"]>;

export type LessonReportObjectType = Record<
    LessonReportManyType["lesson_report_id"],
    LessonReportManyType["report_submitting_status"]
>;

export type TeacherObjectType = Record<TeacherManyType["user_id"], TeacherManyType["name"]>;

export type StudentObjectType = Record<StudentManyType["user_id"], StudentManyType["name"]>;

export type StudentSelectType = Pick<StudentManyType, "user_id" | "name">;

export type TeacherSelectType = Pick<TeacherManyType, "user_id" | "name">;

export type CourseSelectType = Pick<CourseManyType, "course_id" | "name">;

export type LocationManyType = ArrayElement<LocationListByIdsQuery["locations"]>;

export type LocationObjectType = Record<LocationManyType["location_id"], LocationManyType["name"]>;

export interface FilterParams<T> {
    keyword: string;
    filter?: T;
}

export interface QueryOpeningTimeProps {
    start_time: string;
    end_time: string;
    brand_id?: string;
    center_id?: string;
    scheduler_type: string;
}

export type CreateOpeningTimeFormProps = {
    brand_id?: string;
    center_id?: string;
    opening_status: OpeningStatus;
    opening_date: Date | undefined;
    opening_hour: number;
    opening_minutes: number;
    repeat_option: number;
    date_until?: Date;
};

export interface CalendarEventProps {
    id?: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    metaData: {
        title?: string;
        description?: string;
        remark?: string;
    };
    brandId: string;
    centerId: string;
    schedulePattern: {
        repeatOptionData: {
            repeatType: string; // todo: change to RepeatType enum
            count?: Number;
            until?: Date;
        };
    };
}
