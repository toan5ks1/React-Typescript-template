import{r as o}from"./index.7daee9ef.js";function f(a=!1){const[r,e]=o.exports.useState(a),s=o.exports.useCallback(t=>{t&&t.preventDefault&&t.preventDefault(),t&&t.stopPropagation&&t.stopPropagation(),e(!0)},[]),p=o.exports.useCallback(t=>{t&&t.preventDefault&&t.preventDefault(),t&&t.stopPropagation&&t.stopPropagation(),e(!1)},[]);return o.exports.useEffect(()=>{e(a)},[a]),{open:r,onOpen:s,onClose:p}}export{f as u};