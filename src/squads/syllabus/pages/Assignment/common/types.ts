import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export interface AssignmentOne
    extends Omit<AssignmentOneQuery["assignments"][0], "check_list" | "created_at" | "type"> {}

export interface AssignmentFormValues extends AssignmentOne {
    files: (File | Media)[];
}
