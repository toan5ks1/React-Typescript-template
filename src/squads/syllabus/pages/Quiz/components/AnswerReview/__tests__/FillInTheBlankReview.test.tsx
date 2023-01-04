import { LabelTypes } from "src/common/utils/label-generator";
import { createEmptyAnswer } from "src/squads/syllabus/models/quiz";

import FillInBlankReview from "../FillInBlankReview";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useFeatureToggle");

describe("<FillInBlankReview />", () => {
    it("should render the label part", () => {
        const answer = createEmptyAnswer("123", true);

        const { rerender } = render(
            <FillInBlankReview answer={answer} labelType={LabelTypes.NUMBER} />
        );
        expect(screen.queryByText(/Test/)).not.toBeInTheDocument();

        rerender(
            <FillInBlankReview
                answer={{ ...answer, label: "Test" }}
                labelType={LabelTypes.CUSTOM}
            />
        );

        expect(screen.queryByDisplayValue(/Test/)).toBeInTheDocument();
    });
});
