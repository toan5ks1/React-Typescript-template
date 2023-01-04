import { convertEnumKeys } from "src/squads/syllabus/common/utils/enum";

import { MediaType, UserGroup } from "manabie-bob/enum_pb";
import { ConversionTaskStatus } from "manabuf/bob/v1/media_pb";
import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";
import { StudyPlanTaskStatus, StudyPlanType, AssignmentType } from "manabuf/eureka/v1/enums_pb";

export const KeyAssignmentTypes = convertEnumKeys(AssignmentType);

export const KeyStudyPlanTypes = convertEnumKeys(StudyPlanType);

export const KeyMediaTypes = convertEnumKeys(MediaType);

export const KeyLOTypes = convertEnumKeys(LearningObjectiveType);

export const KeyStudyPlanTaskStatusTypes = convertEnumKeys(StudyPlanTaskStatus);
export const KeyConversionTaskStatusTypes = convertEnumKeys(ConversionTaskStatus);

export const DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME = 200;

export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);
