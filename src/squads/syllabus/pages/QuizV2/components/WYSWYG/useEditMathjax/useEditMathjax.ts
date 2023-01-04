import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import useInstallMathjax from "../useInstallMathJax";

function useEditMathjax(getInitialTex: () => string) {
    const [texValue, setTexValue] = useState<string>(getInitialTex);
    const nodeMathJax = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);
    const { mathJaxHub } = useInstallMathjax();

    const onTexChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setTexValue(event.target.value);
    }, []);

    useEffect(() => {
        const typeset = async () => {
            if (mathJaxHub) {
                const elemMathJax = await mathJaxHub.tex2svgPromise(texValue);

                requestAnimationFrame(() => {
                    if (nodeMathJax.current) {
                        nodeMathJax.current.innerHTML = "";
                        nodeMathJax.current.appendChild(elemMathJax);
                    }

                    const errorNodes = elemMathJax.querySelectorAll(`[data-mml-node="merror"]`);
                    setHasError(errorNodes.length > 0);
                });
            }
        };

        void typeset();
    }, [texValue, mathJaxHub, nodeMathJax]);

    return {
        hasError,
        nodeMathJax,
        value: texValue,
        onTexChange,
    } as const;
}

export default useEditMathjax;
