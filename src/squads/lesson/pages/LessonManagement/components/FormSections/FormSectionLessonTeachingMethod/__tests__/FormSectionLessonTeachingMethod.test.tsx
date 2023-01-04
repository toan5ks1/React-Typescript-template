import { useFormContext } from "react-hook-form";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";
import {
    getAutocompleteInputByTestId,
    getRadioInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import AutocompleteHF from "src/squads/lesson/components/Autocompletes/AutocompleteHF";
import RadioGroupHF from "src/squads/lesson/components/RadioGroups/RadioGroupHF";
import FormSectionLessonTeachingMethod from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonTeachingMethod";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    ClassManyReferenceQueried,
    CourseManyReferenceQueried,
    LessonTeachingMethodKeys,
    LessonTeachingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

const mockResetFieldHookForm = jest.fn();

const renderComponent = () => {
    (useFormContext as jest.Mock).mockImplementation(() => {
        return {
            resetField: mockResetFieldHookForm,
        };
    });

    render(
        <TestHookFormProvider
            useFormOptions={{
                defaultValues: {
                    teachingMethod: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
                },
            }}
        >
            <FormSectionLessonTeachingMethod
                render={({ onChangeTeachingMethod, onChangeLocation, onChangeCourse }) => {
                    return (
                        <>
                            <RadioGroupHF
                                name="teachingMethod"
                                options={[
                                    {
                                        id: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
                                        value: "LESSON_TEACHING_METHOD_INDIVIDUAL",
                                    },
                                    {
                                        id: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_GROUP,
                                        value: "LESSON_TEACHING_METHOD_GROUP",
                                    },
                                ]}
                                onChange={(_, value) =>
                                    onChangeTeachingMethod(LessonTeachingMethodKeys[value])
                                }
                                data-testid="RadioTeachingMethod"
                            />

                            <AutocompleteHF<NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation>
                                name="location"
                                optionLabelKey="name"
                                getOptionSelectedField="locationId"
                                options={[
                                    {
                                        locationId: "Location_Id_1",
                                        name: "Location Name 1",
                                    },
                                    {
                                        locationId: "Location_Id_2",
                                        name: "Location Name 2",
                                    },
                                ]}
                                onChange={onChangeLocation}
                                data-testid="LocationAutocomplete"
                            />

                            <AutocompleteHF<CourseManyReferenceQueried>
                                name="course"
                                optionLabelKey="name"
                                getOptionSelectedField="course_id"
                                options={[
                                    {
                                        course_id: "Course_Id_1",
                                        name: "Course Name 1",
                                    },
                                    {
                                        course_id: "Course_Id_2",
                                        name: "Course Name 2",
                                    },
                                ]}
                                onChange={onChangeCourse}
                                data-testid="CourseAutocomplete"
                            />

                            <AutocompleteHF<ClassManyReferenceQueried>
                                name="classData"
                                optionLabelKey="name"
                                getOptionSelectedField="class_id"
                                options={[
                                    {
                                        class_id: "Class_Id_1",
                                        name: "Class Name 1",
                                    },
                                    {
                                        class_id: "Class_Id_2",
                                        name: "Class Name 2",
                                    },
                                ]}
                                data-testid="ClassAutocomplete"
                            />
                        </>
                    );
                }}
            />
        </TestHookFormProvider>
    );

    const individualTeaching: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_INDIVIDUAL";
    const individualTeachingRadio = getRadioInputByTestId(`Radio__${individualTeaching}`);

    const groupTeaching: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_GROUP";
    const groupTeachingRadio = getRadioInputByTestId(`Radio__${groupTeaching}`);

    const locationAutocomplete = screen.getByTestId("LocationAutocomplete");
    const locationAutocompleteInput = within(locationAutocomplete).getByRole("combobox");

    const courseAutocomplete = screen.getByTestId("CourseAutocomplete");
    const courseAutocompleteInput = within(courseAutocomplete).getByRole("combobox");

    const classAutocompleteInput = getAutocompleteInputByTestId("ClassAutocomplete");

    const selectAutocompleteValues = () => {
        userEvent.click(groupTeachingRadio);

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name 1");

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name 1");

        userEvent.click(classAutocompleteInput);
        selectAutocompleteOptionByLabel("Class Name 1");
    };

    return {
        mockResetFieldHookForm,
        individualTeachingRadio,
        locationAutocomplete,
        locationAutocompleteInput,
        courseAutocomplete,
        courseAutocompleteInput,
        classAutocompleteInput,
        selectAutocompleteValues,
    };
};

describe("FormSectionLessonTeachingMethod", () => {
    const defaultResetValue = { defaultValue: null };

    it("should reset value of course and class when teaching method is changed from group to individual", () => {
        const { individualTeachingRadio, selectAutocompleteValues } = renderComponent();
        selectAutocompleteValues();

        userEvent.click(individualTeachingRadio);

        expect(mockResetFieldHookForm).toBeCalledWith("course", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledWith("classData", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledTimes(2);
    });

    it("should reset value of course and class when location value is changed", () => {
        const { locationAutocompleteInput, selectAutocompleteValues } = renderComponent();
        selectAutocompleteValues();

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name 2");

        expect(mockResetFieldHookForm).toBeCalledWith("course", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledWith("classData", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledTimes(2);
    });

    it("should reset value of course and class when location value is cleared", () => {
        const { locationAutocomplete, selectAutocompleteValues } = renderComponent();
        selectAutocompleteValues();

        const locationClearButton = within(locationAutocomplete).getByTestId("CloseIcon");
        userEvent.click(locationClearButton);

        expect(mockResetFieldHookForm).toBeCalledWith("course", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledWith("classData", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledTimes(2);
    });

    it("should reset value of class when course value is changed", () => {
        const { courseAutocompleteInput, selectAutocompleteValues } = renderComponent();
        selectAutocompleteValues();

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name 2");

        expect(mockResetFieldHookForm).toBeCalledWith("classData", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledTimes(1);
    });

    it("should reset value of class when course value is cleared", () => {
        const { courseAutocomplete, selectAutocompleteValues } = renderComponent();
        selectAutocompleteValues();

        const courseClearButton = within(courseAutocomplete).getByTestId("CloseIcon");
        userEvent.click(courseClearButton);

        expect(mockResetFieldHookForm).toBeCalledWith("classData", defaultResetValue);
        expect(mockResetFieldHookForm).toBeCalledTimes(1);
    });
});
