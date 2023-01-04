import { useParentsListDataMock } from "src/squads/user/test-utils/mocks/family";

import ParentsAutocomplete, { ParentsAutocompleteProps } from "../ParentsAutocomplete";

import { render, RenderResult, waitFor } from "@testing-library/react";
import useParentsList, {
    UseParentsListReturn,
} from "src/squads/user/modules/student-family/hooks/useParentsList";

jest.mock("src/squads/user/modules/student-family/hooks/useParentsList", () => jest.fn());

describe("<ParentsAutocomplete />", () => {
    let wrapper: RenderResult;

    const props: ParentsAutocompleteProps = {
        onChange: jest.fn(),
        getOptionSelectedField: "user_id",
    };

    beforeEach(() => {
        (useParentsList as jest.Mock<UseParentsListReturn>).mockReturnValue({
            parents: useParentsListDataMock,
            isLoading: false,
        });
        wrapper = render(<ParentsAutocomplete {...props} />);
    });

    it("should match snapshot", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("ParentsAutocomplete__autoComplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });
});
