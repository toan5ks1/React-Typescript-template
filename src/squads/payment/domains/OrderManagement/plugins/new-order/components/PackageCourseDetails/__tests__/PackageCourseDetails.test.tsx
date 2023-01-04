import { UseFormProps } from "react-hook-form";
import { createMockOrderFormValueWithPackageCourses } from "src/squads/payment/test-utils/mocks/order-form";
import {
    createMockCourseList,
    createMockPackageCourseList,
    createMockPackageCourseOptional,
} from "src/squads/payment/test-utils/mocks/package-course";
import { PackageCourseType } from "src/squads/payment/types/service/package-course-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import PackageCourseDetails, {
    PackageCourseDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/PackageCourseDetails";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const defaultOrderFormValuesWithPackageCourses = createMockOrderFormValueWithPackageCourses();

const mockPackageCourseOptional = createMockPackageCourseOptional();
const defaultOrderFormValuesWithNoMandatoryPackageCourses =
    createMockOrderFormValueWithPackageCourses(mockPackageCourseOptional);

const defaultOnePackageCourse = createMockOrderFormValueWithPackageCourses(
    mockPackageCourseOptional?.filter((_, index) => index === 0)
);

const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...defaultOrderFormValuesWithPackageCourses },
};
const productIndex = 0;
const firstStudentIndex = 0;

const mockPackageCourses = createMockPackageCourseList();
const mockCourses = createMockCourseList();

const defaultPackageCourseDetailsProps: PackageCourseDetailsProps = {
    packageType: PackageType.PACKAGE_TYPE_ONE_TIME,
    productFieldArrayItem:
        defaultOrderFormValuesWithPackageCourses.students[firstStudentIndex].productFieldArrayItems[
            productIndex
        ],
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
    onPackageCoursesChange: jest.fn(),
};

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useCourses", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockCourses,
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/usePackageCourses", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockPackageCourses,
        }),
    };
});

jest.mock(
    "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/usePackageCoursesInteractions",
    () => {
        return {
            __esModule: true,
            default: () => ({
                packageCourseOptions: mockCourses.map((item) => ({
                    id: item.course_id,
                    value: item.name ?? "",
                    label: item.name ?? "",
                    disabled: false,
                })),
                totalSelectedSlot: 1,
                addPackageCourse: jest.fn(),
                onPackageCourseSelect: jest.fn(),
                removePackageCourse: jest.fn(),
                appendMandatoryOrDefaultCourses: jest.fn(),
                onSlotSelect: jest.fn(),
            }),
        };
    }
);

const renderPackageCourseDetails = (
    packageCourseDetailsProps: PackageCourseDetailsProps = defaultPackageCourseDetailsProps,
    useFormOptions: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider useFormOptions={useFormOptions}>
                    <PackageCourseDetails {...packageCourseDetailsProps} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<PackageCourseDetails />", () => {
    it("should render package course details root ", () => {
        const wrapper = renderPackageCourseDetails();
        expect(wrapper.getByTestId("PackageCourseDetails__root")).toBeInTheDocument();
    });

    it("should show mandatory courses by default", () => {
        const wrapper = renderPackageCourseDetails();
        const mandatoryPackageCourseIds: PackageCourseType["course_id"][] = [];

        mockPackageCourses.forEach((course) => {
            if (course.mandatory_flag) {
                mandatoryPackageCourseIds.push(course.course_id);
            }
        });

        const courseDetails = mockCourses.filter((courseDetails) =>
            mandatoryPackageCourseIds.includes(courseDetails.course_id)
        );
        expect(courseDetails).toHaveLength(2);

        courseDetails.forEach((detail) => {
            expect(wrapper.getByText(detail!.name as string)).toBeInTheDocument();
        });
    });

    it("should show first available course when there is no mandatory courses", () => {
        const wrapper = renderPackageCourseDetails(defaultPackageCourseDetailsProps, {
            defaultValues: { ...defaultOrderFormValuesWithNoMandatoryPackageCourses },
        });
        const courseDetails = pick1stElement(mockCourses);

        expect(wrapper.getByText(courseDetails!.name as string)).toBeInTheDocument();
    });

    it("should disable delete button for mandatory courses and show tooltip", () => {
        const wrapper = renderPackageCourseDetails();
        const mandatoryPackageCourseIds: PackageCourseType["course_id"][] = [];

        const deleteCourseButtons = wrapper.queryAllByTestId("PackageCourseDetails__delete");

        mockPackageCourses.forEach((course, index) => {
            if (course.mandatory_flag) {
                mandatoryPackageCourseIds.push(course.course_id);
                expect(deleteCourseButtons[index]).toBeDisabled();
            }
        });

        expect(wrapper.getAllByLabelText("Can't delete mandatory course")).toHaveLength(
            mandatoryPackageCourseIds.length
        );
    });

    it("should disable delete button for first available course and show tooltip", () => {
        const wrapper = renderPackageCourseDetails(defaultPackageCourseDetailsProps, {
            defaultValues: { ...defaultOnePackageCourse },
        });

        const deleteCourseButton = wrapper.getByTestId("PackageCourseDetails__delete");

        expect(deleteCourseButton).toBeDisabled();

        expect(wrapper.getByLabelText("At least one course must be selected")).toBeInTheDocument();
    });

    // TODO: Will investigate why RHF method doesn't work
    it.skip("should disable add button when there are no courses available anymore", () => {
        const wrapper = renderPackageCourseDetails();

        const addCourseButton = wrapper.getByTestId("PackageCourseDetails__addButton");
        mockCourses.forEach((_, index) => {
            if (index < mockCourses.length - 1) {
                userEvent.click(addCourseButton);
            }
        });
        expect(addCourseButton).toBeDisabled();
        expect(
            wrapper.getByLabelText("Can’t add more courses because maximum course reached")
        ).toBeInTheDocument();
    });

    it.skip("should delete not mandatory courses when user clicks delete button", () => {
        const productIndex = 0;
        const wrapper = renderPackageCourseDetails();
        const addCourseButton = wrapper.getByTestId("PackageCourseDetails__addButton");
        userEvent.click(addCourseButton);
        const deleteCourseButton = wrapper.queryAllByTestId("PackageCourseDetails__delete");
        userEvent.click(deleteCourseButton[productIndex]);
        expect(wrapper.queryByText(mockCourses[productIndex].name ?? "")).not.toBeInTheDocument();
    });

    // TODO: Review in LT-15063
    it("should show first available option when clicking add button", () => {
        // Given a user that has selected product with type of package
        // When user clicks on add course button
        // Then user sees new course option row pre-filled with next available course
        const wrapper = renderPackageCourseDetails(defaultPackageCourseDetailsProps, {
            defaultValues: { ...defaultOnePackageCourse },
        });

        const defaultSelect = wrapper.getByTestId("PackageCourseDetails__select");

        // Text content appends `Name` to the end of the value (e.g. Course name 1Name) so we replace it
        const defaultCourseName = defaultSelect.textContent?.replace("Name", "");

        const addCourseButton = wrapper.getByTestId("PackageCourseDetails__addButton");
        userEvent.click(addCourseButton);

        const availableCourse = mockCourses.find(
            (mockCourse) => mockCourse.name !== defaultCourseName
        );

        expect(wrapper.getByText(availableCourse!.name ?? "")).toBeInTheDocument();
    });

    // TODO: Review in LT-15063
    it("should change product on selecting different course option", () => {
        const selectLabel = "Course Association";
        const wrapper = renderPackageCourseDetails(defaultPackageCourseDetailsProps, {
            defaultValues: { ...defaultOnePackageCourse },
        });

        const addCourseButton = wrapper.getByTestId("PackageCourseDetails__addButton");
        userEvent.click(addCourseButton);

        const courseSelects = wrapper.getAllByTestId("PackageCourseDetails__select");

        const defaultCourses = courseSelects.map((courseSelect) => {
            // Text content appends `Name` to the end of the value (e.g. Course name 1Course Association) so we replace it
            return courseSelect.textContent?.replace(selectLabel, "");
        });

        // Get option that is not taken by any select input
        const unselectedCourse = mockCourses.find(
            (mockCourse) => !defaultCourses?.includes(mockCourse?.name ?? "")
        );

        const firstCourseSelect = pick1stElement(courseSelects);
        userEvent.click(firstCourseSelect as HTMLElement);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");

        expect(wrapper.getByText(unselectedCourse?.name ?? "")).toBeInTheDocument();
    });
});
