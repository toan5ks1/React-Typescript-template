import studentEntryExitService from "src/services/entryexit/student-entry-exit-service";

import { ProviderTypes } from "../../common/constants/enum";
import { studentEntryExitQueriesBob } from "../bob/student-entry-exit-service-bob";
import { GqlPagination, GqlSort } from "../service-types";
import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.MANY;
          payload: { filter: Parameters<typeof studentEntryExitQueriesBob.getMany>[0] };
      }
    | {
          type: ProviderTypes.SCAN_STUDENT_QR;
          payload: Parameters<typeof studentEntryExitService.scanStudentEntryExit>[0];
      }
    | {
          type: ProviderTypes.LIST;
          payload: {
              filter: Parameters<typeof studentEntryExitQueriesBob.getList>[0];
              sort: GqlSort;
              pagination: GqlPagination;
          };
      }
    | {
          type: ProviderTypes.CREATE;
          payload: Parameters<typeof studentEntryExitService.createStudentEntryExit>[0];
      }
    | {
          type: ProviderTypes.UPDATE;
          payload: Parameters<typeof studentEntryExitService.updateStudentEntryExit>[0];
      }
    | {
          type: ProviderTypes.DELETE;
          payload: Parameters<typeof studentEntryExitService.deleteStudentEntryExit>[0];
      }
    | {
          type: ProviderTypes.GENERATE_STUDENT_QR_CODES;
          payload: Parameters<typeof studentEntryExitService.generateStudentsQrCodes>[0];
      };

const hasuraStudentEntryExit = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY: {
            const { filter } = params.payload;
            const { student_ids } = filter!;

            return studentEntryExitQueriesBob.getMany({
                student_ids,
            });
        }

        case ProviderTypes.SCAN_STUDENT_QR: {
            return studentEntryExitService.scanStudentEntryExit(params.payload);
        }

        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;
            const { student_id } = filter!;
            const { limit, offset } = pagination;

            return studentEntryExitQueriesBob.getList({
                student_id: student_id,
                limit,
                offset,
            });
        }

        case ProviderTypes.CREATE: {
            return studentEntryExitService.createStudentEntryExit(params.payload);
        }

        case ProviderTypes.UPDATE: {
            return studentEntryExitService.updateStudentEntryExit(params.payload);
        }

        case ProviderTypes.DELETE: {
            return studentEntryExitService.deleteStudentEntryExit(params.payload);
        }
        case ProviderTypes.GENERATE_STUDENT_QR_CODES: {
            return studentEntryExitService.generateStudentsQrCodes(params.payload);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraStudentEntryExit;
