import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import {
    ContentBasicInfo,
    LearningObjective as LearningObjectiveRequest,
} from "manabuf/common/v1/contents_pb";
import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";

export declare namespace NsSyllabus_LearningObjectiveService {
    interface UpdateLearningObjective extends Pick<LearningObjectiveRequest.AsObject, "topicId"> {
        loId?: ContentBasicInfo.AsObject["id"];
        name: ContentBasicInfo.AsObject["name"];
        displayOrder: ContentBasicInfo.AsObject["displayOrder"];
        schoolId: ContentBasicInfo.AsObject["schoolId"];
        prerequisitesList?: LearningObjectiveRequest.AsObject["prerequisitesList"];
        studyGuide?: LearningObjectiveRequest.AsObject["studyGuide"];
        video?: LearningObjectiveRequest.AsObject["video"];
        type: keyof typeof LearningObjectiveType;
    }

    interface CreateLearningObjective extends Omit<UpdateLearningObjective, "loId"> {}

    export type UpsertLOs = CreateLearningObjective | UpdateLearningObjective;
    interface DeleteLOs extends NsSyllabus_Yasuo_CoursesService.DeleteLos {}
}

export default NsSyllabus_LearningObjectiveService;
