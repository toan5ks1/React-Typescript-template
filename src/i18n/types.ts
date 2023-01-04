// this file is reserve for language typing
import { LabelTypes } from "src/common/utils/label-generator";

import { TopicStatus } from "manabuf/common/v1/contents_pb";
import { DateOfWeek, Subject } from "manabuf/common/v1/enums_pb";

import { ReactAdmin } from "./react-admin";
import { AssignedStudentList } from "./resource-types/assigned-student-list";
import { Assignments } from "./resource-types/assignments";
import { Books } from "./resource-types/books";
import { Chapters } from "./resource-types/chapters";
import { Courses } from "./resource-types/courses";
import { EntryExit } from "./resource-types/entry-exit";
import { Invoice } from "./resource-types/invoice";
import { LearningObjectives } from "./resource-types/learning-objectives";
import { LessonManagement } from "./resource-types/lesson-management";
import { LessonReport } from "./resource-types/lesson-reports";
import { LiveLessons } from "./resource-types/live-lesson";
import { Masters } from "./resource-types/masters";
import { Notifications } from "./resource-types/notifications";
import { NotificationsV2 } from "./resource-types/notificationsv2";
import { Orders } from "./resource-types/orders";
import { Quizzes } from "./resource-types/quizzes";
import { Schedules } from "./resource-types/schedules";
import { Students } from "./resource-types/students";
import { StudyPlans } from "./resource-types/study-plan";
import { TimesheetManagement } from "./resource-types/timesheet-management";
import { Topics } from "./resource-types/topics";

import { Configs } from "src/i18n/resource-types/config";
import { LanguageEnums } from "src/typings/i18n-provider";

interface DayOfWeek {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

interface Common {
    day: DayOfWeek;
    name: string;
    city: string;
    district: string;
    school: string;
    just_show_system_school: string;
    teacher: string;
    config: string;
    material: string;
    removeMaterial: string;
    removeMaterialConfirmText: string;
    doYouWantToDoThis: string;
    viewDetail: string;
    accountInfo: string;
    account: string;
    enterYourKeyword: string;
    noResult: string;
    noResultSearchAndFilter: string;
    noResultSearch: string;
    studyItem: string;
    students: string;
    parents: string;
    youFilterBy: string;
    all: string;
    noResultFound: string;
    pleaseTryAgainWithDifferentKeywordsOrFilters: string;
    netWorkUnstable: string;
}

type Languages = {
    [x in LanguageEnums]: string;
};

interface InputError {
    required: string;
    limitLength: string;
    dateMustComeAfter: string;
    timeMustComeBefore: string;
    fieldCannotBeBlank: string;
}
interface Input {
    error: InputError;
    dropFileHere: string;
    pleaseUploadFileSizeLessThan: string;
    dragAndDropFileHere: string;
    dragAndDropCSVFileHere: string;
    uploading: string;
    cannotUpload: string;
    pasteVideoLink: string;
    chooseFilesToUpload: string;
    browse: string;
    pleaseUploadFileSizeSmaller: string;
}

interface Button {
    audio: string;
    image: string;
    blank: string;
    advanced: string;
    clearAll: string;
}

interface Grades {
    [x: number]: string;
}

type Subjects = {
    [x in keyof typeof Subject]: string;
};

interface PlanPrivileges {
    CAN_ACCESS_LEARNING_TOPICS: string;
    CAN_ACCESS_PRACTICE_TOPICS: string;
    CAN_ACCESS_MOCK_EXAMS: string;
    CAN_ACCESS_ALL_LOS: string;
    CAN_ACCESS_SOME_LOS: string;
    CAN_WATCH_VIDEOS: string;
    CAN_READ_STUDY_GUIDES: string;
    CAN_SKIP_VIDEOS: string;
    CAN_CHAT_WITH_TEACHER: string;
}

export interface UserGroup {
    USER_GROUP_ADMIN: string;
    USER_GROUP_SCHOOL_ADMIN: string;
    USER_GROUP_STUDENT: string;
    USER_GROUP_TEACHER: string;
    USER_GROUP_PARENT: string;
}

interface TopicTypes {
    TOPIC_TYPE_EXAM: string;
    TOPIC_TYPE_LEARNING: string;
    TOPIC_TYPE_PRACTICAL: string;
    TOPIC_TYPE_ASSIGNMENT: string;
    TOPIC_TYPE_LIVE_LESSON: string;
}

type TopicStatuses = {
    [x in keyof typeof TopicStatus]: string;
};

type QuizTypes = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
};

type ListTypes = {
    [x in keyof typeof LabelTypes]: string;
};

type AnswerConfigs = {
    "0": string;
    "1": string;
};

type DayOfWeekTypes = {
    [x in keyof typeof DateOfWeek]: string;
};

interface Choices {
    grades: Grades;
    subjects: Subjects;
    user_group: UserGroup;
    quizTypes: QuizTypes;
    listTypes: ListTypes;
    languages: Languages;
    topic_types: TopicTypes;
    answerConfigs: AnswerConfigs;
    topic_statuses: TopicStatuses;
    plan_privileges: PlanPrivileges;
    dayOfWeek: DayOfWeekTypes;
}

interface Filter {
    name: string;
    phone: string;
    system: string;
}

interface List {
    id: string;
    action: string;
    name: string;
    phone: string;
    country: string;
    city: string;
    district: string;
    system: string;
    latlng: string;
    filter: Filter;
}

interface Edit {
    name: string;
    phone: string;
    country: string;
    city: string;
    district: string;
    system: string;
    school: string;
    config: string;
    set_duration: string;
    privileges: string;
    plan_id: string;
    plan_expired_at: string;
    plan_duration: string;
}

interface Schools {
    name: string;
    school_info: string;
    list: List;
    edit: Edit;
    detail: {
        name: string;
        phone: string;
        country: string;
        city: string;
        district: string;
        school_detail: string;
        school_config: string;
        privileges: string;
        plan_id: string;
        plan_expired_at: string;
        plan_duration: string;
        admin: {
            title: string;
            label: string;
            name: string;
            phone: string;
            email: string;
        };
        createAccount: {
            title: string;
            buttonName: string;
            entityName: string;
        };
    };
    action: {
        classes: string;
    };
}

interface Teachers {
    name: string;
    detail: {
        teacher_detail: string;
        avatar: string;
        name: string;
        email: string;
        phone: string;
        country: string;
        total_class: string;
        classes: string;
        schools: string;
        class: {
            school: string;
            class_name: string;
            subjects: string;
            grades: string;
            status: string;
        };
        school: {
            id: string;
            name: string;
            country: string;
            city: string;
            district: string;
            remove_from_school: string;
            join_school: string;
            add_teacher_to_school: string;
        };
    };
    create: {
        title: string;
        label: {
            name: string;
            phone: string;
            email: string;
        };
    };
    edit: {
        name: string;
    };
    list: {
        class_owned: string;
        school: string;
        name: string;
        email: string;
        action: string;
        filter: {
            name: string;
            email: string;
            school_name: string;
        };
    };
    addNewButton: string;
    title: string;
    teacherList: string;
    colName: string;
    colEmail: string;
    noTeachers: string;
    teacherInfo: string;
    editTeacherInfo: string;
}

interface PrevStudents {
    name: string;
    title: string;
    addNewButton: string;
    studentList: string;
    colName: string;
    colEmail: string;
    colPhone: string;
    colGrade: string;
    colCourse: string;
    noStudents: string;
    studentInfo: string;
    studentName: string;
    createTitle: string;
    editTitle: string;
    enterName: string;
    enterEmail: string;
    enterPhone: string;
    pleaseSelect: string;
    courseDetails: string;
    noCourses: string;
    colCourseName: string;
    colCourseEndDate: string;
    addCourseTitle: string;
    editCourseTitle: string;
    courseName: string;
    startDate: string;
    expireDate: string;
    neverLoggedIn: string;
}
interface LessonSyllabus {
    class: string;
    student: string;
    lessonProgress: string;
    teacher: string;
    duration: string;
    startTime: string;
    lesson: string;
    createTitle: string;
    statusCompleted: string;
    statusInProgress: string;
    statusNotStarted: string;
    statusUnknown: string;
    status: string;
    lessonList: string;
    lessonName: string;
    noLesson: string;
    teacherAssistant: string;
    teacherAssistantList: string;
    teacherList: string;
    studentList: string;
    classroomList: string;
    uploadMaterials: string;
    materialsList: string;
    week: string;
}
interface Staff {
    name: string;
    titles: {
        staffManagement: string;
    };
}

interface UserGroupManagement {
    name: string;
}

interface Resources {
    languages: Languages;
    common: Common;
    input: Input;
    button: Button;
    from_to: string;
    choices: Choices;
    schools: Schools;
    teachers: Teachers;
    courses: Courses;
    chapters: Chapters;
    topics: Topics;
    learning_objectives: LearningObjectives;
    configs: Configs;
    quizzes: Quizzes;
    books: Books;
    assignments: Assignments;
    students: PrevStudents;
    notifications: Notifications;
    notificationsv2: NotificationsV2;
    schedule: Schedules;
    live_lessons: LiveLessons;
    lesson_reports: LessonReport;
    students_erp: Students;
    lesson_syllabus: LessonSyllabus; //for lesson in course
    lesson_management: LessonManagement;
    assigned_student_list: AssignedStudentList;
    masters: Masters;
    orders: Orders;
    entry_exit: EntryExit;
    invoice: Invoice;
    study_plans: StudyPlans;
    staff: Staff;
    user_group: UserGroupManagement;
    timesheet_management: TimesheetManagement;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
