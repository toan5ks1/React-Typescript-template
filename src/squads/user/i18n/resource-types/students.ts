declare module NsStudents {
    export interface Titles {
        studentManagement: string;
        student: string;
        studyItem: string;
        addStudent: string;
        editStudent: string;
        generalInfo: string;
        course: string;
        courseDetail: string;
        family: string;
        parent: string;
        addFamily: string;
        editFamily: string;
        addCourse: string;
        editCourse: string;
        dialogStudentAccountInfo: string;
        dialogParentAccountInfo: string;
        dialogAddConfirmCancel: string;
        dialogDeleteConfirmCancel: string;
        dialogConfirmReIssuePassword: string;
        dialogSearchParent: string;
        neverLoggedIn: string;
        detail: string;
        familyInfo: string;
        addParent: string;
        addExistingParent: string;
        addNewParent: string;
        detailInfo: string;
        dialogEditParent: string;
        dialogAddNewParent: string;
        dialogAddExistingParent: string;
        dialogAccountInfo: string;
        dialogParentConfirmRemove: string;
        dialogSelectLocation: string;
        entryExit: string;
        billing: string;
        dialogImport: string;
        invoice: string;
        dialogImportParents: string;
    }

    export interface Labels {
        name: string;
        detailName: string;
        firstName: string;
        lastName: string;
        firstNamePhonetic: string;
        lastNamePhonetic: string;
        phoneticName: string;
        grade: string;
        studentID: string;
        externalStudentID: string;
        studentName: string;
        courseName: string;
        username: string;
        password: string;
        phoneNumber: string;
        relationship: string;
        email: string;
        startDate: string;
        endDate: string;
        action: string;
        emptyValue: string;
        reissue: string;
        reissuePassword: string;
        edit: string;
        note: string;
        neverLoggedIn: string;
        showNeverLoggedIn: string;
        gender: string;
        male: string;
        female: string;
        birthday: string;
        selected: string;
        location: string;
        selectLocation: string;
        import: string;
        downloadTemplateFile: string;
        addStudentByImport: string;
        class: string;
        homeAddress: string;
        postalCode: string;
        prefecture: string;
        city: string;
        firstStreet: string;
        secondStreet: string;
        contactPreference: string;
        studentPhoneNumber: string;
        homePhoneNumber: string;
        parentPrimaryPhoneNumber: string;
        parentSecondaryPhoneNumber: string;
        preferredContactNumber: string;
        colGrade: string;
        colCourse: string;
    }

    export interface Descriptions {
        email: string;
        phoneNumber: string;
        search: string;
        noInfo: string;
        dialogStudentAccountInfo: string;
        dialogAddFamily: string;
        dialogEditFamily: string;
        dialogAddCourse: string;
        dialogEditCourse: string;
        dialogAddConfirmCancel: string;
        dialogDeleteConfirmCancel: string;
        dialogConfirmReIssuePassword: string;
        dialogSearchParent: string;
        dialogParentConfirmRemove: string;
        maxFileRecordsIs: string;
    }

    export interface Placeholder {
        inputSearchParent: string;
        enterYourKeyword: string;
    }

    export interface Relationship {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
    }

    export interface Choices {
        relationship: Relationship;
        studentsEnrollmentStatus: StudentsEnrollmentStatus;
        addParent: AddParentType;
        addStudent: AddStudentType;
    }

    export interface Success {
        addStudent: string;
        updateStudent: string;
        overrideUserPassword: string;
        addParent: string;
        updateParent: string;
        reIssuePassword: string;
        updateCourse: string;
        removeParent: string;
    }

    export interface Error {
        overrideUserPassword: string;
        exited: string;
        hasInsertedOnGeneralInfo: string;
        hasInsertedOnListParents: string;
        invalid: string;
        invalidLocations: string;
        studentPackage: StudentPackage;
        invalidMultipleFiles: string;
        invalidMaxSizeFile: string;
    }

    export interface Warning {
        warningCurrentPasswordNoLongerBeValid: string;
    }

    export interface Messages {
        success: Success;
        error: Error;
        warning: Warning;
    }

    export interface StudentsEnrollmentStatus {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    }

    export interface AddParentType {
        1: string;
        2: string;
    }

    export interface AddStudentType {
        1: string;
        2: string;
    }

    export interface Status {
        STUDENT_ENROLLMENT_STATUS_POTENTIAL: string;
        STUDENT_ENROLLMENT_STATUS_ENROLLED: string;
        STUDENT_ENROLLMENT_STATUS_WITHDRAWN: string;
        STUDENT_ENROLLMENT_STATUS_GRADUATED: string;
        STUDENT_ENROLLMENT_STATUS_LOA: string;
    }

    export interface StudentPackage {
        0: string;
        1: string;
        2: string;
    }
    export interface RootObject {
        name: string;
        titles: Titles;
        labels: Labels;
        descriptions: Descriptions;
        placeholder: Placeholder;
        choices: Choices;
        messages: Messages;
        enrollmentStatus: string;
        status: Status;
    }
}

export interface Students extends NsStudents.RootObject {}
