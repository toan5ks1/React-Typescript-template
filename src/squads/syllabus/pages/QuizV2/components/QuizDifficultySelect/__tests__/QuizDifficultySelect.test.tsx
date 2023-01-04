import { DifficultyLevels } from "src/squads/syllabus/models/quiz";
import { $enum } from "ts-enum-util";

import QuizDifficultySelect from "../QuizDifficultySelect";

import { fireEvent, render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

const difficultyValues = $enum(DifficultyLevels).getValues();

describe(QuizDifficultySelect.name, () => {
    it(`should render ${difficultyValues} options`, () => {
        render(
            <TestApp>
                <TestHookForm>
                    <QuizDifficultySelect />
                </TestHookForm>
            </TestApp>
        );

        fireEvent.mouseDown(screen.getByRole("button"));

        const options = screen.getAllByRole("option");

        expect(options).toHaveLength(difficultyValues.length);

        options.forEach((option, index) => {
            expect(option).toHaveAttribute("data-value", `${difficultyValues[index]}`);
        });
    });
});
