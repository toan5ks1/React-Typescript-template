import { useCallback } from "react";

import { Features } from "src/squads/communication/common/constants/feature-keys";
import reactiveStorage from "src/squads/communication/internals/reactive-storage";

import { communicationSidebarItems, ICommunicationSidebarItems } from "./sidebar-items";

import useAppPermission from "src/squads/communication/hooks/useCommunicationPermission";
import useCommunicationUpdatePermissionMicroApplication from "src/squads/communication/hooks/useCommunicationUpdatePermissionMicroApplication";
import useFeatureController from "src/squads/communication/hooks/useFeatureController";
import useInitUnleashParams from "src/squads/communication/hooks/useInitUnleashParams";
import useIsFeatureEnabled from "src/squads/communication/hooks/useIsFeatureEnabled";
import useManaSidebarItems from "src/squads/communication/hooks/useManaSidebarItems";
import useSubscribeUnleashServer from "src/squads/communication/hooks/useSubscribeUnleashServer";
import polyglot from "src/squads/communication/i18n/polyglot";

const useRegisterCommunicationSidebarItems = () => {
    const { registerSidebarItems } = useManaSidebarItems();
    const { permission } = useAppPermission();
    const { featureController } = useFeatureController();

    const isFeatureEnabled = useIsFeatureEnabled(featureController, permission);

    const initParams = useInitUnleashParams<Features>();

    useCommunicationUpdatePermissionMicroApplication(); //to enable permission in communication

    const registerCommunicationSidebarItems = useCallback(() => {
        const teamName = "communication";
        const unregister = reactiveStorage.registerListener("LANG", () => {
            //because this hook will be call before render comm TranslationProvider so  need to use directly polygot fn

            const { translate } = polyglot();
            const sidebarItems: ICommunicationSidebarItems[] = communicationSidebarItems
                .filter((route) => isFeatureEnabled(route))
                .map((_item) => {
                    const item: ICommunicationSidebarItems = {
                        icon: _item.icon,
                        order: _item.order,
                        key: _item.key,
                        to: `/${teamName}${_item.path}`,
                        name: translate(_item.translateKey),
                        owner: teamName,
                        isActive: _item.isActive,
                    };
                    return item;
                });

            registerSidebarItems(sidebarItems);
        });
        return () => {
            if (typeof unregister === "function") {
                unregister();
            }
        };
    }, [isFeatureEnabled, registerSidebarItems]);

    useSubscribeUnleashServer<Features>({
        callback: registerCommunicationSidebarItems,
        permissionRules: permission.getInstance().rules,
        featureController,
        initParams,
    });
};

export default useRegisterCommunicationSidebarItems;
