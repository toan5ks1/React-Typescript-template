declare module NsOrders {
    export interface Title {
        request: string;
        generalInfo: string;
        productList: string;
        billingItem: string;
        actionLog: string;
        studentInfo: string;
        createOrder: string;
        createEnrollment: string;
        createBulkOrder: string;
        upcomingBilling: string;
        filters: string;
        billedAtOrder: string;
        viewComment: string;
        billingInfo: string;
        course: string;
        associatedProducts: string;
        billingItems: string;
        orders: string;
        previewTheForm: string;
        enrollmentForm: string;
        updateProducts: string;
        afterUpdateInfo: string;
        beforeUpdateInfo: string;
        totalSlotsSelected: string;
        createCustomBilling: string;
        studentList: string;
        voidOrder: string;
    }

    export interface Column {
        id: string;
        name: string;
        status: string;
        price: string;
        content: string;
        detail: string;
        comment: string;
        product: string;
        amount: string;
        studentName: string;
        approvalStatus: string;
        orderType: string;
        requestedDate: string;
        userName: string;
        updatedTime: string;
        billedDate: string;
        billingPeriod: string;
        action: string;
        orderNumber: string;
        orderStatus: string;
        createdDate: string;
        productDetails: string;
        billingNumber: string;
        billingDate: string;
        location: string;
        duration: string;
        upcomingBillingDate: string;
        billingItem: string;
        tax: string;
    }

    export interface Label {
        requestedDate: string;
        orderType: string;
        orderId: string;
        studentName: string;
        invoiceMethod: string;
        center: string;
        createdDate: string;
        createBulkOrder: string;
        createRegularCourse: string;
        createNextYearCourse: string;
        view: string;
        courseAssociation: string;
        discount: string;
        slot: string;
        slotWeek: string;
        wk: string;
        slots: string;
        endDate: string;
        viewPreviousVersion: string;
        comment: string;
        billingDate: string;
        orderNumber: string;
        location: string;
        name: string;
        productName: string;
        startDate: string;
        subTotal: string;
        total: string;
        tax: string;
        incl: string;
        cancelled: string;
        effectiveDate: string;
        void: string;
        updateScheduled: string;
        billingRatio: string;
    }

    export interface ChoiceOrderStatus {
        ORDER_STATUS_ALL: string;
        ORDER_STATUS_SUBMITTED: string;
        ORDER_STATUS_PENDING: string;
        ORDER_STATUS_REJECTED: string;
        ORDER_STATUS_VOIDED: string;
        ORDER_STATUS_INVOICED: string;
    }

    export interface ChoiceOrderType {
        ORDER_TYPE_NEW: string;
        ORDER_TYPE_ENROLLMENT: string;
        ORDER_TYPE_UPDATE: string;
        ORDER_TYPE_CANCEL: string;
        ORDER_TYPE_WITHDRAWAL: string;
        ORDER_TYPE_LOA: string;
        ORDER_TYPE_CUSTOM_BILLING: string;
        ORDER_TYPE_PAUSE: string;
        ORDER_TYPE_GRADUATE: string;
    }

    export interface ChoiceOrderBillingStatus {
        BILLING_STATUS_WAITING_APPROVAL: string;
        BILLING_STATUS_PENDING: string;
        BILLING_STATUS_BILLED: string;
        BILLING_STATUS_INVOICED: string;
        BILLING_STATUS_CANCELLED: string;
    }

    export interface ChoiceOrderActionLogStatus {
        ORDER_ACTION_SUBMITTED: string;
        ORDER_ACTION_VOIDED: string;
    }

    export interface ChoiceOrderProductListStatus {
        PENDING: string;
        ORDERED: string;
        CANCELLED: string;
    }

    export interface Choices {
        orderType: ChoiceOrderType;
        orderStatus: ChoiceOrderStatus;
        orderBillingStatus: ChoiceOrderBillingStatus;
        orderActionLogStatus: ChoiceOrderActionLogStatus;
        orderProductListStatus: ChoiceOrderProductListStatus;
    }

    export interface Success {
        createOrder: string;
        createCustomBillingOrder: string;
        voidOrder: string;
    }

    export interface Error {
        commonProductError: string;
        requiredSection: string;
        invalidProduct: string;
        invalidProductUpdate: string;
        withdrawalOrGraduationProductUpdate: string;
        noUpdatedField: string;
        incorrectFormatField: string;
        updateScheduledError: string;
    }

    export interface Message {
        success: Success;
        error: Error;
    }

    export interface Filters {
        createdFrom: string;
        createdTo: string;
        orderType: string;
        product: string;
    }

    export interface Tooltip {
        deleteMandatoryCourse: string;
        atLeastOneCourseSelected: string;
        courseLimitReached: string;
        associatedProductsLimitReached: string;
    }

    export interface Dialog {
        voidDialogMessage: string;
        previousDialogMessage: string;
    }

    export interface Tag {
        adjustment: string;
    }

    export interface RootObject {
        name: string;
        enterStudentName: string;
        currentFilters: string;
        title: Title;
        column: Column;
        label: Label;
        choices: Choices;
        message: Message;
        filters: Filters;
        tooltip: Tooltip;
        dialog: Dialog;
        tag: Tag;
    }
}

export interface Orders extends NsOrders.RootObject {}
