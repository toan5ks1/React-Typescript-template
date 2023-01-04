declare module NsQuizzes {
    interface FlashcardLanguage {
        1: string;
        2: string;
    }
    interface HandwritingLanguage {
        0: string;
        3: string;
        4: string;
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
        loadingPdf: string;
        failedToLoadPdf: string;
        answerConfigs: string;
        questionPreview: string;
        answer: string;
        createQuestion: string;
        editQuestion: string;
        deleteQuestion: string;
        heading: string;
        ul: string;
        audio: string;
        image: string;
        bold: string;
        italic: string;
        underline: string;
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
        handwriting: string;
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
            handwritingLanguage: HandwritingLanguage;
        };
        changeQuestionType: string;
        alertChangeQuestionType: string;
    }
}

export interface Quizzes extends NsQuizzes.RootObject {}
