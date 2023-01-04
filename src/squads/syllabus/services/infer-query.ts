import standaloneQueryClient from "src/squads/syllabus/internals/standalone-query-client";
import { classService } from "src/squads/syllabus/services/bob/class-service/class-service";
import { coursesService } from "src/squads/syllabus/services/bob/courses-service/courses-service";
import { lessonGroupsService } from "src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-service";
import { lessonsSyllabusService } from "src/squads/syllabus/services/bob/live-lessons-bob/live-lessons-bob-service";
import masterReaderService from "src/squads/syllabus/services/master-reader-service";
import { Callable } from "src/squads/syllabus/services/service-types";

import { assignmentService } from "./assignment-service";
import { locationService } from "./bob/location-service-bob/location-service";
import { bookService } from "./book-service";
import { brightcoveService } from "./bright-cove-service";
import { chapterService } from "./chapter-service";
import { eurekaCourseReaderService } from "./eureka-course-reader-service";
import { eurekaCourseStudentService } from "./eureka-course-student-service";
import { eurekaCourseStudyPlanService } from "./eureka-course-study-plan-service";
import { eurekaStudentStudyPlanService } from "./eureka-student-study-plan-service";
import { learningObjectiveService } from "./learning-objective-service";
import { mediaService } from "./media-service";
import { quizzesService } from "./quizzes-service";
import { composeServices, createUseQuery, createUseQueryPagination } from "./service-creator";
import { studentService } from "./student-service";
import { studyPlanService } from "./study-plan-service";
import { topicAssignmentService } from "./topic-assignment-service";
import { bobTopicLearningObjectiveService } from "./topic-learning-objective-service";
import { topicService } from "./topic-service";

// compose all services into service map
const rootService = composeServices({
    book: bookService,
    topicLearningObjective: bobTopicLearningObjectiveService,
    topicAssignment: topicAssignmentService,
    quizzes: quizzesService,
    learningObjective: learningObjectiveService,
    courses: coursesService,
    assignment: assignmentService,
    media: mediaService,
    brightcove: brightcoveService,
    chapter: chapterService,
    courseStudyPlan: eurekaCourseStudyPlanService,
    student: studentService,
    studentStudyPlan: eurekaStudentStudyPlanService,
    courseStudent: eurekaCourseStudentService,
    studyPlan: studyPlanService,
    courseReader: eurekaCourseReaderService,
    topic: topicService,
    lessonsSyllabus: lessonsSyllabusService,
    lessonGroups: lessonGroupsService,
    masterReader: masterReaderService,
    class: classService,
    location: locationService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export type QueryEntity = keyof typeof rootService;

export type QueryAction<T extends QueryEntity> = keyof typeof rootService[T]["query"];

export type CallableQueryHandler<E extends QueryEntity, A extends QueryAction<E>> = Callable<
    typeof rootService[E]["query"][A]
>;

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(rootService);
