import { TestApp } from "src/squads/communication/test-utils";
import { createMockNotificationMedia } from "src/squads/communication/test-utils/notification";

import MediaListUploadNotification, {
    MediaListUploadNotificationProps,
} from "src/squads/communication/pages/Notification/components/MediaListUploadNotification";

import { screen, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useMediaList from "src/squads/communication/hooks/useMediaList";

jest.mock("src/squads/communication/hooks/useMediaList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockOnDeleteMediaChip = jest.fn();
const mockOnUpload = jest.fn();

const defaultMediaListFormUploadNotificationProps: MediaListUploadNotificationProps = {
    mediaIds: [],
    isSubmittingForm: false,
    isUploading: false,
    onDeleteMediaChip: mockOnDeleteMediaChip,
    onUpload: mockOnUpload,
};

const mockCasesIsUploading = [false, true];

const mockMediaListUploadNotificationModules = (isFetchingMediaList: boolean = false) => {
    (useMediaList as jest.Mock).mockReturnValue({
        isFetchingMediaList,
        mediaList: createMockNotificationMedia(),
    });
};

const renderMediaListUploadNotification = (
    props: MediaListUploadNotificationProps = defaultMediaListFormUploadNotificationProps
): RenderResult => {
    return render(
        <TestApp>
            <MediaListUploadNotification {...props} />
        </TestApp>
    );
};

describe("<MediaListUploadNotification/>", () => {
    it("should match snapshot", () => {
        mockMediaListUploadNotificationModules();

        const { container } = renderMediaListUploadNotification();

        expect(container).toMatchSnapshot();
    });

    it("should render skeleton loading when fetching media list", () => {
        mockMediaListUploadNotificationModules(true);

        renderMediaListUploadNotification();

        expect(
            screen.queryByTestId("MediaListUploadNotification__buttonUpload")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("ListMediaChipsBase")).not.toBeInTheDocument();
        expect(screen.getByTestId("MediaListUploadNotification__skeleton")).toBeInTheDocument();
    });

    test.each(mockCasesIsUploading)(
        "should render button upload file when do not have mediaIds",
        (isUploading) => {
            mockMediaListUploadNotificationModules();

            renderMediaListUploadNotification({
                ...defaultMediaListFormUploadNotificationProps,
                isUploading,
            });

            expect(
                screen.getByTestId("MediaListUploadNotification__buttonUpload")
            ).toBeInTheDocument();
            expect(screen.queryByTestId("ListMediaChipsBase")).not.toBeInTheDocument();
            expect(
                screen.queryByTestId("MediaListUploadNotification__skeleton")
            ).not.toBeInTheDocument();

            expect(
                screen.getByTestId("MediaListUploadNotification__buttonUpload")
            ).toHaveTextContent(isUploading ? "Uploading..." : "Upload");
        }
    );

    it("should render media chip when have mediaIds", () => {
        mockMediaListUploadNotificationModules();

        renderMediaListUploadNotification({
            ...defaultMediaListFormUploadNotificationProps,
            mediaIds: ["media_id_1"],
        });

        expect(
            screen.queryByTestId("MediaListUploadNotification__buttonUpload")
        ).not.toBeInTheDocument();
        expect(screen.getByTestId("ListMediaChipsBase")).toBeInTheDocument();
        expect(
            screen.queryByTestId("MediaListUploadNotification__skeleton")
        ).not.toBeInTheDocument();
    });

    it("should call delete media chip function when click button delete", () => {
        mockMediaListUploadNotificationModules();

        renderMediaListUploadNotification({
            ...defaultMediaListFormUploadNotificationProps,
            mediaIds: ["media_id_1"],
        });

        expect(screen.getByTestId("ChipRemoveIcon__icon")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("ChipRemoveIcon__icon"));

        expect(mockOnDeleteMediaChip).toBeCalled();
    });

    it("should call upload file function when click button upload", () => {
        mockMediaListUploadNotificationModules();

        renderMediaListUploadNotification();

        expect(screen.getByTestId("MediaListUploadNotification__buttonUpload")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("MediaListUploadNotification__buttonUpload"));

        expect(mockOnUpload).toBeCalled();
    });
});
