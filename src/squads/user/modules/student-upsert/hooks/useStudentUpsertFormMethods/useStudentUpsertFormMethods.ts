import { useForm } from "react-hook-form";
import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import {
    GenderKeys,
    GenderType,
    NormalizeStudentInformation,
    UpsertStudentFormProps,
    StudentSchoolHistoryFormProps,
    StudentHomeAddressFormProps,
} from "src/squads/user/common/types";

import { Country } from "manabuf/common/v1/enums_pb";
import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import useGradeMap from "src/squads/user/hooks/useGradeMap";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export type UpdateStudentProps = UpsertStudentFormProps;
export interface UseStudentUpsertFormMethodProps {
    mode?: ModeOpenDialog;
    defaultValues: {
        student?: NormalizeStudentInformation;
        schoolHistories?: StudentSchoolHistoryFormProps[];
        homeAddress?: StudentHomeAddressFormProps;
    };
}

const useStudentUpsertFormMethods = ({ mode, defaultValues }: UseStudentUpsertFormMethodProps) => {
    const { student, schoolHistories, homeAddress } = defaultValues;
    const { choiceGrades } = useGradeMap();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const convertCountryCode: Country =
        Country[student?.user?.country || getEnumString(Country, Country.COUNTRY_JP)];

    const convertEnrollmentStatusValue =
        StudentEnrollmentStatus[convertString(student?.enrollment_status)];

    const enrollmentStatus = student?.enrollment_status
        ? {
              id: convertString(student?.enrollment_status),
              value: tStudents(`choices.studentsEnrollmentStatus.${convertEnrollmentStatusValue}`),
          }
        : {};

    const defaultGender: GenderType = GenderKeys[convertString(student?.user?.gender)];

    // set default values
    const methods = useForm<UpsertStudentFormProps>({
        defaultValues:
            mode === ModeOpenDialog.EDIT
                ? {
                      generalInfo: {
                          studentId: convertString(student?.user?.user_id),
                          name: convertString(student?.user?.name),
                          firstName: convertString(student?.user?.first_name),
                          lastName: convertString(student?.user?.last_name),
                          firstNamePhonetic: convertString(student?.user?.first_name_phonetic),
                          lastNamePhonetic: convertString(student?.user?.last_name_phonetic),
                          email: convertString(student?.user?.email),
                          phoneNumber: convertString(student?.user?.phone_number),
                          grade: choiceGrades.find((grade) => grade.id === student?.current_grade),
                          countryCode: convertCountryCode,
                          enrollmentStatus,
                          studentExternalId: convertString(student?.student_external_id),
                          studentNote: convertString(student?.student_note),
                          birthday: student?.user?.birthday || null,
                          gender: defaultGender,
                          locations: student?.user?.locations,
                      },
                      schoolHistories,
                      homeAddress,
                  }
                : {
                      generalInfo: {
                          countryCode: convertCountryCode,
                          birthday: null,
                          gender: GenderKeys.NONE,
                      },
                  },
        mode: "onChange",
    });
    return {
        methods,
        handleSubmit: methods.handleSubmit,
        isSubmitting: methods.formState.isSubmitting,
        setError: methods.setError,
    };
};

export default useStudentUpsertFormMethods;
