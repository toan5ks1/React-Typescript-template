import { TestThemeProvider } from "src/squads/lesson/test-utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import LessonUpsertFooter, {
    LessonUpsertFooterProps,
} from "src/squads/lesson/pages/LessonManagement/LessonUpsert/LessonUpsertFooter";

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("<LessonUpsertFooter /> component when Publish Lesson is enabled", () => {
    const props: LessonUpsertFooterProps = {
        onCancel: jest.fn(),
        onSaveDraft: jest.fn(),
        onPublish: jest.fn(),
        actionButtonBehavior: {
            disableSaveDraft: false,
            disablePublish: false,
            displaySaveDraftButton: true,
        },
        setIsSavingDraftLesson: jest.fn(),
    };

    const renderComponent = (overrideProps: Partial<LessonUpsertFooterProps> = {}) => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
        render(
            <TranslationProvider>
                <TestThemeProvider>
                    <LessonUpsertFooter {...props} {...overrideProps} />
                </TestThemeProvider>
            </TranslationProvider>
        );

        const buttonCancel = screen.getByTestId("LessonUpsertFooter__buttonCancel");

        const buttonSaveDraft = screen.getByTestId("LessonUpsertFooter__buttonSaveDraft");

        const buttonPublish = screen.getByTestId("LessonUpsertFooter__buttonPublish");

        return { buttonCancel, buttonSaveDraft, buttonPublish };
    };

    it("should enable buttons", () => {
        const { buttonCancel, buttonSaveDraft, buttonPublish } = renderComponent();

        expect(buttonCancel).toBeEnabled();
        expect(buttonSaveDraft).toBeEnabled();
        expect(buttonPublish).toBeEnabled();

        userEvent.click(buttonCancel);
        expect(props.onCancel).toBeCalled();

        userEvent.click(buttonSaveDraft);
        expect(props.onSaveDraft).toBeCalled();

        userEvent.click(buttonPublish);
        expect(props.onPublish).toBeCalled();
    });

    it("should disable buttons", () => {
        const { buttonSaveDraft, buttonPublish } = renderComponent({
            actionButtonBehavior: {
                disableSaveDraft: true,
                disablePublish: true,
                displaySaveDraftButton: true,
            },
        });

        expect(buttonSaveDraft).toBeDisabled();
        expect(buttonPublish).toBeDisabled();
    });

    it("should render Publish button correctly", () => {
        const { buttonPublish } = renderComponent();
        expect(buttonPublish).toHaveTextContent("Publish");
    });
});

describe("<LessonUpsertFooter /> component when Publish Lesson is enabled", () => {
    const props: LessonUpsertFooterProps = {
        onCancel: jest.fn(),
        onSaveDraft: jest.fn(),
        onPublish: jest.fn(),
        actionButtonBehavior: {
            disableSaveDraft: false,
            disablePublish: false,
            displaySaveDraftButton: true,
        },
        setIsSavingDraftLesson: jest.fn(),
    };

    it("should not render Save Draft button and render Save button instead of Publish", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });
        render(
            <TranslationProvider>
                <TestThemeProvider>
                    <LessonUpsertFooter {...props} />
                </TestThemeProvider>
            </TranslationProvider>
        );

        const buttonCancel = screen.getByTestId("LessonUpsertFooter__buttonCancel");

        const buttonSaveDraft = screen.queryByTestId("LessonUpsertFooter__buttonSaveDraft");

        const buttonSave = screen.getByTestId("LessonUpsertFooter__buttonPublish");

        expect(buttonCancel).toBeInTheDocument();
        expect(buttonSaveDraft).not.toBeInTheDocument();
        expect(buttonSave).toHaveTextContent("Save");
    });
});

describe("<LessonUpsertFooter /> component when displaySaveDraftButton is false", () => {
    const props: LessonUpsertFooterProps = {
        onCancel: jest.fn(),
        onSaveDraft: jest.fn(),
        onPublish: jest.fn(),
        actionButtonBehavior: {
            disableSaveDraft: false,
            disablePublish: false,
            displaySaveDraftButton: false,
        },
        setIsSavingDraftLesson: jest.fn(),
    };

    it("should not render Save Draft button and render Save button instead of Publish", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        render(
            <TranslationProvider>
                <TestThemeProvider>
                    <LessonUpsertFooter {...props} />
                </TestThemeProvider>
            </TranslationProvider>
        );

        const buttonCancel = screen.getByTestId("LessonUpsertFooter__buttonCancel");

        const buttonSaveDraft = screen.queryByTestId("LessonUpsertFooter__buttonSaveDraft");

        const buttonSave = screen.getByTestId("LessonUpsertFooter__buttonPublish");

        expect(buttonCancel).toBeInTheDocument();
        expect(buttonSaveDraft).not.toBeInTheDocument();
        expect(buttonSave).toHaveTextContent("Save");
    });
});
