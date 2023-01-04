import grpcWeb from "grpc-web";

import { UploadRequest, UploadResponse } from "manabie-bob/upload_pb";

declare module "grpc-web" {
    // the code of MethodType did exist but dont have in .d.ts file
    export enum MethodType {
        UNARY = "unary",
        SERVER_STREAMING = "server_streaming",
    }
}

export const uploadDescriptor = new grpcWeb.MethodDescriptor(
    "/manabie.bob.UploadService/Upload",
    grpcWeb.MethodType.UNARY,
    UploadRequest,
    UploadResponse,
    // grpc dont provide request signature
    function (request: any) {
        return request.serializeBinary();
    },
    UploadResponse.deserializeBinary
);
