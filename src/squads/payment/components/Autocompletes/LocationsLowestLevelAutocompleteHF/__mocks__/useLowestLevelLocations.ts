import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";

const mockCenterChoices = createMockCenterChoices();

const useLowestLevelLocationsMock = () => {
    return {
        data: mockCenterChoices,
        isFetching: false,
    };
};

export default useLowestLevelLocationsMock;
