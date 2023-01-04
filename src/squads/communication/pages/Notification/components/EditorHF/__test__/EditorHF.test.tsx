import { useForm } from "react-hook-form";
import { NotificationSelectors } from "src/squads/communication/models/notification";
import { getExampleDraftContent } from "src/squads/communication/test-utils/draft-js";

import EditorHF, { EditorHFProps } from "../EditorHF";

import { render, screen } from "@testing-library/react";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const HookFormComponent = () => {
    const methods = useForm();
    const props: EditorHFProps = {
        defaultValue: getExampleDraftContent("DEFAULT_VALUE_OF_EDITOR"),
        name: "content",
        selector: NotificationSelectors.content,
    };
    return (
        <TestHookFormProvider methodsOverride={methods}>
            <EditorHF {...props} {...methods} />
        </TestHookFormProvider>
    );
};
describe("<EditorHF />", () => {
    it("should render default value", () => {
        render(<HookFormComponent />);

        expect(screen.getByTestId("Editor__draftEditor")).toHaveTextContent(
            "DEFAULT_VALUE_OF_EDITOR"
        );
    });
});
