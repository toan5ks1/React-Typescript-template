import { Entities } from "src/common/constants/enum";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export type SlotType = "slot" | "slot-per-week";

const useCourseSlotsLabel = (typeSlot: SlotType = "slot") => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    switch (typeSlot) {
        case "slot-per-week":
            return (slot: number) => ` (${slot}/${tOrder("label.wk")})`;

        case "slot":
            return (slot: number) => ` (${slot})`;

        default:
            return () => "";
    }
};

export default useCourseSlotsLabel;
