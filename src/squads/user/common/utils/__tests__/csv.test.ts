import { errorCodesMap } from "src/common/utils/error";
import { importStudentTemplate } from "src/squads/user/test-utils/mocks/csv";

import { downloadCsvFromBase64 } from "../cvs";

describe("downloadCsvFromBase64", () => {
    const mockURL = "blob:http://localhost:3001/82ec6e3d-0beb-46a0-b125-518113f8f547";

    it("should call click and correct name, link download", () => {
        const link: HTMLAnchorElement = {
            ...document.createElement("a"),
            click: jest.fn(),
        };
        window.URL.createObjectURL = jest.fn().mockImplementation(() => mockURL);

        const mock = jest.spyOn(document, "createElement").mockImplementation(() => link);
        downloadCsvFromBase64({ data: importStudentTemplate, nameFile: "test" });
        expect(link.click).toBeCalledTimes(1);
        expect(link.download).toBe("test.csv");
        expect(link.href).toBe(mockURL);

        mock.mockClear();
    });

    it("should throw error when input was Uint8Array", () => {
        try {
            downloadCsvFromBase64({ data: new Uint8Array(), nameFile: "test" });
        } catch (error) {
            expect(error).toMatchObject(new Error(errorCodesMap.INVALID_PARAMS));
        }
    });
});
