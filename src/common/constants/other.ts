import { TypeEntity } from "../../typings/react-admin";
import { Entities, EurekaEntities, FatimaEntities } from "./enum";

export const DEFAULT_PRIMARY_KEY = "id";

export const PRIMARY_KEYS: { [x in TypeEntity]?: string } = {
    [Entities.LOS]: "lo_id",
    [Entities.USERS]: "user_id",
    [Entities.BOOKS]: "book_id",
    [Entities.CITIES]: "city_id",
    [Entities.TOPICS]: "topic_id",
    [Entities.MEDIA]: "media_id",
    [Entities.QUIZZES]: "quiz_id",
    [Entities.SCHOOLS]: "school_id",
    [Entities.COURSES]: "course_id",
    [Entities.CONFIGS]: "config_key",
    [Entities.CHAPTERS]: "chapter_id",
    [Entities.STUDENTS]: "student_id",
    [Entities.TEACHERS]: "teacher_id",
    [Entities.STAFF]: "staff_id",
    [Entities.LOCATIONS]: "location_id",
    [Entities.LIVE_LESSONS]: "lesson_id",
    [Entities.LESSON_GROUPS]: "lesson_group_id",
    [Entities.SCHOOL_ADMINS]: "school_admin_id",
    [Entities.INFO_NOTIFICATION_MSGS]: "notification_msg_id",
    [Entities.INFO_NOTIFICATIONS]: "notification_id",
    [Entities.USERS_INFO_NOTIFICATIONS]: "user_notification_id",
    [EurekaEntities.STUDY_PLANS]: "study_plan_id",
    [EurekaEntities.STUDY_PLAN_ITEMS]: "study_plan_item_id",
    [EurekaEntities.ASSIGNMENTS]: "assignment_id",
    [FatimaEntities.STUDENT_PACKAGES]: "student_package_id",
    [FatimaEntities.DISCOUNTS]: "id",
    [FatimaEntities.PRODUCTS]: "id",
    [FatimaEntities.PRODUCT_MATERIALS]: "id",
    [FatimaEntities.PRODUCT_PACKAGES]: "id",
    [FatimaEntities.PRODUCT_FEES]: "id",
};

export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL ?? "";

// Portals
export const PORTAL_DIALOG_FOOTER = "Portal__dialogFooter";

export const PAGE_TITLE_CHAR_LIMIT = 60;
