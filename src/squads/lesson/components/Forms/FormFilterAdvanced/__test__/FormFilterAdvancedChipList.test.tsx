import { shallow } from "enzyme";

import FormFilterAdvancedChipList, {
    FormFilterAdvancedChipListProps,
} from "../FormFilterAdvancedChipList";

import { render, RenderResult } from "@testing-library/react";

describe("<FormFilterAdvancedChipList />", () => {
    let wrapper: RenderResult;

    const props: FormFilterAdvancedChipListProps<any> = {
        onClearAll: jest.fn(),
        onDelete: jest.fn(),
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

    beforeEach(() => {
        wrapper = render(<FormFilterAdvancedChipList {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<FormFilterAdvancedChipList /> handlers", () => {
    const props: FormFilterAdvancedChipListProps<any> = {
        onClearAll: jest.fn(),
        onDelete: jest.fn(),
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

    const wrapper = shallow(<FormFilterAdvancedChipList {...props} />);

    it("handle delete chip", () => {
        wrapper
            .find('[data-testid="FormFilterAdvancedChipList__chipItem"]')
            .first()
            .simulate("delete");

        expect(props.onDelete).toBeCalled();
    });

    it("handle clear all", () => {
        wrapper
            .find('[data-testid="FormFilterAdvancedChipList__buttonClearAll"]')
            .simulate("click");

        expect(props.onClearAll).toBeCalled();
    });
});
