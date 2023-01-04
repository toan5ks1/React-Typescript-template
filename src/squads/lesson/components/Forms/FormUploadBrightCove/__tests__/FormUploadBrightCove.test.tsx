import FormUploadBrightCove, {
    FormUploadBrightCoveProps,
} from "src/squads/lesson/components/Forms/FormUploadBrightCove";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBrightcoveProfileData from "src/hooks/useBrightcoveProfileData";

jest.mock("src/hooks/useBrightcoveProfileData", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("<FormUploadBrightCove /> ", () => {
    const props: FormUploadBrightCoveProps = {
        onChange: jest.fn(),
    };

    beforeEach(() => {
        (useBrightcoveProfileData as jest.Mock).mockImplementation(() => ({
            accountId: "1234567654321",
        }));

        render(
            <TranslationProvider>
                <FormUploadBrightCove {...props} />
            </TranslationProvider>
        );
    });

    it("should show error message when uploading invalid brightcove link", async () => {
        const textField = screen.getByTestId("FormUploadBrightCove__input");

        userEvent.type(textField, "https://invalid.brightcove.link");
        expect(
            screen.getByText("Video link is not supported, please try another link!")
        ).toBeInTheDocument();
    });

    it("should upload material with valid brightcove link", () => {
        const textField = screen.getByTestId("FormUploadBrightCove__input");

        userEvent.type(
            textField,
            "https://players.brightcove.net/1234567654321/default_default/index.html?videoId=1234567654321"
        );

        const uploadButton = screen.getByRole("button", { name: /upload/i });
        expect(uploadButton).toBeEnabled();

        userEvent.click(uploadButton);

        expect(props.onChange).toBeCalledWith([
            { accountId: "1234567654321", videoId: "1234567654321" },
        ]);
        expect(textField).toHaveValue("");
    });
});
