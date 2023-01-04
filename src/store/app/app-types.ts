export interface AppState {
    readonly sidebarOpen: boolean;
    prevPathname: string;
    redirectAfterLogout: string;
    redirectAfterLogin: string;
}
