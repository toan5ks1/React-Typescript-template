import{R as e,aJ as r,aK as p,d6 as M,ci as f,gF as w,ey as N,r as P,d0 as I,aS as O,d9 as K,eV as j,eS as q,eX as D,c8 as v,aj as h,cK as _,cX as C}from"./index.7daee9ef.js";import{r as G,u as V,v as F,x as R,V as u}from"./useShowSnackbar.da46e481.js";import{i as W}from"./infer-query.264ca744.js";import{M as H}from"./MediaListing.c26c4fa3.js";import{B as Q}from"./common.eab4c9d9.js";import{u as U}from"./useDeleteTaskAssignment.3c85a286.js";import{u as X}from"./useBreadcrumbLOs.f7b6121c.js";import{u as Y}from"./useNavigation.f38e637f.js";import"./useMutationV2.0883e427.js";function g(t){const{label:o,value:a,dataTestId:m}=t;return e.createElement(r,{container:!0,item:!0,sm:12},e.createElement(r,{item:!0,sm:3},e.createElement(p,{variant:"body2",color:"textSecondary"},o)),e.createElement(r,{item:!0,sm:!0},e.createElement(p,{variant:"body1",color:"textPrimary","data-testid":m},a)))}const L={paper:t=>({padding:t.spacing(3),[t.breakpoints.up("md")]:{padding:t.spacing(4)}}),dialogContent:{overflowWrap:"anywhere"}},J=()=>{const{breadcrumbInfos:t,loading:o}=X(),{id:a}=M(),m=G(),s=V(f.TASK_ASSIGNMENTS),x=F(),{search:E}=w(),c=Y(),{bookId:T}=N(),{data:l,isLoading:$}=W({entity:"assignment",action:"syllabusAssignmentGetOne"})({assignment_id:a},{enabled:Boolean(a),onError:n=>{R.warn("[TaskAssignmentDetail]",n),x(`${m("ra.message.unableToLoadData")} ${n.message}`,"error")}}),{deleteTaskAssignment:b}=U(),B=P.exports.useCallback(async n=>{switch(n){case"edit":return c.push(`/${I.SYLLABUS}/${f.TASK_ASSIGNMENTS}/${a}/edit${E}`);case"delete":return b({assignmentIdsList:[a]},{onSuccess:()=>{c.push(`/${I.SYLLABUS}/${O.BOOKS}/${T}/show`)}});default:return}},[c,a,E,b,T]);if(!l||$)return null;const{name:i,attachment:S,instruction:A,settings:k}=l,y=Object.keys(u).reduce((n,d)=>Object.keys(k).includes(u[d])&&k[u[d]]?[...n,s(d)]:n,[]);return e.createElement(K,{"data-testid":"TaskAssignmentDetail__root"},e.createElement(Q,{loading:o,breadcrumbInfos:t,name:i}),e.createElement(j,{title:i,action:e.createElement(q,{record:l,actions:[D.EDIT,D.DELETE],recordName:i,onAction:B,buttonStyle:"square"})}),e.createElement(r,{container:!0,spacing:3},e.createElement(r,{item:!0,sm:12,md:4},e.createElement(v,{elevation:2,sx:L.paper},e.createElement(h,{mb:3},e.createElement(_,null,s("attachment"))),S?e.createElement(H,{mediaIds:S}):e.createElement(p,{variant:"body1",color:"textPrimary","data-testid":"TaskAssignmentDetail__noAttachment"},s("noInformation")))),e.createElement(r,{item:!0,sm:12,md:8},e.createElement(v,{elevation:2,sx:L.paper},e.createElement(h,{mb:3},e.createElement(_,null,s("taskInformation"))),e.createElement(r,{container:!0,spacing:3},e.createElement(g,{label:s("name"),value:i,dataTestId:"TaskAssignmentDetail__name"}),A&&e.createElement(g,{label:s("description"),value:A,dataTestId:"TaskAssignmentDetail__instruction"}),e.createElement(g,{label:s("requiredItems"),value:y.length>0?y.join(", "):e.createElement(C,null),dataTestId:"TaskAssignmentDetail__requiredItems"}))))))};var me=J;export{me as default};
