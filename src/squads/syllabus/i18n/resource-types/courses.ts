declare module NsCourses {
    export interface StudyPlan {
        trackSchoolProgressCheckbox: string;
        editStudyplan: string;
        addStudyplan: string;
        bookAssociation: string;
        studyPlanName: string;
        name: string;
        title: string;
        studyPlanCSV: string;
        studyPlanList: string;
        studentName: string;
        courseMaster: string;
        class: string;
        student: string;
        uploadMaterial: string;
        uploadedDate: string;
        action: string;
        uploading: string;
        uploadedFail: string;
        dialogDeleteConfirm: string;
        courseUploadedSuccess: string;
        studentStudyPlanUploadedSuccess: string;
        multipleStudentStudyPlanUploadedSuccess: string;
        courseUploadedFail: string;
        studentStudyPlanUploadedFail: string;
        multipleStudentStudyPlanUploadedFail: string;
        trackSchoolProgress: TrackSchoolProgress;
        studyPlanContent: string;
        displayHiddenItems: string;
        loName: string;
        availableFrom: string;
        availableUntil: string;
        error: Error;
        dialog: Dialog;
        messages: Messages;
        button: Button;
        bulkEdit: BulkEdit;
    }

    export interface TrackSchoolProgress {
        title: string;
        true: string;
        false: string;
    }

    export interface LessonConvert {
        converting: string;
        tryAgain: string;
        success: string;
        failedUnknown: string;
    }

    export interface Courses {
        name: string;
        createTitle: string;
        addCourse: string;
        editTitle: string;
        courseName: string;
        teachingMethod: string;
        COURSE_TEACHING_METHOD_INDIVIDUAL: string;
        COURSE_TEACHING_METHOD_GROUP: string;
        chapter: string;
        grade: string;
        subject: string;
        country: string;
        updatedBy: string;
        system: string;
        lesson: string;
        book: string;
        location: string;
        studyPlan: StudyPlan;
        settings: string;
        addBookSuccess: string;
        updateCourseIconSuccess: string;
        addBook: string;
        lessonConvert: LessonConvert;
        unableToGetLocationIds: string;
        unableToGetLocation: string;
        labels: Label;
        dialogSelectLocationTitle: string;
        locationAlreadyExists: string;
    }

    export interface Messages {
        success: Success;
        error: ErrorMessages;
    }

    export interface Success {
        addedStudyPlan: string;
        editedStudyPlan: string;
        archivedStudyPlan: string;
        unarchivedStudyPlan: string;
    }

    //TODO: Syllabus combines ErrorMessages with Error
    export interface ErrorMessages {
        addStudyPlan: string;
        editStudyPlan: string;
        addBook: string;
        archiveStudyPlan: string;
        unarchiveStudyPlan: string;
    }

    export interface Error {
        dateFormatInvalidGeneric: string;
        dateFormatInvalid: string;
        availableFromLaterAvailableUntil: string;
        availableUntilEarlierAvailableFrom: string;
        startDateEarlierAvailableFrom: string;
        startDateLaterAvailableUntil: string;
        startDateLaterDueDate: string;
        dueDateEarlierAvailableFrom: string;
        dueDateLaterAvailableUntil: string;
        dueDateEarlierStartDate: string;
    }

    export interface Dialog {
        updateStudyPlanTitle: string;
        updateIndividualStudyPlanTitle: string;
        updateIndividualStudyPlanMessage: string;
        updateStudyPlanMessage: string;
        confirmPageMoveMessage: string;
        confirmRowSettingMessage: string;
        changesWillBeLostMessage: string;
    }

    export interface Button {
        saveAndMove: string;
        moveWithoutSaving: string;
        saveAndApply: string;
        applyWithoutSaving: string;
    }

    export interface BulkEdit {
        editDate: string;
        button: string;
        availableFrom: string;
        availableTo: string;
        startDate: string;
        endDate: string;
        showAll: string;
        hideAll: string;
        specificDate: string;
        postpone: string;
        advance: string;
        days: string;
    }

    export interface Label {
        selected: string;
    }
}

export interface Courses extends NsCourses.Courses {}
