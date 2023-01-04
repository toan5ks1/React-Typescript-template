import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { GetBrightCoveVideoInfoResponse } from "manabuf/yasuo/v1/brightcove_pb";

import AttachmentSection, { AttachmentSectionProps } from "../AttachmentSection";

import { render, screen } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useBrightcoveProfileData");

const baseProps: AttachmentSectionProps = {
    isLoadingFile: true,
    onChangeAttachment: () => {},
    studyGuide: "studyGuide",
    videoId: "videoId_01",
};

describe(AttachmentSection.name, () => {
    it("should render video information", () => {
        const videoName: string = "This is a video";
        const mockReturnQueryVideoInfo: Partial<
            UseQueryBaseV2Return<GetBrightCoveVideoInfoResponse.AsObject>
        > = {
            data: {
                id: "video_id",
                name: videoName,
                thumbnail: "video_thumbnail",
                offlineEnabled: false,
            },
        };
        (inferQuery as jest.Mock).mockImplementation(() => () => mockReturnQueryVideoInfo);

        render(
            <TestAppWithQueryClient>
                <AttachmentSection {...baseProps} />
            </TestAppWithQueryClient>
        );

        expect(screen.getByTestId("ChipFileDescription")).toHaveTextContent(videoName);
    });

    it("should render an error message when get video information is not success", () => {
        const error: Error = new Error("Video does not existed");
        const mockReturnQueryVideoInfo: Partial<
            UseQueryBaseV2Return<GetBrightCoveVideoInfoResponse.AsObject>
        > = {
            error,
        };
        (inferQuery as jest.Mock).mockImplementation(() => () => mockReturnQueryVideoInfo);

        render(
            <TestAppWithQueryClient>
                <AttachmentSection {...baseProps} />
            </TestAppWithQueryClient>
        );

        expect(screen.queryByTestId("ChipFileDescription")).not.toBeInTheDocument();

        expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it("should render loading when fetching video information", () => {
        const mockReturnQueryVideoInfo: Partial<
            UseQueryBaseV2Return<GetBrightCoveVideoInfoResponse.AsObject>
        > = {
            isFetching: true,
        };
        (inferQuery as jest.Mock).mockImplementation(() => () => mockReturnQueryVideoInfo);

        render(
            <TestAppWithQueryClient>
                <AttachmentSection {...baseProps} />
            </TestAppWithQueryClient>
        );

        expect(screen.queryByTestId("ChipFileDescription")).not.toBeInTheDocument();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});
