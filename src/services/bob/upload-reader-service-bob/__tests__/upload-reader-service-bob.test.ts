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

describe("UploadReaderServiceBob.uploadBrightcove", () => {
    let uploadReaderServiceBob: UploadReaderServiceBob;

    const createBrightCoveUploadUrl = jest.fn();
    const finishUploadBrightCove = jest.fn();

    const fakeVideos = [
        new File(
            [],
            "2114002010_中1理科_いろいろな生物とその共通点_身のまわりの生物の観察_4月.mp4"
        ),
        new File([], "video.mp4"),
    ];

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
        const resq = await uploadReaderServiceBob.uploadBrightcove(fakeVideos);

        expect(resq).toEqual(["123", "123"]);
    });
});
