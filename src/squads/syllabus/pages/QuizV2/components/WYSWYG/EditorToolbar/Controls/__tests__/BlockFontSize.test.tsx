import { OmitCreateProps } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import BlockFontSize from "../BlockFontSize";
import { BlockControlProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const label: string = "Heading";
const headingTitle: string = "abc";
const onClick = jest.fn();
const blockType: string = "header-two";

const renderUtil = (props: OmitCreateProps<BlockControlProps>) =>
    render(<BlockFontSize {...props} />, { wrapper: TestCommonAppProvider });

describe(BlockFontSize.name, () => {
    it("should render heading button", () => {
        renderUtil({ blockType, onClick });

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });

    it("should render heading list once clicked on the heading button", () => {
        renderUtil({ blockType, onClick });
        fireEvent.click(screen.getByRole("button", { name: label }));

        expect(screen.getAllByRole("heading", { name: headingTitle })).toHaveLength(5);
    });

    it("should trigger onClick handler once clicked on the heading item", () => {
        renderUtil({ blockType, onClick });
        fireEvent.click(screen.getByRole("button", { name: label }));
        fireEvent.click(screen.getAllByRole("heading", { name: headingTitle })[0]);

        expect(onClick).toBeCalled();
    });
});
