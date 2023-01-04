import { Entities, EurekaEntities, FatimaEntities } from "src/common/constants/enum";

import brands from "./brands";
import brightcove from "./brightcove";
import centers from "./centers";
import cities from "./cities";
import courseStudents from "./course-students";
import courses from "./courses";
import lessonGroups from "./lesson-groups";
import lessonReports from "./lesson-reports";
import liveLessons from "./live-lessons";
import media from "./media";
import parents from "./parents";
import password from "./password";
import schedulerPatterns from "./scheduler-patterns";
import schoolAdmins from "./school-admins";
import schools from "./schools";
import studentPackages from "./student-packages";
import studentEntryExit from './student-entry-exit'
import teachers from "./teachers";
import locations from "./locations";
import students from "./students";
import users from "./users";
import studentParent from "./student-parents";
import lessons from "./lessons";
import lessonStudentSubscriptions from "./lesson-student-subscriptions";
import lessonSyllabus from './lesson-syllabus';
import organizations from './organizations';
import mastersReader from "./masters-reader"
import userAccessPaths from "./user-access-paths";
import orders from "./orders";
import courseAccessPaths from "./course-access-paths";
import courseClass from "./course-class";

export type ServiceRoutingsReturns = {
    [Entities.USERS]: typeof users;
    [Entities.MEDIA]: typeof media;
    [Entities.CITIES]: typeof cities;
    [Entities.SCHOOLS]: typeof schools;
    [Entities.COURSES]: typeof courses;
    [Entities.PASSWORD]: typeof password;
    [Entities.TEACHERS]: typeof teachers;
    [Entities.STUDENTS]: typeof students;
    [Entities.BRIGHTCOVE]: typeof brightcove;
    [Entities.SCHOOL_ADMINS]: typeof schoolAdmins;
    [Entities.LESSON_GROUPS]: typeof lessonGroups;
    [EurekaEntities.COURSE_STUDENTS]: typeof courseStudents;
    [FatimaEntities.STUDENT_PACKAGES]: typeof studentPackages;
    [Entities.ENTRY_EXIT]: typeof studentEntryExit
    [EurekaEntities.BRANDS]: typeof brands;
    [EurekaEntities.CENTERS]: typeof centers;
    [Entities.LIVE_LESSONS]: typeof liveLessons;
    [Entities.LESSONS]: typeof lessons;
    [Entities.LESSON_SYLLABUS]: typeof lessonSyllabus;
    [Entities.PARENTS]: typeof parents;
    [Entities.STUDENT_PARENTS]: typeof studentParent;
    [EurekaEntities.SCHEDULER_PATTERNS]: typeof schedulerPatterns;
    [Entities.LESSON_REPORTS]: typeof lessonReports;
    [Entities.LOCATIONS]: typeof locations;
    [Entities.LESSON_STUDENT_SUBSCRIPTIONS]: typeof lessonStudentSubscriptions;
    [Entities.ORGANIZATIONS]: typeof organizations;
    [Entities.MASTERS_READER]: typeof mastersReader;
    [Entities.USER_ACCESS_PATHS]: typeof userAccessPaths;
    [FatimaEntities.ORDERS]: typeof orders;
    [Entities.COURSE_ACCESS_PATHS]: typeof courseAccessPaths;
    [Entities.CLASS]: typeof courseClass;
};

//get type-intelligent from files
const serviceRoutings: ServiceRoutingsReturns = {
    [Entities.USERS]: users,
    [Entities.MEDIA]: media,
    [Entities.CITIES]: cities,
    [Entities.SCHOOLS]: schools,
    [Entities.COURSES]: courses,
    [Entities.PASSWORD]: password,
    [Entities.TEACHERS]: teachers,
    [Entities.STUDENTS]: students,
    [Entities.BRIGHTCOVE]: brightcove,
    [Entities.SCHOOL_ADMINS]: schoolAdmins,
    [Entities.LESSON_GROUPS]: lessonGroups,
    [EurekaEntities.COURSE_STUDENTS]: courseStudents,
    [FatimaEntities.STUDENT_PACKAGES]: studentPackages,
    [Entities.ENTRY_EXIT]: studentEntryExit,
    [EurekaEntities.BRANDS]: brands,
    [EurekaEntities.CENTERS]: centers,
    [Entities.LIVE_LESSONS]: liveLessons,
    [Entities.LESSONS]: lessons,
    [Entities.LESSON_SYLLABUS]: lessonSyllabus,
    [Entities.PARENTS]: parents,
    [Entities.STUDENT_PARENTS]: studentParent,
    [EurekaEntities.SCHEDULER_PATTERNS]: schedulerPatterns,
    [Entities.LESSON_REPORTS]: lessonReports,
    [Entities.LOCATIONS]: locations,
    [Entities.USER_ACCESS_PATHS]: userAccessPaths,
    [Entities.LESSON_STUDENT_SUBSCRIPTIONS]: lessonStudentSubscriptions,
    [Entities.ORGANIZATIONS]: organizations,
    [Entities.MASTERS_READER]:  mastersReader,
    [FatimaEntities.ORDERS]: orders,
    [Entities.COURSE_ACCESS_PATHS]: courseAccessPaths,
    [Entities.CLASS]: courseClass,
};

export default serviceRoutings;
