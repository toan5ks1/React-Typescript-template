import axios from "axios";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { CourseServicePromiseClient } from "manabie-yasuo/course_grpc_web_pb";
import {
    CreateBrightCoveUploadUrlRequest,
    CreateBrightCoveUploadUrlResponse,
} from "manabie-yasuo/course_pb";
import { FinishUploadBrightCoveResponse } from "manabuf/bob/v1/media_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";

import {
    ClassServiceClientBob,
    CourseServiceClientYasuo,
    UploadReaderServiceBob,
    UploadServiceClientBob,
} from "../upload-reader-service-bob";

jest.mock("manabuf/bob/v1/uploads_grpc_web_pb")
    .mock("manabie-bob/class_grpc_web_pb", () => ({ ClassPromiseClient: jest.fn() }))
    .mock("manabie-yasuo/course_grpc_web_pb", () => ({ CourseServicePromiseClient: jest.fn() }));

jest.mock("axios");

jest.mock("src/internals/feature-controller");

// TODO: Refactor this test
describe("UploadReaderServiceBob.uploadBrightcove", () => {
    let uploadReaderServiceBob: UploadReaderServiceBob;
    const fakeVideos = [new File([], "cartoon.mp4"), new File([], "racingBoy.mp4")];

    const createBrightCoveUploadUrl = jest.fn();
    const finishUploadBrightCove = jest.fn();

    beforeEach(() => {
        (createBrightCoveUploadUrl as jest.Mock).mockImplementation(
            (req: CreateBrightCoveUploadUrlRequest) => {
                const { name } = req.toObject();
                const resp = new CreateBrightCoveUploadUrlResponse();

                resp.setSignedUrl(name);
                resp.setVideoId("123");

                return resp;
            }
        );

        (finishUploadBrightCove as jest.Mock).mockReturnValue(new FinishUploadBrightCoveResponse());

        (CourseServicePromiseClient as jest.Mock).mockReturnValue({
            createBrightCoveUploadUrl,
            finishUploadBrightCove,
        });

        const uploadServiceClientBobMock = new UploadServiceClientBob(
            UploadServicePromiseClient,
            appConfigs,
            commonGrpcOptions
        );

        const classServiceClientBobMock = new ClassServiceClientBob(
            ClassPromiseClient,
            appConfigs,
            commonGrpcOptions
        );

        const courseServiceClientYasuoMock = new CourseServiceClientYasuo(
            CourseServicePromiseClient,
            appConfigs,
            commonGrpcOptions
        );

        uploadReaderServiceBob = new UploadReaderServiceBob(
            uploadServiceClientBobMock,
            classServiceClientBobMock,
            courseServiceClientYasuoMock
        );
    });

    it("should call CourseServicePromiseClient.createBrightCoveUploadUrl for each video with correct parameters", async () => {
        const firstReq = new CreateBrightCoveUploadUrlRequest();
        const secondReq = new CreateBrightCoveUploadUrlRequest();

        firstReq.setName(fakeVideos[0].name);
        secondReq.setName(fakeVideos[1].name);

        jest.spyOn(axios, "put").mockResolvedValue({ data: "" });

        await uploadReaderServiceBob.uploadBrightcove(fakeVideos);

        expect(createBrightCoveUploadUrl).toHaveBeenCalledTimes(fakeVideos.length);
        expect(createBrightCoveUploadUrl).toHaveBeenCalledWith(firstReq);
        expect(createBrightCoveUploadUrl).toHaveBeenCalledWith(secondReq);
    });

    it("should call CourseServicePromiseClient.finishUploadBrightCove for each video", async () => {
        await uploadReaderServiceBob.uploadBrightcove(fakeVideos);
        expect(finishUploadBrightCove).toHaveBeenCalledTimes(fakeVideos.length);
    });

    it("should return correct results", async () => {
        const response = await uploadReaderServiceBob.uploadBrightcove(fakeVideos);

        expect(response).toEqual([
            {
                apiRequestUrl: "",
                signedUrl: "cartoon.mp4",
                videoId: "123",
            },
            {
                apiRequestUrl: "",
                signedUrl: "racingBoy.mp4",
                videoId: "123",
            },
        ]);
    });
});
