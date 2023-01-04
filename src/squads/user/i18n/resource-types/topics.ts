declare module NsTopics {
    export interface RootObject {
        name: string;
        createTitle: string;
        addTitle: string;
        editTitle: string;
        topicName: string;
        topicType: string;
        instruction: string;
        status: string;
        chapter: string;
        grade: string;
        subject: string;
        country: string;
        createdAt: string;
        noTopic: string;
        learningObjective: string;
        assignment: string;
        flashCard: string;
        offlineStudy: string;
        AddTopicDialogHeader: string;
    }
}

export interface Topics extends NsTopics.RootObject {}
