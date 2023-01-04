import { convertFromRaw, EditorState } from "draft-js";
import { mount } from "enzyme";
import { isValidUrl } from "src/squads/syllabus/common/utils/draft-js";

import InlineLink from "../InlineLink";

const trueLink = "www.youtube.com";
const shortenLink = "youtube.com";
const httpsLink = "https://www.youtube.com/";
const wrongLink = " wrong Link ";

const generateEditState = (url: string) => {
    const raw = `{"blocks":[{"key":"cqk10","text":"${url}","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;
    const content = convertFromRaw(JSON.parse(raw));
    const rawEditorState = EditorState.createWithContent(content);
    const rawSelectionState = rawEditorState.getSelection();

    const desiredSelectionState = {
        anchorKey: "cqk10",
        anchorOffset: 0,
        focusKey: "cqk10",
        focusOffset: url.length,
    };
    const newSelectionState = rawSelectionState.merge(desiredSelectionState);
    const editorState = EditorState.forceSelection(rawEditorState, newSelectionState);
    return editorState;
};

describe("<InlineLink />", () => {
    it("InlineLink should on change if data is https link", () => {
        const props = {
            editorState: generateEditState(httpsLink),
            onChange: jest.fn(),
            onClick: jest.fn(),
        };
        const wrapper = mount(<InlineLink {...props} />);
        wrapper.find("button").simulate("click");

        expect(props.onChange).toBeCalled();
        expect(isValidUrl(httpsLink)).toBe(true);
    });

    it("InlineLink should onchange if data is normal link", () => {
        const props = {
            editorState: generateEditState(trueLink),
            onChange: jest.fn(),
            onClick: jest.fn(),
        };

        const wrapper = mount(<InlineLink {...props} />);
        wrapper.find("button").simulate("click");

        wrapper
            .findWhere((n) => n.type() === "input")
            .simulate("change", { target: { value: trueLink } })
            .simulate("keypress", { key: "Enter" });

        const inputValue = wrapper.findWhere((n) => n.type() === "input").prop("value");

        expect(isValidUrl(inputValue)).toBe(true);
        expect(props.onChange).toBeCalled();
    });

    it("InlineLink should onchange if data is shorten link", () => {
        const props = {
            editorState: generateEditState(shortenLink),
            onChange: jest.fn(),
            onClick: jest.fn(),
        };

        const wrapper = mount(<InlineLink {...props} />);
        wrapper.find("button").simulate("click");

        wrapper
            .findWhere((n) => n.type() === "input")
            .simulate("change", { target: { value: trueLink } });

        wrapper
            .findWhere(
                (n) =>
                    n.type() === "button" &&
                    n.text() === "resources.notifications.button.addInlineLink"
            )
            .simulate("click");

        const inputValue = wrapper.findWhere((n) => n.type() === "input").prop("value");
        expect(isValidUrl(inputValue)).toBe(true);
        expect(props.onChange).toBeCalled();
    });

    it("InlineLink should not on change if data is not link", () => {
        const props = {
            editorState: generateEditState(wrongLink),
            onChange: jest.fn(),
            onClick: jest.fn(),
        };
        const wrapper = mount(<InlineLink {...props} />);

        wrapper.find("button").simulate("click");
        expect(props.onChange).not.toBeCalled();
        expect(isValidUrl(wrongLink)).toBe(false);
    });
});
