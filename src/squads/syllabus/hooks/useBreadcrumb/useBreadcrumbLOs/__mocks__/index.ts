import { UseBreadCrumbLOsReturn } from "../useBreadcrumbLOs";

export default (): UseBreadCrumbLOsReturn => ({
    loading: false,
    breadcrumbInfos: [
        {
            name: "Name",
            translateKey: "translateKey",
            url: "/url",
        },
    ],
});
