import { classMasterService } from "src/squads/syllabus/services/master/class-master-service/class-master-service";
import { coursesYasuoService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo-service";

import { assignmentService } from "./assignment-service";
import { lessonGroupsService } from "./bob/lesson-groups-bob/lesson-groups-service";
import { bookService } from "./book-service";
import { chapterService } from "./chapter-service";
import { learningObjectiveService } from "./learning-objective-service";
import { coursesMasterService } from "./master/courses-master-service/courses-master-service";
import { mediaService } from "./media-service";
import { quizzesService } from "./quizzes-service";
import { composeServices, createUseMutation } from "./service-creator";
import { studyPlanItemService } from "./study-plan-item-service";
import { studyPlanService } from "./study-plan-service";
import { topicService } from "./topic-service";
import { lessonGroupYasuoService } from "./yasuo/lesson-groups-yasuo/lesson-groups-service";

// compose all services into service map
const rootService = composeServices({
    book: bookService,
    chapter: chapterService,
    topic: topicService,
    learningObjective: learningObjectiveService,
    assignment: assignmentService,
    media: mediaService,
    quiz: quizzesService,
    studyPlanItem: studyPlanItemService,
    studyPlan: studyPlanService,
    coursesMaster: coursesMasterService,
    coursesYasuo: coursesYasuoService,
    lessonGroups: lessonGroupsService,
    lessonGroupsYasuo: lessonGroupYasuoService,
    classMaster: classMasterService,
});

// create your squad useMutation
const inferMutation = createUseMutation(rootService);

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().

export default inferMutation;
