import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import LessonUploadDialog from "../LessonUploadDialog";

import { render, screen } from "@testing-library/react";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import { mediaList } from "src/squads/syllabus/hooks/useMediaList/__mocks__";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

jest.mock("src/squads/syllabus/hooks/useAttachMaterials", () => {
    return () => ({
        onAttachMaterials: jest.fn(),
    });
});

jest.mock("src/squads/syllabus/hooks/useResourceTranslate");

jest.mock("src/squads/syllabus/hooks/useTranslate");

jest.mock("src/squads/syllabus/hooks/useMediaList", () => jest.fn());

const renderUtil = () => {
    render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookForm>
                    <LessonUploadDialog
                        open
                        onClose={() => {}}
                        mediaIds={[]}
                        refetchLessonGroup={jest.fn()}
                        lessonGroupId="lessonGroupId"
                        courseId="courseId"
                    />
                </TestHookForm>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe(LessonUploadDialog.name, () => {
    it("should show loading when fetching media information", () => {
        (useMediaList as jest.Mock).mockReturnValue({
            isFetchingMediaList: true,
            mediaList: [],
        });
        renderUtil();

        expect(screen.getByTestId("LessonUploadDialog__loading")).toBeInTheDocument();
    });

    it("should disable save action when default list media is empty", () => {
        (useMediaList as jest.Mock).mockReturnValue({
            isFetchingMediaList: false,
            mediaList: [],
        });
        renderUtil();

        expect(screen.getByTestId("BaseDialogAction__ok")).toBeDisabled();
    });

    it("should render list media", () => {
        (useMediaList as jest.Mock).mockReturnValue({
            isFetchingMediaList: false,
            mediaList,
        });
        renderUtil();

        expect(screen.getAllByTestId("ChipFileDescription")).toHaveLength(mediaList.length);
    });
});
