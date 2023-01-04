import { DeleteTopicsRequest } from "manabuf/eureka/v1/topic_modifier_pb";
import { Topic } from "manabuf/eureka/v1/topic_reader_pb";

export declare namespace NsSyllabus_TopicService {
    interface Topic
        extends Pick<Topic.AsObject, "displayOrder" | "chapterId" | "name" | "schoolId"> {
        topic_id: Topic.AsObject["id"];
        icon_url?: Topic.AsObject["iconUrl"];
        files: File[];
    }
    type UpsertTopics = Topic | Topic[];
    interface DeleteTopics extends DeleteTopicsRequest.AsObject {}
}

export default NsSyllabus_TopicService;
