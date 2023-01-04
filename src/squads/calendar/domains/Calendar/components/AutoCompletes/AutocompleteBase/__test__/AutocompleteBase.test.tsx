import AutocompleteBase, {
    getOptionSelected,
} from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteBase";

import { fireEvent, render, RenderResult } from "@testing-library/react";

type FakeOptions = {
    id: string;
    value: string;
    user?: {
        avatar: string;
        email: string;
    };
};
describe("getOptionSelected run correctly", () => {
    const option = {
        id: 1,
        value: "This is option",
        user: {
            id: "user1",
            name: "Hello",
        },
    };
    const differenceValue = {
        id: 2,
        value: "This is differenceValue",
        user: {
            id: "user2",
            name: "Hallo",
        },
    };
    const valueString = "This is option";
    const valueNumber = 1;
    it("with field parameter is id", () => {
        expect(getOptionSelected("id")(option, option)).toBeTruthy();
        expect(getOptionSelected("id")(option, differenceValue)).toBeFalsy();
    });
    it("without field parameter", () => {
        expect(getOptionSelected()(option, option)).toBeTruthy();
        expect(getOptionSelected()(option, differenceValue)).toBeFalsy();
    });
    it("with field and value is string or number", () => {
        expect(getOptionSelected("value")(option, valueString)).toBeTruthy();
        expect(getOptionSelected("id")(option, valueNumber)).toBeTruthy();
    });
    it("with field value is an object", () => {
        expect(getOptionSelected("user")(option, option)).toBeTruthy();
        expect(getOptionSelected("user")(option, differenceValue)).toBeFalsy();
    });
    it("with field value is a nested object", () => {
        expect(getOptionSelected("user.id")(option, option)).toBeTruthy();
        expect(getOptionSelected("user.id")(option, differenceValue)).toBeFalsy();
    });
    it("with field is a dummy string or empty", () => {
        expect(getOptionSelected("")(option, option)).toBeTruthy();
        expect(getOptionSelected("sadasd")(option, option)).toBeTruthy();
    });
});

describe("<AutocompleteBase /> with function optionHelperText and optionImage", () => {
    let wrapper: RenderResult;

    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ] as FakeOptions[],
    };

    beforeEach(() => {
        wrapper = render(
            <AutocompleteBase
                open
                multiple
                disableCloseOnSelect
                id="test-autoCompleteBase"
                optionImage="user.avatar"
                optionHelperText="user.email"
                options={props.options}
                onChange={props.onChange}
                defaultValue={[props.options[0]]}
                optionLabelKey={(option) =>
                    typeof option === "string" ? option : option.user!.email
                }
                getOptionSelectedField="id"
            />
        );
    });

    it("should show list options", () => {
        const autocomplete = wrapper.getByRole("combobox");

        autocomplete.focus();

        // move to first element
        fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowDown" });

        // select element
        fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Enter" });
        expect(props.onChange).toBeCalled();
    });
});

describe("<AutocompleteBase /> without optionImage", () => {
    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ],
    };

    beforeEach(() => {
        render(
            <AutocompleteBase
                open
                multiple
                disableCloseOnSelect
                id="test-autoCompleteBase"
                optionHelperText="user.email"
                defaultValue={[props.options[0]]}
                optionLabelKey="user.email"
                getOptionSelectedField="id"
                {...props}
            />
        );
    });

    it("should match dialogAutocomplete helperText", () => {
        const dialogAutocomplete = document.body.querySelector(`div[role="presentation"]`);
        expect(dialogAutocomplete).toBeInTheDocument();

        // TypographyTextSecondary as <p/>
        expect(dialogAutocomplete?.querySelector("p")?.textContent).toEqual(
            "testA-email@manabie.com"
        );
    });
});

describe("<AutocompleteBase /> with startAdornment", () => {
    const ADORNMENT = "Test Adornment";
    const ADORNMENT_DATA_TESTID = "AutocompleteBase__startAdornment";

    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ],
    };

    beforeEach(() => {
        render(
            <AutocompleteBase
                open
                multiple
                disableCloseOnSelect
                id="test-autoCompleteBase"
                optionHelperText="user.email"
                options={props.options}
                onChange={props.onChange}
                defaultValue={[props.options[0]]}
                optionLabelKey="value"
                startAdornment={<span data-testid={ADORNMENT_DATA_TESTID}>{ADORNMENT}</span>}
                getOptionSelectedField="id"
            />
        );
    });

    it("should render start adornment", () => {
        const startAdornment = document.body.querySelector(
            `[data-testid="${ADORNMENT_DATA_TESTID}"]`
        );
        expect(startAdornment).toBeInTheDocument();

        expect(startAdornment?.textContent).toEqual(ADORNMENT);
    });
});

describe("<AutocompleteBase /> with renderOption", () => {
    const RENDER_TEST = "Render test";
    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ],
        renderOption: (props: any) => <span {...props}>{RENDER_TEST}</span>,
    };

    beforeEach(() => {
        render(
            <AutocompleteBase
                open
                multiple
                disableCloseOnSelect
                id="test-autoCompleteBase"
                optionHelperText="user.email"
                options={props.options}
                onChange={props.onChange}
                defaultValue={[props.options[0]]}
                optionLabelKey="value"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={props.renderOption}
                getOptionSelectedField="id"
            />
        );
    });

    it("should render with renderOption func", () => {
        const dialogAutocomplete = document.body.querySelector(`div[role="presentation"]`);
        expect(dialogAutocomplete).toBeInTheDocument();

        expect(dialogAutocomplete?.textContent).toContain(RENDER_TEST);
    });
});
