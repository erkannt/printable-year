const t=document.querySelector("#appContainer");if(!t)throw Error("ERROR: no appContainer found");const e=document.querySelector("#yearInput");if(!e)throw Error("ERROR: no yearInput found");if(!(e instanceof HTMLInputElement))throw Error("ERROR: yearInput not an input");const n=document.querySelector("#monthsPerPage");if(!n)throw Error("ERROR: no monthsPerPageInput found");if(!(n instanceof HTMLSelectElement))throw Error("ERROR: monthsPerPage not a select");const a=(t,e)=>{let n=[],a=new Date(t,e,1);for(;a.getFullYear()===t&&a.getMonth()===e;)n.push(new Date(a)),a.setDate(a.getDate()+1);return n},r=(t,e)=>{let n=new Intl.DateTimeFormat("default",{year:"2-digit"}),a=new Intl.DateTimeFormat("default",{month:"long"}),r=document.createElement("span"),o=new Date(t,e),d=a.format(o);return 0===e&&(d=`${d} '${n.format(o)}`),r.textContent=d,r.classList.add("month","calendarItem"),r.setAttribute("data-month",(o.getMonth()+1).toString()),r},o=t=>{let e=new Intl.DateTimeFormat("default",{day:"2-digit"}),n=new Intl.DateTimeFormat("default",{weekday:"narrow"}),a=document.createElement("div");return a.textContent=`${e.format(t)} ${n.format(t)}`,a.classList.add("day","calendarItem"),a.setAttribute("data-month",(t.getMonth()+1).toString()),a.setAttribute("data-dayofweek",t.getDay().toString()),a.setAttribute("data-day",t.getDate().toString()),a},d=e=>{t.innerHTML="";let d=document.createElement("div");d.id="calendarContainer",d.setAttribute("data-monthsperpage",n.value),t.appendChild(d);let l=Array.from({length:12},(t,e)=>e);l.forEach(t=>{let n=document.createElement("div");n.classList.add("monthContainer");let l=r(e,t);n.appendChild(l),a(e,t).forEach(t=>{let e=o(t);n.appendChild(e)}),d.append(n)})};e.addEventListener("change",()=>{d(Number(e.value))}),n.addEventListener("change",()=>{d(Number(e.value))}),e.value=new Date().getFullYear().toString(),d(Number(e.value));