var h=Object.defineProperty,f=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var m=(t,e,n)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,i=(t,e)=>{for(var n in e||(e={}))L.call(e,n)&&m(t,n,e[n]);if(r)for(var n of r(e))l.call(e,n)&&m(t,n,e[n]);return t},d=(t,e)=>f(t,A(e));import{aM as o,aN as a,aO as p}from"./index.7daee9ef.js";const b={gRPC:"https://web-api.prod.ga.manabie.io:31400",bobGraphQL:"https://admin.prod.ga.manabie.io:31600",eurekaGraphQL:"https://admin.prod.ga.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prod.ga.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},u={apiKey:"AIzaSyBOVq4X1FNzjfgPo4LARRInxABLmV8bQ30",authDomain:"production-ga.firebaseapp.com",projectId:"production-ga",storageBucket:"production-ga.appspot.com",messagingSenderId:"250379134341",appId:"1:250379134341:web:72dd13fb5991fa9ba9d0ec",measurementId:"G-7SXR8CFQ3Q"},s={apiKey:"AIzaSyA7h5F1D1irKjtxd5Uj8A1OTMRmoc1ANRs",authDomain:"staging-manabie-online.firebaseapp.com",databaseURL:"https://staging-manabie-online.firebaseio.com",projectId:"staging-manabie-online",storageBucket:"staging-manabie-online.appspot.com",messagingSenderId:"456005132078",appId:"1:456005132078:web:29bea7c27304ef6527a4bf",measurementId:"G-CH49VJD9Y8"},T={gRPC:"https://web-api.staging-green.manabie.io:31400",bobGraphQL:"https://admin.staging-green.manabie.io:31600",eurekaGraphQL:"https://admin.staging-green.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.staging-green.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},g=i({url:"https://admin.local-green.manabie.io:31600/unleash/proxy",environment:"dev"},p),c=i({url:"https://admin.prod.ga.manabie.io:31600/unleash/proxy",environment:"prod"},p),I=d(i({},c),{environment:"stag"}),N=u,U={gRPC:"https://web-api.prep.ga.manabie.io:31400",bobGraphQL:"https://admin.prep.ga.manabie.io:31600",eurekaGraphQL:"https://admin.prep.ga.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prep.ga.manabie.io:31600/fatima",OCR:b.OCR},P=i({url:"https://admin.prep.ga.manabie.io:31600/unleash/proxy",environment:"prod"},p),R={apiKey:"AIzaSyBULNKqiy-4kJTTsyLoTA6bwAaSFc_7g9M",authDomain:"uat-manabie.firebaseapp.com",projectId:"uat-manabie",storageBucket:"uat-manabie.appspot.com",messagingSenderId:"401512356686",appId:"1:401512356686:web:fb002f75aa4cd49544dc1f",measurementId:"G-E41KN6KREV"},E={gRPC:"https://web-api.uat.manabie.io:31400",bobGraphQL:"https://admin.uat.manabie.io:31600",eurekaGraphQL:"https://admin.uat.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.uat.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},G=i({url:"https://admin.uat.manabie.io:31600/unleash/proxy",environment:"uat"},p);var O={[o.DEFAULT]:{[a.AUTH]:s,[a.UNLEASH]:g},[o.DEVELOPMENT]:{[a.AUTH]:s,[a.ENDPOINT]:T,[a.UNLEASH]:g},[o.STAGING]:{[a.AUTH]:s,[a.UNLEASH]:I},[o.UAT]:{[a.AUTH]:R,[a.ENDPOINT]:E,[a.UNLEASH]:G},[o.PREPRODUCTION]:{[a.AUTH]:N,[a.ENDPOINT]:U,[a.UNLEASH]:P},[o.PRODUCTION]:{[a.AUTH]:u,[a.ENDPOINT]:b,[a.UNLEASH]:c}};export{O as default};