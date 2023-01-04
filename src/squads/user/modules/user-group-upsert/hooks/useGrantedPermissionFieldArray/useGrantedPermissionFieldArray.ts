import { useCallback } from "react";

import { useFieldArray } from "react-hook-form";
import type { GrantedPermission, UserGroupInfo } from "src/squads/user/common/types/user-group";

import { useFormContext } from "src/components/Forms/HookForm";

import { initializeUserGroupGrantedPermission } from "src/squads/user/common/helpers/initializeFieldArray";

export interface UseGrantedPermissionFieldArrayReturn {
    grantedPermissions: GrantedPermission[];
    onAdd: () => void;
    onDelete: (records: GrantedPermission[]) => void;
    append: (grantedPermission: GrantedPermission) => void;
    remove: (index: number) => void;
    update: (index: number, value: Partial<unknown>) => void;
}

const useGrantedPermissionFieldArray = (): UseGrantedPermissionFieldArrayReturn => {
    const { control } = useFormContext<UserGroupInfo>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "grantedPermissionPackage",
    });

    const onAdd = useCallback(() => {
        const newGrantedRole = initializeUserGroupGrantedPermission();
        append(newGrantedRole);
    }, [append]);

    const onDelete = useCallback(
        (records: GrantedPermission[]) => {
            const idsHashMap = new Map();
            records.forEach((record) => {
                idsHashMap.set(record.id, record);
            });
            const deletedGrantedPermissionPositions: number[] = [];
            fields.forEach((permission, index) => {
                if (idsHashMap.has(permission?.id)) {
                    deletedGrantedPermissionPositions.push(index);
                }
            });

            remove(deletedGrantedPermissionPositions);
        },
        [fields, remove]
    );

    return {
        grantedPermissions: fields,
        onAdd,
        onDelete,
        append,
        remove,
        update,
    };
};

export default useGrantedPermissionFieldArray;
