import { ReactAdmin } from "./react-admin";
import { Notifications } from "./resource-types/notifications";
import { NotificationsV2 } from "./resource-types/notificationsv2";

import { Configs } from "src/squads/communication/i18n/resource-types/config";

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

interface InputError {
    required: string;
    limitLength: string;
    dateMustComeAfter: string;
    timeMustComeBefore: string;
    fieldCannotBeBlank: string;
    duplicatedAnswer: string;
    invalidExpirationDate: string;
    invalidExpirationTime: string;
    invalidFromDate: string;
    invalidToDate: string;
    invalidFromTime: string;
    invalidToTime: string;
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

interface Choices {
    grades: Grades;
    user_group: UserGroup;
}

interface Resources {
    common: Common;
    input: Input;
    choices: Choices;
    configs: Configs;
    notifications: Notifications;
    notificationsv2: NotificationsV2;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
