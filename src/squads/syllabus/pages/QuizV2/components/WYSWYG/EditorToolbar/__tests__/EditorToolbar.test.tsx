import { EditorState } from "draft-js";

import ImageIcon from "@mui/icons-material/Image";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Controls } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG";

import { allToolbar, InlineBold, InlineItalic, InlineUnderline } from "../Controls";
import BlockFontSize from "../Controls/BlockFontSize";
import BlockUnOrderList from "../Controls/BlockUnOrderList";
import EditorToolbar, { ToolbarProps } from "../EditorToolbar";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const controls = allToolbar;
const inlineControls = { [Controls.INLINE]: [InlineBold, InlineItalic, InlineUnderline] };
const blockControls = { [Controls.BLOCK]: [BlockFontSize, BlockUnOrderList] };
const atomicControls = {
    [Controls.ATOMIC]: [
        {
            label: "audio",
            icon: VolumeUpIcon,
            accept: "audio/*",
            craftFn: jest.fn(),
        },
        {
            label: "image",
            icon: ImageIcon,
            accept: "image/*",
            craftFn: jest.fn(),
        },
    ],
};

const editorState = EditorState.createEmpty();
const onChange = jest.fn();
const childrenText: string = "children text";
const children = <div>{childrenText}</div>;

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockReturnValue({ onUploadFilesAsync: jest.fn() });
};

const renderUtil = (props: ToolbarProps) =>
    render(<EditorToolbar {...props} />, { wrapper: TestApp });

describe(EditorToolbar.name, () => {
    beforeEach(() => {
        mockUseUploadFiles();
    });

    it("should render nothing", () => {
        const { container } = renderUtil({ editorState, onChange });

        expect(container).toBeEmptyDOMElement();
    });

    it("should render children component", () => {
        renderUtil({ editorState, onChange, children, controls });

        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });

    it("should render list of inline, block and atomic control components in toolbar", () => {
        renderUtil({ editorState, onChange, children, controls });

        expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Heading" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "UnOrder list" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Audio" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Image" })).toBeInTheDocument();
    });

    it("should render inline control components", () => {
        renderUtil({
            editorState,
            onChange,
            children,
            controls: inlineControls,
        });

        expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
    });

    it("should render block control components", () => {
        renderUtil({
            editorState,
            onChange,
            children,
            controls: blockControls,
        });

        expect(screen.getByRole("button", { name: "Heading" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "UnOrder list" })).toBeInTheDocument();
    });

    it("should render atomic control components", () => {
        renderUtil({ editorState, onChange, children, controls: atomicControls });

        expect(screen.getByRole("button", { name: "Audio" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Image" })).toBeInTheDocument();
    });
});
