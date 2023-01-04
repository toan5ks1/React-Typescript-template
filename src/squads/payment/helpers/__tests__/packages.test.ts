import { getTotalSelectedSlotPackages } from "src/squads/payment/helpers/packages";
import { createSlotBasedPackageCourses } from "src/squads/payment/test-utils/mocks/package-course";
import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";

describe("getTotalSelectedSlotPackages", () => {
    it("should return total selected slot package", () => {
        const mockSlotBasedPackageCourses = createSlotBasedPackageCourses();
        const multiplePackageCourses: ProductFormPackageCourseType[] =
            mockSlotBasedPackageCourses.flatMap((packageCourse) =>
                Array(mockSlotBasedPackageCourses.length + 1).fill(packageCourse)
            );

        const totalSelectedSlot: number = multiplePackageCourses.reduce(
            (total, { slot }) => total + (slot || 0),
            0
        );

        expect(getTotalSelectedSlotPackages(multiplePackageCourses)).toEqual(totalSelectedSlot);
    });
});
