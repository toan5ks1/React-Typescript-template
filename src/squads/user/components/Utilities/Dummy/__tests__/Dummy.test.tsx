import Dummy from "../Dummy";

import { render, screen } from "@testing-library/react";

describe("<Dummy />", function () {
    it("should render only when children exist", () => {
        const { container, rerender } = render(<Dummy />);

        expect(container.firstChild).toEqual(null);

        rerender(
            <Dummy>
                <div>hello</div>
            </Dummy>
        );
        expect(screen.getByText("hello")).toBeInTheDocument();
    });

    it("should pass record props to children", () => {
        const FakeComponent = (
            props: { record?: any } //fake component to test render content
        ) => <div>{JSON.stringify(props.record)}</div>;
        const record = {
            a: 1,
            b: 2,
        };

        render(
            <Dummy record={record}>
                <FakeComponent />
            </Dummy>
        );

        expect(screen.getByText(JSON.stringify(record))).toBeInTheDocument();
    });
});
