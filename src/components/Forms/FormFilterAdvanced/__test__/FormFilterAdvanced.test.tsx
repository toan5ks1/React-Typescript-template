import { shallow } from "enzyme";
import { TestThemeProvider } from "src/test-utils";

import ButtonDropdownWithPopover from "src/components/Buttons/ButtonDropdownWithPopover";

import FormFilterAdvanced, {
    FormFilterAdvancedProps,
    DEFAULT_FORM_FILTER_ADVANCED_WIDTH,
} from "../FormFilterAdvanced";

import { render, RenderResult } from "@testing-library/react";
import TestHookFormProvider from "src/test-utils/TestHookFormProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        ...originalModule,
        useFormContext: () => {
            return {
                handleSubmit: jest.fn(),
                reset: jest.fn(),
                watch: () => ({
                    name: "Test Name",
                    status: "Test Status",
                }),
            };
        },
    };
});

const HookFormComponent = () => {
    const props: FormFilterAdvancedProps<any> = {
        children: <div>Content</div>,
        onEnterSearchBar: jest.fn(),
        isDisableReset: true,
        onClosePopover: jest.fn(),
        onReset: jest.fn(),
        filterNameApplied: [
            {
                name: "course",
                inputLabel: "Course",
                isApplied: true,
                defaultValue: [],
            },
            {
                name: "lessonStatus",
                chipLabel: "Status",
                inputLabel: "Lesson Status",
                isApplied: true,
                defaultValue: [],
            },
        ],
    };

    return (
        <TestThemeProvider>
            <TestHookFormProvider>
                <FormFilterAdvanced<any> {...props} />
            </TestHookFormProvider>
        </TestThemeProvider>
    );
};

describe("<FormFilterAdvanced />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("FormFilterAdvanced__root")).toMatchSnapshot();
        expect(
            wrapper.getByTestId("FormFilterAdvanced__root").querySelector(".MuiBox-root")
        ).toHaveStyle(`width: ${DEFAULT_FORM_FILTER_ADVANCED_WIDTH}`);
    });
});

describe("<FormFilterAdvanced /> handlers", () => {
    const props: FormFilterAdvancedProps<any> = {
        children: <div>Content</div>,
        onEnterSearchBar: jest.fn(),
        isDisableReset: true,
        onClosePopover: jest.fn(),
        onReset: jest.fn(),
        filterNameApplied: [
            {
                name: "course",
                inputLabel: "Course",
                isApplied: true,
                defaultValue: [],
            },
            {
                name: "lessonStatus",
                chipLabel: "Status",
                inputLabel: "Lesson Status",
                isApplied: true,
                defaultValue: [],
            },
        ],
    };

    const wrapper = shallow(<FormFilterAdvanced<any> {...props} />);

    it("handle close popover", () => {
        wrapper.find(ButtonDropdownWithPopover).simulate("closePopover");
        expect(props.onClosePopover).toBeCalled();
    });

    it("handle reset", () => {
        wrapper.find(ButtonDropdownWithPopover).simulate("resetFilter");
        expect(props.onReset).toBeCalled();
    });
});
