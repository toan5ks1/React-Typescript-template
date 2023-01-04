var k=Object.defineProperty,A=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var y=(t,e,r)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,c=(t,e)=>{for(var r in e||(e={}))B.call(e,r)&&y(t,r,e[r]);if(h)for(var r of h(e))N.call(e,r)&&y(t,r,e[r]);return t},g=(t,e)=>A(t,V(e));import{h4 as q,g6 as Y,r as m,ai as W,ch as G,gq as F,R as o,de as H,g7 as z,aS as K,fG as Q,ak as X,ey as $,gD as j,d7 as J,gE as Z,b as ee,gF as te,aH as re,cp as oe}from"./index.7daee9ef.js";import{u as ne,a as ae,O as se,b as le,P as ce}from"./OrderUpsertForm.355b1b9f.js";import{u as ie,t as ue}from"./useOrderMutation.5c896db6.js";import{u as de}from"./useFetchStudentInfo.0fff90f4.js";import"./AccordionSummaryBase.51fee70a.js";import"./IconButtonBase.a835a6a3.js";import"./toInteger.9a87c39c.js";import"./intersection.1a672747.js";import"./_castArrayLikeObject.2e9ca1e4.js";import"./isArrayLikeObject.979eb0a9.js";import"./_baseRest.fb013a79.js";import"./infer-mutation.50915866.js";function O(){const t={product_id:177,name:"Demo Enrollment Product",product_type:q.PRODUCT_TYPE_FEE,tax_id:1,available_from:"2021-12-28T02:35:17.738471+00:00",available_until:"2022-12-28T02:35:17.738471+00:00",remarks:"Remark 1",billing_schedule_id:1,disable_pro_rating_flag:!1,updated_at:"2021-12-28T02:35:17.738675+00:00",created_at:"2021-12-28T02:35:17.738675+00:00"};return{product:g(c({},t),{value:t.name}),fee:{fee_type:"FEE_TYPE_ONE_TIME"},productTax:{tax_category:"TAX_CATEGORY_INCLUSIVE",tax_percentage:30},productPrices:[{billing_schedule_period_id:null,created_at:"2022-05-09T11:02:07.616219+00:00",price:300,product_id:177,product_price_id:2229,quantity:1}]}}const me=({isOpen:t,children:e,isLoading:r,onSave:n,openDialogCancel:a})=>{const s=z(K.ORDERS);return o.createElement(Q,{title:s("title.createEnrollment"),open:t,onClose:a,onSave:n,"data-testid":"EnrollmentUpsertDialog__dialog",isShowingBackdrop:r,footer:o.createElement(le,{onCancel:a,onSubmit:n})},e)},pe=({isOpen:t,onClose:e})=>{const r=Y(),[n,a]=m.exports.useState(null),[s,p]=m.exports.useState(!1),u=m.exports.useRef(),[C,E]=W(!1),f=m.exports.useCallback(()=>{E(!0)},[E]),{handleSubmit:v,getValues:D,reset:U}=G(),_=ne(),R=l=>{var i;l==="ra.manabie-error.specified.orderMismatch"&&((i=u.current)==null||i.remove())},{onUpsert:P,isOnUpsertLoading:S}=ie({onUpsertError:R}),{getProductPluginsMap:T}=ae(),b=m.exports.useCallback(l=>{const{isError:i,errorMessage:d}=_.productArrayTable.validate(l.productFieldArrayItem);if(i){a(d);return}const M=ue(l,F.OrderType.ORDER_TYPE_NEW,T);P({data:M})},[T,P,_.productArrayTable]),x=()=>{a(null);const l=O(),i=D("student");let d={student:c({},i)};l&&(d=g(c({},d),{productFieldArrayItem:[c({},l)]})),U(c({},d))},w=()=>{p(!0)},I=()=>{p(!1)},L=()=>o.createElement(X,{"data-testid":"EnrollmentUpsertDialog__viewEnrollmentButton",size:"medium",variant:"outlined",color:"primary",fullWidth:!0,onClick:w},"View Enrollment Form");return o.createElement(o.Fragment,null,o.createElement(me,{isOpen:t,onSave:v(b),isLoading:S,openDialogCancel:f},o.createElement("div",{id:"enrollment-preview-form"}),o.createElement(se,{onLocationChange:x,productErrorMessage:n,productListSectionRef:u,renderPreviewEnrollmentButton:L,showEnrollmentForm:s,closeEnrollmentForm:I,cancelEnrollmentRequest:f})),o.createElement(H,{open:C,onClose:()=>E(!1),onSave:()=>{e(),E(!1)},textSave:r("ra.common.action.leave")}))},Ee=({studentInfo:t,enrollmentProducts:e})=>{const r=ee(),{search:n}=te(),a=re({defaultValues:{student:t,productFieldArrayItem:e&&e.length>0?[...e]:[]}}),s=()=>{const u=new URLSearchParams(n).get("redirectUrl");u?r.push(u):r.goBack()};return o.createElement(oe,c({},a),o.createElement(pe,{isOpen:!0,onClose:s}))},ge=()=>{const{studentId:t}=$(),e=typeof t=="string"?t:void 0,{currentCurrency:r}=j(),{data:n,isFetching:a}=de({studentId:e}),s=O();return a?o.createElement(J,null):typeof n=="undefined"?o.createElement(Z,{"data-testid":"EnrollmentOrderUpsert__notfound"}):o.createElement(ce,{currency:r,orderType:F.OrderType.ORDER_TYPE_ENROLLMENT},o.createElement(Ee,{studentInfo:n,enrollmentProducts:[s]}))};var Se=ge;export{Se as default};
