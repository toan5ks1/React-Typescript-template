var H=Object.defineProperty;var i=Object.getOwnPropertySymbols;var o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;var c=(e,a,t)=>a in e?H(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,s=(e,a)=>{for(var t in a||(a={}))o.call(a,t)&&c(e,t,a[t]);if(i)for(var t of i(a))n.call(a,t)&&c(e,t,a[t]);return e};var p=(e,a)=>{var t={};for(var l in e)o.call(e,l)&&a.indexOf(l)<0&&(t[l]=e[l]);if(e!=null&&i)for(var l of i(e))a.indexOf(l)<0&&n.call(e,l)&&(t[l]=e[l]);return t};import{cv as f,r as V,cM as T,R as k,cl as A,eA as F}from"./index.7daee9ef.js";const P=e=>e?{label:f(e,"HH:mm"),value:e}:{label:"00:00",value:new Date(new Date().setHours(0,0,0,0))},_=t=>{var l=t,{minuteStep:e=15}=l,a=p(l,["minuteStep"]);const b=V.exports.useCallback((m,u)=>m.filter(r=>{if(!u.inputValue&&!(r.value.getMinutes()%e)||u.inputValue&&T.fromFormat(u.inputValue,"HH:mm").isValid&&r.label.match(u.inputValue)||u.inputValue&&r.label.match(u.inputValue)&&!(r.value.getMinutes()%e))return r}),[e]);return k.createElement(A,s({id:"TimePickerAutocompleteHF__autocomplete","data-testid":"TimePickerAutocompleteHF__autocomplete",key:"time",options:F,optionLabelKey:"label",isOptionEqualToValue:(m,u)=>m.label===u.label,filterOptions:b},a))};export{_ as T,P as g};