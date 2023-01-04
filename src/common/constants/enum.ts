import { Features as CommunicationFeatures } from "src/squads/communication/common/constants/feature-keys";
import { PaymentFeatures, PaymentFeaturesType } from "src/squads/payment/constants/permission";

enum CommonFeatures {
    //  --- student - teacher
    STUDENT_MANAGEMENT = "User_StudentManagement_BackOffice_StudentManagement",

    STUDENT_MANAGEMENT_STUDENT_LOCATION_COLUMN = "User_StudentManagement_BackOffice_StudentLocationColumn",
    STUDENT_MANAGEMENT_VALIDATION_STUDENT_COURSE = "User_StudentManagement_BackOffice_ValidationStudentCourse",
    STUDENT_MANAGEMENT_STUDENT_RELATIONSHIP_PARENTS = "User_StudentManagement_BackOffice_RelationshipParents",
    STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME = "User_StudentManagement_StudentPhoneticName",
    STUDENT_MANAGEMENT_ENROLLMENT_STATUS_STRING = "User_StudentManagement_BackOffice_StudentEnrollmentStatusString",
    STUDENT_MANAGEMENT_STUDENT_HOME_ADDRESS = "User_StudentManagement_BackOffice_StudentHomeAddress",
    STUDENT_MANAGEMENT_IMPROVE_MESSAGE_IMPORT_STUDENT_AND_IMPORT_PARENT = "User_StudentManagement_BackOffice_ImproveMessageImportStudentAndImportParent",
    STUDENT_MANAGEMENT_SCHOOL_HISTORY = "User_StudentManagement_BackOffice_SchoolHistory",
    STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER = "User_StudentManagement_BackOffice_StudentContactPhoneNumber",

    //-- Staff
    STAFF_MANAGEMENT = "User_StaffManagement_BackOffice_StaffManagement",
    STAFF_MANAGEMENT_USE_STAFF_QUERY = "User_StaffManagement_BackOffice_QueryStaffTable",
    STAFF_MANAGEMENT_STAFF_ASSIGN_USER_GROUP = "User_StaffManagement_BackOffice_AddingUserGroupIntoStaff",
    STAFF_MANAGEMENT_USER_GROUP_LOGIN_VALIDATION = "User_StaffManagement_BackOffice_ValidationLoginForNewUserGroup",
    STAFF_MANAGEMENT_TIMESHEET_SETTING = "User_StaffManagement_BackOffice_TimesheetSetting",

    //-- User group
    USER_GROUP = "User_UserGroupManagement_BackOffice_UserGroupManagement",
    USER_GROUP_SHOW_ALL_ROLE = "User_UserGroupManagement_BackOffice_UserGroupShowAllRole",
    STAFF_MANAGEMENT_STAFF_EMAIL_EDITABLE = "User_StaffManagement_BackOffice_StaffEmailEditable",

    // --- User - Auth
    USER_MULTI_TENANT_LOGIN = "User_Authentication_MultiTenantAuthentication",
    USER_AUTHENTICATION_NEW_GET_BASIC_PROFILE_API = "User_Authentication_BackOffice_ApplyNewGetBasicProfileAPI",
    // --- User - Access Control
    ACCESS_CONTROL_ALLOW_REMOVE_STUDENT_LOCATION = "User_AccessControl_BackOffice_AllowRemoveStudentLocation",

    // ---- User - Timesheet Management
    TIMESHEET_MANAGEMENT = "User_TimesheetManagement_BackOffice_TimesheetManagement",

    // -- User - Master Management
    USER_MASTER_MANAGEMENT_SCHOOL_GROUP = "User_MasterManagement_BackOffice_School_Group",
    USER_MASTER_MANAGEMENT_TAG_GROUP = "User_MasterManagement_BackOffice_Tag_Group",
    USER_MASTER_MANAGEMENT_BANK_GROUP = "User_MasterManagement_BackOffice_Bank_Group",
    USER_MASTER_MANAGEMENT_TIMESHEET_GROUP = "User_MasterManagement_BackOffice_Timesheet_Group",

    //  --- lesson
    LESSON_MANAGEMENT = "Lesson_LessonManagement_BackOffice_LessonManagement",
    ASSIGNED_STUDENT_LIST = "Lesson_AssignedStudent_BackOffice_AssignedStudentList",
    SCHEDULE_MANAGEMENT = "Lesson_ScheduleManagement_BackOffice_ScheduleMenu",
    LIVE_LESSONS_MANAGEMENT = "Lesson_LiveLessonManagement_BackOffice_LiveLessonMenu",
    LESSON_REPORTS_MANAGEMENT = "Lesson_LessonReport_BackOffice_LessonReportManagement",
    COURSE_MANAGEMENT_ADD_LOCATION_FIELD = "Lesson_CourseManagement_BackOffice_AddLocationField",
    GLOBAL_NAV_LOCATION_SELECT = "Lesson_Global_BackOffice_NavLocationSelect",
    LESSON_MANAGEMENT_LOCATION_FILTER = "Lesson_LessonManagement_BackOffice_LocationFilter",
    LESSON_COURSE_MANAGEMENT_REMOVE_COURSE_LOCATION = "Lesson_CourseManagement_BackOffice_RemoveCourseLocation",
    LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD = "Lesson_Course_BackOffice_TeachingMethod",
    LESSON_COURSE_DETAIL_BACK_OFFICE_LOCATION_FIELD = "Lesson_CourseDetail_BackOffice_LocationField",
    LESSON_COURSE_MANAGEMENT_CLASS_MANAGEMENT = "Lesson_CourseManagement_BackOffice_ClassManagement",
    LESSON_MANAGEMENT_LESSON_GROUP = "Lesson_LessonGroup_BackOffice_LessonManagement",
    LESSON_CREATE_LESSON_GROUP = "Lesson_LessonManagement_BackOffice_CreateLessonGroup",
    LESSON_MANAGEMENT_RECURRING_LESSON = "Lesson_LessonManagement_BackOffice_RecurringLesson",
    LESSON_MANAGEMENT_ATTACH_HYPERLINK_STUDENT = "Lesson_LessonManagement_BackOffice_AttachHyperLinkStudent",
    LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON = "Lesson_LessonManagement_BackOffice_DraftOrPublishedLesson",
    LESSON_MANAGEMENT_SHOW_ALERT_WHEN_NO_STUDENT = "Lesson_LessonManagement_BackOffice_ShowAlertWhenNoLessonMember",
    LESSON_MANAGEMENT_LESSON_REPORT_GROUP = "Lesson_LessonManagement_BackOffice_LessonReportGroup",

    //  --- syllabus
    FLASHCARD_MANAGEMENT = "Syllabus_FlashcardManagement_BackOffice_FlashcardManagement",
    EXAM_LO_MANAGEMENT = "Syllabus_ExamLOManagement_BackOffice_ExamLOManagement",
    OFFLINE_STUDY_MANAGEMENT = "Syllabus_OfflineStudyManagement_BackOffice_OfflineStudyManagement",
    ASSIGNMENT_MANAGEMENT = "Syllabus_AssignmentManagement_BackOffice_AssignmentManagement",
    TASK_ASSIGNMENT_MANAGEMENT = "Syllabus_Assignment_TaskAssignmentManagement",
    STUDY_PLAN_MANAGEMENT = "Syllabus_StudyPlanManagement_BackOffice_StudyPlanManagement",
    STUDY_PLAN_MANAGEMENT_BULK_EDIT = "Syllabus_StudyPlanManagement_BackOffice_BulkEditStudyPlan",
    STUDY_PLAN_MANAGEMENT_BULK_EDIT_PHASE2 = "Syllabus_StudyPlanManagement_BackOffice_BulkEditStudyPlanPhase2",
    SYLLABUS_QUIZ_HANDWRITING = "Syllabus_Quiz_BackOffice_Handwriting",
    SYLLABUS_QUIZ_USE_OCR_ENDPOINTS = "Syllabus_Quiz_BackOffice_UseOCREndpoints",
    SYLLABUS_RedirectUpsertQuizToQuizModifierService = "Syllabus_Migration_BackOffice_RedirectUpsertQuizToQuizModifierService",
    SYLLABUS_BOOK_BOOKTYPE_ADHOC = "Syllabus_Book_BackOffice_BookTypeADHOC",
    SYLLABUS_QUIZ_OPTIMIZATION = "Syllabus_Quiz_BackOffice_Optimization",
    SYLLABUS_EXAM_LO_INSTRUCTION = "Syllabus_ExamLO_ExamLOInstruction",

    //  --- entry-exit
    ENTRY_EXIT_MANAGEMENT = "EntryExit_EntryExitManagement_BackOffice_EntryExitRecords",
    ENTRY_EXIT_DOWNLOAD_STUDENT_QR_URLS = "EntryExit_EntryExitManagement_BackOffice_DownloadStudentQrUrls",
    ENTRY_EXIT_UPDATE_QRS_TO_V2 = "EntryExit_EntryExitManagement_BackOffice_UpdateQrsToV2",
    ENTRY_EXIT_MANAGEMENT_DATE_FILTER = "EntryExit_EntryExitManagement_BackOffice_EntryExitRecordsDateFilter",
    ENTRY_EXIT_MANAGEMENT_USE_ENTRYEXITMGMT_QUERIES = "EntryExit_EntryExitManagement_BackOffice_ConnectToEntryExitMgmtDBQueries",

    // --- invoice
    MANUAL_INVOICE = "Invoice_InvoiceManagement_BackOffice_ManualInvoice",
    MANAGE_INVOICE = "Invoice_InvoiceManagement_BackOffice_ManageInvoice",
    MANAGE_PAYMENT_VALIDATION = "Invoice_InvoiceManagement_BackOffice_ManagePaymentValidation",
    SCHEDULED_INVOICES = "Invoice_InvoiceManagement_BackOffice_ScheduledInvoices",
    BULK_ISSUE_INVOICE = "Invoice_InvoiceManagement_BackOffice_BulkIssueInvoice",

    // --- micro frontend
    MICRO_FRONTEND_MANA_EVENTEMITTER = "PlatformPurple_MicroFrontend_ManaEventEmitter",
    MICRO_FRONTEND_MANA_SIDEBAR = "PlatformPurple_MicroFrontend_SidebarRegister",

    // --- architecture
    ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA = "Architecture_MasterManagement_BackOffice_MasterData",
    ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA_RESERVE = "Architecture_MasterManagement_BackOffice_MasterData_Reserve",
    ARCHITECTURE_ACCESSCONTROL_BACK_OFFICE_AUTO_SELECT_FIRST_LOCATION = "Architecture_AccessControl_BackOffice_AutoSelectFirstLocation",
}

// TODO: Refactor after move feature controller internal in mana packs
export const Features = { ...CommonFeatures, ...CommunicationFeatures, ...PaymentFeatures };
export type Features = CommonFeatures | CommunicationFeatures | PaymentFeaturesType;

export enum EurekaEntities {
    ASSIGNMENTS = "assignments",
    STUDY_PLANS = "study_plans",
    STUDY_PLAN_ITEMS = "study_plan_items",
    COURSE_STUDENTS = "course_students",
    COURSE_STUDY_PLANS = "course_study_plans",
    STUDENT_STUDY_PLANS = "student_study_plans",
    TOPICS_ASSIGNMENTS = "topics_assignments",
    BRANDS = "brands",
    CENTERS = "centers",
    SCHEDULER_PATTERNS = "scheduler_patterns",
    TASK_ASSIGNMENTS = "task_assignments",
    EXAM_LO = "exam_los",
}

export enum FatimaEntities {
    PACKAGES = "packages",
    STUDENT_PACKAGES = "student_packages",
    DISCOUNTS = "discounts",
    PRODUCTS = "products",
    PRODUCT_MATERIALS = "product_materials",
    PRODUCT_FEES = "product_fees",
    PRODUCT_PACKAGES = "product_packages",
    PRODUCT_LOCATIONS = "product_locations",
    PRODUCT_GRADES = "product_grades",
    PRODUCT_PRICES = "product_prices",
    TAXES = "taxes",
    ORDERS = "orders",
    PRODUCT_COURSES = "product_courses",
}

//TODO: change entity name
export enum ERPModules {
    NOTIFICATIONS = "notifications",
    NOTIFICATIONSV2 = "notificationsv2",
    SCHEDULE = "schedule",
    LIVE_LESSONS = "live_lessons",
    LESSON_SYLLABUS = "lesson_syllabus",
    LESSON_REPORTS = "lesson_reports",
    STUDENTS = "students_erp",
    LESSON_MANAGEMENT = "lesson_management",
    ASSIGNED_STUDENT_LIST = "assigned_student_list",
    STUDENT_QR_SCANNER = "student_qr_scanner",
    USER_GROUP = "user_group",
    INVOICE_MANAGEMENT = "invoice_management",
    TIMESHEET_MANAGEMENT = "timesheet_management",
}

export enum Entities {
    BOOKS = "books",
    USERS = "users",
    MEDIA = "media",
    TOPICS = "topics",
    CITIES = "cities",
    QUIZZES = "quizzes",
    COURSES = "courses",
    SCHOOLS = "schools",
    LIVE_LESSONS = "live_lessons",
    LESSONS = "lessons",
    LESSON_SYLLABUS = "lesson_syllabus",
    PARENTS = "parents",
    CHAPTERS = "chapters",
    STUDENTS = "students",
    TEACHERS = "teachers",
    STAFF = "staff",
    USER_GROUP = "user_group",
    LOS = "learning_objectives",
    LESSON_GROUPS = "lesson_groups",
    COURSES_BOOKS = "courses_books",
    SCHOOL_ADMINS = "school_admins",
    BOOK_CHAPTERS = "books_chapters",
    LESSON_REPORTS = "lesson_reports",
    STUDENT_PARENTS = "student_parents",
    TOPIC_LOS = "topic_learning_objectives",
    INFO_NOTIFICATIONS = "info_notifications",
    INFO_NOTIFICATION_MSGS = "info_notification_msgs",
    USERS_INFO_NOTIFICATIONS = "users_info_notifications",
    PARTNER_FORM_CONFIGS = "partner_form_configs",
    PARTNER_DYNAMIC_FORM_FIELD_VALUES = "partner_dynamic_form_field_values",
    LESSON_MEMBERS = "lesson_members",
    LESSON_STUDENT_SUBSCRIPTIONS = "lesson_student_subscriptions",
    STUDENT_COURSE_PACKAGES = "student_course_packages",
    MASTERS = "masters",
    ORDERS = "orders",
    ENTRY_EXIT = "entry_exit",
    LOCATIONS = "locations",
    INVOICE = "invoice",
    //TODO: move to module
    CONFIGS = "configs",
    PASSWORD = "password",
    BRIGHTCOVE = "brightcove",
    ORGANIZATIONS = "organizations",
    MASTERS_READER = "masters_reader",
    USER_ACCESS_PATHS = "user_access_paths",
    COURSE_ACCESS_PATHS = "course_access_paths",
    CLASS = "class",
    TIMESHEET_MANAGEMENT = "timesheet_management",
}

export enum ProviderTypes {
    ONE = "GET_ONE",
    ALL = "GET_ALL",
    LIST = "GET_LIST",
    MANY = "GET_MANY",
    UPDATE = "UPDATE",
    CREATE = "CREATE",
    DELETE = "DELETE",
    UPSERT = "UPSERT",
    TITLE = "GET_TITLE",
    PROFILE = "GET_PROFILE",
    GET_TITLES = "GET_TITLES",
    ADD_MEMBER = "ADD_MEMBER",
    REMOVE_BOOK = "REMOVE_BOOK",
    COUNT_STATUS = "COUNT_STATUS",
    UPLOAD_FILES = "UPLOAD_FILES",
    DISPLAY_ORDER = "DISPLAY_ORDER",
    CONVERT_MEDIA = "CONVERT_MEDIA",
    DOWNLOAD_BOOK = "DOWNLOAD_BOOK",
    GET_USERNAMES = "GET_USERNAMES",
    RESET_PASSWORD = "RESET_PASSWORD",
    DUPLICATE_BOOK = "DUPLICATE_BOOK",
    ADD_BOOK_COURSE = "ADD_BOOK_COURSE",
    ATTACH_MATERIAL = "ATTACH_MATERIAL",
    MANY_REFERENCE = "GET_MANY_REFERENCE",
    MANY_REFERENCE_STUDENT_LESSON = "GET_MANY_REFERENCE_STUDENT_LESSON",
    MANY_REFERENCE_WITHOUT_CALC = "MANY_REFERENCE_WITHOUT_CALC",
    MANY_REFERENCE_AUTOCOMPLETE = "GET_MANY_REFERENCE_AUTOCOMPLETE",

    UPLOAD_BRIGHTCOVE = "UPLOAD_BRIGHTCOVE",
    GET_BRIGHTCOVE_VIDEO_INFO = "GET_BRIGHTCOVE_VIDEO_INFO",
    SEND_NOTIFICATION = "SEND_NOTIFICATION",
    RESEND_NOTIFICATION = "RESEND_NOTIFICATION",
    LIST_WITH_FILTER = "GET_LIST_WITH_FILTER",
    RETRIEVE_GRADE_MAP = "RETRIEVE_GRADE_MAP",
    DOWNLOAD_STUDY_PLAN = "DOWNLOAD_STUDY_PLAN",
    VALIDATE_EXTERNAL_ID = "VALIDATE_EXTERNAL_ID",
    UPDATE_DISPLAY_ORDER = "UPDATE_DISPLAY_ORDER",
    GET_STATUS_NOTIFICATION = "GET_STATUS_NOTIFICATION",
    GET_STUDENTS_WITH_SCHOOL = "GET_STUDENTS_WITH_SCHOOL",
    COUNT_READ_OF_NOTIFICATIONS = "COUNT_READ_OF_NOTIFICATIONS",
    GET_GRADES_OF_STUDENTS = "GET_GRADES_OF_STUDENTS",
    // TODO: For new endpoint clear after update to the new endpoint
    CREATE_V2 = "CREATE_V2",
    SUBMIT_LESSON_REPORT = "SUBMIT_LESSON_REPORT",
    SAVE_DRAFT_LESSON_REPORT = "SAVE_DRAFT_LESSON_REPORT",
    COUNT_SCHOOL_ADMINS = "COUNT_SCHOOL_ADMINS",
    GET_PREVIOUS_LESSON_REPORT = "GET_PREVIOUS_LESSON_REPORT",
    RETRIEVE_PARTNER_DOMAIN = "RETRIEVE_PARTNER_DOMAIN",
    GET_ATTENDANCE_STATUS_AND_REMARK = "GET_ATTENDANCE_STATUS_AND_REMARK",
    PARTNER_DYNAMIC_FORM_FIELD_VALUES_WITH_LESSON_REPORT_DETAILS = "PARTNER_DYNAMIC_FORM_FIELD_VALUES_WITH_LESSON_REPORT_DETAILS",
    ONE_LATEST = "ONE_LATEST",
    REMOVE = "REMOVE",
    GET_PRODUCT_IDS_BY_LOCATION_IDS = "GET_PRODUCT_IDS_BY_LOCATION_IDS",
    GET_LOCATION_IDS_BY_COURSE_ID = "GET_LOCATION_IDS_BY_COURSE_ID",
    SCAN_STUDENT_QR = "SCAN_STUDENT_QR",
    GET_PRODUCT_IDS_BY_GRADE_IDS = "GET_PRODUCT_IDS_BY_GRADE_IDS",
    LIST_WITH_FILTER_LOCATIONS = "LIST_WITH_FILTER_LOCATIONS",
    COUNT_STUDENT_LOCATIONS = "COUNT_STUDENT_LOCATIONS",
    GENERATE_STUDENT_QR_CODES = "GENERATE_STUDENT_QR_CODES",
    GET_STUDENT_COURSE_SUBSCRIPTION = "GET_STUDENT_COURSE_SUBSCRIPTION",
    MANY_REFERENCE_WITH_LOCATION_WITHOUT_CALC = "MANY_REFERENCE_WITH_LOCATION_WITHOUT_CALC",
    MANY_WITH_LOCATION = "GET_MANY_WITH_LOCATION",
}

export enum SearchEngine {
    TAB = "tab",
    TYPE = "type",
    BOOK_ID = "bookId",
    TOPIC_ID = "topicId",
    PARENT_ID = "parentId",
    CHAPTER_ID = "chapterId",
    COURSE_ID = "courseId",
}

export enum MutationMenus {
    EDIT = "edit",
    CREATE = "create",
    CANCEL = "cancel",
    RESTORE = "restore",
    UPDATE = "update",
    DETAIL = "detail",
    DELETE = "delete",
    MOVE_UP = "moveUp",
    DOWNLOAD = "download",
    MOVE_DOWN = "moveDown",
    DUPLICATE = "duplicate",
    UPLOAD_FILE = "uploadFile",
    ADD_COURSE = "addCourse",
    RENAME = "rename",
    ARCHIVE = "archive",
    UNARCHIVE = "unarchive",
    RE_ISSUE_PASSWORD = "reIssuePassword",
    REMOVE = "remove",
    CREATE_REGULAR_COURSE = "createRegularCourse",
    CREATE_NEXT_YEAR_COURSE = "createNextYearCourse",
    PRINT_AS_STUDENT_CARD = "printAsStudentCard",
    PRINT_AS_QR_CODE_SHEET = "printAsQrCodeSheet",
    DOWNLOAD_STUDENT_QR_URLS = "downloadStudentQrUrls",
    IMPORT_PARENTS = "importParents",
    COMMUNICATION_VIEW_RESULT_QUESTIONNAIRE = "viewResultQuestionnaire",
    COMMUNICATION_DOWNLOAD_RESULT_QUESTIONNAIRE = "downloadResultQuestionnaire",
    COMMUNICATION_NOTIFY_UNREAD = "notifyUnread",
    PAYMENT_CREATE_NEW_ORDER = "createNewOrder",
    PAYMENT_CREATE_ENROLLMENT_ORDER = "createEnrollmentOrder",
    PAYMENT_CREATE_BULK_ORDER = "createBulkOrder",
    PAYMENT_CREATE_CUSTOM_BILLING_ORDER = "createCustomBillingOrder",
}

export type MoveDirection = MutationMenus.MOVE_DOWN | MutationMenus.MOVE_UP;

export enum NotifyActions {
    FAILURE = "failure",
    SUCCESS = "success",
}

export enum NotifyTypes {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success",
    WARNING = "warning",
}

export enum NotifyExtraActionTypes {
    DETAIL = "detail",
}

export enum ImageType {
    PNG = "image/png",
    GIF = "image/gif",
    JPG = "image/jpg",
    JPEG = "image/jpeg",
}

export enum VideoType {
    AVI = "video/avi",
    MP4 = "video/mp4",
    M4V = "video/m4v",
    WEBM = "video/webm",
}

export enum AudioType {
    AIFF = "audio/aiff",
    MPEG = "audio/mpeg",
    MIDI = "audio/midi",
    WAVE = "audio/wave",
    WAV = "audio/wav",
    BASIC = "audio/basic",
    OGG = "audio/ogg",
    MP3 = "audio/mp3",
}

export enum MIMETypes {
    CSV = "text/csv",
    VIDEO = "video/*",
    IMAGE = "image/*",
    AUDIO = "audio/*",
    PDF = "application/pdf",
    MSWORD = "application/msword",
}

export enum StudyPlanTypes {
    Assignment = "Assignment",
    LO = "Learning Objective",
    FlashCard = "Flash Card",
    OfflineStudy = "Offline Learning",
    ExamLO = "Exam LO",
    TaskAssignment = "Task Assignment",
}

export enum UploadState {
    DEFAULT,
    LOADING,
    FAILED,
}

export type FormatDateOptions =
    | "HH"
    | "mm"
    | "HH:mm"
    | "LL"
    | "yyyy/LL/dd"
    | "yyyy/LL/dd, HH:mm"
    | "cccc"
    | "yyyy/LL/dd, cccc"
    | "LL/dd"
    | "LL/dd, HH:mm"
    | "yyyy/LL"
    | "LLL"
    | "yyyyLLdd";

export type FormatStartAndEndDateOptions = "yyyy/LL/dd, HH:mm - HH:mm" | "HH:mm - HH:mm";

export type FormSize = "small" | "medium";

export enum ModeOpenDialog {
    ADD = "add",
    EDIT = "edit",
}

export enum MathJaxLoadStatus {
    NOT_INJECTED = "NOT_INJECTED",
    INJECTED = "INJECTED",
    LOADED = "LOADED",
}

export enum ScheduleSearchType {
    BRAND = 0,
    CENTER = 1,
}

export enum DayConditionType {
    ALL_DAY = 0,
    SPECIFIC_TIME = 1,
}

export enum HasuraErrorCode {
    INVALID_JWT = "invalid-jwt",
    INVALID_HEADERS = "invalid-headers",
    TOKEN_EXPIRED = "token-expired",
    ACCESS_DENIED = "access-denied",
    VALIDATION_FAILED = "validation-failed",
    DATA_EXCEPTION = "data-exception",
    CONSTRAINT_VIOLATION = "constraint-violation",
    PARSE_FAILED = "parse-failed",
    POSTGRES_ERROR = "postgres-error",
}
