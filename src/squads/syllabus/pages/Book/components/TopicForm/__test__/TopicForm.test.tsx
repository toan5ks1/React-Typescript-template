import TopicForm from "../TopicForm";

import { render, screen } from "@testing-library/react";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

describe(TopicForm.name, () => {
    it("should render topic form correct UI", () => {
        render(
            <TestHookFormProvider>
                <TopicForm />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("AvatarInput__root")).toBeInTheDocument();
        expect(screen.getByTestId("TextFieldHF__input")).toBeInTheDocument();
    });
});
