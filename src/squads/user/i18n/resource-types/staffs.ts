declare module NsStaffs {
    export interface Titles {
        staffManagement: string;
        detail: string;
        timesheetSettings: string;
        detailInfo: string;
        setting: string;
        generalInfo: string;
        configAutoCreateTimesheet: string;
        addStaff: string;
        editStaff: string;
        enableTimesheetConfig: string;
        disableTimesheetConfig: string;
    }

    export interface Descriptions {
        search: string;
        confirmEnable: string;
        confirmDisable: string;
    }

    export interface Labels {
        name: string;
        email: string;
        edit: string;
        userGroup: string;
        enable: string;
        disable: string;
    }

    export interface RootObject {
        name: string;
        titles: Titles;
        descriptions: Descriptions;
        labels: Labels;
    }
}

export interface Staffs extends NsStaffs.RootObject {}
