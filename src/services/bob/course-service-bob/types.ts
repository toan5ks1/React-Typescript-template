import { Topic as TopicRequest } from "manabie-bob/courses_pb";
import { TopicStatus } from "manabie-bob/enum_pb";

import type { Topics as RootTopics } from "src/__generated__/root-types";

export declare namespace NsBobCourseService {
    interface Topic
        extends Pick<TopicRequest.AsObject, "displayOrder" | "chapterId" | "name" | "schoolId"> {
        topic_id: RootTopics["topic_id"];
        name: RootTopics["name"];
        instruction?: RootTopics["instruction"];
        icon_url?: RootTopics["icon_url"];

        status?: keyof typeof TopicStatus;
        files: File[];
    }
    export type UpsertTopics = Topic | Topic[];
}

export default NsBobCourseService;
