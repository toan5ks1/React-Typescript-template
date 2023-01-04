declare module NsOrders {
    export interface Title {
        request: string;
        generalInfo: string;
        productList: string;
        billingItem: string;
        actionLog: string;
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
        endDate: string;
        viewPreviousVersion: string;
    }

    export interface ChoiceOrderStatus {
        all: string;
        approved: string;
        pending: string;
        rejected: string;
    }

    export interface ChoiceOrderType {
        cancel: string;
        change: string;
        enrollment: string;
        loa: string;
        new: string;
        withdrawal: string;
        pause: string;
        nextYear: string;
    }

    export interface ChoiceOrderBillingStatus {
        billing: string;
        cancelled: string;
    }

    export interface ChoiceOrderActionLogStatus {
        submitted: string;
        rejected: string;
    }

    export interface Choices {
        orderType: ChoiceOrderType;
        orderStatus: ChoiceOrderStatus;
        orderBillingStatus: ChoiceOrderBillingStatus;
        orderActionLogStatus: ChoiceOrderActionLogStatus;
    }

    export interface RootObject {
        name: string;
        title: Title;
        column: Column;
        label: Label;
        choices: Choices;
    }
}

export interface Orders extends NsOrders.RootObject {}
