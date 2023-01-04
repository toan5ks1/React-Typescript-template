import { useEffect, useState } from "react";

import { MathJaxLoadStatus, NotifyTypes } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useInstallMathjax = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const [mathJaxHub, setMathJaxHub] = useState<any | null>(null);
    const [loadStatus, setLoadStatus] = useState(MathJaxLoadStatus.LOADED);

    const initializeMathJax = () => {
        if (window.MathJax?.config) {
            setLoadStatus(MathJaxLoadStatus.LOADED);
            setMathJaxHub(window.MathJax);
            return;
        }

        const mathJaxScript = document.getElementById("mathJaxScript");
        if (!mathJaxScript) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js";
            script.id = "mathJaxScript";
            script.async = true;

            window.MathJax = {
                tex: {
                    inlineMath: [
                        ["$", "$"],
                        ["\\(", "\\)"],
                    ],
                    processEscapes: true,
                },
                startup: {
                    typeset: false, // Perform initial typeset?
                    ready: () => {
                        window.MathJax.startup.defaultReady();
                        logger.info("MathJax is initialized");
                        setMathJaxHub(window.MathJax);
                        setLoadStatus(MathJaxLoadStatus.LOADED);
                    },
                },
                options: {
                    renderActions: {
                        assistiveMml: [], // disable assistive mathml
                    },
                    menuOptions: {
                        settings: {
                            assistiveMml: false,
                        },
                    },
                },
                loader: { load: ["[tex]/mhchem"] },
                packages: { "[+]": ["mhchem"] },
            };

            document.head.insertAdjacentElement("beforeend", script);
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!window.MathJax?.config) {
            setLoadStatus(MathJaxLoadStatus.NOT_INJECTED);
            initializeMathJax();
            let retries = 5;

            const interval = setInterval(() => {
                if (window.MathJax?.config) {
                    setLoadStatus(MathJaxLoadStatus.LOADED);
                    clearInterval(interval);
                } else {
                    retries -= 1;
                }

                if (!retries) {
                    logger.error("[useInstallMathjax]", t("ra.manabie-error.mathJaxLoadTooLong"));

                    showSnackbar(t("ra.manabie-error.mathJaxLoadTooLong"), NotifyTypes.ERROR);
                    clearInterval(interval);
                    setLoadStatus(MathJaxLoadStatus.LOADED);
                }
            }, 1000);
        } else {
            setLoadStatus(MathJaxLoadStatus.INJECTED);
            initializeMathJax();
        }
    }, [loadStatus, showSnackbar, t]);

    return {
        mathJaxHub,
        loadStatus,
    };
};

export default useInstallMathjax;
