import { Entities } from "src/common/constants/enum";

import AutocompleteReferenceHF from "src/squads/communication/pages/Notification/components/Autocompletes/AutocompleteReferenceHF";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/communication/hooks/useAutocompleteReference";
import { withReactHookForm } from "src/squads/communication/test-utils/HOCs/withReactHookForm";

const mockEntity = Entities.COURSES;
const mockOnInputChange = jest.fn();

jest.mock("src/squads/communication/hooks/useAutocompleteReference", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderAutocompleteReferenceHF = () => {
    (useAutocompleteReference as jest.Mock).mockReturnValue({
        options: [],
        isFetching: false,
        setInputVal: jest.fn(),
    });

    const AutocompleteReferenceWithHF = withReactHookForm(
        AutocompleteReferenceHF,
        {
            name: "autocompleteReferenceHF",
            resource: mockEntity,
            getOptionSelectedField: "value",
            onInputChange: mockOnInputChange,
            params: jest.fn(),
        },
        {
            defaultValues: {
                autocompleteReferenceHF: [],
            },
        }
    );

    return render(<AutocompleteReferenceWithHF />);
};

describe("<AutocompleteReferenceHF/>", () => {
    it("should render correct UI", () => {
        const wrapper = renderAutocompleteReferenceHF();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call onInputChange on changing input value", () => {
        const newValueString = "new value";
        renderAutocompleteReferenceHF();

        const autocomplete = screen.getByRole("combobox");

        userEvent.type(autocomplete, newValueString);

        expect(mockOnInputChange).toBeCalledTimes(newValueString.length);
    });
});
