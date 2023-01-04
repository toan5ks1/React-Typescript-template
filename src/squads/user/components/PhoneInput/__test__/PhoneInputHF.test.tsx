import { COUNTRY_INFO } from "src/common/constants/const";
import { changeSelectValue } from "src/common/utils/tests";

import { Country } from "manabie-bob/enum_pb";

import PhoneInputHF from "./../PhoneInputHF";

import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";

describe("<PhoneInputHF /> with default value", () => {
    let wrapper: RenderResult;

    const PhoneInput = withReactHookForm(
        PhoneInputHF,
        {
            name: "phone",
            nameCountryCode: "countryCode",
            watch: () => jest.fn(),
        },
        {
            defaultValues: {
                phone: "123 123 123",
                countryCode: Country.COUNTRY_JP,
            },
        }
    );

    beforeEach(() => {
        wrapper = render(<PhoneInput />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should change prefix code number when change country", async () => {
        const COUNTRY_VN = "resources.configs.choices.countries.COUNTRY_VN";

        changeSelectValue(wrapper, "PhoneInputHF__selectCountry", COUNTRY_VN);

        await waitFor(() => {
            expect(wrapper.getByTestId("PhoneInputHF__inputAdornmentCountry")).toHaveTextContent(
                COUNTRY_INFO[Country.COUNTRY_VN].code
            );
        });
    });
});

describe("<PhoneInputHF /> without default value", () => {
    let wrapper: RenderResult;

    const PhoneInput = withReactHookForm(
        PhoneInputHF,
        {
            name: "phone",
            nameCountryCode: "countryCode",
            watch: () => jest.fn(),
        },
        {
            defaultValues: {
                countryCode: Country.COUNTRY_JP,
            },
        }
    );

    beforeEach(() => {
        wrapper = render(<PhoneInput />);
    });

    it("should allow user to type number", () => {
        const inputPhone = wrapper.getByTestId("PhoneInputHF__inputPhoneNumber");

        userEvent.type(inputPhone, "129");

        fireEvent.focus(inputPhone);
        fireEvent.blur(inputPhone);

        expect(inputPhone).toHaveValue("129");
    });

    it("should not allow user to type number", () => {
        const inputPhone = wrapper.getByTestId("PhoneInputHF__inputPhoneNumber");

        fireEvent.keyPress(inputPhone, { key: "t", code: "KeyT", charCode: 84 });
        fireEvent.keyPress(inputPhone, { key: "r", code: "KeyR", charCode: 82 });

        fireEvent.focus(inputPhone);
        fireEvent.blur(inputPhone);

        expect(inputPhone).not.toHaveValue("tr");
    });
});
