import { ElementType, forwardRef, HtmlHTMLAttributes } from "react";

import clsx from "clsx";
import { UserIdentity } from "src/typings/auth-provider";

import { SvgIconComponent } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import GlobalLocationsDisplay from "src/components/RelatedUser/GlobalLocationsDisplay";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTranslate from "src/hooks/useTranslate";

const classes = {
    groupProfile: "groupProfile",
    avatar: "avatar",
};

const Wrapper = styled("span")(({ theme }) => ({
    [`& .${classes.groupProfile}`]: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: 14,
        textTransform: "unset",
        cursor: "pointer",
        marginLeft: theme.spacing(4),
        border: "none",
    },
    [`& .${classes.avatar}`]: {
        marginRight: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

export interface UserInfoProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    component?: ElementType;
    profile: UserIdentity;
    icon: SvgIconComponent;
}

const UserInfo = forwardRef((props: UserInfoProps, _ref) => {
    const { profile, component: Component = ButtonBase, className, icon: Icon, ...rest } = props;
    const t = useTranslate();

    return (
        <Wrapper>
            <Component className={clsx(classes.groupProfile, className)} {...rest}>
                <Avatar className={classes.avatar} alt="Avatar" src={profile.avatar}>
                    {getFirstCharOfName(profile.name).toUpperCase()}
                </Avatar>
                <Box mr={0.5} textAlign="left" data-testid="Appbar__role">
                    <TypographyBase variant="body2">
                        {t(`resources.choices.user_group.${profile.userGroup}`, {
                            smart_count: profile.schoolName ? profile.schoolName : 1,
                        })}
                    </TypographyBase>
                    <GlobalLocationsDisplay />
                </Box>
                <Icon color="action" />
            </Component>
        </Wrapper>
    );
});

function getFirstCharOfName(name?: string) {
    return typeof name === "string" ? name[0] : "";
}

export default UserInfo;
