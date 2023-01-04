declare module NsLearningObjectives {
    export interface Placeholder {
        loName: string;
        selectLOsType: string;
    }

    export interface LearningObjectiveType {
        ASSIGNMENT: string;
        LEARNING_OBJECTIVE_TYPE_LEARNING: string;
        LEARNING_OBJECTIVE_TYPE_FLASH_CARD: string;
        LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING: string;
    }

    export interface Choices {
        LearningObjectiveType: LearningObjectiveType;
    }

    export interface RootObject {
        name: string;
        lo: string;
        shortenName: string;
        createTitle: string;
        editTitle: string;
        loName: string;
        chapter: string;
        studyGuide: string;
        video: string;
        grade: string;
        subject: string;
        country: string;
        createdAt: string;
        previewVideo: string;
        prerequisites: string;
        noLO: string;
        list: string;
        cardListing: string;
        offlineStudyList: string;
        viewCurrentVideo: string;
        information: string;
        brightcoveVideoLink: string;
        linkFrom: string;
        addNew: string;
        addLO: string;
        addLearningObjective: string;
        selectLOsLinkToTopic: string;
        selectBook: string;
        selectChapter: string;
        selectLOsInstruction: string;
        placeholder: Placeholder;
        choices: Choices;
        noChaptersAvailable: string;
    }
}

export interface LearningObjectives extends NsLearningObjectives.RootObject {}
