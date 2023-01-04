import reactiveStorage from "src/squads/user/internals/reactive-storage";

import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import { NsUsermgmtStudentService } from "../types";

export const getSchoolId = () => {
    return (
        (reactiveStorage.get("ADMIN_PROPERTIES")?.school_id as number) ||
        reactiveStorage.get("PROFILE")?.schoolId ||
        0
    );
};

// Random characters don't depend on the time
export const randomUserPassword = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
};

export function getEnrollmentStatus(
    enrollmentStatus: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"]["enrollmentStatus"]
): StudentEnrollmentStatus {
    const id = enrollmentStatus?.id;
    if (id === undefined || !StudentEnrollmentStatus[id])
        return StudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_ENROLLED;
    return StudentEnrollmentStatus[id];
}

export function getLocationIdsList(
    locations?: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"]["locations"]
) {
    if (!locations || !Array.isArray(locations)) {
        return [];
    }
    return locations.map((location) => {
        if ("location_id" in location) return location.location_id;
        return location.locationId;
    });
}
