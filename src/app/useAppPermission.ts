import permission, { AppPermission } from "../internals/permission";

interface UseAppPermissionValues {
    permission: AppPermission;
}

function useAppPermission(): UseAppPermissionValues {
    return { permission };
}

export default useAppPermission;
