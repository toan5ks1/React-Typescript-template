var h=Object.defineProperty;var f=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var i=(t,a,e)=>a in t?h(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,S=(t,a)=>{for(var e in a||(a={}))A.call(a,e)&&i(t,e,a[e]);if(f)for(var e of f(a))k.call(a,e)&&i(t,e,a[e]);return t};import{u as p,r as n,hh as x,aR as R}from"./index.7daee9ef.js";var u=(t=>(t.SHOW_SNACKBAR="SHOW_SNACKBAR",t.HIDE_SNACKBAR="HIDE_SNACKBAR",t))(u||{});const _={showSnackbar(t){return{type:u.SHOW_SNACKBAR,payload:t}},hideSnackbar(){return{type:u.HIDE_SNACKBAR}}},d=t=>typeof t=="object"?S({},t):{key:t};function m(){const t=p();return n.exports.useCallback((e,s)=>{const{key:o,options:r}=d(e);t(_.showSnackbar({message:o,options:r,severity:s}))},[t])}function w(){const{i18nProvider:{translate:t}}=x();return n.exports.useCallback((a,e,s)=>{const o=R(a)?"":a;return(s==null?void 0:s.lowercase)&&e&&typeof e=="object"&&Object.keys(e).forEach(r=>{var c;typeof e[r]=="string"&&(e[r]=t((c=e[r])==null?void 0:c.toString()).toLowerCase())}),t(o,e)||""},[t])}function B(t){const a=w();return n.exports.useCallback((e,s)=>a(`resources.${t}.${e}`,s||{smart_count:1}),[t,a])}const O={defaultOffset:0,defaultLimit:10};function H(t=O){const[a,e]=n.exports.useState(t.defaultOffset||0),[s,o]=n.exports.useState(t.defaultLimit||10),r=n.exports.useCallback((l,b)=>{let C=b*s;e(C)},[s]),c=n.exports.useCallback(l=>{o(parseInt(l.target.value,10)),e(0)},[]);return n.exports.useMemo(()=>({offset:a,page:Math.ceil(a/s),limit:s,rowsPerPage:s,setOffset:e,setLimit:o,onPageChange:r,onRowsPerPageChange:c}),[c,r,a,s])}export{w as a,m as b,H as c,B as u};