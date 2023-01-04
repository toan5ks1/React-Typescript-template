import { StudentSchoolHistoryFormProps } from "src/squads/user/common/types";

export const mockSchoolHistoryValues: StudentSchoolHistoryFormProps[] = [
    {
        schoolId: "1",
        schoolLevelId: "2",
        endDate: new Date(2002, 10, 11).toISOString(),
        startDate: new Date(2000, 10, 11).toISOString(),
        schoolCourseId: "3",
    },
];
