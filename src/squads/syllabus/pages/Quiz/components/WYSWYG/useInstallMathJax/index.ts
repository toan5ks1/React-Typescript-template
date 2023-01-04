export { default } from "./useInstallMathjax";
export * from "./useInstallMathjax";

declare global {
    interface Window {
        MathJax?: any;
    }
}
