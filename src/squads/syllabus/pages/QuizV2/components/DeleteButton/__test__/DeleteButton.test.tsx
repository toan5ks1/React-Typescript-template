import { Entities } from "src/common/constants/enum";

import DeleteButton from "../DeleteButton";

import { render, fireEvent } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe(DeleteButton.name, () => {
    it("should has correct title", () => {
        const { getByRole } = render(
            <TestThemeProvider>
                <DeleteButton onClick={() => {}} />
            </TestThemeProvider>
        );

        expect(getByRole("button").textContent).toEqual(
            `resources.${Entities.QUIZZES}.deleteTheAnswer`
        );
    });

    it("should behave correctly onClick", () => {
        const fn = jest.fn();
        const { getByRole } = render(
            <TestThemeProvider>
                <DeleteButton onClick={fn} />
            </TestThemeProvider>
        );

        fireEvent(
            getByRole("button"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
        expect(fn).toBeCalledTimes(1);
    });
});
