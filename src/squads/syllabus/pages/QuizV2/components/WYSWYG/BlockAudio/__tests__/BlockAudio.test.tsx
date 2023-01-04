import { convertFromRaw, RawDraftContentState } from "draft-js";

import {
    BlockPluginProps,
    Callbacks,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-types";
import { CustomBlockTypes } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-utils";

import BlockAudio from "../BlockAudio";

import { render, screen } from "@testing-library/react";

const key: string = "62u02";
const audioSrc: string = "https://example.com/sample.mp3";
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
        0: {
            data: {
                data: audioSrc,
            },
            mutability: "IMMUTABLE",
            type: CustomBlockTypes.BLOCK_AUDIO,
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

const renderUtil = (props: BlockPluginProps) => render(<BlockAudio {...props} />);

describe(BlockAudio.name, () => {
    it("should render audio element with source", () => {
        renderUtil({ contentState, block, blockProps: blockProps() });

        expect(screen.getByTestId("BlockAudio__root")).toHaveAttribute("src", audioSrc);
    });
});
