import { mediaServiceBob } from "src/squads/syllabus/services/bob/media-service-bob";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/syllabus/services/bob/upload-reader-service-bob", () => {
    return {
        __esModule: true,
        uploadServiceClientBob: {
            generateResumableUploadURL: () => {
                return [{ gRPC: { downloadUrl: "download_url" } }];
            },
        },
    };
});

describe("media service mutation", () => {
    it("upload media test", async () => {
        const fakeFiles = [new File([], "FileName.png")];

        const result = await mediaServiceBob.uploadMedia(fakeFiles);

        expect(result).toEqual([{ gRPC: { downloadUrl: "download_url" } }]);
    });
});
