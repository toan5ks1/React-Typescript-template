import { UseFormStateReturn } from "react-hook-form";
import {
    StudentPackageClientWithLocation,
    StudentPackageCourseForm,
} from "src/squads/user/common/types";
import { User_CourseLocationsByCourseIdQuery } from "src/squads/user/service/bob/bob-types";

import { CourseOptions } from "./student";

export const mockDefaultStudentCourse: StudentPackageClientWithLocation[] = [
    {
        course: {
            course_id: "01FYTXXXXQM1MMP8C1GXDXB7YW",
            name: "course05_23-12-2021",
            course_access_paths: [
                {
                    location: {
                        name: "Center JP 3",
                        location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                        location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                        parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                        access_path: "",
                    },
                },
            ],
        },
        studentPackageId: "01FYTXYF5TV6Y8S0YVGKE3D528",
        end: "2022-03-22T16:59:59.000Z",
        start: "2022-03-20T00:00:00.000Z",
        location: {
            location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
            name: "Center JP 3",
            access_path: "",
            location_type: "01FVEFZHEEPC06CQ5618M93ETV",
            parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
        },
    },
];

export const mockCourseWithLocationOption: CourseOptions[] = [
    {
        value: "course07_02-03-2022",
        course_id: "01FYV82QDBJJPNQ55NEDD7HYV9",
        name: "course07_02-03-2022",
        icon: "",
        grade: 0,
        subject: "SUBJECT_NONE",
        country: "COUNTRY_NONE",
        school_id: -2147483648,
        display_order: 1,
        course_access_paths: [
            {
                location: {
                    name: "Center JP 3",
                    location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                    location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                    parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                    access_path: "",
                },
            },
        ],
        id: "01FYV82QDBJJPNQ55NEDD7HYV9",
    },
    {
        value: "course6_23-03-2022",
        course_id: "01FYV8297607SA4G7TAZZDD2HA",
        name: "course6_23-03-2022",
        icon: "",
        grade: 0,
        subject: "SUBJECT_NONE",
        country: "COUNTRY_NONE",
        school_id: -2147483648,
        display_order: 1,
        course_access_paths: [
            {
                location: {
                    name: "Center JP 3",
                    location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                    location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                    parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                    access_path: "",
                },
            },
        ],
        id: "01FYV8297607SA4G7TAZZDD2HA",
    },
    {
        value: "course05_23-12-2021",
        course_id: "01FYTXXXXQM1MMP8C1GXDXB7YW",
        name: "course05_23-12-2021",
        icon: "",
        grade: 0,
        subject: "SUBJECT_NONE",
        country: "COUNTRY_NONE",
        school_id: -2147483648,
        display_order: 1,
        course_access_paths: [
            {
                location: {
                    name: "Center JP 3",
                    location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                    location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                    parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                    access_path: "",
                },
            },
        ],
        id: "01FYTXXXXQM1MMP8C1GXDXB7YW",
    },
];

export const mockErrorStudentCoursePackage: UseFormStateReturn<StudentPackageCourseForm>["errors"] =
    {
        studentPackages: [
            {
                end: {
                    type: "validate",
                    message: "1,2",
                    ref: {
                        name: "studentPackages[0].end",
                    },
                },
            },
            {
                start: {
                    type: "required",
                    message: "0",
                    ref: {
                        name: "studentPackages[1].start",
                    },
                },
                end: {
                    type: "required",
                    message: "0",
                    ref: {
                        name: "studentPackages[1].end",
                    },
                },
            },
        ],
    };

export const mockLocationCourseChoice: User_CourseLocationsByCourseIdQuery["course_access_paths"] =
    [
        {
            location: {
                location_id: "",
                name: "",
                access_path: "",
                location_type: "",
                parent_location_id: "",
            },
        },
    ];
