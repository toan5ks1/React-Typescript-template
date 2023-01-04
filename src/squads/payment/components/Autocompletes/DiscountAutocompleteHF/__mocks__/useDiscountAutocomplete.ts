import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";

const mockDiscountChoices = createMockDiscountChoices();

const useDiscountAutocompleteMock = () => {
    return {
        data: mockDiscountChoices,
        isFetching: false,
    };
};

export default useDiscountAutocompleteMock;
