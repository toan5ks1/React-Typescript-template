import { PermissionTypes } from "./permission-types";

export interface CommunicationRoutes extends PermissionTypes {
    path: string;
    component: () => JSX.Element;
}
