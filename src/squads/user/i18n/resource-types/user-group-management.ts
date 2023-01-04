declare module NsUserGroupManagement {
    export interface Detail {
        generalInfo: string;
        generalName: string;
        userGroupDetail: string;
    }

    export interface Labels {
        grantedRole: string;
        grantedLocation: string;
        userGroupName: string;
        selectRole: string;
        selectLocation: string;
    }

    export interface Titles {
        addUserGroup: string;
        editUserGroup: string;
        generalInfo: string;
        grantedPermission: string;
        dialogSelectLocation: string;
    }

    export interface Messages {
        success: {
            addUserGroup: string;
            updateUserGroup: string;
        };
    }

    export interface RootObject {
        name: string;
        title: string;
        colName: string;
        detail: Detail;
        labels: Labels;
        titles: Titles;
        messages: Messages;
    }
}

export interface UserGroupManagement extends NsUserGroupManagement.RootObject {}
