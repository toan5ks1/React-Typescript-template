import { useCallback, useState } from "react";

export default function useDisplayTooltip() {
    const [shouldDisplayTooltip, setShouldDisplayTooltip] = useState(false);

    const handleMouseEnter: React.MouseEventHandler<HTMLElement> = useCallback((e) => {
        if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
            setShouldDisplayTooltip(true);
        } else {
            setShouldDisplayTooltip(false);
        }
    }, []);

    return { handleMouseEnter, shouldDisplayTooltip };
}
