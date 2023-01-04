import { toTimestampNewProto } from "src/common/utils/timezone";

import {
    AddStudentPackageCourseRequest,
    EditTimeStudentPackageRequest,
} from "manabuf/fatima/v1/subscription_pb";

import { formInvalidErr } from "../../../internals/errors";
import { NsFatimaStudentService } from "./types";

export function validateAddStudentPackageCourse(
    data?: NsFatimaStudentService.AddStudentPackageCourse
) {
    if (!data || !data.student_id || !data.course_id || !data.start_at || !data.end_at) {
        throw formInvalidErr;
    }
}

export function validateUpdateStudentPackageCourse(
    data?: NsFatimaStudentService.UpdateStudentPackageCourse
) {
    if (!data || !data.student_package_id || !data.start_at || !data.end_at) {
        throw formInvalidErr;
    }
}

////////////////////////////////////////////////////////////////////////
export function newAddStudentPackageCourse(
    data: Required<NsFatimaStudentService.AddStudentPackageCourse>
) {
    const req = new AddStudentPackageCourseRequest();

    req.setStudentId(data.student_id);
    req.addCourseIds(data.course_id);
    req.setStartAt(
        toTimestampNewProto({
            originDate: data.start_at,
            origin: false,
            start: true,
            type: "day",
        })
    );
    req.setEndAt(
        toTimestampNewProto({
            originDate: data.end_at,
            origin: false,
            start: false,
            type: "day",
        })
    );

    return req;
}

export function newUpdateStudentPackageCourse(
    data: Required<NsFatimaStudentService.UpdateStudentPackageCourse>
) {
    const req = new EditTimeStudentPackageRequest();

    req.setStudentPackageId(data.student_package_id);
    req.setStartAt(
        toTimestampNewProto({
            originDate: data.start_at,
            origin: false,
            start: true,
            type: "day",
        })
    );
    req.setEndAt(
        toTimestampNewProto({
            originDate: data.end_at,
            origin: false,
            start: false,
            type: "day",
        })
    );

    return req;
}
