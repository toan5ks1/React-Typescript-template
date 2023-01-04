import { useState } from "react";

import { UserIdentity } from "src/typings/auth-provider";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import { styled } from "@mui/material/styles";
import UserInfo from "src/components/RelatedUser/UserInfo";
import UserMenu from "src/components/RelatedUser/UserMenu";

import useLogout from "src/squads/user/hooks/auth/useLogout";

const StyledUserInfo = styled(UserInfo)({
    paddingRight: 0,
});
StyledUserInfo.displayName = "StyledUserInfo";

export interface UserDropdownProps {
    userProfile: UserIdentity;
    onChangeLocationSetting: (() => void) | undefined;
}

const UserDropdown = ({ userProfile, onChangeLocationSetting }: UserDropdownProps) => {
    const { onLogout } = useLogout();
    const [expandUser, setExpandUser] = useState(false);
    return (
        <UserMenu
            onLogout={onLogout}
            onOpenCallBack={(isOpen) => {
                setExpandUser(isOpen);
            }}
            onOpenLocationSetting={onChangeLocationSetting}
        >
            <StyledUserInfo
                data-testid="Appbar__profileButton"
                profile={userProfile}
                icon={expandUser ? ArrowDropUp : ArrowDropDown}
            />
        </UserMenu>
    );
};

export default UserDropdown;
