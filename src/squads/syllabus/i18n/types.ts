// this file is reserve for language typing
import { LabelTypes } from "src/common/utils/label-generator";

import { CourseTeachingMethod } from "manabuf/mastermgmt/v1/course_pb";

import { ReactAdmin } from "./react-admin";
import { Assignments } from "./resource-types/assignments";
import { Books } from "./resource-types/books";
import { Chapters } from "./resource-types/chapters";
import { Class } from "./resource-types/class";
import { Courses } from "./resource-types/courses";
import { Exams } from "./resource-types/exams";
import { LearningObjectives } from "./resource-types/learning-objectives";
import { Quizzes } from "./resource-types/quizzes";
import { StudyPlans } from "./resource-types/study-plan";
import { TaskAssignments } from "./resource-types/task-assignments";
import { Topics } from "./resource-types/topics";

import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

interface Common {
    name: string;
    material: string;
    removeMaterial: string;
    removeMaterialConfirmText: string;
    youAreOffline: string;
    cannotLoadPage: string;
    someThingWentWrong: string;
    pleaseHelpUsReport: string;
    back: string;
    details: string;
    netWorkUnstable: string;
}

type Languages = {
    [x in LanguageEnums]: string;
};

interface InputError {
    required: string;
    fieldCannotBeBlank: string;
}
interface Input {
    error: InputError;
    dragAndDropFileHere: string;
    dragAndDropCSVFileHere: string;
    uploading: string;
    cannotUpload: string;
    pasteVideoLink: string;
    browse: string;
    pleaseUploadFileSizeSmaller: string;
}

interface Grades {
    [x: number]: string;
}

export interface UserGroup {
    USER_GROUP_ADMIN: string;
    USER_GROUP_SCHOOL_ADMIN: string;
    USER_GROUP_STUDENT: string;
    USER_GROUP_TEACHER: string;
    USER_GROUP_PARENT: string;
}

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

type CourseTeachingMethodTypes = {
    [x in Exclude<keyof typeof CourseTeachingMethod, "COURSE_TEACHING_METHOD_NONE">]: string;
};

interface Choices {
    grades: Grades;
    quizTypes: QuizTypes;
    listTypes: ListTypes;
    languages: Languages;
    answerConfigs: AnswerConfigs;
    teachingMethod: CourseTeachingMethodTypes;
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
    action: string;
}

interface Resources {
    common: Common;
    input: Input;
    choices: Choices;
    courses: Courses;
    chapters: Chapters;
    topics: Topics;
    learning_objectives: LearningObjectives;
    quizzes: Quizzes;
    books: Books;
    assignments: Assignments;
    task_assignments: TaskAssignments;
    lesson_syllabus: LessonSyllabus; //for lesson in course
    study_plans: StudyPlans;
    class: Class;
    exam_los: Exams;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
