import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m}from"./assets/vendor-2b44ac2e.js";let c;const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]-new Date>0?(a.addEventListener("click",t=>{a.disabled=!0,s.disabled=!0,c=setInterval(()=>{const n=e[0]-new Date;n<=1e3&&(clearInterval(c),s.disabled=!1),b(E(n))})},1e3),a.disabled=!1):(window.alert("Please choose a date in the future"),a.disabled=!0)}},s=document.querySelector("#datetime-picker"),a=document.querySelector("[data-start]"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");a.disabled=!0;m(s,f);function b({days:e,hours:o,minutes:t,seconds:n}){r(h,e),r(y,o),r(p,t),r(S,n)}function r(e,o){const t=o.toString().padStart(2,"0");e.textContent!==t&&(e.textContent=t)}function E(e){const d=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),i=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:u,minutes:l,seconds:i}}
//# sourceMappingURL=commonHelpers.js.map
