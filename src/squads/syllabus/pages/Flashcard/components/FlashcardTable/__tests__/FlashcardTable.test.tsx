import { QuizItemAttributeConfig, QuizType } from "src/squads/syllabus/models/quiz";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import FlashcardTable, { FlashcardTableProps } from "../FlashcardTable";

import { render, screen } from "@testing-library/react";
import useSwapQuizOrder from "src/squads/syllabus/hooks/useSwapQuizOrder";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useSwapQuizOrder", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const baseFlashcard: FlashcardTableProps["data"][0] = {
    definition: "Def",
    externalId: "4",
    kind: QuizType.QUIZ_TYPE_POW,
    schoolId: 1,
    term: "Term",
    loId: "01",
};

const createFlashcard = (total: number): FlashcardTableProps["data"] =>
    createArrayNumber(total).map((i) => ({
        ...baseFlashcard,
        externalId: `externalId ${i}`,
    }));

const renderUtil = (override: Partial<FlashcardTableProps> = {}) => {
    const defaultProps: FlashcardTableProps = {
        body: {
            rowKey: "externalId",
            loading: false,
        },
        loId: "lo_id",
        refetch: jest.fn(),
        data: [],
        ...override,
    };
    render(
        <TestQueryWrapper>
            <FlashcardTable {...defaultProps} />
        </TestQueryWrapper>
    );
};

describe(FlashcardTable.name, () => {
    beforeEach(() => {
        (useSwapQuizOrder as jest.Mock).mockReturnValue({
            isLoading: false,
        });
    });

    it("should disable the move up action when the item is first element", () => {
        renderUtil({ data: createFlashcard(3) });
        expect(screen.getAllByTestId("MoveUpDownBase__up").shift()).toBeDisabled();
    });

    it("should disable the move down action when the item is last element", () => {
        renderUtil({ data: createFlashcard(3) });
        expect(screen.getAllByTestId("MoveUpDownBase__down").pop()).toBeDisabled();
    });

    it("should render audio when term is english", () => {
        renderUtil({
            data: [
                {
                    ...baseFlashcard,
                    termAudio: "audio_link_from_storage_01",
                    termLanguage: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG,
                },
            ],
        });

        const audioElement = screen.getByTestId("FlashcardTable__termAudio").querySelector("audio");

        expect(audioElement?.src).toContain("audio_link_from_storage_01");
    });
    it("should render audio when definition is english", () => {
        renderUtil({
            data: [
                {
                    ...baseFlashcard,
                    definitionAudio: "audio_link_from_storage_01",
                    definitionLanguage: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG,
                },
            ],
        });

        const audioElement = screen
            .getByTestId("FlashcardTable__definitionAudio")
            .querySelector("audio");

        expect(audioElement?.src).toContain("audio_link_from_storage_01");
    });
    it("should render default image when flash card don't have image", () => {
        renderUtil({
            data: [
                {
                    ...baseFlashcard,
                    image: undefined,
                },
            ],
        });
        expect(screen.getByTestId("ImagePreview__default")).toBeInTheDocument();
    });
    it("should render image when flash card have image", () => {
        renderUtil({
            data: [
                {
                    ...baseFlashcard,
                    image: "image_link_storage",
                },
            ],
        });

        const imageElement = screen.getByTestId("ImagePreview__img").querySelector("img");

        expect(imageElement?.src).toContain("image_link_storage");
    });
});

describe(`${FlashcardTable.name} prevent user click move up/down when updating display order`, () => {
    beforeEach(() => {
        (useSwapQuizOrder as jest.Mock).mockReturnValue({ isLoading: true });
        renderUtil({
            data: createFlashcard(4),
        });
    });
    it("should disable all move up/down when updating display order", () => {
        screen.getAllByTestId("MoveUpDownBase__up").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("MoveUpDownBase__down").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});
