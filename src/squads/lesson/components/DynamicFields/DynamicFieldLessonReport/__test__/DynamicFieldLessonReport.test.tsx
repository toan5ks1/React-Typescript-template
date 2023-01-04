import {
    DynamicFieldsComponentType,
    LessonReportIndividualDynamicComponentType,
} from "src/squads/lesson/common/types";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    generateSampleStudent,
    mockFieldsRender,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import DynamicFieldLessonReport, {
    DynamicFieldLessonReportProps,
} from "src/squads/lesson/components/DynamicFields/DynamicFieldLessonReport";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { render, RenderResult } from "@testing-library/react";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

const renderDynamicFieldMultipleTypeWrapper = (props: DynamicFieldLessonReportProps) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <TestHookFormProvider>
                        <DynamicFieldLessonReport {...props} />
                    </TestHookFormProvider>
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

const dataTestIds = [
    `DynamicFieldBase__autocomplete__FieldIdOf${DynamicFieldsComponentType.AUTOCOMPLETE}`,
    `DynamicFieldBase__textField__FieldIdOf${DynamicFieldsComponentType.TEXT_FIELD}`,
    `DynamicFieldBase__textFieldArea__FieldIdOf${DynamicFieldsComponentType.TEXT_FIELD_AREA}`,
    `DynamicFieldBase__textFieldPercentage__FieldIdOf${DynamicFieldsComponentType.TEXT_FIELD_PERCENTAGE}`,
    `DynamicFieldBase__typography__FieldIdOf${DynamicFieldsComponentType.TYPOGRAPHY}`,
    `DynamicFieldAttendanceStatus__autocomplete__FieldIdOf${LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS}`,
    `DynamicFieldAttendanceRemark__textField__FieldIdOf${LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK}`,
    "ButtonPreviousReport__button",
    "ButtonViewStudyPlan__button",
];

jest.mock("src/squads/lesson/hooks/useGetPartnerFormConfigById", () => {
    const val = [
        {
            fields: [
                {
                    label: {
                        i18n: {
                            fallback_language: "ja",
                            translations: {
                                en: "Homework Submission",
                                ja: "課題",
                                vi: "Homework Submission",
                            },
                        },
                    },
                    field_id: "homework_submission_status",
                    value_type: "VALUE_TYPE_STRING",
                    is_required: true,
                    display_config: {
                        size: {},
                    },
                    component_props: {
                        required: true,
                    },
                    component_config: {
                        type: "TEXT_FIELD_PERCENTAGE",
                    },
                },
            ],
            section_id: "homework_section_id",
            section_name: "homework",
        },
    ];
    return () => val;
});

jest.mock("src/squads/lesson/hooks/usePreviousLessonReport", () => {
    const val = {
        formConfigId: "form_config_id_1",
        dynamicValues: [
            {
                value_type: "VALUE_TYPE_STRING",
                string_value: "string_value 1",
                field_id: "homework_submission_status",
            },
        ],
        attendanceValues: {
            attendance_remark: "attendance_remark 1",
            attendance_status: "attendance_status 1",
        },
    };
    return () => val;
});

describe("<DynamicFieldLessonReport /> testing", () => {
    it("should render field by component type correctly", () => {
        const props: DynamicFieldLessonReportProps = {
            fields: mockFieldsRender,
            reportIndex: 0,
            student: generateSampleStudent("01"),
            lessonReportId: "",
            lessonId: "",
        };

        const wrapper: RenderResult = renderDynamicFieldMultipleTypeWrapper(props);

        dataTestIds.forEach((testId) => {
            expect(wrapper.getAllByTestId(testId)).toHaveLength(1);
        });
    });

    it("should not render anything dynamic field", () => {
        const props: DynamicFieldLessonReportProps = {
            fields: [],
            reportIndex: 0,
            student: generateSampleStudent("01"),
            lessonReportId: "",
            lessonId: "",
        };

        const wrapper: RenderResult = renderDynamicFieldMultipleTypeWrapper(props);

        dataTestIds.forEach((testId) => {
            expect(wrapper.queryAllByTestId(testId)).toHaveLength(0);
        });
    });
});
