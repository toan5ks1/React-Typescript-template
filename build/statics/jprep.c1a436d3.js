var u=Object.defineProperty;var r=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var m=(n,a,p)=>a in n?u(n,a,{enumerable:!0,configurable:!0,writable:!0,value:p}):n[a]=p,t=(n,a)=>{for(var p in a||(a={}))c.call(a,p)&&m(n,p,a[p]);if(r)for(var p of r(a))l.call(a,p)&&m(n,p,a[p]);return n};import{aM as i,aN as e,aO as o}from"./index.7daee9ef.js";const b={gRPC:"https://web-api.uat.jprep.manabie.io:31400",bobGraphQL:"https://admin.uat.jprep.manabie.io:31600",eurekaGraphQL:"https://admin.uat.jprep.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.uat.jprep.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},h={gRPC:"https://web-api.prod.jprep.manabie.io:31400",bobGraphQL:"https://admin.prod.jprep.manabie.io:31600",eurekaGraphQL:"https://admin.prod.jprep.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prod.jprep.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},j={gRPC:"https://web-api.prep.jprep.manabie.io:31400",bobGraphQL:"https://admin.prep.jprep.manabie.io:31600",eurekaGraphQL:"https://admin.prep.jprep.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.prep.jprep.manabie.io:31600/fatima",OCR:h.OCR},s={gRPC:"https://web-api.staging.jprep.manabie.io:31400",bobGraphQL:"https://admin.staging.jprep.manabie.io:31600",eurekaGraphQL:"https://admin.staging.jprep.manabie.io:31600/eureka",fatimaGraphQL:"https://admin.staging.jprep.manabie.io:31600/fatima",OCR:"https://asia-east2-content-management-syste-c40d1.cloudfunctions.net"},d=t({url:"https://admin.local-green.manabie.io:31600/unleash/proxy",environment:"dev"},o),g=t({url:"https://admin.staging.jprep.manabie.io:31600/unleash/proxy",environment:"stag"},o),N=t({url:"https://admin.uat.jprep.manabie.io:31600/unleash/proxy",environment:"uat"},o),y=t({url:"https://admin.prep.jprep.manabie.io:31600/unleash/proxy",environment:"prod"},o),f=t({url:"https://admin.prod.jprep.manabie.io:31600/unleash/proxy",environment:"prod"},o);var E={[i.DEFAULT]:{[e.AUTH]:{authority:"https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",client_id:"manabie-app",response_type:"code",automaticSilentRenew:!0,scope:"openid"},[e.ENDPOINT]:s,[e.UNLEASH]:d},[i.DEVELOPMENT]:{[e.AUTH]:{authority:"https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",client_id:"manabie-app",response_type:"code",scope:"openid"},[e.ENDPOINT]:s,[e.UNLEASH]:d},[i.STAGING]:{[e.AUTH]:{authority:"https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",client_id:"manabie-app",response_type:"code",scope:"openid"},[e.ENDPOINT]:s,[e.UNLEASH]:g},[i.UAT]:{[e.AUTH]:{authority:"https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",client_id:"manabie-app",response_type:"code",scope:"openid"},[e.ENDPOINT]:b,[e.UNLEASH]:N},[i.PREPRODUCTION]:{[e.AUTH]:{authority:"https://ji-sso.jprep.jp/auth/realms/jprep/.well-known/openid-configuration",client_id:"manabie",response_type:"code",scope:"openid"},[e.ENDPOINT]:j,[e.UNLEASH]:y},[i.PRODUCTION]:{[e.AUTH]:{authority:"https://ji-sso.jprep.jp/auth/realms/jprep/.well-known/openid-configuration",client_id:"manabie",response_type:"code",scope:"openid"},[e.ENDPOINT]:h,[e.UNLEASH]:f}};export{E as default};
