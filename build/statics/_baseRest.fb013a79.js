import{at as c,au as s}from"./index.7daee9ef.js";function p(r,e,t){switch(t.length){case 0:return r.call(e);case 1:return r.call(e,t[0]);case 2:return r.call(e,t[0],t[1]);case 3:return r.call(e,t[0],t[1],t[2])}return r.apply(e,t)}var y=p,f=y,l=Math.max;function _(r,e,t){return e=l(e===void 0?r.length-1:e,0),function(){for(var a=arguments,n=-1,o=l(a.length-e,0),u=Array(o);++n<o;)u[n]=a[e+n];n=-1;for(var i=Array(e+1);++n<e;)i[n]=a[n];return i[e]=t(u),f(r,this,i)}}var d=_;function S(r){return function(){return r}}var b=S,h=b,v=c,m=s,T=v?function(r,e){return v(r,"toString",{configurable:!0,enumerable:!1,value:h(e),writable:!0})}:m,g=T,$=800,w=16,O=Date.now;function R(r){var e=0,t=0;return function(){var a=O(),n=w-(a-t);if(t=a,n>0){if(++e>=$)return arguments[0]}else e=0;return r.apply(void 0,arguments)}}var x=R,N=g,P=x,C=P(N),H=C,M=s,D=d,U=H;function j(r,e){return U(D(r,e,M),r+"")}var q=j;export{q as _,d as a,H as b};
