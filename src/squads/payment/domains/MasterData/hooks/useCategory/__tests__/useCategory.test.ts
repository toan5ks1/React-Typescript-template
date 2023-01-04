import {
    InvoiceCategory,
    OrderManagementCategory,
    UserSchoolGroupCategory,
} from "src/squads/payment/constants/master";
import {
    ArchitectureFeatures,
    InvoiceFeatures,
    OrderManagementFeatures,
    PaymentFeaturesType,
} from "src/squads/payment/constants/permission";
import { createMockMasterTypeOptions } from "src/squads/payment/test-utils/mocks/master";

import { SelectChangeEvent } from "@mui/material";

import { renderHook, act } from "@testing-library/react-hooks";
import useCategory from "src/squads/payment/domains/MasterData/hooks/useCategory";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";

jest.mock("src/squads/payment/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useCategory", () => {
    it("should not render any options when no feature toggle is enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });

        const { result } = renderHook(() => useCategory());

        expect(result.current.categoryOptions.length).toBe(0);
    });

    it("should return ArchitectureCategory when the toggle is enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((feature: string) => {
            return {
                isEnabled:
                    feature === ArchitectureFeatures.ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA,
            };
        });

        const { result } = renderHook(() => useCategory());

        const mockOptions = createMockMasterTypeOptions("Architecture");

        expect(result.current.categoryOptions.length).toEqual(3);
        expect(result.current.categoryOptions[0]).toEqual({
            id: mockOptions[2].id,
            value: `resources.masters.choices.masterData.${mockOptions[2].value}`,
            label: mockOptions[2].label,
        });
    });

    it("should return ArchitectureCategory and OrderManagementCategory when both toggles are enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((feature: PaymentFeaturesType) => {
            if (
                feature === OrderManagementFeatures.PAYMENT_MASTER_MANAGEMENT_IMPORT_SELECTIONS ||
                feature === ArchitectureFeatures.ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA
            )
                return {
                    isEnabled: true,
                };

            return {
                isEnabled: false,
            };
        });
        const { result } = renderHook(() => useCategory());

        expect(result.current.categoryOptions.length).toEqual(21);
    });

    it(`should return value correctly when change to ${OrderManagementCategory.AccountingCategory}`, () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const { result } = renderHook(() => useCategory());

        act(() =>
            result.current.onChange({
                target: { value: OrderManagementCategory.AccountingCategory },
            } as SelectChangeEvent<{ name?: string; value: any }>)
        );

        expect(result.current.category).toEqual(OrderManagementCategory.AccountingCategory);
    });

    it(`should return value correctly when change to ${UserSchoolGroupCategory.School}`, () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const { result } = renderHook(() => useCategory());

        act(() =>
            result.current.onChange({
                target: { value: UserSchoolGroupCategory.School },
            } as SelectChangeEvent<{ name?: string; value: any }>)
        );

        expect(result.current.category).toEqual(UserSchoolGroupCategory.School);
    });

    it("should return InvoiceCategory when the toggle is enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((feature: string) => {
            return {
                isEnabled: feature === InvoiceFeatures.SCHEDULED_INVOICES,
            };
        });

        const { result } = renderHook(() => useCategory());

        const mockOptions = createMockMasterTypeOptions("Invoice");
        expect(result.current.categoryOptions.length).toEqual(1);

        expect(result.current.categoryOptions[0]).toEqual({
            id: mockOptions[0].id,
            value: `resources.masters.choices.masterData.${mockOptions[0].value}`,
            label: mockOptions[0].label,
        });
    });

    it(`should return value correctly when change to ${InvoiceCategory.InvoiceSchedule}`, () => {
        (useFeatureToggle as jest.Mock).mockImplementation((feature: string) => {
            return {
                isEnabled: feature === InvoiceFeatures.SCHEDULED_INVOICES,
            };
        });

        const { result } = renderHook(() => useCategory());

        act(() =>
            result.current.onChange({
                target: { value: InvoiceCategory.InvoiceSchedule },
            } as SelectChangeEvent<{ name?: string; value: any }>)
        );

        expect(result.current.category).toEqual(InvoiceCategory.InvoiceSchedule);
    });
});
