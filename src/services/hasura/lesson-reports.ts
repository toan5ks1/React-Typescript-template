import { ProviderTypes } from "src/common/constants/enum";
import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";

import { RetrieveIndividualLessonsReportRequest } from "manabuf/bob/v1/lessons_pb";

import lessonReportModifierServiceBob from "../bob/lesson-reports-modifier-service-bob";
import lessonReportServiceBob from "../bob/lesson-reports-service-bob";
import lessonReportsQueriesBob from "../bob/lesson-reports-service-bob/lesson-reports-bob.query";
import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: RetrieveIndividualLessonsReportRequest.AsObject;
      }
    | {
          type: ProviderTypes.SUBMIT_LESSON_REPORT;
          payload: Parameters<typeof lessonReportModifierServiceBob.submitLessonReport>[0];
      }
    | {
          type: ProviderTypes.SAVE_DRAFT_LESSON_REPORT;
          payload: Parameters<typeof lessonReportModifierServiceBob.saveDraftLessonReport>[0];
      }
    | {
          type: ProviderTypes.DELETE;
          payload: Parameters<typeof lessonReportModifierServiceBob.deleteLessonReport>[0];
      }
    | {
          type: ProviderTypes.ONE;
          payload: {
              filter: Parameters<typeof lessonReportsQueriesBob.getOne>[0];
          };
      }
    | {
          type: ProviderTypes.RETRIEVE_PARTNER_DOMAIN;
          payload: {
              filter: GetPartnerDomainRequestQuery;
          };
      };

const lessonReportService = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            return lessonReportServiceBob.retrieveIndividualLessonReport(params.payload);
        }

        case ProviderTypes.SUBMIT_LESSON_REPORT: {
            return lessonReportModifierServiceBob.submitLessonReport(params.payload);
        }

        case ProviderTypes.SAVE_DRAFT_LESSON_REPORT: {
            return lessonReportModifierServiceBob.saveDraftLessonReport(params.payload);
        }

        case ProviderTypes.DELETE: {
            return lessonReportModifierServiceBob.deleteLessonReport(params.payload);
        }

        case ProviderTypes.ONE: {
            return lessonReportsQueriesBob.getOne({ lesson_id: params.payload.filter.lesson_id });
        }

        case ProviderTypes.RETRIEVE_PARTNER_DOMAIN: {
            return lessonReportServiceBob.retrievePartnerDomain(params.payload.filter);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default lessonReportService;
