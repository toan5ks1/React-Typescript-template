import { classService } from "src/squads/lesson/service/bob/class-service/class-service";
import { courseAccessPathsService } from "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-service";
import { coursesService } from "src/squads/lesson/service/bob/courses-service/courses-service";
import { lessonGroupsService } from "src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-service";
import { lessonMembersService } from "src/squads/lesson/service/bob/lesson-members-service/lesson-members-service";
import { lessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-service";
import { lessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/lesson-student-subscriptions-service";
import { lessonsService } from "src/squads/lesson/service/bob/lessons-service/lessons-service";
import { locationsService } from "src/squads/lesson/service/bob/locations-service/locations-service";
import { mediaService } from "src/squads/lesson/service/bob/media-service/media-service";
import { partnerDynamicFormFieldValuesService } from "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-service";
import { partnerFormConfigsService } from "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-service";
import { schedulerService } from "src/squads/lesson/service/bob/scheduler-service/scheduler-service";
import { studentsService } from "src/squads/lesson/service/bob/students-service/students-service";
import { teachersService } from "src/squads/lesson/service/bob/teachers-service/teachers-service";
import { courseStudentsService } from "src/squads/lesson/service/eureka/course-students-service/course-students-service";
import { studentPackagesService } from "src/squads/lesson/service/fatima/student-packages-service/student-packages-service";
import { lessonsService as lessonsServiceLessonMgmt } from "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-service";
import { locationsServiceMaster } from "src/squads/lesson/service/master/locations-master-service/locations-master-service";
import { brightcoveService } from "src/squads/lesson/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-service";

import {
    composeServices,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "./service-creator";

// compose all services into service map
const rootService = composeServices({
    // Bob
    media: mediaService,
    courses: coursesService,
    lessons: lessonsService,
    lessonManagements: lessonsServiceLessonMgmt,
    students: studentsService,
    teachers: teachersService,
    locations: locationsService,
    lessonGroups: lessonGroupsService,
    lessonReports: lessonReportsService,
    lessonMembers: lessonMembersService,
    partnerFormConfigs: partnerFormConfigsService,
    courseAccessPathsService: courseAccessPathsService,
    lessonStudentSubscriptions: lessonStudentSubscriptionsService,
    partnerDynamicFormFieldValues: partnerDynamicFormFieldValuesService,
    class: classService,
    // Fatima
    studentPackages: studentPackagesService,
    // Eureka
    courseStudents: courseStudentsService,
    // Master
    locationsMaster: locationsServiceMaster,
    scheduler: schedulerService,
    // Yasuo
    brightcove: brightcoveService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);
