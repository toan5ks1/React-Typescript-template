import { createFile } from "src/squads/syllabus/test-utils/file";

import { filterUploadFiles } from "../file";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

describe("filterUploadFiles", () => {
    //TODO: @syllabus fix Media type
    it("should return correct", () => {
        const files: Media[] = [
            //@ts-ignore
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
            //@ts-ignore
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
