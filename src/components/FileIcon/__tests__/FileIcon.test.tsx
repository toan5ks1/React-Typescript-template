import FileIcon from "../FileIcon";

import { render, screen } from "@testing-library/react";

describe("<FileIcon />", () => {
    it("should match snapshot", () => {
        const { container } = render(<FileIcon type={undefined} />);
        expect(container).toMatchSnapshot();
    });

    it("should render default when undefined", () => {
        render(<FileIcon type={undefined} />);
        expect(screen.getByTestId("FileIcon__file")).toBeInTheDocument();
    });
});
