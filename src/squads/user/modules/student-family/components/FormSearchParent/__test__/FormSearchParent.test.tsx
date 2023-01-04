import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import FormSearchParent from "../FormSearchParent";

import { RenderResult, render } from "@testing-library/react";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";

jest.mock("src/squads/user/hooks/useTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

jest.mock("src/squads/user/hooks/useResourceTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

describe("<FormSearchParent />", () => {
    let wrapper: RenderResult;

    const FormSearchParentHookForm = withReactHookForm(FormSearchParent, {
        watch: () => jest.fn(),
        register: () => jest.fn(),
    });

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <FormSearchParentHookForm />
            </MuiPickersUtilsProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(wrapper.getByTestId("FormSearchParent__inputName")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormSearchParent__selectRelationship")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormSearchParent__inputEmail")).toBeInTheDocument();
    });
});
