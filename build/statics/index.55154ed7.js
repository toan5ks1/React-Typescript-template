var A=Object.defineProperty,S=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var n=(t,e,s)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,i=(t,e)=>{for(var s in e||(e={}))f.call(e,s)&&n(t,s,e[s]);if(r)for(var s of r(e))h.call(e,s)&&n(t,s,e[s]);return t},o=(t,e)=>S(t,E(e));import{ci as T,gF as _,ey as C,hL as c,r as O,d0 as v,aS as y,R as I,cG as R}from"./index.7daee9ef.js";import{u as L,S as N}from"./useShowSnackbar.da46e481.js";import{A as $}from"./AssignmentUpsert.f121ff60.js";import{u as b}from"./useNavigation.f38e637f.js";import"./FormUploadMaterials.c32fc30a.js";import"./BrightcoveLogoIcon.9d2bdc09.js";import"./UploadInput.4c4e4115.js";import"./useMutationV2.0883e427.js";import"./MediaListing.c26c4fa3.js";import"./useHookFormField.c60f8756.js";const k=()=>{const t=L(T.ASSIGNMENTS),{search:e}=_(),s=b(),m=C(e),{[c.BOOK_ID]:a,[c.PARENT_ID]:p}=m,u={assignment_id:"",content:{topic_id:p},display_order:0,files:[],is_required_grade:!0,name:"",settings:Object.values(N).reduce((d,g)=>o(i({},d),{[g]:!1}),{})},l=O.exports.useCallback(()=>{s.push(`/${v.SYLLABUS}/${y.BOOKS}/${a}/show`)},[a,s]);return I.createElement($,{action:R.CREATE,assignment:u,searchUrl:e,title:t("createTitle"),onClose:l})};var w=k;export{w as default};