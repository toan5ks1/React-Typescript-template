import { HTMLAttributes } from "react";

import { Skeleton, Breadcrumbs as BreadcrumbsLib, Box } from "@mui/material";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import BreadcrumbItem from "./BreadcrumbItem";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
    breadcrumbInfos: {
        url: string;
        name?: string;
        translateKey: string;
    }[];
    name?: string | null;
    loading: boolean;
}

const Breadcrumbs = ({ breadcrumbInfos, name, loading }: BreadcrumbsProps) => {
    const t = useTranslate();

    if (loading || typeof name === "undefined" || name === null) {
        //to avoid act in unit-test, loading when fetching data by useBreadcrumb. name when fetching outside
        const testId = loading ? "Breadcrumbs__skeleton--loading" : "Breadcrumbs__skeleton";

        return (
            <Box mb={0.5}>
                <Skeleton data-testid={testId} height={24} width="100%" />
            </Box>
        );
    }

    return (
        <Box mb={0.5}>
            <BreadcrumbsLib aria-label="breadcrumb">
                {breadcrumbInfos.map(({ url, name, translateKey }, index) => {
                    return (
                        <BreadcrumbItem key={index} to={url} name={name ? name : t(translateKey)} />
                    );
                })}
                <TypographyShortenStr
                    data-testid="Breadcrumbs__entityName"
                    color="textPrimary"
                    maxLength={30}
                    variant="caption"
                >
                    {name}
                </TypographyShortenStr>
            </BreadcrumbsLib>
        </Box>
    );
};

export default Breadcrumbs;
