import { ReactNode } from "react";

import { convertFromRaw, RawDraftContentState } from "draft-js";

import {
    InlineDecoratorProps,
    InlinePluginProps,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/Editor/types";
import InlineMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/InlineMathJax";
import { CustomBlockTypes } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-utils";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const key: string = "1nlek";
const mathFormula: string = "\\frac{\\sec A}{\\operatorname{cosec} B}-\\frac{\\tan A}{\\cot B}";
const rawDraftContentState: RawDraftContentState = {
    blocks: [
        {
            key,
            text: " ",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
                {
                    offset: 0,
                    length: 1,
                    key: 0,
                },
            ],
            data: {},
        },
    ],
    entityMap: {
        "0": {
            type: CustomBlockTypes.INLINE_MATHJAX,
            mutability: "IMMUTABLE",
            data: {
                data: mathFormula,
            },
        },
    },
};
const contentState = convertFromRaw(rawDraftContentState);
const entityKey: string = contentState.getBlockForKey(key).getEntityAt(0);
const childrenText: string = "children text";
const children: ReactNode = <div>{childrenText}</div>;
const offsetKey: string = "test-key";
const inlineDecoratorProps = (readOnly: boolean = false): InlineDecoratorProps => ({
    readOnly,
    onEndEdit: jest.fn(),
    onInlineUpdate: jest.fn(),
    onStartEdit: jest.fn(),
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

const renderUtil = (props: InlinePluginProps) =>
    render(<InlineMathJax {...props} />, { wrapper: TestCommonAppProvider });

describe(InlineMathJax.name, () => {
    it("should render with correct offset key", () => {
        renderUtil({ children, contentState, entityKey, offsetKey, ...inlineDecoratorProps() });

        expect(screen.getByTestId("InlineMathJax__root")).toHaveAttribute(
            "data-offset-key",
            offsetKey
        );
    });

    it("should render math formula", () => {
        renderUtil({ children, contentState, entityKey, offsetKey, ...inlineDecoratorProps() });

        expect(screen.getByTestId("InlineMathJax__formula")).toBeInTheDocument();
    });

    it("should render popup once clicked on the formula", () => {
        renderUtil({ children, contentState, entityKey, offsetKey, ...inlineDecoratorProps() });

        fireEvent.click(screen.getByTestId("InlineMathJax__formula"));

        expect(screen.getByTestId("InlineMathJax__popup")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Math Formula" })).toHaveTextContent(
            mathFormula
        );
        expect(screen.getByTestId("InlineMathJax__done")).toBeInTheDocument();
    });

    it("should render children component", () => {
        renderUtil({ children, contentState, entityKey, offsetKey, ...inlineDecoratorProps() });

        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });

    it("should not render popup even if clicked on math formula", () => {
        renderUtil({ children, contentState, entityKey, offsetKey, ...inlineDecoratorProps(true) });

        fireEvent.click(screen.getByTestId("InlineMathJax__formula"));

        expect(screen.queryByTestId("InlineMathJax__popup")).not.toBeInTheDocument();
    });
});
