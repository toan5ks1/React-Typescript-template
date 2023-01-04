import { formInvalidError } from "src/squads/syllabus/internals/errors";

import { ContentBasicInfo, LearningObjective } from "manabuf/common/v1/contents_pb";
import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";
import {
    UpsertLOsRequest,
    DeleteLosRequest,
} from "manabuf/eureka/v1/learning_objective_modifier_pb";

import NsSyllabus_LearningObjectiveService from "./types";

export const validateUpsertLOs = (data: NsSyllabus_LearningObjectiveService.UpsertLOs) => {
    if (
        !data.topicId ||
        !data.type ||
        !data.name ||
        !data.schoolId ||
        typeof data.displayOrder === undefined
    ) {
        throw formInvalidError;
    }
};

export const createUpsertLOsRequest = (data: NsSyllabus_LearningObjectiveService.UpsertLOs) => {
    const {
        name,
        schoolId,
        displayOrder,
        prerequisitesList = [],
        studyGuide,
        video,
        topicId,
        type,
    } = data;
    const request = new UpsertLOsRequest();
    const lo = new LearningObjective();
    const basicInfo = new ContentBasicInfo();

    if ("loId" in data && data.loId) basicInfo.setId(data.loId);
    basicInfo.setName(name);
    basicInfo.setSchoolId(schoolId);
    basicInfo.setDisplayOrder(displayOrder);

    lo.setInfo(basicInfo);
    lo.setTopicId(topicId);
    lo.setPrerequisitesList(prerequisitesList);
    lo.setType(LearningObjectiveType[type]);

    if (studyGuide) lo.setStudyGuide(studyGuide);
    if (video) lo.setVideo(video);

    request.addLearningObjectives(lo);

    return request;
};

export const createDeleteLOsRequest = ({
    loIdsList,
}: NsSyllabus_LearningObjectiveService.DeleteLOs) => {
    const request = new DeleteLosRequest();

    request.setLoIdsList(loIdsList);

    return request;
};
