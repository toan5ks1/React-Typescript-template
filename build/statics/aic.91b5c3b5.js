var c=Object.defineProperty;var s=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var r=(t,a,e)=>a in t?c(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,n=(t,a)=>{for(var e in a||(a={}))u.call(a,e)&&r(t,e,a[e]);if(s)for(var e of s(a))b.call(a,e)&&r(t,e,a[e]);return t};import{aM as o,aN as i,aO as p}from"./index.7daee9ef.js";const m={gRPC:"https://web-api.prod.aic.manabie.io:31400",bobGraphQL:"https://admin.prod.aic.manabie.io:31600",eurekaGraphQL:"https://admin.prod.aic.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prod.aic.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},d={apiKey:"AIzaSyCavsmMzTHJuVzVa0amiZv7Xxv0hD88vbE",authDomain:"production-aic.firebaseapp.com",projectId:"production-aic",storageBucket:"production-aic.appspot.com",messagingSenderId:"1010613156712",appId:"1:1010613156712:web:eb3f8c7d760e79b472b4dd",measurementId:"G-6GP43JD83W"},h=n({url:"https://admin.prod.aic.manabie.io:31600/unleash/proxy",environment:"prod"},p),f=d,T={gRPC:"https://web-api.prep.aic.manabie.io:31400",bobGraphQL:"https://admin.prep.aic.manabie.io:31600",eurekaGraphQL:"https://admin.prep.aic.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prep.aic.manabie.io:31600/fatima",OCR:m.OCR},P=n({url:"https://admin.prep.aic.manabie.io:31600/unleash/proxy",environment:"prod"},p),A={apiKey:"AIzaSyBULNKqiy-4kJTTsyLoTA6bwAaSFc_7g9M",authDomain:"uat-manabie.firebaseapp.com",projectId:"uat-manabie",storageBucket:"uat-manabie.appspot.com",messagingSenderId:"401512356686",appId:"1:401512356686:web:fb002f75aa4cd49544dc1f",measurementId:"G-E41KN6KREV"},I={gRPC:"https://web-api.uat.manabie.io:31400",bobGraphQL:"https://admin.uat.manabie.io:31600",eurekaGraphQL:"https://admin.uat.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.uat.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},g=n({url:"https://admin.uat.manabie.io:31600/unleash/proxy",environment:"uat"},p);var l={[o.UAT]:{[i.AUTH]:A,[i.ENDPOINT]:I,[i.UNLEASH]:g},[o.PREPRODUCTION]:{[i.AUTH]:f,[i.ENDPOINT]:T,[i.UNLEASH]:P},[o.PRODUCTION]:{[i.AUTH]:d,[i.ENDPOINT]:m,[i.UNLEASH]:h}};export{l as default};