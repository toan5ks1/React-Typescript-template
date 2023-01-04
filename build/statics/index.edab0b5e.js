import{by as X,bp as Z,R as e,aK as E,h5 as N,r as p,gT as ee,gV as te,gM as k,d5 as B,g7 as _,aS as b,gD as V,h6 as re,h7 as G,h8 as $,h9 as ne,cv as A,gH as ae,g8 as T,g6 as h,ha as F,aJ as u,gw as S,cR as D,aj as P,cx as q,gx as ie,gq as oe,bb as le,cq as se,b8 as ce,cz as de,gG as x,cV as ue,hb as me,hc as ge,dd as pe,d6 as ye,d7 as Ee,gE as be,d9 as _e,da as Oe,dc as C}from"./index.7daee9ef.js";import{a as H,c as z,b as K,d as Pe,u as Ie}from"./useFetchStudentInfo.0fff90f4.js";var he=X(Z.exports.jsx("path",{d:"M11.49 16c.88 0 1.7-.26 2.39-.7l2.44 2.44 1.42-1.42-2.44-2.43c.44-.7.7-1.51.7-2.39C16 9.01 13.99 7 11.5 7S7 9.01 7 11.5 9.01 16 11.49 16zm.01-7c1.38 0 2.5 1.12 2.5 2.5S12.88 14 11.5 14 9 12.88 9 11.5 10.12 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"}),"PageviewOutlined");const j=({productDescription:n})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailBillingItemTable__content"},n),Le=()=>({ProductsListItemCell:({productName:r,discountName:a})=>e.createElement(N,{productName:r,discountName:a}),BillingItemsCell:({productDescription:r})=>e.createElement(j,{productDescription:r})}),fe=()=>({ProductsListItemCell:({productName:r,discountName:a})=>e.createElement(N,{productName:r,discountName:a}),BillingItemsCell:({productDescription:r})=>e.createElement(j,{productDescription:r})}),R={ProductsListItemCell:()=>e.createElement(k,{isImplemented:!1,mt:2,textAlign:"center"}),BillingItemsCell:()=>e.createElement(k,{isImplemented:!1})},W=p.exports.createContext({}),Y=()=>p.exports.useContext(W),Q=({children:n})=>{const r=p.exports.useMemo(()=>({material:{[ee.MATERIAL_TYPE_ONE_TIME]:fe()},packageEntity:void 0,fee:{[te.FEE_TYPE_ONE_TIME]:Le()}}),[]),a=p.exports.useCallback(i=>{const{productEntityType:o,productExtensionType:l}=i,s=r[o];return s&&s[l]||R},[r]),t=p.exports.useMemo(()=>({productPluginsMap:r,getProductPluginsMap:a}),[a,r]);return e.createElement(W.Provider,{value:t},n)},Te=()=>{const n=_(b.ORDERS),{currentCurrency:r}=V(),{getProductPluginsMap:a}=Y();return p.exports.useMemo(()=>[{key:"billingNumber",title:`${n("column.billingNumber")}.`,render:({billingItem:i})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailBillingItemTable__billingNumber"},re(i.bill_item_sequence_number)),cellProps:{style:{width:"9%",verticalAlign:"top"}}},{key:"content",title:n("column.content"),render:({billingItem:i,productData:o,material:l,fee:s})=>{if(!o)return e.createElement("div",null,"Can not load product data");const c=G($({product:o,material:l,fee:s})),{BillingItemsCell:d}=a(c);return e.createElement(d,{productDescription:i.product_description})},cellProps:{style:{width:"38%",verticalAlign:"top"}}},{key:"status",title:n("column.status"),render:({billingItem:i})=>e.createElement(ne,{"data-testid":"OrderDetailBillingItemTable__status",status:i.billing_status}),cellProps:{style:{width:"13%",verticalAlign:"top"}}},{key:"billingDate",title:n("column.billingDate"),render:({billingItem:i})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailBillingItemTable__billingDate"},A(i.billing_date,"yyyy/LL/dd")),cellProps:{style:{width:"11%",verticalAlign:"top"}}},{key:"amount",title:n("column.amount"),render:({billingItem:i})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailBillingItemTable__amount"},ae(r,!1,i.final_price)),cellProps:{style:{width:"24%",textAlign:"right",verticalAlign:"top"}}}],[r,n,a])},we=({dataSource:n,loading:r,pagination:a})=>{const t=Te();return e.createElement(B,{tableProps:{"data-testid":"OrderDetailBillingItemTable__root"},data:n,columns:t,withIndex:{width:"5%"},styleIndexCol:{verticalAlign:"top"},body:{loading:r,rowKey:"bill_item_sequence_number",pagination:a},footer:{pagination:a}})},De=({orderId:n})=>{const r=T(),a=h(),{data:t,result:{isFetched:i},pagination:o}=F({entity:"billItem",action:"paymentGetBillItemsByOrderId"})({order_id:n},{defaultLimit:5,enabled:Boolean(n),selector:({data:m,total:I})=>({data:{productIds:m==null?void 0:m.map(v=>v.product_id),billingItems:m},total:I}),onError:m=>{var I;(I=window.warner)==null||I.warn("useBillItemList in Payment Order",m),r(`${a("ra.message.unableToLoadData")} billItem - paymentGetBillItemsByOrderId`,"error")}}),{data:l,isFetched:s}=H({productIds:t==null?void 0:t.data.productIds,options:{enabled:i}}),c=l==null?void 0:l.map(m=>m.product_id),{data:d,isFetched:g}=z({productIds:c,enabled:s}),{data:O,isFetched:L}=K({productIds:c,enabled:s});return{billingItemsData:t,pagination:o,productMaterialsData:d,productFeesData:O,productsDetail:l,isFetchedAll:g&&L&&s}},xe=({billingItemsData:n,productMaterialsData:r,productFeesData:a,productsDetail:t})=>n!=null&&n.data.billingItems?n.data.billingItems.map(i=>{const o=t==null?void 0:t.find(c=>c.product_id===i.product_id),l=r==null?void 0:r.find(c=>c.material_id===i.product_id),s=a==null?void 0:a.find(c=>c.fee_id===i.product_id);return{billingItem:i,productData:o,material:l,fee:s}}):[],ve=({orderId:n})=>{const r=_(b.ORDERS),{billingItemsData:a,productMaterialsData:t,productFeesData:i,productsDetail:o,pagination:l,isFetchedAll:s}=De({orderId:n}),c=p.exports.useMemo(()=>xe({billingItemsData:a,productMaterialsData:t,productFeesData:i,productsDetail:o}),[a,t,i,o]);return e.createElement(e.Fragment,null,e.createElement(Q,null,e.createElement(u,{item:!0,xs:12},e.createElement(E,{variant:"subtitle1"},r("title.billingItem"))),e.createElement(u,{item:!0,xs:12},e.createElement(we,{dataSource:c||[],loading:!s,pagination:l}))))},Ce=({order:n,locations:r,student:a})=>{var o;const t=_(b.ORDERS),i=p.exports.useMemo(()=>{var l;return[{label:t("label.orderNumber"),value:S(n.order_sequence_number),dataTestidValue:"OrderManagementGeneralInfo__orderNumberValue"},{label:t("label.orderType"),value:n.order_type?t(`choices.orderType.${n.order_type}`):"",dataTestidValue:"OrderManagementGeneralInfo__orderTypeValue"},{label:t("label.studentName"),value:D((l=a==null?void 0:a.user)==null?void 0:l.name),dataTestidValue:"OrderManagementGeneralInfo__studentNameValue"},{label:t("label.location"),value:D(r==null?void 0:r.name),dataTestidValue:"OrderManagementGeneralInfo__locationNameValue"},{label:t("label.createdDate"),value:A(n.created_at,"yyyy/LL/dd"),dataTestidValue:"OrderManagementGeneralInfo__createdDateValue"}]},[t,n.order_sequence_number,n.order_type,(o=a==null?void 0:a.user)==null?void 0:o.name,r==null?void 0:r.name,n.created_at]);return e.createElement(e.Fragment,null,e.createElement(P,{mb:.5},e.createElement(E,{variant:"subtitle1"},t("title.generalInfo"))),e.createElement(u,{container:!0,item:!0,xs:12},i.map(({value:l,label:s,dataTestidValue:c},d)=>e.createElement(u,{key:d,item:!0,xs:6},e.createElement(P,{mt:1.5},e.createElement(q,{variant:"horizontal",value:l,label:s,xsLabel:2,xsValue:10,dataTestidValue:c,sxValue:g=>({paddingLeft:g.spacing(3)})}))))))},Be=({orderSequenceNumber:n,orderStatus:r})=>e.createElement(P,{display:"flex",alignItems:"center",mb:4,"data-testid":"OrderDetailHeader__root"},e.createElement(P,{mr:1},e.createElement(ie,{status:oe.OrderStatus[r]})),e.createElement(P,null,e.createElement(le,{disablePadding:!0,title:S(n)}))),Ae=({onClose:n})=>{const r=h();return e.createElement(u,{container:!0,justifyContent:"flex-end","data-testid":"OrderDetailCommentDialog__footer"},e.createElement(P,{mt:1},e.createElement(se,{onClick:n,"data-testid":"OrderDetailCommentDialog__buttonClose"},r("ra.common.action.close"))))},Fe=({comment:n,open:r,onClose:a})=>{const t=_(b.ORDERS);return e.createElement(ce,{open:r,onClose:a,title:t("title.viewComment"),footer:e.createElement(Ae,{onClose:a}),"data-testid":"OrderDetailCommentDialog__dialog"},e.createElement(P,{pt:1},e.createElement(q,{variant:"horizontal",value:n,label:t("label.comment"),xsLabel:3,xsValue:9,dataTestidValue:"OrderDetailCommentDialog__comment"})))},Se=({handleOpenCommentDialog:n})=>{const r=_(b.ORDERS);return p.exports.useMemo(()=>[{key:"userName",title:r("column.userName"),render:({users:t})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailActionLogTable__username"},D(t==null?void 0:t.name)),cellProps:{style:{width:"18%"}}},{key:"action",title:r("column.action"),render:({actionLogs:t})=>e.createElement(e.Fragment,null,t.action?e.createElement(E,{variant:"body2","data-testid":"OrderDetailActionLogTable__action"},r(`choices.orderActionLogStatus.${t.action}`)):null),cellProps:{style:{width:"51%"}}},{key:"comment",title:r("column.comment"),render:({actionLogs:t})=>e.createElement(de,{disabled:!t.comment,fullWidth:!0,startIcon:e.createElement(he,null),onClick:()=>{n(D(t.comment))},"data-testid":"OrderDetailActionLogTable__viewCommentButton"},r("label.view")),cellProps:{style:{width:"12%",textAlign:"center"}}},{key:"updatedTime",title:r("column.updatedTime"),render:({actionLogs:t})=>e.createElement(E,{variant:"body2","data-testid":"OrderDetailActionLogTable__updatedTime"},A(t.created_at,"yyyy/LL/dd, HH:mm")),cellProps:{style:{width:"14%"}}}],[r,n])},Me=({dataSource:n,loading:r,pagination:a})=>{const[t,i]=p.exports.useState(""),[o,l]=p.exports.useState(!1),s=p.exports.useCallback(d=>{i(d),l(!0)},[i,l]),c=Se({handleOpenCommentDialog:s});return e.createElement(e.Fragment,null,e.createElement(B,{tableProps:{"data-testid":"OrderDetailActionLogTable__root"},data:n!=null?n:[],columns:c,withIndex:{width:"5%"},body:{loading:r,rowKey:"users.user_id",pagination:a,skeCount:5},footer:{pagination:a}}),o&&e.createElement(Fe,{comment:t,open:o,onClose:()=>l(!1)}))},ke=({orderId:n})=>{const r=T(),a=h(),{data:t,result:{isLoading:i},pagination:o}=F({entity:"orderActionLog",action:"paymentGetOrderActionLogListByOrderId"})({order_id:n},{enabled:Boolean(n),selector:({data:c,total:d})=>{const g=c==null?void 0:c.map(O=>O.user_id);return{data:{orderActionLogListData:c,userIds:g},total:d}},onError:c=>{var d;(d=window.warner)==null||d.warn("useOrderActionLogList",c),r(`${a("ra.message.unableToLoadData")} orderActionLog - paymentGetOrderActionLogListByOrderId`,"error")},defaultLimit:5}),{data:l,isLoading:s}=x({entity:"users",action:"paymentGetTitleListByUserId"})({user_id:t==null?void 0:t.data.userIds},{enabled:ue(t==null?void 0:t.data.userIds),onError:c=>{var d;(d=window.warner)==null||d.warn("useOrderActionLogList",c),r(`${a("ra.message.unableToLoadData")} users - paymentGetTitleListByUserId`,"error")}});return{mappedUseOrderActionLogListData:t,usersList:l,isOrderActionLogListLoadingAll:i||s,pagination:o}},Re=({orderId:n})=>{const r=_(b.ORDERS),{mappedUseOrderActionLogListData:a,usersList:t,isOrderActionLogListLoadingAll:i,pagination:o}=ke({orderId:n}),l=me({mappedUseOrderActionLogListData:a,usersList:t});return e.createElement(e.Fragment,null,e.createElement(u,{item:!0,xs:12},e.createElement(E,{variant:"subtitle1"},r("title.actionLog"))),e.createElement(u,{item:!0,xs:12},e.createElement(Me,{dataSource:l,loading:i,pagination:o})))},Ne=()=>{const n=_(b.ORDERS),{currentCurrency:r}=V(),{getProductPluginsMap:a}=Y();return p.exports.useMemo(()=>[{key:"productsName",title:n("column.name"),cellProps:{style:{width:"80%",verticalAlign:"top"}},render:({productData:i,discount:o,material:l,fee:s})=>{if(!i)return e.createElement("div",null,"Can not load product data");const c=G($({product:i,material:l,fee:s})),{ProductsListItemCell:d}=a(c);return e.createElement(d,{productName:i.name,discountName:o==null?void 0:o.name})}},{key:"amount",title:n("column.amount"),cellProps:{style:{width:"15%",textAlign:"right",verticalAlign:"top"}},render:({productPrice:i,discount:o})=>{const l=typeof(i==null?void 0:i.price)!="undefined"?i.price:0,s=ge(l,r,o==null?void 0:o.discount_amount_type,o==null?void 0:o.discount_amount_value);return e.createElement(E,{"data-testid":"OrderDetailProductListTable__amount"},s)}}],[r,n,a])},Ve=({loading:n,dataSource:r,pagination:a})=>{const t=Ne();return e.createElement(B,{tableProps:{"data-testid":"OrderDetailProductListTable__root"},columns:t,data:r,withIndex:{width:"5%"},styleIndexCol:{verticalAlign:"top"},body:{loading:n,rowKey:"productData.id",pagination:a,skeCount:5},footer:{pagination:a}})},Ge=({discountIds:n,enabled:r=!0,onSuccess:a})=>{const t=T(),i=h();return x({entity:"discount",action:"paymentGetManyDiscountByDiscountIds"})({discountIds:n},{enabled:r,onSuccess:o=>{a==null||a(o)},onError:o=>{var l;(l=window.warner)==null||l.warn("useDiscounts in Payment Order",o),t(`${i("ra.message.unableToLoadData")} discount - paymentGetManyDiscountByDiscountIds`,"error")}})},$e=({orderId:n})=>{const r=T(),a=h(),{data:t,result:{isFetched:i},pagination:o,resetPaginationOffset:l}=F({entity:"orderItem",action:"paymentGetOrderItemsByOrderId"})({orderId:n},{defaultLimit:5,enabled:Boolean(n),selector:({data:y,total:w})=>{const J=y==null?void 0:y.map(f=>f.product_id),U=y==null?void 0:y.filter(f=>typeof f.discount_id!="undefined").map(f=>Number(f.discount_id));return{data:{productIds:J,discountIds:U,orderItems:y},total:w}},onError:y=>{var w;(w=window.warner)==null||w.warn("useOrderItemsList in Payment Order",y),r(`${a("ra.message.unableToLoadData")} orderItems - paymentGetOrderItemsByOrderId`,"error")}}),{data:s,isFetched:c}=H({productIds:t==null?void 0:t.data.productIds,options:{enabled:i}}),{data:d,isFetched:g}=z({productIds:s==null?void 0:s.map(y=>y.product_id),enabled:c}),{data:O,isFetched:L}=K({productIds:s==null?void 0:s.map(y=>y.product_id),enabled:c}),{data:m,isFetched:I}=Ge({discountIds:t==null?void 0:t.data.discountIds,enabled:i}),{data:M,isFetched:v}=Pe({productIds:t==null?void 0:t.data.productIds,enabled:i});return{orderItemsData:t,pagination:o,resetPaginationOffset:l,productMaterialsData:d,productFeesData:O,discountData:m,productsDetail:s,productPricesData:M,isFetchedAll:g&&L&&c&&v&&I}},qe=({orderItemsData:n,discountData:r,productMaterialsData:a,productFeesData:t,productsDetail:i,productPricesData:o})=>{var l;return(l=n==null?void 0:n.data)!=null&&l.orderItems?n.data.orderItems.map(s=>{const c=r==null?void 0:r.find(m=>m.discount_id===s.discount_id),d=i==null?void 0:i.find(m=>m.product_id===s.product_id),g=a==null?void 0:a.find(m=>m.material_id===s.product_id),O=t==null?void 0:t.find(m=>m.fee_id===s.product_id),L=o==null?void 0:o.find(m=>m.product_id===s.product_id);return{discount:c,productData:d,material:g,fee:O,productPrice:L,startDate:s.start_date}}):[]},He=({orderId:n})=>{const r=_(b.ORDERS),{discountData:a,orderItemsData:t,productMaterialsData:i,productFeesData:o,productsDetail:l,productPricesData:s,pagination:c,isFetchedAll:d}=$e({orderId:n}),g=p.exports.useMemo(()=>qe({orderItemsData:t,discountData:a,productMaterialsData:i,productFeesData:o,productsDetail:l,productPricesData:s}),[a,t,i,o,s,l]);return e.createElement(e.Fragment,null,e.createElement(Q,null,e.createElement(u,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"space-between"},e.createElement(u,{item:!0},e.createElement(E,{variant:"subtitle1"},r("title.productList"))),e.createElement(u,{item:!0},e.createElement(pe,{disabled:!0,"data-testid":"OrderDetail__buttonViewPreviousVersion"},r("label.viewPreviousVersion")))),e.createElement(u,{item:!0,xs:12},e.createElement(Ve,{dataSource:g||[],loading:!d,pagination:c}))))};function ze({orderId:n}){const r=T(),a=h(),{data:t,isFetching:i}=x({entity:"order",action:"paymentGetOneOrderByOrderId"})({order_id:n},{enabled:Boolean(n),onError:d=>{var g;(g=window.warner)==null||g.warn("useOrderDetailInfo",d),r(`${a("ra.message.unableToLoadData")} order - paymentGetOneOrderByOrderId`,"error")}}),{data:o,isFetching:l}=x({entity:"locations",action:"paymentGetLocationTitleByLocationId"})({location_id:(t==null?void 0:t.location_id)||""},{enabled:Boolean(t==null?void 0:t.location_id),onError:d=>{var g;(g=window.warner)==null||g.warn("useOrderDetailInfo",d),r(`${a("ra.message.unableToLoadData")} locations - paymentGetLocationTitleByLocationId`,"error")}}),{data:s,isFetching:c}=Ie({studentId:t==null?void 0:t.student_id});return{order:t,locations:o,student:s,isFetchingAll:i||l||c}}const Ke=()=>{const{id:n}=ye(),{order:r,locations:a,student:t,isFetchingAll:i}=ze({orderId:n});return i?e.createElement(Ee,null):typeof r=="undefined"?e.createElement(be,{"data-testid":"OrderDetail__notfound"}):e.createElement(_e,{"data-testid":"OrderDetail__root"},e.createElement(u,{container:!0,direction:"column"},e.createElement(u,{item:!0},e.createElement(Oe,{resource:b.ORDERS,name:S(r.order_sequence_number)})),e.createElement(u,{item:!0},e.createElement(Be,{orderSequenceNumber:r.order_sequence_number,orderStatus:r.order_status})),e.createElement(u,{item:!0,container:!0,direction:"column",spacing:3},e.createElement(u,{item:!0,container:!0,direction:"column"},e.createElement(Ce,{order:r,locations:a,student:t})),e.createElement(u,{item:!0},e.createElement(C,null)),e.createElement(u,{item:!0,container:!0,spacing:2},e.createElement(He,{orderId:n})),e.createElement(u,{item:!0},e.createElement(C,null)),e.createElement(u,{item:!0,container:!0,spacing:2},e.createElement(ve,{orderId:n})),e.createElement(u,{item:!0},e.createElement(C,null)),e.createElement(u,{item:!0,container:!0,spacing:2,pb:"20px"},e.createElement(Re,{orderId:n})))))};var Ye=Ke;export{Ye as default};