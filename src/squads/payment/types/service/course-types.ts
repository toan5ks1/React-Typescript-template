import { Payment_GetManyCourseByCourseIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type CourseType = ArrayElement<Payment_GetManyCourseByCourseIdsQuery["courses"]>;
