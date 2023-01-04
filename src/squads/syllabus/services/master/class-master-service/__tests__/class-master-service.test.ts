import { classMasterService } from "src/squads/syllabus/services/master/class-master-service/class-master-service";
import { NsSyllabus_Master_ClassService } from "src/squads/syllabus/services/master/class-master-service/types";

import classServiceMaster from "src/squads/syllabus/services/master/class-master-service/class-master.mutation";

jest.mock("src/squads/syllabus/services/master/class-master-service/class-master.mutation", () => ({
    __esModule: true,
    default: { deleteClass: jest.fn(), updateClass: jest.fn() },
}));

describe("class-master-service", () => {
    it("should call updateClass from gRPC mutation service", async () => {
        (classServiceMaster.updateClass as jest.Mock).mockReturnValue({});

        const variables: NsSyllabus_Master_ClassService.UpdateClassRequest = {
            classId: "class_id",
            name: "class_name",
        };

        const response = await classMasterService.mutation.classUpdate(variables);

        expect(classServiceMaster.updateClass).toBeCalledWith(variables);
        expect(response).toEqual({});
    });
});

describe("class-master-service", () => {
    it("should call deleteClass from gRPC mutation service", async () => {
        (classServiceMaster.deleteClass as jest.Mock).mockReturnValue({});

        const variables: NsSyllabus_Master_ClassService.DeleteClassRequest = {
            classId: "class_id",
        };

        const response = await classMasterService.mutation.classDelete(variables);

        expect(classServiceMaster.deleteClass).toBeCalledWith(variables);
        expect(response).toEqual({});
    });
});
