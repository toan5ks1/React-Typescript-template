import { classServiceMaster } from "src/squads/architecture/service/mastermgmt/class-service/class-service";

import { ImportClassResponse } from "manabuf/mastermgmt/v1/class_pb";

import classMutationServiceMaster, {
    newImportClassRequest,
} from "src/squads/architecture/service/mastermgmt/class-service/class.mutation";

describe("class-service", () => {
    it("should import new class", async () => {
        const filePayload: File = new File([], "newFile.csv");

        const _callSpy = jest.spyOn(classMutationServiceMaster, "_call");

        const fakeReturn = {
            toObject: () => ({ errorsList: [] }),
        } as unknown as ImportClassResponse;

        _callSpy.mockResolvedValue(fakeReturn);

        await classServiceMaster.mutation.classImport(filePayload);

        expect(_callSpy).toBeCalledWith("importClass", await newImportClassRequest(filePayload));
    });
});
