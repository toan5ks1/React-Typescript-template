import { NsLesson_Bob_ClassesService } from "src/squads/lesson/service/bob/classes-service/types";
import { NsLesson_Bob_UploadService } from "src/squads/lesson/service/bob/upload-service/types";
import { uploadService } from "src/squads/lesson/service/bob/upload-service/upload-service";

import uploadMutationServiceBob from "src/squads/lesson/service/bob/upload-service/upload.mutation";

jest.mock("src/squads/lesson/service/bob/upload-service/upload.mutation", () => {
    return {
        __esModule: true,
        default: {
            filterAndUploadFiles: jest.fn(),
        },
    };
});

describe("class-service mutation", () => {
    const fakeUploadFilesReturn: {
        data: {
            attachments: NsLesson_Bob_ClassesService.UpsertMedia[];
            mediaIds: string[];
        };
    } = {
        data: {
            attachments: [{ name: "MATERIAL.pdf", resource: "url/fake", type: 0 }],
            mediaIds: ["Media_Id_01"],
        },
    };

    beforeEach(() => {
        (uploadMutationServiceBob.filterAndUploadFiles as jest.Mock).mockResolvedValue(
            fakeUploadFilesReturn
        );
    });
    it("should call filterAndUploadFiles success", async () => {
        const mutationVariable: NsLesson_Bob_UploadService.FilterUploadFiles[] = [
            new File([], "MATERIAL.pdf"),
        ];

        const response = await uploadService.mutation.uploadFilterAndUploadFiles(mutationVariable);

        expect(uploadMutationServiceBob.filterAndUploadFiles).toBeCalledWith(mutationVariable);
        expect(response).toEqual(fakeUploadFilesReturn);
    });

    it("should NOT call filterAndUploadFiles empty variable", async () => {
        const mutationVariable: NsLesson_Bob_UploadService.FilterUploadFiles[] = [];

        const response = await uploadService.mutation.uploadFilterAndUploadFiles(mutationVariable);

        expect(uploadMutationServiceBob.filterAndUploadFiles).not.toBeCalled();
        expect(response).toEqual({ data: { attachments: [], mediaIds: [] } });
    });
});
