import { useMemo } from "react";

import { EditorState } from "draft-js";
import { ERPModules } from "src/common/constants/enum";
import { convertRawToState } from "src/common/utils/draft-js";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { joinArrayObjectString } from "src/squads/communication/common/utils/utils";

import { ArrowDropDown } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import ButtonDropdownWithPopover from "src/components/Buttons/ButtonDropdownWithPopover";
import DoubleDash from "src/components/DoubleDash";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import GeneralInfoRow from "src/squads/communication/pages/Notification/components/Tables/GeneralInfoRow";
import InfoNotificationDetailSentTable from "src/squads/communication/pages/Notification/components/Tables/InfoNotificationDetailSentTable";
import Editor from "src/squads/communication/pages/Notification/components/WYSWYG/Editor";

import "./styles.css";

import { arrayHasItem } from "@manabie-com/mana-utils";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { UseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import { UseTagsSelectedByNotificationIdReturn } from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";

export interface NotificationGeneralInfoProps {
    notificationInfo: UseNotificationDetailReturn["notificationInfo"];
    notificationMsgDetail: UseNotificationMsgDetailReturn["notificationMsgDetail"];
    courses: UseNotificationDetailReturn["courses"];
    receivers: UseNotificationDetailReturn["receivers"];
    mediaList: UseNotificationMsgDetailReturn["mediaList"];
    tags: UseTagsSelectedByNotificationIdReturn["data"];
}

const MAX_WIDTH_CONTENT = 486;

const NotificationGeneralInfo = ({
    notificationInfo,
    notificationMsgDetail,
    courses,
    receivers,
    mediaList,
    tags,
}: NotificationGeneralInfoProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const { isEnabled: isShowTagFeature } = useFeatureToggle(Features.NOTIFICATION_TAGS);

    const rawContent = useMemo(() => {
        return convertRawToState(notificationMsgDetail?.content?.raw) ?? EditorState.createEmpty();
    }, [notificationMsgDetail?.content]);

    const renderRecipientDropdownContent = useMemo(
        () =>
            notificationInfo && (
                <InfoNotificationDetailSentTable
                    courses={courses}
                    notificationInfo={notificationInfo}
                    receivers={receivers}
                />
            ),
        [courses, notificationInfo, receivers]
    );

    const renderNotificationAttachment = useMemo(
        () =>
            arrayHasItem(mediaList) ? (
                <ListMediaChipsBase medias={mediaList} />
            ) : (
                <TypographyBase variant="body2">
                    <DoubleDash />
                </TypographyBase>
            ),
        [mediaList]
    );

    const renderNotificationTags = useMemo(() => {
        if (!tags || !arrayHasItem(tags)) {
            return (
                <TypographyBase variant="body2">
                    <DoubleDash />
                </TypographyBase>
            );
        }

        const tagNames = joinArrayObjectString(tags, "tag_name");

        return tagNames;
    }, [tags]);

    return (
        <Grid container spacing={2} data-testid="NotificationGeneralInfo__container">
            <GeneralInfoRow label="label.to">
                <ButtonDropdownWithPopover
                    disableElevation
                    endIcon={<ArrowDropDown />}
                    popoverPosition="bottom-center"
                    dropdownContent={renderRecipientDropdownContent}
                    variant="text"
                    color="inherit"
                    isAdvancedFilterButton={false}
                >
                    <TypographyBase variant="body2">
                        {tNotification(`label.recipient`)}
                    </TypographyBase>
                </ButtonDropdownWithPopover>
            </GeneralInfoRow>

            {isShowTagFeature ? (
                <GeneralInfoRow label="label.tags">
                    <Box pl={1} data-testid="NotificationGeneralInfo__tags">
                        {renderNotificationTags}
                    </Box>
                </GeneralInfoRow>
            ) : null}
            <GeneralInfoRow label="label.content">
                <Editor
                    style={{ maxWidth: MAX_WIDTH_CONTENT }}
                    readOnly
                    editorState={rawContent}
                    displayOnly
                />
            </GeneralInfoRow>

            <GeneralInfoRow label="label.attachment">
                <Box pl={1}>{renderNotificationAttachment}</Box>
            </GeneralInfoRow>
        </Grid>
    );
};

export default NotificationGeneralInfo;
