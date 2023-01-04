import {
    isValidBrightcoveLink,
    parseBrightcoveVideoInfos,
} from "src/squads/lesson/models/brightcove";
import { brightcoveSampleLinks } from "src/squads/lesson/test-utils/brightcove";

describe("brightcove", () => {
    describe("should validate brightcove link", () => {
        const { exampleAccountId, exampleVideoId, invalidBrightcoveURLs, validBrightcoveURLs } =
            brightcoveSampleLinks;

        it("isValidBrightcoveLink", () => {
            const allInvalid = invalidBrightcoveURLs.every((url) =>
                isValidBrightcoveLink(url, exampleAccountId)
            );
            expect(allInvalid).toEqual(false);

            const allValid = validBrightcoveURLs.every((url) =>
                isValidBrightcoveLink(url, exampleAccountId)
            );
            expect(allValid).toEqual(true);
        });

        it("parseBrightcoveVideoInfos", () => {
            const invalidInfos = invalidBrightcoveURLs.map((url) => parseBrightcoveVideoInfos(url));
            invalidInfos.forEach((videoInfos) => {
                expect(videoInfos).not.toContainEqual({
                    accountId: exampleAccountId,
                    videoId: exampleVideoId,
                });
            });

            const validInfos = validBrightcoveURLs.map((url) => parseBrightcoveVideoInfos(url));
            validInfos.forEach((videoInfos) => {
                expect(videoInfos).not.toContainEqual({
                    accountId: "",
                    videoId: "",
                });
            });
        });
    });
});
