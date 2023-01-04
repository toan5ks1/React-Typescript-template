import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export interface TaskAssignmentOne
    extends Omit<AssignmentOneQuery["assignments"][0], "check_list" | "created_at" | "type"> {}

export interface TaskAssignmentFormValues extends TaskAssignmentOne {
    files: (File | Media)[];
}
