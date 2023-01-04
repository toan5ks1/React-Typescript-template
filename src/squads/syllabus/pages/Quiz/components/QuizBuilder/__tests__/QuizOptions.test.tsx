import appConfigs from "src/internals/configuration";
import { SyllabusRules } from "src/squads/syllabus/internals/permission/rules";
import { QuizType } from "src/squads/syllabus/models/quiz";
import { PjOwner } from "src/squads/syllabus/typings/configuration";

import { PermissionContext } from "src/providers/PermissonProvider";
import LOsAutocomplete from "src/squads/syllabus/pages/Quiz/components/Autocompletes/LOsAutocomplete";

import QuizOptions, { QuestionOptionsProps } from "../QuizOptions";

import { Ability, AbilityBuilder, AbilityType } from "@manabie-com/role-based-permission";
import { render, screen } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/internals/configuration");
jest.mock("src/squads/syllabus/internals/permission");

jest.mock("src/squads/syllabus/pages/Quiz/components/Autocompletes/LOsAutocomplete", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<QuizOptions />", () => {
    beforeEach(() => {
        (LOsAutocomplete as unknown as jest.Mock).mockReturnValue(<span />);
    });

    it("should show difficulty, tagged lo and not show mapped id on manabie", () => {
        const mockProps: QuestionOptionsProps = {
            difficultyLevel: 1,
            externalId: "externalId",
            questionType: QuizType.QUIZ_TYPE_MCQ,
            taggedLOs: [],
            externalIdProps: { editExternalIdDisabled: false },
        };

        (appConfigs.getCurrentPjOwner as jest.Mock).mockReturnValue(PjOwner.MANABIE);

        let ability: Ability<AbilityType<SyllabusRules>> = new Ability();
        const { can, cannot, rules } = new AbilityBuilder();

        can("show.difficulty", "quizzes");
        can("show.tag_lo", "quizzes");
        cannot("show.external_id", "quizzes");

        ability.update(rules as any);

        render(
            <TestAppWithQueryClient>
                <AppProvider>
                    <PermissionContext.Provider value={ability}>
                        <QuizOptions {...mockProps} />
                    </PermissionContext.Provider>
                </AppProvider>
            </TestAppWithQueryClient>
        );
        expect(screen.getByTestId("QuizOptions__lo")).toBeInTheDocument();
        expect(screen.getByTestId("QuizOptions__difficulty")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizOptions__externalId")).not.toBeInTheDocument();
    });

    it("should show mapped id and not show difficulty and tagged lo on jprep", () => {
        const mockProps: QuestionOptionsProps = {
            difficultyLevel: 1,
            externalId: "externalId",
            questionType: QuizType.QUIZ_TYPE_MCQ,
            taggedLOs: [],
            externalIdProps: { editExternalIdDisabled: true },
        };

        (appConfigs.getCurrentPjOwner as jest.Mock).mockReturnValue(PjOwner.JPREP);

        let ability: Ability<AbilityType<SyllabusRules>> = new Ability();
        const { can, cannot, rules } = new AbilityBuilder();

        can("show.external_id", "quizzes");
        cannot("show.difficulty", "quizzes");
        cannot("show.tag_lo", "quizzes");

        ability.update(rules as any);

        render(
            <PermissionContext.Provider value={ability}>
                <AppProvider>
                    <QuizOptions {...mockProps} />
                </AppProvider>
            </PermissionContext.Provider>
        );

        expect(screen.getByTestId("QuizOptions__externalId")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizOptions__lo")).not.toBeInTheDocument();
        expect(screen.queryByTestId("QuizOptions__difficulty")).not.toBeInTheDocument();

        const externalIdInput = screen
            .getByTestId("QuizOptions__externalId")
            .querySelector("input");
        expect(externalIdInput).toBeDisabled();
        expect(externalIdInput!.value).toEqual(mockProps.externalId);
    });
});
