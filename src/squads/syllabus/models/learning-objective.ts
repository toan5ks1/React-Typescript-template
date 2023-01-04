import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { BrightcoveVideoInfo } from "src/squads/syllabus/models/brightcove";

import { LearningObjective as LOBob } from "manabie-bob/courses_pb";

import { Learning_Objectives } from "src/squads/syllabus/__generated__/eureka/root-types";

export interface LearningObjective extends LOBob.AsObject {}

export type SimpleLO = Pick<LearningObjective, "id" | "name">;

export type SimpleLOHasura = Pick<LOHasura, "lo_id" | "name" | "display_order" | "type">;

export interface LOHasura
    extends Pick<
        Learning_Objectives,
        | "lo_id"
        | "topic_id"
        | "name"
        | "video"
        | "study_guide"
        | "display_order"
        | "master_lo_id"
        | "prerequisites"
        | "video_script"
        | "school_id"
        | "created_at"
    > {
    id: string;
    type: keyof typeof KeyLOTypes;
}

export type OnChangeAttachmentProps =
    | {
          type: "video";
          video: BrightcoveVideoInfo;
      }
    | {
          type: "study_guide";
          studyGuideUrl: string;
      };
