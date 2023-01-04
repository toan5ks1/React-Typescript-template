import FormUploadBrightCove, { FormUploadBrightCoveProps } from "../FormUploadBrightCove";

import { fireEvent, render, screen } from "@testing-library/react";

describe("<FormUploadBrightCove /> ", () => {
    const props: FormUploadBrightCoveProps = {
        onChange: jest.fn(),
    };

    beforeEach(() => {
        render(<FormUploadBrightCove data-testid="FormUploadBrightCove__root" {...props} />);
    });

    it("handle onChange input invalid", () => {
        const textField = screen.getByTestId("FormUploadBrightCove__input");

        fireEvent.change(textField as HTMLInputElement, {
            target: { value: "Test TextField" },
        });

        expect(screen.getByTestId("FormUploadBrightCove__root")).toMatchSnapshot();
    });

    it("handle onClick button upload", () => {
        const textField = screen.getByTestId("FormUploadBrightCove__input");

        fireEvent.change(textField as HTMLInputElement, {
            target: {
                value: "https://players.brightcove.net/6064018595001/default_default/index.html?videoId=6095153686001Test TextField",
            },
        });

        const button = screen.getByTestId("FormUploadBrightCove__button");

        fireEvent.click(button);

        expect(screen.getByTestId("FormUploadBrightCove__root")).toMatchSnapshot();
    });

    it("should match snapshot default", () => {
        expect(screen.getByTestId("FormUploadBrightCove__root")).toMatchSnapshot();
    });
});
