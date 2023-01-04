import { ModeOpenDialog } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { GenderKeys, GenderType, UpsertStudentFormProps } from "src/squads/user/common/types";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { Country } from "manabuf/common/v1/enums_pb";

import useStudentUpsertFormMethods from "../useStudentUpsertFormMethods";

import { renderHook } from "@testing-library/react-hooks";

const mockStudentInfo = createMockStudent({ id: "student-01", current_grade: 1 });

const convertCountryCode: Country =
    Country[mockStudentInfo?.user?.country || getEnumString(Country, Country.COUNTRY_JP)];
const defaultGender: GenderType = GenderKeys[convertString(mockStudentInfo?.user?.gender)];

describe("useStudentUpsertFormMethods", () => {
    it("should return correct data type", () => {
        const { result } = renderHook(() =>
            useStudentUpsertFormMethods({
                mode: ModeOpenDialog.ADD,
                defaultValues: {
                    student: mockStudentInfo,
                },
            })
        );
        expect(typeof result.current.methods).toBe("object");
        expect(typeof result.current.handleSubmit).toBe("function");
        expect(typeof result.current.isSubmitting).toBe("boolean");
        expect(typeof result.current.setError).toBe("function");
    });

    it("should return correct data in add new student mode", async () => {
        const { result } = renderHook(
            () =>
                useStudentUpsertFormMethods({
                    mode: ModeOpenDialog.ADD,
                    defaultValues: {
                        student: mockStudentInfo,
                    },
                }),
            { wrapper: TestCommonAppProvider }
        );

        const expectedValues = {
            generalInfo: {
                countryCode: convertCountryCode,
                birthday: null,
                gender: GenderKeys.NONE,
            },
        };

        expect(result.current.methods.getValues()).toEqual(expectedValues);
    });

    it("should return correct data in edit student mode", async () => {
        const { result } = renderHook(
            () =>
                useStudentUpsertFormMethods({
                    mode: ModeOpenDialog.EDIT,
                    defaultValues: {
                        student: mockStudentInfo,
                    },
                }),
            { wrapper: TestCommonAppProvider }
        );

        const expectedValues: UpsertStudentFormProps = {
            generalInfo: {
                studentId: convertString(mockStudentInfo?.user?.user_id),
                name: convertString(mockStudentInfo?.user?.name),
                firstName: convertString(mockStudentInfo?.user?.first_name),
                lastName: convertString(mockStudentInfo?.user?.last_name),
                firstNamePhonetic: convertString(mockStudentInfo?.user?.first_name_phonetic),
                lastNamePhonetic: convertString(mockStudentInfo?.user?.last_name_phonetic),
                email: convertString(mockStudentInfo?.user?.email),
                phoneNumber: convertString(mockStudentInfo?.user?.phone_number),
                grade: {
                    id: 1,
                    name: "Grade 1",
                },
                countryCode: convertCountryCode,
                enrollmentStatus: {
                    id: convertString(mockStudentInfo?.enrollment_status),
                    value: "Enrolled",
                },
                studentExternalId: convertString(mockStudentInfo?.student_external_id),
                studentNote: convertString(mockStudentInfo?.student_note),
                birthday: mockStudentInfo?.user?.birthday || null,
                gender: defaultGender,
                locations: mockStudentInfo.user.locations,
            },
            schoolHistories: undefined,
        };

        expect(result.current.methods.getValues()).toEqual(expectedValues);
    });
});
