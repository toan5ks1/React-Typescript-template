import { useState } from "react";

import { Features, NotifyTypes } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { GlobalLocationTypes } from "src/internals/reactive-storage";

import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { AppBar as MuiAppBar, Toolbar, Divider, Box, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import UserDropdown from "src/components/Layout/AppBar/UserDropdown";
import LocaleSwitcher from "src/components/Layout/LocaleSwitcher";
import RedirectDialogLocation from "src/components/RelatedUser/RedirectDialogLocation";
import { LogoIcon } from "src/components/SvgIcons";

import useFeatureToggle from "src/hooks/useFeatureToggle";
import useGetLocalProfile from "src/hooks/useGetLocalProfile";
import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations";
import useShowSnackbar from "src/hooks/useShowSnackbar";
import useToggleSidebar from "src/hooks/useToggleSidebar";
import useTranslate from "src/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

const MenuButton = styled(ButtonBase)(({ theme }) => ({
    minWidth: "unset",
    padding: theme.spacing(0.75, 1),
}));
MenuButton.displayName = "MenuButton";

const sx = {
    root: (theme: Theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        fontWeight: 500,
        fontSize: 14,
        backgroundColor: theme.palette.common?.white,
        boxShadow: "none",
        marginLeft: 0,
        width: `100%`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    toolbar: (theme: Theme) => ({
        justifyContent: "space-between",
        display: "flex",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }),
};

export interface AppBarProps {
    sidebarOpen?: boolean;
}

const AppBar = ({ sidebarOpen }: AppBarProps) => {
    const toggleSidebar = useToggleSidebar();
    const showSnackBar = useShowSnackbar();
    const { userProfile } = useGetLocalProfile();
    const t = useTranslate();

    // For Location Selection dialog
    const [isOpenLocationSelectionDialog, setIsOpenLocationSelectionDialog] = useState(false);
    const { sortedLocationTypesWithLocations, setLocationTypesWithLocations } =
        useGlobalLocationTypesWithLocations();
    const { isEnabled: shouldEnableLocationSelect } = useFeatureToggle(
        Features.GLOBAL_NAV_LOCATION_SELECT
    );

    const { isEnabled: shouldEnableSelectFirstLocation } = useFeatureToggle(
        Features.ARCHITECTURE_ACCESSCONTROL_BACK_OFFICE_AUTO_SELECT_FIRST_LOCATION
    );
    const onClickLocationSettingMenuItem = shouldEnableLocationSelect
        ? () => setIsOpenLocationSelectionDialog(true)
        : undefined;

    const showLocationAppliedSuccessfullyMessage = () => {
        showSnackBar(t("ra.message.youHaveAppliedLocationSuccessfully"));
    };

    const isEmptyLocation = (locationTypes: GlobalLocationTypes) => {
        const centerType = locationTypes.find((locationType) => locationType.name === "center");
        return !arrayHasItem(centerType?.locations);
    };

    const showErrorEmptyLocationMessage = () => {
        showSnackBar(t("ra.message.emptyLocation"), NotifyTypes.ERROR);
    };

    const onSubmitLocation = (locationTypes: GlobalLocationTypes) => {
        if (isEmptyLocation(locationTypes) && shouldEnableSelectFirstLocation) {
            showErrorEmptyLocationMessage();
            return;
        }
        setLocationTypesWithLocations(locationTypes);
        setIsOpenLocationSelectionDialog(false);
        showLocationAppliedSuccessfullyMessage();
    };
    // For multi-tenant login
    const isEnabledLoginMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    return (
        <MuiAppBar sx={sx.root} position="fixed" data-testid="AppBar">
            <Toolbar disableGutters sx={sx.toolbar}>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    height={"100%"}
                >
                    <Box p={1} pl={0} mr={2}>
                        <MenuButton
                            aria-label="AppbarChevron"
                            data-testid="Appbar__chevron"
                            variant="outlined"
                            onClick={() => toggleSidebar()}
                        >
                            {sidebarOpen ? (
                                <ChevronLeftIcon data-testid="Appbar__chevronLeft" />
                            ) : (
                                <ChevronRightIcon data-testid="Appbar__chevronRight" />
                            )}
                        </MenuButton>
                    </Box>
                    {!isEnabledLoginMultiTenant && (
                        <Box m="auto" maxWidth={200}>
                            <LogoIcon data-testid="Appbar__logo" variant="primary" />
                        </Box>
                    )}
                </Box>

                <Box display="flex" flexDirection="row" alignItems="center">
                    <LocaleSwitcher />
                    {userProfile && (
                        <UserDropdown
                            userProfile={userProfile}
                            onChangeLocationSetting={onClickLocationSettingMenuItem}
                        />
                    )}
                    {shouldEnableLocationSelect && (
                        <RedirectDialogLocation
                            isOpen={isOpenLocationSelectionDialog}
                            onCloseDialog={() => setIsOpenLocationSelectionDialog(false)}
                            onSubmitLocationDialog={onSubmitLocation}
                            persistedLocationTypes={sortedLocationTypesWithLocations}
                            updatePersistedLocationTypes={setLocationTypesWithLocations}
                        />
                    )}
                </Box>
            </Toolbar>
            <Divider />
        </MuiAppBar>
    );
};

export default AppBar;
