import { ProviderTypes } from "src/common/constants/enum";

import lessonStudentSubscriptionsServiceBob from "../bob/lesson-student-subscriptions-service-bob";
import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: Parameters<
              typeof lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription
          >[0];
      }
    | {
          type: ProviderTypes.GET_STUDENT_COURSE_SUBSCRIPTION;
          payload: {
              filter: Parameters<
                  typeof lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions
              >[0];
          };
      };

const lessonStudentSubscriptionsService = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            return lessonStudentSubscriptionsServiceBob.retrieveStudentSubscription(params.payload);
        }

        case ProviderTypes.GET_STUDENT_COURSE_SUBSCRIPTION: {
            return lessonStudentSubscriptionsServiceBob.getStudentCourseSubscriptions(
                params.payload.filter
            );
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default lessonStudentSubscriptionsService;
