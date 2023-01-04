import { convertFromRaw, RawDraftContentState } from "draft-js";

import BlockMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/BlockMathJax";
import {
    BlockPluginProps,
    Callbacks,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-types";
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
            type: CustomBlockTypes.BLOCK_MATHJAX,
            mutability: "IMMUTABLE",
            data: {
                data: mathFormula,
            },
        },
    },
};
const contentState = convertFromRaw(rawDraftContentState);
const block = contentState.getBlockForKey(key);
const blockProps = (readOnly: boolean = false): Callbacks => ({
    readOnly,
    onBlockRemove: jest.fn(),
    onBlockUpdate: jest.fn(),
    onEndEdit: jest.fn(),
    onStartEdit: jest.fn(),
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

const renderUtil = (props: BlockPluginProps) =>
    render(<BlockMathJax {...props} />, { wrapper: TestCommonAppProvider });

describe(BlockMathJax.name, () => {
    it("should render math formular", () => {
        renderUtil({ block, contentState, blockProps: blockProps() });

        expect(screen.getByTestId("BlockMathJax__formula")).toBeInTheDocument();
    });

    it("should render popup once clicked on the formula", () => {
        renderUtil({ block, contentState, blockProps: blockProps() });

        fireEvent.click(screen.getByTestId("BlockMathJax__formula"));

        expect(screen.getByTestId("BlockMathJax__popup")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Math Formula" })).toHaveTextContent(
            mathFormula
        );
        expect(screen.getByTestId("BlockMathJax__done")).toBeInTheDocument();
    });

    it("should not render popup even if clicked on the math formula", () => {
        renderUtil({ block, contentState, blockProps: blockProps(true) });

        fireEvent.click(screen.getByTestId("BlockMathJax__formula"));

        expect(screen.queryByTestId("BlockMathJax__popup")).not.toBeInTheDocument();
    });
});
