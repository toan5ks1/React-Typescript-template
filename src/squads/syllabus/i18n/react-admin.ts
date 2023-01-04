declare module NsReactAdmin {
    export interface Action {
        add_filter: string;
        add: string;
        back: string;
        bulk_actions: string;
        cancel: string;
        clear_input_value: string;
        clone: string;
        confirm: string;
        create: string;
        create_item: string;
        delete: string;
        discard: string;
        edit: string;
        export: string;
        list: string;
        refresh: string;
        remove_filter: string;
        remove: string;
        save: string;
        search: string;
        show: string;
        sort: string;
        undo: string;
        unselect: string;
        expand: string;
        close: string;
        open_menu: string;
        close_menu: string;
        copy: string;
        leave: string;
    }

    export interface Boolean {
        true: string;
        false: string;
        null: string;
    }

    export interface Page {
        create: string;
        dashboard: string;
        edit: string;
        error: string;
        list: string;
        loading: string;
        not_found: string;
        show: string;
        empty: string;
        invite: string;
    }

    export interface File {
        upload_several: string;
        upload_single: string;
        maxSize: string;
    }

    export interface Image {
        upload_several: string;
        upload_single: string;
    }

    export interface References {
        all_missing: string;
        many_missing: string;
        single_missing: string;
    }

    export interface Password {
        toggle_visible: string;
        toggle_hidden: string;
    }

    export interface Input {
        file: File;
        image: Image;
        references: References;
        password: Password;
    }

    export interface Message {
        about: string;
        are_you_sure: string;
        bulk_delete_content: string;
        bulk_delete_title: string;
        delete_content: string;
        delete_title: string;
        details: string;
        error: string;
        invalid_form: string;
        loading: string;
        no: string;
        not_found: string;
        yes: string;
        unsaved_changes: string;
        schoolDontHaveTeacherPleaseCreateTeacherBeforeCreateClass: string;
        just_show_verified_schools: string;
        please_select_member_before_update: string;
        please_select_teacher_before_add: string;
        this_school_dont_have_specify_config: string;
        this_is_default_config: string;
        pls_select_time_duration_or_expired_at: string;
        pleaseSearchByTeacherEmail: string;
        maxFileSizeIs: string;
        noDataMessage: string;
        noData: string;
        noDataInformation: string;
        downloadBookSuccess: string;
        downloadBookFail: string;
        downloadStudyPlanSuccess: string;
        duplicateBookSuccess: string;
        duplicateBookFail: string;
        mustBeAValidPhoneNumber: string;
        moveSuccess: string;
        moveFail: string;
        uploadBrightcoveLinkFail: string;
        brightcoveVideoLinkHasExisted: string;
        unableToLoadData: string;
        unexpected: string;
        invalidSearchQueryReturningAllItems: string;
        linkLOsSuccess: string;
        youAreOffline: string;
        youAreRestoredNetwork: string;
    }

    export interface Navigation {
        no_results: string;
        no_more_results: string;
        page_out_of_boundaries: string;
        page_out_from_end: string;
        page_out_from_begin: string;
        page_range_info: string;
        page_rows_per_page: string;
        next: string;
        prev: string;
        skip_nav: string;
    }

    export interface Sort {
        sort_by: string;
        ASC: string;
        DESC: string;
    }

    export interface Auth {
        auth_check_error: string;
        user_menu: string;
        username: string;
        password: string;
        sign_in: string;
        sign_in_error: string;
        logout: string;
        forgotPassword: string;
        resetPassword: string;
        resetAccountWithAccountWhichWasProvidedByYourSchool: string;
        theLinkToRenewPasswordWillBeSentToYourEmail: string;
        theLinkHasBeenSent: string;
        pleaseCheckYourEmailToRenewYourPassword: string;
        enterEmail: string;
        enterPassword: string;
        backToLogin: string;
        checkingProfile: string;
        signingOut: string;
        cannotSignOut: string;
        "auth/wrong-password": string;
        "auth/argument-error": string;
        "auth/invalid-email": string;
        "auth/user-disabled": string;
        "auth/user-not-found": string;
        "auth/timeout": string;
        "auth/cannot-sign-out": string;
        "auth/credential-expired": string;
        "auth/unauthorized": string;
        tenantId: string;
        redirectToTenantLogin: string;
    }

    export interface Notification {
        updated: string;
        created: string;
        deleted: string;
        bad_item: string;
        item_doesnt_exist: string;
        http_error: string;
        data_provider_error: string;
        i18n_error: string;
        canceled: string;
        logged_out: string;
    }

    export interface Validation {
        required: string;
        requiredAll: string;
        minLength: string;
        maxLength: string;
        minValue: string;
        maxValue: string;
        number: string;
        email: string;
        oneOf: string;
        regex: string;
    }

    export interface Specified {
        cannot_create_chapter: string;
        already_join_this_class: string;
        email_is_exist_in_db: string;
        phone_is_exist_in_db: string;
        can_not_find_users: string;
        can_not_find_class: string;
        owner_must_be_teachers: string;
        can_not_handle_class_other_school: string;
        user_not_found: string;
        school_not_found: string;
        teacher_is_missing: string;
        fileIsTooLarge: string;
        fileExceedLimit: string;
        endTimeLessThanStartTime: string;
        csvFileIsEmpty: string;
        brightcoveVideoIsBeingProcessed: string;
        cantDiscardDeletedNotification: string;
        cantEditSentNotification: string;
        cantDiscardSentNotification: string;
        cantSendSentNotification: string;
        cantEditDiscardedNotification: string;
        cantSendDiscardedNotification: string;
        cantSchedulePastTimeNotification: string;
        getBrightcoveProfileFail: string;
    }

    export interface Firebase {
        invalid_email: string;
        user_disabled: string;
        user_not_found: string;
        wrong_password: string;
        missing_android_pkg_name: string;
        missing_continue_uri: string;
        missing_ios_bundle_id: string;
        invalid_continue_uri: string;
        unauthorized_continue_uri: string;
        permission_denied: string;
        too_many_request: string;
        quota_exceeded: string;
    }

    export interface Quiz {
        missingQuizId: string;
        missingQuestionContent: string;
        missingExplanationContent: string;
        missingAnswers: string;
        thereIsNoCorrectAnswer: string;
        missingTaggedLOs: string;
        missingDefinition: string;
        missingAnswerPrefix: string;
    }

    export interface ManabieError {
        specified: Specified;
        invalid_params: string;
        unknown: string;
        not_found: string;
        deadline_exceeded: string;
        already_exists: string;
        permission_denied: string;
        internals: string;
        disconnect: string;
        not_authenticated: string;
        jwt_invalid: string;
        connection: string;
        allow_list_denied: string;
        token_expired: string;
        query_timeout_exceeded: string;
        firebase: Firebase;
        token_not_exist: string;
        claim_token_invalid: string;
        noCourse: string;
        noChapter: string;
        noTopic: string;
        cannotPickLowerThanNow: string;
        receivedMessageLargerThanMax: string;
        timeIsPassed: string;
        endTimeLowerThanStartTime: string;
        screenshotFailed: string;
        cannotUpload: string;
        videoCannotLoad: string;
        quiz: Quiz;
        customFileSizeReached: string;
        canNotExtractFromPdf: string;
        uploadedFileIsInvalid: string;
        multipleChoiceQuestionCanOnlyHave: string;
        missingLOId: string;
        missingQuizId: string;
        cannotIdentifyYourCredentials: string;
        cannotGetParentsListOfAStudent: string;
    }

    export interface Action2 {
        add: string;
        addMore: string;
        edit: string;
        create: string;
        delete: string;
        moveUp: string;
        moveDown: string;
        detail: string;
        duplicate: string;
        moreAction: string;
        warning: string;
        OK: string;
        cancel: string;
        discard: string;
        remove: string;
        resend: string;
        show: string;
        download: string;
        update: string;
        uploadFile: string;
        addCourse: string;
        confirm: string;
        search: string;
        upload: string;
        save: string;
        reset: string;
        apply: string;
        rename: string;
        selectAllItems: string;
        filter: string;
        archive: string;
        unarchive: string;
        activate: string;
        reIssuePassword: string;
        printAsStudentCard: string;
        printAsQrCodeSheet: string;
    }

    export interface Common {
        action: Action2;
        sent: string;
        send: string;
        saveDraft: string;
        saveSchedule: string;
        draft: string;
        warningTitle: string;
        done: string;
        save: string;
        save_change: string;
        doYouWantToDelete: string;
        createdAt: string;
        numberOrder: string;
        total: string;
        more: string;
        actions: string;
        editedSuccess: string;
        editedFail: string;
        sendSuccess: string;
        sendFail: string;
        updatedSuccess: string;
        updatedFail: string;
        createdSuccess: string;
        resendSuccess: string;
        resendFail: string;
        createdFail: string;
        addedSuccess: string;
        addedFail: string;
        loadMore: string;
        deleteSuccess: string;
        deleteFail: string;
        removeSuccess: string;
        removeFail: string;
        convertingAllFilesSuccessfully: string;
        failedToUploadFiles: string;
        updatedAt: string;
        deleteConfirmText: string;
        minute: string;
        back: string;
        someThingWentWrong: string;
        cannotLoadPage: string;
        pleaseHelpUsReport: string;
        invalid: string;
        language: string;
        thisPageIsNotFound: string;
        backToHomePage: string;
        welcomeTo: string;
        discardMessage: string;
        contentManagementSystem: string;
        signInWith: string;
        cancelDialogTitle: string;
        cancelDialogMessage: string;
        editedInformationWillBeLostIfLeave: string;
        yourInformationWillBeLostIfDelete: string;
        areYouSureWantToDiscardThisMessage: string;
        resendNotification: string;
        deleteDialogTitle: string;
        unexpectedCreateError: string;
    }

    export interface Upload {
        selectFile: string;
        dragNDrop: string;
        upload_single: string;
        upload_multiple: string;
        or: string;
        uploadImage: string;
    }

    export interface PageNotFound {
        title: string;
        backToHome: string;
        pageLookingForDoesExist: string;
    }

    export interface RootObject {
        action: Action;
        boolean: Boolean;
        page: Page;
        input: Input;
        message: Message;
        navigation: Navigation;
        sort: Sort;
        auth: Auth;
        notification: Notification;
        validation: Validation;
        "manabie-error": ManabieError;
        common: Common;
        upload: Upload;
        pageNotFound: PageNotFound;
    }
}
export interface ReactAdmin extends NsReactAdmin.RootObject {}
