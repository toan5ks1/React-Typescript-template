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
        LEARNING_OBJECTIVE_TYPE_EXAM_LO: string;
        TASK_ASSIGNMENT: string;
    }

    export interface Choices {
        LearningObjectiveType: LearningObjectiveType;
    }

    export interface RootObject {
        name: string;
        lo: string;
        shortenName: string;
        editTitle: string;
        studyGuide: string;
        video: string;
        cardListing: string;
        viewCurrentVideo: string;
        brightcoveVideoLink: string;
        addNew: string;
        addLO: string;
        addLearningObjective: string;
        placeholder: Placeholder;
        choices: Choices;
    }
}

export interface LearningObjectives extends NsLearningObjectives.RootObject {}
