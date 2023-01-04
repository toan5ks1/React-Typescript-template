export const userPassword = {
    successful: true,
    userId: "01F4V8P0M4TSYP4DQK0WEFB53R",
    newPassword: "EFB53R",
};

export default () => ({
    reissueUserPassword: () => {
        return userPassword;
    },
});
