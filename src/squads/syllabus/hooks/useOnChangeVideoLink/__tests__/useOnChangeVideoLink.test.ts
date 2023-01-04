import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import { BrightcoveVideoInfo } from "src/squads/syllabus/models/brightcove";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { inferStandaloneQuery } from "src/squads/syllabus/services/infer-query";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import { MediaType } from "manabie-bob/enum_pb";
import { GetBrightCoveVideoInfoResponse } from "manabuf/yasuo/v1/brightcove_pb";

import useOnChangeVideoLink from "../useOnChangeVideoLink";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/internals/logger");

const createMockDataGetBrightCoveVideoInfoResponse =
    (): GetBrightCoveVideoInfoResponse.AsObject => ({
        id: "VIDEO_ID",
        name: "Video name",
        thumbnail: "thumbnail",
        offlineEnabled: false,
    });

const renderUtil = (parameters: Parameters<typeof useOnChangeVideoLink>) => {
    return renderHook(() => useOnChangeVideoLink(...parameters), {
        wrapper: TestQueryWrapper,
    });
};

describe(useOnChangeVideoLink.name, () => {
    const exampleInfo: BrightcoveVideoInfo = { videoId: "My video", accountId: "My account" };

    it("shouldn't call onChange and catch error block when upload an empty array data", async () => {
        const onChangeFn = jest.fn();
        const notifyFn = jest.fn();

        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));

        const { result } = renderUtil([onChangeFn, notifyFn]);

        await result.current([]);

        expect(onChangeFn).not.toBeCalled();
        expect(logger.warn).not.toBeCalled();
        expect(notifyFn).not.toBeCalled();
    });

    it("shouldn't call onChange and catch error block when query brighcove video return notfound", async () => {
        const mutateAsyncFn = jest.fn();
        const queryFn = jest.fn();
        (inferStandaloneQuery as jest.Mock).mockReturnValue(queryFn);

        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: mutateAsyncFn,
        }));
        const onChangeFn = jest.fn();
        const notifyFn = jest.fn();

        queryFn.mockReturnValue(undefined);

        const { result } = renderUtil([onChangeFn, notifyFn]);

        await result.current([exampleInfo]);

        expect(queryFn).toBeCalledWith(exampleInfo);

        expect(mutateAsyncFn).not.toBeCalled();
        expect(onChangeFn).not.toBeCalled();
        expect(logger.warn).not.toBeCalled();
        expect(notifyFn).not.toBeCalled();
    });

    it("should call onChange with correctly params after insert media successfully", async () => {
        const mutateAsyncFn = jest.fn();
        const queryFn = jest.fn();

        (inferStandaloneQuery as jest.Mock).mockReturnValue(queryFn);

        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: mutateAsyncFn,
        }));
        const onChangeFn = jest.fn();
        const notifyFn = jest.fn();

        const videoInfo = createMockDataGetBrightCoveVideoInfoResponse();

        queryFn.mockReturnValue(videoInfo);

        const mediaId = "Media_ID";

        mutateAsyncFn.mockReturnValue({
            mediaIdsList: [mediaId],
        });

        const { result } = renderUtil([onChangeFn, notifyFn]);

        await result.current([exampleInfo]);

        expect(queryFn).toBeCalledWith(exampleInfo);

        expect(mutateAsyncFn).toBeCalledWith([
            {
                name: videoInfo.name,
                resource: exampleInfo.videoId,
                type: MediaType.MEDIA_TYPE_VIDEO,
            },
        ]);
        expect(onChangeFn).toBeCalledWith({
            media_id: mediaId,
            name: videoInfo.name,
            resource: exampleInfo.videoId,
            type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
        });

        expect(logger.warn).not.toBeCalled();
    });
});
