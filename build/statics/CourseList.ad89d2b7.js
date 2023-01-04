import{h_ as U,aS as s,r as h,c$ as k,R as e,d2 as B,d0 as M,fn as A,cR as I,d3 as N,eQ as $,aK as D,aj as K,gA as G,ck as j,g2 as H,d5 as Q,d9 as V,bb as z}from"./index.7daee9ef.js";import{r as y,u as W,v as Y,y as q,x as J}from"./useShowSnackbar.da46e481.js";import{a as X}from"./infer-query.264ca744.js";import{u as Z,D as ee}from"./useUpsertCourse.67c4bc5f.js";import{u as te}from"./useDialog.8ab3e0e0.js";import"./AvatarInputHF.36ed1c41.js";import"./IconButtonBase.a835a6a3.js";import"./useSafeState.fc2ddfd3.js";import"./useBasicContent.160dc809.js";import"./useNotifyForm.ee77e08e.js";const ae=()=>{const n=U(s.COURSES),c=y(),o=W(s.COURSES),[d,E]=h.exports.useState(""),C=Y(),{isEnabled:m}=q(k.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD),{result:{isFetching:S,isLoading:b,refetch:_},data:r,pagination:u,resetPaginationOffset:T}=X({entity:"courses",action:"lessonCourseGetListV2"})({name:d},{enabled:!0,onError:t=>{J.warn("[lessonCourseGetListV2]",t),C("ra.message.unableToLoadData","error")}}),f=h.exports.useMemo(()=>[{key:"colName",title:o("courseName"),render:t=>e.createElement(B,{"data-testid":"CourseTable__courseNameLink",to:`/${M.SYLLABUS}/${s.COURSES}/${t.course_id}/show`,title:t.name},e.createElement(A,{src:I(t.icon),sx:a=>({display:"inline-block",marginRight:a.spacing(1),verticalAlign:"middle"}),size:"medium"}),e.createElement(N,{variant:"body2",display:"inline","data-testid":"CourseTable__courseName",maxLength:60},t.name))},...m?[{key:"colTeachingMethod",title:o("teachingMethod"),cellProps:{style:{width:"35%"}},render:t=>t.teaching_method?e.createElement($,{variant:"body2","data-testid":"CourseTable__teachingMethod",pl:.5},o(t.teaching_method)):e.createElement(D,{variant:"body2","data-testid":"CourseTable__noTeachingMethod",sx:a=>({color:a.palette.grey[400]}),pl:.5},"--")}]:[]],[o,m]),L=t=>{d!==t&&T(),E(t)},{open:g,onOpen:w,onClose:p}=te(),{onCreate:R,isLoading:O}=Z(),v=async t=>{const{iconFile:a,name:x,locations:i,teachingMethod:l}=t,F=i==null?void 0:i.map(P=>P.locationId);await R({name:x,files:a,locationIdsList:F,teachingMethod:l==null?void 0:l.id},{onSuccess:()=>{_(),p()}})};return e.createElement(e.Fragment,null,g&&e.createElement(ee,{open:g,onClose:p,onSave:v,loading:O}),e.createElement(K,{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2},e.createElement(G,{onEnterSearchBar:L}),e.createElement(j,{I:"create",a:"courses"},e.createElement(H,{"data-testid":"CourseTable__addButton",resource:s.COURSES,onClick:w},c("ra.common.action.add")))),e.createElement(Q,{body:{rowKey:n,loading:b||S,pagination:u},data:(r==null?void 0:r.data)||[],columns:f,tableProps:{"data-testid":"CourseTable__table"},footer:{pagination:u,labelRowsPerPage:c("ra.navigation.page_rows_per_page")},withIndex:{width:"5%"}}))},ge=()=>{const n=y();return e.createElement(V,null,e.createElement(z,{title:n(`resources.${s.COURSES}.name`),"data-testid":"CourseList__title"}),e.createElement(ae,null))};export{ge as default};