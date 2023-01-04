import { ReactNode } from "react";

import { convertFromRaw, RawDraftContentState } from "draft-js";

import { CustomBlockTypes } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-utils";

import LoadingImage, { LoadingImageProps } from "../LoadingImage";

import { render, screen } from "@testing-library/react";

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
            type: CustomBlockTypes.LOADING_IMAGE,
            mutability: "IMMUTABLE",
            data: {
                data: imageSrc,
            },
        },
    },
};
const contentState = convertFromRaw(rawDraftContentState);
const entityKey: string = contentState.getBlockForKey(key).getEntityAt(0);
const childrenText: string = "children text";
const children: ReactNode = <div>{childrenText}</div>;
const offsetKey: string = "test-key";

const renderUtil = (props: LoadingImageProps) => render(<LoadingImage {...props} />);

describe(LoadingImage.name, () => {
    it("should render with correct offset key", () => {
        renderUtil({ children, contentState, entityKey, offsetKey });

        expect(screen.getByTestId("LoadingImage__root")).toHaveAttribute(
            "data-offset-key",
            offsetKey
        );
    });

    it("should render spinner", () => {
        renderUtil({ children, contentState, entityKey, offsetKey });

        expect(screen.getByTestId("LoadingImage__spinner")).toBeInTheDocument();
    });

    it("should render image element with source", () => {
        renderUtil({ children, contentState, entityKey, offsetKey });

        expect(screen.getByTestId("LoadingImage__img")).toHaveAttribute("src", imageSrc);
    });

    it("should render children component", () => {
        renderUtil({ children, contentState, entityKey, offsetKey });

        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });
});
