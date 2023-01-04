import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { CourseServicePromiseClient } from "manabie-yasuo/course_grpc_web_pb";
import { CreateBrightCoveUploadUrlResponse } from "manabie-yasuo/course_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";

import uploadMutationServiceBob, {
    coursesMutationServiceYasuo,
    newCreateBrightCoveUploadUrlReq,
    newFinishUploadBrightcoveReq,
} from "src/squads/lesson/service/bob/upload-service/upload.mutation";

jest.mock("src/internals/axios-client", () => {
    return {
        __esModule: true,
        axiosUpload: {
            put: jest.fn(),
        },
    };
});

jest.mock("manabie-yasuo/course_grpc_web_pb", () => {
    const actual = jest.requireActual("manabie-yasuo/course_grpc_web_pb");

    actual.CourseServicePromiseClient.prototype.finishUploadBrightCove = jest.fn();
    actual.CourseServicePromiseClient.prototype.createBrightCoveUploadUrl = jest.fn();
    return actual;
});

jest.mock("manabie-bob/class_grpc_web_pb", () => {
    const actual = jest.requireActual("manabie-bob/class_grpc_web_pb");

    actual.ClassPromiseClient.prototype.upsertMedia = jest.fn();
    return actual;
});

jest.mock("manabuf/bob/v1/uploads_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/uploads_grpc_web_pb");

    actual.UploadServicePromiseClient.prototype.generateResumableUploadURL = jest.fn();
    return actual;
});

describe("upload.mutation CourseServiceYasuo", () => {
    it("should uploadBrightcove success", async () => {
        const fakeReturnCreateBrightCove: CreateBrightCoveUploadUrlResponse.AsObject = {
            signedUrl: "url/fake",
            apiRequestUrl: "url/fake",
            videoId: "Video_Id",
        };

        (CourseServicePromiseClient.prototype.finishUploadBrightCove as jest.Mock).mockReturnValue(
            {}
        );

        (
            CourseServicePromiseClient.prototype.createBrightCoveUploadUrl as jest.Mock
        ).mockReturnValue({
            toObject: () => fakeReturnCreateBrightCove,
        });

        const _callSpy = jest.spyOn(coursesMutationServiceYasuo, "_call");

        const videos: File[] = [new File([], "20211129A.pdf")];

        await coursesMutationServiceYasuo.uploadBrightcove(videos);

        const [firstCall, secondCall] = _callSpy.mock.calls;

        expect(firstCall[0]).toEqual("createBrightCoveUploadUrl");
        expect(secondCall[0]).toContain("finishUploadBrightCove");

        expect(CourseServicePromiseClient.prototype.createBrightCoveUploadUrl).toBeCalledWith(
            newCreateBrightCoveUploadUrlReq(videos[0].name)
        );

        expect(CourseServicePromiseClient.prototype.finishUploadBrightCove).toBeCalledWith(
            newFinishUploadBrightcoveReq({ ...fakeReturnCreateBrightCove })
        );
    });
});

describe("upload.mutation UploadServiceBob", () => {
    it("should filterAndUploadFiles success", async () => {
        (ClassPromiseClient.prototype.upsertMedia as jest.Mock).mockReturnValue({
            toObject: () => {
                return { mediaIdsList: ["Media_Id_1"] };
            },
        });

        (
            UploadServicePromiseClient.prototype.generateResumableUploadURL as jest.Mock
        ).mockReturnValue({
            toObject: () => {
                return {
                    resumableUploadUrl: "url/fake",
                    fileName: "fileName",
                    downloadUrl: "url/fake",
                };
            },
            getResumableUploadUrl: () => "string",
        });

        const _callSpy = jest.spyOn(uploadMutationServiceBob, "_call");

        const videos: File[] = [new File([], "20211129A.pdf")];

        const response = await uploadMutationServiceBob.filterAndUploadFiles(videos);

        const [firstCall] = _callSpy.mock.calls;

        expect(firstCall[0]).toEqual("generateResumableUploadURL");

        expect(response).toEqual({
            data: {
                attachments: [{ name: "20211129A.pdf", resource: "url/fake", type: 0 }],
                mediaIds: ["Media_Id_1"],
            },
        });
    });
});
