import { useEffect, useState, useRef } from "react";

export type useTextClampedTypes = {
    textContent: string | number;
};

function useTextClamped(props: useTextClampedTypes) {
    const { textContent } = props;
    const [isClamped, setIsClamped] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            const scrollHeight = ref.current.scrollHeight;
            const clientHeight = ref.current.clientHeight;

            if (scrollHeight === clientHeight) {
                setIsClamped(false);
            } else {
                setIsClamped(true);
            }
        }
    }, [textContent]);

    return { ref, isClamped };
}
export default useTextClamped;
