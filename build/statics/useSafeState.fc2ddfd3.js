import{r as t}from"./index.7daee9ef.js";function f(s){const[u,r]=t.exports.useState(s),e=t.exports.useRef(!1);t.exports.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]);const a=t.exports.useCallback(n=>{if(e.current)return r(n)},[e,r]);return[u,a]}export{f as u};