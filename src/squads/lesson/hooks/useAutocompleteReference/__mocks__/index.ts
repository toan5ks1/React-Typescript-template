import { UseAutocompleteReferenceReturns } from "../useAutocompleteReference";

import { UseAutocompleteReferenceProps } from "src/squads/lesson/hooks/useAutocompleteReference";

const index = ({
    multiple,
    firstOptions = [],
}: UseAutocompleteReferenceProps<any>): UseAutocompleteReferenceReturns<any> => {
    return {
        loading: false,
        setInputVal: jest.fn(),
        options: [...firstOptions, { id: "1", name: "1", value: "1" }],
        defaultValue: multiple ? [] : "",
    };
};

export default index;
