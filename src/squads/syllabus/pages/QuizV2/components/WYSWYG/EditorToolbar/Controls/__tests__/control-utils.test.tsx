import { createElement } from "react";

import { EditorState } from "draft-js";
import { Entities } from "src/common/constants/enum";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
    BlockControlProps,
    ControlButtonProps,
    InlineControlProps,
    OmitCreateProps,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/EditorToolbar/Controls";
import {
    createBlockToolbarButton,
    createInlineToolbarButton,
} from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/EditorToolbar/Controls/control-utils";

import { render, screen } from "@testing-library/react";

const editorState = EditorState.createEmpty();

const renderUtil = <T extends OmitCreateProps<ControlButtonProps>>(
    props: T,
    Component: (props: T) => JSX.Element
) => {
    return render(createElement(Component, props));
};

describe(createInlineToolbarButton.name, () => {
    it("should render inline button with correct label and icon", () => {
        const label: string = `resources.${Entities.QUIZZES}.bold`;
        const onClick = jest.fn();
        const InlineBold = createInlineToolbarButton({
            controlValue: "BOLD",
            label,
            icon: FormatBoldIcon,
        });

        renderUtil<OmitCreateProps<InlineControlProps>>({ editorState, onClick }, InlineBold);

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
        expect(screen.getByTestId("FormatBoldIcon")).toBeInTheDocument();
    });
});

describe(createBlockToolbarButton.name, () => {
    it("should render block button with correct label and icon", () => {
        const label: string = `resources.${Entities.QUIZZES}.ul`;
        const onClick = jest.fn();
        const blockType: string = "unordered-list-item";
        const BlockUnOrderList = createBlockToolbarButton({
            controlValue: "unordered-list-item",
            label,
            icon: FormatListBulletedIcon,
        });

        renderUtil<OmitCreateProps<BlockControlProps>>({ blockType, onClick }, BlockUnOrderList);

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
        expect(screen.getByTestId("FormatListBulletedIcon")).toBeInTheDocument();
    });
});
