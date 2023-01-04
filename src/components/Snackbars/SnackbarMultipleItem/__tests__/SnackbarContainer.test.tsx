import SnackbarContainer from "../SnackbarContainer";

import { render } from "@testing-library/react";

describe("<SnackbarContainer/>", () => {
    const TestComponent = () => {
        return <SnackbarContainer>Test</SnackbarContainer>;
    };

    const renderComponent = () => {
        return render(<TestComponent />);
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
