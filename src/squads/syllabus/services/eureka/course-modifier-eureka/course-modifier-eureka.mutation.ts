import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { CourseModifierServicePromiseClient } from "manabuf/eureka/v1/course_modifier_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { validateAddBooksToCourse } from "../../yasuo/courses-service-yasuo/courses-yasuo.mutation";
import {
    createAddBooksToCourseRequest,
    createDuplicateBookRequest,
    createUpdateDisplayOrdersOfLOsAndAssignmentsRequest,
    validateDuplicateBook,
} from "./course-modifier-eureka.request";
import { NsEurekaCourseModifierService } from "./types";

class CourseModifierEureka extends InheritedGrpcServiceClient<CourseModifierServicePromiseClient> {
    async duplicateBook(data: NsEurekaCourseModifierService.DuplicateBook) {
        validateDuplicateBook(data);

        const req = createDuplicateBookRequest(data);

        const resp = await this._call("duplicateBook", req);

        return resp.toObject();
    }

    async updateDisplayOrdersOfLOsAndAssignments(
        data: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments
    ) {
        const req = createUpdateDisplayOrdersOfLOsAndAssignmentsRequest(data);

        const resp = await this._call("updateDisplayOrdersOfLOsAndAssignments", req);

        return resp.toObject();
    }

    async addBooksToCourse(data: NsEurekaCourseModifierService.AddBooksToCourse) {
        validateAddBooksToCourse(data);

        const request = createAddBooksToCourseRequest(data);
        const response = await this._call("addBooks", request);

        return response.toObject();
    }
}

const courseModifierServiceEureka = new CourseModifierEureka(
    CourseModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default courseModifierServiceEureka;
