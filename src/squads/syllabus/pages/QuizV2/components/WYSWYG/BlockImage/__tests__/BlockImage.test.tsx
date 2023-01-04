import { convertFromRaw, RawDraftContentState } from "draft-js";

import {
    BlockPluginProps,
    Callbacks,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-types";
import { CustomBlockTypes } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-utils";

import BlockImage from "../BlockImage";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const key: string = "3h83j";
const imageSrc: string = "https://example.com/sample.jpg";
const rawDraftContentState: RawDraftContentState = {
    blocks: [
        {
            key,
            text: " ",
            type: "atomic",
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
            type: CustomBlockTypes.BLOCK_IMAGE,
            mutability: "IMMUTABLE",
            data: {
                data: imageSrc,
            },
        },
    },
};
const contentState = convertFromRaw(rawDraftContentState);
const block = contentState.getBlockForKey(key);

const blockProps = (readOnly: boolean = false): Callbacks => ({
    readOnly,
    onStartEdit: jest.fn(),
    onEndEdit: jest.fn(),
    onBlockRemove: jest.fn(),
    onBlockUpdate: jest.fn(),
});

const renderUtil = (props: BlockPluginProps) =>
    render(<BlockImage {...props} />, { wrapper: TestCommonAppProvider });

describe(BlockImage.name, () => {
    it("should render image element without 2 action buttons", () => {
        renderUtil({ block, contentState, blockProps: blockProps() });

        expect(screen.getByTestId("BlockImage__img")).toHaveAttribute("src", imageSrc);
        expect(screen.queryByTestId("BlockImage__cancel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("BlockImage__remove")).not.toBeInTheDocument();
    });

    it("should render image element with 2 action buttons once clicked the image", () => {
        renderUtil({ block, contentState, blockProps: blockProps() });

        const imgEl = screen.getByTestId("BlockImage__img");
        fireEvent.click(imgEl);

        expect(imgEl).toBeInTheDocument();
        expect(screen.getByTestId("BlockImage__cancel")).toBeInTheDocument();
        expect(screen.getByTestId("BlockImage__remove")).toBeInTheDocument();
    });

    it("should not render 2 actions buttons even if clicked on the image element", () => {
        renderUtil({ block, contentState, blockProps: blockProps(true) });

        const imgEl = screen.getByTestId("BlockImage__img");
        fireEvent.click(imgEl);

        expect(imgEl).toBeInTheDocument();
        expect(screen.queryByTestId("BlockImage__cancel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("BlockImage__remove")).not.toBeInTheDocument();
    });
});
