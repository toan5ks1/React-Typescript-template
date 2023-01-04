import { createMockGetManyTaxesReference } from "src/squads/payment/test-utils/mocks/tax";

const mockTaxChoices = createMockGetManyTaxesReference();

const useTaxAutocompleteMock = () => {
    return {
        data: mockTaxChoices,
        isFetching: false,
    };
};

export default useTaxAutocompleteMock;
