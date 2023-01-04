import { useForm } from "react-hook-form";
import { TestThemeProvider } from "src/test-utils";

import { DialogFullScreenProps } from "../../types";
import DialogFullScreenHF from "../DialogFullScreenHF";

import { render, RenderResult, screen } from "@testing-library/react";

interface PartialDialogFullScreenProps extends Partial<DialogFullScreenProps> {}

const HookFormComponent = (props: PartialDialogFullScreenProps) => {
    const method = useForm();
    const safeProps: DialogFullScreenProps = {
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
        title: "With Action Footer",
        children: <div>Test</div>,
        ...props,
    };
    return (
        <TestThemeProvider>
            <DialogFullScreenHF {...safeProps} methods={method} />
        </TestThemeProvider>
    );
};

const renderUtil = (props: PartialDialogFullScreenProps) => {
    return render(<HookFormComponent {...props} />);
};

describe("<DialogFullScreenHF /> none action header and footer", () => {
    let wrapper: RenderResult;

    const props: PartialDialogFullScreenProps = {
        title: "None Action Header and Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = renderUtil(props);
    });

    it("should exist title", () => {
        expect(screen.getByText("None Action Header and Footer")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });
});

describe("<DialogFullScreen /> with action footer", () => {
    let wrapper: RenderResult;

    const props: PartialDialogFullScreenProps = {
        title: "With Action Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = renderUtil(props);
    });

    it("should exist title", () => {
        expect(screen.getByText("With Action Footer")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should exist buttons", () => {
        expect(screen.getByText("ra.common.action.cancel")).toBeInTheDocument();
        expect(screen.getByText("ra.common.action.save")).toBeInTheDocument();
    });
});

describe("<DialogFullScreen /> check textSave prop", () => {
    const textSave = "Test Text Save";
    const props: PartialDialogFullScreenProps = {
        textSave,
    };

    it("should render save button with text save", () => {
        renderUtil(props);
        expect(screen.getByText(textSave)).toBeInTheDocument();
    });
});

describe("<DialogFullScreen /> check content size props", () => {
    const contentTestId = "DialogFullScreen__content";
    const footerTestId = "DialogFullScreen__footer";

    it("should render content dialog max size is 1200px as default", () => {
        renderUtil({});
        expect(screen.getByTestId(contentTestId)).toHaveStyle("max-width: 1200px");
        expect(screen.getByTestId(footerTestId)).toHaveStyle("max-width: 1200px");
    });

    it("should render content and footer same the width with custom content size", () => {
        renderUtil({ contentSize: "medium" });
        const contentSize = screen.getByTestId(contentTestId).style.maxWidth;
        const footerSize = screen.getByTestId(footerTestId).style.maxWidth;

        expect(contentSize).toEqual(footerSize);
    });
});
