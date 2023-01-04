import { FieldArrayWithId, UseFormProps } from "react-hook-form";
import { OptionSelectType } from "src/common/constants/types";
import {
    createMockOrderFormValueWithPackageCourses,
    createMockOrderFormValueWithSlotBasedPackageCourses,
} from "src/squads/payment/test-utils/mocks/order-form";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import PackageCourseDetailsList, {
    PackageCourseDetailsListProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/components/PackageCourseDetailsList/PackageCourseDetailsList";
import {
    DefaultCourseSlot,
    getSlotOptions,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/helper";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

type PackageTypeKey = "default" | "slotBased" | "frequencyBased";

const productIndex = 0;

const orderFormValues: Record<PackageTypeKey, OrderFormValues> = {
    default: createMockOrderFormValueWithPackageCourses(),
    slotBased: createMockOrderFormValueWithSlotBasedPackageCourses(),
    frequencyBased: createMockOrderFormValueWithSlotBasedPackageCourses(),
};

const orderFormProductOption: Record<PackageTypeKey, UseFormProps> = {
    default: { defaultValues: { ...orderFormValues["default"] } },
    slotBased: { defaultValues: { ...orderFormValues["slotBased"] } },
    frequencyBased: { defaultValues: { ...orderFormValues["frequencyBased"] } },
};

const firstStudentIndex = 0;
const mockPackageCourses =
    orderFormValues["default"].students[firstStudentIndex].productFieldArrayItems[productIndex]
        .packageCourses;

const mockSlotBasedPackageCourses =
    orderFormValues["slotBased"].students[firstStudentIndex].productFieldArrayItems[productIndex]
        .packageCourses;

const packageCourses: FieldArrayWithId<
    OrderFormValues,
    `students.${number}.productFieldArrayItems.${number}.packageCourses`,
    "id"
>[] = [
    {
        id: "form_id_1",
        ...mockPackageCourses![0],
    },
    {
        id: "form_id_2",
        ...mockPackageCourses![1],
    },
    {
        id: "form_id_3",
        ...mockPackageCourses![2],
    },
    {
        id: "form_id_4",
        ...mockPackageCourses![3],
    },
];

const slotBasedPackageCourses: FieldArrayWithId<
    OrderFormValues,
    `students.${number}.productFieldArrayItems.${number}.packageCourses`,
    "id"
>[] = [
    {
        id: "form_id_1",
        ...mockSlotBasedPackageCourses![0],
    },
    {
        id: "form_id_2",
        ...mockSlotBasedPackageCourses![1],
    },
    {
        id: "form_id_3",
        ...mockSlotBasedPackageCourses![2],
    },
    {
        id: "form_id_4",
        ...mockSlotBasedPackageCourses![3],
    },
];

const courseOptions: OptionSelectType[] = mockPackageCourses!.map((mockPackageCourse) => {
    return {
        id: mockPackageCourse.course.course_id,
        value: mockPackageCourse.course.name ?? "",
        label: mockPackageCourse.course.name ?? "",
        disabled: false,
    };
});

const slotBasedCourseOptions: OptionSelectType[] = mockSlotBasedPackageCourses!.map(
    (mockSlotBasedPackageCourse) => {
        return {
            id: mockSlotBasedPackageCourse.course.course_id,
            value: mockSlotBasedPackageCourse.course.name ?? "",
            label: mockSlotBasedPackageCourse.course.name ?? "",
            disabled: false,
        };
    }
);

const onCourseSelect = jest.fn();
const onSlotSelect = jest.fn();
const handleDeleteCourse = jest.fn();

const packageCourseDetailsListProps: Record<PackageTypeKey, PackageCourseDetailsListProps> = {
    default: {
        packageType: PackageType.PACKAGE_TYPE_ONE_TIME,
        packageCourses,
        courseOptions,
        onCourseSelect: onCourseSelect,
        handleDeleteCourse: handleDeleteCourse,
    },
    slotBased: {
        packageType: PackageType.PACKAGE_TYPE_SLOT_BASED,
        packageCourses: slotBasedPackageCourses,
        courseOptions: slotBasedCourseOptions,
        onCourseSelect: onCourseSelect,
        handleDeleteCourse: handleDeleteCourse,
        onSlotSelect: onSlotSelect,
    },
    frequencyBased: {
        packageType: PackageType.PACKAGE_TYPE_FREQUENCY,
        packageCourses: slotBasedPackageCourses,
        courseOptions: slotBasedCourseOptions,
        onCourseSelect: onCourseSelect,
        handleDeleteCourse: handleDeleteCourse,
        onSlotSelect: onSlotSelect,
    },
};

const renderPackageCourseDetailsList = (
    _packageCourseDetailsListProps: PackageCourseDetailsListProps = packageCourseDetailsListProps[
        "default"
    ],
    useFormOptions: UseFormProps = orderFormProductOption["default"]
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider useFormOptions={useFormOptions}>
                    <PackageCourseDetailsList {..._packageCourseDetailsListProps} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<PackageCourseDetailsList />", () => {
    it("should render product course names", () => {
        const wrapper = renderPackageCourseDetailsList();

        mockPackageCourses?.forEach((mockPackageCourse) => {
            expect(wrapper.getByText(mockPackageCourse.course.name ?? "")).toBeInTheDocument();
        });
    });

    it("should call handleDeleteCourse with product index when user clicks delete button for not mandatory courses", () => {
        const wrapper = renderPackageCourseDetailsList();

        const deleteButtons = wrapper.getAllByTestId("PackageCourseDetails__delete");

        deleteButtons.forEach((deleteButton, index) => {
            const currentCourse = mockPackageCourses![index];
            if (!currentCourse.packageCourse.mandatory_flag) {
                userEvent.click(deleteButton);
                expect(handleDeleteCourse).toHaveBeenCalledWith(index);
            }
        });
    });

    it("should disable delete button for mandatory courses", () => {
        const wrapper = renderPackageCourseDetailsList();

        const deleteButtons = wrapper.getAllByTestId("PackageCourseDetails__delete");

        deleteButtons.forEach((deleteButton, index) => {
            const currentCourse = mockPackageCourses![index];
            if (currentCourse.packageCourse.mandatory_flag) {
                expect(deleteButton).toBeDisabled();
            }
        });
    });

    it("should call onCourseSelect with course id when user changes select input", () => {
        const mockCourseOption = {
            id: "mock_course_option_id",
            value: "mock_course_option_name",
            label: "mock_course_option_name",
            disabled: false,
        };

        const wrapper = renderPackageCourseDetailsList(
            {
                ...packageCourseDetailsListProps["default"],
                courseOptions: [...courseOptions, mockCourseOption],
            },
            orderFormProductOption["default"]
        );

        const notMandatoryCourseIndex = packageCourses!.findIndex(
            (packageCourse) => !packageCourse.packageCourse.mandatory_flag
        );

        const selectFieldCourse = wrapper.getByText(
            packageCourses![notMandatoryCourseIndex].course.name ?? ""
        );
        userEvent.click(selectFieldCourse);

        const courseOption = wrapper.getByText(mockCourseOption.value);
        userEvent.click(courseOption);

        expect(onCourseSelect).toHaveBeenCalledWith(mockCourseOption.id, notMandatoryCourseIndex);
    });

    describe("when package type is Slot or Frequency based package", () => {
        beforeEach(() => {
            renderPackageCourseDetailsList(
                packageCourseDetailsListProps["slotBased"],
                orderFormProductOption["slotBased"]
            );
        });

        it("should show slot select with default select value is 1", () => {
            const slotSelectField = screen.getAllByTestId("PackageCourseDetailsSlot__select");

            slotSelectField.forEach((slotSelect) => {
                expect(within(slotSelect).getByDisplayValue(DefaultCourseSlot)).toBeInTheDocument();
            });

            expect(slotSelectField.length).toEqual(
                packageCourseDetailsListProps["slotBased"].packageCourses.length
            );
        });

        it("should show slot select option from 1 to max slot value", async () => {
            const listOptions = screen.getAllByText(DefaultCourseSlot);
            userEvent.click(listOptions[productIndex]);

            await waitFor(() => {
                getSlotOptions(slotBasedPackageCourses[productIndex].packageCourse).forEach(
                    (slotOption) => {
                        expect(
                            screen.getByText(slotOption.value, { selector: "li" })
                        ).toBeInTheDocument();
                    }
                );
            });
        });

        it("should call onSlotSelect with slot value and course id when user changes select input", async () => {
            const biggestSlotValue =
                slotBasedPackageCourses[productIndex].packageCourse.max_slots_per_course;

            const listOptions = screen.getAllByText(DefaultCourseSlot);
            userEvent.click(listOptions[productIndex]);

            const slotOption = screen.getByText(biggestSlotValue);
            userEvent.click(slotOption);

            await waitFor(() => {
                expect(onSlotSelect).toHaveBeenCalledWith(
                    biggestSlotValue,
                    slotBasedCourseOptions[productIndex].id,
                    productIndex
                );
            });
        });
    });

    describe("when package type is slot based package", () => {
        beforeEach(() => {
            renderPackageCourseDetailsList(
                packageCourseDetailsListProps["slotBased"],
                orderFormProductOption["slotBased"]
            );
        });

        it("should show slot label of slot select is # Slot", () => {
            const slotSelectField = screen.getAllByTestId("PackageCourseDetailsSlot__select");

            slotSelectField.forEach((slotSelect) => {
                expect(within(slotSelect).getByText("# Slot")).toBeInTheDocument();
            });
        });
    });

    describe("when package type is frequency based package", () => {
        beforeEach(() => {
            renderPackageCourseDetailsList(
                packageCourseDetailsListProps["frequencyBased"],
                orderFormProductOption["frequencyBased"]
            );
        });

        it("should show slot label of slot select is # Slot/wk", () => {
            const slotSelectField = screen.getAllByTestId("PackageCourseDetailsSlot__select");

            slotSelectField.forEach((slotSelect) => {
                expect(within(slotSelect).getByText("# Slot/wk")).toBeInTheDocument();
            });
        });
    });
});
