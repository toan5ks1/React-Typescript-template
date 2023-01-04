const permission = {
    can: (_action: string, _resource: string) => {
        return true;
    },
    currentRole: "USER_GROUP_SCHOOL_ADMIN",
};
export default () => {
    return { permission };
};
