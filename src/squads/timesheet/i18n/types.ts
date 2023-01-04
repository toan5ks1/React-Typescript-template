// this file is reserve for language typing
import { LabelTypes } from "src/common/utils/label-generator";

import { TopicStatus } from "manabuf/common/v1/contents_pb";
import { DateOfWeek, Subject } from "manabuf/common/v1/enums_pb";

import { TimesheetManagement } from "./resource-types/timesheet-management";

import { Configs } from "src/i18n/resource-types/config";
import { LanguageEnums } from "src/squads/timesheet/typings/i18n-provider";

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
    deleteDialogTitle: string;
    deleteConfirmText: string;
    youAreOffline: string;
    createdFail: string;
    updatedFail: string;
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

export interface Action {
    add_filter: string;
    add: string;
    back: string;
    bulk_actions: string;
    cancel: string;
    clear_input_value: string;
    clone: string;
    confirm: string;
    create: string;
    create_item: string;
    delete: string;
    discard: string;
    edit: string;
    export: string;
    list: string;
    refresh: string;
    remove_filter: string;
    remove: string;
    save: string;
    search: string;
    show: string;
    sort: string;
    undo: string;
    unselect: string;
    expand: string;
    close: string;
    open_menu: string;
    close_menu: string;
    copy: string;
    leave: string;
    addMore: string;
    moveUp: string;
    moveDown: string;
    detail: string;
    duplicate: string;
    moreAction: string;
    warning: string;
    OK: string;
    resend: string;
    download: string;
    update: string;
    uploadFile: string;
    addCourse: string;
    upload: string;
    reset: string;
    apply: string;
    rename: string;
    selectAllItems: string;
    filter: string;
    archive: string;
    unarchive: string;
    activate: string;
    reIssuePassword: string;
    printAsStudentCard: string;
    printAsQrCodeSheet: string;
    createNewOrder: string;
    createEnrollmentOrder: string;
    createBulkOrder: string;
    downloadStudentQrUrls: string;
    importParents: string;
    createCustomBillingOrder: string;
}

interface Message {
    about: string;
    are_you_sure: string;
    bulk_delete_content: string;
    bulk_delete_title: string;
    delete_content: string;
    delete_title: string;
    details: string;
    error: string;
    invalid_form: string;
    loading: string;
    no: string;
    not_found: string;
    yes: string;
    unsaved_changes: string;
    schoolDontHaveTeacherPleaseCreateTeacherBeforeCreateClass: string;
    just_show_verified_schools: string;
    please_select_member_before_update: string;
    please_select_teacher_before_add: string;
    this_school_dont_have_specify_config: string;
    this_is_default_config: string;
    pls_select_time_duration_or_expired_at: string;
    pleaseSearchByTeacherEmail: string;
    maxFileSizeIs: string;
    noDataMessage: string;
    noData: string;
    noDataInformation: string;
    canNotRemoveBooksFromCourse: string;
    downloadBookSuccess: string;
    downloadBookFail: string;
    downloadStudyPlanSuccess: string;
    duplicateBookSuccess: string;
    duplicateBookFail: string;
    mustBeAValidPhoneNumber: string;
    moveSuccess: string;
    moveFail: string;
    uploadBrightcoveLinkFail: string;
    brightcoveVideoLinkHasExisted: string;
    unableToLoadData: string;
    unexpected: string;
    invalidSearchQueryReturningAllItems: string;
    linkLOsSuccess: string;
    youAreOffline: string;
    youAreRestoredNetwork: string;
    unknown: string;
}

export interface Firebase {
    invalid_email: string;
    user_disabled: string;
    user_not_found: string;
    wrong_password: string;
    missing_android_pkg_name: string;
    missing_continue_uri: string;
    missing_ios_bundle_id: string;
    invalid_continue_uri: string;
    unauthorized_continue_uri: string;
    permission_denied: string;
    too_many_request: string;
    quota_exceeded: string;
}

interface Resources {
    languages: Languages;
    common: Common;
    input: Input;
    button: Button;
    from_to: string;
    choices: Choices;
    configs: Configs;
    action: Action;
    message: Message;
    timesheet_management: TimesheetManagement;
}

export default interface TranslationKeys {
    resources: Resources;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
