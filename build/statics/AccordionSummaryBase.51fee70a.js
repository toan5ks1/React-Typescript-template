var Q=Object.defineProperty,Y=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var N=(e,o,t)=>o in e?Q(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,p=(e,o)=>{for(var t in o||(o={}))k.call(o,t)&&N(e,t,o[t]);if(v)for(var t of v(o))G.call(o,t)&&N(e,t,o[t]);return e},j=(e,o)=>Y(e,Z(o));var T=(e,o)=>{var t={};for(var n in e)k.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&v)for(var n of v(e))o.indexOf(n)<0&&G.call(e,n)&&(t[n]=e[n]);return t};import{r as y,bd as W,bc as L,a8 as I,c8 as ee,bh as m,bk as U,bl as q,dR as oe,bo as z,bp as h,a1 as B,dS as te,dT as ne,R as r,aj as u,dU as H,dV as O}from"./index.7daee9ef.js";import{I as F}from"./IconButtonBase.a835a6a3.js";const re=y.exports.createContext({});var X=re;function ae(e){return L("MuiAccordion",e)}const se=W("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]);var _=se;const ie=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],de=e=>{const{classes:o,square:t,expanded:n,disabled:s,disableGutters:i}=e;return z({root:["root",!t&&"rounded",n&&"expanded",s&&"disabled",!i&&"gutters"],region:["region"]},ae,o)},ce=I(ee,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[{[`& .${_.region}`]:o.region},o.root,!t.square&&o.rounded,!t.disableGutters&&o.gutters]}})(({theme:e})=>{const o={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],o),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],o)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${_.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${_.disabled}`]:{backgroundColor:e.palette.action.disabledBackground}}},({theme:e,ownerState:o})=>m({},!o.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!o.disableGutters&&{[`&.${_.expanded}`]:{margin:"16px 0"}})),le=y.exports.forwardRef(function(o,t){const n=U({props:o,name:"MuiAccordion"}),{children:s,className:i,defaultExpanded:x=!1,disabled:f=!1,disableGutters:d=!1,expanded:E,onChange:c,square:A=!1,TransitionComponent:S=te,TransitionProps:b}=n,l=q(n,ie),[a,g]=oe({controlled:E,default:x,name:"Accordion",state:"expanded"}),R=y.exports.useCallback(K=>{g(!a),c&&c(K,!a)},[a,c,g]),[$,...D]=y.exports.Children.toArray(s),J=y.exports.useMemo(()=>({expanded:a,disabled:f,disableGutters:d,toggle:R}),[a,f,d,R]),P=m({},n,{square:A,disabled:f,disableGutters:d,expanded:a}),M=de(P);return h.exports.jsxs(ce,m({className:B(M.root,i),ref:t,ownerState:P,square:A},l,{children:[h.exports.jsx(X.Provider,{value:J,children:$}),h.exports.jsx(S,m({in:a,timeout:"auto"},b,{children:h.exports.jsx("div",{"aria-labelledby":$.props.id,id:$.props["aria-controls"],role:"region",className:M.region,children:D})}))]}))});var pe=le;function ue(e){return L("MuiAccordionSummary",e)}const me=W("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]);var C=me;const xe=["children","className","expandIcon","focusVisibleClassName","onClick"],fe=e=>{const{classes:o,expanded:t,disabled:n,disableGutters:s}=e;return z({root:["root",t&&"expanded",n&&"disabled",!s&&"gutters"],focusVisible:["focusVisible"],content:["content",t&&"expanded",!s&&"contentGutters"],expandIconWrapper:["expandIconWrapper",t&&"expanded"]},ue,o)},be=I(ne,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,o)=>o.root})(({theme:e,ownerState:o})=>{const t={duration:e.transitions.duration.shortest};return m({display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${C.focusVisible}`]:{backgroundColor:e.palette.action.focus},[`&.${C.disabled}`]:{opacity:e.palette.action.disabledOpacity},[`&:hover:not(.${C.disabled})`]:{cursor:"pointer"}},!o.disableGutters&&{[`&.${C.expanded}`]:{minHeight:64}})}),ge=I("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,o)=>o.content})(({theme:e,ownerState:o})=>m({display:"flex",flexGrow:1,margin:"12px 0"},!o.disableGutters&&{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${C.expanded}`]:{margin:"20px 0"}})),ye=I("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,o)=>o.expandIconWrapper})(({theme:e})=>({display:"flex",color:e.palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${C.expanded}`]:{transform:"rotate(180deg)"}})),he=y.exports.forwardRef(function(o,t){const n=U({props:o,name:"MuiAccordionSummary"}),{children:s,className:i,expandIcon:x,focusVisibleClassName:f,onClick:d}=n,E=q(n,xe),{disabled:c=!1,disableGutters:A,expanded:S,toggle:b}=y.exports.useContext(X),l=R=>{b&&b(R),d&&d(R)},a=m({},n,{expanded:S,disabled:c,disableGutters:A}),g=fe(a);return h.exports.jsxs(be,m({focusRipple:!1,disableRipple:!0,disabled:c,component:"div","aria-expanded":S,className:B(g.root,i),focusVisibleClassName:B(g.focusVisible,f),onClick:l,ref:t,ownerState:a},E,{children:[h.exports.jsx(ge,{className:g.content,ownerState:a,children:s}),x&&h.exports.jsx(ye,{className:g.expandIconWrapper,ownerState:a,children:x})]}))});var Ae=he;const Se=e=>r.createElement(pe,j(p({},e),{defaultExpanded:!0})),Ce={TransitionProps:{mountOnEnter:!0}};Se.defaultProps=Ce;const Ee=({iconButtonProps:e,active:o,avatar:t,summaryContent:n})=>r.createElement(u,{pl:.5,width:"100%",display:"flex",alignItems:"center"},r.createElement(u,{pr:.25},r.createElement(F,p({size:"large",sx:{width:40,height:40},"data-testid":"AccordionSummaryBase__expandIcon"},e),o?r.createElement(H,{"data-testid":"AccordionSummaryIconExpand__expandLess",fontSize:"small"}):r.createElement(O,{"data-testid":"AccordionSummaryIconExpand__expandMore",fontSize:"small"}))),t&&r.createElement(u,{pr:1},t),r.createElement(u,{width:"100%","data-testid":"AccordionSummaryBase__content"},n)),Re=({iconButtonProps:e,active:o,avatar:t,summaryContent:n})=>r.createElement(u,{maxWidth:"100%",display:"flex"},t&&r.createElement(u,{pr:1},t),r.createElement(u,{width:"100%","data-testid":"AccordionSummaryBase__content"},n),r.createElement(u,{ml:1},r.createElement(F,p({size:"large",sx:{width:24,height:24},"data-testid":"AccordionSummaryBase__expandIcon"},e),o?r.createElement(H,{"data-testid":"AccordionSummaryIconExpand__expandLess",fontSize:"small"}):r.createElement(O,{"data-testid":"AccordionSummaryIconExpand__expandMore",fontSize:"small"})))),V="AccordionSummaryBase",w={root:`${V}-root`,content:`${V}-content`},Ie=I(Ae)(({theme:e})=>({padding:e.spacing(0,.5,0,0),height:"52px","&.Mui-expanded":{minHeight:"unset"},[`& .${w.content}`]:{alignItems:"center",justifyContent:"space-between"}})),Be=e=>{const b=e,{expandIcon:o,style:t,endIcon:n,className:s,classes:i,iconExpandPosition:x="left",summaryContent:f,avatar:d,active:E,iconButtonProps:c}=b,A=T(b,["expandIcon","style","endIcon","className","classes","iconExpandPosition","summaryContent","avatar","active","iconButtonProps"]),S=()=>{const l={summaryContent:f,avatar:d,active:E,iconButtonProps:c};switch(x){case"left":return r.createElement(Ee,p({},l));case"right":return r.createElement(Re,p({},l));default:return r.createElement(r.Fragment,null)}};return r.createElement(Ie,p({"data-testid":"AccordionSummaryBase__root",expandIcon:o,className:s,classes:p({root:w.root,content:w.content},i)},A),S(),r.createElement("span",{onClick:l=>{l.stopPropagation()}},n))};export{Be as A,Se as a,_ as b,C as c};