import { MasterCategoryType } from "src/squads/payment/constants/master";

import { ImportGradesResponse } from "manabuf/mastermgmt/v1/grades_pb";

export declare namespace NsMastermgmtGradeImportService {
    export interface ImportGradesRequest {
        payload: {
            file: File;
            category: MasterCategoryType;
        };
    }
    export interface ImportGradesResponse extends ImportGradesResponse.AsObject {}
}
