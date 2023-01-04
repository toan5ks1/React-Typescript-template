declare module NsTopics {
    export interface RootObject {
        name: string;
        addTitle: string;
        editTitle: string;
        topicName: string;
        learningObjective: string;
        assignment: string;
        flashCard: string;
        offlineStudy: string;
        AddTopicDialogHeader: string;
    }
}

export interface Topics extends NsTopics.RootObject {}
