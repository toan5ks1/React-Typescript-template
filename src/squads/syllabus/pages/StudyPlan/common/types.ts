import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { Grade } from "src/squads/syllabus/models/grade";
import { StudentsManyQuery } from "src/squads/syllabus/services/bob/bob-types";
import {
    Syllabus_BooksManyReferenceQuery,
    GetManyStudentStudyPlansByFilterQuery,
    StudyPlanAttrsFragment,
    StudyPlanItemAttrsFragment,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { PaginationWithTotal } from "src/squads/syllabus/services/service-creator";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { TablePaginationProps } from "@mui/material";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import type { Study_Plans } from "src/squads/syllabus/__generated__/eureka/root-types";
import { ChoiceType } from "src/squads/syllabus/hooks/useAutocompleteReference";

export interface StudyPlanItemWithLoInfo extends StudyPlanItemAttrsFragment {
    loName: string;
    loType?: keyof typeof KeyLOTypes;
}

export type StudyPlanItemsByTopic = {
    topicId: string;
    topicName: string;
    studyPlanItems: StudyPlanItemWithLoInfo[];
};

export interface QueryContentStructure {
    book_id: string;
    chapter_id: string;
    topic_id: string;
    assignment_id: string;
    lo_id: string;
    course_id: string;
}

export interface StudyPlanItemFormValues {
    studyPlanItem: {
        [id: string]: {
            availableFrom?: string;
            availableTo?: string;
            startDate?: string;
            endDate?: string;
            status: keyof typeof StudyPlanItemStatus;
            contentStructure: QueryContentStructure;
        };
    };
}

export interface StudentStudyPlanInfo
    extends Pick<Study_Plans, "created_at" | "master_study_plan_id">,
        Omit<StudyPlanAttrsFragment, "study_plan_id"> {
    bookId: GetManyStudentStudyPlansByFilterQuery["get_student_study_plans_by_filter"][0]["book_id"];
    bookName?: string;
    grades: Array<number>;
    studyplanId: StudyPlanAttrsFragment["study_plan_id"];
    studentId: string;
}

export interface StudyPlanListByStudent {
    studentId: string;
    studentName: string;
    studyPlanList: StudentStudyPlanInfo[];
}

export interface GroupStudyPlanByStudentProps {
    studentList: StudentsManyQuery["users"];
    studyPlanList: StudentStudyPlanInfo[];
}

export type StudyPlanItemDateField =
    | "availableFrom"
    | "availableTo"
    | "startDate"
    | "endDate"
    | "status";

export interface StudyPlanTopicPagination
    extends PaginationWithTotal,
        Pick<TablePaginationProps, "nextIconButtonProps"> {}

export type FormFilterStudyPlanValues = {
    grades: Grade[];
    books: Syllabus_BooksManyReferenceQuery["books"];
    archived: boolean;
};

export type StudyPlanFilter = {
    grades: number[];
    bookIds: string[];
    archived: boolean;
};

export interface StudyPlanFormData {
    name: string;
    book: ChoiceType<ArrayElement<Syllabus_BooksManyReferenceQuery["books"]>> | null;
    grades: Grade[];
    trackSchoolProgress: boolean;
}
