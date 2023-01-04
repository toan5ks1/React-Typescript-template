import { KeyTopicTypes, KeyTopicStatuses } from "src/common/constants/const";
import { QueryAggregateReturn } from "src/typings/react-admin";

import { Topic as TopicBob } from "manabie-bob/courses_pb";

import { SimpleLOHasura } from "./learning-objective";

export interface Topic extends TopicBob.AsObject {}

export interface TopicHasura {
    id: string;
    topic_id: string;
    name: string;
    display_order: number;
    topic_type: keyof typeof KeyTopicTypes;
    status: keyof typeof KeyTopicStatuses;
    chapter_id: string;
    school_id: number;
    instruction?: string;
    icon_url?: string;
    essay_required?: boolean;
    learning_objectives?: SimpleLOHasura[];
    learning_objectives_aggregate?: QueryAggregateReturn;
}

export type SimpleTopic = Pick<TopicHasura, "id" | "name" | "learning_objectives_aggregate">;
export type SimpleTopicHasura = Pick<TopicHasura, "topic_id" | "name" | "learning_objectives">;
