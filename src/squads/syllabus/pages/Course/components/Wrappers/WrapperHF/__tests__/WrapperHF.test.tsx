import TextFieldHF from "src/components/TextFields/TextFieldHF";
import WrapperHF from "src/squads/syllabus/pages/Course/components/Wrappers/WrapperHF/WrapperHF";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("WrapperHF", () => {
    it("should submit form data", async () => {
        const onSubmit = jest.fn();

        render(
            <WrapperHF<{ name: string }>
                defaultValues={{ name: "test name" }}
                render={({ handleSubmit }) => {
                    return (
                        <>
                            <TextFieldHF name="name" data-testid="Form__textField" />
                            <button
                                data-testid="Form__submitButton"
                                onClick={handleSubmit(onSubmit)}
                            />
                        </>
                    );
                }}
            />
        );

        const textField = screen.getByTestId("Form__textField").querySelector("input");
        if (!textField) throw Error("Textfield is not found");

        expect(textField).toHaveValue("test name");
        userEvent.type(textField, " 123");

        const submitButton = screen.getByTestId("Form__submitButton");
        userEvent.click(submitButton);

        await waitFor(() => {
            const [[payload]] = onSubmit.mock.calls;
            expect(payload).toEqual({ name: "test name 123" });
        });
    });
});
