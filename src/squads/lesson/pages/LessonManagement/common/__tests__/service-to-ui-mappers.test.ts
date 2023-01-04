import {
    TeacherObjectType,
    LocationObjectType,
    CourseObjectType,
    LessonReportObjectType,
} from "src/common/constants/types";
import { ClassObjectType } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import {
    createMockClassObject,
    createMockCourseObject,
    createMockLessonItemList,
    createMockLessonReportManyList,
    createMockLessonReportObject,
    createMockLocationObject,
    createMockRetrieveLessonsReponseItemList,
    createMockTeacherObject,
} from "src/squads/lesson/test-utils/lesson-management-list";

import { mapDataToLessonListItem } from "src/squads/lesson/pages/LessonManagement/common/service-to-ui-mappers";

describe(mapDataToLessonListItem.name, () => {
    it("should return correct list item", () => {
        const lessonResponseItemList: NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson[] =
            createMockRetrieveLessonsReponseItemList(10);

        const lessonIds = lessonResponseItemList.map((lesson) => lesson.id);
        const lessonReportList = createMockLessonReportManyList(lessonIds);
        const lessonReportObject: LessonReportObjectType =
            createMockLessonReportObject(lessonReportList);
        const teacherObject: TeacherObjectType = createMockTeacherObject();
        const centerObject: LocationObjectType = createMockLocationObject();
        const courseObject: CourseObjectType = createMockCourseObject();
        const classObject: ClassObjectType = createMockClassObject();
        const returnData = createMockLessonItemList(10);

        const results = mapDataToLessonListItem(
            lessonResponseItemList,
            lessonReportObject,
            teacherObject,
            centerObject,
            courseObject,
            classObject
        );

        expect(results).toEqual(returnData);
    });

    it("should return list empty", () => {
        const results = mapDataToLessonListItem([], {}, {});

        expect(results).toEqual([]);
    });
});
