import { Fragment, ReactNode, memo, useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import {
    getAncestralChildrenLocation,
    getAncestralLocationByAccessPath,
    getNodeTreeByRecursive,
} from "src/squads/user/common/helpers/tree-locations";
import { LocationInformation } from "src/squads/user/common/types";

import { Box, Theme } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import type { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import Loading from "src/components/Loading";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import ItemLocation from "./ItemLocation";

import useMapTreeLocations, {
    TreeLocationProps,
    NodeLocationProps,
} from "src/squads/user/hooks/useMapTreeLocations";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface DialogTreeLocationsProps
    extends Omit<DialogWithHeaderFooterProps, "onSave" | "fullWidth" | "maxWidth" | "maxWidthBox"> {
    onAdd?: (checkedList: LocationInformation[]) => void;
    initialCheckedList?: LocationInformation[];
    checkable?: boolean;
    showRootOrg?: boolean;
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

function DialogTreeLocations(props: DialogTreeLocationsProps) {
    const { onAdd, initialCheckedList, checkable = true, showRootOrg = false, ...rest } = props;

    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const { treeLocations, isLoading } = useMapTreeLocations(showRootOrg);

    const [checkedList, setCheckedList] = useState(initialCheckedList || []);

    const onSave = () => {
        if (onAdd) onAdd(checkedList);
    };

    const handleCheckWithIsolateParent = (
        selectedLocations: NodeLocationProps[],
        checked: boolean
    ) => {
        if (!checked) {
            const removedAllChildrenChecked = checkedList.filter(
                (location) => !location.accessPath.includes(selectedLocations[0].accessPath)
            );
            setCheckedList([...removedAllChildrenChecked, selectedLocations[0]]);
            return;
        }
        // get ancestral location checked
        const ancestralLocation = getAncestralLocationByAccessPath(
            selectedLocations[0].accessPath,
            checkedList
        );
        if (ancestralLocation) {
            const cloneCheckedList = [...checkedList];
            const currentLocation = getNodeTreeByRecursive(
                treeLocations[0],
                ancestralLocation.locationId
            );

            const restChildrenLocations = getAncestralChildrenLocation(
                currentLocation,
                selectedLocations[0].accessPath
            );
            const ancestralLocationIndex = cloneCheckedList.findIndex(
                (location) => location.locationId === ancestralLocation?.locationId
            );
            if (ancestralLocationIndex !== -1) {
                cloneCheckedList.splice(ancestralLocationIndex, 1, ...restChildrenLocations);
                setCheckedList(cloneCheckedList);
                return;
            }
        }
        const locationId = selectedLocations[0].locationId;

        const removedItemUnChecked = checkedList.filter((element) => {
            return element.locationId !== locationId;
        });

        setCheckedList(removedItemUnChecked);
    };

    const handleCheck = (
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
    };
    const onCheck = (
        selectedLocations: NodeLocationProps[],
        restOfCheckedLocations: NodeLocationProps[],
        checked: boolean
    ) => {
        if (!checkable) return;
        if (showRootOrg) return handleCheckWithIsolateParent(selectedLocations, checked);
        else return handleCheck(selectedLocations, restOfCheckedLocations, checked);
    };

    const renderSubNote = () => {
        const activeLocationsInCheckedList = checkedList.filter((location) => !location.isArchived);
        const checkedListRender = activeLocationsInCheckedList.slice(0, 5);
        const plusNumber = activeLocationsInCheckedList.length - 5;
        return (
            <Box pt={3}>
                <TypographyPrimary variant="body2" data-testid="DialogTreeLocations__subNote">
                    {`${tStudents("labels.selected")}: ${checkedListRender.map(
                        (location) => " " + location.name
                    )}${plusNumber > 0 ? ", +" + plusNumber : ""}`}
                </TypographyPrimary>
            </Box>
        );
    };

    const renderMainContent = () => {
        if (isLoading) return <Loading />;

        if (!arrayHasItem(treeLocations)) return null;

        const renderItemLocations = (treeLocations: TreeLocationProps[]): ReactNode => {
            return (
                <>
                    {treeLocations.map((option) => {
                        return (
                            <Fragment key={option.locationId}>
                                {!option.disabled ? (
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
                                        isolateParent={showRootOrg}
                                    />
                                ) : null}

                                {option.children ? renderItemLocations(option.children) : null}
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

export default memo(DialogTreeLocations);
