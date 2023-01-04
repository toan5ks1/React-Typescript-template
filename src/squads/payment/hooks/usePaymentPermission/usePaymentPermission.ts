import permission, { AppPermission } from "src/squads/payment/internals/permission";

interface UseAppPermissionValues {
    permission: AppPermission;
}

function usePaymentPermission(): UseAppPermissionValues {
    return { permission };
}

export default usePaymentPermission;
