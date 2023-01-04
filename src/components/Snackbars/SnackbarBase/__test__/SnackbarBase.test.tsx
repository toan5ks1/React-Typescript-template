import { sleep } from "src/common/utils/tests";

import SnackbarBase from "../SnackbarBase";

import { render } from "@testing-library/react";

describe("<SnackbarBase />", () => {
    it("should render message", () => {
        const message = "Test";
        const { getByText } = render(<SnackbarBase open={true} message={message} />);

        expect(getByText(message)).toBeInTheDocument();
    });

    it("should call onClose after autoHideDuration", async () => {
        const autoHideDuration = 500;
        const onClose = jest.fn();

        render(<SnackbarBase open={true} onClose={onClose} autoHideDuration={autoHideDuration} />);

        expect(onClose).not.toHaveBeenCalled();
        await sleep(autoHideDuration);
        expect(onClose).toHaveBeenCalled();
    });
});
