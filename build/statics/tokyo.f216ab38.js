var h=Object.defineProperty;var p=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var m=(n,e,t)=>e in n?h(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,o=(n,e)=>{for(var t in e||(e={}))u.call(e,t)&&m(n,t,e[t]);if(p)for(var t of p(e))g.call(e,t)&&m(n,t,e[t]);return n};import{aM as i,aN as a,aO as s}from"./index.7daee9ef.js";const l={apiKey:"AIzaSyAlE26SQ0OMGjmr4IiF9D6CJkK0eRvV6HA",authDomain:"dev-manabie-online.firebaseapp.com",projectId:"dev-manabie-online",storageBucket:"dev-manabie-online.appspot.com",messagingSenderId:"888663408192",appId:"1:888663408192:web:3835337d61df3f479969a5",measurementId:"G-FBGS2ECKKX"},r={apiKey:"AIzaSyA7h5F1D1irKjtxd5Uj8A1OTMRmoc1ANRs",authDomain:"staging-manabie-online.firebaseapp.com",databaseURL:"https://staging-manabie-online.firebaseio.com",projectId:"staging-manabie-online",storageBucket:"staging-manabie-online.appspot.com",messagingSenderId:"456005132078",appId:"1:456005132078:web:b1c4550c9c44f85d27a4bf",measurementId:"G-QM065T9M0F"},b={apiKey:"AIzaSyAX_hkFpXOfLzf5NWOVdvqLctPsaX3NdQ8",authDomain:"student-coach-e1e95.firebaseapp.com",databaseURL:"https://student-coach-e1e95.firebaseio.com",projectId:"student-coach-e1e95",storageBucket:"student-coach-e1e95.appspot.com",messagingSenderId:"418860883682",appId:"1:418860883682:web:855a6fb1373f2770b748bb",measurementId:"G-NJ8E94Q888"},f=b,y={gRPC:"https://web-api.local-green.manabie.io:31400",bobGraphQL:"https://admin.local-green.manabie.io:31600",eurekaGraphQL:"https://admin.local-green.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.local-green.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},d={gRPC:"https://web-api.staging-green.manabie.io:31400",bobGraphQL:"https://admin.staging-green.manabie.io:31600",eurekaGraphQL:"https://admin.staging-green.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.staging-green.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},L={gRPC:"https://web-api.uat.manabie.io:31400",bobGraphQL:"https://admin.uat.manabie.io:31600",eurekaGraphQL:"https://admin.uat.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.uat.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},A={gRPC:"https://web-api.prep.tokyo.manabie.io:31400",bobGraphQL:"https://admin.prep.tokyo.manabie.io:31600",eurekaGraphQL:"https://admin.prep.tokyo.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prep.tokyo.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},I={gRPC:"https://web-api.prod.tokyo.manabie.io:31400",bobGraphQL:"https://admin.prod.tokyo.manabie.io:31600",eurekaGraphQL:"https://admin.prod.tokyo.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prod.tokyo.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},N={apiKey:"AIzaSyBULNKqiy-4kJTTsyLoTA6bwAaSFc_7g9M",authDomain:"uat-manabie.firebaseapp.com",projectId:"uat-manabie",storageBucket:"uat-manabie.appspot.com",messagingSenderId:"401512356686",appId:"1:401512356686:web:fb002f75aa4cd49544dc1f",measurementId:"G-E41KN6KREV"},k=o({url:"https://admin.local-green.manabie.io:31600/unleash/proxy",environment:"dev"},s),c=o({url:"https://admin.staging.manabie.io:31600/unleash/proxy",environment:"stag"},s),T=o({url:"https://admin.uat.manabie.io:31600/unleash/proxy",environment:"uat"},s),G=o({url:"https://admin.prep.tokyo.manabie.io:31600/unleash/proxy",environment:"prod"},s),E=o({url:"https://admin.prod.tokyo.manabie.io:31600/unleash/proxy",environment:"prod"},s);var P={[i.DEVELOPMENT]:{}.VITE_RUN_BE_LOCAL?{[a.AUTH]:l,[a.ENDPOINT]:y,[a.UNLEASH]:k}:{[a.AUTH]:r,[a.ENDPOINT]:d,[a.UNLEASH]:c},[i.STAGING]:{[a.AUTH]:r,[a.ENDPOINT]:d,[a.UNLEASH]:c},[i.UAT]:{[a.AUTH]:N,[a.ENDPOINT]:L,[a.UNLEASH]:T},[i.PREPRODUCTION]:{[a.AUTH]:f,[a.ENDPOINT]:A,[a.UNLEASH]:G},[i.PRODUCTION]:{[a.AUTH]:b,[a.ENDPOINT]:I,[a.UNLEASH]:E}};export{P as default};
