import permission, { AppPermission } from "src/squads/communication/internals/permission";

interface UseAppPermissionValues {
    permission: AppPermission;
}

function useCommunicationPermission(): UseAppPermissionValues {
    return { permission };
}

export default useCommunicationPermission;
