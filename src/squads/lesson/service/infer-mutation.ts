import { classesService } from "src/squads/lesson/service/bob/classes-service/classes-service";
import { lessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-service";
import { lessonsService } from "src/squads/lesson/service/bob/lessons-service/lessons-service";
import { uploadService } from "src/squads/lesson/service/bob/upload-service/upload-service";
import { studentPackagesService } from "src/squads/lesson/service/fatima/student-packages-service/student-packages-service";
import { coursesServiceYasuo } from "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-yasuo-service";

import { composeServices, createUseMutation } from "./service-creator";

// compose all services into service map
const rootService = composeServices({
    classes: classesService,
    courses: coursesServiceYasuo,
    lessons: lessonsService,
    lessonReports: lessonReportsService,
    studentPackage: studentPackagesService,
    upload: uploadService,
});

// create your squad useQuery
const inferMutation = createUseMutation(rootService);

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().

export default inferMutation;
