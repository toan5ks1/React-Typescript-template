import { HTMLAttributes } from "react";

import { TypeEntity } from "src/typings/react-admin";

import { Skeleton, Breadcrumbs as BreadcrumbsLib, Box } from "@mui/material";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import useBreadcrumb from "../../hooks/useBreadcrumb";
import BreadcrumbItem from "./BreadcrumbItem";

import type { Maybe } from "src/__generated__/root-types";
import useTranslate from "src/hooks/useTranslate";

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
    resource: TypeEntity;
    name?: Maybe<string>;
}

function Breadcrumbs({ resource, name }: BreadcrumbsProps) {
    const t = useTranslate();

    const { breadcrumbs, loading } = useBreadcrumb({ resource });

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
                {breadcrumbs.map(({ url, name, translateKey }, index) => {
                    return (
                        <BreadcrumbItem
                            key={index}
                            to={url}
                            name={translateKey ? t(translateKey) : name}
                        />
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
}

export default Breadcrumbs;
