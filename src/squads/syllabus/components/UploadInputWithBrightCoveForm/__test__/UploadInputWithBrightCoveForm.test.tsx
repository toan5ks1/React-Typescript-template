import { PropsWithChildren } from "react";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import UploadInputWithBrightCoveForm, {
    UploadInputWithBrightCoveFormProps,
} from "../UploadInputWithBrightCoveForm";

import { render, RenderResult, screen } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
})).mock("src/squads/syllabus/hooks/useBrightcoveProfileData", () => ({
    __esModule: true,
    default: () => ({ accountId: "" }),
}));

const defaultProps: UploadInputWithBrightCoveFormProps = {
    onChange: jest.fn(),
};

describe("<UploadInputWithBrightCoveForm />", () => {
    const uploadInputTestId: string = "UploadInput";
    const uploadInputDesTestId: string = "UploadInput__description";
    const uploadBrightcoveTestId: string = "BrightCoveUpload";
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<UploadInputWithBrightCoveForm {...defaultProps} />, {
            wrapper: ({ children }: PropsWithChildren<{}>) => (
                <TestAppWithQueryClient>
                    <TestThemeProvider>
                        <CommonTranslationProvider>{children}</CommonTranslationProvider>
                    </TestThemeProvider>
                </TestAppWithQueryClient>
            ),
        });
    });

    it("should match snapshot", async () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId(uploadInputTestId)).toBeInTheDocument();
        expect(screen.getByTestId(uploadInputDesTestId).textContent).toEqual(
            "Max file size is: 1GB"
        );
        expect(screen.getByTestId(uploadBrightcoveTestId)).toBeInTheDocument();
    });
});
