import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";
import { mockMedias } from "src/squads/syllabus/test-utils/live-lesson";

import ListMediaFromMediaIds, { ListMediaFromMediaIdsProps } from "../ListMediaFromMediaIds";

import { fireEvent, render, screen } from "@testing-library/react";
import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/hooks/useDataProvider", () => {
    return jest.fn();
});

jest.mock("src/squads/syllabus/services/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useMediaList", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockDispatchReTryConvertFn = jest.fn();

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatchReTryConvertFn,
}));

interface SetupMockParams {
    isFetchingMediaList: boolean;
    mediaList: Media[] | null;
    isMutationSuccess?: boolean;
}

const mockShowSnackbarSuccessMessage = "Upload successfully";
const mockShowSnackbarErrorMessage = Error("Error");

const setupMocks = ({
    isFetchingMediaList,
    mediaList,
    isMutationSuccess = true,
}: SetupMockParams) => {
    const mockMutationFn = jest.fn(async (_, options?: UseMutationOptions<string, string>) => {
        if (isMutationSuccess) {
            await options?.onSuccess?.(mockShowSnackbarSuccessMessage, "success", undefined);
        } else {
            await options?.onError?.(mockShowSnackbarErrorMessage, "error", undefined);
        }
    });
    const mockShowSnackbarFn = jest.fn();
    (useMediaList as jest.Mock).mockImplementation(() => {
        return {
            isFetchingMediaList,
            mediaList,
            updateMedia: jest.fn(),
        };
    });
    (inferMutation as jest.Mock).mockImplementation(() => {
        return () => ({
            mutate: mockMutationFn,
            isLoading: false,
        });
    });
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbarFn);

    return {
        mockMutationFn,
        mockShowSnackbarFn,
    };
};

describe("<ListMediaFromMediaIds /> component renders data", () => {
    const props: ListMediaFromMediaIdsProps = {
        mediaIds: ["mediaId"],
        courseId: "courseId",
        lessonGroupId: "lessonGroupId",
        onDeleteMediaSuccessfully: jest.fn(),
        shouldConfirmDelete: true,
        requirePdfConversion: true,
    };

    it("should call mockMutationFn and show snackbar when click remove chip file description and remove success", () => {
        const { mockMutationFn, mockShowSnackbarFn } = setupMocks({
            isFetchingMediaList: false,
            mediaList: mockMedias,
        });

        render(
            <TestApp>
                <ListMediaFromMediaIds {...props} />
            </TestApp>
        );
        fireEvent.click(screen.getAllByTestId("ChipRemoveIcon__icon")[0]);
        const removeButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(removeButton);
        expect(mockMutationFn).toHaveBeenCalledWith(
            {
                courseId: "courseId",
                files: [],
                lessonGroupId: "lessonGroupId",
                mediaIds: ["02", "03", "04", "05", "06"],
            },
            { onError: expect.any(Function), onSuccess: expect.any(Function) }
        );
        expect(mockShowSnackbarFn).toHaveBeenCalled();
    });

    it("should call show snackbar when click remove chip file description and remove fail", () => {
        const { mockShowSnackbarFn } = setupMocks({
            isFetchingMediaList: false,
            mediaList: mockMedias,
            isMutationSuccess: false,
        });

        render(
            <TestApp>
                <ListMediaFromMediaIds {...props} />
            </TestApp>
        );
        fireEvent.click(screen.getAllByTestId("ChipRemoveIcon__icon")[0]);
        const removeButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(removeButton);
        expect(mockShowSnackbarFn).toHaveBeenCalled();
    });

    it("should retry convert file correctly and show snackbar when retry convert fail", () => {
        const { mockMutationFn, mockShowSnackbarFn } = setupMocks({
            isFetchingMediaList: false,
            mediaList: mockMedias,
            isMutationSuccess: false,
        });

        render(
            <TestApp>
                <ListMediaFromMediaIds {...props} />
            </TestApp>
        );
        const retryButton = screen.getByTestId("ChipFileDescriptionRetryConversion__root");
        expect(retryButton).toBeInTheDocument();

        fireEvent.click(retryButton);
        expect(mockDispatchReTryConvertFn).toBeCalled();
        expect(mockMutationFn).toHaveBeenCalledWith(
            {
                mediaList: [mockMedias[5]], // media have conversion task status is failed
            },
            { onError: expect.any(Function), onSuccess: expect.any(Function) }
        );
        expect(mockShowSnackbarFn).toHaveBeenCalled();
    });
});

describe("<ListMediaFromMediaIds /> component when fetching media list", () => {
    const props: ListMediaFromMediaIdsProps = {
        mediaIds: ["mediaId"],
        courseId: "courseId",
        lessonGroupId: "lessonGroupId",
        onDeleteMediaSuccessfully: jest.fn(),
        shouldConfirmDelete: true,
        requirePdfConversion: true,
    };

    it("should be show skeleton when fetching media list", () => {
        setupMocks({
            isFetchingMediaList: true,
            mediaList: null,
        });
        render(
            <TestApp>
                <ListMediaFromMediaIds {...props} />
            </TestApp>
        );
        const skeleton = screen.getByTestId("ListMediaFromMediaIds__skeleton");
        expect(skeleton).toBeInTheDocument();
    });
});

describe("<ListMediaFromMediaIds /> component when media list null", () => {
    const props: ListMediaFromMediaIdsProps = {
        mediaIds: ["mediaId"],
        courseId: "courseId",
        lessonGroupId: "lessonGroupId",
        onDeleteMediaSuccessfully: jest.fn(),
        shouldConfirmDelete: true,
        requirePdfConversion: true,
    };

    it("should not show ChipFileDescription when fetching media list", () => {
        setupMocks({
            isFetchingMediaList: false,
            mediaList: null,
        });
        render(
            <TestApp>
                <ListMediaFromMediaIds {...props} />
            </TestApp>
        );
        const chips = screen.queryByTestId("ChipFileDescription");
        expect(chips).toBeNull();
    });
});
