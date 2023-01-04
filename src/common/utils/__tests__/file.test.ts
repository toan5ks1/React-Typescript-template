import { VideoType, MIMETypes, AudioType } from "src/common/constants/enum";
import { createFile, fileReaderMock, generateFiles, GeneratorFile } from "src/test-utils/file";

import { MediaType } from "manabie-bob/enum_pb";

import {
    getFileSize,
    fileMatchSize,
    filterFiles,
    filterUploadFiles,
    ValidateTypeSchema,
    isVideo,
    getFileNameWithoutExtension,
    getFileExtension,
    toBase64,
    fileToPayload,
    groupBy,
    convertByte,
    findMediaType,
} from "../file";

import type { Media } from "src/__generated__/root-types";

describe(findMediaType.name, () => {
    it("should return correct media type", async () => {
        expect(findMediaType("image/png")).toEqual(MediaType.MEDIA_TYPE_IMAGE);
        expect(findMediaType("application/pdf")).toEqual(MediaType.MEDIA_TYPE_PDF);
        expect(findMediaType("video/mp4")).toEqual(MediaType.MEDIA_TYPE_VIDEO);
        expect(findMediaType("audio/*")).toEqual(MediaType.MEDIA_TYPE_AUDIO);
        expect(findMediaType("invalid")).toEqual(MediaType.MEDIA_TYPE_NONE);
    });
});

describe(convertByte.name, () => {
    it("should byte to unit format", async () => {
        expect(convertByte()).toEqual({ size: 0, unit: "" });
        expect(convertByte(10000000)).toEqual({ size: 10, unit: "MB" });
        expect(convertByte(1000000000)).toEqual({ size: 1, unit: "GB" });
    });
});

describe(groupBy.name, () => {
    it("should convert file to payload", async () => {
        const pdf = createFile("pdf", {
            type: "application/pdf",
        });
        const video = createFile("video", {
            type: "video/mp4",
        });
        const result = groupBy({ files: [pdf, video] });

        expect(Object.keys(result)).toMatchObject(["others", "videos"]);
        expect(result.others).toMatchObject([pdf]);
        expect(result.videos).toMatchObject([video]);
    });
});

describe(fileToPayload.name, () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should convert file to payload", async () => {
        const fakeFile = createFile("fileName", {
            type: "application/pdf",
        });

        Object.defineProperty(fileReaderMock, "onload", {
            get() {
                return this._onload;
            },
            set(onload) {
                this._onload = onload;
            },
        });

        jest.spyOn(window, "FileReader").mockImplementation(() => fileReaderMock);

        const pending = fileToPayload(fakeFile);
        expect(fileReaderMock.readAsDataURL).toBeCalledWith(fakeFile);

        fileReaderMock.result = "data:image/png;base64,this is result";
        fileReaderMock.onload();

        const actual = await pending;

        expect(actual).toEqual("this is result");
    });
});

describe(toBase64.name, () => {
    it("should return correct file extension", () => {
        // expect(toBase64("image.png")).toEqual("image");
    });
});

describe(convertByte.name, () => {
    it("should return correct file extension", () => {
        // expect(convertByte("image.png")).toEqual("image");
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

describe(getFileExtension.name, () => {
    it("should return correct file extension", () => {
        expect(getFileExtension("image.png")).toEqual("png");
    });

    it("should return empty", () => {
        expect(getFileExtension("")).toEqual("");
    });
});

describe("getFileSize", () => {
    it("should return correct file size", () => {
        const fileSize: number = 100;
        const file = {
            size: fileSize,
        };
        const values = getFileSize(file as File);
        expect(values).toEqual(fileSize);
    });

    it("should return undefined", () => {
        const file = {};
        const values = getFileSize(file as File);
        expect(values).toBeUndefined();
    });
});

describe("fileMatchSize", () => {
    it("should return true if the file object doesn't have a {size} property", () => {
        expect(fileMatchSize({} as File)).toBe(true);
    });

    it("should return true if the minSize and maxSize were not provided", () => {
        expect(fileMatchSize({ size: 100 } as File)).toBe(true);
        expect(fileMatchSize({ size: 100 } as File, undefined, undefined)).toBe(true);
    });

    it("should return true if the file {size} is within the [minSize, maxSize] range", () => {
        expect(fileMatchSize({ size: 100 } as File, 10, 200)).toBe(true);
        expect(fileMatchSize({ size: 100 } as File, 10, 99)).toBe(false);
        expect(fileMatchSize({ size: 100 } as File, 101, 200)).toBe(false);
    });

    it("should return true if the file {size} is more than minSize", () => {
        expect(fileMatchSize({ size: 100 } as File, 100)).toBe(true);
        expect(fileMatchSize({ size: 100 } as File, 101)).toBe(false);
    });

    it("should return true if the file {size} is less than maxSize", () => {
        expect(fileMatchSize({ size: 100 } as File, undefined, 100)).toBe(true);
        expect(fileMatchSize({ size: 100 } as File, undefined, 99)).toBe(false);
    });
});

describe("filterFiles", () => {
    const validateSchema: ValidateTypeSchema[] = [
        {
            minSize: 100,
            maxSize: 200,
            accept: AudioType.WAVE,
        },

        {
            minSize: 100,
            maxSize: 200,
            accept: VideoType.MP4,
        },
        {
            minSize: 100,
            maxSize: 200,
            accept: MIMETypes.PDF,
        },
    ];
    const fileSchemas: GeneratorFile[] = [
        {
            size: 300,
            fileProperty: {
                type: AudioType.WAVE,
            },
        },
        {
            size: 100,
            fileProperty: {
                type: VideoType.MP4,
            },
        },
        {
            size: 300,
            fileProperty: {
                type: MIMETypes.PDF,
            },
        },
    ];

    const files: File[] = generateFiles(fileSchemas);

    it("should return correct", () => {
        expect(filterFiles(files, validateSchema)).toHaveLength(1);
        expect(filterFiles(files, validateSchema)[0].type).toEqual(VideoType.MP4);
    });
    it("should return empty values", () => {
        expect(filterFiles([], validateSchema)).toHaveLength(0);
    });
});

describe("filterUploadFiles", () => {
    it("should return correct", () => {
        const files: Media[] = [
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

describe("isVideo", () => {
    it("should check if file is video or not", () => {
        expect(isVideo({ type: "video/mp4" })).toEqual(true);
        expect(isVideo({ type: "video/h263" })).toEqual(true);

        expect(isVideo({ type: ".doc" })).toEqual(false);
        expect(isVideo({ type: ".xlsx" })).toEqual(false);
    });
});
