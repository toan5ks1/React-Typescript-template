import { formInvalidErr } from "src/internals/errors";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types";

import { NsUsermgmtStudentService } from "../types";

// Student
export function validateCreateStudentReq({
    data,
    options,
}: NsUsermgmtStudentService.UpsertStudentPayloadType) {
    const { generalInfo } = data!;
    if (!data || !generalInfo.email || typeof generalInfo.grade === "undefined") {
        throw formInvalidErr;
    }

    if (options?.isShowNamePhonetic) {
        if (!generalInfo.firstName || !generalInfo.lastName) {
            throw formInvalidErr;
        }
    } else {
        if (!generalInfo.name) {
            throw formInvalidErr;
        }
    }
}

export function validateUpdateStudentReq({
    data,
    options,
}: NsUsermgmtStudentService.UpsertStudentPayloadType) {
    const { generalInfo } = data!;
    if (
        !data ||
        !generalInfo.email ||
        !generalInfo.studentId ||
        typeof generalInfo.grade === "undefined" ||
        typeof generalInfo.enrollmentStatus === "undefined"
    ) {
        throw formInvalidErr;
    }

    if (options?.isShowNamePhonetic) {
        if (!generalInfo.firstName || !generalInfo.lastName) {
            throw formInvalidErr;
        }
    } else {
        if (!generalInfo.name) {
            throw formInvalidErr;
        }
    }
}

// Parent
export function validateUpsertParentReq(data?: NsUsermgmtStudentService.UpsertParent) {
    if (
        !data ||
        !data.studentId ||
        !data.parent ||
        !data.parent.name ||
        !data.parent.email ||
        !data.parent.relationship
    ) {
        throw formInvalidErr;
    }
}

export function validateRemoveParentReq(data?: NsUsermgmtStudentService.RemoveParentReq) {
    if (!data || !data.studentId || !data.parentId) {
        throw formInvalidErr;
    }
}

// Course
export function validateUpsertCourseReq(data?: StudentPackageClientWithLocation) {
    if (
        !data ||
        (!data.studentPackageId && !data.course.course_id) ||
        !data.start ||
        !data.end ||
        !data.location
    ) {
        throw formInvalidErr;
    }
}

export const validateUpsertStudentCoursePackageReq = (
    data?: NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq
) => {
    if (!data || !data.studentId || !data.studentPackages) {
        throw formInvalidErr;
    }
};

// Reissue password
export function validateReissueUserPasswordReq(
    data?: NsUsermgmtStudentService.ReissueUserPasswordReq
) {
    if (!data || !data.userId) {
        throw formInvalidErr;
    }
}
