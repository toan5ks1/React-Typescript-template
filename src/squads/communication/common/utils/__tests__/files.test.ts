import { FileType } from "src/squads/communication/common/constants/enum";
import { createCsvFile, handleDownloadFile } from "src/squads/communication/common/utils/files";

describe("handle download files with csv", () => {
    const mockURL = "blob:http://localhost:3001/";

    function spyOnCreateLinkElementWithMockUrl(): HTMLAnchorElement {
        URL.createObjectURL = jest.fn().mockReturnValue(mockURL);

        const link: HTMLAnchorElement = {
            ...document.createElement("a"),
            click: jest.fn(),
            remove: jest.fn(),
        };
        jest.spyOn(document, "createElement").mockReturnValue(link);

        return link;
    }

    it("should create csv file and download successful with content and headers csv", () => {
        const link = spyOnCreateLinkElementWithMockUrl();

        const fileCreatedFromCsvJson = createCsvFile(
            [
                ["data at row 1, column 1", "data at row 1, column 2"],
                ["data at row 2, column 1", "data at row 2, column 2"],
            ],
            ["", "header column 1", "header column 2", "header not exist"]
        );
        handleDownloadFile(fileCreatedFromCsvJson, "csv_name_have_data", FileType.CSV);

        expect(link.download).toBe("csv_name_have_data.csv");
        expect(link.href).toBe(mockURL);

        expect(link.click).toBeCalledTimes(1);
        expect(link.remove).toBeCalledTimes(1);
    });
});
