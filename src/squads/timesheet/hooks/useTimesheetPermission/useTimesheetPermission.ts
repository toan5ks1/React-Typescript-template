import permission, { AppPermission } from "src/squads/timesheet/internals/permission";

interface UseAppPermissionValues {
    permission: AppPermission;
}

function useTimesheetPermission(): UseAppPermissionValues {
    return { permission };
}

export default useTimesheetPermission;
