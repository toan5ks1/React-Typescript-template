import {
    CountStudentWithFilterQueryVariables,
    GradesOfStudentsListQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    StudentsOneV3QueryVariables,
    User_CountStudentWithFilterV2QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { defineService } from "src/squads/user/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/user/service/service-types";
import studentServiceUsermgmt from "src/squads/user/service/usermgmt/student-service-usermgmt";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import { isInvalidOrEmptyVariable, toGqlQuerySorts } from "src/squads/user/service/utils";

import studentQueriesBob from "src/squads/user/service/bob/student-service-bob/student-service-bob.query";

interface UpsertStudentPayloadOptionsType {
    isUseEnrollmentStatusStr?: boolean;
    isShowNamePhonetic?: boolean;
}

export type UpsertStudentPayloadType = {
    data: NsUsermgmtStudentService.UpsertStudentFormPropsReq;
    options?: UpsertStudentPayloadOptionsType;
};

const studentService = defineService({
    query: {
        userGetManyStudentsWithFilter: (
            variables: ListQuery<StudentsListByFiltersWithoutGradeAndAggregateQueryVariables>
        ) => {
            const { filter = {}, pagination, sort } = variables;
            return studentQueriesBob.getListWithFilterV3({
                ...filter,
                ...pagination,
                order_by: toGqlQuerySorts(sort),
            });
        },
        userGetManyStudentsWithFilterV2: (
            variables: ListQuery<StudentsListByFiltersWithoutGradeAndAggregateQueryVariables>
        ) => {
            const { filter = {}, pagination, sort } = variables;
            return studentQueriesBob.getManyStudentsFilters({
                ...filter,
                ...pagination,
                order_by: toGqlQuerySorts(sort),
            });
        },

        userGetManyStudentsLocationWithFilter: (
            variables: ListQuery<User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables>
        ) => {
            const { filter = {}, pagination, sort } = variables;
            return studentQueriesBob.getListWithFilterV4({
                ...filter,
                ...pagination,
                order_by: toGqlQuerySorts(sort),
            });
        },
        userGetManyStudentsLocationWithFilterV2: (
            variables: ListQuery<User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables>
        ) => {
            const { filter = {}, pagination, sort } = variables;
            return studentQueriesBob.getManyStudentLocationsFilters({
                ...filter,
                ...pagination,
                order_by: toGqlQuerySorts(sort),
            });
        },

        userGetOneStudent: (variables: StudentsOneV3QueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.id)) {
                throw new InvalidParamError({
                    action: "studentGetOne",
                    errors: [
                        {
                            field: "id",
                            fieldValueIfNotSensitive: variables.id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return studentQueriesBob.getOne({ id: variables.id });
        },
        userGetOneStudentV4: (variables: StudentsOneV3QueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.id)) {
                throw new InvalidParamError({
                    action: "studentGetOneV4",
                    errors: [
                        {
                            field: "id",
                            fieldValueIfNotSensitive: variables.id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return studentQueriesBob.getOneV4({ id: variables.id });
        },

        userGetGradesOfStudentsByStudentIds: (
            variables: ListQuery<GradesOfStudentsListQueryVariables>
        ) => {
            const { filter } = variables;

            const student_ids = filter?.student_ids || [];

            return studentQueriesBob.getGradesOfStudentsList({ student_ids });
        },

        userCountStudent: (variables: ListQuery<CountStudentWithFilterQueryVariables>) => {
            const { filter = {} } = variables;
            return studentQueriesBob.getCountStudentWithFilter(filter);
        },
        userCountStudentV2: (variables: ListQuery<CountStudentWithFilterQueryVariables>) => {
            const { filter = {} } = variables;
            return studentQueriesBob.getCountStudentWithFilterV3(filter);
        },

        userCountStudentLocation: (
            variables: ListQuery<User_CountStudentWithFilterV2QueryVariables>
        ) => {
            const { filter = {} } = variables;
            return studentQueriesBob.getCountStudentWithFilterV2(filter);
        },
        userCountStudentLocationV2: (
            variables: ListQuery<User_CountStudentWithFilterV2QueryVariables>
        ) => {
            const { filter = {} } = variables;
            return studentQueriesBob.getCountStudentWithLocationsFilter(filter);
        },
    },

    mutation: {
        userCreateStudent: (payload: UpsertStudentPayloadType) => {
            return studentServiceUsermgmt.createStudent(payload);
        },
        userUpdateStudent: (payload: UpsertStudentPayloadType) => {
            return studentServiceUsermgmt.updateStudent(payload);
        },
        userReissueUserPassword: (data: NsUsermgmtStudentService.ReissueUserPasswordReq) => {
            return studentServiceUsermgmt.reissueUserPassword(data);
        },
        userUpsertStudentCoursePackage: (
            data: NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq
        ) => {
            return studentServiceUsermgmt.upsertStudentCoursePackage(data);
        },
    },
});

export default studentService;
