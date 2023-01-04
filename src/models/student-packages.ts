export interface StudentPackageHasura {
    properties: PropertiesType;
    student_package_id: string;
    start_at: string;
    end_at: string;
    course_id?: string;
    student_id?: string;
}

export interface StudentCourseHasura {
    start_at: string;
    end_at: string;
    course_id: string;
    course_name: string;
    student_package_id: string;
}

interface PropertiesType {
    can_do_quiz: string[];
    can_watch_video: string[];
    can_view_study_guide: string[];
    limit_online_lesson: number;
}
