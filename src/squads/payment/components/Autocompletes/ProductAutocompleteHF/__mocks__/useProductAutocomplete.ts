import { createMockProductsManyChoices } from "src/squads/payment/test-utils/mocks/products";

const mockProductsManyChoices = createMockProductsManyChoices();

const useProductAutocompleteMock = () => {
    return {
        data: mockProductsManyChoices,
        isFetching: false,
    };
};

export default useProductAutocompleteMock;
