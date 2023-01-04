import AutocompleteTooltipBase, {
    getOptionSelected,
    AutocompleteTooltipBaseProps,
} from "../AutocompleteTooltipBase";

import { fireEvent, render, RenderResult } from "@testing-library/react";

type FakeOptions = {
    id: string;
    value: string;
    user?: {
        avatar: string;
        email: string;
    };
};

const mockOnChange = jest.fn();
const mockRenderTag = jest.fn();
function renderComponent<T>(props: AutocompleteTooltipBaseProps<T>) {
    const {
        options = [],
        renderTags,
        onChange,
        getOptionSelectedField,
        optionLabelKey,
        ...remainProps
    } = props;
    return render(
        <AutocompleteTooltipBase
            open
            multiple
            id="test-AutocompleteTooltipBase"
            options={options}
            onChange={onChange || mockOnChange}
            defaultValue={[options[0]]}
            renderTags={renderTags || mockRenderTag}
            optionLabelKey={optionLabelKey}
            getOptionSelectedField={getOptionSelectedField}
            {...remainProps}
        />
    );
}
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

describe("<AutocompleteTooltipBase /> with getOptionSelectedField", () => {
    const props = {
        options: [
            {
                id: "1",
                value: "A",
                user: { avatar: "avatarA", email: "testA-email@manabie.com" },
            },
            {
                id: "2",
                value: "B",
                user: { avatar: "avatarB", email: "testB-email@manabie.com" },
            },
        ],
        optionLabelKey: "value",
        getOptionSelectedField: "id",
    };
    it("have value", () => {
        const wrapper = renderComponent({ ...props });
        expect(wrapper.container).toMatchSnapshot();
    });
    it("not have value", () => {
        const wrapper = renderComponent({ ...props });
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<AutocompleteTooltipBase /> with function optionLabel", () => {
    let wrapper: RenderResult;

    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A" },
            { id: "2", value: "B" },
        ],
    };

    beforeEach(() => {
        wrapper = render(
            <AutocompleteTooltipBase
                open
                multiple
                id="test-AutocompleteTooltipBase"
                options={props.options}
                onChange={props.onChange}
                defaultValue={[props.options[0]]}
                renderTags={(option: any) => <div>{option.id}</div>}
                optionLabelKey="value"
                getOptionSelectedField="id"
            />
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("withoutOptionLabel");
    });
});

describe("<AutocompleteTooltipBase /> with function optionHelperText and optionImage", () => {
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
            <AutocompleteTooltipBase
                open
                multiple
                disableCloseOnSelect
                id="test-AutocompleteTooltipBase"
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

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("with function optionHelperText and optionImage");
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

describe("<AutocompleteTooltipBase /> without optionImage", () => {
    let wrapper: RenderResult;

    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ],
    };

    beforeEach(() => {
        wrapper = render(
            <AutocompleteTooltipBase
                open
                multiple
                disableCloseOnSelect
                id="test-AutocompleteTooltipBase"
                optionHelperText="user.email"
                defaultValue={[props.options[0]]}
                optionLabelKey="user.email"
                getOptionSelectedField="id"
                {...props}
            />
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("without optionImage");
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

describe("<AutocompleteTooltipBase /> with startAdornment", () => {
    let wrapper: RenderResult;
    const ADORNMENT = "Test Adornment";
    const ADORNMENT_DATA_TESTID = "AutocompleteTooltipBase__startAdornment";

    const props = {
        onChange: jest.fn(),
        options: [
            { id: "1", value: "A", user: { avatar: "avatarA", email: "testA-email@manabie.com" } },
            { id: "2", value: "B", user: { avatar: "avatarB", email: "testB-email@manabie.com" } },
        ],
    };

    beforeEach(() => {
        wrapper = render(
            <AutocompleteTooltipBase
                open
                multiple
                disableCloseOnSelect
                id="test-AutocompleteTooltipBase"
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

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("with start adornment");
    });

    it("should render start adornment", () => {
        const startAdornment = document.body.querySelector(
            `[data-testid="${ADORNMENT_DATA_TESTID}"]`
        );
        expect(startAdornment).toBeInTheDocument();

        expect(startAdornment?.textContent).toEqual(ADORNMENT);
    });
});

describe("<AutocompleteTooltipBase /> with renderOption", () => {
    let wrapper: RenderResult;
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
        wrapper = render(
            <AutocompleteTooltipBase
                open
                multiple
                disableCloseOnSelect
                id="test-AutocompleteTooltipBase"
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

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("with render option");
    });

    it("should render with renderOption func", () => {
        const dialogAutocomplete = document.body.querySelector(`div[role="presentation"]`);
        expect(dialogAutocomplete).toBeInTheDocument();

        expect(dialogAutocomplete?.textContent).toContain(RENDER_TEST);
    });
});
