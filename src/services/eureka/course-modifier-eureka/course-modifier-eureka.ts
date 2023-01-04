import appConfigs from "src/internals/configuration";

import { CourseModifierServicePromiseClient } from "manabuf/eureka/v1/course_modifier_grpc_web_pb";
import { DuplicateBookRequest } from "manabuf/eureka/v1/course_modifier_pb";

import { commonGrpcOptions } from "../../../internals/grpc";
import { InheritedGrpcServiceClient } from "../../service-types";
import {
    updateDisplayOrdersOfLOsAndAssignmentsRequest,
    validateDuplicateBook,
} from "./course-modifier-eureka.request";
import { NsEurekaCourseModifierService } from "./types";

class CourseModifierEureka extends InheritedGrpcServiceClient<CourseModifierServicePromiseClient> {
    async duplicateBook(data: NsEurekaCourseModifierService.DuplicateBook) {
        validateDuplicateBook(data);
        const req = new DuplicateBookRequest();

        req.setBookId(data.bookId);
        req.setBookName(data.bookName);

        const resp = await this._call("duplicateBook", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }

    async updateDisplayOrdersOfLOsAndAssignments(
        data: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments
    ) {
        const req = updateDisplayOrdersOfLOsAndAssignmentsRequest(data);

        const resp = await this._call("updateDisplayOrdersOfLOsAndAssignments", req);

        return {
            data: {
                ...resp.toObject(),
            },
        };
    }
}

const courseModifierServiceEureka = new CourseModifierEureka(
    CourseModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default courseModifierServiceEureka;
