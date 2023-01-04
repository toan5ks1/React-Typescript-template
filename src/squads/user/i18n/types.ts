// this file is reserve for language typing
import { LabelTypes } from "src/common/utils/label-generator";

import { TopicStatus } from "manabuf/common/v1/contents_pb";
import { DateOfWeek, Subject } from "manabuf/common/v1/enums_pb";

import { ReactAdmin } from "./react-admin";
import { Auth } from "./resource-types/auth";
import { Books } from "./resource-types/books";
import { EntryExit } from "./resource-types/entry-exit";
import { Staffs } from "./resource-types/staffs";
import { Students } from "./resource-types/students";
import { Topics } from "./resource-types/topics";
import { UserGroupManagement } from "./resource-types/user-group-management";

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
    youAreOffline: string;
    cannotLoadPage: string;
    somethingWentWrong: string;
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

interface Resources {
    languages: Languages;
    common: Common;
    input: Input;
    button: Button;
    from_to: string;
    choices: Choices;
    topics: Topics;
    configs: Configs;
    books: Books;
    students_erp: Students;
    entry_exit: EntryExit;
    staff: Staffs;
    user_group: UserGroupManagement;
    auth: Auth;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
