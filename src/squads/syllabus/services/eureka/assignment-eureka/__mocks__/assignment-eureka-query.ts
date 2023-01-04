import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

export const createMockAssignmentGetOneQueryData = (
    override: Partial<AssignmentOneQuery["assignments"][0]> = {}
): AssignmentOneQuery["assignments"][0] => {
    return {
        assignment_id: "assignment_id_getOne",
        name: "assignment_name_getOne",
        created_at: "2022-03-14T16:51:51.621797+00:00",
        attachment: ["assignment_attachment_video"],
        ...override,
    };
};
