import { Media } from "src/squads/lesson/common/types";
import {
    filterUploadFiles,
    getFileExtension,
    getFileNameWithoutExtension,
} from "src/squads/lesson/service/utils/utils";
import { createFile } from "src/squads/lesson/test-utils/file";

describe(getFileExtension.name, () => {
    it("should return correct file extension", () => {
        expect(getFileExtension("image.png")).toEqual("png");
    });

    it("should return empty", () => {
        expect(getFileExtension("")).toEqual("");
    });
});

describe(getFileNameWithoutExtension.name, () => {
    it("should return correct file extension", () => {
        expect(getFileNameWithoutExtension("image.png")).toEqual("image");
    });

    it("should return file name when dont have extension", () => {
        expect(getFileNameWithoutExtension("image")).toEqual("image");
        expect(getFileNameWithoutExtension("image.")).toEqual("image");
    });
    it("should return empty", () => {
        expect(getFileNameWithoutExtension("")).toEqual("");
    });
});

//TODO: @lesson fix Media type
describe(filterUploadFiles.name, () => {
    it("should return correct", () => {
        const files: Media[] = [
            // @ts-ignore
            {
                type: "MEDIA_TYPE_IMAGE",
                media_id: "01",
                name: "Name",
                resource: "",
                conversion_tasks: [],
                created_at: "",
                updated_at: "",
                conversion_tasks_aggregate: { nodes: [] },
            },
            // @ts-ignore
            {
                type: "MEDIA_TYPE_IMAGE",
                media_id: "02",
                name: "Name",
                resource: "Resource",
                conversion_tasks: [],
                created_at: "",
                updated_at: "",
                conversion_tasks_aggregate: { nodes: [] },
            },
        ];
        const fakeFile = createFile("newFile");
        const mediaExpect = [files[0].media_id, files[1].media_id];
        const fileStoragesExpect: File[] = [fakeFile];
        const { alreadyUploadedMediaIds, filesNeedToBeUploaded } = filterUploadFiles([
            ...files,
            fakeFile,
        ]);

        expect(alreadyUploadedMediaIds).toMatchObject(mediaExpect);
        expect(filesNeedToBeUploaded).toMatchObject(fileStoragesExpect);
    });
});
