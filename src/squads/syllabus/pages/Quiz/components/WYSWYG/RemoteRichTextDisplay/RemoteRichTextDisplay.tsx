import { useEffect, useState } from "react";

import axios from "src/internals/axios-client";
import sanitizer from "src/internals/sanitizer";
import logger from "src/squads/syllabus/internals/logger";

import { Box } from "@mui/material";
import Loading from "src/components/Loading";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

// TODO: Refactor component and unit test, Maybe we can using ref
export interface RemoteDisplayRichTextProps {
    url: string;
    maxHeight?: string | number;
}

const notFoundStyle = { color: "red" };
const NotFound = () => {
    const t = useTranslate();

    return <div style={notFoundStyle}>{t(`ra.manabie-error.not_found`)}</div>;
};

const RemoteRichTextDisplay = (props: RemoteDisplayRichTextProps) => {
    const { url, maxHeight } = props;
    const [HTMLContent, setHTMLContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;
        let unmounted = false;

        axios
            .get<string>(url, { headers: { "Content-Type": "text/html" } })
            .then((res) => {
                if (unmounted) return;
                setHTMLContent(sanitizer.forDOM(res.data));
            })
            .catch((err: Error) => {
                logger.warn("Cannot fetch question content", err);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
            unmounted = true;
        };
    }, [url]);

    if (loading) return <Loading size={24} />;
    if (!HTMLContent) return <NotFound />;

    return (
        <Box
            sx={{ maxHeight, overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: HTMLContent }}
        />
    );
};

export default RemoteRichTextDisplay;
