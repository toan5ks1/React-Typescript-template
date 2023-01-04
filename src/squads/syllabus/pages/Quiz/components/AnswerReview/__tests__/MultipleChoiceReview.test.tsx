import { createEmptyAnswer } from "src/squads/syllabus/models/quiz";

import MultipleChoiceReview from "../MultipleChoiceReview";

import { render } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle");

describe("<MultipleChoiceReview />", () => {
    it("should render without crash", () => {
        render(
            <AppProvider>
                <MultipleChoiceReview answer={createEmptyAnswer("123", true)} />
            </AppProvider>
        );
    });
});
