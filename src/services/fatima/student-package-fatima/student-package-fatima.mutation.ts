import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { SubscriptionModifierServicePromiseClient } from "manabuf/fatima/v1/subscription_grpc_web_pb";

import { MutationParams, InheritedGrpcServiceClient } from "../../service-types";
import {
    newAddStudentPackageCourse,
    newUpdateStudentPackageCourse,
    validateAddStudentPackageCourse,
    validateUpdateStudentPackageCourse,
} from "./student-package-fatima.request";
import { NsFatimaStudentService } from "./types";

class StudentPackageFatimaMutation extends InheritedGrpcServiceClient<SubscriptionModifierServicePromiseClient> {
    async addStudentPackageCourse({
        data,
    }: MutationParams<NsFatimaStudentService.AddStudentPackageCourse>) {
        validateAddStudentPackageCourse(data);

        const req = newAddStudentPackageCourse(
            data! as Required<NsFatimaStudentService.AddStudentPackageCourse>
        );

        const resp = await this._call("addStudentPackageCourse", req);

        const studentPackageCourseList = resp.toObject();

        return {
            data: {
                id: studentPackageCourseList.studentPackageId,
            },
        };
    }

    async updateStudentPackageCourse({
        data,
    }: MutationParams<NsFatimaStudentService.UpdateStudentPackageCourse>) {
        validateUpdateStudentPackageCourse(data);

        const req = newUpdateStudentPackageCourse(
            data! as Required<NsFatimaStudentService.UpdateStudentPackageCourse>
        );

        const resp = await this._call("editTimeStudentPackage", req);

        const studentPackageCourseList = resp.toObject();

        return {
            data: {
                id: studentPackageCourseList.studentPackageId,
                ...studentPackageCourseList,
            },
        };
    }
}

const studentPackageFatima = new StudentPackageFatimaMutation(
    SubscriptionModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default studentPackageFatima;
