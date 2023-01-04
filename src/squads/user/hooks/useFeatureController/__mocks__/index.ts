export default () => {
    return {
        featureController: {
            init: jest.fn(),
            isFeatureEnabled: jest.fn(),
            subscribeToRemoteChanges: jest.fn(),
        },
    };
};
