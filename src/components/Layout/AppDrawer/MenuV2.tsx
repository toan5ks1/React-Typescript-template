import { useMemo } from "react";

import { Rules } from "src/internals/permission/rules";

import { useModules } from "src/providers/ModuleProvider";
import Menu, { MenuProps } from "src/squads/architecture/components/Menu";

import useAppPermission from "src/app/useAppPermission";
import useTranslate from "src/hooks/useTranslate";
import useRegisterCommunicationSidebarItems from "src/squads/communication/exports/fragments/useRegisterCommunicationSidebarItems";

const MenuV2 = ({ sidebarOpen }: Pick<MenuProps, "sidebarOpen">) => {
    useRegisterCommunicationSidebarItems();
    const t = useTranslate();

    const modules = useModules();

    const { permission } = useAppPermission();
    const defaultItems: ISidebarItem[] = useMemo(() => {
        let result: ISidebarItem[] = [];
        modules.forEach((module, index) => {
            if (!permission.can(module.key as keyof Rules, "show")) return;
            if (!module.icon) return;

            //TODO: temporary rm communication route
            if (module.basename?.includes("/communication")) return;

            const item: ISidebarItem = {
                name: t(`resources.${module.name}.${module.translateKey}`),
                key: module.key,
                order: index,
                isActive: (fullPath) => fullPath.includes(`${module.basename}/${module.key}`),
                icon: module.icon!,
                owner: module.basename!.replace("/", ""),
                to: `${module.basename}/${module.key}`,
                target: module.target as any,
            };
            result.push(item);
        });
        return result;
    }, [modules, permission, t]);

    return <Menu sidebarOpen={sidebarOpen} defaultItems={defaultItems} />;
};

export default MenuV2;
