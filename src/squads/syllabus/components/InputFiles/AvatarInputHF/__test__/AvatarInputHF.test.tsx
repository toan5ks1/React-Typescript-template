import { useForm } from "react-hook-form";
import { createFile } from "src/squads/syllabus/test-utils/file";

import AvatarInputHF, { AvatarInputHFProps } from "../AvatarInputHF";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const ComponentHF = ({
    mode,
    onChange,
}: {
    mode: AvatarInputHFProps["mode"];
    onChange: AvatarInputHFProps["onChange"];
}) => {
    const methods = useForm();
    const { watch } = methods;
    const value = watch("avatar");

    return (
        <TestHookFormProvider methodsOverride={methods}>
            <AvatarInputHF onChange={onChange} mode={mode} name="avatar" initialSource="avatar" />
            <div data-testid="ComponentHF__value">
                {mode === "files" && value && value[0] ? value[0].name : value}
            </div>
        </TestHookFormProvider>
    );
};
describe(AvatarInputHF.name, () => {
    const rootTestId = "AvatarInput__root";
    const labelForInput = "AvatarInput__labelHtmlFor";
    const inputTestId = "AvatarInput__input";
    const deleteImage = "AvatarInput__delete";

    it("should match snapshot", () => {
        const { container } = render(
            <TestHookForm defaultValues={{}}>
                <AvatarInputHF name="avatar" initialSource="avatar" readOnly />
            </TestHookForm>
        );

        expect(container).toMatchSnapshot();
    });

    it("should render default values", () => {
        render(
            <TestHookForm defaultValues={{ avatar: "AVATAR_URL" }}>
                <AvatarInputHF name="avatar" initialSource="avatar" readOnly />
            </TestHookForm>
        );

        expect(screen.getByTestId(rootTestId)).toHaveStyle("background-image: url(AVATAR_URL)");
    });

    it("should not trigger anything with readOnly mode is active (htmlFor will be convert to for)", () => {
        render(
            <TestHookForm defaultValues={{ avatar: "AVATAR_URL" }}>
                <AvatarInputHF name="avatar" initialSource="avatar" readOnly />
            </TestHookForm>
        );

        expect(screen.getByTestId(labelForInput)).toHaveAttribute("for", "");
        expect(screen.getByTestId(inputTestId)).toHaveAttribute("id", "avatar");
        expect(screen.queryByTestId(deleteImage)).not.toBeInTheDocument();
    });

    it("should render image when onChange mode files", async () => {
        const onChange = jest.fn();
        render(<ComponentHF mode={"files"} onChange={onChange} />);

        //upload file
        const inputTarget = screen.getByTestId(inputTestId) as HTMLInputElement;
        const file = createFile("fileName");
        Object.defineProperty(inputTarget, "files", { value: [file] });

        fireEvent.change(inputTarget);

        await waitFor(() => {
            expect(screen.getByTestId(rootTestId).style.backgroundImage).toEqual(
                "url(data:image/png;base64,AA==)"
            );
        });
        expect(onChange).toBeCalled();
        expect(screen.getByTestId("ComponentHF__value").textContent).toEqual("fileName");
    });
    it("should render image when onChange mode base64", async () => {
        const onChange = jest.fn();
        render(<ComponentHF mode={"base64"} onChange={onChange} />);

        //upload file
        const inputTarget = screen.getByTestId(inputTestId) as HTMLInputElement;
        const file = createFile();
        Object.defineProperty(inputTarget, "files", { value: [file] });

        fireEvent.change(inputTarget);

        await waitFor(() => {
            expect(screen.getByTestId(rootTestId).style.backgroundImage).toEqual(
                "url(data:image/png;base64,AA==)"
            );
        });
        expect(onChange).toBeCalled();
        expect(screen.getByTestId("ComponentHF__value").textContent).toEqual(
            "data:image/png;base64,AA=="
        );
    });

    it("should handle delete image action", () => {
        render(
            <TestHookForm defaultValues={{ avatar: "AVATAR_URL" }}>
                <AvatarInputHF name="avatar" initialSource="avatar" shouldDelete />
            </TestHookForm>
        );
        expect(screen.getByTestId(rootTestId)).toHaveStyle("background-image: url(AVATAR_URL)");

        fireEvent.click(screen.getByTestId(deleteImage));

        expect(screen.getByTestId(rootTestId)).toHaveStyle("background-image: none");
    });

    it("should accept file type is image", () => {
        render(
            <TestHookForm defaultValues={{ avatar: "AVATAR_URL" }}>
                <AvatarInputHF name="avatar" initialSource="avatar" readOnly />
            </TestHookForm>
        );

        expect(screen.getByTestId(inputTestId)).toHaveAttribute("accept", "image/*");
        expect(screen.getByTestId(inputTestId)).toHaveAttribute("type", "file");
    });
});
