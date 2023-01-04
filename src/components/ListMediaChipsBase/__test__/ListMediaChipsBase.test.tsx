import { TestApp } from "src/test-utils";
import { mockMedias } from "src/test-utils/live-lesson";

import ListMediaChipsBase, { ListMediaChipsBaseProps } from "../ListMediaChipsBase";

import { render } from "@testing-library/react";

describe("<ListMediaChipsBase /> component renders data", () => {
    it("should match snapshot", () => {
        const props: ListMediaChipsBaseProps = {
            onDelete: jest.fn(),
            shouldConfirmDelete: true,
            medias: mockMedias,
        };

        const { container } = render(
            <TestApp>
                <ListMediaChipsBase {...props} />
            </TestApp>
        );

        expect(container).toMatchSnapshot();
    });
});
