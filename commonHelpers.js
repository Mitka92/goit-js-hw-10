import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m}from"./assets/vendor-2b44ac2e.js";const s=document.querySelector("#datetime-picker"),n=document.querySelector("[data-start]"),f=document.querySelector("[data-days]"),h=document.querySelector("[data-hours]"),y=document.querySelector("[data-minutes]"),p=document.querySelector("[data-seconds]");let r;const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){r=e[0],r-new Date>0?n.disabled=!1:(window.alert("Please choose a date in the future"),n.disabled=!0)}};n.disabled=!0;m(s,S);n.addEventListener("click",e=>{n.disabled=!0,s.disabled=!0;const o=setInterval(()=>{const t=r-new Date;t<=1e3&&(clearInterval(o),s.disabled=!1),b(D(t))},1e3)});function b({days:e,hours:o,minutes:t,seconds:c}){a(f,e),a(h,o),a(y,t),a(p,c)}function a(e,o){const t=o.toString().padStart(2,"0");e.textContent!==t&&(e.textContent=t)}function D(e){const d=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),i=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:u,minutes:l,seconds:i}}
//# sourceMappingURL=commonHelpers.js.map
