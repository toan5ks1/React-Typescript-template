import { Fragment, ReactNode, useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { LocationInformation } from "src/squads/syllabus/common/types/common";

import { Box, Theme } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import type { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import Loading from "src/components/Loading";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import ItemLocation from "./ItemLocation";

import useMapTreeLocations, {
    NodeLocationProps,
    TreeLocationProps,
} from "src/squads/syllabus/hooks/useMapTreeLocations";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useSafeSetState from "src/squads/syllabus/hooks/useSafeState";

export interface DialogTreeLocationsProps
    extends Omit<DialogWithHeaderFooterProps, "onSave" | "fullWidth" | "maxWidth" | "maxWidthBox"> {
    onAdd?: (checkedList: LocationInformation[]) => void;
    initialCheckedList?: LocationInformation[];
}

const sx = {
    dialogContent: (theme: Theme) => ({
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.border?.main,
        marginTop: theme.spacing(1.4),
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(1.5),
        height: "100%",
        maxHeight: `calc(100vh - ${theme.spacing(38)})`,
        overflow: "auto",
    }),
    itemLocation: (theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "auto",
    }),
    textLabel: (theme: Theme) => ({
        marginLeft: theme.spacing(0.5),
    }),
    checkbox: (theme: Theme) => ({
        paddingLeft: theme.spacing(0.5),
    }),
};

export default function DialogTreeLocations(props: DialogTreeLocationsProps) {
    const { onAdd, initialCheckedList, ...rest } = props;

    const tCourse = useResourceTranslate(Entities.COURSES);

    const { treeLocations, isLoading } = useMapTreeLocations();

    const [checkedList, setCheckedList] = useSafeSetState(initialCheckedList || []);

    const onSave = () => {
        onAdd && onAdd(checkedList);
    };

    const onCheck = useCallback(
        (
            selectedLocations: NodeLocationProps[],
            restOfCheckedLocations: NodeLocationProps[],
            checked: boolean
        ) => {
            // add location into checkedList
            if (!checked) {
                setCheckedList([...checkedList, ...restOfCheckedLocations]);
                return;
            }
            // Deleted location to checkedList
            const locationIds = selectedLocations.map((leaf) => leaf.locationId);

            const removedListItemUnChecked = checkedList.filter((element) => {
                return !locationIds.includes(element.locationId);
            });

            setCheckedList(removedListItemUnChecked);
        },
        [checkedList, setCheckedList]
    );
    const renderSubNote = useCallback(() => {
        const activeLocationsInCheckedList = checkedList.filter((location) => !location.isArchived);
        const checkedListRender = activeLocationsInCheckedList.slice(0, 5);
        const plusNumber = activeLocationsInCheckedList.length - 5;
        return (
            <Box pt={3}>
                <TypographyPrimary variant="body2" data-testid="DialogTreeLocations__subNote">
                    {`${tCourse("labels.selected")}: ${checkedListRender.map(
                        (location) => " " + location.name
                    )}${plusNumber > 0 ? ", +" + plusNumber : ""}`}
                </TypographyPrimary>
            </Box>
        );
    }, [checkedList, tCourse]);

    const renderMainContent = () => {
        if (isLoading) return <Loading />;

        if (!arrayHasItem(treeLocations)) return null;

        const renderItemLocations = (treeLocations: TreeLocationProps[]): ReactNode => {
            return (
                <>
                    {treeLocations.map((option) => {
                        return (
                            <Fragment key={option.locationId}>
                                {!option.disabled && (
                                    <ItemLocation
                                        size="small"
                                        color="primary"
                                        option={option}
                                        onCheck={onCheck}
                                        keyShowValue="name"
                                        keyCompareEqual="locationId"
                                        checkedList={checkedList}
                                        sxItem={sx.itemLocation}
                                        sxText={sx.textLabel}
                                        sxCheckbox={sx.checkbox}
                                    />
                                )}

                                {option.children && renderItemLocations(option.children)}
                            </Fragment>
                        );
                    })}
                </>
            );
        };

        return (
            <Box sx={sx.dialogContent} data-testid="DialogTreeLocations__tree">
                {renderItemLocations(treeLocations)}
            </Box>
        );
    };

    return (
        <DialogWithHeaderFooter
            {...rest}
            onSave={onSave}
            fullWidth
            maxWidth="md"
            maxWidthBox="md"
            data-testid="DialogTreeLocations"
        >
            {renderMainContent()}
            {renderSubNote()}
        </DialogWithHeaderFooter>
    );
}
