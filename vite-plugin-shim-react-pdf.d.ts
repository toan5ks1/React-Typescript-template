declare module "vite-plugin-shim-react-pdf" {
    import { PluginOption } from "vite";

    function shimReactPdf(): PluginOption | PluginOption[];
    export default shimReactPdf;
}
