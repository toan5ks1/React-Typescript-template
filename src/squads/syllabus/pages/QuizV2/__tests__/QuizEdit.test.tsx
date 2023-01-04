import QuizEdit from "../QuizEdit";
import useQuizEssentials from "../hooks/useQuizEssentials";
import { mockUseQuizEssentialsValues } from "./data";

import { render, screen } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("../hooks/useQuizEssentials");

const renderUtil = () => render(<QuizEdit />, { wrapper: TestAppWithQueryClient });

describe(QuizEdit.name, () => {
    beforeEach(() => {
        (useQuizEssentials as jest.Mock).mockImplementation(mockUseQuizEssentialsValues);
    });

    it("should render correct dialog title", () => {
        renderUtil();

        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent(
            "Edit question"
        );
    });
});
