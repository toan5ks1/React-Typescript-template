var f=Object.defineProperty,A=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var d=(i,e,n)=>e in i?f(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n,t=(i,e)=>{for(var n in e||(e={}))T.call(e,n)&&d(i,n,e[n]);if(m)for(var n of m(e))k.call(e,n)&&d(i,n,e[n]);return i},b=(i,e)=>A(i,N(e));import{aM as o,aN as a,aO as s}from"./index.7daee9ef.js";const u={gRPC:"https://web-api.prod.renseikai.manabie.io:31400",bobGraphQL:"https://admin.prod.renseikai.manabie.io:31600",eurekaGraphQL:"https://admin.prod.renseikai.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prod.renseikai.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},h={apiKey:"AIzaSyCk7QXIT8AUAF1JB7NLPmSQybrL6-YGz_U",authDomain:"production-renseikai.firebaseapp.com",projectId:"production-renseikai",storageBucket:"production-renseikai.appspot.com",messagingSenderId:"783676965208",appId:"1:783676965208:web:e7d7ecac6acf83a664652d",measurementId:"G-WTDKYVHVN7"},p={apiKey:"AIzaSyA7h5F1D1irKjtxd5Uj8A1OTMRmoc1ANRs",authDomain:"staging-manabie-online.firebaseapp.com",databaseURL:"https://staging-manabie-online.firebaseio.com",projectId:"staging-manabie-online",storageBucket:"staging-manabie-online.appspot.com",messagingSenderId:"456005132078",appId:"1:456005132078:web:29bea7c27304ef6527a4bf",measurementId:"G-CH49VJD9Y8"},r={gRPC:"https://web-api.staging-green.manabie.io:31400",bobGraphQL:"https://admin.staging-green.manabie.io:31600",eurekaGraphQL:"https://admin.staging-green.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.staging-green.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},c=t({url:"https://admin.local-green.manabie.io:31600/unleash/proxy",environment:"dev"},s),g=t({url:"https://admin.prod.renseikai.manabie.io:31600/unleash/proxy",environment:"prod"},s),L=b(t({},g),{environment:"stag"}),l=h,I={gRPC:"https://web-api.prep.renseikai.manabie.io:31400",bobGraphQL:"https://admin.prep.renseikai.manabie.io:31600",eurekaGraphQL:"https://admin.prep.renseikai.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prep.renseikai.manabie.io:31600/fatima",OCR:u.OCR},U=t({url:"https://admin.prep.renseikai.manabie.io:31600/unleash/proxy",environment:"prod"},s),P={apiKey:"AIzaSyBULNKqiy-4kJTTsyLoTA6bwAaSFc_7g9M",authDomain:"uat-manabie.firebaseapp.com",projectId:"uat-manabie",storageBucket:"uat-manabie.appspot.com",messagingSenderId:"401512356686",appId:"1:401512356686:web:fb002f75aa4cd49544dc1f",measurementId:"G-E41KN6KREV"},E={gRPC:"https://web-api.uat.manabie.io:31400",bobGraphQL:"https://admin.uat.manabie.io:31600",eurekaGraphQL:"https://admin.uat.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.uat.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},G=t({url:"https://admin.uat.manabie.io:31600/unleash/proxy",environment:"uat"},s);var S={[o.DEFAULT]:{[a.AUTH]:p,[a.ENDPOINT]:r,[a.UNLEASH]:c},[o.DEVELOPMENT]:{[a.AUTH]:p,[a.ENDPOINT]:r,[a.UNLEASH]:c},[o.STAGING]:{[a.AUTH]:p,[a.ENDPOINT]:r,[a.UNLEASH]:L},[o.UAT]:{[a.AUTH]:P,[a.ENDPOINT]:E,[a.UNLEASH]:G},[o.PREPRODUCTION]:{[a.AUTH]:l,[a.ENDPOINT]:I,[a.UNLEASH]:U},[o.PRODUCTION]:{[a.AUTH]:h,[a.ENDPOINT]:u,[a.UNLEASH]:g}};export{S as default};