import FormUpsertParent from "../FormUpsertParent";

import { RenderResult, render } from "@testing-library/react";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";

describe("<FormUpsertParent />", () => {
    let wrapper: RenderResult;
    const FormUpsertParentHookForm = withReactHookForm(FormUpsertParent, {
        watch: () => jest.fn(),
        register: () => jest.fn(),
        getValues: () => jest.fn(),
    });

    beforeEach(() => {
        wrapper = render(<FormUpsertParentHookForm />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(wrapper.getByTestId("FormUpsertParent__inputName")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormUpsertParent__selectRelationship")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormUpsertParent__inputEmail")).toBeInTheDocument();
    });
});
