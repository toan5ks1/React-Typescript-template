import { UploadState } from "src/common/constants/enum";

import UploadingState, { UploadingStateProps } from "../UploadingState";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe("<UploadingState /> loading", () => {
    const props: UploadingStateProps = {
        state: UploadState.LOADING,
        onDelete: () => {},
        onRetry: () => {},
    };
    beforeEach(() => {
        render(<UploadingState {...props} />, { wrapper: TestApp });
    });

    it("should render correct UI on loading state", () => {
        expect(screen.queryByTestId("UploadingState__loadingText")).toBeInTheDocument();
        expect(screen.getByTestId("UploadingState__loadingText").textContent).toEqual(
            "Uploading..."
        );
        expect(screen.queryByTestId("UploadingState__linearProgress")).toBeInTheDocument();
        expect(screen.queryByTestId("UploadingState__deleteIcon")).toBeInTheDocument();
    });
});

describe("<UploadingState /> failed", () => {
    const props: UploadingStateProps = {
        state: UploadState.FAILED,
        onDelete: () => {},
        onRetry: () => {},
        files: [{ name: "TEST NAME" } as File],
    };
    beforeEach(() => {
        render(<UploadingState {...props} />, { wrapper: TestApp });
    });

    it("should render correct UI on loading state", () => {
        expect(screen.queryByTestId("UploadingState__failedText")).toBeInTheDocument();
        expect(screen.getByTestId("UploadingState__failedText").textContent).toEqual(
            "Upload failed"
        );
        expect(screen.queryByTestId("UploadingState__retryIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("UploadingState__filename")).toBeInTheDocument();
    });
});
