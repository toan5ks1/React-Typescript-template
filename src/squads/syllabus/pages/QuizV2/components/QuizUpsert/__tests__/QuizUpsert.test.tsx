import { FC } from "react";

import { useLocation } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import QuizUpsert, { QuizUpsertProps } from "../QuizUpsert";

import { fireEvent, render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import TestQuizProvider from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import { createTestLO } from "src/squads/syllabus/test-utils/quizV2";

const lo = createTestLO();
const search: string = `?bookId=bookId&chapterId=chapterId&parentId=loId`;
const mockQuizzesUrl: string = `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${lo.lo_id}/show${search}`;

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("react-router", () => {
    const origin = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...origin,
        useLocation: jest.fn(),
    };
});

const mockPushNavigation = jest.fn();

const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const mockUseLocation = () => {
    (useLocation as jest.Mock).mockImplementation(() => ({ search }));
};

const Wrapper: FC = ({ children }) => (
    <TestAppWithQueryClient>
        <TestQuizProvider lo={lo}>{children}</TestQuizProvider>
    </TestAppWithQueryClient>
);

const renderApp = (props: QuizUpsertProps) =>
    render(<QuizUpsert {...props} />, { wrapper: Wrapper });

describe(QuizUpsert.name, () => {
    beforeEach(() => {
        mockUseNavigation();
        mockUseLocation();
    });

    it("should close quiz dialog and navigate to LO detail page when clicking on the close button", () => {
        const props: QuizUpsertProps = {
            title: "Upsert component",
        };

        renderApp(props);

        fireEvent.click(screen.getByRole("button", { name: "close" }));

        expect(mockPushNavigation).toBeCalledWith(mockQuizzesUrl);
    });

    it("should close quiz dialog and navigate to LO detail page when clicking on the cancel button", () => {
        const props: QuizUpsertProps = {
            title: "Upsert component",
        };

        renderApp(props);

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));

        expect(mockPushNavigation).toBeCalledWith(mockQuizzesUrl);
    });
});
