import { render, screen } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import useCourseSlotsLabel, {
    SlotType,
} from "src/squads/payment/domains/OrderManagement/hooks/useCourseSlotsLabel";

interface UseCourseSlotsLabelProps {
    typeSlot: SlotType;
    slot: number;
}
describe("useCourseSlotsLabel", () => {
    const defaultProps: UseCourseSlotsLabelProps = {
        typeSlot: "slot",
        slot: 2,
    };

    const CourseSlotLabel = (props: UseCourseSlotsLabelProps) => {
        const { typeSlot, slot } = props;
        const getSlotLabel = useCourseSlotsLabel(typeSlot);

        return <div>slot: {getSlotLabel(slot)}</div>;
    };

    const TestComponent = (props: UseCourseSlotsLabelProps) => {
        return (
            <TranslationProvider>
                <CourseSlotLabel {...props} />
            </TranslationProvider>
        );
    };

    const renderTestComponent = (
        props: { typeSlot?: SlotType; slot?: number } = { ...defaultProps }
    ) => {
        const finalProps = { ...defaultProps, ...props };

        render(<TestComponent {...finalProps} />);
    };

    it("should return slot without label when slot type is 'slot'", () => {
        const props: UseCourseSlotsLabelProps = { ...defaultProps };
        renderTestComponent();

        const expectedSlotContent = `slot: (${props.slot})`;
        expect(screen.getByText(expectedSlotContent)).toBeInTheDocument();
    });

    it("should return slot with slot-per-week label when slot type is 'slot-per-week'", () => {
        const typeSlot: SlotType = "slot-per-week";
        renderTestComponent({ typeSlot });

        const expectedSlotContent = `slot: (${defaultProps.slot}/wk)`;
        expect(screen.getByText(expectedSlotContent)).toBeInTheDocument();
    });

    it("should return correct slot number without label when slot type is 'slot'", () => {
        const expectedSlot = 10;
        renderTestComponent({ slot: expectedSlot });

        const expectedSlotContent = `slot: (${expectedSlot})`;
        expect(screen.getByText(expectedSlotContent)).toBeInTheDocument();
    });

    it("should return correct slot number with slot-per-week label when slot type is 'slot-per-week'", () => {
        const expectedSlot = 10;
        renderTestComponent({ typeSlot: "slot-per-week", slot: expectedSlot });

        const expectedSlotContent = `slot: (${expectedSlot}/wk)`;
        expect(screen.getByText(expectedSlotContent)).toBeInTheDocument();
    });

    it("should return empty when slot type is not in 'SlotType'", () => {
        const typeSlot = "no-slot" as SlotType;
        renderTestComponent({ typeSlot });

        const expectedSlotContent = `slot:`;
        expect(screen.getByText(expectedSlotContent)).toBeInTheDocument();
    });
});
