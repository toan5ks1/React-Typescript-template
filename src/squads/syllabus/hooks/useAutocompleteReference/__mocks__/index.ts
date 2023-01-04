import { UseAutocompleteReferenceReturns } from "../useAutocompleteReference";

export default (): UseAutocompleteReferenceReturns<any> => {
    return {
        isFetching: false,
        setInputVal: jest.fn(),
        options: [{ book_id: "book_id", name: "K Book", value: "K Book" }],
    };
};
