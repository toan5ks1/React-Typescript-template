import BlockUnOrderList from "../BlockUnOrderList";
import { BlockControlProps, OmitCreateProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const label: string = "UnOrder list";
const blockType: string = "unordered-list-item";
const onClick = jest.fn();

const renderUtil = (props: OmitCreateProps<BlockControlProps>) =>
    render(<BlockUnOrderList {...props} />, { wrapper: TestCommonAppProvider });

describe(BlockUnOrderList.name, () => {
    it("should render unorder list button", () => {
        renderUtil({ blockType, onClick });

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });

    it("should trigger onClick handler once clicked on unorder list button", () => {
        renderUtil({ blockType, onClick });
        fireEvent.click(screen.getByRole("button", { name: label }));

        expect(onClick).toBeCalled();
    });
});
