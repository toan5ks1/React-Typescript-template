import QuizCreate from "../QuizCreate";
import useQuizEssentials from "../hooks/useQuizEssentials";
import { UseQuizEssentialsValues } from "../hooks/useQuizEssentials/useQuizEssentials";
import { mockUseQuizEssentialsValues } from "./data";

import { render, screen } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("../hooks/useQuizEssentials");

const renderUtil = () => render(<QuizCreate />, { wrapper: TestAppWithQueryClient });

describe(QuizCreate.name, () => {
    beforeEach(() => {
        (useQuizEssentials as jest.Mock).mockImplementation(mockUseQuizEssentialsValues);
    });
    it("should render correct dialog title", () => {
        renderUtil();

        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent(
            "Create question"
        );
    });

    it("should render NotFound if lo is undefined", () => {
        (useQuizEssentials as jest.Mock<UseQuizEssentialsValues>).mockReturnValue({
            isFetching: false,
            quiz: null,
        });
        renderUtil();
        expect(screen.getByTestId("QuizCreate__notfound")).toBeInTheDocument();
    });
});
