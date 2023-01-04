import PackageCourseSlotInformation, {
    PackageCourseSlotInformationProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/components/PackageCourseSlotInformation/PackageCourseSlotInformation";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";

type PackageTypeKey = "default" | "slotBased";

const TOTAL_SELECTED_SLOT = 4;
const MAX_SLOT = 8;

const packageCourseSlotInformationProps: Record<PackageTypeKey, PackageCourseSlotInformationProps> =
    {
        default: {
            visible: false,
            totalSelectedSlot: undefined,
            maxSlot: undefined,
        },
        slotBased: {
            visible: true,
            totalSelectedSlot: TOTAL_SELECTED_SLOT,
            maxSlot: MAX_SLOT,
        },
    };

const renderPackageCourseDetailsList = (
    _packageCourseDetailsListProps: PackageCourseSlotInformationProps = packageCourseSlotInformationProps[
        "default"
    ]
) => {
    return render(
        <TestApp>
            <PackageCourseSlotInformation {..._packageCourseDetailsListProps} />
        </TestApp>
    );
};

describe("<PackageCourseSlotInformation />", () => {
    describe("when the package type does not have any slot option", () => {
        it("should not render anything", () => {
            const { container } = renderPackageCourseDetailsList();

            expect(container.firstChild).toBeNull();
        });
    });

    describe("when package type is slot based package", () => {
        beforeEach(() => {
            renderPackageCourseDetailsList(packageCourseSlotInformationProps["slotBased"]);
        });

        it("should render the slot information", () => {
            const totalSelectedSlot =
                packageCourseSlotInformationProps["slotBased"].totalSelectedSlot;
            const maxSlot = packageCourseSlotInformationProps["slotBased"].maxSlot;
            const expectedSlotInformation = `${totalSelectedSlot}/${maxSlot} Slots`;

            expect(screen.getByText(expectedSlotInformation)).toBeInTheDocument();
        });
    });
});
