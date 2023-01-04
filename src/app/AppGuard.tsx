import { PropsWithChildren, useEffect } from "react";

import { Redirect } from "react-router";
import reactiveStorage from "src/internals/reactive-storage";
import { EntryExitResource } from "src/squads/adobo/domains/entry-exit/pages/scanner";
import { InvoiceManagementResource } from "src/squads/adobo/domains/invoice/pages/invoice-list";
import { LOGIN_ROUTE, LOGIN_TENANT } from "src/squads/user/common/constants/routers";
import Staff from "src/squads/user/pages/staff/module-metadata";

import Loading from "../components/Loading";
import { ModuleProvider } from "src/providers/ModuleProvider";

import useSafeSetState from "../hooks/useSafeState";
import { IAppResource } from "../models/resource";
import useAppInit from "./useAppInit";

import { CalendarResource } from "src/squads/calendar/domains/Calendar";
import { NotificationResource } from "src/squads/communication/pages/Notification";
import { NotificationResourceV2 } from "src/squads/communication/pages/NotificationV2";
import { AssignedStudentListResource } from "src/squads/lesson/domains/AssignedStudentList";
import { LessonManagementResource } from "src/squads/lesson/pages/LessonManagement";
import { MasterDataResource } from "src/squads/payment/domains/MasterData";
import { OrderManagementResource } from "src/squads/payment/domains/OrderManagement";
import Book from "src/squads/syllabus/pages/Book";
import Course from "src/squads/syllabus/pages/Course";
import TimesheetResource from "src/squads/timesheet/pages/timesheet_management/module-metadata";
import useCheckAuth from "src/squads/user/hooks/auth/useCheckAuth";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import StudentResource from "src/squads/user/pages/students_erp/module-metadata";
import UserGroup from "src/squads/user/pages/user_group/module-metadata";

//TODO: will refactor when we have window.__MANA__.registerMenuItem

const appModules: IAppResource[] = [
    // -- position represent for sidebar
    StudentResource,
    Course,
    Book,
    LessonManagementResource,
    AssignedStudentListResource,
    Staff,
    TimesheetResource,
    NotificationResource,
    NotificationResourceV2,
    CalendarResource,
    MasterDataResource,
    OrderManagementResource,
    EntryExitResource,
    UserGroup,
    InvoiceManagementResource,
];

export interface AppGuardProps {}

const AppGuard = ({ children }: PropsWithChildren<AppGuardProps>) => {
    const [state, setState] = useSafeSetState({ isAuth: false, loading: true });
    const { onCheckAuth, additionalQuery } = useCheckAuth();

    const { modules, ready } = useAppInit(state.isAuth ? appModules : []);

    // Use multi tenant at the main flow
    const isEnabledLoginMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    useEffect(() => {
        onCheckAuth()
            .then(() => {
                setState({ isAuth: true, loading: false });
            })
            .catch(async (err) => {
                window.warner?.warn("AppGuard", err);
                setState({ isAuth: false, loading: false });
            });

        const unregister = reactiveStorage.registerListener(
            "TOKEN",
            (newVal) => {
                if (newVal === null) {
                    window.location.reload();
                }
            },
            { run1st: false, crossTabs: true }
        );
        return () => {
            if (typeof unregister === "function") {
                unregister();
            }
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (state.loading) {
        return <Loading fullscreen />;
    }

    if (!state.isAuth) {
        if (isEnabledLoginMultiTenant) {
            return <Redirect to={`/${LOGIN_TENANT}${additionalQuery}`} />;
        }
        return <Redirect to={`/${LOGIN_ROUTE}${additionalQuery}`} />;
    }

    if (!ready) {
        return <Loading fullscreen />;
    }

    return <ModuleProvider modules={modules}>{children}</ModuleProvider>;
};

export default AppGuard;
