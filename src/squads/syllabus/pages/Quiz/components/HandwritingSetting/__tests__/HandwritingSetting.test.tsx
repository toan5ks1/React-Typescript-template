import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import HandwritingSetting from "../HandwritingSetting";

import { fireEvent, render, screen } from "@testing-library/react";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

describe(HandwritingSetting.name, () => {
    it(`should render correct default setting and handwriting language options`, () => {
        const mockProps = {
            value: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
        };

        render(
            <TestTranslationProvider>
                <HandwritingSetting {...mockProps} />
            </TestTranslationProvider>
        );

        expect(screen.getByRole("button")).toHaveTextContent("English");

        fireEvent.mouseDown(screen.getByRole("button"));

        const options = screen.getAllByRole("option");

        expect(options[0].textContent).toEqual("Off");
        expect(options[1].textContent).toEqual("English");
        expect(options[2].textContent).toEqual("Japanese");
    });
});
