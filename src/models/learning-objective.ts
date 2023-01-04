import { BrightcoveVideoInfo } from "src/models/brightcove";

import { LearningObjective as LOBob } from "manabie-bob/courses_pb";

import type { Learning_Objectives } from "../__generated__/root-types";
import { KeyLOTypes } from "../common/constants/const";

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
