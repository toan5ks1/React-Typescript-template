declare module NsQuizzes {
    interface FlashcardLanguage {
        1: string;
        2: string;
    }
    export interface RootObject {
        name: string;
        deleteTheAnswer: string;
        removeTheAnswer: string;
        question: string;
        questionDescription: string;
        questionList: string;
        addQuestion: string;
        addAnswer: string;
        answers: string;
        explanation: string;
        explanationDescription: string;
        questionType: string;
        difficultyLevel: string;
        removeMaterial: string;
        preview: string;
        correct: string;
        listType: string;
        correctAnswer: string;
        makeIntoList: string;
        uploadYourFile: string;
        questionDetail: string;
        description: string;
        text: string;
        tex: string;
        file: string;
        color: string;
        insertLink: string;
        orderList: string;
        create: string;
        questionBank: string;
        confirmLeaving: string;
        cannotFindRelatedLO: string;
        loadingPdf: string;
        failedToLoadPdf: string;
        saveQuestion: string;
        attachVideo: string;
        attachStudyGuide: string;
        answerConfigs: string;
        questionPreview: string;
        answer: string;
        editQuestion: string;
        deleteQuestion: string;
        heading: string;
        ul: string;
        audio: string;
        image: string;
        bold: string;
        italic: string;
        underline: string;
        blank: string;
        changeQuizType: string;
        alertChangeQuizType: string;
        taggedLO: string;
        term: string;
        definition: string;
        duplicateExternalId: string;
        prefix: string;
        alternative: string;
        addAlternative: string;
        enterAlternativeVal: string;
        paginationPageText: string;
        paginationOfText: string;
        paginationOutOfRange: string;
        paginationInvalidPage: string;
        multipleChoice: string;
        fillInTheBlank: string;
        mappedID: string;
        type: string;
        dialogDeleteConfirm: string;
        mappedIdMustNotContainWhiteSpaces: string;
        flashcard: {
            deleteCard: string;
            cardIndex: string;
            definitionLanguage: string;
            termLanguage: string;
            deleteSuccess: string;
            addSuccess: string;
        };
        choices: {
            flashcardLanguage: FlashcardLanguage;
        };
    }
}

export interface Quizzes extends NsQuizzes.RootObject {}
