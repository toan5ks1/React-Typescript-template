import permission, { AppPermission } from "../../internals/permission/permission";

interface UseAppPermissionValues {
    permission: AppPermission;
}

function useSyllabusPermission(): UseAppPermissionValues {
    return { permission };
}

export default useSyllabusPermission;
